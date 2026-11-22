# The context window

**Module:** 01 (deepened in 04)

## The model in one sentence

The context window is everything the model can see in one call, it has a fixed maximum size, and the
harness decides what goes into it.

## Picture

```
+---------------- one request ----------------+
| system prompt                               |
| tool definitions                            |
| message 1 ... message n (incl. tool results)|
| (room left for the reply and its thinking)  |
+---------------------------------------------+
```

The common analogy: the model is a CPU and the window is its RAM, with the harness as the operating
system that decides what to load. It holds for "finite" and "someone must manage it".

## What it predicts

- If a fact is not in the window, the model cannot use it, however obvious it is to you.
- Things you never see in the terminal still take space: the system prompt, tool definitions, tool
  results, thinking.
- A harness that keeps appending will hit the limit; something must then be dropped or summarised.

## Where it breaks

- **RAM is equally reliable when full; a window is not.** Recall gets worse as the window fills, well
  before the hard limit. See [context budget](04-context-budget.md).
- **Nothing is forgotten by the model.** When something "falls out", the harness removed it or did
  not resend it.

## A small experiment

Module 01 lab, step 5: read the `usage` object after each of three calls in one conversation. Predict
how input tokens change from call to call before you look.

## Sources

- Anthropic docs, "Context windows": the window as the model's working memory, and what counts
  toward it. <https://platform.claude.com/docs/en/build-with-claude/context-windows>
- Claude Code docs, "Explore the context window": what a real harness loads that you never see.
  <https://code.claude.com/docs/en/context-window>
- The CPU and RAM analogy is credited to Andrej Karpathy by LangChain's context engineering post
  (2025-07-02); our research did not find the original.
  <https://www.langchain.com/blog/context-engineering-for-agents>

## My version

Write it in `private/mental-models/01-context-window.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
