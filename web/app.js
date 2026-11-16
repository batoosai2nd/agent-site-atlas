const REPOSITORY = 'https://github.com/batoosai2nd/agent-site-atlas';
const evidenceLabels = {
  'live-verified': '代表流程已验证',
  'live-partial': '部分完成',
  documented: '文档依据',
};
const siteMarks = { cnki: '知', sciencedirect: 'Sd', xiaohongshu: '小红书', xiaoheihe: '盒', jd: 'JD' };
const elements = {
  search: document.querySelector('#search'),
  categories: document.querySelector('#category-filters'),
  evidence: document.querySelector('#evidence-filter'),
  sort: document.querySelector('#sort'),
  cards: document.querySelector('#cards'),
  count: document.querySelector('#result-count'),
  heading: document.querySelector('#catalog-heading'),
  detail: document.querySelector('#detail-dialog'),
  detailContent: document.querySelector('#detail-content'),
  contribute: document.querySelector('#contribute-dialog'),
  toast: document.querySelector('#toast'),
};
let packs = [];
let selectedCategory = '';
let toastTimer;
let returnFocus;

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function link(text, href, className = 'text-button', external = true) {
  const element = node('a', className, text);
  element.href = href;
  if (external) {
    element.target = '_blank';
    element.rel = 'noopener noreferrer';
  }
  return element;
}

function button(text, action, className = 'button button-light') {
  const element = node('button', className, text);
  element.type = 'button';
  element.addEventListener('click', action);
  return element;
}

function chinesePart(text) {
  const parts = text.split(' / ');
  return parts.find(part => /[\u3400-\u9fff]/.test(part)) || parts[0];
}

function icon(pack) {
  const element = node('span', 'site-icon', siteMarks[pack.id] || pack.name.slice(0, 2));
  element.dataset.site = pack.id;
  element.setAttribute('aria-hidden', 'true');
  return element;
}

function toast(text) {
  clearTimeout(toastTimer);
  elements.toast.textContent = text;
  elements.toast.hidden = false;
  toastTimer = setTimeout(() => { elements.toast.hidden = true; }, 3500);
}

async function copyPrompt(textarea) {
  try {
    await navigator.clipboard.writeText(textarea.value);
    toast('已复制，可以发给你的 Agent');
  } catch {
    textarea.focus();
    textarea.select();
    toast('请使用复制快捷键复制选中的提示词');
  }
}

function installPrompt(pack, agent = '自动识别') {
  const client = agent === '自动识别' ? '请识别当前 agent 客户端，按其用户级技能目录安装。' : `当前客户端是 ${agent}，请按其用户级技能安装方式执行。`;
  return `请从 ${REPOSITORY} 的 main 分支安装 ${pack.name} 网站技能。\n仅安装 skills/site-${pack.id} 的完整目录，保留 SKILL.md、site.json、LICENSE 与 references 等包内文件。\n先阅读仓库 docs/integrations.md。${client}\n已有同名技能时比较内容，相同则跳过，有差异则保留并报告。\n安装后读取 SKILL.md 和至少一份流程指南，报告实际安装路径、技能是否被宿主识别，以及需要的刷新步骤。请直接执行安装。`;
}

function openModal(dialog) {
  if (dialog.open) return;
  returnFocus = document.activeElement;
  dialog.showModal();
}

function createCard(pack) {
  const card = node('article', 'skill-card');
  card.dataset.site = pack.id;
  const body = link('', `#site-${pack.id}`, 'card-link', false);
  body.setAttribute('aria-label', `查看${chinesePart(pack.name)}技能详情`);
  const top = node('div', 'card-top');
  top.append(icon(pack), node('span', 'category-tag', pack.category));
  body.append(top, node('h3', '', chinesePart(pack.name)));
  body.append(node('p', 'site-domain', new URL(pack.entry_url).hostname));
  body.append(node('p', 'card-description', chinesePart(pack.description)));
  const tags = node('div', 'workflow-tags');
  pack.workflows.slice(0, 3).forEach(flow => tags.append(node('span', '', chinesePart(flow.title))));
  if (pack.workflows.length > 3) tags.append(node('span', '', `+${pack.workflows.length - 3}`));
  body.append(tags);
  const verified = pack.workflows.filter(flow => flow.evidence === 'live-verified').length;
  const partial = pack.workflows.some(flow => flow.evidence === 'live-partial');
  const meta = node('div', 'card-meta');
  const coverage = verified ? `✓ ${verified}/${pack.workflows.length} 条流程已验证` : `${pack.workflows.length} 条流程 · ${partial ? '部分完成' : '文档依据'}`;
  meta.append(node('span', verified ? 'verified-label' : 'partial-label', coverage));
  const checked = node('time', '', pack.last_checked);
  checked.dateTime = pack.last_checked;
  checked.title = '最近核查日期，具体流程日期见详情';
  meta.append(checked);
  const actions = node('div', 'card-actions');
  const download = link('↓ 下载 ZIP', `./downloads/site-${pack.id}.zip`, 'button button-light', false);
  download.download = `site-${pack.id}.zip`;
  download.setAttribute('aria-label', `下载${chinesePart(pack.name)}技能 ZIP`);
  const install = button('安装到 Agent ↗', () => {
    if (location.hash === `#site-${pack.id}`) showDetail(pack);
    else location.hash = `site-${pack.id}`;
  }, 'button install-button');
  install.setAttribute('aria-label', `安装${chinesePart(pack.name)}技能到 Agent`);
  actions.append(download, install);
  card.append(body, meta, actions);
  return card;
}

function renderCategories() {
  const counts = new Map();
  packs.forEach(pack => counts.set(pack.category, (counts.get(pack.category) || 0) + 1));
  const options = [['', packs.length], ...counts.entries()];
  elements.categories.replaceChildren();
  for (const [category, count] of options) {
    const control = button('', () => {
      selectedCategory = category;
      renderCategories();
      renderCards();
    }, '');
    control.setAttribute('aria-pressed', String(selectedCategory === category));
    control.append(node('span', '', category || '全部网站'), node('span', 'category-count', count));
    elements.categories.append(control);
  }
}

function renderCards() {
  const query = elements.search.value.normalize('NFKC').trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  const evidence = elements.evidence.value;
  const results = packs.filter(pack => {
    if (selectedCategory && pack.category !== selectedCategory) return false;
    if (evidence !== 'all' && !pack.workflows.some(flow => flow.evidence === evidence)) return false;
    const searchable = [pack.name, pack.id, pack.entry_url, pack.description, pack.category, ...pack.domains, ...pack.aliases,
      ...pack.workflows.flatMap(flow => [flow.title, flow.description, ...flow.keywords])].join(' ').normalize('NFKC').toLowerCase();
    return terms.every(term => searchable.includes(term));
  });
  const order = elements.sort.value;
  results.sort((a, b) => {
    if (order === 'name') return a.name.localeCompare(b.name, 'zh-CN');
    if (order === 'workflows') return b.workflows.length - a.workflows.length || a.id.localeCompare(b.id);
    return b.last_checked.localeCompare(a.last_checked) || a.id.localeCompare(b.id);
  });
  elements.cards.replaceChildren(...results.map(createCard));
  elements.count.textContent = `${results.length} 个网站 · ${results.reduce((count, pack) => count + pack.workflows.length, 0)} 条操作流程`;
  elements.heading.textContent = selectedCategory || '全部网站';
  document.querySelector('#empty-state').hidden = results.length > 0;
}

function showDetail(pack) {
  const heading = node('div', 'detail-heading');
  const identity = node('div');
  const title = node('h2', '', chinesePart(pack.name));
  title.id = 'detail-title';
  identity.append(title, node('p', '', `${new URL(pack.entry_url).hostname} · ${pack.category}`));
  heading.append(icon(pack), identity);
  const download = link('↓ 下载完整 ZIP', `./downloads/site-${pack.id}.zip`, 'button button-dark', false);
  download.download = `site-${pack.id}.zip`;
  const links = node('div', 'button-row');
  links.append(download, link('查看源码 ↗', `${REPOSITORY}/tree/main/skills/site-${pack.id}`), link('贡献记录 ↗', `${REPOSITORY}/commits/main/skills/site-${pack.id}`));

  const installation = node('section', 'detail-install');
  installation.id = 'installation';
  installation.append(node('h3', '', '让 Agent 帮你安装'));
  const label = node('label', '', '选择客户端');
  const select = node('select');
  ['自动识别', 'Codex', 'Claude Code', 'DeepSeek Harness', 'WorkBuddy'].forEach(name => {
    const option = node('option', '', name);
    option.value = name;
    select.append(option);
  });
  label.append(select);
  const prompt = node('textarea');
  prompt.readOnly = true;
  prompt.setAttribute('aria-label', `${chinesePart(pack.name)}安装提示词`);
  prompt.value = installPrompt(pack);
  select.addEventListener('change', () => { prompt.value = installPrompt(pack, select.value); });
  installation.append(label, prompt, button('复制安装提示词', () => copyPrompt(prompt), 'button button-dark'));

  const flows = node('section');
  flows.append(node('h3', '', '操作流程与验证范围'));
  flows.append(node('p', 'detail-note', '“已验证”表示代表任务完成。具体分支、账号条件与未完成部分记录在各流程指南中。'));
  const context = node('details', 'workflow');
  context.append(node('summary', '', '网站环境与适用条件'), node('pre', 'guide-text workflow-body', pack.contextText));
  flows.append(context);
  for (const flow of pack.workflows) {
    const details = node('details', 'workflow');
    const summary = node('summary', '', chinesePart(flow.title));
    summary.append(node('span', '', `${evidenceLabels[flow.evidence]} · ${flow.last_checked}`));
    const body = node('div', 'workflow-body');
    body.append(node('p', '', flow.description));
    body.append(link('在 GitHub 阅读 ↗', `${REPOSITORY}/blob/main/skills/site-${pack.id}/${flow.file}`));
    body.append(node('pre', 'guide-text', flow.content));
    details.append(summary, body);
    flows.append(details);
  }
  elements.detailContent.replaceChildren(heading, node('p', 'dialog-intro', chinesePart(pack.description)), links, installation, flows);
  openModal(elements.detail);
}

function handleHash() {
  if (!location.hash.startsWith('#site-')) {
    if (elements.detail.open) elements.detail.close();
    return;
  }
  const id = location.hash.slice(6);
  const pack = packs.find(item => item.id === id);
  if (pack) showDetail(pack);
  else toast('这个技能暂未收录，请在目录中查找');
}

const contributionPrompt = document.querySelector('#contribution-prompt');
contributionPrompt.value = `请把我们研究的网站整理为 Agent Site Atlas 知识包，并提交到 ${REPOSITORY}。\n使用 site-study（若尚未安装，先从该仓库安装完整 skills/site-study）。读取其中的发布指南和仓库最新 CONTRIBUTING.md。\n检查已有包，整理完整技能目录，写清实际完成的流程、验证日期与未完成部分，保留公开来源和许可证。检查并移除账号、Cookie、签名链接等私人内容。\n运行仓库规定的相关检查，通过我的 GitHub 账号创建贡献分支或 fork，并提交 PR。请返回 PR 链接与检查结果，方便维护者审阅合并。`;
document.querySelector('#copy-contribution').addEventListener('click', () => copyPrompt(contributionPrompt));
document.querySelectorAll('[data-contribute]').forEach(control => {
  control.addEventListener('click', () => openModal(elements.contribute));
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    if (dialog === elements.detail && location.hash.startsWith('#site-')) {
      history.replaceState(null, '', `${location.pathname}${location.search}#catalog`);
    }
    returnFocus?.focus();
  });
});
document.querySelector('.search-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#catalog').scrollIntoView();
});
elements.search.addEventListener('input', renderCards);
elements.evidence.addEventListener('change', renderCards);
elements.sort.addEventListener('change', renderCards);
document.querySelectorAll('[data-query]').forEach(control => {
  control.addEventListener('click', () => {
    elements.search.value = control.dataset.query;
    renderCards();
    elements.search.focus();
  });
});
document.querySelector('#reset-filters').addEventListener('click', () => {
  elements.search.value = '';
  elements.evidence.value = 'all';
  selectedCategory = '';
  renderCategories();
  renderCards();
});
window.addEventListener('hashchange', handleHash);
document.addEventListener('keydown', event => {
  if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.target.matches('input, textarea, select, [contenteditable="true"]') || document.querySelector('dialog[open]')) return;
  event.preventDefault();
  elements.search.focus();
});

try {
  const response = await fetch('./catalog.json');
  if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
  packs = await response.json();
  renderCategories();
  renderCards();
  handleHash();
} catch (error) {
  elements.count.textContent = '目录加载失败';
  document.querySelector('#load-error').hidden = false;
  elements.search.disabled = true;
  elements.evidence.disabled = true;
  elements.sort.disabled = true;
  console.error(error);
}
