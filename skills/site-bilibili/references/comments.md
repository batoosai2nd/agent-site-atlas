# Comments and reply pages

Start with the identified video and the user's required ordering and discussion scope.

1. Scroll to the `评论` region below the description. The tested initial page showed `正在玩命加载…` until the region entered view. Read the loaded comment heading and visible discussion before deciding whether access failed.
2. Choose `最热` or `最新` in the comment region. Selecting `最新` replaced the root-comment order. Distinguish a root comment's date from the dates of its displayed replies.
3. Keep each root comment's author, text, time and visible response count together. The `回复` button opens a composing action. Reading nested discussion uses the nearby `共N条回复` and `点击查看` control.
4. Scope `点击查看` to the intended root comment. In the tested 24-reply group, opening it displayed ten replies plus `共3页`, numbered buttons, `下一页` and `收起`.
5. Use the pagination inside that reply group. Clicking its `下一页` replaced the displayed reply batch with the next one. Read or retain the current batch before advancing if the task needs all replies.
6. Treat the main comment feed and each reply group's pages as separate reading boundaries. Continue root-feed loading or reply pagination only as far as the task requires, checking the current UI after each change. End-of-feed signals and the final reply page must be observed before claiming complete coverage.

Report the ordering, inspected comments/reply pages and any remaining scope. The heading count and a single loaded batch alone cannot establish that the whole discussion has been read.

## Verification

`live-verified` on 2026-11-16 for lazy comment loading, switching to latest order, opening a 24-reply group and reading its second page. The sample heading displayed 77 comments. Complete root-feed traversal and all three reply pages were outside the trial. [Video sample](https://www.bilibili.com/video/BV1sa411Y7vH/)
