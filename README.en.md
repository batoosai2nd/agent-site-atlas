# Agent Site Atlas

Portable website operating knowledge for AI agents. Read a relevant, evidence-labeled workflow before exploring the same interface again.

[中文](README.md) · [Installation prompt](#install-with-a-prompt) · [Integrations](docs/integrations.md) · [Validation](docs/validation.md) · [Contributing](CONTRIBUTING.md)

The packs cover **CNKI**, **ScienceDirect**, **Xiaohongshu / REDnote**, **Xiaoheihe / HeyBox**, and **JD.com**, plus a **site-study** skill for learning new websites. Each pack is a self-contained Agent Skill. A small CLI and optional local MCP server retrieve the same files. Execution stays with the agent's existing browser tools and the user's own account.

## Install with a prompt

Paste the entire prompt into an agent on the other device that has network and local file access. The agent can install for its current client; if a manual import is required, it should prepare the files and explain the remaining action.

```text
Install Agent Site Atlas on this device:
https://github.com/batoosai2nd/agent-site-atlas

Scope: all website knowledge packs currently on the repository's main branch, plus site-study for learning new websites.

1. Read README.md and docs/integrations.md first. Identify the current agent client and operating system. Use that client's user-level skill location so future sessions can use the packs. Ask me only if the client or skill directory cannot be determined.
2. Retrieve the complete selected skills/site-* directories, preserving SKILL.md, site.json, LICENSE, references and other pack files. Follow the integration guide using the repository installer, the host's existing skill installer, or complete folder copies. Folder copying does not require Node.js. Use the Skill integration for this request.
3. Install for the current client only. Compare existing same-name skills: skip identical copies, preserve and report differing copies, and continue installing other missing packs. Preserve existing configuration and personal edits.
4. For WorkBuddy, prepare and import one complete skill ZIP per pack following the integration guide. If you cannot operate its import UI, provide the actual ZIP paths and remaining steps, marked as awaiting import.
5. Check each installed pack's SKILL.md and internal references, and actually read at least one installed workflow guide. If the host's skill list is available, also confirm discovery. Distinguish files installed, host discovery confirmed, and awaiting import.
6. Report installed, skipped or pending skills with actual paths and verification results. State whether a new session or client restart is needed, and give one explicit skill-use example. Perform the installation rather than only giving me commands.
```

For selective installation, replace the scope with, for example: `Only CNKI, ScienceDirect and JD.com; omit site-study.` Current website IDs are `cnki`, `sciencedirect`, `xiaohongshu`, `xiaoheihe`, and `jd`; the study skill's installer ID is `study`.

Then try in a fresh session: "Use site-jd to find a wired keyboard on JD.com, checking the exact variant, price conditions and latest reviews for the current item." Use that device's own browser connection and login. See [Integrations](docs/integrations.md#确认接入结果) for the actual host-validation scope.

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
