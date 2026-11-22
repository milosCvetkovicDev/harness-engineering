# Harness engineering curriculum: design

- **Date:** 2026-11-21
- **Status:** merged into `main` on 2026-11-22 with the owner's approval.
- **Plan:** [2026-11-21-harness-engineering-curriculum-plan.md](2026-11-21-harness-engineering-curriculum-plan.md)
- **Edited for publication, 2026-11-22:** by the owner's decision, some personal details were taken
  out of the repository's documents, this one, the plan and the progress log included. Here that
  changed the Intent, four rows under "What the owner said" (Purpose, Goals, Companion book, Survey
  papers), the Privacy constraint's explanation, the Sources section, one call and two open
  questions, so those are not the wording of 2026-11-21. No privacy rule was weakened. See
  [ADR 0001](../adr/0001-publication-and-licences.md).
- **Edited again for publication, 2026-11-22:** by a second decision of the owner, further personal
  details were taken out and the wording around them changed, so those passages are not the original
  ones. Here that changed the Intent, three rows under "What the owner said" (Companion book, Survey
  papers, Publication), three constraints, module 05's sandbox, three calls with their reasons, the
  remote correction and open questions 1, 3 and 4. This second edit did not touch the Privacy
  constraint. The same day's decision on the learner's files (the correction "filled-in work" below)
  also changed the sentence that defines `notes.md` and the repository layout. After review, the
  wording of a brief's section 2 ("Why it matters") was made general too.

## Intent

The course is about what lies underneath a coding-agent set-up such as Claude Code with hooks,
skills and sub-agents: why a given piece works, how to
tell when it does not, and how to build the same machinery for a product. This repository is a
self-study course that gives the theory and the practice together.

"Harness engineering" is used in two senses, and the course covers both, in this order:

1. **Building a harness:** the program around a model that turns it into an agent (the loop, tools,
   context management, permissions, sub-agents, evals).
2. **Engineering the environment around an existing agent:** instruction files, constraints, feedback
   loops and measurements that make an agent such as Claude Code do reliable work in a codebase.

Building one first makes the second sense concrete: every feature of a production harness maps onto
something the learner has already written by hand.

## What the owner said

Recorded from the session on 2026-11-21. These are the owner's decisions.

| Topic | Decision |
|---|---|
| Purpose | Learn harness engineering, theory and practice. |
| Scope | Both senses, in order: build a small harness, then engineer the environment around an existing agent. |
| Goals | All four: understand and measure the owner's own set-up; build agents for products; public write-ups; a solid theoretical base. |
| Format | Modules, each with a theory part and a lab. |
| Pace | 3-5 hours a week. |
| Sources | Deep internet research; collect authoritative sources. |
| Mental models | A mental model for each technology. |
| Companion book | Added later the same day: an O'Reilly book on harness engineering is the companion text. Chapter notes are kept in `resources/book-notes/`. |
| Survey papers | Added the same day: two survey papers on harness engineering are to be reviewed and included. They are optional reading mapped to the modules, not a new spine for the course. Notes are in `resources/paper-notes/`, in our own words; the PDFs are not kept in the repository. |
| Publication | Added the same day: the repository is to be published on the owner's GitHub account and read there like a book. It is to be public; it starts private and is made public after review (how, superseded 2026-11-22: see the correction "how it becomes public"). Source material is not published: no PDFs, no screenshots, no copied passages, and nothing about where a copy was obtained. The raw research notes, the research report and the book chapter notes stay on the owner's machine (gitignored). Sources stay cited. Commits use the owner's GitHub noreply address. |

## Goals

- After each module the learner can explain its technology from a mental model, predict how it behaves
  before running it, and has built or measured it once.
- After Part B the learner has a working coding agent they wrote themselves, with tools, context
  management, permissions, sub-agents and an eval suite.
- After Part C the learner can name what each piece of their Claude Code set-up is for, show a
  measurement for at least one of them, and make one measured improvement.
- After Part D there is one shipped agent and one public write-up.
- Every reading in the course is a source that was fetched and checked, with its date.

## Non-goals

- Training or fine-tuning models, and the mathematics of transformers beyond what explains tokens,
  context length and caching.
- Covering every agent framework. One stack (the Claude API in TypeScript) is used in depth; other
  harnesses appear as reading and comparison.
- Full theory notes for every module on day one. Modules 00-01 are complete; modules 02-12 are briefs
  that are expanded when the learner reaches them, against sources that are current at that point.

## Anti-goals

The course has failed, even if every file exists, when:

- Claude writes the lab code and the learner reads it. The learner types the harness.
- A module can be ticked off without a result that someone else could check.
- The mental models are recited and never tested against behaviour.
- The reading list holds sources nobody verified, or goes stale without anyone noticing.
- Material derived from the owner's private set-up or from client work ends up in a public repository.

## Constraints

- **Time:** 3-5 hours a week, so one module a week and about 13 weeks in total. (Correction,
  2026-11-21: the capstone, module 12, takes two to three weeks, so about 14 to 15 weeks.)
- **Language:** everything written is English.
- **Stack:** TypeScript on Node 24, run directly by Node (no build step), `node --test` for tests, npm.
- **Cost:** labs call a paid API. The default model is the current Opus; switching the labs to a cheaper
  model is the owner's decision and is one environment variable (`HX_MODEL`). Each lab is to state a
  rough token budget (correction, 2026-11-21: none does yet). The credential lives in `labs/.env`, which is not committed.
- **Tests:** they run one file at a time locally.
- **Privacy:** Part C reads the configuration of the owner's `~/.claude` set-up (instruction files,
  settings, hooks, skills, agents, commands) and nothing else: never session transcripts, memory or
  per-project history. It never writes to `~/.claude` from this
  repository, and anything derived from it goes to `private/`, which is gitignored. No client code or
  data is used anywhere in the course; eval tasks come from fixtures in this repository.
- **Currency:** the field changes monthly. Briefs name stable concepts and link to the docs; they avoid
  copying flags, model names and prices that will be wrong in three months.

## Approaches considered

**A. Module-per-folder with one cumulative lab (chosen).** Thirteen modules, each a folder with a brief
and the learner's notes. The labs of Part B all extend one program, `labs/mini-harness`, so the learner
ends with a whole agent and feels how the parts interact. Part C labs are experiments on a real
harness. Trade-off: a learner who skips a Part B lab has to catch up before the next one.

**B. Module-per-folder with isolated labs.** Each lab is a separate small program. Modules can be done in
any order and a skipped lab costs nothing later. Trade-off: the learner never sees the parts work
together, which is exactly what building agents for products needs, so it does not serve that goal.

**C. One capstone project with theory read on demand.** Trade-off: fastest route to a working agent and
the weakest theory. The owner was offered this and chose modules.

A was chosen because it keeps the module rhythm the owner picked and still produces one coherent agent.
The dependency risk is handled by tagging the reference state of `mini-harness` after each lab is
reviewed, so a later module can start from a known point.

## Design

### The course in four parts

| Part | Modules | What the learner does |
|---|---|---|
| A. Foundations | 00-01 | Map of the field; set up; how a model is actually called (messages, tokens, tool use on the wire) |
| B. Build a harness | 02-07 | Write `mini-harness`: the loop, tools, context management, control and safety, delegation and long-running work, observability and evals |
| C. Engineer the environment | 08-11 | Map Claude Code onto what was built; then guides, sensors, and measuring and improving a real set-up |
| D. Capstone | 12 | Ship an agent for a real product and write it up |

The module list, with each module's question, mental models, lab and exit check, is in `SYLLABUS.md`.

### A module

Each `modules/NN-name/README.md` has the same sections, in this order:

1. **Question** the module answers, in one line.
2. **Why it matters**, tied to a coding-agent set-up and to building products.
3. **You can...**: three to five outcomes that can be observed.
4. **Mental models**: links to the cards this module introduces.
5. **Theory primer**: the key ideas, short.
6. **Read**: a core list that fits in about 90 minutes, and an optional deeper list.
7. **Lab**: the goal, a "predict first" step, an outline, a stop condition and a stretch task.
8. **Self-check**: five to seven questions to answer without notes.
9. **Ship** (optional): a prompt for a public write-up.

Module 12, the capstone, is the exception (added 2026-11-21): it has no theory primer or lab; "The
work" and a stop condition take their place, and its Ship step is required.

Next to it, `notes.md` is the template for the learner's own file: notes in their own words,
predictions and results.

**Correction, 2026-11-22 (filled-in work).** By the owner's decision the templates are public and
what the learner fills in goes to `private/`, at the template's path
([ADR 0002](../adr/0002-filled-in-work-stays-private.md)). Where this design names `notes.md`,
"My version", the glossary, `PROGRESS.md`, drafts in `writeups/`, a catch-up's annotations or the
capstone's documents as something the learner writes, the private copy is meant (for the capstone,
`private/capstone/`).

### Mental models

The owner asked for a mental model for each technology. A model earns its place by letting the learner
predict behaviour, so the models are built and tested, not handed over as facts.

- `mental-models/` holds one card per technology (the LLM as a stateless function, a token, the context
  window, a tool call, the agent loop, the prompt cache, compaction, a sub-agent, a permission rule, a
  sandbox, a hook, prompt injection, an eval, a trace, a guide, a sensor, and so on).
- A card has six parts: the model in one sentence; a picture; what it predicts; where it breaks; a small
  experiment that tests it; the sources it comes from. A seventh part, "My version", is the learner's.
- Every lab starts with a written prediction and ends by comparing it with what happened. A wrong
  prediction is the most useful outcome, because it shows where the model needs repair.
- `mental-models/README.md` is the index: one row per technology, the one-sentence model and its module.

### A week

About 4 hours, in three sittings:

1. **Read (about 1.5 h):** the primer and the core reading; fill in "My version" on the cards; write the
   lab predictions.
2. **Build (about 2 h):** the lab, to its stop condition.
3. **Check (about 0.5 h):** the self-check as a quiz with Claude; update the glossary and `PROGRESS.md`.

### Claude's role

`CLAUDE.md` in this repository makes Claude a tutor:

- In `labs/`, the learner writes the code. Help escalates: a question, then a pointer, then
  pseudo-code, and real code only when the learner asks for it.
- Explanations start from a mental model: the model, one thing it predicts, one place it breaks.
- Claims about the Claude API and Claude Code are checked against the live docs, never recalled.
- A progress box is ticked only when the stop condition's output has been shown.

Slash commands for studying (`/quiz` and the like) are not pre-built: writing one is a lab in module 09,
where the learner studies skills.

### Labs, tests and falling behind

- **No reference solution is written in advance.** `mini-harness` holds only the learner's code. After
  a lab is reviewed, its state is tagged `lab-NN-done`, so the next module starts from a known point.
- **A lab's stop condition in Part B is an acceptance test file** that Claude writes when the module is
  expanded, before the learner writes any code: the learner receives red tests and makes them green.
  The learner also writes at least one test of their own per lab.
- **Acceptance tests run against a scripted fake model**, so they are free, offline and deterministic.
  A separate live run against the real API closes each lab. Injecting the model as a dependency is
  itself a harness-design lesson, taught in module 02.
- **Falling behind moves the schedule, not the content:** Part B labs are done in order. If the learner
  asks for a catch-up, Claude writes that lab on a branch `catch-up/lab-NN`, and the learner annotates
  it line by line before moving on. This is the one case where Claude writes lab code.
- **Module 01 is an exploration lab** with no acceptance test: its stop condition is a live run that
  exits 0 plus the predictions and outcomes recorded in the module's `notes.md`.
- **Module 05's sandbox** uses an operating-system or container sandbox that is already
  available; nothing is installed for it.

### Sources

The reading lists come from a deep-research pass started on 2026-11-21 in the same session as this
design: six research areas, each source fetched and checked, a report in `reports/` and the raw notes
in `research_notes/`. `resources/reading-list.md` is the curated list by module, with the date each
source was checked.

A reading list goes stale, so it is re-checked on a trigger and not on a calendar: when a module is
started, its links are fetched again, newer authoritative sources are searched for, and the module's
"checked" date is updated.

A source enters the reading list in one of two ways: a researcher fetched its page and recorded its
date, or it is a companion text the owner approved (today the book and the two survey papers). The
book is not the spine: the course keeps its own order, `SYLLABUS.md` maps the book's layers to modules, and the
chapter notes in `resources/book-notes/` are written in our own words, with no copied passages,
figures or code listings. The book's examples use Python and another vendor's API; each note carries
a table that translates them to the API the labs use.

**Correction, 2026-11-21 (publication).** The owner decided the same day to publish the repository.
`reports/`, `research_notes/` and `resources/book-notes/` are therefore gitignored and are not
published; the paragraphs above describe where they sit on the owner's machine. See the Publication
row under "What the owner said" and the "Publication boundary" section of `CLAUDE.md`.

**Correction, 2026-11-22 (how it becomes public).** The owner decided that the private repository is
not switched to public. A new repository gets one fresh commit of the final tree, because history and
pull-request refs keep every earlier version. See Task 8, Step 7 of the plan.

**Correction, 2026-11-21 (book map).** `SYLLABUS.md` no longer maps the book's layers to modules.
The review of the first pull request pointed out that the table restated the book's first figure and
the chapter numbers in its caption, which the publication boundary keeps out of git. The map is kept
with the chapter notes in `resources/book-notes/`; the syllabus says only that the two orders differ.

**Added, 2026-11-21 (survey papers).** The two survey papers are companion
texts and optional reading. They are listed in `resources/reading-list.md` under their own heading, and
the notes in `resources/paper-notes/` map their sections to the modules.

### Repository layout

```
README.md            start here
CLAUDE.md            how Claude tutors in this repository
SYLLABUS.md          the 13 modules at a glance
PROGRESS.md          template: checkbox tracker and learning log
GLOSSARY.md          template: one-line definitions
modules/NN-name/     README.md (brief) and notes.md (a template)
mental-models/       one card per technology, plus the index
labs/                TypeScript workspace: 00-smoke, 01-wire, mini-harness, experiments
resources/           reading-list.md, paper-notes/, and book-notes/ (the book; local only)
reports/             the deep-research report (local only, not published)
research_notes/      raw research notes behind the report (local only, not published)
writeups/            rules for posts, and published posts
private/             the learner's filled-in work, and anything derived from the set-up (gitignored)
tools/               small scripts that check this repository (relative links)
docs/plans/          this design and the plan
docs/adr/            decisions that outlive a change
```

## Calls made by Claude (not decided by the owner)

Each of these can be overturned.

| Call | Reason |
|---|---|
| The learner writes all lab code; Claude tutors | Writing the loop by hand is what makes the theory stick |
| TypeScript on Node 24, no build step, npm, `node --test` | The fewest moving parts |
| The Claude API as the one provider | Part C studies Claude Code, so Part B maps directly onto Part C |
| Module 01 looks at the wire with `curl`; all TypeScript uses the official SDK | Seeing the raw request and response once removes the mystery; SDK code is what a product ships |
| Modules 00-01 complete now, 02-12 as briefs | The learner needs week 1 ready; later modules should be written against current sources |
| Part C never writes to `~/.claude`; derived material goes to `private/` | The set-up is outside this course and private |
| One optional public write-up per module, in `writeups/` | Serves the write-up goal without making it a gate |
| A local git repository, no remote | Creating a GitHub repository publishes something and is the owner's decision |

**Correction, 2026-11-21 (remote).** The last row was overtaken the same day. The owner asked for the
repository to be published, so it has a remote: a private repository on the owner's GitHub
account, to be made public by the owner's own command. See the Publication row under "What the owner
said". (Superseded 2026-11-22 by the correction "how it becomes public" above.)

## Left to the builder

- The exact wording of module briefs and cards, within the templates above.
- Which verified sources go into "core" and which into "optional" for each module, keeping core
  reading near 90 minutes.
- The fixture repositories that Part B and Part C labs use, created when those modules are expanded.

## Builder check

A separate agent read this document on 2026-11-21 as someone who would have to plan from it, and
returned six questions. Four were settled here as Claude's calls (who writes the lab tests and what
happens when a lab is skipped; what Part C may read; how the reading list is kept current; how module
05 gets a sandbox). Two are the owner's and are listed below (questions 1 and 4).

## Open questions for the owner

1. Which model should the labs use?
2. Should this repository get a GitHub remote, and should it be public (it serves the write-up goal)
   or private? **Answered 2026-11-21:** yes; private first, then public (the Publication row under
   "What the owner said"; how, changed on 2026-11-22: see the correction "how it becomes public").
3. (Taken out for publication, 2026-11-22.)
4. To decide before module 09, not now: how are the Part C measurements run?
   And before module 12: which product is the capstone for? It cannot be client work.
5. Which book is the companion text? The O'Reilly listing found by search is titled "Harness
   Engineering". The author and title are to be confirmed from the title page before they are relied
   on. (Wording changed 2026-11-21, per the publication boundary in `CLAUDE.md`.)
