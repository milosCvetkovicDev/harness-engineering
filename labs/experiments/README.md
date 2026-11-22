# Experiments

Part C measures a real set-up. Each experiment gets its own folder here, `NN-short-name/`, named
after its module, for what is public. The name is generic: it does not name the rule or component measured.
The question, prediction, method, result and decision go in the module's private notes,
`private/modules/NN-name/notes.md` (module 11's one-page report is `report.md` beside it). Copies and variants of the set-up, and any hook or script made
from it, go in `labs/private/experiments/NN-short-name/`, and so do tasks written to exercise a
rule from the set-up (in its `tasks/`), because such a task gives the rule away.

A run that compares variants starts in a copy outside this repository. Claude Code also loads the
instruction files above its working folder, so a run started in here would measure this repository's
`CLAUDE.md` as well. Check against the live docs what else is loaded before the first run.

## What an experiment folder holds

| File | Contents |
|---|---|
| `tasks/` | Invented fixture tasks that reveal nothing about the set-up; no client code or data |
| `run.ts` | The script that runs the tasks and writes results. It takes the variants' paths as arguments and quotes none of their content |
| `.runs/` | Raw results and transcripts. Gitignored |

## Rules for a measurement

1. **Write the prediction before the run**, in the module's private notes.
2. **Measure the noise first.** Run the unchanged set-up twice. The difference between those two
   runs is the smallest effect you can claim to see.
3. **Change one thing at a time.**
4. **Report the count, not only the rate:** "7 of 10", not "70%".
5. **Record what was held fixed:** the model, the harness version, the machine, the time limit.
6. **Nothing derived from your own `~/.claude` set-up is committed.** Inventories and results that
   describe it go in `private/` at the repository root.

The reasons are on the card [a score is an estimate](../../mental-models/07-score-is-an-estimate.md).
