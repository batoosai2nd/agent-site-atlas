# Site context / 站点与适用范围

Primary entry: `https://www.cnki.net/`. This pack describes the mainland desktop interface observed on 2026-11-04. A web-fetch service redirected the homepage to `oversea.cnki.net`, while the local Chrome browser showed the mainland site. Choose instructions from the current browser page, not the result of a different network's HTTP fetch. Overseas and institutional-proxy pages require fresh inspection; matching their domain does not establish identical controls.

## Entry map

| Task | Homepage control / observed destination |
| --- | --- |
| General search | `主题 ▼`, input `txt_SearchText`, `检索` |
| Advanced query | `高级检索 >` (`highSearch`) links to `https://kns.cnki.net/starter/advanced`, observed redirect to `/kns8s/AdvSearch` |
| Journal/publication lookup | `出版物检索 >` links to `https://navi.cnki.net/knavi` |
| Journal papers | `学术期刊`, destination `/res/category/journal` on kns.cnki.net |
| Dissertations | `学位论文`, destination `/res/category/dissertation` on kns.cnki.net |
| Login | `机构登录` and `个人登录` are separate controls |
| User help | `https://service.cnki.net/`; advanced form links to the official [search manual](https://piccache.cnki.net/index/helper/manuals.html) |

Use the site's ordinary academic search for paper retrieval. `CNKI AI`, `增强检索`, AI reading, duplicate checking and membership/recharge are separate products or tasks. The homepage's `旧版入口` is a different interface; do not switch versions merely because a saved locator fails.

Clicking `高级检索 >` opened another tab. The homepage stayed open. Rebind the new tab by its actual URL/title before searching; a still-visible homepage does not prove the click failed.

## Session state and access

The recorded browser was not logged in to CNKI. Article recommendation download controls showed `未登录`. Login and an institutional subscription can change available actions; discover the user's current state without saving credentials in this pack.

A Tencent-style puzzle overlay displayed `拖动下方拼图完成验证` / `安全验证` on the homepage and advanced page. When present, treat the task as awaiting verification. Preserve the tab and request user assistance according to the host's policy. Do not repeatedly submit searches, invent a direct download API, or claim successful retrieval behind the challenge.

## Verification coverage

Live observed on 2026-11-04, Windows Chrome, mainland desktop interface:

- Homepage field, category links and advanced-entry navigation.
- Advanced form labels, default field choices, expansion options, publication-date controls and inline query-syntax help.
- Recommendation cards with article title/author/source metadata and `下载`, `HTML阅读`, `CNKI AI阅读` controls; download help text `未登录`.
- CAPTCHA interruption. Search results, result filtering, article detail and a saved full-text file were not validated in this session.

The linked official helper labels itself 全球学术快报 2.0 / KNS 8.0 and has no reliable update date. Its field semantics, results, citation and reading sections provide documentation evidence; controls can differ from the deployed interface. No stable result-count, login entitlement or downloadable format is promised.

CNKI also advertises [CNKI AI LINK](https://mcp.cnki.net/). Its public page describes domain-specific MCP services and usage-based charging. This observation does not establish a general paper-download tool or transfer of institutional browser access to API access.
