# A tool call

**Module:** 01 (deepened in 03)

## The model in one sentence

A tool call is the model asking your code to run a function: the model writes a structured request,
your code runs it, and the result goes back as the next message.

## Picture

```
you   -> model : messages + tool definitions
model -> you   : stop_reason "tool_use", block { id, name, input }
you            : run the function yourself (or refuse)
you   -> model : everything so far + tool_result { tool_use_id, content }
model -> you   : the answer, or another tool call
```

From backend work: a remote procedure call where the caller is a model. Your harness is the server
that receives the call and decides what to do with it.

## What it predicts

- Nothing happens in the world until your code acts. Between the request and the execution there is
  a gap, and that gap is where permissions, logging and sandboxes attach.
- A tool call costs at least two model calls: one to ask, one to read the result.
- If your code does not send a result for a tool call, the conversation cannot continue correctly.

## Where it breaks

- **The caller is not a program.** It can send a wrong argument, call a tool that makes no sense, or
  call the right tool for a wrong reason. The schema is a contract only one side is sure to keep.
- **Some tools run on the provider's side.** For server tools such as web search, the provider runs
  the loop and you see only the outcome. "The model never runs anything" is about client tools.
- **A tool result is input from the outside.** A web page or a file returned by a tool can contain
  instructions. See [prompt injection](05-prompt-injection.md).

## A small experiment

Module 01 lab, step 3: do one tool round trip by hand with `curl`. You play the harness: read the
`tool_use` block, invent the result, send it back. Then send an error as the result and predict what
the model does.

## Sources

- Anthropic docs, "How tool use works" and "Handle tool calls": the request and result blocks, and
  who runs what. <https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works>,
  <https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls>
- Simon Willison, "How coding agents work" (guide started 2026-02-23): a tool is a function the
  harness makes available to the model.
  <https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/>

## My version

Write it in `private/mental-models/01-tool-call.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
