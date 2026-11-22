# Memory

**Module:** 04 (returns in 06 and 09)

## The model in one sentence

An agent's memory is files that a harness writes and loads back; each session starts like an engineer
arriving on a new shift, knowing only what the previous shift wrote down.

## Picture

```
session 1 --writes--> notes file, progress file, git history
                              |
session 2 <---reads-----------+     (session 2 remembers nothing else)
```

From backend work: a stateless service with a database. The service forgets everything between
requests; the database is the only continuity, and it holds only what someone chose to store.

## What it predicts

- If a decision was not written down, the next session will make it again, possibly differently.
- An instruction file is loaded as context. The model usually follows it, and nothing guarantees
  that it does.
- A wrong note is worse than no note: it is read as true at the start of every session.

## Where it breaks

- **A person on a new shift has judgment about what matters.** The agent has only the text. The
  hand-off must be explicit about state, next step and what not to redo.
- **Memory grows.** Every line loaded at the start is paid for on every call, and adds to the
  [context budget](04-context-budget.md). Memory needs pruning as much as writing.
- **"Memory" names several things**: an instruction file you write, notes the agent writes, and a
  vendor feature that stores and retrieves. Check which one a source means.

## A small experiment

Module 04 lab: give `mini-harness` a notes file. End a session mid-task, start a new one, and see
what the agent does first. Then put one false statement in the notes and repeat.

## Sources

- Justin Young, Anthropic, "Effective harnesses for long-running agents" (2025-11-26): the shift-work
  picture and hand-off files. <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>
- Claude Code docs, "Memory": instruction files are context, not enforced configuration.
  <https://code.claude.com/docs/en/memory>

## My version

Write it in `private/mental-models/04-memory.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
