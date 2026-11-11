import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

export async function fixture() {
  // Retain isolated fixtures for inspection; this project never deletes user files.
  const root = await mkdtemp(path.join(os.tmpdir(), 'site-atlas-test-'));
  const skillsRoot = path.join(root, 'skills');
  for (const [id, name, domains, aliases] of [
    ['cnki', '中国知网', ['www.cnki.net', 'kns.cnki.net'], ['知网', 'CNKI']],
    ['sciencedirect', 'ScienceDirect', ['www.sciencedirect.com'], ['Elsevier']],
  ]) {
    const directory = path.join(skillsRoot, `site-${id}`);
    await mkdir(path.join(directory, 'references'), { recursive: true });
    await writeFile(path.join(directory, 'SKILL.md'), `---\nname: site-${id}\ndescription: Operate ${name}.\n---\n\nRead only the relevant workflow.\n`);
    await writeFile(path.join(directory, 'references', 'site.md'), `${name} common context: confirm the current page and access state.\n`);
    const workflows = [
      { id: 'search', title: '检索 / Search', description: 'Find papers using topic or title.', keywords: ['检索', '搜索', 'search', 'find papers'] },
      { id: 'download', title: '下载 / Download', description: 'Download an accessible article and verify its file.', keywords: ['下载', '全文', 'download', 'PDF', 'full text'] },
    ].map(item => ({ ...item, file: `references/${item.id}.md`, evidence: 'live-partial', last_checked: '2026-11-04' }));
    for (const workflow of workflows) await writeFile(path.join(directory, workflow.file), `${name}: ${workflow.title}\nSuccess requires observing the final result.\n`);
    await writeFile(path.join(directory, 'site.json'), JSON.stringify({ id, name, description: `Manual for ${name}`, entry_url: `https://${domains[0]}/`, domains, aliases, context: 'references/site.md', workflows }, null, 2));
  }
  await mkdir(path.join(skillsRoot, 'site-study'));
  await writeFile(path.join(skillsRoot, 'site-study', 'SKILL.md'), '---\nname: site-study\ndescription: Study a website.\n---\nRecord observed behavior.\n');
  return { root, skillsRoot };
}
