# Agent Site Atlas

**让 agent 在操作网站之前，先读到别人已经验证过的经验。**

[English](README.en.md) · [接入方式](docs/integrations.md) · [验证范围](docs/validation.md) · [贡献指南](CONTRIBUTING.md)

Agent Site Atlas 是一个可选择安装、可跨会话复用的网站操作知识库。每个网站包保存任务入口、页面控件、条件分支和完成标准；agent 结合当前网页执行。当前包含 **中国知网（CNKI）**、**ScienceDirect（Elsevier）**、**小红书（Xiaohongshu）**、**小黑盒（Xiaoheihe）** 和 **京东（JD.com）**，另附一个用于研究新网站的 Skill。

可以直接安装 Skill，也可以通过 CLI 或本地 MCP 按网站和任务取用知识。已有浏览器工具负责点击、填写和下载；账号与访问权限保留在用户自己的浏览器中。

## 快速开始

从本仓库下载源码并解压，在项目目录运行以下命令。CLI 需要 **Node.js 22 或以上**；直接复制 Skill 文件夹不需要 Node.js。

```sh
node bin/site-atlas.js list
node bin/site-atlas.js search --site cnki --task "高级检索 主题 年份"
node bin/site-atlas.js read sciencedirect download
```

只安装自己需要的网站：

```sh
node bin/site-atlas.js install cnki sciencedirect --agent codex
node bin/site-atlas.js install sciencedirect --agent claude
node bin/site-atlas.js install xiaohongshu --agent codex
node bin/site-atlas.js install xiaoheihe --agent codex
node bin/site-atlas.js install jd --agent codex
node bin/site-atlas.js install cnki --agent deepseek
```

这些命令将独立 Skill 文件夹复制到相应用户目录。已存在的目标会让安装停止，原文件保留。也可指定一个空的、绝对路径技能目录：

```sh
node bin/site-atlas.js install cnki --dest "C:/my-agent/skills"
```

启用或重新发现 Skill 后，在新会话中正常提出任务，例如：

> 在 ScienceDirect 查找 2025–2026 年关于 battery lifetime prediction 的开放获取论文，列出标题和 DOI。

> 在知网按篇名和作者找这篇论文，并下载当前账号有权限访问的全文。

Skill 的名称和描述供 agent 自动选择；是否自动触发取决于宿主。需要明确调用时，可以说“使用 site-cnki”或“使用 site-sciencedirect”。安装 Skill 不会创建浏览器连接，MCP 也不会自动监听页面导航。

## 当前知识包

| 包 | 内容 | 实测范围 |
| --- | --- | --- |
| `site-cnki` | 检索、高级字段组合、全文获取、引文导出 | 首页、跳转、高级表单及下载入口已观察；检索结果与文件下载受验证码/访问条件限制；引文流程依据官方手册 |
| `site-sciencedirect` | 搜索筛选、论文详情/PDF、引文导出 | 关键词、年份及开放获取筛选已跑通；论文详情与导出菜单已观察；PDF 遇验证码，引文被浏览器扩展接管 |
| `site-xiaohongshu` | 笔记搜索、图文阅读、评论展开、公开用户主页 | 两套搜索界面、图文类型切换、详情浮层、图集翻页、评论加载/展开及公开主页已实测；高级排序/日期筛选与完整视频读取未验证 |
| `site-xiaoheihe` | 内容搜索、社区导航、帖子图文、评论与公开作者主页 | 搜索类型切换、Steam 社区、图集翻页/长图滚动、主评论加载/回复分批展开及公开主页已实测；游戏详情/价格、交易、视频与发布未验证 |
| `site-jd` | 商品搜索与筛选、规格价格、参数预览、评价与问大家 | 价格/自营筛选、规格切换、当前商品/差评/最新评价及问答展开已实测；规格切换曾需用户完成验证，结算与交易未验证 |
| `site-study` | 将新网站的操作经验整理为同样的知识包 | 提供研究步骤、内容格式和可选 REA 调查流程 |

每条流程带有 `last_checked` 和 `evidence`：`live-verified` 表示代表性任务完成，`live-partial` 表示仅部分步骤完成，`documented` 表示来自官方文档。具体分支以包内验证说明为准。第一版不声称所有账号、界面和下载路径均已跑通，也没有跨模型提速倍数的测量结果。

## 本地 MCP

需要 MCP 时安装依赖：

```sh
npm install --ignore-scripts
node bin/site-atlas.js serve --sites cnki,sciencedirect
```

`serve` 使用 stdio JSON-RPC，由 MCP 客户端启动。直接在终端运行后等待输入是正常行为。服务只读取本地手册，不抓取网站、不操作浏览器、不收集账号信息。

工具：

| 工具 | 用途 |
| --- | --- |
| `list_sites` | 列出启用的网站与流程 |
| `find_site_workflows` | 根据当前 URL、网站 ID 或中英文任务查找流程 |
| `read_site_workflow` | 读取选中的流程、共同背景、Skill 指令和验证范围 |

`--sites cnki` 可以只暴露知网。各客户端配置见[接入文档](docs/integrations.md)。直接使用 Skill 或 CLI 时，无需安装 MCP 依赖。

## 研究并共享一个新网站

```sh
node bin/site-atlas.js install study --agent codex
```

然后告诉 agent：“使用 site-study 研究这个网站的检索和下载流程，写成 Agent Site Atlas 知识包。”

知识包的最小结构是 `SKILL.md`、`site.json` 与按任务拆分的 `references/`。网站经验保存在公开文件里，可单独下载、审阅和修改。README、代码与原创操作手册采用 MIT 许可；网站、商标、论文及外部文档仍适用各自权利和条款。

REA 是研究复杂交互时的可选工具，可以帮助观察页面、分析前端脚本和追踪操作。普通用户使用已生成的包不需要 REA。参见[研究 Skill](skills/site-study/SKILL.md)和[贡献指南](CONTRIBUTING.md)。

## 开发与验证

```sh
npm install --ignore-scripts
npm test
```

测试覆盖域名路由、任务检索、引用读取、选择安装与冲突保护，并用官方 MCP SDK 完成真实 stdio 握手及工具调用。测试在系统临时目录保留小型隔离夹具；需要清理时请移至系统回收站。网站实测与客户端兼容范围见[验证记录](docs/validation.md)，官方资料见[来源说明](docs/sources.md)。

本项目专注于网站操作经验的复用。手册不能授予账号权限、代替验证码处理，也不能证明当前操作已经成功；最终结果仍应由当前页面和实际产物确认。

## 相关项目

[Actionbook](https://github.com/actionbook/actionbook) 同样探索让 agent 先读取网站操作手册再执行任务。Agent Site Atlas 当前聚焦可单独分发的知识包、中文学术网站和可核对的验证范围。[REA](https://github.com/morluto/rea) 提供可选的页面及前端运行研究能力。
