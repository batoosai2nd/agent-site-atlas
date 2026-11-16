# Search and filter videos

Start with video keywords and the user's requested date, duration or ordering constraints.

1. Fill the homepage's global search field and press Enter. Its placeholder can be a rotating recommendation. Confirm the actual query and inspect newly opened tabs if the homepage remains unchanged. The observed results opened on `search.bilibili.com/all`.
2. Choose the requested type from `综合`, `视频`, `番剧`, `影视`, `直播`, `专栏` or `用户`. Counts beside types can change. In the tested `综合` → `视频` transition, the query remained while duration and sorting reset. Apply filters after selecting the type and recheck them after any later type change.
3. Sorting buttons included `综合排序`, `最多播放`, `最新发布`, `最多弹幕` and `最多收藏`. Clicking `最新发布` refreshed the results and added `order=pubdate` to the observed URL.
4. Open `更多筛选`. Duration options were `全部时长`, `10分钟以下`, `10-30分钟`, `30-60分钟` and `60分钟以上`. Selecting `10分钟以下` refreshed the results with `duration=1`. It remained applied when `最新发布` was selected afterward.
5. The date row exposed `全部日期`, `最近一天`, `最近一周`, `最近半年` and `开始日期 至 结束日期`. Selecting `最近半年` added `pubtime_begin_s` and `pubtime_end_s` to the URL. In the combined trial, selecting `最新发布` afterward retained both date parameters and `duration=1`. Read the resulting range from the current page and verify candidate publication dates in detail. The range depends on the day of the query. Custom date entry remains unverified. The partition area displayed `分区筛选维护升级中，敬请期待`.
6. Read each candidate's title, creator, date, duration and destination together. Classroom links under `/cheese/` appeared in both tested type views. Confirm that a requested ordinary video leads to a `/video/<BV-id>` page.
7. Open the candidate's title and inspect the resulting tab. Verify its heading, public creator and publication metadata. The search card's duration can describe the total length of a multi-part upload, so use the player and part list for a requested segment.

Pagination exposed `上一页`, numbered `第 N 页` buttons, a `当前页` marker and `下一页`. Search pagination remains unverified. For a task that requires it, read the current selection and verify the new page's cards and retained filters after navigation. The combined-filter trial showed a different page count after sorting, so describe selections as samples from the current filtered ordering.

Complete the task when the requested query and applied constraints are confirmed and the selected video identities match their detail pages. Report the observed sample size and ordering when supplying a selection of results.

## Verification

`live-verified` on 2026-11-16 for homepage submission, a new search tab, duration filtering, recent-half-year filtering, latest-publication sorting, type switching and new video-detail tabs. An independent fresh-context trial combined `视频`, `10分钟以下`, `最近半年` and `最新发布`, then checked two matching detail pages. Other ordering buttons, date presets, custom dates and search pagination require verification in the current task.
