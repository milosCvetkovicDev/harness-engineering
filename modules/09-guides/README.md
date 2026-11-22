# Module 09: Guides, the feedforward side

**Part:** C. Engineer the environment · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

What do instruction files and skills change, and how do you know?

## Why it matters

An instruction file and a set of skills grow line by line. Each line was added for a reason, and each one is
paid for on every call. This module asks, of one line at a time: does it change what the agent does?
It is also where you write your first skill for this course.

## You can...

- say what belongs in an instruction file and what belongs in a linked document, a skill or a hook;
- write a skill whose description triggers when it should;
- test one instruction with a with-and-without experiment and report counts;
- decide, from evidence, to keep, move or delete a line.

## Mental models

- [A guide](../../mental-models/09-guide.md)
- Revisit: [a skill](../../mental-models/06-skill.md), [memory](../../mental-models/04-memory.md),
  [propose, decide, commit](../../mental-models/00-propose-decide-commit.md)

## Theory primer

- **Guides act before the agent does.** They raise the odds of a good first attempt.
- **A map, not a manual.** A short file that points to deeper documents beats a long one.
- **The repository is the system of record.** What the agent cannot reach while it works does not
  exist for it.
- **Guides are context, not configuration.** They are usually followed. "Always" and "never" belong
  in a hook or a permission rule.
- **More can be worse.** Measured studies of repository context files found little gain in task
  success and higher cost. Each line needs a reason, ideally a failure it prevents.
- **The ratchet needs a pruner.** Adding a line per mistake is sound only if lines are also removed.
- **A skill's description is its trigger.** When choosing, the model sees each skill's name and
  description; the body loads only when the skill is invoked.

## Read

**Core (about 100 minutes):**

1. Birgitta Böckeler, "Harness engineering for coding agent users" (2026-04-02): the sections on
   feedforward, the steering loop and harness templates.
   <https://martinfowler.com/articles/harness-engineering.html>
2. OpenAI, "Harness engineering: leveraging Codex in an agent-first world" (2026-02-11): the map and
   the repository as system of record. <https://openai.com/index/harness-engineering/>
3. Claude Code docs, "Best practices for Claude Code" and "How Claude remembers your project". <https://code.claude.com/docs/en/best-practices>,
   <https://code.claude.com/docs/en/memory>
4. Gloaguen et al., the study of repository context files (arXiv 2602.11988, 2026-02-12): the
   abstract, the results and the limitations. <https://arxiv.org/abs/2602.11988>
5. Claude Code docs, "Extend Claude with skills". <https://code.claude.com/docs/en/skills>

For the lab's with-and-without runs: Claude Code docs, "Run Claude Code programmatically".
<https://code.claude.com/docs/en/headless>

**Optional:** see module 09 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** a `/quiz` skill for this course, and one measured instruction.
- **Predict first**, in `private/modules/09-guides/notes.md`: for the instruction you chose, in how many of the runs does the agent behave
  differently with it than without it?
- **Outline:** write the skill in this repository's own `.claude/skills/` folder, so that it reads a
  module's Self-check and asks one question at a time; then pick one line of an instruction file and
  run the same fixture tasks with and without it, several times each, in non-interactive mode.
- **Stop condition:** the skill runs a quiz on module 01; `private/modules/09-guides/notes.md` has a with-and-without table
  with counts and your decision for that line.
- **Stretch:** find one advisory rule in your set-up that should be binding, and write down in your private notes what
  would enforce it. Module 10 builds it.

The skill lives in this repository. Nothing in this lab writes to `~/.claude`. The copy of the instruction file
and its variant, and tasks written to exercise that line, live in `labs/private/experiments/`. The runs
start in a copy outside this repository, as [the experiments README](../../labs/experiments/README.md) says. How the runs are kept out of the user-level
configuration and session store is checked against the live docs before the first run.

## Self-check

1. What is a guide? Give three kinds.
2. Why does a longer instruction file not mean a better-behaved agent?
3. What does the agent know about a decision made in a chat thread last month?
4. When should a rule move from an instruction file to a hook?
5. How do you test whether one line of an instruction file does anything?
6. What makes a skill description good?

## Ship (optional)

Draft it in `private/writeups/`.

"I tested one line of an instruction file. Here is what it changed." The post never holds a line or a
result from your own set-up: repeat the test with an invented rule and write about that one.
