# A sub-agent

**Module:** 06

## The model in one sentence

A sub-agent is a function call whose body is another agent loop with its own empty window: it does
the reading there and hands back only a summary.

## Picture

```
parent window:   [task] ... [call sub-agent("find where X is configured")] [summary: 6 lines]
                                   |                                ^
sub-agent window:                  v                                |
                 [brief] [read 14 files] [searches] [dead ends] ----+   (thrown away afterwards)
```

From backend work: handing a query to a worker that returns the result set, not its scratch tables.

## What it predicts

- The parent's window grows by the size of the summary, not by the size of the work.
- The sub-agent knows only what the brief says. Anything left out of the brief does not exist for it.
- Total tokens go up, because the sub-agent pays its own start-up context. You buy a clean parent
  window with a larger bill.

## Where it breaks

- **The summary is lossy in both directions.** The parent cannot see what the sub-agent missed, and a
  wrong finding arrives with the same confidence as a right one.
- **Parallel writers collide.** Two agents changing related files make decisions that conflict.
  Parallel reading is safe; parallel writing needs separated tasks and a strong check.
- **It is not always worth it.** For a lookup of a few calls, the brief and the hand-back cost more
  than doing it in the parent.

## A small experiment

Module 06 lab: run one research task twice, in the parent and through a sub-agent tool. Compare the
parent's input tokens at the end, and the total tokens of both runs.

## Sources

- Claude Code docs, "Sub-agents": own context, returns only the summary.
  <https://code.claude.com/docs/en/sub-agents>
- Anthropic, "Multi-agent coordination patterns" (2026-04-10) and Cognition, "Multi-Agents: What's
  Actually Working" (2026-04-22): where delegation helps and where it collides.
  <https://claude.com/resources/articles/multi-agent-coordination-patterns>,
  <https://cognition.com/blog/multi-agents-working>

## My version

Write it in `private/mental-models/06-sub-agent.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
