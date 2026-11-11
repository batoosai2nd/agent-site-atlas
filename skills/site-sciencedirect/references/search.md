# Search and filters

Inputs: keywords or paper identity; optional authors, journal, publication years, article type and access requirement. Output: matching article identities and canonical links, with the applied constraints.

## Keyword route (live verified)

1. On the home page, fill the combobox `Find articles with these terms`; submit with `Submit quick search`.
2. Wait for the result count and result titles. Check that the search field still contains the intended query. Search results default to relevance.
3. For a year range, fill `Start Year` and `End Year`, then click `Apply year range`. Confirm the year chip or the `date` URL parameter. Do not interpret the disabled Apply button after submission as a failed filter.
4. If the user requests freely accessible papers, check `Open access & Open archive` in `Access type`. Confirm its checked state after results finish updating. Institutional subscription filtering is a different condition.
5. Apply other requested facets using current labels. `Article type`, `Publication title` and `Subject areas` were present; use their `Show more` controls when necessary. These additional facets were inspected, not all executed in the recorded run.
6. Use `Sort by date` only when recency is requested. Relevance order is not chronological order. For strict cutoffs, check article-level dates: an issue can have a future cover date while the article is already online.
7. Read each selected result's title, authors, journal, date and access label. Open the exact title link, or its currently observed href in a new tab. A title click may open another tab or leave the original list visible; inspect current tabs before repeating the click.

A filter can re-render while the browser tool is checking the clicked element. In the recorded run, checking the access filter reported a state error, but the new DOM showed it checked and the filtered results loaded. Observe the new state before retrying; a repeated toggle may undo the intended filter.

## Precise/advanced route (official documentation)

Use `Open advanced search` on home or `Open Advanced Search` on results. On the standalone advanced page, `Show more fields` exposes narrower fields. Follow the live labels for `Title`, `Title, abstract or author-specified keywords`, `Author(s)`, `Author affiliation`, `Year(s)`, publication, volume/issue/page or ISSN/ISBN.

- For a known title, use the Title field when available and check the returned title rather than relying on the first keyword result.
- For a DOI, a supplied DOI link can resolve directly to the paper; otherwise search it and verify the DOI on the article. Do not invent a PII from a DOI.
- In the publication field, select the matching suggestion to constrain to that exact journal or book.
- Use uppercase `AND`, `OR`, `NOT`, parentheses and double quotes for phrases where needed. ScienceDirect's current help states that proximity operators are unsupported; Scopus syntax is not interchangeable.
- Four-digit years and ranges belong in the year field. Keep bibliographic terms out of the broad keyword field when a precise field is available.

If no matches appear, inspect the currently applied query and filters. Relax only a constraint the user permits and report the change. Do not silently replace the requested title, date range or document type.

## Result verification

Success means relevant results with the requested constraints visibly applied. Record canonical article links and enough metadata to disambiguate namesakes. Counts fluctuate; no fixed count is an acceptance criterion. Loading pages, search alerts and AI-generated answers are not substitute search results.

Observed URL pattern: `/search?qs=...&date=2025-2026&accessTypes=openaccess`; encode values correctly if reusing an observed search URL. Prefer the UI for unfamiliar filters instead of guessing parameter names.

Sources: [advanced search](https://www.elsevier.support/sciencedirect/answer/how-do-i-use-the-advanced-search), [results page](https://www.elsevier.support/sciencedirect/answer/how-can-i-use-the-search-results-page), and the live checks in [site context](site.md).
