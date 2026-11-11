# Article identification and full-text download

Inputs: an article URL or an identified result, destination if specified, requested format. Output: a verified local file or a precise access/verification blocker, with the article's canonical URL.

1. Confirm title, authors, journal and DOI on the article page. The example article displayed DOI `10.1016/j.rineng.2026.110261`; never carry this example into a different task.
2. Read the article's access label and the current PDF control. `View PDF` is the single-document route. `Download full issue` downloads a different scope and should only be used if the user requested the issue.
3. Activate the official `View PDF. Opens in a new window.` link. On results, scope `View PDF` to the identified result. If the control is still a generic container, let the page hydrate before choosing a locator.
4. Inspect the opened tab/window. A redirect to `pdf.sciencedirectassets.com` is part of the observed delivery flow. Use the newly generated link in the active browser session; copied signed links expire and must not be published or retained as reusable entry points.
5. If a PDF viewer opens, use the browser tool's supported download/save facility. If a recommendations dialog appears, retain only the requested document before downloading. A direct download-event listener is appropriate only if that browser operation actually produces a download event.
6. Verify the local artifact: a completed download, nonzero content, a PDF readable by an available parser/viewer, and title/DOI or first-page identity matching the article. An HTML challenge saved under a `.pdf` extension is not success. Return the actual path and the source URL.

## Branches

| Observed state | Next action |
| --- | --- |
| Full HTML article, PDF available | Continue through PDF control; HTML access alone does not confirm saved PDF |
| Sign in / institutional access required | Use the user's authorized institution route or request their login; resume on this article |
| Purchase/paid option | Report the access requirement; a research/download request does not by itself authorize purchase |
| `Are you a robot?`, CAPTCHA or access challenge | Preserve the relevant tab and ask for user assistance under the host's policy; resume after completion |
| Download listener timeout | Inspect the page and tabs once: the result may be a PDF viewer, a challenge, or an extension interception. Do not announce a local file without one |
| Only abstract accessible | Report that limitation; if asked for an accessible alternative, look for the author's/institution's lawful copy and label its source/version |

## Verification coverage

Live verified: article identity, open-access label, full HTML sections, official PDF link and new-window redirect. The recorded PDF delivery ended at a CAPTCHA; no file download or parser check succeeded. The viewer-save and recommendation-dialog steps are supported by the official manual, not an end-to-end file result in this environment.

Sources: [download guide](https://www.elsevier.support/sciencedirect/answer/how-do-i-download-articles-and-chapters), [access levels](https://www.elsevier.support/sciencedirect/answer/what-different-access-levels-are-there-for-journals-and-books), [site observations](site.md).
