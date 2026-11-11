# Find a public profile / 用户与博主

Input: an author/account name or a user link in a note. Outcome: the intended public profile and its visible posted-note list.

1. On the conventional search page, enter the account/topic query and choose `用户`. This replaces note cards with user results; it is not a filter over the original notes.
2. Compare the account name, available category/identity indicators, description and public identifier as needed to disambiguate similar names. A name match or follower count alone does not establish official status.
3. Click the account name, avoiding the adjacent `关注` button. In the tested user-result flow, the profile opened in a new tab while the search tab remained unchanged. Find and bind that actual new tab before continuing.
4. Inspect the public profile and `笔记` section. Pinned notes can precede recent notes, so the first card is not necessarily the newest. Follow a posted note's observed link for [detail reading](note.md).

The tested profile also exposed a `收藏` section and a message indicating its collection content was not visible. Respect current visibility; do not treat inaccessible collections as empty or attempt to reveal them. `关注` and `发消息` are separate actions that a lookup does not authorize.

Live coverage: a conventional search's `用户` results, opening a matching museum profile in a new tab, and inspection of its public posted-note list. Full author-history enumeration and collection access were not performed.
