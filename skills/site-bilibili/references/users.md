# Creator spaces and uploads

Start with a known video's creator or an identified public space URL.

1. Open the creator's name in the selected video's creator block. The tested action opened a new `space.bilibili.com/<public-creator-id>` tab. Verify the public name and the connection to the source video.
2. The space navigation exposed `主页`, `动态`, `投稿` and `合集和系列`. Selecting `投稿` reached `/upload/video` and showed `TA的视频`, media-type counts and ordering labels `最新发布`, `最多播放`, `最多收藏`.
3. To search this creator's content, use the search field alongside the space navigation. A second global search field remains in the website header, with a changing recommendation placeholder. Inspect the field's region before entering the keyword.
4. Fill the space search field and press Enter. Searching `电池` in the sample produced `/361480295/search?keyword=…` and `共找到关于"电池"的 1 个视频`. The results retained the same public creator ID and included the source video.
5. Read result titles and dates in the creator's results. Use a candidate's title to inspect its video detail and verify the author before reporting it.

Completion requires the intended creator and matching uploads to be identified. Counts and available space tabs can vary with the creator and current access.

## Verification

`live-verified` on 2026-11-16 for opening the video's public creator space, selecting uploads and submitting a space-specific keyword query. The sample creator had one video. Global user search, space sorting, dynamic-post reading, full upload pagination and collection pages remain unverified. [Public creator sample](https://space.bilibili.com/361480295)
