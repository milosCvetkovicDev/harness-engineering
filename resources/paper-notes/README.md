# Paper notes

Notes on survey papers. The papers sit beside the course; they are not its spine.
The modules and their core reading stay as they are, and each paper is optional reading for the
module where it helps.

Checked: 2026-11-21.

## Rules for this folder

- Notes are in our own words: no copied passages, figures or tables. A number is attributed to the
  paper that reports it.
- The PDFs are not kept in this repository. Each note links to the page the authors publish.
- A survey repeats what other sources say. A claim about the Claude API, the SDK or Claude Code is
  checked against the live docs before it is used anywhere else in the course.
- Each note has the same parts: the paper in one sentence, a mental model with the place it breaks,
  a map to the modules, what to read and when, a vocabulary table, what to be sceptical of, and a
  closed-book self-check.
- Reading times are estimates: the word count of the part at about 150 words a minute, a study
  pace, rounded to five minutes, or to the minute for a part under ten minutes.

## The papers

| Paper | Date | Status | Length | Note |
|-------|------|--------|--------|------|
| Zhou et al., "Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering" | 2026-04-09 | arXiv preprint, version 1 | 54 pages, 44 of body | [notes](externalization-in-llm-agents.md) |
| Li et al., "Agent Harness Engineering: A Survey" | 2026-05-14 (the PDF) | submission under review at TMLR; no arXiv entry found | 71 pages, 51 of body | [notes](agent-harness-engineering-survey.md) |

## Which paper answers what

- **Zhou et al. answer "why does a harness work at all?"** Their answer is one idea: reliability
  came from moving memory, know-how and interaction structure out of the model. The paper is
  organised by what moves out. It is strong on skills and on how the parts feed each other, and
  thin on sandboxes and on measurement.
- **Li et al. answer "what is a harness made of, and what exists for each part?"** Their answer is
  seven layers and a catalogue of projects. The paper is organised by engineering layer. It is
  strong on execution, evaluation and governance, and says little about skills.
- **They agree** that the model alone does not decide how reliable an agent is, and both tell a
  three-step history. The first step differs: Zhou et al. start from capability held in the
  weights, Li et al. from the craft of writing prompts. One history is about where capability
  lives, the other about what engineers spend their time on.

## Three vocabularies for the same things

| The idea | This course | Zhou et al. | Li et al. |
|----------|-------------|-------------|-----------|
| What the model is told before it acts | [a guide](../../mental-models/09-guide.md) | skills; memory as input | the context layer; repository instruction files in the tool layer |
| What checks the result | [a sensor](../../mental-models/10-sensor.md) | observability; approval gates | observability, verification, governance hooks |
| What the model cannot talk its way past | [a hook](../../mental-models/05-hook.md), [a permission rule](../../mental-models/05-permission-rule.md), [a sandbox](../../mental-models/05-sandbox.md) | the permission and control surfaces | the execution and governance layers |
| State outside the window | [memory](../../mental-models/04-memory.md), [a checkpoint](../../mental-models/06-checkpoint.md) | memory | the context layer (what the model is shown) and the lifecycle layer (what the harness needs to continue) |
| Reusable know-how | [a skill](../../mental-models/06-skill.md) | skills | touched on under tools and context |
| The loop | [the agent loop](../../mental-models/02-agent-loop.md) | the loop and its control flow | the lifecycle layer |
| How you know it got better | [an eval](../../mental-models/07-eval.md), [the improvement loop](../../mental-models/11-improvement-loop.md) | "measuring externalization", as future work | the verification layer |

## Module by module

The sections that bear on each module, for looking things up. Section numbers are the papers' own.
Each note's "What to read, and when" table picks the few that are worth the time.

| Module | Zhou et al. | Li et al. |
|--------|-------------|-----------|
| [00 Orientation](../../modules/00-orientation/README.md) | 1, 2, 6.1 | 1, 2.1 to 2.3 |
| [01 The model interface](../../modules/01-model-interface/README.md) | 2.1, 2.2 | 5.1 |
| [02 The agent loop](../../modules/02-agent-loop/README.md) | 6.2.1 | 6.1, 6.2 |
| [03 Tools](../../modules/03-tools/README.md) | 4.2, 5 | 4.1, 4.2, 4.4 |
| [04 Context engineering](../../modules/04-context-engineering/README.md) | 3, 6.2.6 | 5.1 to 5.4, 5.7 |
| [05 Control and safety](../../modules/05-control-and-safety/README.md) | 6.2.2, 6.2.3, 6.2.5, 8.4 | 3.1, 3.2.6, 3.3, 9.1, 9.2 |
| [06 Delegation and long-running work](../../modules/06-delegation-and-long-running/README.md) | 3.3, 4.3 | 5.6, 6, 7.4 |
| [07 Observability and evals](../../modules/07-observability-and-evals/README.md) | 6.2.4, 7.2, 8.6 | 7.1, 8 |
| [08 Anatomy of a production harness](../../modules/08-production-harness/README.md) | 6.3 | 2.5 to 2.9, Appendix B |
| [09 Guides](../../modules/09-guides/README.md) | 4, 7.3, 8.4 | 4.1, 5.3 |
| [10 Sensors](../../modules/10-sensors/README.md) | 6.2.3, 6.2.4 | 9.2, 9.5 |
| [11 Measuring and improving](../../modules/11-measuring-and-improving/README.md) | 8.3, 8.6 | 8.6, 11, 12.3, 12.5 |
| [12 Capstone](../../modules/12-capstone/README.md) | 7.3 | 10, 11 |

## When to read them

- **Now, with module 00:** the opening of each paper, about 35 minutes together. It gives you two
  more definitions of "harness" to set beside the ones in the core reading.
- **During Part B:** only the sections listed for the module you are in, and only after its core
  reading and its lab prediction.
- **After module 07:** sections 6 and 7 of Zhou et al., as a review of what you built.
- **During Part C and the capstone:** Li et al. as a reference. Its seven layers make a good
  checklist for a design review: for each layer, what does my harness do, and how do I know?

Reading both bodies in full takes about five hours and forty minutes, more with Li et al.'s
appendices, which is more than a week of this course. Neither replaces a lab.

## Other surveys

The reading list's "Leads, not verified" section names one more survey of harness design that we
know only from its abstract. Li et al. also say they extend earlier six-part frameworks; those have
not been read here.
