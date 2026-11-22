# Harness engineering: a self-study course

A 13-module course for one learner: theory, a mental model for each technology, and a lab every week.
It takes about 4 hours a week.

## What "harness engineering" means here

An AI agent is a model plus everything around it. The part around it is the **harness**: the loop that
calls the model, the tools it may use, what it is shown, what it is allowed to do, and how its work is
checked. People use "harness engineering" for two jobs, and this course teaches both, in this order:

1. **Building a harness.** You write a small one from scratch (`labs/mini-harness`), so that nothing
   in a production harness is a mystery.
2. **Engineering the environment around an existing agent.** You take Claude Code, which someone else
   built, and shape what it reads (guides) and what checks its work (sensors), then measure whether
   your changes helped.

## How the course is organised

| Part | Modules | You |
|---|---|---|
| A. Foundations | 00-01 | get a map of the field, set up, and see how a model is actually called |
| B. Build a harness | 02-07 | write `mini-harness`: the loop, tools, context, control and safety, delegation, evals |
| C. Engineer the environment | 08-11 | map Claude Code onto what you built, then work on guides, sensors and measurement |
| D. Capstone | 12 | ship an agent for a real product and write it up |

[SYLLABUS.md](SYLLABUS.md) has every module on one page. Modules 00 and 01 are ready. Modules 02-12 are
briefs: each one is expanded, and its reading list re-checked, on the day you start it.

## A week

1. **Read (about 1.5 h).** The module's primer and core reading. Write "My version" of the module's
   mental-model cards in `private/mental-models/`. Write your lab predictions before you run anything.
2. **Build (about 2 h).** The lab, up to its stop condition.
3. **Check (about 0.5 h).** The self-check as a quiz with Claude. Update your copies,
   `private/GLOSSARY.md` and `private/PROGRESS.md`.

## What you fill in stays private

The templates are public. What you fill in goes to `private/`, at the template's path (the capstone's
documents: `private/capstone/`), and git ignores that folder: notes and predictions, "My version" of each card, the glossary, the progress log, draft posts,
the capstone's documents, and every guess, label, table or result a lab asks you to record. Your lab
code is the exception: it lives in `labs/` and is committed, unless it is derived from your own set-up
or a real job.
That code goes in `labs/private/`, which git also ignores and where it finds the lab packages; copies
and variants of the set-up go there too.

Make your copies from the repository root. The commands never overwrite a copy you already have:

```bash
mkdir -p private/mental-models private/writeups private/capstone
for f in PROGRESS.md GLOSSARY.md modules/[0-9]*/notes.md; do
  mkdir -p "private/$(dirname "$f")"
  test -e "private/$f" || cp "$f" "private/$f"
done
```

`private/` is not backed up by git, and a fresh clone does not have it. Cleaning up ignored files and
removing a worktree both delete it without a warning, so write in your main clone and keep a backup. The same holds for `labs/private/`.

## Start here

1. Make your private copies (above), then read
   [modules/00-orientation/README.md](modules/00-orientation/README.md).
2. Set up the labs: [labs/README.md](labs/README.md).
3. Write module 00's three predictions in `private/modules/00-orientation/notes.md`.
4. Run `npm run smoke` in `labs/`. When it prints `OK: the lab environment works.`, week 1 has begun.

## Working with Claude in this repository

[CLAUDE.md](CLAUDE.md) makes Claude a tutor here, not a builder:

- In `labs/`, you write the code. Claude helps in steps: a question, then a pointer, then pseudo-code,
  and real code only when you ask for it.
- Every explanation starts from a mental model: the model, one thing it predicts, one place it breaks.
- Every lab starts with a written prediction. A wrong prediction is the useful outcome: it shows which
  mental model needs repair.

## Map of the repository

```
SYLLABUS.md          the 13 modules at a glance
PROGRESS.md          template: checkbox tracker and learning log
GLOSSARY.md          template: one-line definitions
modules/NN-name/     README.md (the brief) and notes.md (a template)
mental-models/       one card per technology, plus the index
labs/                TypeScript workspace: 00-smoke, 01-wire, mini-harness, experiments
resources/           reading-list.md and paper-notes/ (notes on the companion book are local only)
reports/             the research report behind the reading list (local only, not published)
research_notes/      the raw research notes behind the report (local only, not published)
writeups/            rules for posts, and posts you decided to publish
private/             what you fill in, and anything derived from your own set-up (gitignored)
docs/plans/          the course design and the plan that built this scaffold
docs/adr/            decisions that outlive a change
tools/               small scripts that check this repository
LICENSE              MIT, for the code
LICENSE-CC-BY-4.0    Creative Commons Attribution 4.0, for the text
```

## Sources

The reading lists come from a research pass on 2026-11-21 across six areas.
[resources/reading-list.md](resources/reading-list.md) is the curated list by module, with each
source's link and date. The field moves monthly, so a module's links are fetched again when the
module is started.

This repository holds the course in our own words. It does not hold the books and papers it reads
from: no PDFs, no copied passages, no figures. Every source is cited by title, author and its own
page. The research report (`reports/`), the raw research notes (`research_notes/`) and the chapter
notes on the companion book (`resources/book-notes/`) stay on the owner's machine and are not
published.

## Licence

- **Text** (the Markdown files: modules, cards, notes, plans and the other documents) is under
  [Creative Commons Attribution 4.0 International](LICENSE-CC-BY-4.0). In short: credit Milos
  (milosCvetkovicDev), link to the licence and say what you changed. The licence's own text governs.
  Diagrams and other fenced blocks that are not code count as text.
- **Code** (every file that is not Markdown, and the code and commands inside the Markdown) is under
  the [MIT licence](LICENSE). Where that licence says "associated documentation files", it does not
  extend to the files and blocks that are text.
- **Other people's work is not covered.** The books, papers, pages and packages this repository cites
  or installs keep their own terms, and so do the two licence texts.
