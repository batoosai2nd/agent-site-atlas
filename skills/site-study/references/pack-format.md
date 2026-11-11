# Knowledge pack format

Each website is an independently installable folder:

```text
skills/site-<id>/
  SKILL.md
  site.json
  references/
    site.md
    search.md
    download.md
```

Use only the workflow files the website needs. `SKILL.md` has Agent Skills frontmatter (`name`, `description`; optional `license`) and a short task-to-reference map. The folder name and `name` are `site-<id>`.

`site.json` is the local catalog's data contract:

| Field | Meaning |
| --- | --- |
| `id` | Lowercase letters/digits separated by hyphens; matches the folder suffix |
| `name`, `description` | Human-readable site and scope |
| `entry_url` | Public HTTP(S) entry point, without credentials or session parameters |
| `domains` | Exact lowercase hostnames, including each supported `www`/subdomain explicitly |
| `aliases` | Site names people actually use, including useful language variants |
| `context` | Relative path to shared page/environment notes, usually `references/site.md` |
| `workflows` | Array of the records below |

Each workflow has `id`, `title`, `description`, `keywords` (strings used for local retrieval), `file` (relative path), `evidence`, and `last_checked` (`YYYY-MM-DD`). Paths use forward slashes and remain inside the pack.

Evidence meanings:

- `live-verified`: a representative task reached its stated outcome in a real browser. List the exact branches covered; this does not certify all alternatives.
- `live-partial`: controls or some steps were observed, but the outcome was not completed. State the last observed step and the reason.
- `documented`: the procedure is based on fetched, linked documentation; it has not been executed in the recorded environment.

Shared context records interface language/version, broad account/access condition (without identifying the account), observation date, sources and scope limits. Each workflow states input, preconditions, action decisions, expected outcomes and what constitutes completion. A known failure branch is useful only if it changes the next action.

Do not match domains by substring. `www.example.com.evil.test` and a URL whose query mentions `example.com` are different sites. Institution proxy hosts should be listed only when that specific environment is intentionally supported and sharing it is appropriate. A catalog match identifies a relevant manual; it grants neither origin access nor entitlement.

The CLI discovers immediate `site-*` directories. No global registry, vector database or host-specific executable script is needed to add a website. Update both the manual and metadata when coverage changes.

Repository checks:

```sh
node bin/site-atlas.js list
node bin/site-atlas.js search --site <id> --task "the user's task"
node bin/site-atlas.js read <id> <workflow>
```

Use actual values from the new pack in place of the angle-bracket arguments. Check each returned reference and test installing just this pack into a new empty directory. Then have a fresh-context agent execute a representative authorized task; record observed results separately from expected ones.
