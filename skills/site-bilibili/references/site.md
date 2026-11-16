# Site context

Checked on **2026-11-16**, Windows Chrome, Chinese desktop web and an existing logged-in session. The homepage displayed a browser-extension warning and blocked promotional banners. Search, video playback, comments and public creator navigation were usable in that environment.

| Surface | Observed public URL shape and landmarks |
| --- | --- |
| Homepage | `https://www.bilibili.com/`, global search box, channel links and `热门` |
| Search | `https://search.bilibili.com/all?keyword=…` or `/video?keyword=…`, type strip, sorting buttons, `更多筛选` |
| Video | `https://www.bilibili.com/video/<BV-id>/`, main heading, publication metadata, player, description, creator block and comments |
| A video part | Same BV path with `?p=2` in the observed second-part transition |
| Creator space | `https://space.bilibili.com/<public-creator-id>`, `主页`, `动态`, `投稿`, `合集和系列` and a space search field |
| Uploads | Creator path followed by `/upload/video` |
| Space search | Creator path followed by `/search?keyword=…` |

Homepage submission opened a search tab. A result title opened a video tab, and the video's creator link opened a space tab. Sorting, filtering, part selection and space search updated their current tabs.

## Page boundaries and identifiers

- Search result cards pair title, creator, date, duration and visible engagement counts. Read the fields within the same card. Both `综合` and `视频` results included classroom links under `/cheese/` in this sample.
- The video page's main heading and creator block identify the current upload. The sidebar also contains recommendations and can contain a collection. Keep those scopes distinct when matching a task.
- Comments loaded after scrolling into the comment region. Repeated `点击查看`, `回复` and numeric buttons belong to individual discussion groups. Use the current accessibility tree or supported DOM locators to identify the intended group.
- The personal account controls in the global header and the video's public creator block lead to different spaces. Use the creator associated with the selected video.
- Observed video links included `spm_id_from` and `vd_source` tracking parameters. Public provenance below retains the origin, BV path and meaningful part parameter. Read navigation targets from the current UI and keep account-linked tracking out of shared files.

## Observed samples

The homepage query was `锂电池 原理`. Search duration `10分钟以下` and `最新发布` were exercised together. Switching from `综合` to `视频` reset both conditions. An independent fresh-context trial combined the video type, `10分钟以下`, `最近半年` and `最新发布`, then verified two detail pages with matching dates and durations. Search also exposed a custom-date entry and pagination. [Search entry](https://search.bilibili.com/)

The single-video sample supported playback/pause, Chinese AI-caption selection and current-cue reading, comment loading, latest ordering and a 24-reply group's first two pages. [Video sample](https://www.bilibili.com/video/BV1sa411Y7vH/)

The course sample included multiple parts inside a broader collection. Selecting `2.2 锂离子电池测试技术` retained the BV ID, added `p=2`, changed the tab title and set the player duration to 53 minutes 22 seconds. [Course sample](https://www.bilibili.com/video/BV1Zi4y1x7b5/?p=2)

The single-video creator's public space exposed one upload. Its space search for `电池` returned that video under the same creator ID. [Creator sample](https://space.bilibili.com/361480295)

## Coverage limits

The recorded tasks cover representative logged-in desktop flows. Logged-out/mobile layouts, homepage channels and rankings, global user search, article/live/paid-course workflows, custom dates, search pagination, full collection traversal, complete comment enumeration, full transcript export, video downloads and account-changing actions remain unverified. The research used ordinary browser UI and DOM-backed observation. The selected caption cue supports only that observed moment in the video.
