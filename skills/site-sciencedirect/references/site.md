# Site context

Scope: ScienceDirect research articles and book chapters, desktop English interface. Elsevier's corporate site and Scopus are different products. Start with `https://www.sciencedirect.com/` or the article URL supplied by the user.

## Fast map

| Page | Landmark | Useful controls |
| --- | --- | --- |
| Home | Search for peer-reviewed journal articles and book chapters | `Find articles with these terms`, `In this journal or book title`, `Author(s)`, `Submit quick search`, `Open advanced search` |
| Search results | Result count and `Refine by:` | Years, Article type, Publication title, Subject areas, Access type; result title, `View PDF`, `Export` |
| Article | Title, authors, journal, DOI, access label | `View PDF. Opens in a new window.`, `Cite`, article outline |
| PDF delivery | May redirect to `pdf.sciencedirectassets.com` | PDF viewer/download or access/challenge page |

Prefer role + accessible name, scoped to the relevant form/result. IDs observed on 2026-11-04: home `qs`, `pub`, `authors`; results `year-range-start`, `year-range-end`, `accessTypes-openaccess`. Treat IDs as observations to check against the current DOM, not permanent contracts. Count suffixes on filter labels change with the query; match the label stem, then check its current state.

Controls and article HTML hydrate after initial navigation. An initial generic `View PDF` container can become a link after loading. Wait for the needed control or a settled result count; a `Loading results ...` heading is not a result. Avoid repeating submissions solely because a navigation returned an initially empty document.

An institution banner or personal login does not establish access to every article. `Open access`, `Open archive` and `Full text access` convey different reasons for access; use the selected article's current controls. A user may be able to read a full-text HTML article while PDF delivery requires a separate challenge.

Site links can contain ephemeral authorization parameters. Share the canonical article URL or DOI, not the PDF delivery URL, signed query strings, support sign-in links or browser extension URLs. Browser extensions may insert additional links into the page; use the site's own labeled controls and verify their destination.

## Evidence and limits

Observed 2026-11-04, Windows Chrome, English desktop interface, existing institution-enabled browser session. Account and institution names are intentionally omitted.

- Home → keyword search → results: completed with `battery lifetime prediction`.
- Years 2025–2026 and `Open access & Open archive`: applied and confirmed in the resulting UI and URL. This proves these tested branches, not every advanced field or filter.
- An open-access article was identified by title, authors and DOI. Article outline/full HTML and PDF entry were visible.
- `Cite` displayed RIS/BibTeX/text options. BibTeX was intercepted by a reference-manager extension; local export was not confirmed.
- `View PDF` opened the official delivery domain, which displayed `Are you a robot?`. PDF bytes and a local saved file were not verified. No CAPTCHA was solved.

Article used for those checks: [10.1016/j.rineng.2026.110261](https://doi.org/10.1016/j.rineng.2026.110261), [canonical article](https://www.sciencedirect.com/science/article/pii/S2590123026012958). It is an example, not a required target or query.

Official references: [search](https://www.elsevier.support/sciencedirect/answer/how-do-i-use-the-advanced-search), [results](https://www.elsevier.support/sciencedirect/answer/how-can-i-use-the-search-results-page), [downloads](https://www.elsevier.support/sciencedirect/answer/how-do-i-download-articles-and-chapters), [access](https://www.elsevier.support/sciencedirect/answer/what-different-access-levels-are-there-for-journals-and-books).
