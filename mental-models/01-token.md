# A token

**Module:** 01

## The model in one sentence

A token is the unit the model reads and writes, a piece of a word, and every limit and every price is
counted in tokens, not characters or requests.

## Picture

From backend work: tokens are to a model call what bytes are to a network request. You are billed
and limited by them, and you cannot tell the count by looking at the text.

```
request  = system + tool definitions + all messages   -> input tokens
response = thinking + text + tool calls               -> output tokens
```

## What it predicts

- Two texts of the same length in characters can have different token counts: code, JSON and
  non-English text usually take more tokens than plain English.
- Tool definitions cost input tokens on every call, even when no tool is used.
- An agent run is dominated by input tokens, because each step resends what came before.

## Where it breaks

- **A token is not a word**, and the split differs between models. A count measured on one model
  does not transfer to another. Always count with the model you will call.
- **Not all tokens cost the same.** Output is priced higher than input, and cached input is priced
  lower. "Tokens used" is not yet a cost; the usage fields must be read separately.
- **Thinking is output.** Reasoning the model does before answering is billed as output and counts
  toward the window, even when you never display it.

## A small experiment

Module 01 lab, step 5: before sending a request, ask the API to count its tokens. Guess the number
first. Then add one tool definition and count again.

## Sources

- Anthropic docs, glossary and "Context windows": what a token is, how usage is reported, and that
  counts differ by model. <https://platform.claude.com/docs/en/about-claude/glossary>,
  <https://platform.claude.com/docs/en/build-with-claude/context-windows>
- Yichao "Peak" Ji, Manus, "Context Engineering for AI Agents" (2025-07-18): agent workloads are
  input-heavy (the post reports a ratio; treat it as one vendor's number).
  <https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus>

## My version

Write it in `private/mental-models/01-token.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
