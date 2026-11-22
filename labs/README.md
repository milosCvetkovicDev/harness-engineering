# Labs

The TypeScript workspace for the course. Node runs the `.ts` files directly; there is no build step.

## Set up (once)

```bash
nvm use            # Node 24, from .nvmrc in the repository root
cd labs
npm install
```

Then give the labs a credential. Create the file `labs/.env` with this content and paste your key
after the `=`:

```
ANTHROPIC_API_KEY=
# Optional: the model every lab uses. Unset means the default in lib/config.ts.
# HX_MODEL=
```

`labs/.env` is gitignored. Never commit it and never paste the key into a prompt or a chat.

The `npm run` scripts read `labs/.env` when they start, but a variable that is already set in the
shell wins over the file (checked with Node 24 on 2026-11-21). If a change to `labs/.env` seems to
have no effect, look for an exported `ANTHROPIC_API_KEY` or `HX_MODEL` in that shell: `unset` it, or
open a new shell.

## Commands

Run them from `labs/`.

| Command | What it does | Calls the API |
|---|---|---|
| `npm run smoke` | Module 00 environment check: one tiny request | yes |
| `npm run test:smoke` | Tests for the environment check, against a local fake server | no |
| `npm run model` | Prints the model the labs call (lab 01 reads it into the shell) | no |
| `npm run wire` | Module 01 exit check | yes |
| `npm run typecheck` | Type-checks every lab | no |
| `npm run typecheck:ci` | The same, without the test files listed as pending in `tsconfig.ci.json`. This is what CI runs | no |

## What is where

| Path | Module | Contents |
|---|---|---|
| `lib/config.ts` | all | Names the model the labs call and cleans the API key (tests use their own ids as fixtures) |
| `00-smoke/` | 00 | The environment check and its tests |
| `01-wire/` | 01 | The model interface by hand: `curl` first, then the SDK |
| `mini-harness/` | 02-07 | The harness you build, one layer per module |
| `experiments/` | 08-11 | Measurements on a real set-up |

## Conventions

- **Imports carry the `.ts` extension** (`import { MODEL } from "../lib/config.ts"`). Node strips the
  types and runs the file as it is, so it needs the real file name.
- **No `enum`, no `namespace`, no parameter properties.** Node removes type syntax but does not
  transform code; `erasableSyntaxOnly` in `tsconfig.json` rejects what Node cannot run.
- **A path that starts with `private/` is at the repository root**, so from here it is `../private/`.
  Only code goes in `labs/private/`, with the tasks and set-up copies it needs. `node tools/run-tests.mjs`
  and CI skip that folder: run its tests by path. The local typecheck does read it, so an error there
  fails `npm run typecheck` on your machine only.
- **What you write goes to `private/`:** guesses, observations, labels, tables and results, in the
  module's private notes. The files an agent writes while it runs (notes, plans, checkpoints) go
  under `.runs/`.
- **Run output goes under a `.runs/` folder**, which is gitignored. Transcripts and eval results can
  hold prompts and file contents, so they stay out of git.
- **The model is set in one place.** `lib/config.ts` holds the default; `HX_MODEL` in `labs/.env`
  overrides it. The default is the current Opus model. A cheaper model is a cost decision: check the
  pricing page of the Claude API docs before you change it, and note the model in your private lab notes,
  because results from two models are not comparable.
- **One test file at a time**: `node --test path/to/file.test.ts`.

## When the environment check fails

| Message | Meaning | Fix |
|---|---|---|
| `No usable Anthropic credential was found` | No key in `labs/.env`, or it is blank | Add the key, run `npm run smoke` again |
| `The API rejected the credential (HTTP 401)` | The key is wrong, revoked or from another workspace | Create a new key in the Claude Console |
| `The API returned an error (HTTP 404) for model ...` | The model ID in `HX_MODEL` or `lib/config.ts` does not exist | Check the models page of the docs; fix the ID |
| `Could not reach the API` | Network or proxy | Check the connection and `ANTHROPIC_BASE_URL` |
