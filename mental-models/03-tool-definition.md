# A tool definition

**Module:** 03

## The model in one sentence

A tool definition is prompt text: the model reads the name, the description and the schema the way a
new colleague reads documentation, and has nothing else to go on.

## Picture

From backend work: you are designing an API whose only client never reads the source, never asks a
question, and pays for every word of the docs on every call.

```
name          -> what the model will reach for
description   -> when to use it, when not, what comes back
input schema  -> what a valid call looks like
result        -> the next thing the model reads; keep it short and useful
```

## What it predicts

- Rewording a description changes which tool the model picks, with no change to the code.
- Ten overlapping tools perform worse than three distinct ones, and cost more tokens on every call.
- A tool that returns 5,000 lines hurts the next step, even when the answer is in there.
- An error message that says what to do next gets a corrected call; a bare "failed" gets a retry of
  the same call.

## Where it breaks

- **A good description does not make a call safe.** The model can still send a valid call you did not
  want. Safety is the harness's job, not the description's.
- **The human-API analogy underrates output.** For a person, a verbose response is harmless. For a
  model, it takes window space and attention from everything else.
- **A protocol does not reduce the cost.** Tools that arrive through MCP still land in the prompt as
  definitions, unless the harness loads them on demand.

## A small experiment

Module 03 lab: run the same ten tasks with two descriptions of one tool, a vague one and a precise
one. Predict the pass counts first, then compare.

## Sources

- Anthropic, "Writing effective tools for agents" (2025-09-11): describe a tool as you would to a new
  hire, and evaluate tool changes. <https://www.anthropic.com/engineering/writing-tools-for-agents>
- Anthropic docs, "Define tools": definitions become part of the prompt.
  <https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools>
- Yang et al., the SWE-agent paper (2024-05-06): the agent-computer interface, and how tool shape
  moves results. <https://arxiv.org/abs/2405.15793>

## My version

Write it in `private/mental-models/03-tool-definition.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
