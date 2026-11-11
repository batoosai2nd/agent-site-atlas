# Site context

Last checked: **2026-11-11**, Windows Chrome, Chinese desktop web, an existing logged-in account and delivery destination. The search layout displayed `传统模式` / `简洁模式`; switching modes was not tested.

| Surface | Observed URL / landmarks |
| --- | --- |
| Homepage | `https://www.jd.com/`; textbox named `搜索`, button `搜索`, optional AI-search switch |
| Search | `https://search.jd.com/Search?keyword=…`; `全部商品`, brands, price/seller filters, result cards |
| Product | `https://item.jd.com/<item-id>.html`; store search, main gallery, right-hand variant/price panel |
| Review overlay | Opened by `全部评价` on the same product page; heading `商品评价`, own scrolling list |
| Q&A overlay | Opened by `全部问答`; question groups, answer roles and expansion controls |

The homepage query stayed in the same tab. Clicking a search-result product title opened a new tab. Selecting a product variant navigated that detail tab to another item ID. Check actual current tabs and URLs after each transition.

## Useful page boundaries

- `.page-right-information` was the detail region containing the selected item, price, delivery and variants. It can scroll independently of the page.
- `.comment-root` was the main-page review preview; `.answers-root` was the main-page Q&A preview. Their content remains behind overlays, so reading the whole page can duplicate it or mix it with the opened list.
- `最近感兴趣`, recent collections and account navigation contain personal recommendations. They are not specifications or reviews of the selected product.
- Current controls often appear as generic text rather than buttons. Prefer their exact visible labels and inspect uniqueness. The rendered search and overlay class names contained generated suffixes; don't assume those suffixes will survive a redesign.
- A default-selected filter such as `仅显示有货` can affect the result set. Observe the active state before changing it. Do not attribute a pre-existing selection to an action you did not perform.

Product links included tracking/context parameters such as `pcdk` and `spmTag`. Use the observed link in the current authorized session. Record the item ID and public origin/path for provenance; do not publish the tracked query or assume an altered URL has been live-tested.

## Provenance and limits

Research used homepage search `无线鼠标`, price bounds 50–150, the `京东自营` option, [M220 item 3290987](https://item.jd.com/3290987.html), and its observed variant [M221 item 100009650129](https://item.jd.com/100009650129.html). Prices and counts were transient observations, not promises of future offers.

The variant transition reached a JD `安全验证` page. The user completed the slider manually; the resumed page then showed the selected M221 item. This was an assisted transition, not autonomous CAPTCHA completion. Preserve a blocked page for the required user action rather than repeatedly opening variants or trying another transport.

Coverage excludes logged-out/mobile layouts, alternate search modes, search sorting/pagination, full parameter-table opening, complete review enumeration, review-image/video interpretation, coupon eligibility, address changes, cart/order/payment workflows and seller messaging. The study used normal browser UI; no private API or REA runtime was needed.
