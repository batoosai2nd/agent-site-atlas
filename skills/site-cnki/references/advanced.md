# Advanced search / 高级检索

Entry: click the homepage's `高级检索 >`. The observed public link `/starter/advanced` opened `https://kns.cnki.net/kns8s/AdvSearch` in a new tab. Confirm the new tab title `高级检索-中国知网`.

## Form map (live inspected)

The initial form had three rows: `主题`, `作者`, `文献来源`. Rows include matching mode controls such as `精确`; additional rows use `AND`, and a `+` control adds a condition. These dropdowns are custom controls, not guaranteed native HTML selects. Resolve the input within the row whose field label was observed; unlabeled textboxes should not be filled by a remembered global index.

Other observed controls:

- `OA出版`, `网络首发`, `增强出版`, `基金文献`.
- `中英文扩展` (selected in the observed initial form) and `同义词扩展` (not selected).
- `时间范围：发表时间`, two date inputs with IDs `datebox0` and `datebox1`.
- `更新时间` with initial value `不限`.
- `重置条件` and a button named `检索`.
- Resource links `总库`, `中文`, `外文`, `学术期刊`, `学位论文` and others.

## Build a query

1. Map each user constraint to a field. For an exact paper, choose the current title-field option and the appropriate matching mode. For a subject search, keep `主题`; use author/source rows only if specified.
2. Set each boolean relation intentionally. Empty extra rows need not receive invented constraints. Check defaults such as bilingual expansion when they affect the requested precision.
3. For dates, inspect the live date picker or placeholder to determine accepted format. The recorded session observed the controls but did not establish the accepted typed date format. Do not assume year-only strings or fabricate a datepicker API.
4. Select the requested resource and publication conditions. `OA出版` concerns open-access publication; do not assert it removes every login or challenge requirement.
5. Submit `检索` once and verify the resulting query/filters and actual records. If CAPTCHA appears, retain the query and resume after user assistance.

## Syntax from the deployed form

The inline help describes within-field combination using `*` (AND), `+` (OR), `-` (NOT), parentheses and English single/double quotes. It specifies a 120-character limit per search box. Parentheses make the intended grouping explicit; quote a term containing spaces or operator-like characters.

Original example for a subject field: `(锂电池 + 锂离子电池) * 寿命预测`. This is an illustrative query, not a verified result or the user's default topic. Prefer several field rows when they express the request more clearly. Homepage syntax and advanced within-field syntax should not be assumed interchangeable.

## Verification

The linked KNS 8.0 manual describes result-side grouped filters followed by `确定` (section 1.3.7) and sorting by publication date, relevance, citations or downloads (section 1.3.10). If the current result page uses these controls, verify selected facets after confirming them. Citation/download sorting measures popularity, not the user's requested date or relevance constraints. Those result-side interactions were not executed in the recorded run.

Success means results with the intended fields, relations, dates and resource category applied. The form and its inline syntax help were live inspected; query submission, date entry and downstream results were not completed in the recorded CAPTCHA-gated session.

Sources: [live advanced entry](https://kns.cnki.net/starter/advanced), [official helper linked by the form](https://piccache.cnki.net/index/helper/manuals.html), [site context](site.md).
