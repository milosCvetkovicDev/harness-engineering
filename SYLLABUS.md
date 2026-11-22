# Syllabus

Thirteen modules, one a week (the capstone takes two to three), about 4 hours each. Every module answers one question, introduces a few
mental models, and ends with a lab whose stop condition is a command or a measured number.

## Part A. Foundations

| # | Module | Question | Mental models | Lab | Exit check |
|---|---|---|---|---|---|
| 00 | [Orientation and setup](modules/00-orientation/README.md) | What is a harness, and what are the two things people mean by "harness engineering"? | harness; propose, decide, commit | Environment check; sort your own set-up into model, harness and environment | `npm run smoke` exits 0; your definition is in your private notes |
| 01 | [The model interface](modules/01-model-interface/README.md) | What goes over the wire when a model is called, and what does the model remember? | stateless function; token; context window; tool call; prompt cache | `01-wire`: a tool round trip by hand with `curl`, then with the SDK | `npm run wire` exits 0; six predictions compared with outcomes |

## Part B. Build a harness

| # | Module | Question | Mental models | Lab | Exit check |
|---|---|---|---|---|---|
| 02 | [The agent loop](modules/02-agent-loop/README.md) | What is the smallest program that deserves the name "agent", and when does it stop? | agent loop | `mini-harness` v0: the loop, one tool, stop conditions | Acceptance tests green; one live run |
| 03 | [Tools and tool design](modules/03-tools/README.md) | Why does the shape of a tool change what the agent does? | tool definition | File and shell tools, validation, output limits; two descriptions compared | Acceptance tests green; a pass-count table for the two descriptions |
| 04 | [Context engineering](modules/04-context-engineering/README.md) | What should be in the window at each step, and what happens as it fills? | context budget; compaction; memory | Token accounting, compaction, a notes file, a cache-friendly prefix | Acceptance tests green; tokens per step before and after |
| 05 | [Control and safety](modules/05-control-and-safety/README.md) | Which rules can be asked of the model, and which must be enforced by code? | permission rule; sandbox; hook; prompt injection | Permission gate, hooks, a sandboxed shell, an injection drill | Acceptance tests green; zero forbidden actions across the drill's runs |
| 06 | [Delegation and long-running work](modules/06-delegation-and-long-running/README.md) | How does work outlive one context window, and when is a second agent worth its cost? | sub-agent; checkpoint; skill | Sub-agent tool, plan tool, checkpoint and resume, a skill loader | Acceptance tests green; parent-context tokens with and without a sub-agent |
| 07 | [Observability and evals](modules/07-observability-and-evals/README.md) | How do you know the harness got better and not just different? | trace; eval; a score is an estimate | A trace file, an eval runner, two variants compared | `npm run eval` (a script lab 07 adds) prints pass rates with intervals; one change kept or rejected on the numbers |

## Part C. Engineer the environment

| # | Module | Question | Mental models | Lab | Exit check |
|---|---|---|---|---|---|
| 08 | [Anatomy of a production harness](modules/08-production-harness/README.md) | How do production harnesses solve what `mini-harness` solves? | (revisits all of Part B) | Map your components onto Claude Code and one open-source harness; inventory your set-up | A comparison table with a doc link, or a file and line, in every cell |
| 09 | [Guides, the feedforward side](modules/09-guides/README.md) | What do instruction files and skills change, and how do you know? | guide | Write the `/quiz` skill; test one instruction with and without | The skill runs a quiz; a with-and-without table with counts |
| 10 | [Sensors, the feedback side](modules/10-sensors/README.md) | Which checks can be computed, which need judgment, and how does feedback reach the agent? | sensor | A hook that feeds failures back; agent-readable lint messages; a review agent | A seeded-defect table: caught by which sensor, or missed |
| 11 | [Measuring and improving a harness](modules/11-measuring-and-improving/README.md) | How do you run an improvement loop without fooling yourself? | improvement loop | Baseline, rerun noise, one change, re-measure; remove one component | A one-page experiment report with a decision |

## Part D. Capstone

| # | Module | Question | Lab | Exit check |
|---|---|---|---|---|
| 12 | [Capstone](modules/12-capstone/README.md) | Can you design, build, measure and explain a harness for a real product task? | An agent for a product you choose, with its eval suite | An eval report in `private/capstone/` and a write-up draft in `private/writeups/` |

## If you are reading the O'Reilly book alongside

The book sorts a harness into layers and teaches them chapter by chapter. The course covers the
same ground in the order a builder meets it, so the two do not line up one to one: read a chapter
for a second explanation of a topic, not as the course's table of contents. The reading list says
which module to read a chapter with.

The chapter notes, and the map from the book's layers to the modules, are kept locally in
`resources/book-notes/` and are not published.

## If you are reading the survey papers alongside

Two survey papers are mapped to the modules, section by section, in
[resources/paper-notes/](resources/paper-notes/README.md). They are optional reading and change
nothing in the module table above.
