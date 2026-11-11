# Export citations

Inputs: identified articles and requested RIS, BibTeX or text format. Output: a verified citation file or rendered citation with the requested records.

## One article

1. Verify the article identity and open `Cite`.
2. In `Export or save citation`, select `Export citation to RIS`, `Export citation to BibTeX` or `Export citation to text` according to the requested format.
3. Use the browser's download capability if a local file is generated. Check the saved file's title, DOI and record count. For BibTeX, confirm a valid entry and expected DOI; for RIS, confirm a complete record ending with `ER  -`.
4. Distinguish file export from `Save to Refworks` or `Add to Mendeley`, which can write to an external library. Use those only when that destination is requested.

## Several results (documented)

Select only the requested result checkboxes and use the results toolbar's `Export`. Per-result `Export` is scoped to that row. Inspect the chosen records and format before completing the action. The official guide notes that search-result citation exports do not include abstracts.

## Extension interception

A reference-manager extension may intercept citation downloads and open its own import-confirmation page. In the recorded run, BibTeX export opened a Zotero confirmation tab; the browser tool could not read that extension URL and no local file was confirmed. Tell the user which destination appeared. Do not import into a personal library merely to satisfy a local-file request, change extension security settings, or use another transport to work around a denied browser surface.

When supported by the user's browser, complete the site's normal export. If it is blocked, retain the verified bibliographic metadata and explain the unfinished export; a manually formatted citation must be labeled as such rather than as the site's exported file.

Coverage: menu/options live verified; local file and bulk export not live verified. [Official citation guide](https://www.elsevier.support/sciencedirect/answer/how-can-i-export-my-citations).
