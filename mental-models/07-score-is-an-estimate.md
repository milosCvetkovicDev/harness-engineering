# A score is an estimate

**Module:** 07 (used throughout 11)

## The model in one sentence

A pass rate is a measurement with error bars, so a difference between two harnesses means something
only if it is larger than the difference between two runs of the same harness.

## Picture

From backend work: latency. Nobody compares two builds on one request each. You take many samples,
look at the spread, and ask whether the gap exceeds the noise.

```
variant A:  |----o----|          62% +/- 9
variant B:       |----o----|     68% +/- 9      <- overlapping: not shown to be different
```

## What it predicts

- With twenty tasks, a difference of a few points is noise.
- Running the unchanged harness twice gives two different scores. That gap is your noise floor;
  measure it first.
- Comparing the two variants task by task on the same tasks detects a real difference with fewer
  runs than comparing two averages.
- "Passes most of the time" hides a lot: an agent that passes a task 75% of the time passes it three
  times in a row less than half the time.

## Where it breaks

- **The formulas assume independent tasks.** Twenty tasks that are variations of one problem behave
  like far fewer.
- **The environment is part of the measurement.** Time limits, machine load and container resources
  move scores. Hold them fixed or report them.
- **A significant difference on your tasks is not a general result.** A change tuned on a fixed set
  fits that set. Keep some tasks aside that you never tune on.

## A small experiment

Module 07 lab: run the same harness on the same tasks twice and record the difference. Any change
you make later must beat that number to count.

## Sources

- Anthropic, "A statistical approach to model evaluations" (2024-11-19): error bars and paired
  comparison. <https://www.anthropic.com/research/statistical-approach-to-model-evals>
- Anthropic, "Quantifying infrastructure noise in agentic coding evals" (2026-02-05): how far the
  environment alone moves a score. <https://www.anthropic.com/engineering/infrastructure-noise>
- Liu and Han, "What Does a Harness Buy? Tokens, Mostly" (arXiv 2610.04433, 2026-10-03): harness
  gaps the size of rerun noise. <https://arxiv.org/abs/2610.04433>

## My version

Write it in `private/mental-models/07-score-is-an-estimate.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
