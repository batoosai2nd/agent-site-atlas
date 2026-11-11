# Search and filter products

Input: product keywords and any requested price, seller or delivery constraints. Preconditions: an accessible homepage or search page; retain the user's current delivery destination and intentional filters.

## Search and navigate

1. On the homepage, the tested search field was a textbox with accessible name `搜索`. Fill it and press Enter; confirm the query in the resulting `search.jd.com/Search` page. The ordinary product search ran with the AI-search switch off.
2. Search results exposed `全部商品`, `新品`, `店铺`, `企业采购`, `工业品`, brand options, `综合`, `销量`, `价格`, `价格区间`, `京东物流`, `自营/旗舰` and `仅显示有货`. Availability depends on the query/layout. Product search and store search are different scopes.
3. Read the product title, current variant text, price label, store and any advertising badge. Some cards are rendered as generic text, not links. In the tested result, a unique `span[title]` containing the product title was clickable. Inspect the current DOM and uniqueness rather than saving a generated class or row number.
4. Click the intended product title. Inspect newly opened tabs if the search tab is unchanged. Verify the title, item ID and seller in the detail tab before reporting a candidate. Search cards and promotional covers can show different price contexts.

## Price range

1. Click `价格区间`; its panel appeared near the end of the DOM snapshot.
2. Fill the fields with placeholders `最低价` and `最高价`, then use the panel's `确定` control. `重置` also exists; it changes the range rather than submitting it.
3. Read the refreshed results and their price labels. A completed submission does not establish what every discounted or subsidized amount means. Validate the exact item in its detail page.

## Self-operated seller filter

1. Open `自营/旗舰`. The observed choices were `京东自营`, `旗舰店` and `京喜自营`.
2. Select the requested choice and click the current `确定（…商品）` control. Its product count is dynamic. The choices are distinct; a flagship-store name alone does not establish the `京东自营` selection.
3. Verify the active filter label changed to `京东自营` and inspect the refreshed cards. Confirm store/service information again on the selected product.

## Combining constraints

In the observed sequence, submitting 50–150 changed the result sample. Applying `京东自营` afterward brought back items outside those bounds, although reopening the price panel still showed 50 and 150. Submitting that retained range again returned an in-range sample with the seller filter applied.

After another filter change, recheck the active choices **and the results**. Retained input values or a successful click alone do not prove that every requested constraint remains effective. If the result contradicts the requested range, inspect/reapply the relevant visible control once and verify again; report unresolved behavior rather than assuming a precise combined query.

Completion: query and requested applied filters are verified, and selected candidates are checked in detail. A ranked page is a sample, not all matching products or a guaranteed market-wide lowest price.

Coverage: `live-verified`, 2026-11-11. Homepage query, price-range submission, self-operated seller selection, combined-filter recheck and new-tab product opening were exercised. Brand selection, search price/sales sorting, result pagination and delivery changes were observed only as possible controls or not explored.
