# A guide (feedforward)

**Module:** 09

## The model in one sentence

A guide is anything that steers the agent before it acts: instruction files, skills, examples and
documentation in the repository, written as a map and not as a manual.

## Picture

From backend work: the README, the coding conventions and the service template a new team member
gets on day one. They raise the odds of a good first attempt and guarantee nothing.

```
guides (before) --->  [ agent acts ]  ---> sensors (after)
   instruction file                          tests, linters, review
   skills, examples
```

## What it predicts

- A short instruction file that points to deeper documents works better than a long one that tries
  to say everything.
- Knowledge that lives in chat, in a wiki or in someone's head does not exist for the agent. Moving
  it into the repository is harness work.
- A guide without a matching [sensor](10-sensor.md) is a rule nobody checks.

## Where it breaks

- **More guidance can make things worse.** One study of repository context files found that they
  usually did not raise task success and raised cost. Every line must earn its place with evidence.
- **Guides are advisory.** A model usually follows them. For "always" and "never", use a hook or a
  permission rule.
- **A map of a legible repository adds little.** The agent reads the code too. A guide is worth what
  it holds that the code does not: commands, conventions, decisions and their reasons.
- **Guides go stale silently.** Nothing fails when a line stops being true.

## A small experiment

Module 09 lab: pick one line of your instruction file. Run the same five tasks with and without it,
several times each. Predict the difference before you count.

## Sources

- Birgitta Böckeler, "Harness engineering for coding agent users" (2026-04-02): guides and sensors.
  <https://martinfowler.com/articles/harness-engineering.html>
- OpenAI, "Harness engineering: leveraging Codex in an agent-first world" (2026-02-11): a map, not a
  manual; the repository as the system of record. <https://openai.com/index/harness-engineering/>
- Gloaguen et al., "Evaluating AGENTS.md" (arXiv 2602.11988, 2026-02-12): context files measured.
  <https://arxiv.org/abs/2602.11988>
- Claude Code docs, "Best practices". <https://code.claude.com/docs/en/best-practices>

## My version

Write it in `private/mental-models/09-guide.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
