# Browse communities

Input: a community name or a topic link visible on the page. Preconditions: accessible desktop community page.

1. Use the header `社区` navigation to reach the community homepage. On some detail pages there is also an inner `社区` tab; scope the header action to the navigation region if the label is ambiguous.
2. Select the named community button from the homepage. Observed examples included `Steam`, `PC游戏`, `盒友杂谈` and `数码硬件`. The right sidebar also contains repeated `查看` buttons; scope one to the intended community card before clicking it.
3. Verify the community identity after navigation. The tested `Steam` button opened `/app/topic/link/425422` in the same tab. Its inner controls included `游戏`, selected `社区`, `综合` and `智能排序`.
4. Open the current ordering control only when ordering matters. The tested Steam menu exposed **only `智能排序`**, already selected. Do not assume `最新` or `最热` exists because another site or the mobile app has those choices.
5. Open a relevant post by its observed href and follow the post/comments guides. Record the current community and ordering if they affect interpretation of the sample.

Completion: the intended community is identified and its available post list is visible. A list under intelligent ordering is a ranked sample, not a complete or strictly chronological archive.

Coverage: `live-verified`, 2026-11-11. Homepage → Steam community → ordering menu was exercised. Other communities may expose different tabs and ordering. The adjacent `游戏` view and its functionality were not tested.
