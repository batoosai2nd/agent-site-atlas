---
name: site-jd
description: Search JD.com 京东 products, apply price and seller filters, inspect exact variants and conditional prices, and read reviews and product Q&A. Use for JD homepage/search/item URLs or 京东商品搜索、规格比价、参数核对、评价与问大家整理.
license: MIT
---

# 京东 / JD.com

Read [site context](references/site.md), then the relevant guide:

| Task | Guide |
| --- | --- |
| Search products, apply price and seller filters | [Search](references/search.md) |
| Identify an exact variant, price conditions and parameters | [Product detail](references/product.md) |
| Read current-variant reviews and expand product Q&A | [Reviews and questions](references/reviews.md) |

Use the current browser session and inspect the page before applying a saved locator. Search opens in the same tab in the tested layout; product titles open a new tab. Product cards are not necessarily ordinary links in the accessibility tree.

Keep the exact item ID, selected variant, seller, displayed price label and applicable conditions together. A color choice can change the model and item ID. Search prices labelled `政府补贴价` are conditional, and input boxes retaining a price range do not prove that the refreshed results still respect it.

Reviews can mix several models and colors. For a specific variant, select `当前商品` in `全部评价` and verify the variant labels in the returned reviews. Read buyer text, seller replies and generated summaries as separate sources.

Scope is product research. Cart changes, purchases, coupon claims, store follows, review votes, questions and messages require their own user authorization. Preserve the current delivery destination; do not copy addresses, account details, browsing history or tracked links into shared instructions. Stop for user action at a CAPTCHA or access restriction; inspect the resulting page when the user returns.

Verified: search, price-range submission, self-operated seller selection, detail/variant reading, parameter preview, review filtering/loading and one Q&A expansion. Full parameter-table opening, checkout totals, orders, delivery-address changes, all reviews and image/video understanding remain unverified.
