# Source notes

Checked on 2026-11-04 (Asia/Shanghai). These are documentation observations, not proof that a workflow completed in a particular browser or account. Site-pack observation notes identify live coverage separately. The summaries below are original descriptions; the linked publisher manuals remain authoritative for their own products.

## ScienceDirect

| Source | Relevant behavior |
| --- | --- |
| [Advanced search](https://www.elsevier.support/sciencedirect/answer/how-do-i-use-the-advanced-search) | At least one search field is required. `Show more fields` exposes title and title/abstract/keywords searches. Years accept four-digit years and ranges. Select a suggested publication to restrict to that exact journal or book. Uppercase Boolean operators and quoted phrases are supported; proximity operators are not supported. |
| [Search results](https://www.elsevier.support/sciencedirect/answer/how-can-i-use-the-search-results-page) | Results default to relevance. The guide describes year, publication-title and access filters, and relevance/date sorting. A result title opens the document; an available PDF link opens its PDF. |
| [Citation export](https://www.elsevier.support/sciencedirect/answer/how-can-i-export-my-citations) | An article's `Cite` menu offers RIS, BibTeX and text. Results have per-document export; selecting checkboxes enables multi-document export. Search-result citation exports do not include abstracts. Save-to-reference-manager actions are distinct from saving a local citation file. |
| [Download articles and chapters](https://www.elsevier.support/sciencedirect/answer/how-do-i-download-articles-and-chapters) | A PDF icon opens the document, sometimes in another window; the reader/browser then supplies Download or Save. A recommendation dialog can preselect additional documents, so retain only the requested article. Multiple-document download availability depends on organizational access and site limits. |
| [Access levels](https://www.elsevier.support/sciencedirect/answer/what-different-access-levels-are-there-for-journals-and-books) | Open-access and open-archive material can be read and downloaded. Institutional subscription coverage can depend on volumes and dates. Visibility of an abstract does not establish full-text entitlement. |
| [Article page](https://www.elsevier.support/sciencedirect/answer/what-can-i-do-on-an-article-page) | The article outline navigates sections and supplementary materials; `Cite` exports a reference. Citation counts and related links are separate from full-text access. |

The above help pages display an update date of 2026-03-02. Their described filters are not identical across pages; use controls observed in the current interface rather than assuming every listed filter is always available. ScienceDirect and Scopus have distinct search interfaces and syntax.

## CNKI

- [Main site](https://www.cnki.net/): the canonical entry point. The research web-fetch service redirected this URL to the overseas site; the local browser may show the mainland site. The URL and visible interface determine which instructions apply.
- [Customer service center](https://service.cnki.net/): the public HTML identifies this as CNKI's support center and requires JavaScript for the application. A successful HTML request alone does not verify its help content or any search/download workflow.
- [Global Academic Focus 2.0 / KNS 8.0 manual](https://piccache.cnki.net/index/helper/manuals.html): the advanced-search page links this official manual. It was readable through a local HTTP request. The document identifies its product version but provides no reliable update date. Its relevant sections establish the following documented behavior:
  - **Search (1.2.2):** title exact matching requires the complete query within the title; it does not require whole-title equality. DOI exact matching requires equality. Subject search and title/keyword/abstract search are distinct.
  - **Results (1.3.7, 1.3.10):** grouped selections use a confirmation control. Sorting includes publication time, relevance, citations and downloads. Partner-publisher records can link to the original source.
  - **Citations (1.4.2):** selected records enter export through the results' export/analysis control or document-management center. Choose a format before exporting or copying; the documented default is GB/T 7714-2015.
  - **Reading (1.6.1.2):** eligible records provide CAJ, PDF or HTML options, subject to access. CAJ uses CAJViewer; HTML is content-dependent. The detail-page citation control offers formats and a route to more formats.
- [CNKI AI LINK](https://mcp.cnki.net/): public HTML identifies an official MCP service center and describes domain services for law, medicine, basic education and patents, with usage-based charging. This establishes that the service exists. It does not establish that it supplies general academic full-text download, that a user's browser subscription transfers to API access, or that any advertised tool has been invoked here.

The CNKI packs distinguish current live observations from KNS 8.0 documented procedures. Runtime availability, control labels and access conditions must be checked on the current page.

## WorkBuddy

- [Skills guide](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market): the documented local-package route is **专家·技能·连接器 → 技能 → 添加技能 → 上传技能**. Natural-language marketplace installation is a separate mechanism. This page does not establish one universal filesystem installation directory.
- [Open-platform skill format](https://open.workbuddy.cn/docs/skill): a package contains a named skill folder with `SKILL.md` and optional `references`, `scripts` and `templates`. Marketplace submission has additional bilingual display metadata, version and author requirements. Those publishing requirements should not be confused with proof of local import compatibility.
- [Connector format](https://open.workbuddy.cn/docs/connector): WorkBuddy documents MCP + Skill and CLI + Skill connector packaging. Use the host's documented connector configuration rather than assuming another agent's configuration file is accepted unchanged.

Local import and automatic selection still need verification in the user's installed WorkBuddy version. Core Agent Skills compatibility does not prove that every host supports every optional frontmatter field or browser operation.
