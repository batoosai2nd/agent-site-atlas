# Search posts

Input: the user's topic or keywords and desired result type. Preconditions: the community homepage or a search page is accessible in the current browser session.

1. On `/app/bbs/home`, locate the search combobox and its textbox. Inspect uniqueness before using a role locator such as `getByRole('textbox')`. The placeholder is a rotating hot topic, not a reliable search-field name.
2. Fill the query. Suggestions may appear; press Enter to submit the entered text. Selecting a suggestion is optional and can change the query.
3. Confirm a `/app/search/list` page and the textbox's query. Categories observed: `综合`, `内容`, `游戏`, `小程序`, `用户`, `话题`, `商品`.
4. For posts, click the exact `内容` button and verify its selected state and refreshed list. In the observed run this added `search_type=link` to the URL. `综合` included a game product alongside posts.
5. Identify candidates by title, excerpt, author, tags, displayed date and actual link. Post cards link to `/app/bbs/link/<id>`; author links inside them point to `/app/user/profile/<id>`. Use the observed post href to open the intended post.
6. Verify title and author on the detail page before extracting material. Search snippets are abbreviated. Read images and comments separately if the task requires them.

A click on the center of a result card can hit its cover image and open an image viewer while the URL remains on search. If that happens, navigate to the **post href already observed on that card** using the browser's supported navigation tool, then verify `/app/bbs/link/<id>` and the title. Opening a cover image is not opening the post detail.

Use the page's `返回` control or supported browser back navigation to resume the list, then inspect it again. Preserve the current query/category when useful; don't assume card order or scroll position stayed unchanged.

Completion: the requested query and content type are confirmed, and at least one candidate is verified on its actual detail page. Save the current public post URL in the user's research result. Finding a candidate is not evidence that its images or all comments were read.

Coverage: `live-verified`, 2026-11-11. Submitted `上海 美食`, observed suggestions and mixed results, switched to `内容`, opened a matching post and returned to the same query/category. A fresh-context trial independently searched `游戏手柄`, selected content results and opened a matching post by its observed href after a card click opened the cover viewer. No search sort/date panel was observed; advanced filters and the other result categories were not exercised. If the user needs dates or popularity, use verified detail information and describe the subset actually examined.
