import { readdir, readFile, realpath, lstat, mkdir, cp } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

export const DEFAULT_SKILLS_ROOT = fileURLToPath(new URL('../skills/', import.meta.url));
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EVIDENCE = new Set(['live-verified', 'live-partial', 'documented']);
const normal = value => value.normalize('NFKC').toLowerCase().trim();

function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a non-empty string.`);
}

function validateManifest(manifest, folder) {
  for (const key of ['id', 'name', 'description', 'entry_url', 'context']) requireText(manifest[key], `${folder}: ${key}`);
  if (!ID.test(manifest.id) || folder !== `site-${manifest.id}`) throw new Error(`${folder}: id must match its site-<id> folder.`);
  const entry = new URL(manifest.entry_url);
  if (!['http:', 'https:'].includes(entry.protocol) || entry.username || entry.password) throw new Error(`${folder}: entry_url must be a public HTTP(S) URL.`);
  for (const key of ['domains', 'aliases']) {
    if (!Array.isArray(manifest[key]) || !manifest[key].length) throw new Error(`${folder}: ${key} must be a non-empty array.`);
    manifest[key].forEach(value => requireText(value, `${folder}: ${key}`));
  }
  for (const domain of manifest.domains) {
    if (domain !== domain.toLowerCase() || !/^[a-z0-9.-]+$/.test(domain) || new URL(`https://${domain}`).hostname !== domain) throw new Error(`${folder}: invalid exact hostname ${domain}.`);
  }
  if (!manifest.domains.includes(entry.hostname)) throw new Error(`${folder}: entry_url hostname must appear in domains.`);
  if (!Array.isArray(manifest.workflows) || !manifest.workflows.length) throw new Error(`${folder}: workflows must be a non-empty array.`);
  const ids = new Set();
  for (const workflow of manifest.workflows) {
    for (const key of ['id', 'title', 'description', 'file', 'last_checked']) requireText(workflow[key], `${folder}: workflow ${key}`);
    if (!ID.test(workflow.id) || ids.has(workflow.id)) throw new Error(`${folder}: invalid or duplicate workflow id ${workflow.id}.`);
    ids.add(workflow.id);
    if (!Array.isArray(workflow.keywords)) throw new Error(`${folder}: workflow keywords must be an array.`);
    workflow.keywords.forEach(value => requireText(value, `${folder}: keyword`));
    if (!EVIDENCE.has(workflow.evidence)) throw new Error(`${folder}: unknown evidence level ${workflow.evidence}.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(workflow.last_checked) || Number.isNaN(Date.parse(workflow.last_checked))) throw new Error(`${folder}: invalid last_checked date.`);
  }
}

async function packFile(directory, relative) {
  requireText(relative, 'Pack file path');
  if (path.isAbsolute(relative) || relative.includes('\\')) throw new Error('Pack file paths must be relative and use forward slashes.');
  const root = await realpath(directory);
  const resolved = await realpath(path.resolve(root, relative));
  const within = path.relative(root, resolved);
  if (!within || within.startsWith(`..${path.sep}`) || within === '..' || path.isAbsolute(within)) throw new Error('Pack file path must stay inside its skill directory.');
  if (!(await lstat(resolved)).isFile()) throw new Error('Pack reference must be a regular file.');
  return resolved;
}

export async function loadAtlas({ skillsRoot = DEFAULT_SKILLS_ROOT, sites } = {}) {
  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const packs = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory() || !entry.name.startsWith('site-') || entry.name === 'site-study') continue;
    const directory = path.join(skillsRoot, entry.name);
    const manifest = JSON.parse(await readFile(path.join(directory, 'site.json'), 'utf8'));
    validateManifest(manifest, entry.name);
    packs.push({ ...manifest, directory });
  }
  if (!packs.length) throw new Error('No website packs found in the skills directory.');
  if (sites !== undefined) {
    if (!Array.isArray(sites) || !sites.length) throw new Error('Select at least one site.');
    for (const id of sites) if (!packs.some(pack => pack.id === id)) throw new Error(`Unknown site: ${id}. Available: ${packs.map(pack => pack.id).join(', ')}.`);
  }
  const enabled = sites === undefined ? packs : packs.filter(pack => sites.includes(pack.id));
  return { skillsRoot: path.resolve(skillsRoot), packs: enabled };
}

function getPack(atlas, id) {
  requireText(id, 'Site');
  const pack = atlas.packs.find(item => item.id === id);
  if (!pack) throw new Error(`Unknown or disabled site: ${id}. Available: ${atlas.packs.map(item => item.id).join(', ')}.`);
  return pack;
}

function workflowSummary(workflow) {
  const { id, title, description, evidence, last_checked } = workflow;
  return { id, title, description, evidence, last_checked };
}

export function listSites(atlas) {
  return atlas.packs.map(pack => ({
    id: pack.id, name: pack.name, description: pack.description,
    entry_url: pack.entry_url, domains: pack.domains,
    workflows: pack.workflows.map(workflowSummary),
  }));
}

function hostname(url) {
  requireText(url, 'URL');
  let parsed;
  try { parsed = new URL(url); } catch { throw new Error('URL must be an absolute HTTP(S) URL.'); }
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) throw new Error('URL must use HTTP(S) and must not contain credentials.');
  return parsed.hostname.toLowerCase().replace(/\.$/, '');
}

export function findWorkflows(atlas, { site, url, query } = {}) {
  if (query !== undefined && typeof query !== 'string') throw new Error('Query must be a string.');
  if (site === undefined && url === undefined && !query?.trim()) throw new Error('Provide a site, URL, or task query.');
  let packs = site === undefined ? atlas.packs : [getPack(atlas, site)];
  if (url !== undefined) {
    const host = hostname(url);
    packs = packs.filter(pack => pack.domains.includes(host));
  }
  const q = query ? normal(query) : '';
  const tokens = [...new Set(q.split(/[^\p{L}\p{N}]+/u).filter(word => word.length > 1))];
  const matches = [];
  for (const pack of packs) {
    const siteMatch = q && [pack.id, pack.name, ...pack.aliases].some(alias => q.includes(normal(alias)));
    for (const workflow of pack.workflows) {
      let score = q ? (siteMatch ? 1 : 0) : 1;
      const terms = new Set([workflow.id, workflow.title, ...workflow.keywords].map(normal));
      for (const term of terms) if (q && term && q.includes(term)) score += 10;
      const indexed = normal(`${workflow.title} ${workflow.description} ${workflow.keywords.join(' ')}`);
      for (const token of tokens) if (indexed.includes(token)) score += 2;
      if (score) matches.push({ site: pack.id, site_name: pack.name, ...workflowSummary(workflow), score });
    }
  }
  return matches.sort((a, b) => b.score - a.score || a.site.localeCompare(b.site) || a.id.localeCompare(b.id));
}

export async function readWorkflow(atlas, site, workflowId) {
  const pack = getPack(atlas, site);
  const workflow = pack.workflows.find(item => item.id === workflowId);
  if (!workflow) throw new Error(`Unknown workflow for ${site}: ${workflowId}. Available: ${pack.workflows.map(item => item.id).join(', ')}.`);
  const paths = await Promise.all(['SKILL.md', pack.context, workflow.file].map(file => packFile(pack.directory, file)));
  const [instructions, context, content] = await Promise.all(paths.map(file => readFile(file, 'utf8')));
  return { site: pack.id, site_name: pack.name, entry_url: pack.entry_url, domains: pack.domains, workflow: workflowSummary(workflow), instructions, context, content };
}

export function formatWorkflow(result) {
  return `# ${result.site_name}: ${result.workflow.title}\n\nEvidence: ${result.workflow.evidence}; last checked: ${result.workflow.last_checked}\n\n${result.instructions.trim()}\n\n${result.context.trim()}\n\n${result.content.trim()}\n`;
}

export function agentDestination(agent, home = os.homedir()) {
  const paths = { codex: ['.agents', 'skills'], claude: ['.claude', 'skills'], deepseek: ['.dsh', 'skills'] };
  if (!Object.hasOwn(paths, agent)) throw new Error('Agent must be codex, claude, or deepseek. For another host, use --dest.');
  return path.join(home, ...paths[agent]);
}

async function exists(file) {
  try { await lstat(file); return true; } catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}

async function checkInstallSource(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error(`Skill installation refuses symbolic links: ${entry.name}.`);
    if (entry.isDirectory()) await checkInstallSource(path.join(directory, entry.name));
    else if (!entry.isFile()) throw new Error(`Unsupported skill entry: ${entry.name}.`);
  }
}

export async function installSkills(atlas, ids, destination) {
  if (!Array.isArray(ids) || !ids.length) throw new Error('Select at least one site or study.');
  if (!path.isAbsolute(destination)) throw new Error('Installation destination must be an absolute path.');
  const plan = [];
  for (const id of new Set(ids)) {
    const directory = id === 'study' ? path.join(atlas.skillsRoot, 'site-study') : getPack(atlas, id).directory;
    await packFile(directory, 'SKILL.md');
    await checkInstallSource(directory);
    const target = path.join(path.resolve(destination), `site-${id}`);
    if (await exists(target)) throw new Error(`Destination already exists; nothing was copied: ${target}. Choose an empty destination or review the installed copy manually.`);
    plan.push({ id, directory, target });
  }
  await mkdir(destination, { recursive: true });
  const installed = [];
  for (const item of plan) {
    try { await cp(item.directory, item.target, { recursive: true, force: false, errorOnExist: true }); }
    catch (error) { throw new Error(`Could not copy ${item.id} to ${item.target}: ${error.message}. Any files already copied were retained.`, { cause: error }); }
    installed.push({ id: item.id, path: item.target });
  }
  return installed;
}
