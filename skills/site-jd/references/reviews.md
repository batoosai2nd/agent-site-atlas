# Read reviews and product Q&A

Input: an exact product variant and the requested review/question scope. Preconditions: the product page and selected item are identified.

## Review overlay

1. The main-page `.comment-root` shows selected previews. Click `全部评价` to open the same-page `商品评价` overlay. Read within that overlay; the underlying preview and recommendations remain in the DOM.
2. Observed filters included `全部`, `图/视频`, `追评`, `回头客`, topic tags, `好评`, `中评`, `差评`, `最新` and `当前商品`.
3. For a specific variant, select `当前商品` and verify the returned review variant labels and active styling. Before selection, the M221 off-white page included reviews of other colors and M220. After selection, the sampled rows all labelled the selected M221 off-white variant; displayed counts and positive-rate summary changed too.
4. Select the requested review category, then `最新` if recency matters. The label's mere presence does not mean it is selected. In the trial, the initial negative-review sample contained older dates; selecting `最新` refreshed it to more recent entries. Verify the active state and actual dates.
5. Read review date, variant, buyer text and `商家：` response separately. A seller response is not another buyer review. Month/day labels lack a stated year, and a name can occur in several distinct rows.
6. Scroll **inside the overlay's review list** for additional batches. Its scrollbar is separate from the page and the product information column. The sampled list grew from 4 to 8 rendered review rows after scrolling; do not assume a fixed batch size.
7. Close the overlay with its visible upper-right X and verify return to the same product. Its generated CSS class is not a stable locator; inspect the current panel or use a fresh screenshot.

The panel included a generated recent-feedback summary. A message about no negative reviews in the last seven days does not mean there are no historical negative reviews. Ground the user's answer in the actual dated rows and state which filters were applied. Do not click `有用`, `回复` or reaction counts merely to inspect a review.

Completion for a sample: report the selected item, filters/order and rows actually read. `全部评价` is an entry label, not evidence of exhaustive reading. Neither the full discussion nor an end-of-list signal was reached in this study; do not claim completeness from displayed rounded counts.

## Product Q&A

1. `.answers-root` is the main-page `问大家` preview. `全部问答` opened a separate overlay with question groups.
2. Read the question and answer role labels: `卖家`, `买家` and `热心群众` are distinct sources. Preserve which answer belongs to which question.
3. A group can preview two answers followed by `共N条回答 展开更多`. Scope that control to its question, especially when several groups have the same count.
4. In the tested three-answer group, expansion exposed the third answer and changed the control to `收起回答`. For another group, inspect whether further expansion remains rather than assuming one click completes it.
5. Use the overlay's close control to return. The textbox for publishing a question, `发布问题`, `我的问答` and `首赞` are not needed for reading existing answers.

Coverage: `live-verified`, 2026-11-11. Review overlay, current-item filtering, negative reviews, latest ordering, incremental loading and closing were exercised. Q&A overlay and one group expanded from two to three answers and was closed. Full review/Q&A enumeration, review reply threads and image/video review reading remain unverified.
