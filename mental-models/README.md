# Mental models

One card per technology. A card is useful only if it lets you predict what will happen before you
run something, so every card says what the model predicts, where it breaks, and how to test it.

## How to use a card

1. **Before the module's reading:** read the card. It is a draft written for you, not by you.
2. **After the reading:** write "My version" in your own words, in `private/mental-models/` under the
   card's file name. The cards here are public. If you cannot write it, read again.
3. **Before the lab:** write the card's prediction for the lab in your copy of the module's
   notes, `private/modules/NN-name/notes.md`.
4. **After the lab:** add to your version one prediction that came true and one that did not. A wrong prediction
   shows where the model needs repair, which makes it the more useful of the two.

A new card starts from [_template.md](_template.md).

## Index

| Technology | The model in one sentence | Module |
|---|---|---|
| [A harness](00-harness.md) | An agent is a model plus a harness; the harness is the part you can change. | 00 |
| [Propose, decide, commit](00-propose-decide-commit.md) | The model proposes, code in the harness decides, the system commits. | 00 |
| [The model as a stateless function](01-stateless-function.md) | A call maps the whole conversation to the next message and remembers nothing. | 01 |
| [A token](01-token.md) | The unit the model reads and writes; every limit and price is counted in it. | 01 |
| [The context window](01-context-window.md) | Everything the model can see in one call; finite; filled by the harness. | 01 |
| [A tool call](01-tool-call.md) | The model asks, your code runs, the result goes back as a message. | 01 |
| [The prompt cache](01-prompt-cache.md) | An unchanged beginning of a request is cheaper; the match is exact, from the start. | 01 |
| [The agent loop](02-agent-loop.md) | A `while` loop: call the model, run its tool calls, repeat until it stops or a limit hits. | 02 |
| [A tool definition](03-tool-definition.md) | Prompt text the model reads like documentation, with nothing else to go on. | 03 |
| [The context budget](04-context-budget.md) | Every added token takes attention from the others; smallest sufficient context wins. | 04 |
| [Compaction](04-compaction.md) | Replace a long conversation with a summary: room in exchange for detail. | 04 |
| [Memory](04-memory.md) | Files a harness writes and loads back; each session is a new shift. | 04 |
| [A permission rule](05-permission-rule.md) | A check on what the agent says it will do, before it runs. | 05 |
| [A sandbox](05-sandbox.md) | A limit on what a running process can reach, whatever it claimed. | 05 |
| [A hook](05-hook.md) | Your code, run by the harness at a fixed point, every time. | 05 |
| [Prompt injection](05-prompt-injection.md) | Everything in the window is text, so data can act as instructions. | 05 |
| [A sub-agent](06-sub-agent.md) | A function call whose body is another agent with its own window; it returns a summary. | 06 |
| [A checkpoint](06-checkpoint.md) | Written-down state that lets an empty session continue from the next step. | 06 |
| [A skill](06-skill.md) | A manual opened on demand: description always loaded, body when needed. | 06 |
| [A trace](07-trace.md) | The record of one run as a tree of timed steps. | 07 |
| [An eval](07-eval.md) | Tasks with graders, run several times. | 07 |
| [A score is an estimate](07-score-is-an-estimate.md) | A difference counts only if it exceeds the noise between identical runs. | 07 |
| [A guide](09-guide.md) | Steers the agent before it acts; a map, not a manual. | 09 |
| [A sensor](10-sensor.md) | Checks the work after the agent acts and feeds the result back. | 10 |
| [The improvement loop](11-improvement-loop.md) | Observe failures, change one thing, measure, keep or revert. | 11 |

## Two models to hold the rest

If you keep only two pictures in your head, keep these:

- **The control loop.** Guides act before the agent, sensors after, and you edit the harness when a
  failure repeats.
- **The budget.** Every part of a harness costs context or maintenance, so it has to pay for itself
  with evidence.

## About the sources on the cards

The cards paraphrase their sources and name them. The wording comes from research notes of
2026-11-21, which were made from fetched page summaries. Before quoting a source anywhere public,
read the passage on the page itself.
