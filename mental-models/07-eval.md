# An eval

**Module:** 07

## The model in one sentence

An eval is a set of tasks, each with a grader, run several times: a test suite for something that
does not give the same answer twice.

## Picture

| Word | Meaning |
|---|---|
| Task | One problem with a defined start and a definition of success |
| Trial | One attempt at a task. Outputs vary, so one task gets several trials |
| Grader | What decides pass or fail: code, a model, or a person |
| Transcript | The record of a trial: what the agent did |
| Outcome | The state of the world at the end: what the agent achieved |

From backend work: an integration test suite, with two differences. A test is run many times and you
record a rate, and the "assert" may itself be fallible.

## What it predicts

- A task that passes once has told you little. Three passes out of three is a different fact from
  one out of one.
- Tasks taken from real failures find more than tasks you invent, and twenty to fifty are enough to
  start.
- Grading the end state is more robust than grading the path: there are many valid ways to solve a
  task.

## Where it breaks

- **Graders have bugs.** A task at 0% is as likely to be a broken grader as a hard task. Read
  transcripts before you trust a number.
- **Grading only the outcome rewards shortcuts.** An agent can reach the passing state by editing
  the test. Some checks on the path are needed.
- **A model as judge is a second model to validate.** It is trustworthy only after it has been
  compared with human labels on the same items.
- **A saturated eval stops informing.** At 100% it guards against regressions and says nothing about
  improvement.

## A small experiment

Module 07 lab: write five tasks for `mini-harness` with code graders. Run each five times. Before you
look, predict which task has the lowest pass rate, and why.

## Sources

- Anthropic, "Demystifying evals for AI agents" (2026-01-09): the vocabulary and how to start a
  suite. <https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents>
- Hamel Husain and Shreya Shankar, "AI Evals: Everything You Need to Know" (2026-09-18): error
  analysis first, and validating a model judge. <https://hamel.dev/blog/posts/evals-faq/>

## My version

Write it in `private/mental-models/07-eval.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
