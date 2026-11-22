# Paper notes: "Externalization in LLM Agents" (Zhou et al., 2026)

- **Paper:** Chenyu Zhou and twenty co-authors, "Externalization in LLM Agents: A Unified Review of
  Memory, Skills, Protocols and Harness Engineering". The authors are at Shanghai Jiao Tong
  University, Sun Yat-Sen University, Shanghai Innovation Institute, Carnegie Mellon University and
  OPPO.
- **Where:** <https://arxiv.org/abs/2604.08224> (version 1, 9 April 2026, category cs.SE; the page
  was fetched on 2026-11-21 and showed no later version and a CC BY 4.0 licence). It is a preprint;
  the page names no journal or conference.
- **Kind:** a review that argues for one idea. It reports no experiments of its own.
- **Length:** 54 pages, about 44 of them body text. About 2 hours 40 minutes to read in full. Times
  here are the word count of each part at about 150 words a minute, a study pace.
- **These notes** were written on 2026-11-21 from the full body
  text. They are in our own words: no passage is quoted. Where the paper's own terms are used, the
  vocabulary table explains them.

## Before you read on

**Predict first.** This note gives the paper's answer further down, so do it now. In
your copy of [module 00's notes](../../modules/00-orientation/notes.md),
`private/modules/00-orientation/notes.md`, write which of these you would keep in
the model and which you would move out of it, and why: the house style of a codebase, the current
API of a library, how to decompose a task, a customer's refund policy. Compare with step 5 of the
argument below, and with the paper's four dimensions when you read section 7.3.

## The paper in one sentence

Agents became reliable less by making the model cleverer than by moving three burdens out of it
(remembering, knowing how, and coordinating with other systems) into things outside the model that
can be stored, inspected and governed; the harness is the runtime that makes those things work
together.

## The mental model: a stateless service and its infrastructure

- **The model in one sentence.** Treat the language model as a stateless request handler, and treat
  everything it would otherwise have to carry in its head as infrastructure you move out of the
  process: state goes to a store (memory), procedures go to versioned packages (skills), and
  conversations with other systems go behind API contracts (protocols). The harness is the platform
  that wires these up, enforces policy and keeps the logs.
- **One thing it predicts.** Whatever changes often, must be audited, or is used by more than one
  agent ends up outside the model. It is the same pressure that moves configuration out of code and
  sessions out of process memory. It also predicts where a failure shows up: the wrong input was
  selected (memory), the wrong procedure was followed (skill), or the action was malformed
  (protocol).
- **One place it breaks.** A database returns exactly what was stored. A model reads everything
  external through a limited window that it attends to unevenly, so each thing you move out has to
  be loaded back in, costs tokens, and may be ignored or misread. Moving more out is therefore not
  always better; the paper says so itself in section 8.4.
- **Where the analogy stops.** Moving a session into a cache does not make the handler's job easier.
  The paper claims something stronger: an external memory changes the task itself, from recalling to
  recognising. That claim comes from research on human cognition, and for a model it is an empirical
  question, not a given.

## The argument in five steps

1. **Three layers of history.** Capability first lived in the weights (train a better model), then
   in the context (prompts, examples, retrieval), and now increasingly in the infrastructure around
   the model. The later layers do not replace the earlier ones; they sit on top of them.
2. **Three forms of externalization**, each of which changes what the model is asked to do (table
   below).
3. **The harness is not a fourth form.** It is the layer that coordinates the three, and it adds
   three operational surfaces of its own: permission, control and observability.
4. **The three forms feed each other.** Memory is the evidence from which skills are distilled;
   running a skill writes traces back to memory; skills act only through protocols; a stable
   protocol makes new skills easy to write; memory can steer which protocol path is taken; protocol
   results must be written back to memory. The loop strengthens itself, and it spreads errors the
   same way: one poisoned memory can become a bad skill whose traces pollute memory further.
5. **Not everything should move out.** The design question is where each burden should live, given
   how often it changes, how widely it is reused, how much it must be audited and what it costs in
   latency and context. A capability that is stable, fast and generic, or needed only once, stays in
   the model.

## The three externalizations

| Form | What moves out of the model | What the model's task becomes | Where it fails |
|------|-----------------------------|-------------------------------|----------------|
| Memory | state across time: the working context, past episodes, facts, what is known about the user | recognise or retrieve what is put in front of it, instead of recalling | memories that are stale, too abstract to act on, too detailed to read, or poisoned |
| Skills | procedural know-how: the steps, the rules of thumb, the constraints | follow and combine a prepared procedure, instead of inventing one | a skill that no longer matches the tools, skills that are unsafe in combination, a skill that crowds out the task |
| Protocols | the structure of interaction: how to call, in what order, with what permission, how to discover | fill in a typed contract, instead of improvising a format | a contract that limits what can be expressed; forged tool manifests or manipulated endpoints |

## What the harness adds

The paper draws the harness twice, and each drawing has six parts. Keep them apart.

- **The picture:** the model in the middle, surrounded by memory, skills and protocols (the three
  forms) and by permission, control and observability (the three operational surfaces).
- **The design dimensions** used to compare harnesses: the agent loop and its limits; sandboxing;
  human oversight and approval gates; observability and structured feedback; configuration,
  permissions and policy; and the management of the context budget.

Three points from that section are worth carrying into the labs:

- Limits on steps, recursion and cost are not an afterthought. They define the space in which the
  model reasons.
- A sandbox is also a simplification: it removes state the model would otherwise have to reason
  about.
- How much autonomy the agent has is a setting of the harness, per task and per tool. It is not a
  property of the model.

## Section by section: what to take

- **Section 3, memory.** Four kinds of state and four architectures, from keeping everything in
  the window, through tiered memory, to systems that adapt their own memory policies from
  experience. The point to remember: a memory system is judged by whether the current decision
  became easier to make, not by how much it stored. The
  direction of travel is from storing to controlling what is shown.
- **Section 4, skills.** Three stages: single tool calls, then choosing among many tools, then
  packaged expertise. A skill is made usable by five things: a specification, a way to be found,
  staged loading (a short description first, the full guide on demand), a binding to tools, and
  composition. Skills arrive by being written, distilled from experience, discovered or composed.
  The authors say plainly that the closing part of this section is interpretation and that direct
  evidence on how skills degrade with context is limited.
- **Section 5, protocols.** A protocol fixes four things outside the model: the grammar of a call,
  the lifecycle, the permission and trust boundary, and the metadata by which a capability is
  found. Four families: agent to tool, agent to agent, agent to user, and a remainder for
  particular domains such as commerce and payments.
- **Section 6, the harness.** The two lists above, then a claim: independently built coding agents
  have converged on the same structures, so the structures are probably necessary.
- **Section 7, cross-cutting.** The six couplings in step 4, a view of the three forms as layers of
  the model's input and output, and the four dimensions that decide whether something belongs in the
  model or outside it.
- **Section 8, what comes next.** Plans, evaluation criteria and the harness's own configuration as
  the next things to move out; harnesses that adapt themselves; the costs (overhead and a larger
  attack surface); and how to measure a harness: swap the model and keep the harness, remove one
  component at a time, and track reliability over many sessions.

## Map to this course

| Paper | Module | Cards |
|-------|--------|-------|
| 1, 2 and 6.1: the three layers; what a harness is | [00](../../modules/00-orientation/README.md) | [a harness](../../mental-models/00-harness.md) |
| 2.1 and 2.2: capability in weights and in context | [01](../../modules/01-model-interface/README.md) | [a stateless function](../../mental-models/01-stateless-function.md), [the context window](../../mental-models/01-context-window.md) |
| 6.2.1: the loop and its limits | [02](../../modules/02-agent-loop/README.md) | [the agent loop](../../mental-models/02-agent-loop.md) |
| 4.2 and 5: from tool calls to protocols | [03](../../modules/03-tools/README.md) | [a tool definition](../../mental-models/03-tool-definition.md) |
| 3 and 6.2.6: memory and the context budget | [04](../../modules/04-context-engineering/README.md) | [memory](../../mental-models/04-memory.md), [the context budget](../../mental-models/04-context-budget.md), [compaction](../../mental-models/04-compaction.md) |
| 6.2.2, 6.2.3, 6.2.5 and 8.4: isolation, approval, policy, risk | [05](../../modules/05-control-and-safety/README.md) | [a sandbox](../../mental-models/05-sandbox.md), [a permission rule](../../mental-models/05-permission-rule.md), [a hook](../../mental-models/05-hook.md), [prompt injection](../../mental-models/05-prompt-injection.md) |
| 3.3 and 4.3: state outside the window; staged loading | [06](../../modules/06-delegation-and-long-running/README.md) | [a checkpoint](../../mental-models/06-checkpoint.md), [a skill](../../mental-models/06-skill.md) |
| 6.2.4, 7.2 and 8.6: traces, kinds of failure, measuring | [07](../../modules/07-observability-and-evals/README.md) | [a trace](../../mental-models/07-trace.md), [an eval](../../mental-models/07-eval.md) |
| 6.3: what production harnesses share | [08](../../modules/08-production-harness/README.md) | [a harness](../../mental-models/00-harness.md) |
| 4, 7.3 and 8.4: skills; what belongs where; the cost of more | [09](../../modules/09-guides/README.md) | [a guide](../../mental-models/09-guide.md), [a skill](../../mental-models/06-skill.md) |
| 6.2.3 and 6.2.4: gates and feedback | [10](../../modules/10-sensors/README.md) | [a sensor](../../mental-models/10-sensor.md) |
| 8.3 and 8.6: harnesses that change; how to measure one | [11](../../modules/11-measuring-and-improving/README.md) | [the improvement loop](../../mental-models/11-improvement-loop.md) |
| 7.3: where each burden should live | [12](../../modules/12-capstone/README.md) | |

## What to read, and when

| When | Sections | Time |
|------|----------|------|
| Module 00, after the core reading | 1, 2.4 and 6.1 (what a harness is) | about 20 minutes |
| Module 04 | 3 | about 20 minutes |
| Module 05 | 8.4 | about 3 minutes |
| Module 06 | 3.3 and 4.3 | about 10 minutes |
| After module 07, as a review of Part B | 6 and 7 | about 40 minutes |
| Module 09 | 4.4 to 4.6 | about 10 minutes |
| Module 11 | 8.3 and 8.6 | about 5 minutes |
| Skip unless curious | 5.2 (a catalogue of protocols that will date quickly) and 8.2 (robots) | |

Reading it cover to cover before Part B is not a good use of a week. The paper is a map of ground
you have not walked yet. It pays most as a review after module 07, when each section names something
you have already built.

## Vocabulary

| The paper says | We say | Note |
|----------------|--------|------|
| externalization | moving a burden out of the model | the paper's organising idea |
| parametric | in the weights | |
| cognitive artifact | an external aid that changes the task | from research on human cognition |
| recall, recognition | remembering unaided; picking out what is shown | |
| progressive disclosure, staged loading | load the description first, the body on demand | see [a skill](../../mental-models/06-skill.md) |
| protocol | the contract for a call or a conversation | wider than "tool schema" |
| operational surface | permission, control, observability | the harness's own contribution |
| self-evolving harness | a harness that changes its own configuration | module 11's improvement loop, automated |

## Read it critically

1. **It is an argument, not a measurement.** No experiment in the paper shows that externalization
   causes reliability. The evidence is other people's systems, many of them 2025 and 2026
   preprints we have not read.
2. **The frame can absorb anything.** If every useful component is "externalization", ask what
   observation would count against the idea. Section 8.6 proposes two experiments: hold the
   harness fixed and swap the model, or remove one component at a time. The paper offers them as
   ways to measure how much of the success belongs to the harness; this note reads them as the kind
   of experiment that could also count against the idea. Those are experiments
   somebody still has to run. Modules 07 and 11 are where we run small versions of them.
3. **The three-way split leaks.** The paper describes permission and policy rules as governance
   moved out of the model, and lists plans and evaluation criteria as things to move out next,
   while holding that the harness is not a fourth form. Read the split as a teaching device, not
   as a law.
4. **The cognitive science is borrowed by analogy.** Recall and recognition are findings about
   people. For a model the matching claim is that information in the window is used more reliably
   than information in the weights. That holds often and fails in known ways (see
   [the context budget](../../mental-models/04-context-budget.md)).
5. **Convergence is weak evidence.** Coding agents that look alike may have copied each other.
6. **Descriptions of products are second-hand.** What the paper says about particular coding agents
   is checked against the live docs before we rely on it.

## Check yourself

1. Name the three forms of externalization and say what each one changes about the model's task.
2. Why does the paper insist that the harness is not a fourth form? What does the harness add?
3. Give one way memory feeds skills and one way a mistake can travel round that loop.
4. An agent picked the right tool and sent arguments in the wrong shape. Which of the paper's three
   kinds of failure is that, and which form would you fix?
5. Name two reasons to keep a capability in the model instead of moving it out.
6. How would you test how much of an agent's success belongs to its harness?
