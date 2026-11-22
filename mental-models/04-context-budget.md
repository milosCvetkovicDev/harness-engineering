# The context budget

**Module:** 04

## The model in one sentence

Attention is a budget: every token you add takes a little from every other token, so the best context
is the smallest one that still holds what the step needs.

## Picture

From backend work: an index that gets slower and less precise as the table grows. Nothing errors;
answers just get worse. This degradation is often called context rot.

```
quality
  |‾‾‾‾‾‾‾\___
  |           ‾‾‾‾\____
  |                    ‾‾‾‾‾   <- well before the hard limit
  +------------------------------ tokens in the window
```

## What it predicts

- Adding a document "just in case" can lower the quality of an answer that did not need it.
- The harness should fetch things when a step needs them and drop them afterwards, not load
  everything at the start.
- Two harnesses with the same model and the same tools can differ only in what they put in the
  window, and get different results.

## Where it breaks

- **It is not a hard budget.** The decline is gradual and depends on the task; there is no number
  below which you are safe. The hard limit is a separate thing.
- **The published measurements are of older models.** Chroma's study is from 2025. Expect the shape
  to hold and the numbers to have moved; measure on the model you use.
- **Smaller is not always better.** Remove the one file the step needed and the agent guesses.

## A small experiment

Module 04 lab: ask one question about a file with only that file in context, then with twenty
unrelated files added. Run each several times and compare the correct answers.

## Sources

- Anthropic, "Effective context engineering for AI agents" (2025-09-29): attention as a budget and
  the main techniques. <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
- Chroma, "Context Rot" (2025-07-14): measurements of quality falling as input grows.
  <https://www.trychroma.com/research/context-rot>

## My version

Write it in `private/mental-models/04-context-budget.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
