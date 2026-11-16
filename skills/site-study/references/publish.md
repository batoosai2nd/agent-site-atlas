# Submit a website skill to Agent Site Atlas

Use this workflow when the user asks to upload, publish or share a researched website skill with the community.

The contribution repository is [batoosai2nd/agent-site-atlas](https://github.com/batoosai2nd/agent-site-atlas). Its public catalog is [Agent Site Atlas](https://batoosai2nd.github.io/agent-site-atlas/). Contributions enter through GitHub pull requests. A merged pack is listed after the website deployment succeeds.

## Prepare the contribution

1. Read the repository's current `CONTRIBUTING.md` and inspect its existing `skills/site-*` entries. For a site already present, update its relevant workflows and domain coverage. For a new site, choose a unique site ID and prepare its complete `skills/site-<id>/` directory using [the pack format](pack-format.md).
2. Include `SKILL.md`, `site.json`, `LICENSE` and the referenced guides. Set an optional `category` suitable for the site. The website reads the catalog from these files and generates each skill's ZIP during its build.
3. Describe the actual research environment, completed workflows, branch limits, public sources and dates. Apply the research skill's representative fresh-context trial when creating or substantially changing website instructions. Report a blocked task with its observed partial outcome.
4. Check the exact files to be shared. Keep account details, addresses, cookies, authorization headers, signed links, raw captures and private screenshots local. Include original operating instructions and public source links that the user is entitled to share.

## Validate and submit

1. Work from the repository's current default branch in a contribution branch. Use the available GitHub connector, Git CLI or `gh`. If the account has write access, push that branch to the repository. Otherwise, fork it into the user's account and push the contribution branch there. Preserve unrelated local changes.
2. Run `node bin/site-atlas.js list`, the new site's relevant `search` and `read` commands, and install that pack into a new empty directory to check its references. Run `npm ci --ignore-scripts` when build dependencies are absent, followed by `npm run build:web`. Follow any additional checks in the current contribution guide.
3. Inspect the diff, stage only the intended pack and directly related documentation, and commit a description of the final behavior. Open a PR against the upstream default branch. With `gh`, use `gh pr create --repo batoosai2nd/agent-site-atlas --head <owner>:<branch> --base main --title <title> --body-file <prepared-file>` with actual values. With a connector, supply the PR description through its structured argument.
4. In the PR description, identify the website and added or updated tasks, the observed environment and date, checks performed and incomplete branches. Link relevant public sources and state any human-assisted step that affected the result.
5. Return the PR URL and whether it is open, awaiting checks, merged or deployed. GitHub Pages updates the catalog and ZIP downloads after a merge and successful deployment. If the user explicitly requests merging and has the required repository authority, complete that action within the repository's current rules and verify the deployment.

If GitHub authentication is unavailable, prepare the complete contribution and report the exact authentication step that remains. If a repository rule or required check blocks submission or merging, explain the actual result and retain the files for continuation.
