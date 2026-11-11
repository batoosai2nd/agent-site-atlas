# Read post text and images

Input: an observed post link. Preconditions: the detail page is accessible.

## Text and attribution

1. Confirm `/app/bbs/link/<id>`, the title, author and displayed date. The tested image-text layout had `返回`, a top author link and a second author/date block near the title.
2. Read the main post body, preserving paragraphs and distinguishing it from comments and sidebar `相似内容`/`为你推荐`. Useful observed containers were `.hb-bbs-link__content`, `.hb-bbs-image-text`, `.section-title__content` and `.image-text__content`. Check current DOM before using them; other article layouts were not verified.
3. Treat category/topic tags as navigation controls. Following them leaves the post context; it is not required for reading the body.

## Gallery and long images

1. Inspect the gallery indicator, such as `1/5`. These images may be rendered in divs with empty alt text and therefore be absent from a text snapshot. Take a screenshot when image evidence matters.
2. In the observed layout the unlabeled arrow buttons were `button.header-image__left-btn` and `button.header-image__right-btn`. The first image's left button had `forbidden`. Click the needed direction and verify the indicator/image changed.
3. Click the current image to open its viewer. The observed active image locator was `.header-image__item.swiper-slide-active .header-image__item-image`; scope to the active slide, not all images.
4. The open viewer was `.hb-cpt__image-viewer`, with `button.image-viewer__close-btn`, `button.image-viewer__left-btn` and `button.image-viewer__right-btn`. Use a fresh screenshot if these unlabeled controls cannot be resolved from the current DOM.
5. A long image used `.image-viewer__item-image.scroll`. Scroll **over the image itself** to read the continuation, and inspect the resulting view. The surrounding page and sidebar can scroll independently. UI-looking buttons printed inside an uploaded screenshot are image content, not live website controls.
6. Close the viewer and verify return to the same post. Only report images or portions actually inspected. Seeing the gallery count does not establish that every image was read.

Completion: relevant body text and requested image content are read, attributed to the post, with unread portions explicitly identified. Continue to [comments](comments.md) when community responses matter.

Coverage: `live-verified`, 2026-11-11. Opened an image-text post, read its text, changed a five-image gallery from 1/5 to 2/5, opened the second long image, scrolled inside it and closed the viewer. The full five-image set, viewer arrow navigation, video playback and other long-article layouts were not exercised. Observing a viewer arrow establishes its presence, not an executed branch.
