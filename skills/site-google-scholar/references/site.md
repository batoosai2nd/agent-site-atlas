# 网站与验证环境

## 范围

2026-11-16 在 Windows Chrome 桌面英文界面、已有浏览器会话中验证了论文标题检索、引用对话框、BibTeX 文本、版本列表及一个出版方 PDF 的保存。Scholar 搜索结果会随地区、语言、时间和会话变化。机构全文链接取决于当前图书馆配置和访问权限。

公共入口是 [Google Scholar](https://scholar.google.com/)。标题、作者和来源年份帮助识别记录。结果右侧的全文链接、主标题链接和版本入口可能到达不同页面。

## 页面结构

- 首页的搜索文本框随语言显示 Search 或“搜索”，引用入口对应 Cite 或“引用”。
- 结果页包含时间、排序和文献类型控件。研究时看到 Any time、Custom range、Sort by relevance、Sort by date、Review articles，以及 include patents 和 include citations。
- 每条结果附近有 Cite、Save、Cited by、Related articles 和 All … versions。数量动态变化，应先限定论文记录再选控件。
- 本机扩展添加了文献评价和第三方入口。定位时结合目标域名和 Scholar 原生链接文字，弹窗消失后重新读取页面。

时间筛选、高级检索、机构 Library links 和提醒创建仍待独立验证。页码、被引数、版本数以及论文下载地址都应从当前页面读取。

## 来源

- [Google Scholar 首页](https://scholar.google.com/)
- [实测论文的 NeurIPS PDF](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf)

## 新上下文试用

2026-11-17，独立上下文的 agent 读取本包后，从中文首页检索 Attention is all you need，识别 Vaswani 等人的 2017 年记录，打开“引用”并核对 APA 的年份和卷号。中文弹窗显示 GB/T 7714、MLA 和 APA，引用格式以当前语言界面实际提供的选项为准。
