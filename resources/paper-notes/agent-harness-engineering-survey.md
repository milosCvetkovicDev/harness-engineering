# Paper notes: "Agent Harness Engineering: A Survey" (Li et al., 2026)

- **Paper:** Junjie Li, Xi Xiao, Yunbei Zhang, Chen Liu and sixteen co-authors, "Agent Harness
  Engineering: A Survey". The authors are at CMU, Yale, JHU, NEU, Tulane, UAB, OSU, Virginia Tech
  and Amazon (the paper gives only these short forms).
- **Where:** the paper gives the authors' project page, <https://picrew.github.io/LLM-Harness/>.
  Checked on 2026-11-21: a web search still listed that page under the paper's title, but our fetch
  of it came back "not found", so open it in a browser before relying on it. No arXiv entry was
  found the same day. The paper is marked as under review at TMLR (Transactions on
  Machine Learning Research), so it is a submission, not an accepted paper.
- **Date:** 2026-05-14, the date of the paper's file; the project catalogue behind it was frozen on
  2026-05-08. Expect later versions to differ.
- **Kind:** a survey with a taxonomy and a catalogue of open-source projects.
- **Length:** 71 pages: 51 of body text, then references and two appendices. About 3 hours to read
  the body in full. Times here are the word count of each part at about 150 words a minute, a study
  pace.
- **These notes** were written on 2026-11-21 from the full body
  text; of the appendices, the opening and the table headings of Appendix A and all of Appendix B
  were read afterwards, when the notes were reviewed. They are in our own
  words: no passage is quoted. Where the paper's own terms are used, the vocabulary table explains
  them.

## Before you read on

**Predict first.** This note gives the answer a few lines down, so do it now. In
your copy of [module 00's notes](../../modules/00-orientation/notes.md),
`private/modules/00-orientation/notes.md`, write which two of the seven layers
(execution, tools, context, lifecycle, observability, verification, governance) you expect to have
the fewest open-source projects, and why. Compare with claim 3 below, and again with section 2.9
of the paper when you read it in module 08.

## The paper in one sentence

How reliably an agent finishes real work depends at least as much on the layer of software wrapped
round the model as on the model, and that layer can be described as seven parts, each with its own
tools, failure modes and open problems.

## The mental model: a platform with a data plane and a control plane

- **The model in one sentence.** A harness is a small platform. Four layers do the work: where code
  runs (execution), how capabilities are called (tools), what the model sees (context) and how the
  task moves forward (lifecycle). Three layers watch and constrain the work: observability,
  verification and governance.
- **The web analogy.** Execution is the container runtime; tools are the service contracts behind a
  gateway; context is the cache and session state; lifecycle is the workflow engine; observability
  is the tracing stack; verification is the test suite in CI; governance is access control, policy
  and the audit log.
- **One thing it predicts.** A failed run can be assigned to a layer and repaired there, and a
  benchmark score belongs to the pair of model and harness, never to the model alone.
- **One place it breaks.** The layers are not independent, and the paper says so (it calls this the
  coupling problem). A tool description is part of the tool layer and also spends context. A sandbox
  setting changes an evaluation result. So a change that looks good in one layer has to be tested
  on the whole system.
- **Where the analogy stops.** In a web platform the service in the middle is deterministic and its
  interfaces are specified. Here the component in the middle is probabilistic, and it reads its own
  platform's configuration as text.

## The three claims

1. **The harness is the binding constraint.** For long tasks and comparable frontier models, the
   harness may explain as much of the difference between results as the model does. The paper
   credits this thesis to an earlier author and leans on three reported results in which only the
   harness changed and benchmark scores rose by more than a typical model upgrade.
2. **Seven layers, named ETCLOVG.** Earlier frameworks had six components; this one makes
   observability and governance layers of their own, on the grounds that each has its own tools and
   its own owning team, and it puts operational state inside the lifecycle layer.
3. **A catalogue of more than 170 open-source projects** mapped to the layers. Execution, tools,
   lifecycle and verification are crowded. Observability and governance are thin in open source and
   live more in commercial products.

It also tells the history as three phases of what engineers work on: the prompt, then the context,
then the harness. Each phase contains the one before; the paper says to read this as a shift in
where the effort goes, not as one replacing another.

## The seven layers

| Layer | The question it answers | What the paper covers | Our module |
|-------|-------------------------|-----------------------|------------|
| E, execution | Where do the agent's actions run, and what contains them? | seven kinds of sandbox; three reasons for a sandbox; escape risks; self-hosted, cloud and hybrid | [05](../../modules/05-control-and-safety/README.md) |
| T, tools | How are capabilities described, found and called? | protocols sorted by the boundary they cross; choosing among many tools; tool sessions | [03](../../modules/03-tools/README.md) |
| C, context | What does the model see at each step, and what persists? | why context must be managed; three time horizons; compaction; sub-agents; drift | [04](../../modules/04-context-engineering/README.md), [06](../../modules/06-delegation-and-long-running/README.md) |
| L, lifecycle | How does a task move across calls, failures and hand-offs? | the single loop; patterns for several agents; pipelines from issue to pull request; replayed or stored state | [02](../../modules/02-agent-loop/README.md), [06](../../modules/06-delegation-and-long-running/README.md) |
| O, observability | What happened, and what did it cost? | traces as trees of spans; cost tracking; reliability; kinds of failure | [07](../../modules/07-observability-and-evals/README.md) |
| V, verification | Was it right, and what should be fixed? | a five-stage loop from task to feedback | [07](../../modules/07-observability-and-evals/README.md), [11](../../modules/11-measuring-and-improving/README.md) |
| G, governance | What is the agent allowed to do, and who answers for it? | permissions and identity; hooks; hardening; policy files; audit | [05](../../modules/05-control-and-safety/README.md), [10](../../modules/10-sensors/README.md) |

## Ideas worth keeping, layer by layer

- **Execution.** A sandbox serves three purposes: security, the ability to reset to a known state,
  and letting the agent act without asking each time. The third is the new one. Asking permission
  for every action fails in two ways: people give up, or they approve without reading. A bounded
  area in which the agent may act freely turns many permission questions into one configuration
  decision. See [a sandbox](../../mental-models/05-sandbox.md).
- **Tools.** Sort interface standards by the boundary they cross: model to function, agent to
  outside capability, agent to agent, and agent to repository. Seen this way, standards that are
  often compared do different jobs. A repository instruction file sits on the last boundary: it is
  policy kept in version control. A small set of clear tools tends to beat a large menu. See
  [a tool definition](../../mental-models/03-tool-definition.md).
- **Context.** Three horizons: the active window, the session (a notes file, a plan on disk, a
  summary carried into the next run) and long-term stores that can be searched. Two failures are
  kept apart: quality falling as one input grows, and behaviour wandering from the goal over a long
  run. The second survives compaction, because each summary loses a little and the losses add up.
  See [compaction](../../mental-models/04-compaction.md) and
  [a checkpoint](../../mental-models/06-checkpoint.md).
- **Lifecycle.** Three levels: one loop, several coordinated loops, and a pipeline that carries a
  task from an issue to a reviewed change. State is either rebuilt by replaying the history or kept
  outside the prompt; many practical systems do both. The state the harness needs in order to continue
  is a different thing from what the model is shown. See
  [the agent loop](../../mental-models/02-agent-loop.md) and
  [a sub-agent](../../mental-models/06-sub-agent.md).
- **Observability.** Record a run as a tree of timed steps, using the same tracing standard as
  ordinary services. Detect failures in three tiers: cheap rules for malformed output, statistics
  for drift in cost and latency, and a model's judgment for faults of reasoning. Every part of a
  harness encodes a belief about what the model cannot do alone, and those beliefs go stale, so a
  harness should also be watched for parts that are no longer needed. See
  [a trace](../../mental-models/07-trace.md).
- **Verification.** Five stages: define the task and its success test; check that the environment,
  the tools and the grader are ready; run under controlled conditions and capture the trace; judge
  the outcome, the path and the grader itself, then assign the failure to a layer; turn the result
  into regression tests. Besides the model, the paper names the tool interface, stale or compressed
  context, the sandbox, the orchestration loop, an ambiguous benchmark and the grader as places a
  fault may lie. The grader is a component under test, not an oracle. Report cost and
  latency next to success. See [an eval](../../mental-models/07-eval.md) and
  [a score is an estimate](../../mental-models/07-score-is-an-estimate.md).
- **Governance.** Four places to put a check in one cycle of tool use: on the input before the
  model, on the proposed action before the tool runs, on the tool's output before it returns to the
  context, and a person's approval for actions with consequences. Policy written as a file can be
  read, versioned and diffed. A disposition trained into a model is hard to change after
  deployment, cannot be audited by the harness, and has to be inferred by probing its behaviour.
  An audit trail that the agent's own process can rewrite is weak evidence. See
  [a hook](../../mental-models/05-hook.md),
  [a permission rule](../../mental-models/05-permission-rule.md) and
  [prompt injection](../../mental-models/05-prompt-injection.md).

## Across the layers

- **Three trade-offs.** Cost against quality against speed: stronger checks cost time and money, so
  decide which run inline and which run later. Capability against control: every tool, memory and
  permission you add is also something to govern. Coupling: test a change to the harness as a
  change to the system.
- **Five open problems.** Hardening and scaling the places where agents run; keeping an agent's
  picture of the task true over long runs (the paper suggests treating this as estimating state,
  with stated uncertainty and provenance); diagnosing failures from traces; a standard hand-off
  between agents, tools and people that carries intent, limits and evidence, not only a summary;
  and removing scaffolding as models improve.
- **The appendices.** Appendix A is the catalogue as one table, each project under one primary
  layer. Appendix B is a table of six reference implementations (five coding agents and one
  orchestration workflow) with the layers each one documents; it is useful beside module 08.

## What to read, and when

| When | Sections | Time |
|------|----------|------|
| Module 00, after the core reading | 1 and 2.1 to 2.3 | about 15 minutes |
| Module 03 | 4, without 4.3 | about 7 minutes |
| Module 04 | 5.1 to 5.4 and 5.7 | about 15 minutes |
| Module 05 | 3.1, 3.2.6, 3.3 and 9.1 to 9.2 | about 15 minutes |
| Module 06 | 5.6, 6 and 7.4 | about 20 minutes |
| Module 07 | 7.1 and 8 | about 30 minutes |
| Module 08 | 2.5 to 2.9 and Appendix B | about 7 minutes |
| Module 10 | 9.2 and 9.5 | about 8 minutes |
| Modules 11 and 12 | 10, 11 and 12 | about 15 minutes |
| Skip unless needed | 4.3 (training models to use tools), 5.5 (a catalogue of memory systems), most of 3.2 | |

Use it as a reference. Section 8 and sections 10 to 12 are the strongest parts. The catalogues of
products will date first.

## Vocabulary

| The paper says | We say | Note |
|----------------|--------|------|
| binding constraint | the thing that limits the result | the thesis is credited to an earlier author |
| ETCLOVG | the seven layers | execution, tools, context, lifecycle, observability, verification, governance |
| structural core | the four layers that do the work | execution, tools, context and lifecycle; the other three watch and constrain |
| liveness | the agent can keep working without asking | the third purpose of a sandbox |
| stateless replay; stateful execution | rebuild from the history; keep state outside the prompt | see [a checkpoint](../../mental-models/06-checkpoint.md) |
| context rot; context drift | worse answers as one input grows; wandering from the goal over many turns | keep the two apart |
| rollout | one recorded run of a task | our "trial" in module 07 |
| failure attribution | deciding which layer to fix | error analysis in module 07 |
| constitution | a written set of rules for the agent: trained in (training-time) or a file the harness enforces (deployment-time) | this note means the second kind |
| guides and sensors | [a guide](../../mental-models/09-guide.md), [a sensor](../../mental-models/10-sensor.md) | the paper cites the same article Part C is built on |

## Read it critically

1. **It is a submission, not a publication.** It was under review when this PDF was made, and the
   text shows it: the catalogue is given as more than 170 projects in most places and as more than
   100 at the start of section 6, and section 7.5 refers to a survey's figures that are first
   explained in section 12.3.
2. **The headline rests on three results** in which the harness changed and the model did not.
   They come from a practitioner's write-up, a vendor's post and a preprint, on coding benchmarks.
   The abstract and one line of the introduction state the thesis without a hedge: the harness, not
   the model, drives the outcome. Elsewhere the introduction hedges (for comparable models on long
   tasks, the harness may explain as much of the spread as the model), and the conclusion keeps a
   hedge too: infrastructure, not model capability alone, sets the ceiling. Module 11's core
   reading has both sides: the vendor's post is one of the three results, and a later preprint
   finds gaps of a few points, close to rerun noise. Read them together.
3. **The catalogue is one person's coding.** One primary coder with an audit by the authors, and no
   agreement statistic. It leans toward English, GitHub, open source and coding agents. The authors
   say all of this themselves. A layer that is thin in open source may still be common in practice.
4. **Star and download counts are not evidence of quality** and were out of date within weeks. Do
   not copy them.
5. **The taxonomy describes; it does not advise.** The authors say so. Some boundaries are a matter
   of taste: memory sits in the context layer but task state in the lifecycle layer, and hooks sit
   in governance.
6. **Some statements are simplified.** The section on why context must be managed says cost grows
   with the square of the length. That is true of the attention computation and is not how a call
   is priced or cached. Check against [a token](../../mental-models/01-token.md) and
   [the prompt cache](../../mental-models/01-prompt-cache.md).
7. **Descriptions of products are second-hand.** What the paper says about particular coding agents
   and about prices is checked against the live docs before we rely on it.

## Check yourself

1. Name the seven layers. Which four does the paper call the structural core, and what are the
   other three for?
2. What are the three purposes of a sandbox, and which one is new with agents?
3. What is the difference between context rot and context drift? Which one does compaction not
   cure, and why?
4. A run failed. Give four places other than the model where the fault may lie.
5. List the five stages of the paper's evaluation loop.
6. Where in one cycle of tool use can a check be placed? Give the four points.
7. Why should a harness sometimes get smaller when the model gets better?
