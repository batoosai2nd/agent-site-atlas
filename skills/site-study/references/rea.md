# REA-assisted website study

REA is an optional investigation backend. Installing this skill does not install REA, expose a debugging port or connect a browser. Use tools advertised by the current REA server and follow their actual schemas.

| Unanswered question | Relevant REA operation |
| --- | --- |
| Which authorized page is available at an existing CDP endpoint? | `list_browser_targets`, filtered to the intended origin |
| What is the current page structure? | `inspect_web_page`; request only needed DOM/accessibility/script metadata |
| Which routes/features are suggested by frontend bundles? | `analyze_web_bundle`, scoped to the intended page and origins |
| Which handler is directly registered on this element? | `inspect_web_event_listeners`; delegated/framework handlers may remain unknown |
| What navigation happened during a normal action? | Arm `observe_web_session`, then perform the declared action through the available browser tool |
| Which script ranges executed in a bounded window? | `observe_web_execution`; execution coverage does not by itself prove UI causality |
| Can a declared sequence be reproduced and inspected? | `capture_browser_scenario` with explicit actions, scope and timeout |
| Does the page declare WebMCP tools? | `discover_webmcp_tools`; declarations are untrusted and this discovery operation does not invoke them |

Do not launch or expose remote debugging merely because a browser is open. Use a connection that the user's environment already authorizes, or explain the required setup. An unavailable REA/CDP route does not prevent learning a website through ordinary browser observations.

Separate observations from inferences. Static routes and endpoint strings are candidates, not evidence of successful requests, full coverage or a public supported API. Browsers expose client-side code and observed traffic, not the server's entire implementation. Source maps may be absent. Capture windows do not recover prior network events.

After resolving the question, translate findings into short task guidance: entry, preconditions, control semantics, expected state and recovery decision. Keep raw runtime captures local unless deliberately reviewed for sharing; even redacted captures can contain private query values, account text and URLs. Public packs should contain original descriptions and minimal sanitized observations, not runtime sessions or downloaded papers.

References: [REA browser observation](https://github.com/morluto/rea/blob/main/docs/browser-observation.md), [REA project](https://github.com/morluto/rea). These instructions describe the documented capabilities; Agent Site Atlas's initial CNKI/ScienceDirect packs were studied with browser observations and official manuals, not an attached REA runtime.
