# Module 12: Capstone

**Part:** D. Capstone · **Time:** two to three weeks · **Status:** brief (expanded when started)

## Question

Can you design, build, measure and explain a harness for a real product task?

## Why it matters

This brings the course together: an agent that does something useful, the evidence that it works, and
a clear account of the decisions behind it. It serves two of the course goals at once, building
agents for products and public write-ups.

## You can...

- choose a task where an agent is the right tool, and say why a workflow would not do;
- write a one-page design: tools, context plan, controls, stop conditions, eval;
- build the agent and its eval suite together;
- report results honestly: counts, noise, cost, known failures;
- explain every part of the harness in terms of a failure it prevents.

## Mental models

All of them. For each part of your design, name the card it rests on and the prediction that card
makes about it.

## The work

1. **Pick the task.** A real job someone would want done, small enough for two weeks. It cannot be client
   work: no client code and no client data. This choice is yours; talk it through with Claude
   before you settle.
2. **Design on one page**, in `private/capstone/`: the task; why an agent; the tools; what is in the
   window and what is fetched; which rules are binding; how it stops; how it is measured.
3. **Write the eval first:** twenty or more tasks, drawn from how the job really goes wrong, with
   graders. Only invented fixture tasks are tracked; anything taken from the real job stays in
   `private/capstone/`. Run the baseline twice.
4. **Build**, on `mini-harness` or on the Agent SDK. Record the choice and the reason in
   `private/capstone/`.
   Its code goes in `labs/capstone/` if none of it is derived from a real job or from your set-up,
   otherwise in `labs/private/capstone/`;
   its runs go under a `.runs/` folder.
5. **Improve with the loop** from module 11: one change at a time.
6. **Write it up.**

## Read

Nothing new is required. Before the design, re-read:

1. Anthropic, "Building effective agents" (2024-12-19): is an agent the right shape for this task?
   <https://www.anthropic.com/engineering/building-effective-agents>
2. Anthropic, "Demystifying evals for AI agents" (2026-01-09): the starter suite.
   <https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents>

## Stop condition

- An eval report in `private/capstone/`: pass counts per condition, rerun noise, tokens per task, the failures that remain.
- A write-up draft in `private/writeups/`.
- A design document and at least one decision record, in `private/capstone/`.

## Self-check

Explain the project to someone who has not taken this course, in five minutes, and answer:

1. What does the agent do, and why is it an agent?
2. What must it never do, and which line of code prevents that?
3. How do you know it works? How sure are you?
4. What did you add that did not help, and how did you find out?
5. What would break first if the model were swapped for another?

## Ship

The write-up is the point of this module. Publishing it is your decision.
