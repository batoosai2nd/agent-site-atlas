# Video detail and subtitles

Start with a video URL or a title opened from search or a creator's uploads.

1. Confirm the `/video/<BV-id>/` path and main heading. Read the public creator in the video information block, publication timestamp, description and relevant visible counts. Preserve the selected `p` parameter for a part-specific task.
2. Use the current `播放/暂停` control to manage playback. The tested video started automatically. Observe the resulting player state and current time. The controls can disappear from the accessibility tree when the player is outside the viewport.
3. Read the description below the player and action toolbar. The tested descriptions were visible in full. If a different upload offers an expansion control, open it and verify the expanded text before claiming the whole description has been read.
4. Inspect whether the player offers `字幕`. In the single-video sample, opening it exposed `关闭`, a `中文` option with an AI badge and `字幕设置`. Selecting `中文` made the current caption cue readable in the page. Subtitle availability varies by upload and part.
5. Capture captions only over the time range actually observed. Preserve the AI-caption label when relevant to the output. The sampled cue, the creator's description and the audiovisual track provide different evidence for a summary.
6. When a subtitle setting is changed only for inspection, restore its previous choice. The native accessibility tree combined the menu heading and off choice as `字幕 关闭`. Its element-index click did not select the off item. A fresh screenshot identified the individual `关闭` row, and clicking that row removed the generated caption. Re-observe the current menu when choosing a fallback target.

For a video-summary request, state the material used and its time coverage. Detailed claims about unseen sections require additional viewing or a supported transcript source. For multi-part content, continue with [Parts and collections](parts.md).

## Verification

`live-verified` on 2026-11-16 for identity and description reading, automatic playback, pausing, Chinese AI-caption selection, current-cue reading and restoring captions to off. Full transcript retrieval, subtitle-file export, entire-video understanding, downloads, quality switching and speed changes remain unverified. The course sample's player exposed no subtitle control in the inspected state. [Single-video sample](https://www.bilibili.com/video/BV1sa411Y7vH/)
