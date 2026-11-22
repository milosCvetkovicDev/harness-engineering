# Module 11: Measuring and improving a harness

**Part:** C. Engineer the environment · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

How do you run an improvement loop without fooling yourself?

## Why it matters

This is the module the first course goal points at: understand and measure your own set-up. You will
add one thing and remove one thing, and let numbers decide both. It is also where you form your own
view on the field's open argument about how much a harness is worth.

## You can...

- build a small task set from fixtures that stands in for the work you care about;
- measure a baseline and its rerun noise;
- test one change against that baseline, and one removal;
- write a one-page experiment report that someone else could repeat;
- argue both sides of "harnesses shrink as models improve", with sources.

## Mental models

- [The improvement loop](../../mental-models/11-improvement-loop.md)
- Revisit: [a score is an estimate](../../mental-models/07-score-is-an-estimate.md),
  [a guide](../../mental-models/09-guide.md), [a sensor](../../mental-models/10-sensor.md)

## Theory primer

- **The loop:** read traces, name the failure, change one thing, measure again, keep or revert.
- **Baseline and noise first.** Without them, every result is a story.
- **One change at a time**, compared task by task on the same tasks.
- **Keep tasks aside.** A change tuned on a fixed set fits that set. Hold some tasks back and look at
  them only at the end.
- **Removal is an experiment too.** A component encodes an assumption about what the model cannot do.
  Take it out and see whether anything gets worse.
- **Cost is a result.** A change that adds two points and triples the tokens may be a bad trade.
- **The evidence is contested.** Read the vendor reports and the rerun study side by side, and decide
  what you would need to see.

## Read

**Core (about 95 minutes):**

1. LangChain, "Improving Deep Agents with harness engineering" (2026-02-17): a method you can copy,
   and a vendor's own number. <https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering>
2. Liu and Han, "What Does a Harness Buy? Tokens, Mostly" (arXiv 2610.04433, 2026-10-03, revised
   2026-11-18): the counterweight. <https://arxiv.org/abs/2610.04433>
3. Anthropic, "Harness design for long-running application development" (2026-03-24): what was
   removed as the model improved, and what it cost.
   <https://www.anthropic.com/engineering/harness-design-long-running-apps>
4. Mitchell Hashimoto, "My AI Adoption Journey" (2026-02-05): the habit of fixing the harness after
   each mistake. <https://mitchellh.com/writing/my-ai-adoption-journey>
5. Addy Osmani, "Agent Harness Engineering" (2026-04-19): the ratchet, and the case that harnesses
   move and do not shrink. <https://addyosmani.com/blog/agent-harness-engineering/>

**Optional:** see module 11 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** one experiment on your own set-up, from prediction to decision.
- **Predict first**, in `private/modules/11-measuring-and-improving/notes.md`: how large is the rerun noise? Will the addition help by more than that? Will the
  removal hurt by more than that?
- **Outline:** ten to twenty fixture tasks; the baseline twice; one added component; one removed
  component; a report.
- **Stop condition:** a one-page report in `private/modules/11-measuring-and-improving/report.md` with the question, the method, counts for every
  condition, the noise, and a decision for the addition and for the removal.
- **Stretch:** repeat the baseline on a different model and see which of your conclusions survive.

Tasks are fixtures from this repository, except those that exercise a rule from your set-up. No client
code or data. Those tasks, and copies and variants of the set-up, live in `labs/private/experiments/`.
The runs start in a copy outside this repository; how the runs are kept out of `~/.claude` is checked against the
live docs before the first run.

## Self-check

1. What are the steps of the improvement loop?
2. Why measure the unchanged set-up twice before anything else?
3. Your change improves the score on the tasks you tuned it on. What else do you check?
4. Give one kind of harness component that expires as models improve, and one that does not.
5. What is the strongest evidence that harness work moves results? What is the strongest evidence
   against? What do both leave open?
6. A change adds two points and doubles the cost. How do you decide?

## Ship (optional)

Draft it in `private/writeups/`.

"I removed one thing from an agent set-up and measured what happened." The post never holds a part or
a result from your own set-up: repeat the experiment on an invented set-up and write about that one.
