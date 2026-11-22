# Compaction

**Module:** 04

## The model in one sentence

Compaction replaces a long conversation with a summary of it and carries on, which buys room at the
price of detail.

## Picture

```
before: [system][task][step 1 ... step 40]            <- near the limit
after:  [system][task][summary of steps 1-40][step 41 ...]
```

From backend work: log rotation with a digest. You keep a short record of what happened and lose the
lines themselves.

Three related moves, easy to confuse:

| Move | What it does |
|---|---|
| Compaction | Shrinks the whole conversation into a summary |
| Clearing | Drops stale items (old tool results) and keeps the rest as it was |
| Memory | Moves information out of the window into a file, to be read back when needed |

## What it predicts

- After a compaction the agent can lose an early instruction or a detail it was relying on.
- What must survive should not live only in the conversation: put it in a file the agent re-reads.
- Compaction replaces the message history, so that part of the prompt cache is rebuilt; the system
  prompt and the tool definitions in front of it can still be read from the cache.

## Where it breaks

- **It is not a fresh start.** A summary carries the old session's framing and mistakes forward. A
  reset (a new agent that reads a hand-off note) is a different tool with a different cost.
- **The summary is written by a model.** It can leave out what mattered. A compaction step deserves a
  test like any other component.

## A small experiment

Module 04 lab: state a constraint at the start of a long scripted run, force a compaction, then check
whether the agent still obeys the constraint. Predict the outcome first.

## Sources

- Anthropic, "Effective context engineering for AI agents" (2025-09-29): compaction as summarise and
  continue. <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
- Anthropic, "Harness design for long-running application development" (2026-03-24): compaction
  versus a reset with a hand-off. <https://www.anthropic.com/engineering/harness-design-long-running-apps>
- Claude Code docs, "Explore the context window": what survives a compaction in a real harness.
  <https://code.claude.com/docs/en/context-window>
- Claude Code docs, "How Claude Code uses prompt caching": which cache layers a compaction
  invalidates. <https://code.claude.com/docs/en/prompt-caching>

## My version

Write it in `private/mental-models/04-compaction.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
