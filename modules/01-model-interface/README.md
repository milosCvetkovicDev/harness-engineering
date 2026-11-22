# Module 01: The model interface

**Part:** A. Foundations · **Time:** about 4 hours · **Status:** ready

## Question

What goes over the wire when a model is called, and what does the model remember?

## Why it matters

Every feature of a harness is a way of building one request or handling one response. An instruction
file is text in the request. A tool is a JSON schema in the request. A permission prompt lives in the
gap between the model asking for a tool and your code answering. Once you can read the JSON, nothing
in Claude Code is magic, and the companion book's examples (written against another vendor's API)
become easy to translate.

## You can...

- write a request to the Messages API by hand and name every top-level field;
- show with two requests that the model keeps nothing between calls;
- do a tool round trip by hand: read the `tool_use` block, send the `tool_result`;
- read `usage` and say where the tokens went, including cached ones;
- list the stop reasons and say what a harness must do for each.

## Mental models

- [The model as a stateless function](../../mental-models/01-stateless-function.md)
- [A token](../../mental-models/01-token.md)
- [The context window](../../mental-models/01-context-window.md)
- [A tool call](../../mental-models/01-tool-call.md)
- [The prompt cache](../../mental-models/01-prompt-cache.md)

## Theory primer

**1. One endpoint, one shape.** A request carries the model name, a limit on output tokens, an
optional system prompt, optional tool definitions and the list of messages. The response carries a
list of content blocks, a stop reason and a usage report.

**2. Messages are lists of typed blocks.** A message has a role, `user` or `assistant`, and content.
Content is a list of blocks, each with a `type`: text, thinking, a tool request, a tool result.
"The reply" is not a string; it is whatever blocks came back.

**3. Nothing is remembered.** Each call starts from zero. A conversation exists only because your
code keeps the list and sends all of it again. Send the assistant's content back exactly as you
received it, every block, unedited: on current models the thinking blocks are tied to the
conversation that produced them, and a history that was altered can be rejected.

**4. Tokens are the unit.** `usage` reports input and output tokens for each call. Input includes the
system prompt and the tool definitions, on every call. You can ask the API to count a request's
tokens without running it.

**5. Tool use on the wire.** You send a definition: a name, a description, a JSON schema for the
input. If the model wants the tool, the response stops with the reason `tool_use` and contains a
block with an `id`, the tool's `name` and an `input` object. Nothing has run. Your code runs the
function, or decides not to, and sends a new request: everything so far, plus a `user` message
holding a `tool_result` block that refers to that `id`. A failure is sent the same way, marked as an
error.

**6. Why the model stopped.** The stop reason tells the harness what to do next: the model finished;
it wants a tool; it ran out of output tokens; it paused a long server-side turn; it declined. A
harness that treats every stop as "finished" has a bug. The full list is in the API reference.

**7. Thinking and effort.** Current models reason before they answer, and that reasoning is output:
billed, and counted toward the window. A request setting controls how much effort the model spends.
The lab code sets it explicitly so that runs are comparable.

**8. The prompt cache.** If the beginning of a request is identical to an earlier one, that part can
be processed at a lower price. You mark where the stable part ends. `usage` reports tokens written
to the cache and tokens read from it.

**9. Outputs vary.** The same request can give different replies. On the current API version the
sampling settings that older tutorials use to reduce variation are not available (the API reference
bundled with Claude Code, read on 2026-11-21). The consequence for this course: one run is one
sample, and anything you want to claim needs several.

## Read

**Core (about 90 minutes):**

1. Anthropic docs, "How tool use works", then "Handle tool calls": the loop and the exact JSON.
   <https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works>,
   <https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls>
2. Anthropic docs, "Context windows": what counts toward the window and how usage is reported.
   <https://platform.claude.com/docs/en/build-with-claude/context-windows>
3. Anthropic docs, "Prompt caching": read the concepts; skim the price table.
   <https://platform.claude.com/docs/en/build-with-claude/prompt-caching>
4. Simon Willison, "How coding agents work" (guide started 2026-02-23): the same ground from a
   practitioner, vendor-neutral.
   <https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/>

**Optional background on the model itself:** the fundamentals path in module 01 of
[the reading list](../../resources/reading-list.md): what a transformer and attention do, and why a
cache needs an identical prefix. It is about three hours, one of them video; spread it over the
first weeks.

## Lab

The lab is [labs/01-wire/](../../labs/01-wire/README.md). There is no acceptance test: it is an
exploration, and the predictions are the point.

- **Goal:** one tool round trip done by hand with `curl`, then the same round trip in TypeScript
  with the SDK.
- **Predict first:** six predictions, one per step, in `private/modules/01-model-interface/notes.md`,
  your copy of [the template](notes.md). Write each before you
  run its step.
- **Outline:** (1) a plain message; (2) the same question with and without the history; (3) a tool
  round trip where you play the harness; (4) an error as the tool result; (5) token counts across a
  conversation; (6) the cache, hit and missed; then (7) `wire.ts`.
- **Stop condition:** `npm run wire` in `labs/` exits 0 and prints the final answer with a usage line
  per call; all six predictions in your private notes have a result next to them.
- **Stretch:** add `"stream": true` to the plain request and read the events as they arrive. Which
  event carries the stop reason?

## Self-check

1. Name the top-level fields of a request and of a response.
2. You ask a follow-up question and the model has "forgotten" the earlier answer. What did the
   harness do wrong?
3. The response has the stop reason `tool_use`. What exactly must the next request contain?
4. Who runs a tool? What can the harness do between the request and the result?
5. A tool failed. What do you send back, and why not throw an exception and stop?
6. Your cache hit rate dropped to zero after you added the current time to the system prompt. Why?
7. Why is one successful run not evidence that a prompt "works"?

## Ship (optional)

Draft it in `private/writeups/`.

"A tool call is two HTTP requests": show the four JSON documents of one round trip, with a sentence
on each. Remove your key and anything private before you publish.
