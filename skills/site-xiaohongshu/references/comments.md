# Read comments and replies / 评论、楼中楼与完整性

Input: an open note and the user's requested comment scope. Outcome: comments attributed to the right note/thread, with loaded coverage and remaining gaps stated.

The comment region is `#noteContainer .comments-container`, inside the independently scrolling `.note-scroller`. Inspect its current total label (`共 … 条评论`), loaded rows and expansion controls.

## Three separate reading operations

1. **Load more root comments:** scroll within the note's right-hand text/comment pane. Re-read after scrolling. In the observed larger thread, loaded `.comment-item` rows increased from 21 to 41; the initial batch did not represent its displayed total of 79.
2. **Load replies:** click the `展开 N 条回复` control for the intended parent comment. Its observed class was `.show-more`. Read the surrounding parent before choosing among identical labels. `回复` beside a comment is a composition action, not a reply-expansion control. Reply groups can themselves paginate: in the independent trial, `展开 6 条回复` added five rows, then `展开更多回复` added the remaining row. Re-inspect the same group after each expansion and continue its visible loading control when the requested scope requires all replies.
3. **Expand truncated text:** a long comment had `...展开` with `.expand-btn`. Clicking it exposed a longer body and a `收起` state. This is separate from loading more replies. Preserve inline emoji/image information when important; plain text can omit image-only content.

Read-only DOM inspection can locate the currently rendered rows: `.comment-item` includes root and reply rows, with `.comment-item-sub` identifying observed replies. Deduplicate using currently observed comment element IDs if maintaining an aggregate; do not store sample IDs as selectors in a reusable manual.

## Completion boundary

- For a targeted question, inspect the relevant comments and replies and state that scope.
- For all-comments requests, continue ordinary scrolling and relevant expansions until the comment list reaches an end state and no requested collapsed content remains. Record loaded unique rows separately from the displayed total.
- In the small trial, 11 rendered rows matched `共 11 条评论` and `- THE END -` was present. This establishes that sample's observed completion, not a universal count rule.
- A root-list end marker alone does not prove every collapsed reply is expanded. A total alone does not prove every row is loaded. If counts differ, content remains collapsed, or loading stops without an end state, report partial coverage rather than claiming completeness.
- If verification, rate limits or an access error appears, stop automated loading at that boundary and request the relevant user assistance. Do not replace the visible flow with guessed private endpoints.

Keep author notes, ordinary comments and any AI/bot-generated comments distinct. Their presence does not independently verify the underlying factual claims.

Live coverage: complete observed 11-comment sample; initial and subsequent batches of a 79-comment sample; collapsed-reply and long-comment expansion. An independent task read 23 of a displayed 52 comment/reply rows, including a reply group requiring two expansion actions. Neither larger thread was collected in full.
