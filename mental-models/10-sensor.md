# A sensor (feedback)

**Module:** 10

## The model in one sentence

A sensor is anything that checks the agent's work after it acts and puts the result back in front of
it: tests, type checkers, linters, hooks, CI and review agents.

## Picture

From backend work: CI. The difference is the reader. The output goes to an agent in the middle of a
task, so the message has to say what to do next.

| | Computational | Inferential |
|---|---|---|
| What it is | Code: tests, types, linters | A model's judgment: a review agent |
| Speed and cost | Fast, cheap | Slow, costs tokens |
| Same answer twice | Yes | No |
| Good for | Anything that can be stated exactly | Design, naming, "does this meet the intent" |

## What it predicts

- An agent with a fast test command fixes more of its own mistakes than one without.
- A failure message with the fix in it ("use X instead of Y, see docs/Z") is acted on. A bare failure
  produces guessing.
- A noisy or flaky check teaches the agent to ignore checks, or to change the test.
- A reviewer that shares the author's context shares its blind spots. A fresh one sees more.

## Where it breaks

- **Checks only catch what they look for.** Whether the behaviour is what the user wanted is the
  hardest thing to sense, and no reliable signal exists for it.
- **A model reviewer is lenient to model output** and is not calibrated just because it is separate.
  Seed known defects to find out what it misses.
- **Feedback costs context.** Two thousand lines of test output crowd out the task. Sensors need
  short output on success and focused output on failure.
- **Late feedback is expensive.** A check that runs only in CI arrives after the session ended. Move
  what you can closer to the edit.

## A small experiment

Module 10 lab: plant five known defects in a fixture project. Record which sensor catches each one,
and which get through all of them.

## Sources

- Birgitta Böckeler, "Harness engineering for coding agent users" (2026-04-02): sensors,
  computational and inferential controls. <https://martinfowler.com/articles/harness-engineering.html>
- OpenAI, "Harness engineering" (2026-02-11): lint messages written for the agent.
  <https://openai.com/index/harness-engineering/>
- Anthropic, "Harness design for long-running application development" (2026-03-24): separate the
  agent that does the work from the one that judges it.
  <https://www.anthropic.com/engineering/harness-design-long-running-apps>

## My version

Write it in `private/mental-models/10-sensor.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
