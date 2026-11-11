# Read a note / 笔记正文、图集与视频

Input: an observed note link or selected search result. Outcome: verified note identity and a clear account of which text/media was read.

## Open and scope the detail

Click the title or cover from the current page. The observed search result opened a same-tab overlay with `#noteContainer`; background results remained in the DOM. Scope extraction to that container to avoid mixing other cards and AI summaries into the note.

Observed useful locators, to confirm against the current page:

| Element | Locator / cue |
| --- | --- |
| Note title | `#noteContainer #detail-title` (`h1`) |
| Written description and hashtags | `#noteContainer #detail-desc` |
| Author header | `#noteContainer .author-container` |
| Independently scrolling text/comments | `#noteContainer .note-scroller` |
| Image counter | `#noteContainer .fraction` |
| Carousel arrows | `#noteContainer .arrow-controller.right` / `.left` |
| Comments | `#noteContainer .comments-container` |
| Detail close control | `.close-circle`, observed outside `#noteContainer` |

Read the title, author, description and displayed date. Preserve labels such as `编辑于`; they should not be relabelled as original publication dates. A month/day display without a year or a relative date does not establish a complete timestamp.

## Image notes

The description and image text are separate. Images with text did not expose that text as an ordinary note paragraph. Inspect the displayed image visually when it matters to the request.

The recorded gallery showed 1/11; the right arrow advanced it to 2/11 and changed the displayed image. Use the current counter to track coverage. The carousel DOM contained duplicate slides, so the number of slide elements is not the number of distinct images. For a full-image reading request, advance through the required pages and report any unreadable page; reading the description alone does not complete that request.

## Video notes

A video note showed a time/duration indicator instead of an image counter and began muted playback. Clicking its visible `video` paused it; the observed player class changed from `xgplayer-playing` to `xgplayer-pause`.

Written description, cover, playback frames and spoken content have different coverage. The live study verified metadata/body access and pause behavior, not the full video or a transcript. Do not describe a body-only reading as having watched the video.

## Continue or return

Scroll within the right-hand `.note-scroller` for lower body text and comments; scrolling the background page changes a different list. Read comments using [the comments guide](comments.md).

The observed `.close-circle` dismissed the overlay and restored the search results. Re-observe the list before selecting the next card. Like, collect, follow, comment and share controls near the content have effects beyond reading; do not use them as navigation controls.

Completion: note identity and the required content are read, with image/video coverage stated. Live coverage: one image note's body and first two gallery pages, a video note's body and playback pause, and return to the retained search list.
