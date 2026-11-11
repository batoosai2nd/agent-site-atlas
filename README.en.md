# Agent Site Atlas

Portable website operating knowledge for AI agents. Read a relevant, evidence-labeled workflow before exploring the same interface again.

[中文](README.md) · [Integrations](docs/integrations.md) · [Validation](docs/validation.md) · [Contributing](CONTRIBUTING.md)

The packs cover **CNKI**, **ScienceDirect**, **Xiaohongshu / REDnote**, **Xiaoheihe / HeyBox**, and **JD.com**, plus a **site-study** skill for learning new websites. Each pack is a self-contained Agent Skill. A small CLI and optional local MCP server retrieve the same files. Execution stays with the agent's existing browser tools and the user's own account.

## Quick start

Download this repository and run from its directory with Node.js 22+:

```sh
node bin/site-atlas.js list
node bin/site-atlas.js search --url "https://www.sciencedirect.com/" --task "download PDF"
node bin/site-atlas.js read sciencedirect download
node bin/site-atlas.js install cnki sciencedirect --agent codex
node bin/site-atlas.js install xiaohongshu --agent codex
node bin/site-atlas.js install xiaoheihe --agent codex
node bin/site-atlas.js install jd --agent codex
```

Supported installer targets: `codex`, `claude`, `deepseek`, or an explicit absolute `--dest` skill directory. Only requested skills are copied; existing targets cause the installation to stop before copying. You can also copy a complete folder from `skills/` manually, with no Node.js dependency.

In a fresh session, ask for an ordinary site task. For explicit selection, mention `site-cnki` or `site-sciencedirect`. Automatic invocation depends on the host's skill discovery and model; installing a skill does not connect a browser or intercept navigation. WorkBuddy's documented package-import route is described in [Integrations](docs/integrations.md).

## Optional MCP

```sh
npm install --ignore-scripts
node bin/site-atlas.js serve --sites cnki,sciencedirect
```

The stdio server exposes `list_sites`, `find_site_workflows`, and `read_site_workflow`. It reads local manuals; it neither drives the browser nor collects credentials. A workflow response contains the site context, relevant instructions, steps and coverage limits. Use `--sites` to select which websites a client can retrieve.

## Evidence and scope

- **CNKI:** homepage, advanced navigation/form and download entries observed. CAPTCHA prevented a completed result/download run.
- **ScienceDirect:** keyword search, year range and open-access filtering completed. Article identity/full HTML and citation choices observed. PDF delivery reached a CAPTCHA; citation export was intercepted by a reference-manager extension, so no local file was confirmed.
- **site-study:** a repeatable authoring procedure with the pack contract and optional REA investigation guidance.
- **Xiaohongshu:** two search layouts, conventional-page image selection, note overlays, image navigation, comment loading/reply and long-text expansion, and public-profile navigation exercised. Advanced sorting/date filters and full video understanding remain unverified.
- **Xiaoheihe:** content search, Steam community navigation, image-text posts, gallery navigation/long-image scrolling, root-comment loading, reply batches and public profiles exercised. Game details/prices, transactions, video and publishing remain unverified.
- **JD.com:** price/self-operated seller filtering, variant/conditional-price reading, parameter preview, current-item/negative/latest review filters, loading and Q&A expansion exercised. One variant transition required the user to complete a CAPTCHA. Checkout and transactions remain unverified.

`live-verified` means a representative task reached its stated outcome; `live-partial` means only part of the flow was completed; `documented` means the procedure relies on linked documentation. Read the specific branch coverage and date. No universal browser compatibility or measured speedup is claimed. See [Validation](docs/validation.md).

## Contribute and test

Install the study skill with `node bin/site-atlas.js install study --agent codex`, then ask the agent to investigate concrete tasks and produce a pack. Public contributions contain original instructions and sanitized observations, not login sessions, signed links, raw captures or paper files.

```sh
npm install --ignore-scripts
npm test
```

Focused tests exercise routing, retrieval, selective installation/conflict preservation and an actual SDK stdio exchange. Small isolated test fixtures remain in the OS temporary directory; move them to Trash/Recycle Bin when cleaning up. The code and original manuals are MIT licensed. Website content, trademarks and external materials retain their own rights.
