# Module 10: Sensors, the feedback side

**Part:** C. Engineer the environment · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

Which checks can be computed, which need judgment, and how does feedback reach the agent?

## Why it matters

A guide hopes; a sensor checks. A set-up may have tests, type checks, hooks, CI and review agents. This
module measures what each of them catches, so that you know which checks carry weight, which only
make noise, and which defects pass through everything.

## You can...

- sort a set of checks into computational and inferential, and say what each kind is good for;
- write a hook that feeds a failure back to the agent while it is still working;
- rewrite a check's message so that an agent can act on it;
- measure a sensor by seeding defects and counting what it catches;
- explain why the reviewer should not share the author's context.

## Mental models

- [A sensor](../../mental-models/10-sensor.md)
- Revisit: [a hook](../../mental-models/05-hook.md), [an eval](../../mental-models/07-eval.md)

## Theory primer

- **Sensors act after the agent does** and put the result back in front of it.
- **Computational or inferential.** Code checks are fast, cheap and repeatable. Model judgments are
  slow, costly and variable, and reach things code cannot.
- **Timing.** The sooner a check runs after the edit, the cheaper the fix. A check that runs only in
  CI arrives after the session ended.
- **The message is for the agent.** Say what is wrong and what to do; keep success silent and failure
  short.
- **Back-pressure.** Tests and types push back on bad output. A flaky or noisy check pushes in
  random directions.
- **Maker is not checker.** A fresh reviewer has not seen the author's reasoning. It is still lenient
  toward model output, so measure it.
- **Seeded defects measure a sensor.** Plant known problems and count what is caught.

## Read

**Core (about 95 minutes):**

1. Birgitta Böckeler, "Harness engineering for coding agent users" (2026-04-02): the sections on
   feedback, computational and inferential controls, timing and the regulation categories.
   <https://martinfowler.com/articles/harness-engineering.html>
2. OpenAI, "Harness engineering" (2026-02-11): lint messages written for the agent, and clean-up
   agents. <https://openai.com/index/harness-engineering/>
3. Claude Code docs, "Automate actions with hooks", as a hands-on read. <https://code.claude.com/docs/en/hooks-guide>
4. Anthropic, "Harness design for long-running application development" (2026-03-24): the generator
   and evaluator split. <https://www.anthropic.com/engineering/harness-design-long-running-apps>
5. Nicholas Carlini, Anthropic, "Building a C compiler with a team of parallel Claudes"
   (2026-02-05): tests as the judge for many agents at once.
   <https://www.anthropic.com/engineering/building-c-compiler>
6. HumanLayer, "Skill Issue: Harness Engineering for Coding Agents" (2026-03-12): back-pressure, and
   checks that stay silent on success.
   <https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents>

**Optional:** see module 10 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** a small fixture project with sensors around it, and a table of what they catch.
- **Predict first**, in `private/modules/10-sensors/notes.md`: of five seeded defects, which will the tests catch, which the linter, which the
  review agent, and which none of them?
- **Outline:** a hook that runs the checks after an edit and returns failures to the agent; lint
  messages rewritten for an agent; a review agent that sees only the diff; five seeded defects of
  different kinds.
- **Stop condition:** `private/modules/10-sensors/notes.md` holds the table: one row per defect, one column per sensor, each
  cell "caught" or "missed", with the number of runs.
- **Stretch:** build the binding version of the advisory rule you picked in module 09. It comes from
  your set-up, so build it in `labs/private/experiments/`, with the tasks that exercise it, and run it on a copy
  outside this repository; the tracked fixture holds only
  hooks for invented rules.

The five defects are seeded in an untracked copy for each run, never committed: CI runs every test file
in the repository, so a committed defect that a test catches would turn it red.

Hooks for this lab are configured in the fixture project inside this repository, not in `~/.claude`.

## Self-check

1. What is the difference between a guide and a sensor?
2. Give two computational sensors and two inferential ones. What is each kind bad at?
3. Why does the wording of a failing check matter more for an agent than for a person?
4. What does a flaky test do to an agent?
5. Why is "a second agent reviewed it" not the same as "it was reviewed"?
6. How do you find out what a review agent misses?

## Ship (optional)

Draft it in `private/writeups/`.

"Five planted bugs, four sensors: what got through."
