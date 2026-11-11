#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { readFile } from 'node:fs/promises';
import { loadAtlas, listSites, findWorkflows, readWorkflow, formatWorkflow, installSkills, agentDestination } from '../src/atlas.js';

const HELP = `Agent Site Atlas — reusable website operation manuals

Usage:
  node bin/site-atlas.js list
  node bin/site-atlas.js search [--site ID | --url URL] [--task TEXT]
  node bin/site-atlas.js read SITE WORKFLOW [--json]
  node bin/site-atlas.js install SITE... --agent codex|claude|deepseek
  node bin/site-atlas.js install SITE... --dest ABSOLUTE_DIRECTORY
  node bin/site-atlas.js serve [--sites cnki,sciencedirect]

Install accepts cnki, sciencedirect, and study. Existing destinations are
preserved and cause installation to stop before copying. --dest also supports
hosts with a custom skill directory. list/search/install return JSON.

The local MCP server exposes list_sites, find_site_workflows, and
read_site_workflow. Run npm ci first to install its SDK dependencies.
No credentials are required. Use your existing browser tool for execution.
`;

function onlyOptions(values, allowed) {
  for (const key of Object.keys(values)) if (!allowed.includes(key)) throw new Error(`--${key} is not valid for this command.`);
}

async function main() {
  const { values, positionals } = parseArgs({ allowPositionals: true, options: {
    help: { type: 'boolean', short: 'h' }, version: { type: 'boolean' },
    site: { type: 'string' }, url: { type: 'string' }, task: { type: 'string' },
    agent: { type: 'string' }, dest: { type: 'string' }, sites: { type: 'string' },
    json: { type: 'boolean' },
  } });
  if (values.help || (!positionals.length && !values.version)) { process.stdout.write(HELP); return; }
  if (values.version) {
    const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
    process.stdout.write(`${pkg.version}\n`); return;
  }
  const [command, ...args] = positionals;
  if (command === 'serve') {
    onlyOptions(values, ['sites']);
    if (args.length) throw new Error('serve accepts options only.');
    const sites = values.sites === undefined ? undefined : values.sites.split(',').map(value => value.trim()).filter(Boolean);
    const { serve } = await import('../src/server.js');
    await serve({ sites }); return;
  }
  const atlas = await loadAtlas();
  let result;
  switch (command) {
    case 'list':
      onlyOptions(values, []);
      if (args.length) throw new Error('list does not accept arguments.');
      result = listSites(atlas); break;
    case 'search':
      onlyOptions(values, ['site', 'url', 'task']);
      if (args.length) throw new Error('Use --task for the search query.');
      if (values.site && values.url) throw new Error('Use either --site or --url.');
      result = findWorkflows(atlas, { site: values.site, url: values.url, query: values.task }); break;
    case 'read':
      onlyOptions(values, ['json']);
      if (args.length !== 2) throw new Error('read requires SITE and WORKFLOW.');
      result = await readWorkflow(atlas, ...args);
      if (!values.json) { process.stdout.write(formatWorkflow(result)); return; }
      break;
    case 'install':
      onlyOptions(values, ['agent', 'dest']);
      if (Boolean(values.agent) === Boolean(values.dest)) throw new Error('Choose exactly one of --agent or --dest.');
      result = await installSkills(atlas, args, values.dest ?? agentDestination(values.agent)); break;
    default: throw new Error(`Unknown command: ${command}. Use --help.`);
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch(error => {
  process.stderr.write(`site-atlas: ${error.message}\n`);
  process.exitCode = 1;
});
