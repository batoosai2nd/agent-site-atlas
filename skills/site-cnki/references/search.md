# Find papers / 检索论文

Inputs: title or keywords; optional author, publication/source, year and document type. Output: identified records with title, authors, source/year and canonical links, or an explicit access/verification blocker.

## Choose the search route

For a subject query, use the homepage's `主题` search field and `检索`. The search input's observed DOM ID is `txt_SearchText`. Check the current DOM before using the ID. The default subject search should not be described as an exact title match.

For a known title or several bibliographic constraints, use `高级检索 >` and [advanced search](advanced.md). Choose the live field menu's title option (`篇名` or the current equivalent), then enter the requested title. Title-field selection and result matching require current verification; the recorded run did not complete a title search.

The official KNS 8.0 manual describes title-field `精确` as containing the whole query, not necessarily equality with the entire title. Verify the returned full title, author and source. Its DOI exact mode is described as equality; subject matching also differs from the narrower `篇关摘` field. Check that the current interface offers the intended field before using these documented semantics.

If the user asks for a dissertation, use `学位论文` rather than assuming the combined search is restricted to dissertations. Publication-title lookup uses `出版物检索 >`; it is distinct from searching for an article title.

## Execute and identify

1. Read the current field selection, enter the user's query, and submit once.
2. Check for a new tab, results, no-results message, login prompt or verification challenge. In particular, `安全验证` / `拖动下方拼图完成验证` requires assistance; it is not an empty result set.
3. On a result page, inspect the active query and resource category before interpreting its count. Apply requested dates/types only through controls actually present in that result interface or the advanced form.
4. Identify the intended record from title plus author/source/year. Similar titles and different thesis/journal versions may coexist. Open the result's own title link and check the detail record before downloading.
5. Return verified bibliographic facts. Separate unavailable metadata from inferred values. Use the actual article link; never construct a `filename`, database identifier or download-order parameter from a title.

## Recovery

- A new tab opened: inspect it rather than repeating the homepage submission.
- CAPTCHA: preserve the page and request verification; resume after it is completed.
- Query has no results: check field choice and combined constraints. Ask before relaxing a requirement when that changes the intended result.
- Different interface/version: observe its field labels and update the applicable step. Do not reuse old element indexes or switch domains to evade an access restriction.

Completion requires an actual result record matching the user's request. Filling a form or displaying recommendations before a search does not establish search success.

Evidence: homepage/input and advanced navigation live observed; query submission through results remains unverified because of CAPTCHA. Matching semantics come from section 1.2.2 of the [official KNS 8.0 manual](https://piccache.cnki.net/index/helper/manuals.html), whose current applicability must be checked. See [site context](site.md).
