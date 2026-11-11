import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { loadAtlas, listSites, findWorkflows, readWorkflow, installSkills, agentDestination } from '../src/atlas.js';
import { fixture } from './fixtures.js';

test('route only exact website hosts and rank Chinese and English tasks', async () => {
  const atlas = await loadAtlas(await fixture());
  assert.equal(findWorkflows(atlas, { url: 'https://kns.cnki.net/starter/advanced', query: '帮我下载全文' })[0].id, 'download');
  assert.equal(findWorkflows(atlas, { query: 'ScienceDirect download PDF' })[0].site, 'sciencedirect');
  assert.equal(findWorkflows(atlas, { query: '知网搜索论文' })[0].id, 'search');
  assert.deepEqual(findWorkflows(atlas, { url: 'https://www.cnki.net.attacker.example/search?q=cnki.net' }), []);
  assert.deepEqual(findWorkflows(atlas, { url: 'https://example.org/www.cnki.net' }), []);
  assert.deepEqual(findWorkflows(atlas, { url: 'https://unlisted.cnki.net/' }), []);
  assert.throws(() => findWorkflows(atlas, { url: 'https://cnki.net:password@example.org/' }), /credentials/);
  assert.throws(() => findWorkflows(atlas, { url: 'file:///cnki.net' }), /HTTP/);
  assert.throws(() => findWorkflows(atlas, {}), /Provide/);
});

test('read includes shared context and only the requested task; unknown ids fail', async () => {
  const atlas = await loadAtlas(await fixture());
  const result = await readWorkflow(atlas, 'cnki', 'download');
  assert.match(result.context, /common context/);
  assert.match(result.instructions, /Read only the relevant workflow/);
  assert.match(result.content, /Download/);
  assert.doesNotMatch(result.content, /Search/);
  assert.equal(result.workflow.evidence, 'live-partial');
  await assert.rejects(readWorkflow(atlas, 'cnki', '../../other'), /Unknown workflow/);
  await assert.rejects(readWorkflow(atlas, 'other', 'download'), /Unknown or disabled site/);
});

test('MCP site selection excludes disabled packs from list, search, and read', async () => {
  const data = await fixture();
  const atlas = await loadAtlas({ ...data, sites: ['cnki'] });
  assert.deepEqual(listSites(atlas).map(site => site.id), ['cnki']);
  assert.deepEqual(findWorkflows(atlas, { url: 'https://www.sciencedirect.com/' }), []);
  await assert.rejects(readWorkflow(atlas, 'sciencedirect', 'search'), /disabled/);
  await assert.rejects(loadAtlas({ ...data, sites: ['unknown'] }), /Unknown site/);
  await assert.rejects(loadAtlas({ ...data, sites: [] }), /at least one/);
});

test('selective install produces a standalone skill and preflights all conflicts', async () => {
  const data = await fixture();
  const atlas = await loadAtlas(data);
  const destination = path.join(data.root, 'installed');
  const result = await installSkills(atlas, ['cnki', 'study'], destination);
  assert.equal(result.length, 2);
  assert.deepEqual((await readdir(destination)).sort(), ['site-cnki', 'site-study']);
  assert.match(await readFile(path.join(destination, 'site-cnki', 'references', 'download.md'), 'utf8'), /Download/);
  const before = await readFile(path.join(destination, 'site-cnki', 'SKILL.md'), 'utf8');
  await assert.rejects(installSkills(atlas, ['sciencedirect', 'cnki'], destination), /already exists/);
  assert.deepEqual((await readdir(destination)).sort(), ['site-cnki', 'site-study']);
  assert.equal(await readFile(path.join(destination, 'site-cnki', 'SKILL.md'), 'utf8'), before);
  await assert.rejects(installSkills(atlas, ['unknown'], destination), /Unknown/);
  await assert.rejects(installSkills(atlas, ['cnki'], 'relative-path'), /absolute/);
});

test('manifest paths cannot read files outside the selected skill', async () => {
  const data = await fixture();
  const atlas = await loadAtlas(data);
  const outside = path.join(data.skillsRoot, 'outside.md');
  await writeFile(outside, 'not a manual');
  atlas.packs[0].workflows[0].file = '../outside.md';
  await assert.rejects(readWorkflow(atlas, atlas.packs[0].id, 'search'), /inside its skill/);
});

test('malformed pack and host names fail with actionable errors', async () => {
  const data = await fixture();
  const manifestPath = path.join(data.skillsRoot, 'site-cnki', 'site.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  manifest.domains = ['*.cnki.net'];
  await writeFile(manifestPath, JSON.stringify(manifest));
  await assert.rejects(loadAtlas(data), /invalid exact hostname/);
  assert.equal(agentDestination('claude', data.root), path.join(data.root, '.claude', 'skills'));
  assert.throws(() => agentDestination('workbuddy'), /--dest/);
});
