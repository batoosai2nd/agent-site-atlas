# Read comments and nested replies

Input: an opened post and the requested scope: selected useful comments, a sample, or all accessible comments. Preconditions: the post body is identified and any image viewer is closed.

## Main list and reply groups

1. Locate `全部评论 N` and the comments region. Observed containers were `.link-comment`, `.link-comment__list` and `.link-comment__comment-item` for root rows. Clicking `全部评论` in the tested layout did not expose a sorting menu.
2. Record root author, visible date, body and any images. Replies appear inside that root's `.link-comment__comment-children`, with `.comment-children-item` rows. Preserve `回复 <name>:` and `作者` attribution so a reply is not represented as a new root comment or as the post author's own statement.
3. A reply group can show only a preview plus `全部 N 条回复`. Click the button **inside that root's group**, then inspect the new rows and the group's next control.
4. The button may become `查看更多回复`. Continue clicking within the same group while more replies are needed. An observed 39-reply group went from 2 preview replies to 12, then 22; the first click did not load all 39. Do not hard-code this batch size. `查看更多回复` can also be the initial visible control in another group.
5. To load more root comments, scroll the main page over the comments column toward its currently loaded bottom. Observe whether root rows increase or a loader/end marker appears. A tested larger post grew from 22 to 39 loaded root rows after scrolling. Scrolling the right sidebar will not load the main discussion.
6. Images in comments can carry information even when the text row is blank. Use the visible image and the current viewer controls when relevant; comment-image viewer behavior was not separately exercised.

For repeated button labels, first identify the root by its author and a distinctive excerpt, then scope the button to that observed row. Inspect uniqueness before clicking. Do not use a saved global button index; additional loaded comments change positions.

## Counting and completion

The tested small post displayed `全部评论 12`, a composer label `已有16条评论`, **12 root rows and 4 replies**, and `暂无更多内容`. This supports a root-count versus total-with-replies interpretation for that sample. A larger post displayed 103 at the header and 234 at the bottom; its entire discussion was not enumerated, so the count relation was not independently reconciled there.

For an all-comments request, require all of the following within the accessible UI:

- Reach `暂无更多内容` for the main comment list, not a sidebar or another page section.
- Inspect each loaded root for remaining `全部 N 条回复` or `查看更多回复` controls, and finish the requested reply groups.
- Read any relevant truncated text or image evidence. Root-list completion alone does not prove reply or image completion.
- Compare observed root/reply totals with displayed labels, explaining any mismatch. A loader, stalled request, inaccessible reply or unreconciled count means coverage remains partial.

For a sampling task, stop after the requested scope and report the number of roots/replies or groups actually examined. Repeated observation with no new content is not proof that the discussion ended. Do not toggle numeric like buttons, the fixed collection action or the comment composer to read the discussion.

Coverage: `live-verified`, 2026-11-11. Root lazy loading and two sequential reply-batch expansions were exercised; one small post reached its end marker with all 12 roots and 4 displayed replies reconciled. A fresh-context trial on another post expanded a four-reply group from 2 preview rows to all 4, and the expansion button disappeared. It sampled 15 roots while that page displayed 18 at the header and 37 at the bottom; that whole discussion was not completed. The 39-reply group and the larger 234-comment discussion were also sampled, not read to exhaustion. Complete expansion of a large reply group remains unverified.
