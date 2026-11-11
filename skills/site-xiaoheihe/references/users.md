# Inspect public author profiles

Input: an author attached to a visible post or comment. Preconditions: the corresponding public author link is present.

1. Read the actual author href. Tested links used `/app/user/profile/<id>`; an avatar/name link can be nested inside a post card. Choose the author link rather than the whole card when the goal is their profile.
2. On a post, `.page-header__user-wrapper` was the observed top author link, while `.link-user__user-wrapper` held the author/date block. Names also repeat in replies. Scope to the intended link before clicking.
3. Confirm the public profile's name and URL after navigation. The tested profile opened in the same tab and displayed level, signature, `关注`, `粉丝`, `获赞与收藏`, plus `动态`, `投稿` and a list of public post cards.
4. Read the visible post titles and links. Match a known post to corroborate author identity; display names alone may not be unique. Do not interpret visible counts as permissions to open private data or perform social actions.
5. Open the relevant post by its observed href when needed. Preserve displayed date context: dates on profile cards may differ from those in the post detail. Initial visible posts do not establish a complete author archive.

Completion: the intended public profile is verified and the requested visible post information is identified. The top navigation account/avatar is the logged-in user's menu, not the author link.

Coverage: `live-verified`, 2026-11-11. A post author's top link opened their public profile and its visible posts included the source post. `动态` and `投稿` were observed but switching them was not tested. The search-page `用户` category was visible but user-name search was not exercised. For a name-only request, inspect that current UI before proceeding and do not claim a verified path based only on this guide.
