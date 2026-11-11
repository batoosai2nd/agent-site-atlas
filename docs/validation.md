# 验证范围

版本：0.1.0。检查日期：2026-11-04（Asia/Shanghai）。环境：Windows、Node.js 22+、Chrome 桌面网页。网站账号与机构标识不随知识包分发。

## 本地程序

`npm test` 的 7 项测试通过，覆盖目录加载、精确域名匹配、中英文任务检索、流程和背景读取、选择安装与已有目录保护、包内引用路径边界、无效配置报错，以及官方 MCP SDK 的真实 stdio 初始化和工具调用。

使用实际知识包另行验证了全部 7 条流程的指令、背景和正文读取，CLI 检索与 JSON 读取、独立目录安装，以及 `serve --sites cnki`：工具列表、站点目录、搜索和读取均限于启用站点。停用站点不会出现在工具描述中，直接读取会返回错误。服务无需网站账户即可读取本地指南。

三个 Skill 均通过 skill-creator 的 `quick_validate.py` 格式检查；文档中的本地链接已检查。格式检查不代表网页任务已完成。

独立使用者将 ScienceDirect 包安装到新的临时目录，直接比较所复制文件的内容；再次安装返回退出码 1，已有文件保留。测试生成的临时目录保留在操作系统临时目录，需要清理时移入回收站。

## 网站实测

| 网站 / 流程 | 实际完成 | 未完成或仅有文档依据 |
| --- | --- | --- |
| CNKI 检索与高级表单 | 首页检索入口、字段和资源链接；高级检索新标签页；主题、作者、来源、日期、扩展选项和内嵌语法帮助 | 验证码阻断实际查询；未完成日期输入、结果筛选或精确题名检索 |
| CNKI 全文 | 推荐记录上的下载、HTML 阅读和未登录提示 | 详情、格式选择、权限核验和本地文件下载；CAJ/PDF 说明依据官方 KNS 8.0 手册 |
| CNKI 引文 | 阅读官方 KNS 8.0 手册中的引用及导出流程 | 未实测当前界面的引文导出 |
| ScienceDirect 检索 | 首页关键词查询；2025–2026 年份；开放获取筛选；文章详情与 DOI 核对 | 其他高级字段、批量操作和所有筛选组合未穷尽验证 |
| ScienceDirect 全文 | 文章身份、开放获取标签、HTML 全文、PDF 控件及官方交付域跳转 | PDF 交付页出现验证码；未确认本地 PDF 文件 |
| ScienceDirect 引文 | Cite 菜单及 RIS、BibTeX、text 选项；BibTeX 操作进入扩展导入界面 | 浏览器工具无法访问该扩展界面；未确认本地引文文件或执行外部库导入 |

知网官方手册标明全球学术快报 2.0 / KNS 8.0，更新时间未知；其规则需结合当前界面。页面上存在控件，只能证明入口可见。完整下载必须另外确认文件可读、身份匹配和真实保存路径。

## 独立前向试用

一个新上下文的 agent 只读取项目文件和任务要求，使用自己的浏览器标签页完成了 ScienceDirect 的 `battery lifetime prediction` 查询、2025–2026 年和 `Open access & Open archive` 筛选。它在详情中核对了以下两个开放获取结果：

| 题名 | DOI |
| --- | --- |
| Early-cycle lifetime prediction of lithium-ion batteries using a probability-anchored parallel framework with SHAP-based interpretability | [10.1016/j.rineng.2026.110261](https://doi.org/10.1016/j.rineng.2026.110261) |
| A critical review of state of charge estimation and lifetime prediction models for batteries used in electric vehicles | [10.1016/j.rineng.2026.112115](https://doi.org/10.1016/j.rineng.2026.112115) |

第二篇显示 December 2026 的期刊日期。这说明严格日期任务需区分期刊封面日期和在线发表日期；搜索年份筛选本身不能证明文章在某个日截止前发表。结果数会变化，不作为固定通过条件。

另两项试用检查了知网“篇名、作者、年份、PDF”的流程选择，以及引文被扩展接管后的处理。前者未提供具体题名/作者，也未执行真实检索下载；后者核对了操作指南，未重复触发扩展。它们是指南可用性检查，不是网站端到端成功记录。

## 客户端与性能

CLI 和 MCP 协议往返已实际验证。Codex、Claude Code、DeepSeek Harness、WorkBuddy 的接入路线根据官方文档整理；实际宿主兼容范围见[接入文档](integrations.md)。本次独立试用证明显式读取指南后的可用性，不证明所有宿主在新会话中都会自动触发。

REA 的页面结构、脚本、监听器、导航观察与执行覆盖能力已根据工具声明及项目文档核对。初始网站包使用浏览器观察和官方手册研究，未通过已连接的 REA 运行时完成逆向；[REA 指南](../skills/site-study/references/rea.md)描述的是可选研究路线。

本版未进行有包/无包的对照性能实验，不能量化耗时或成功率提升。对照实验应保持模型、浏览器工具、账号和任务条件一致，计入手册读取成本，并报告成功率、耗时、工具调用次数及人工介入。访问障碍应单独记录。
