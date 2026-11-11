import test from 'node:test';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fixture } from './fixtures.js';

test('official SDK initializes the stdio server and reads local task guidance', { timeout: 20000 }, async () => {
  const { root, skillsRoot } = await fixture();
  const launcher = path.join(root, 'server.mjs');
  await writeFile(launcher, `import { serve } from ${JSON.stringify(new URL('../src/server.js', import.meta.url).href)};\nawait serve({ skillsRoot: ${JSON.stringify(skillsRoot)}, sites: ['cnki'] });\n`);
  const transport = new StdioClientTransport({ command: process.execPath, args: [launcher], stderr: 'pipe' });
  let stderr = '';
  transport.stderr?.on('data', chunk => { stderr += chunk; });
  const client = new Client({ name: 'site-atlas-test', version: '1.0.0' });
  try {
    await client.connect(transport);
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map(tool => tool.name).sort(), ['find_site_workflows', 'list_sites', 'read_site_workflow']);
    assert.doesNotMatch(JSON.stringify(tools), /sciencedirect/i);
    const listed = await client.callTool({ name: 'list_sites', arguments: {} });
    assert.deepEqual(JSON.parse(listed.content[0].text).map(site => site.id), ['cnki']);
    const found = await client.callTool({ name: 'find_site_workflows', arguments: { url: 'https://www.cnki.net/', query: '下载论文' } });
    assert.equal(JSON.parse(found.content[0].text)[0].id, 'download');
    const read = await client.callTool({ name: 'read_site_workflow', arguments: { site: 'cnki', workflow: 'download' } });
    assert.match(JSON.parse(read.content[0].text).context, /common context/);
    const unavailable = await client.callTool({ name: 'read_site_workflow', arguments: { site: 'sciencedirect', workflow: 'search' } });
    assert.equal(unavailable.isError, true);
    assert.match(unavailable.content[0].text, /disabled/);
    assert.equal(stderr, '');
  } finally {
    await client.close();
  }
});
