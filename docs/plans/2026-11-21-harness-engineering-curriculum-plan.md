# Harness Engineering Curriculum Implementation Plan

> **For agentic workers:** this plan is executed natively in the session that wrote it, with one
> independent review of the whole branch at the end. Steps use checkbox (`- [ ]`) syntax and are ticked in the same commit as the work.

**Goal:** turn an empty folder into a 13-module self-study course on harness engineering, with week 1
ready to start and every reading verified.

**Architecture:** a documentation repository with a small TypeScript lab workspace. Module briefs,
mental-model cards and the reading list are Markdown; the labs run directly on Node with no build step.
The reading lists are filled from a deep-research pass whose notes and report are kept locally and
not published (corrected 2026-11-22; see Task 8).

**Tech Stack:** Markdown; TypeScript on Node 24 (native type stripping); `node --test`; npm; the
official `@anthropic-ai/sdk` for all TypeScript; `curl` and `jq` in module 01 to look at the wire.

**Spec:** [2026-11-21-harness-engineering-curriculum-design.md](2026-11-21-harness-engineering-curriculum-design.md)

**Edited for publication, 2026-11-22:** some recorded wording in this plan was shortened or made more
general, the rule for admitting a source included. The note at the top of the design says why. The
pull requests, commits and CI runs cited below are in the private working repository. A second edit
the same day took out further personal details and shortened the header note, the rule on `.env`
files, Task 2's result and Task 8's Steps 2 and 3. It also dropped the rule against three destructive
commands from the Global Constraints; a review caught that, and the rule is back word for word. The
learner's filled-in work now goes to `private/` (ADR 0002), also where a task below says otherwise.

## Global Constraints

- Everything written is English.
- Node 24 (`.nvmrc`), npm, no build step, `node --test`.
- TypeScript calls the API through the official SDK only; raw HTTP appears only as `curl` in module 01.
- The SDK resolves the credential (`ANTHROPIC_API_KEY`, or an `ant auth login` profile); `.env` is never
  committed. Agents never write `.env*` files; the template is a code block in `labs/README.md`.
- The default lab model is `claude-opus-5-5`. A cheaper model is the owner's choice, made with `HX_MODEL`.
- One module is about 4 hours: about 1.5 h reading, 2 h lab, 0.5 h check. Core reading stays near 90 minutes.
- A reading enters a module only if a researcher fetched it on 2026-11-21 and recorded its date, or it is
  the companion book, which the owner approved. Book notes are in our own words: no copied passages, figures
  or code listings.
- The learner writes lab code. The scaffold supplies the environment check, lab instructions and starters, not solutions.
- Nothing is written to `~/.claude` from this repository; material derived from it goes to `private/` (gitignored).
- Locally, run one test file at a time. Never `git stash`, `git clean -f` or `pkill -f`.
- Model names, prices and CLI flags are not copied into briefs; briefs link to the docs. The one model ID
  the labs need lives in `labs/lib/config.ts` and can be overridden with `HX_MODEL`.

## Review Focus

Conditions the design implies and a learner will meet, most likely first:

1. **No API key, or a blank one.** The environment check exits 1 and names `ANTHROPIC_API_KEY`; a blank
   key is never sent as a credential. Pinned by Task 1's test.
2. **A key with a trailing newline or spaces** (pasted into `.env`). It is trimmed before use. Pinned by
   Task 1's test.
3. **A dead or moved link in a reading list.** Every URL in `resources/reading-list.md` and the module
   briefs was fetched by the fact-check in Task 7; failures are fixed or the entry is removed.
4. **A stale model ID.** One constant in one file plus an environment override; the smoke check prints
   the API's error body, so a retired model is visible at once. Checked by reading in Task 7.
5. **Lab output committed by accident** (transcripts can hold prompts and file contents). Labs write
   run output under `.runs/`, which is gitignored. Checked with `git status --ignored` in Task 6, Step 3.

---

### Task 1: Lab workspace and environment check

**Files:**
- Create: `.nvmrc`, `labs/package.json`, `labs/tsconfig.json`, `labs/README.md`
- Create: `labs/lib/config.ts`, `labs/00-smoke/smoke.ts`
- Test: `labs/00-smoke/smoke.test.ts`

**Interfaces:**
- Produces: `labs/lib/config.ts` exports `DEFAULT_MODEL: string`, `MODEL: string` (overridable by
  `HX_MODEL`), `supportsServerFallback(model: string): boolean`,
  `normalizeApiKey(raw: string | undefined): string | undefined` (trimmed key, or `undefined` when
  blank) and `applyNormalizedApiKey(env?: NodeJS.ProcessEnv): void`.
- Produces: `labs/00-smoke/smoke.ts`, run as `npm run smoke` from `labs/`; exits 0 after printing the
  reply text, the block types, `stop_reason` and `usage`; exits 1 with a message on stderr otherwise.

- [x] **Step 1:** check the request shape, headers and current model IDs against the official SDK
      reference (the `claude-api` skill bundled with Claude Code, read on 2026-11-21). Outcome: the SDK, not `fetch`; default
      model `claude-opus-5-5`; effort set explicitly; server-side refusal fallback where the model has one.
- [x] **Step 2: write the failing test** `smoke.test.ts`: the script runs against a local fake server
      through `ANTHROPIC_BASE_URL`. Cases: key normalisation (spaces, newline, byte-order mark, blank,
      missing); the fallback allow-list; success prints reply, `end_turn` and usage and sends the
      trimmed key and the default model; `HX_MODEL` is honoured; no credential and a blank key both
      exit 1 naming `ANTHROPIC_API_KEY`; a refusal exits 1.
- [x] **Step 3:** run `node --test 00-smoke/smoke.test.ts` in `labs/`. Result: failed as expected
      (`pass 0, fail 1`, module not found).
- [x] **Step 4:** implement `config.ts` and `smoke.ts`.
- [x] **Step 5:** run the same command. First run: 7 pass, 1 fail. The test assumed the key travels in
      `x-api-key`; in this run SDK 1.12.0 sent the test key as `Authorization: Bearer`. The assertion
      now checks the credential whichever header carries it. Result: `tests 8, pass 8, fail 0`.
- [x] **Step 6:** `npm install` then `npm run typecheck` in `labs/`. Result: exit 0
      (`@anthropic-ai/sdk` 1.12.0, `typescript` 7.0.2, `@types/node` 24).

### Task 2: Root documents

**Files:**
- Create: `README.md`, `CLAUDE.md`, `SYLLABUS.md`, `PROGRESS.md`, `GLOSSARY.md`
- Create: `writeups/README.md`, `docs/adr/README.md`, `private/` entry in `.gitignore`

- [x] **Step 1:** `SYLLABUS.md`: one row per module 00-12 with its question, mental models, lab and exit check.
- [x] **Step 2:** `README.md`: what the course is, how a week runs, the repo map, how to start module 00.
- [x] **Step 3:** `CLAUDE.md`: the tutor rules from the design ("Claude's role"), commands for the labs,
      the privacy boundary, the source rule.
- [x] **Step 4:** `PROGRESS.md`: per module, four boxes (read, cards, lab, self-check) and a dated log.
- [x] **Step 5:** `GLOSSARY.md`: the terms of modules 00-01 defined; later terms listed under their module.

Result: done. Added beyond the file list, once the course had a companion book:
chapter notes in `resources/book-notes/`, and a table in `SYLLABUS.md` that maps
the book's layers to modules. (Correction, 2026-11-21: after the review of the first pull request the
table moved to `resources/book-notes/`, which is not published; see Task 8.)

### Task 3: Mental-model cards

**Files:**
- Create: `mental-models/README.md` (index and how to use a card), `mental-models/_template.md`
- Create: one card per technology, named `NN-slug.md` after the module that introduces it

- [x] **Step 1:** the template with the seven parts from the design.
- [x] **Step 2:** the cards, each grounded in the research notes' "Mental models" sections; a model
      quoted from a source carries its attribution.
- [x] **Step 3:** the index: one row per card with the one-sentence model and the module.

Result: 25 cards for modules 00-11, each with the seven parts and an empty "My version".

### Task 4: Modules

**Files:**
- Create: `modules/_template/README.md`, `modules/_template/notes.md`
- Create: `modules/00-orientation/` through `modules/12-capstone/`, each with `README.md` and `notes.md`
- Create: `labs/01-wire/README.md`, `labs/01-wire/wire.ts` (starter), `labs/mini-harness/README.md`,
  `labs/experiments/README.md`

- [x] **Step 1:** the module template with the nine sections from the design.
- [x] **Step 2:** modules 00 and 01 complete, with lab 01's instructions and starter.
- [x] **Step 3:** briefs for modules 02-12: every section present; the lab has a stop condition that is
      a command or a measured number.

Result: 14 module folders (the template and 00-12). `labs/package.json` gained two scripts: `model`
(prints the configured model for the `curl` steps) and `wire`. `labs/01-wire/wire.ts` is a starter
that exits 1 until the learner writes it: `npm run wire` printed "wire.ts is still the starter" and
exit 1; `npm run typecheck` exit 0.

### Task 5: Reading list

**Files:**
- Create: `resources/reading-list.md`
- Modify: the "Read" section of every `modules/NN-*/README.md`
- Kept as delivered: `reports/Harness engineering authoritative sources.md`, `research_notes/`

- [ ] **Step 1:** read the research report and the six "Top 5" shortlists.
- [x] **Step 2:** `resources/reading-list.md`: sources by module, each with author, date, type, time and
      one line on what it teaches; core and optional marked; the date checked.
- [x] **Step 3:** fill each module's "Read" section from it, core near 90 minutes.

Result: the list was built from the "Source catalogue" and "Top 5" sections of the six research
notes, because the report had not been delivered when the list was written. Step 1 stays open until
the report is read and the list is compared with it. Core reading is 85 to 100 minutes per module,
by the researchers' estimates. Sources known only from search results are kept apart under "Leads,
not verified".

### Task 6: Checks

- [x] **Step 1:** `node --test 00-smoke/smoke.test.ts` and `npm run typecheck` in `labs/`; paste the output.
- [x] **Step 2:** every relative link in the Markdown resolves to a file (`tools/check-links.mjs`).
- [x] **Step 3:** `git status --short --ignored` shows `.env`, `.runs/` and `private/` patterns ignored
      and no secret staged.

Result, 2026-11-21:

```
node --test 00-smoke/smoke.test.ts     tests 8, pass 8, fail 0
npm run typecheck                      exit 0
node --test tools/check-links.test.mjs tests 9, pass 9, fail 0 (also in a copy outside the repository)
node tools/check-links.mjs             checked 134 relative links in 76 files, 0 broken
git check-ignore                       labs/.env, labs/.env.local, labs/**/.runs/, private/ and
                                       .claude/checkpoints/ are ignored; labs/.env.example is not
```

`tools/check-links.mjs` and its test were written test-first for Step 2. It resolves relative links
only; external URLs are the fact-check's job in Task 7.

### Task 7: Independent review and hand-over

- [x] **Step 1:** a fact-check agent verifies the claims and external links in the Markdown.
- [x] **Step 2:** an adversarial reviewer reads the diff alone (it was given tools, labs and root config).
- [x] **Step 3:** triage every finding below as fixed, deferred with reason or rejected with reason.
- [x] **Step 4:** commit on `docs/curriculum-scaffold`; write the hand-over note; report to the owner.

Order changed on 2026-11-21: once the owner asked for the repository to be published, the branch was
committed and pushed as a draft pull request before the two review reports were in. Their findings
are triaged below and fixed in follow-up commits before the pull request is marked ready.
(Correction, 2026-11-22: the triage was written in the pull requests, not below; see "Review triage".)

### Task 8: Publication boundary

Added on 2026-11-21 after the owner asked for the repository to be published on GitHub (see the
Publication row in the design). It runs before the first commit of the scaffold, because a commit
that reaches a public repository cannot be withdrawn.

- [x] **Step 1:** take `research_notes/` and `resources/book-notes/` out of the index and gitignore
      them together with `reports/`. The files stay on disk. (Task 5's "kept as delivered" still
      holds on the owner's machine.)
- [x] **Step 2:** set the owner's GitHub noreply address in this repository's git config.
- [x] **Step 3:** create the private repository `harness-engineering` on the owner's GitHub
      account and push `main`.
- [x] **Step 4:** reword every tracked file that linked into a private folder; add the "Publication
      boundary" section to `CLAUDE.md`.
- [x] **Step 5:** run the link check on an export of the index, not on the working tree; paste the
      output.

      ```
      git checkout-index --all --prefix=<new empty folder>/   80 files, none under a private folder
      node tools/check-links.mjs <that folder>               checked 125 relative links in 69 files, 0 broken
      git grep --cached (client names, personal details,     no match
        home paths, keys, download sources)
      ```
- [x] **Step 6:** push the branch and open a draft pull request; run the code review on it.
      Done: draft pull request 1; the review returned 16 findings.
- [x] **Step 6a:** fix the review's findings on the branch, tests first where behaviour changes, and
      record each one in the pull request as fixed, deferred or rejected.

      ```
      node --test tools/check-links.test.mjs       red: tests 16, pass 9, fail 7   green: pass 16, fail 0
        (later the same day, after the independent checks and a second review: tests 20, pass 20)
        (the same file in a copy without node_modules: pass 16, fail 0)
      node --test labs/00-smoke/smoke.test.ts      red: the file did not load      green: tests 11, pass 11
      npm run typecheck                            exit 0
      node tools/check-links.mjs <export of the index>
                                                   checked 124 relative links in 69 files, 0 broken
      ```

      Fixed: the link checker (symlinked start path, letter case, titles, footnotes, nested fences,
      a folder with no Markdown file); the lab's fallback model list, error help, test file and beta
      header assertion; the note on shell variables and `labs/.env`; the token card's step number;
      the lab's pointer to an unpublished file; two talks moved to "Leads"; dates on brief items;
      the CI sentence in `CLAUDE.md`; correction notes in the design. The book-layer table left
      `SYLLABUS.md` for the unpublished chapter notes. Still owed: a CI workflow (its own pull
      request), the fact-check and the adversarial review of the diff.
- [x] **Step 6b:** add the CI workflow that Step 6a left owed, as its own pull request.
      `.github/workflows/ci.yml` runs, on every pull request and on `main`: the link check before
      anything is installed, then `npm ci` in `labs/`, then every test file through
      `tools/run-tests.mjs` (written test-first), then `npm run typecheck:ci`. A test that is red on
      purpose is listed in `labs/tsconfig.ci.json`, which keeps it out of both. Both actions are
      pinned to commit SHAs read from the GitHub API on 2026-11-21. The CI sentence in `CLAUDE.md`
      changes in the same pull request, which cites the run on its head SHA.
      History: the first version named its two test files in the workflow and ran the link check
      after the install; the first review replaced both. The second review added a time limit per
      file, the refusal of file names `node --test` reads as patterns, and the rule that the
      typecheck runs even when a test fails.

      ```
      node --test tools/run-tests.test.mjs    first round   red: the file did not load    green: 16 of 16
                                              second round  red: 3 of 18 fail, and the time-limit
                                                            case hangs    green: 19 of 19
        (each round also passes in a copy without node_modules; with the line that clears
        NODE_TEST_CONTEXT removed, one test fails, as it should)
      ```
- [ ] **Step 7:** scan the whole history before the repository is made public. Making it public is
      the owner's call. (Correction, 2026-11-22: the private working repository stays private.
      What is published is a new repository with one fresh commit of the final tree. That repository
      does not inherit this one's git config: set the noreply address in it before committing. Before
      the push, read and scan the commit and check `git log --format='%ae %ce'`. The push waits for
      the owner's yes.)
      (Added, 2026-11-22, after review. Two more steps, both required. First, after the rename and
      before the new repository is created: set `origin` of every clone of the private repository
      to the renamed URL and read it back with `git remote -v`. Last, after the push, in a fresh
      clone of the public repository: set the noreply address, copy `private/`, `labs/private/`,
      `research_notes/`, `reports/`, `resources/book-notes/`, `.claude/checkpoints/` and `.remember/`
      into it (the owner copies `labs/.env`; agents never write it), confirm each with
      `git check-ignore`, and see a clean `git status` before any work. That list is a minimum: read
      `git status --short --ignored` in the old clone and decide on everything else it shows, such as
      `.runs/`, `CLAUDE.local.md` and `.claude/settings.local.json`.)

### Task 9: Survey paper notes

Added on 2026-11-21 for the two survey papers (see the Survey papers row in the
design). It ships as its own pull request on top of the scaffold.

- [x] **Step 1:** read both papers in full up to the references. (Correction, 2026-11-21: the note on
      the second paper also describes its two appendices, which this step had not covered. They were
      read during the review fixes: the opening and the table headings of Appendix A, and all of
      Appendix B. The descriptions held; the note now says when the appendices were read.)
- [x] **Step 2:** write `resources/paper-notes/README.md` and one note per paper, in our own words:
      the paper in one sentence, a mental model and where it breaks, a map to the modules, a
      reading plan with times, a vocabulary table, what to be sceptical of, a closed-book
      self-check.
- [x] **Step 3:** fetch each paper's own page. The arXiv page confirmed title, authors, date and
      category. The second paper's project page came back "not found"; the note says so.
- [x] **Step 4:** link the notes from the reading list, module 00, `SYLLABUS.md`, `README.md`,
      `PROGRESS.md`, `CLAUDE.md` and the design.
- [x] **Step 4a:** run the code review on the pull request and fix its six findings: both "Predict
      first" prompts moved above the text that answers them and name the notes file; the appendices
      read; the reading plans made to agree with the maps; a term used in a self-check question
      added to the vocabulary; the rule in `CLAUDE.md` says what to record when a fetch fails.
- [x] **Step 5:** an independent check of the notes against the papers' text; triage in the pull
      request.

## Review triage

Done on 2026-11-21. The findings and their triage were recorded in the pull requests of the private
working repository instead of here.
