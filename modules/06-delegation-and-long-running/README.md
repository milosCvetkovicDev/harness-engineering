# Module 06: Delegation and long-running work

**Part:** B. Build a harness · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

How does work outlive one context window, and when is a second agent worth its cost?

## Why it matters

Real tasks do not fit in one window or one sitting. A set-up can answer this with sub-agents,
checkpoints, hand-off notes and skills. Building small versions shows what each one buys, what it
costs in tokens, and why a vague brief produces a confident wrong answer.

## You can...

- give `mini-harness` a tool that runs a sub-agent and returns a summary;
- measure what delegation saves in the parent's window and what it costs in total;
- stop a run in the middle and resume it from a checkpoint;
- load a skill on demand and show its cost before and after it triggers;
- say when not to delegate.

## Mental models

- [A sub-agent](../../mental-models/06-sub-agent.md)
- [A checkpoint](../../mental-models/06-checkpoint.md)
- [A skill](../../mental-models/06-skill.md)
- Revisit: [memory](../../mental-models/04-memory.md)

## Theory primer

- **A sub-agent isolates context.** It reads in its own window and hands back a summary.
- **The brief is everything.** The sub-agent knows only what you wrote. The summary is all you get
  back, and its mistakes look like its findings.
- **Readers in parallel, writers with care.** Parallel research is safe. Parallel edits collide
  unless the tasks are separated and something checks the result.
- **Planning is a tool.** A to-do list the agent maintains keeps a long task on course and survives
  compaction better than intentions do.
- **Shift work.** Each session starts knowing nothing. A progress file, the git history and the tests
  are the hand-off.
- **A loop needs a judge.** Repeating a prompt with fresh context makes progress only when something
  outside the agent says whether it did.
- **Skills** load a short description always and the body on demand.

## Read

**Core (about 90 minutes):**

1. Justin Young, Anthropic, "Effective harnesses for long-running agents" (2025-11-26).
   <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>
2. Anthropic, "Harness design for long-running application development" (2026-03-24): the same
   problem a few months later, with parts removed.
   <https://www.anthropic.com/engineering/harness-design-long-running-apps>
3. Anthropic, "Multi-agent coordination patterns" (2026-04-10), with Cognition, "Multi-Agents:
   What's Actually Working" (2026-04-22): both sides of the multi-agent debate.
   <https://claude.com/resources/articles/multi-agent-coordination-patterns>,
   <https://cognition.com/blog/multi-agents-working>
4. Anthropic, "Equipping agents for the real world with Agent Skills" (2025-10-16).
   <https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills>

**Optional:** see module 06 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** `mini-harness` can delegate, plan, stop and resume.
- **Predict first**, in `private/modules/06-delegation-and-long-running/notes.md`: for one research task, how many input tokens does the parent hold at the end
  with and without a sub-agent? Which run uses more tokens in total?
- **Outline:** a sub-agent tool that runs a nested loop; a plan tool; a checkpoint written after each
  phase and read on start (under `labs/mini-harness/.runs/`); a skill loader with an index of descriptions.
- **Stop condition:** the acceptance tests for lab 06 are green, and
  `private/modules/06-delegation-and-long-running/notes.md` has a table of
  parent-window tokens and total tokens, with and without the sub-agent.
- **Stretch:** kill a run mid-task and resume it. Then corrupt the checkpoint with one false line and
  see what the agent believes.

## Self-check

1. What does a sub-agent protect, and what does it cost?
2. What must a brief contain, given that the sub-agent starts with an empty window?
3. Why is parallel writing riskier than parallel reading?
4. What three things should a checkpoint hold?
5. Why can a skill with a vague description be worse than no skill?

## Ship (optional)

Draft it in `private/writeups/`.

"What a sub-agent saved, and what it cost": the two token tables.
