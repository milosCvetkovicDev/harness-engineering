# The agent loop

**Module:** 02

## The model in one sentence

An agent is a `while` loop: call the model, run the tools it asks for, append the results, and repeat
until the model stops asking or a limit is hit.

## Picture

```
messages = [task]
loop:
  reply = model(messages, tools)
  append reply to messages
  if reply asks for no tool -> stop
  for each tool call -> run it (or refuse), append the result
  if step limit reached -> stop
```

From backend work: a job worker with a retry budget. The difference is who chooses the next job:
here the model does, on every pass.

## What it predicts

- The core fits in about a hundred lines. Everything else in a production harness is there for
  limits, cost, safety and recovery.
- Without a step limit, some runs never end. The loop needs a stop condition the model does not
  control.
- An error from a tool is not an exception to crash on. Returned as a result, it becomes information
  the model can correct itself with.

## Where it breaks

- **"The model stopped" is not "the task is done".** The model can stop early, stop at the output
  limit, or decline. The stop reason must be read, not assumed.
- **"Gather context, act, verify" is a description, not code.** There is no phase variable in the
  loop. If you want verification, you have to build it: a check the loop runs, whose failure goes
  back as a message.
- **"Turn" means different things.** In one harness a turn is one model call with its tools; in
  another it is everything until the next user input. Check before you compare step counts.

## A small experiment

Module 02 lab: make a tool return an error on its first call and a value on its second. Predict how
many model calls the run takes, then count them in your log.

## Sources

- Anthropic, "Building effective agents" (2024-12-19): agents as models using tools in a loop,
  and the workflow-versus-agent distinction. <https://www.anthropic.com/engineering/building-effective-agents>
- Thorsten Ball, "How to Build an Agent" (2025-04-15): the loop written out in full.
  <https://ampcode.com/notes/how-to-build-an-agent>
- OpenAI, "Unrolling the Codex agent loop" (2026-01-23): the same loop in a production harness.
  <https://openai.com/index/unrolling-the-codex-agent-loop/>

## My version

Write it in `private/mental-models/02-agent-loop.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
