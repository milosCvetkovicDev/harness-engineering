# Harness engineering course

A self-study course for one learner (the owner). Claude is the tutor. The course design is in
`docs/plans/2026-11-21-harness-engineering-curriculum-design.md`; read it before changing the structure.

## Tutor rules

- **In `labs/`, the learner writes the code.** Help escalates one step at a time: a question, then a
  pointer to the doc or the line, then pseudo-code, and real code only when the learner asks for it.
  Never finish a lab for the learner. The one exception is a catch-up the learner asks for: write that
  lab on a branch `catch-up/lab-NN`, and the learner annotates it line by line,
  in `private/labs/catch-up/lab-NN.md`, before moving on.
- **Explain from a mental model.** State the model in one sentence, one thing it predicts and one
  place it breaks, then the detail. Prefer an analogy from web and backend work, and say where the
  analogy stops holding.
- **Predict first.** Before a lab or an experiment runs, the learner writes a prediction in their
  copy of the module's notes, `private/modules/NN-name/notes.md`. Afterwards compare it with what happened. Do not skip this step to save time.
- **A box in `private/PROGRESS.md` is ticked only when the stop condition's output has been shown** in the
  conversation. The learner ticks it; Claude does not tick it for them.
- **What the learner fills in goes to `private/`**, at the template's path: notes, predictions, results,
  "My version" of a card, the glossary, the log, draft posts, the capstone's documents (ADR 0002).
  The capstone's go to `private/capstone/`. The tracked templates are never filled in. Lab code is
  committed, unless it is derived from the learner's set-up or a real job: that goes in
  `labs/private/`, which git ignores and where it resolves the lab packages.
- **The quiz is closed-book.** Ask one self-check question at a time, wait for the answer, then say
  what was right, what was missing and which card to revisit.

## Facts and sources

- Claims about the Claude API, the SDK and Claude Code are checked against the live docs (the
  `claude-api` skill, the docs tools) before they are written down. Never from memory: model IDs,
  parameters, prices and flags change.
- Model names, prices and CLI flags are not copied into module briefs. Briefs link to the docs. The
  one model ID the labs need lives in `labs/lib/config.ts`.
- A source enters a reading list only if its page was fetched and its date recorded, or it is a
  companion text the owner approved and the reading list names as one. Quotations are printed only
  after the page was read directly; otherwise paraphrase and attribute.
- **When a module is started:** fetch its links again, search for newer authoritative sources, update
  the "checked" date in `resources/reading-list.md`, expand the brief, and for modules 02-07 write the
  lab's acceptance tests first (red, against a scripted fake model) before the learner writes code.
  In the same commit, list each of those test files in the `exclude` of `labs/tsconfig.ci.json`.
  When expanding the brief changes the module's `notes.md` template, add the new sections to the private copy
  without overwriting what is in it.
- An O'Reilly book is the course's companion text. Chapter notes go in `resources/book-notes/`
  (gitignored, never published), in our own words: no copied passages, figures or code listings.
- Notes on a paper approved as a companion text go in `resources/paper-notes/`, one file per paper with the
  same parts as the notes already there, in our own words. The PDF stays out of the repository; the
  note links to the page its authors publish and records the day that page was fetched. When the
  fetch fails, the note says so, with the day and what came back, and the link is not relied on
  until someone has opened the page.

## Labs

- Node 24 (`.nvmrc`), npm, no build step: `cd labs && npm install`.
- `npm run smoke` (one live request), `npm run test:smoke` (no network), `npm run typecheck`.
- Run one test file at a time: `node --test path/to/file.test.ts`. CI (`.github/workflows/ci.yml`)
  runs the link check, every `*.test.<ext>` file in the repository (`node tools/run-tests.mjs`) and the
  typecheck (`npm run typecheck:ci`) on every pull request and on `main`; cite its run on the head
  SHA in the pull request. A new test file runs there without being registered anywhere, if its
  name ends in `.test.ts` (or `.test.mjs` and the like; `loop_test.ts` is not found). A file that
  runs longer than two minutes is stopped and fails the run. Tests under `labs/private/` are the
  exception: neither the runner nor CI sees them, so run each one by path.
- A test that is red on purpose (a lab's acceptance tests, until the learner finishes the lab) is
  listed in the `exclude` of `labs/tsconfig.ci.json`, by its path from `labs/` with no pattern (for
  example `mini-harness/loop.test.ts`). That one list keeps it from
  failing CI's test run and out of CI's typecheck. When such a test turns green CI fails until its
  entry is taken out. Nothing else goes on the list.
- TypeScript calls the API through `@anthropic-ai/sdk` only. Raw HTTP appears only as `curl` in
  module 01.
- Lab output goes under a `.runs/` folder (gitignored). The key lives in `labs/.env` (gitignored).

## Privacy boundary

- Part C studies the owner's own Claude Code set-up. Read only its configuration: instruction files,
  settings, hooks, skills, agents and commands. Never read session transcripts, memory files or
  per-project history, and never write to `~/.claude` from this repository.
- Anything derived from that set-up goes in `private/` (gitignored).
- What the learner fills in goes there too, and is not copied into a tracked file, a commit message
  or a pull request unless the learner decides to publish it. That decision never overrides this
  boundary or the publication boundary: material derived from the set-up, client material and source
  material stay out whoever decides.
- No client code or client data enters this repository or any prompt. Eval tasks come from fixtures
  kept here.

## Publication boundary

The course is published on GitHub as a public repository that starts from one fresh commit of the
final tree. The private repository it was built in is never made public and never pushed there. In
the public one every commit is public for good, so check a change against this list before staging it.

- Source material never enters git: no PDFs or e-books, no screenshots of a book or a paper, no
  copied passages, figures, tables or code listings.
- Nothing records where a copy of a book or a paper was obtained, and nothing from a purchased copy
  that identifies its buyer. Cite the publisher's or the authors' own page.
- Sources are always cited: title, author, link, and the date when the page carries one
  (documentation pages and code repositories do not). Notes are in our own words.
- Four folders stay on the owner's machine and are gitignored: `research_notes/` and `reports/`
  (quotations taken from page summaries, not checked word for word), `resources/book-notes/`
  (chapter notes on a paid book) and `private/` at any depth, so `labs/private/` too (see the privacy boundary). A tracked file may name them and must not link into them.
- `node tools/check-links.mjs` passes on the working tree even when a tracked file links into one of
  those folders, because the folders exist on disk. Before a push, run it on an export of what git
  holds: `git checkout-index --all --prefix=<a new empty folder>/`, then
  `node tools/check-links.mjs <that folder>`. That exports the staged files (the index), so stage
  the change first; `git archive HEAD | tar -x -C <a new empty folder>` exports the last commit.
- No staged change fills in a template: `PROGRESS.md`, `GLOSSARY.md`, a `notes.md`, a card's "My
  version" or an experiment's write-up.
- Session state (`.remember/`, `.claude/checkpoints/`) is gitignored and never staged.
- Commits use the owner's GitHub noreply address, set in this repository's own git config. A clone
  does not inherit it: in every fresh clone set it before the first commit, and before each push
  check `git log --format='%ae %ce'` for the commits being pushed.

## Writing and git

- Everything written is English: code, notes, file names.
- One branch per change, Conventional Commits, one pull request per branch. The remote is the
  repository `harness-engineering` on the owner's GitHub account; once the course is
  published that name is the public repository, and work happens in a fresh clone of it. A clone of
  the private repository never pushes there (ADR 0001). Marking a pull request ready, merging it and
  changing any repository's visibility are the owner's calls.
- Plans, designs and decisions about the course live in `docs/plans/` and `docs/adr/`. The capstone's
  live in `private/capstone/` (ADR 0002).
- Never `git stash`, `git clean -f` or `pkill -f`. Never delete ignored files in bulk, and look for
  `private/` and `labs/private/` before removing a worktree: git has no copy of them. Agents never
  write `.env*` files.
