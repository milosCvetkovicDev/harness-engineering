# The improvement loop

**Module:** 11

## The model in one sentence

A harness improves the way a product does: observe real failures, change one thing, measure again,
and keep the change only if the numbers say so.

## Picture

```
read traces -> name the failure -> change ONE thing -> re-run the eval -> keep or revert
     ^                                                                        |
     +------------------------------------------------------------------------+
```

Two forces act on a harness, and both are right:

- **The ratchet.** Each repeated mistake becomes a permanent fix: a line in the instruction file, a
  hook, a test.
- **Expiry.** Each component encodes an assumption about what the model cannot do. Models change, so
  some components stop paying for themselves and should be removed.

## What it predicts

- A harness that only grows gets slower, costlier and more contradictory.
- Removing a component and measuring is as informative as adding one.
- Most changes that feel like improvements do not survive a rerun.

## Where it breaks

- **The ratchet only turns one way.** Without pruning it becomes the long instruction file that the
  [guide](09-guide.md) card warns about.
- **Expiry does not apply to everything.** A workaround for a model weakness expires. Project
  knowledge (commands, conventions, decisions) does not.
- **"Harnesses shrink as models improve" is disputed.** One position is that scaffolding becomes
  unnecessary; another is that it moves to new problems. Both are opinions from practice.
- **How much a harness is worth is disputed too.** Vendors report double-digit gains on a benchmark
  with the model held fixed. A study that reran harnesses found gaps of a few points, about the size
  of rerun noise. Read the claims with [a score is an estimate](07-score-is-an-estimate.md) in hand.

## A small experiment

Module 11 lab: measure a baseline and its rerun noise. Add one component and measure. Remove a
different, older component and measure. Write down which of the two decisions the numbers support.

## Sources

- Mitchell Hashimoto, "My AI Adoption Journey" (2026-02-05): engineer a fix each time the agent
  makes a mistake. <https://mitchellh.com/writing/my-ai-adoption-journey>
- Anthropic, "Harness design for long-running application development" (2026-03-24): components as
  assumptions that expire. <https://www.anthropic.com/engineering/harness-design-long-running-apps>
- Addy Osmani, "Agent Harness Engineering" (2026-04-19): the ratchet, and the view that harnesses
  move and do not shrink. <https://addyosmani.com/blog/agent-harness-engineering/>
- LangChain, "Improving Deep Agents with harness engineering" (2026-02-17) and Liu and Han (arXiv
  2610.04433): the two sides of the evidence.
  <https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering>,
  <https://arxiv.org/abs/2610.04433>

## My version

Write it in `private/mental-models/11-improvement-loop.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
