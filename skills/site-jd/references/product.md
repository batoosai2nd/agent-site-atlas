# Identify the exact item and offer

Input: a product result and the desired specification. Preconditions: the product tab is accessible, with any CAPTCHA completed by the user when required.

## Identity and variants

1. Verify the current `item.jd.com/<id>.html` path, title and store. Scope the main offer to `.page-right-information` when present. Personal recommendation rails can contain unrelated prices and product titles.
2. Read every selected group, such as `系列品`, `颜色` and `尺码`. A group label does not guarantee that its choices differ only in that attribute.
3. Select a visible variant and inspect the resulting title, item ID, selected styling, price and parameters. In the tested mouse family, a choice under `颜色` changed **M220 gray/black** to **M221 off-white**, with a different item ID and offer.
4. If the transition reaches `安全验证`, stop and hand it to the user. After the user finishes, inspect the current item instead of blindly repeating the variant click. The tested transition completed after such a handoff.

## Price and delivery interpretation

- Keep the numerical price with its label: `政府补贴价`, a crossed/reference amount, `日常价`, `已享受` and `可再享` describe different things. An advertised benefit is not proof that the account is eligible or that all benefits stack.
- Report the currently selected variant and observation time with a quoted price. A changed model, seller, destination or offer can change the price and delivery promise.
- Preserve the existing `送至` destination. Read the displayed stock/delivery estimate and freight conditions without copying the user's address into the shared pack. A delivery estimate is conditional on its stated payment deadline and current destination.
- The observed offer had a `59元免基础运费` threshold, warranty/return labels and separately priced optional protection services. Product price is not a verified checkout total. Reading these controls does not require adding services, claiming coupons or entering checkout.
- `京东物流`, store naming, seller identity and after-sales provider are separate facts. Report the actual labels rather than treating them as interchangeable.

## Parameters and evidence

1. The gallery area exposed `规格参数`. Clicking it revealed a preview containing item number, model-related fields, power source and connection method.
2. Use explicit field/value pairs. Do not replace a missing parameter with a promotional title or a buyer's claim. In the sample, a review described charging while the parameter preview said dry-battery power; preserve that distinction when evidence conflicts.
3. `查看全部参数` was visible. Its click did not produce a verifiable full table in this study, so the full-table branch remains unverified. Inspect the current outcome before claiming all parameters were read.
4. Main-gallery videos can start automatically. Text extraction does not establish image/video understanding. The preview, product imagery, seller descriptions and reviews have different coverage.

The product-page search has `搜本店` and `搜全站`; choose the intended scope if starting another query there. Those two submit branches were visible but not exercised.

Completion: the exact selected item and requested fields are verified, with conditional prices and unverified costs stated. No purchase is needed to complete product research.

Coverage: `live-verified`, 2026-11-11. Search-to-detail identity, store/offer/service reading, one user-assisted model/variant change and parameter preview were completed. Full table, complete media, address changes, coupon eligibility and checkout totals were not verified.
