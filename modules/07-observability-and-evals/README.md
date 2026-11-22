# Module 07: Observability and evals

**Part:** B. Build a harness · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

How do you know the harness got better and not just different?

## Why it matters

Until now every change to `mini-harness` was judged by a few runs and a feeling. That is also how
most people tune their coding-agent set-up. This module replaces the feeling with a trace you can
read and a number with error bars, and it is the foundation for all of Part C.

## You can...

- record a run as a trace and answer questions about it from the file alone;
- write an eval: tasks from fixtures, code graders, several trials per task;
- report a pass rate with its uncertainty, as counts;
- compare two variants of the harness and say whether the difference is real;
- explain why a benchmark claim needs the harness, the environment and the noise disclosed.

## Mental models

- [A trace](../../mental-models/07-trace.md)
- [An eval](../../mental-models/07-eval.md)
- [A score is an estimate](../../mental-models/07-score-is-an-estimate.md)

## Theory primer

- **A trace is a tree of timed steps.** The run is the unit: model calls, tool calls and sub-agents
  are its branches.
- **Vocabulary:** task, trial, grader, transcript, outcome.
- **Three kinds of grader:** code (cheap, exact, narrow), a model (flexible, needs validating against
  human labels), a person (the reference, slow).
- **Two kinds of suite:** capability evals start with a low pass rate and give you something to
  climb; regression evals sit near the top and tell you when something broke.
- **Passing once and passing every time are different numbers.** A task that passes three times in
  four passes three times in a row less than half the time.
- **Noise first.** Two runs of the same harness differ. A change must beat that difference.
- **Start from failures.** Read traces, name what went wrong, count the categories, and only then
  write tasks.
- **A leaderboard number is model times harness times environment.** Without all three it is not
  comparable.

## Read

**Core (about 100 minutes):**

1. Anthropic, "Demystifying evals for AI agents" (2026-01-09).
   <https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents>
2. Hamel Husain and Shreya Shankar, "AI Evals: Everything You Need to Know" (2026-09-18): read the
   parts on error analysis and on validating a model judge. <https://hamel.dev/blog/posts/evals-faq/>
3. Anthropic, "Quantifying infrastructure noise in agentic coding evals" (2026-02-05), with "A
   statistical approach to model evaluations" (2024-11-19).
   <https://www.anthropic.com/engineering/infrastructure-noise>,
   <https://www.anthropic.com/research/statistical-approach-to-model-evals>
4. Claude Agent SDK docs, "Observability with OpenTelemetry", with Steve Kearns, "Agent
   observability: what to track first" (2026-08-11): a run as a tree of spans, and what to log
   first. <https://code.claude.com/docs/en/agent-sdk/observability>,
   <https://aaif.io/blog/agent-observability-what-to-track-first>

**Optional:** see module 07 in [the reading list](../../resources/reading-list.md). The two sources
that argue over how much a harness moves a score (a vendor's report and an independent rerun study)
are core in module 11; reading them now shows what this module's tools are for.

## Lab

- **Goal:** `mini-harness` writes a trace, and an eval runner compares two variants of it.
- **Predict first**, in `private/modules/07-observability-and-evals/notes.md`: which of your tasks will have the lowest pass rate? How far apart will two runs
  of the unchanged harness be?
- **Outline:** one JSON line per event; five to ten fixture tasks with code graders; several trials
  per task; a report with counts and intervals; a rerun of the baseline; one variant.
- **Stop condition:** `npm run eval` (a script this lab adds) prints pass rates with intervals for the baseline, its rerun and
  one variant, and `private/modules/07-observability-and-evals/notes.md` records whether the variant is kept, with the reason.
- **Stretch:** add a model grader for one task and check it against your own labels.

## Self-check

1. Define task, trial, grader, transcript and outcome.
2. When would you use a code grader, and when a model grader? What must you do before trusting the
   second?
3. A variant passes 14 of twenty tasks and the baseline 12, one trial each. What do you conclude?
4. Why run the unchanged harness twice before testing a change?
5. What is the difference between grading the outcome and grading the path? Name one risk of each.
6. A vendor reports that their harness gained 14 points on a benchmark. Which three things do you
   ask for?

## Ship (optional)

Draft it in `private/writeups/`.

Rewrite your module 00 post, "what a harness is", now that you have built and measured one.
