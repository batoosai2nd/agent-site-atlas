---
name: site-xiaohongshu
description: Search Xiaohongshu 小红书 / REDnote, read note text and image carousels, expand comments and replies, and find public profiles. Use for xiaohongshu.com URLs or 小红书搜索、攻略搜集、笔记图文读取、评论区整理与博主查找.
license: MIT
---

# 小红书 / Xiaohongshu

Read [site context](references/site.md), then the relevant workflow:

| Task | Guide |
| --- | --- |
| Search notes, switch content type, collect candidates | [Search](references/search.md) |
| Read a note, inspect image pages or video metadata | [Note detail](references/note.md) |
| Read comments, expand replies and long text | [Comments](references/comments.md) |
| Find an author and inspect their public notes | [Users](references/users.md) |

Use the user's available browser tools and current login session. Inspect the current page before using a saved locator. Two desktop search layouts were observed: `/search_result_ai` and `/search_result/`; their controls differ.

Scope note reading to `#noteContainer` when its detail overlay is open. Search cards and AI summaries can remain in the surrounding page. The note description, text embedded in images, video content, and comments are separate evidence sources; identify which ones you actually read.

For complete-comment requests, follow both lazy loading and collapsed replies. A displayed total or a first snapshot does not establish completeness. See the completion checks in the comments guide.

Observed coverage includes search, conventional-page image filtering, note text, image navigation, comment loading/expansion and a public profile. Advanced sort/date filtering, complete video understanding, downloads and posting have not been verified. Reading and research do not authorize likes, follows, comments or messages.

Keep current signed links and account/session data out of shared pack updates. If login, CAPTCHA or an access restriction interrupts the task, preserve the current page and ask for the user action required by the host.
