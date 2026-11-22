# A checkpoint

**Module:** 06

## The model in one sentence

A checkpoint is the state a run writes down so that a new session, with an empty window, can continue
from the next step and not from the beginning.

## Picture

From backend work: a job that records its progress in the database, so a restarted worker resumes
and does not redo or skip work.

```
goal . what is done . what is next (the exact command) . what must not be redone
   written before a long step, updated after each phase, read first on resume
```

## What it predicts

- A run that can be interrupted (limit, crash, closed laptop) loses only the work since the last
  write.
- The quality of the resume depends on the quality of the note, not on the model: "continue" with no
  next step produces a wrong guess.
- Tests and git history are part of the checkpoint. They tell the next session what is true now.

## Where it breaks

- **An in-session rewind is not this.** A harness's undo for file edits covers what it tracked; it
  does not undo a shell command, a database change or a pushed commit.
- **A checkpoint can lie.** If the note says a phase is done and the code disagrees, the next session
  believes the note. Reconcile against the real state before continuing.
- **A fixed prompt in a loop needs a judge.** Repeating the same instruction with fresh context works
  only when something outside the agent, such as a test suite, says whether progress was made.

## A small experiment

Module 06 lab: kill a `mini-harness` run in the middle, start it again, and compare what it does
with and without the checkpoint file.

## Sources

- Justin Young, Anthropic, "Effective harnesses for long-running agents" (2025-11-26): progress files
  and hand-offs between sessions. <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>
- Claude Code docs, "Checkpointing": what a rewind covers and does not.
  <https://code.claude.com/docs/en/checkpointing>
- Geoffrey Huntley, "Ralph Wiggum as a 'software engineer'" (2025-07-14): a loop with fresh context
  where tests push back.
  <https://ghuntley.com/ralph/>

## My version

Write it in `private/mental-models/06-checkpoint.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
