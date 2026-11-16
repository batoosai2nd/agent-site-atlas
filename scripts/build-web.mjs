import { readdir, readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';
import { loadAtlas, readWorkflow } from '../src/atlas.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const atlas = await loadAtlas();
const iconsDirectory = path.join(root, 'web', 'icons');
const iconFiles = await readdir(iconsDirectory);

async function filesIn(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = {};
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) Object.assign(files, await filesIn(absolute, relative));
    else if (entry.isFile()) files[relative] = new Uint8Array(await readFile(absolute));
    else throw new Error(`Unsupported entry in skill package: ${relative}`);
  }
  return files;
}

async function archiveSkill(id, directory) {
  const files = await filesIn(directory);
  for (const required of ['SKILL.md', 'LICENSE']) {
    if (!files[required]) throw new Error(`site-${id} is missing ${required}`);
  }
  const archive = {};
  for (const [relative, content] of Object.entries(files)) {
    archive[`site-${id}/${relative}`] = content;
  }
  await writeFile(path.join(output, 'downloads', `site-${id}.zip`), zipSync(archive));
}

await mkdir(path.join(output, 'downloads'), { recursive: true });
await mkdir(path.join(output, 'icons'), { recursive: true });
const catalog = [];
for (const pack of atlas.packs) {
  if (pack.category !== undefined && (typeof pack.category !== 'string' || !pack.category.trim())) {
    throw new Error(`site-${pack.id}: category must be a non-empty string when provided.`);
  }
  const workflows = [];
  let contextText;
  for (const flow of pack.workflows) {
    const result = await readWorkflow(atlas, pack.id, flow.id);
    contextText = result.context;
    workflows.push({ ...flow, content: result.content });
  }
  const { id, name, description, entry_url, domains, aliases } = pack;
  const iconFile = iconFiles.find(file => path.parse(file).name === id);
  if (iconFile) await copyFile(path.join(iconsDirectory, iconFile), path.join(output, 'icons', iconFile));
  catalog.push({
    id, name, description, entry_url, domains, aliases,
    icon: iconFile ? `./icons/${iconFile}` : undefined,
    category: pack.category?.trim() || '其他网站',
    last_checked: workflows.map(flow => flow.last_checked).sort().at(-1),
    contextText,
    workflows,
  });
  await archiveSkill(pack.id, pack.directory);
}
await archiveSkill('study', path.join(atlas.skillsRoot, 'site-study'));
await writeFile(path.join(output, 'catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);
for (const file of ['index.html', 'styles.css', 'app.js']) {
  await copyFile(path.join(root, 'web', file), path.join(output, file));
}
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`Built ${catalog.length} website entries and ${catalog.length + 1} standalone ZIP files in dist/.`);
