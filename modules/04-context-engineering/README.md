# Module 04: Context engineering

**Part:** B. Build a harness · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

What should be in the window at each step, and what happens as it fills?

## Why it matters

A long session in Claude Code gets worse before it hits any limit, and then it compacts and forgets
something you cared about. Both are context engineering at work. Building the mechanisms yourself is
the quickest way to understand why instruction files, hand-off notes and fresh sessions
help.

## You can...

- account for every token in a request: system, tools, history, tool results;
- implement compaction and say what it loses;
- give an agent a notes file and show that it survives a restart;
- lay out a request so that the prompt cache keeps hitting, and prove it from `usage`;
- explain context rot and show a small case of it.

## Mental models

- [The context budget](../../mental-models/04-context-budget.md)
- [Compaction](../../mental-models/04-compaction.md)
- [Memory](../../mental-models/04-memory.md)
- Revisit: [the context window](../../mental-models/01-context-window.md),
  [the prompt cache](../../mental-models/01-prompt-cache.md)

## Theory primer

- **Four moves:** write information outside the window, select what comes in, compress what is
  there, isolate work in a separate window.
- **Context rot.** Quality falls as the window fills, gradually, long before the limit.
- **Just in time, not just in case.** Fetch what a step needs when it needs it.
- **Compaction, clearing, memory.** Three different tools: summarise everything, drop stale items,
  move information to a file.
- **Cache-friendly layout.** Stable material first, append only, nothing volatile near the top.
  Editing history has a second cost on current models, where reasoning blocks are tied to the
  conversation that produced them. Read the docs on this before you write the compaction step.
- **Memory is files.** An instruction file, a notes file and a progress file are all the agent has
  across sessions, and each loaded line is paid for on every call.

## Read

**Core (about 95 minutes):**

1. Anthropic, "Effective context engineering for AI agents" (2025-09-29).
   <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
2. Chroma, "Context Rot" (2025-07-14). The models tested are from 2025; read it for the shape of the
   effect. <https://www.trychroma.com/research/context-rot>
3. Yichao "Peak" Ji, Manus, "Context Engineering for AI Agents: Lessons from Building Manus"
   (2025-07-18): designing around the cache, and the file system as context.
   <https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus>
4. Claude Code docs, "How Claude Code uses prompt caching" and "Explore the context window".
   <https://code.claude.com/docs/en/prompt-caching>, <https://code.claude.com/docs/en/context-window>

**Optional:** see module 04 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** `mini-harness` manages its own context.
- **Predict first**, in `private/modules/04-context-engineering/notes.md`: after a forced compaction, does the agent still obey a constraint stated in the
  first message? By how much do input tokens per step fall?
- **Outline:** per-step token accounting; a compaction step with a threshold; a notes file the agent
  reads and writes (under `labs/mini-harness/.runs/`); a request layout that keeps the cache; measurements before and after.
- **Stop condition:** the acceptance tests for lab 04 are green, and
  `private/modules/04-context-engineering/notes.md` has a table of input
  tokens per step before and after, plus one `usage` line that shows a cache read.
- **Stretch:** show context rot on your own harness: one question, asked with and without twenty
  unrelated files in the window, several runs each.

## Self-check

1. Name the four moves of context engineering, with one example of each.
2. What is context rot, and how does it differ from hitting the limit?
3. What is the difference between compaction, clearing and memory?
4. Why does adding a timestamp to the system prompt make every request more expensive?
5. Where should a constraint live if it has to survive a compaction?

## Ship (optional)

Draft it in `private/writeups/`.

"What my agent forgot after compaction, and where I put it so it would not."
