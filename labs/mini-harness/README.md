# mini-harness

The harness you build in Part B, one layer per module. This folder holds only your code: no
reference solution is written in advance.

## What gets added, and when

| Module | Layer | The question it answers |
|---|---|---|
| 02 | The loop, one tool, stop conditions | When does an agent stop? |
| 03 | File and shell tools, validation, output limits | Why does tool shape change behaviour? |
| 04 | Token accounting, compaction, a notes file, a cache-friendly request | What belongs in the window? |
| 05 | A permission gate, hooks, a sandboxed shell, an audit log | Which rules are enforced by code? |
| 06 | A sub-agent tool, a plan tool, checkpoint and resume, a skill loader | How does work outlive one window? |
| 07 | A trace file and an eval runner | Did a change make it better? |

## How a lab works

1. When you start a module, Claude writes that lab's **acceptance tests** into this folder. They are
   red: nothing they test exists yet. Until the lab is done they are listed in the `exclude` of
   `../tsconfig.ci.json` by their path from `labs/` (for example `mini-harness/loop.test.ts`), which
   tells CI that red is expected.
2. The tests run against a **scripted fake model**, a stand-in that returns prepared responses. They
   need no key, cost nothing and give the same result every time.
3. You write the code that makes them green, and at least one test of your own. When they are
   green, take them out of that list. CI fails until you do, and from then on it runs them and
   typechecks them like any other test.
4. You close the lab with one **live run** against the real API. Its transcript goes under `.runs/`.
5. After the review, the commit is tagged `lab-NN-done`. The next module starts from that tag.

Run one test file at a time: `node --test mini-harness/<file>.test.ts` from `labs/`.

## Two rules that shape the design

- **The model is passed in, not imported.** The loop receives "something that can answer a request"
  as a parameter. The tests pass the fake; the live run passes the SDK client. Module 02 explains
  why this one decision makes the whole harness testable.
- **All API calls go through the SDK**, and the model name comes from `../lib/config.ts`.

## If you fall behind

Labs are done in order, because each one builds on the last. If a week is lost, the schedule moves;
the content does not. You can ask Claude for a catch-up: it writes that lab on a branch
`catch-up/lab-NN`, and you annotate it line by line in `private/labs/catch-up/lab-NN.md` before
moving on.
