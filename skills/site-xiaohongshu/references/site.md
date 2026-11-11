# Site context / 站点与适用范围

Observed on 2026-11-11 in Windows Chrome, Chinese desktop interface, with an existing logged-in session. Entry: <https://www.xiaohongshu.com/explore>. Account experiments and future redesigns may change the layout.

## Page map

| Surface | Observed behavior |
| --- | --- |
| `/explore` | Recommendation feed and a prominent search textarea. The observed visible input was `#search-input-in-feeds`. |
| `/search_result_ai` | Search submitted from the homepage reached this layout. It showed `笔记`, `用户`, `问点点 ai`, note cards and an AI summary panel. Visible search textarea: `#search-input-ai`. |
| `/search_result/` | A note's hashtag opened this conventional search layout in a new tab. It had `#search-input` and `全部`, `图文`, `视频`, `用户` tabs. |
| Note detail | Clicking a note title opened a `#noteContainer` overlay in the same tab. The address changed to `/explore/<note-id>` while the search page remained underneath. Closing the overlay restored the list. |
| `/user/profile/<id>` | A user-result name opened a new tab containing public profile information and `笔记` / `收藏` sections. |

Use current visible fields, not a placeholder remembered from a previous visit: observed search placeholders changed. Hidden input variants can coexist with the visible textarea. Click the observed note or user link; when the current tab appears unchanged, check for a newly opened tab before retrying.

Cards and profile links carried `xsec_token`, `xsec_source` and other contextual parameters. Preserve a current link when using it inside the authorized session. Do not invent, regenerate or copy those values into this pack. A note ID can support deduplication, but an unsigned ID-only URL is not a verified substitute for the site's current link.

## Scope and provenance

Live observations used an ordinary museum-information query and public pages:

- Homepage query `上海博物馆 参观攻略`: results loaded and the accompanying AI panel was closed.
- Public note `上海博物馆东馆｜4h极速通关攻略✅`, note ID `6a8d83ac0000000021031816`: title/body read, image counter advanced from 1/11 to 2/11, and 11 rendered comments matched the displayed total with `- THE END -` present.
- Public video note `上海博物馆2小时速通攻略|重点➕有趣展品✅`, note ID `6a4540aa000000001603d2d0`: metadata/body read; playback paused; a reply expansion increased loaded comment rows from 20 to 21; scrolling increased them to 41; one long comment expanded to a `收起` state. The displayed total was 79; complete collection of that thread and full video understanding were not attempted.
- Clicking `#上海博物馆` opened conventional search. `图文` became the active tab, then `用户` returned profiles. A matching public museum profile opened and its posted-note list was inspected.
- An independent fresh-context task searched `简历 排版`, identified two notes, read one written description and expanded a reply group. Its displayed total was 52; 17 initially loaded comment/reply rows became 23 after two expansion actions. Image content and the complete thread were outside that trial.

These titles and note IDs identify the observation samples, not fixed future test results. No post bodies, comment corpus, account identifiers, signed links or private screenshots are distributed with the pack.

The `筛选` entry was visible in both search layouts, but its panel did not remain open after the available click actions. Sort/date options and their application are unverified. Login/CAPTCHA recovery, short-link redirects, downloads, creator publishing, messages, likes, follows and collection changes are outside the live coverage.
