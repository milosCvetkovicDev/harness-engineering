# The model as a stateless function

**Module:** 01

## The model in one sentence

A model call is a pure-looking function from the whole conversation so far to the next message, and
it remembers nothing between calls.

## Picture

```
call 1:  f([user1])                              -> assistant1
call 2:  f([user1, assistant1, user2])           -> assistant2
call 3:  f([user1, assistant1, user2, assistant2, user3]) -> assistant3
```

From backend work: a stateless HTTP handler with no session store. The client sends everything the
handler needs on every request. Here the "client" is your harness.

## What it predicts

- If you leave an earlier message out of the request, the model does not know it happened.
- A long session costs more per call than a short one, because each call resends all of it.
- Anything the agent "remembers" across sessions is something a harness wrote to disk and loaded back.

## Where it breaks

- **Stateless describes the model, not always the API.** Some APIs keep conversation state on the
  server for you. The Claude Messages API does not; you send the history.
- **Not deterministic.** A pure function returns the same output for the same input. A model does
  not, so one run is one sample, not the answer.
- **Caching looks like memory and is not.** The prompt cache makes a repeated beginning cheaper. It
  changes cost and speed, never what the model knows. See [prompt cache](01-prompt-cache.md).

## A small experiment

Module 01 lab, step 2: tell the model a fact in one request, then send a second request without the
first exchange and ask for the fact. Predict the reply before you run it.

## Sources

- Simon Willison, "How coding agents work" (Agentic Engineering Patterns guide, started 2026-02-23):
  models start from a blank slate on every call, and a chat is a replayed transcript.
  <https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/>
- Thorsten Ball, "How to Build an Agent" (2025-04-15): the conversation list you keep is the only
  memory. <https://ampcode.com/notes/how-to-build-an-agent>

## My version

Write it in `private/mental-models/01-stateless-function.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
