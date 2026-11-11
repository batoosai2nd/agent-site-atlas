# Search notes / 笔记搜索

Input: the user's topic, optional content type, date requirements and desired coverage. Outcome: identifiable relevant note candidates, with only actually applied filters reported.

## Enter the query

1. Inspect the current layout and visible search field. On the observed homepage it was `textarea#search-input-in-feeds`; on AI search, `textarea#search-input-ai`; on conventional search, `input#search-input`. Hidden alternatives can exist, so verify visibility rather than selecting the first textbox or matching a changing placeholder.
2. Fill the query and submit Enter. Confirm the query and loaded note results. Homepage submission reached `/search_result_ai` in the recorded environment.
3. If an AI panel appears, its `ai总结…篇笔记生成` text is generated synthesis. Read the actual note cards for source research. `关闭 AI 对话` successfully closed this panel while retaining results.

## Content type and filters

The conventional `/search_result/` page exposed `全部`, `图文`, `视频`, `用户`. Clicking `图文` changed the corresponding element to `#image.channel.active`. The URL's `type` parameter did not change in this trial, so use the visible selected state as the evidence of filtering.

The observed AI page had `笔记`, `用户` and `问点点 ai`, with topic suggestion chips such as `综合` and query-specific subtopics. Do not treat a chip labelled `综合` as proof that a sort menu exists.

The `筛选` entry was visible, but advanced sorting and date filtering were not completed. If needed, inspect the current panel and confirm the selected condition and resulting list. If the panel cannot be operated, report the unapplied condition; any manual date checks must be described as checks of the inspected notes, with the coverage stated.

A hashtag link in a note opened conventional search in a new tab. This is a topic-navigation option, not a guarantee that an arbitrary original multiword query or its filters will be preserved. Recheck the query in the new tab.

## Collect useful candidates

- Cards contain a note link, a title when supplied, an author link, a display date and engagement text. Some cards have no textual title. Recommendation modules such as `大家都在搜` are query suggestions, not notes.
- A card's cover and title can link to the same note; deduplicate by the note ID in the observed links. Repeated titles alone are not reliable identifiers.
- Open the note title or cover for detail. The author name has a different destination. Confirm identity in the detail overlay using [note reading](note.md).
- The feed can grow when scrolling or when a locator brings a lower card into view. Maintain a small record of inspected note IDs when collecting multiple results; the currently loaded DOM is not the complete search corpus.
- For bounded requests, stop when enough relevant results have been inspected. For exhaustive requests, state the search query, filters, loaded/inspected coverage and any stopping boundary. Do not label a partial feed as all matching notes.

Completion: requested query is visible, candidates have been identified, and any claimed content-type condition has a confirmed selected state. Live coverage: homepage query/results, AI-panel dismissal, conventional `图文` selection and hashtag navigation. Advanced sorting/date filters remain unverified.
