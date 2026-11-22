# The prompt cache

**Module:** 01 (used in 04)

## The model in one sentence

The prompt cache makes an unchanged beginning of a request cheaper and faster to process, and it
matches from the first byte, exactly.

## Picture

```
request A:  [system][tools][msg1][msg2]            <- processed, then stored
request B:  [system][tools][msg1][msg2][msg3]      <- A's part is read from the cache
request C:  [system*][tools][msg1][msg2][msg3]     <- one change at the start: nothing matches
```

From web work: it resembles an HTTP cache keyed on a prefix, not on a URL. It is not like a CDN with
many independent entries: there is one chain, and a change early in it invalidates all that follows.

## What it predicts

- Put stable material first (system prompt, tool definitions) and changing material last.
- A timestamp, a random ID or a reordered tool list near the top makes every request a miss.
- Appending to a conversation keeps the cache; editing an earlier message loses it from that point.

## Where it breaks

- **It is not memory and not a semantic cache.** Two requests that mean the same but differ by a
  character do not match. And a hit changes the price of those tokens, not whether they fill the
  window.
- **Entries expire**, and writing an entry has its own price. For a request made once, caching can
  cost more than it saves.
- **A short prefix is not cached at all.** There is a minimum size, which depends on the model.

The numbers (prices, lifetimes, minimum sizes) change; read them in the docs, not here.

## A small experiment

Module 01 lab, step 6: send the same long request twice and read the cache fields in `usage`. Then
change one character at the start of the system prompt and send it again. Predict all three results.

## Sources

- Anthropic docs, "Prompt caching": the rules and the numbers.
  <https://platform.claude.com/docs/en/build-with-claude/prompt-caching>
- Claude Code docs, "How Claude Code uses prompt caching": a real harness's request layout and what
  breaks its cache. <https://code.claude.com/docs/en/prompt-caching>

## My version

Write it in `private/mental-models/01-prompt-cache.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
