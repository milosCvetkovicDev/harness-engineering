# A trace

**Module:** 07

## The model in one sentence

A trace is the full record of one run as a tree of timed steps (model calls, tool calls, sub-agents),
and the run, not the single call, is the unit you look at.

## Picture

From backend work: a distributed trace. One request fans out into spans, and you read the tree to
see where the time and the money went.

```
run  42 s, 96k tokens
 |- model call 1   3 s
 |- tool: search   1 s
 |- model call 2   4 s
 |- tool: sub-agent  28 s
 |    |- model call ...
 |- model call 3   6 s   -> final answer
```

## What it predicts

- Without a trace you can say that a run failed, and not why.
- A run that loops shows up as a cost and duration outlier before anyone reads its output.
- If the loop records every decision (allowed, blocked, verification failed), most bugs can be found
  by reading, without re-running.

## Where it breaks

- **A trace shows what happened, not whether it was right.** It needs a grader or a human label
  attached before it measures anything.
- **Default traces can be empty of content.** Prompts and tool output are often left out by default
  for privacy, which leaves a tree of durations with nothing to read.
- **Traces hold secrets.** File contents and prompts end up in them. In this course they go under
  `.runs/`, which git ignores.

## A small experiment

Module 07 lab: write one JSON line per event from `mini-harness`. Then answer from the file alone:
which step was slowest, which used the most tokens, and where did a failed run first go wrong?

## Sources

- Claude Code docs, "Observability with OpenTelemetry (Agent SDK)": the spans a real harness emits.
  <https://code.claude.com/docs/en/agent-sdk/observability>
- AAIF, "Agent observability: what to track first" (2026-08-11): the run as the unit of observation.
  <https://aaif.io/blog/agent-observability-what-to-track-first>

## My version

Write it in `private/mental-models/07-trace.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
