# Module 02: The agent loop

**Part:** B. Build a harness · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

What is the smallest program that deserves the name "agent", and when does it stop?

## Why it matters

The core of Claude Code is this loop. Once you have written it yourself, every other feature of a
harness is a change to one of its lines: what goes into the request, what happens between a tool
request and its result, when the loop gives up.

## You can...

- write the loop from memory, in about a page of TypeScript;
- name every way the loop can stop, and say what the harness does in each case;
- turn a tool failure into a tool result and explain why that beats throwing;
- explain why the model is passed into the loop as a parameter, and test the loop with a fake one.

## Mental models

- [The agent loop](../../mental-models/02-agent-loop.md)
- Revisit: [a tool call](../../mental-models/01-tool-call.md),
  [propose, decide, commit](../../mental-models/00-propose-decide-commit.md)

## Theory primer

- **Workflow or agent.** The loop is what turns a model call into an agent: the model picks the next
  step, and your code keeps going until there is none.
- **The loop has one real branch:** did the reply ask for a tool? Everything else is bookkeeping.
- **Stop conditions the model controls:** it finished; it declined. **Stop conditions it does not:**
  a step limit, a token or cost budget, a time limit, the user cancelling. A loop needs at least one
  of the second kind.
- **"Done" is a proposal.** The model saying it is finished is not the task being finished. A harness
  can check before it accepts.
- **Errors are information.** A failed tool call goes back as a result. The model reads it and
  corrects itself. This one channel is most of what makes an agent robust.
- **Inject the model.** If the loop takes "something that answers a request" as a parameter, you can
  hand it a scripted fake and test the loop offline, for free, with the same result every time.
- **What this loop does not have yet:** output limits, context management, permissions, recovery.
  Those are modules 03 to 06.

## Read

**Core (about 100 minutes):**

1. Thorsten Ball, "How to Build an Agent" (2025-04-15): the whole loop, built in front of you.
   <https://ampcode.com/notes/how-to-build-an-agent>
2. Anthropic, "Building effective agents" (2024-12-19): re-read the agents section.
   <https://www.anthropic.com/engineering/building-effective-agents>
3. OpenAI, "Unrolling the Codex agent loop" (2026-01-23): the same loop in a production harness.
   <https://openai.com/index/unrolling-the-codex-agent-loop/>
4. Claude Agent SDK docs, "How the agent loop works": turns, limits and what the SDK adds.
   <https://code.claude.com/docs/en/agent-sdk/agent-loop>

**Optional:** see module 02 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** `mini-harness` v0: a loop, one read-only tool, and stop conditions.
- **Predict first**, in `private/modules/02-agent-loop/notes.md`: for a scripted run where the first tool call fails and the second succeeds, how
  many model calls happen? What does the loop return when the step limit is reached mid-task?
- **Outline:** a scripted fake model; the loop with the model injected; one tool; tool errors as
  results; a step limit; then one live run.
- **Stop condition:** the acceptance tests for lab 02 are green (run that file as `labs/README.md` shows), and one
  live run's transcript is in `labs/mini-harness/.runs/`.
- **Stretch:** add a check that runs when the model says it is done, and send the task back once if
  the check fails.

Claude writes the acceptance tests when you start this module. They do not exist yet.

## Self-check

1. Write the loop as pseudo-code, without notes.
2. List the stop conditions. Which does the model control?
3. A tool throws. What does a good harness do, and what does the model see?
4. Why is the model a parameter of the loop and not an import?
5. What is the difference between a workflow and an agent, in terms of this loop?

## Ship (optional)

Draft it in `private/writeups/`.

"An agent in N lines of TypeScript, and the M things it does not do yet."
