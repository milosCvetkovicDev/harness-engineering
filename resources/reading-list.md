# Reading list

The curated list, by module. Each module's brief names the core items; this file adds the times, the
optional items and the caveats.

**Checked: 2026-11-21** (the research pass; its raw notes are kept locally and are not published).
When a module is started, its links are fetched again, newer sources are searched for, and the
"Checked" date above is updated.

## How to read this list

- **Core** is what the module's self-check assumes: about 90 minutes. **Optional** is for depth, or
  for a second explanation when the first did not land.
- **Times are estimates** made during the research pass, unless a line says the page states it.
- **Dates** are publication dates. Documentation pages carry no date; they were read on the checked
  date and change often.
- **Who is speaking.** "Lab" means the company that trains the model or ships the agent. Labs know
  their systems best and also report their own results. A vendor's number is a claim until someone
  else reproduces it. A preprint has not been peer-reviewed.
- A source is listed only if its page was fetched and its date recorded during the research pass, or
  it is a companion text the owner approved: the book and the two survey papers below. Sources
  known only from search results are under
  [Leads, not verified](#leads-not-verified).

## Companion book

An O'Reilly book that goes with the course. The publisher's listing is titled "Harness
Engineering" and credits Nicole Koenigstein:
<https://www.oreilly.com/library/view/harness-engineering/0642572422783/>. The title and author are
to be confirmed on the title page.

Its examples use Python and another vendor's API; the labs here use TypeScript and the Anthropic SDK.
Chapter notes, and the map from the book's layers to modules, are kept locally and are not
published: the book is a paid title.

| Chapter | Read it with |
|---|---|
| 1. Why Harness Engineering Matters | Module 00 |

## Survey papers

Two survey papers, added on 2026-11-21. They sit beside the course as optional reading;
neither replaces a module's core list. Our notes are in [paper-notes/](paper-notes/README.md): what
each paper argues, which sections go with which module, how long they take and what to be sceptical
of.

| Paper | Date | Status | Read it with | Our notes |
|---|---|---|---|---|
| Chenyu Zhou and twenty co-authors, "Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering", <https://arxiv.org/abs/2604.08224> | 2026-04-09 | arXiv preprint, version 1 | Modules 00, 04 to 07, 09 and 11 | [notes](paper-notes/externalization-in-llm-agents.md) |
| Junjie Li and nineteen co-authors, "Agent Harness Engineering: A Survey", <https://picrew.github.io/LLM-Harness/> | 2026-05-14 (the PDF) | under review at TMLR; no arXiv entry found | Modules 00, 03 to 08 and 10 to 12 | [notes](paper-notes/agent-harness-engineering-survey.md) |

The arXiv page was fetched on 2026-11-21. The second paper's project page is the link the paper
gives; our fetch of it that day came back "not found", so open it in a browser before relying on
it.

## Module 00: Orientation

**Core (about 95 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Anthropic (Erik S., Barry Zhang), [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 2024-12-19 | lab blog | 25 min | Workflow or agent; the pattern names; start with the simplest thing. Older than the term "harness", still the base text |
| 2 | Vivek Trivedy, LangChain, [The Anatomy of an Agent Harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) | 2026-03-10 | vendor blog | 15 min | The model-plus-harness split and a list of parts. The vendor sells a harness framework |
| 3 | Birgitta Böckeler, martinfowler.com, [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html) | 2026-04-02 | practitioner article | 30 min | The second sense: guides and sensors around an existing agent |
| 4 | Ryan Lopopolo, OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) | 2026-02-11 | lab blog | 25 min | The case study that spread the term. Its results are the lab's own report |

**Optional**

- Mitchell Hashimoto, [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey), 2026-02-05, practitioner post, 10 to 20 min. The earliest dated use of the idea that the research pass found: fix each repeated mistake in the harness.
- Sergio Paniego and Aritra Roy Gosthipaty, Hugging Face, [Harness, Scaffold, and the AI Agent Terms Worth Getting Right](https://huggingface.co/blog/agent-glossary), 2026-05-25, community blog, 10 min. Agent, harness and scaffold side by side; says openly that the terms are unsettled.
- Simon Willison, [I think "agent" may finally have a widely enough agreed upon definition](https://simonwillison.net/2025/Sep/18/agents/), 2025-09-18, practitioner post, 8 min. An agent as tools in a loop toward a goal.
- Philipp Schmid, [The importance of Agent Harness in 2026](https://www.philschmid.de/agent-harness-2026), 2026-01-05, practitioner post, 8 min. A computer analogy for model, context and harness.
- Lilian Weng, [Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/), 2026-07-04, essay, about 90 min, advanced. The harness as the thing being optimised. Come back to it in module 11.
- Lilian Weng, [LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/), 2023-06-23, survey post, 40 to 60 min. Background only: it predates native tool calling and coding agents.
- Richard MacManus, Latent Space, [5 Trends That Defined AI Engineering at World's Fair 2026](https://latent.space/p/aiewf26trends), 2026-07-14, recap, 15 min. How the conversation moved from agents to harnesses.
- METR, [Task-Completion Time Horizons of Frontier AI Models](https://metr.org/time-horizons/), last updated 2026-09-08, research page (it says it is no longer actively updated), 10 min. Why long-running work became the question.

## Module 01: The model interface

**Core (about 90 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Anthropic docs, [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works), then [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls) | undated | docs | 25 min | The loop, and the exact JSON of a tool request and its result |
| 2 | Anthropic docs, [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) | undated | docs | 30 min | What counts toward the window; how usage is reported |
| 3 | Anthropic docs, [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | undated | docs | 25 min | Prefix matching, breakpoints, the usage fields. Read the concepts; prices change |
| 4 | Simon Willison, [How coding agents work](https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/) | guide started 2026-02-23 | practitioner guide | 10 min | The same ground, vendor-neutral |

**Optional**

- Anthropic docs, [Thinking](https://platform.claude.com/docs/en/build-with-claude/thinking), undated, 30 min. Reasoning as output, effort, thinking between tool calls.
- Anthropic docs, [Glossary](https://platform.claude.com/docs/en/about-claude/glossary), undated, 15 min. Short definitions to check your own against.
- Anthropic docs, [Tutorial: Build a tool-using agent](https://platform.claude.com/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent), undated, 45 to 60 min with coding. Read it after the lab; it contains the code the lab asks you to write.
- OpenAI docs, [Function calling](https://developers.openai.com/api/docs/guides/function-calling), undated, 15 to 20 min. The same idea in the API the companion book uses; useful for translating its examples.

**Fundamentals path, background on the model itself** (about 3 hours, mostly estimated; spread it
over the first weeks)

1. 3Blue1Brown, [Transformers, the tech behind LLMs](https://www.3blue1brown.com/lessons/gpt) (2024-04-01) and [Attention in transformers, step-by-step](https://www.3blue1brown.com/lessons/attention) (2024-04-07), video lessons, about 1 hour together. What a transformer and attention do. Durations not verified.
2. The Anthropic docs above: glossary, context windows, thinking, prompt caching, about 1.5 hours.
3. Sebastian Raschka, [Understanding and Coding the KV Cache in LLMs from Scratch](https://magazine.sebastianraschka.com/p/coding-the-kv-cache-in-llms), 2025-06-17, about 30 min for the concepts. Why a cache needs an identical prefix.

Further, for reference: Jay Alammar, [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) (2018-06-27, about 1 hour); Karpathy, [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) (the GPT and tokenizer lectures, about 4 hours, in code).

## Module 02: The agent loop

**Core (about 100 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Thorsten Ball, [How to Build an Agent](https://ampcode.com/notes/how-to-build-an-agent) | 2025-04-15 | practitioner tutorial | 45 min | The whole loop, built step by step, in Go. Read it; do not port it |
| 2 | Anthropic, [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), the agents section again | 2024-12-19 | lab blog | 10 min | When a loop is the right shape |
| 3 | Michael Bolin, OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/) | 2026-01-23 | lab blog | 20 min | The same loop in a production harness: prompt assembly, stop condition, caching |
| 4 | Claude Agent SDK docs, [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) | undated | docs | 25 min | Turns, turn and budget limits, result types |

**Optional**

- Yao et al., [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629), 2022-10-06, paper, 40 to 60 min. Where the reason, act, observe loop was first written down.
- SWE-agent team, [mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent), code, 20 to 30 min. A loop of about a hundred lines with one tool. Read it after the lab.
- Dex and contributors, HumanLayer, [12-Factor Agents](https://github.com/humanlayer/12-factor-agents), undated, guide, 30 to 90 min. Own your control flow and your context window.
- Thariq Shihipar et al., Anthropic, [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk), 2025-09-29, lab blog, 15 min. Gather, act, verify, repeat.
- Geoffrey Huntley, [how to build a coding agent: free workshop](https://ghuntley.com/agent/), 2025-08-24, practitioner workshop, 30 min of reading.
- **After the lab, to compare with your own code:** Andrew Ford, [Building a Coding Agent in TypeScript](https://andrewford.co.nz/articles/building-a-coding-agent/), 2026-10-26, 12 min read (the author's figure); Gabor Koos, freeCodeCamp, [How to Build an AI Agent Harness from Scratch in TypeScript](https://www.freecodecamp.org/news/how-to-build-an-ai-agent-harness-from-scratch-in-typescript/), 2026-10-20, 60 to 90 min. Both build in TypeScript what labs 02 and 03 ask you to build, so they are spoilers before and good reviews after.

## Module 03: Tools and tool design

**Core (about 85 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Ken Aizawa et al., Anthropic, [Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) | 2025-09-11 | lab blog | 25 min | Tool design principles, and evaluating a tool change |
| 2 | Anthropic docs, [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) | undated | docs | 15 min | Definitions are prompt text; what a good description holds |
| 3 | Yang et al., [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](https://arxiv.org/abs/2405.15793), the sections on the interface | 2024-05-06 | paper | 30 min | The agent-computer interface: tool shape moves results |
| 4 | Adam Jones and Conor Kelly, Anthropic, [Code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) | 2025-11-04 | lab blog | 15 min | What many tool definitions cost, and one way around it |

**Optional**

- Bin Wu et al., Anthropic, [Introducing advanced tool use on the Claude Developer Platform](https://www.anthropic.com/engineering/advanced-tool-use), 2025-11-24, lab blog, 10 min. Loading tool definitions on demand.
- Anthropic docs, [Tool search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) and [Manage tool context](https://platform.claude.com/docs/en/agents-and-tools/tool-use/manage-tool-context), undated, 20 min together.
- Model Context Protocol project, [specification](https://modelcontextprotocol.io/specification/latest) and its [tools page](https://modelcontextprotocol.io/specification/2026-07-28/server/tools), spec version 2026-07-28, 30 min. What the protocol standardises.
- OpenRouter, [MCP vs CLI vs Skills: What Each Costs in Context](https://openrouter.ai/blog/insights/mcp-vs-cli-vs-skills), 2026-11-11, vendor post with a measurement script, 15 min; and Stefan Judis, Checkly, [CLIs are more token-efficient than MCP. Or are they?](https://www.checklyhq.com/blog/mcp-vs-cli-token-efficiency/), 2026-07-30, 8 min. Two measurements of the same question; compare their methods.
- Lance Martin, [Agent design patterns](https://rlancemartin.github.io/2026/01/09/agent_design), 2026-01-09, practitioner post, 15 min. Small tool sets, the shell and the file system.
- Mario Zechner, [What I Learned Building an Opinionated and Minimal Coding Agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/), 2025-11-30, practitioner post, 25 min. The case for very few tools. It argues against permission checks; module 05 makes the case for them.
- Wang et al., [Executable Code Actions Elicit Better LLM Agents](https://arxiv.org/abs/2402.01030), 2024-02-01, paper, about 1 hour. Code as the one action.

## Module 04: Context engineering

**Core (about 95 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Anthropic Applied AI team, [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | 2025-09-29 | lab blog | 25 min | Context as a finite resource; retrieval on demand; compaction, notes, sub-agents |
| 2 | Kelly Hong, Anton Troynikov, Jeff Huber, Chroma, [Context Rot](https://www.trychroma.com/research/context-rot) | 2025-07-14 | vendor research report | 25 min | Measured degradation as input grows. The models are from 2025 and the vendor sells a retrieval product; read it for the shape of the effect |
| 3 | Yichao "Peak" Ji, Manus, [Context Engineering for AI Agents: Lessons from Building Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) | 2025-07-18 | practitioner post | 20 min | Designing around the cache; the file system as context; keeping errors in view |
| 4 | Claude Code docs, [How Claude Code uses prompt caching](https://code.claude.com/docs/en/prompt-caching) and [Explore the context window](https://code.claude.com/docs/en/context-window) | undated | docs | 25 min | How a production harness lays out its prompt, and what fills the window |

**Optional**

- Anthropic docs, [Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) and [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing), undated, 15 min each. The server-side versions of what the lab builds. Beta features; they change quickly.
- Isabella He, Claude Cookbook, [Context Engineering: Memory, Compaction, and Tool Clearing](https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools), 2026-03-20, notebook, 30 min plus running it.
- Lance Martin, Anthropic, [The components of agent memory](https://www.anthropic.com/engineering/components-of-agent-memory), 2026-11-06, lab blog, 25 min.
- Anthropic docs, [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool), undated, 15 min.
- The LangChain Team, [Context Engineering](https://www.langchain.com/blog/context-engineering-for-agents), 2025-07-02, vendor post, 12 min. The four-move taxonomy this module's primer uses.
- Drew Breunig, [How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html), 2025-06-22, 10 min, and [The State of Context Engineering](https://www.dbreunig.com/2026/10/24/the-state-of-context-engineering.html), 2026-10-24, 15 min. Failure modes, then and now.
- Simon Willison, [Context engineering](https://simonwillison.net/2025/jun/27/context-engineering/), 2025-06-27, 4 min. Where the term came from.
- Anthropic, [An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem), 2026-04-23, lab postmortem, 10 min. Harness changes that made a product worse, told by its makers.
- Packer et al., [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560), October 2023, paper, 30 min. The paging analogy for memory. Only the abstract was read in the research pass.

## Module 05: Control and safety

**Core (about 95 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | David Dworken and Oliver Weller-Davies, Anthropic, [Beyond permission prompts: making Claude Code more secure and autonomous](https://www.anthropic.com/engineering/claude-code-sandboxing) | 2025-10-20 | lab blog | 10 min | Why a sandbox replaces most prompts; file and network isolation together |
| 2 | Simon Willison, [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), then Meta, [Agents Rule of Two](https://ai.meta.com/blog/practical-ai-agent-security/) | 2025-06-16, 2025-10-31 | practitioner post, lab blog | 15 min | Two short threat models for prompt injection |
| 3 | John Hughes, Anthropic, [How we built Claude Code auto mode](https://www.anthropic.com/engineering/claude-code-auto-mode) | 2026-03-25 | lab blog | 15 min | A model as the approver, with its measured error rates |
| 4 | Claude Code docs, [Hooks guide](https://code.claude.com/docs/en/hooks-guide) | undated | docs | 20 min | Hooks as deterministic control |
| 5 | Claude Code docs, [Permission modes](https://code.claude.com/docs/en/permission-modes) and [Sandboxing](https://code.claude.com/docs/en/sandboxing) | undated | docs | 35 min | The mechanics the lab copies in small. Skim for structure |

**Optional**

- Maja Trębacz et al., OpenAI, [Auto-review of agent actions without synchronous human oversight](https://openai.com/safety-alignment/auto-review/), 2026-04-30, lab blog, 20 min. The other lab's model-as-approver, with numbers and limits.
- Simon Willison, [New prompt injection papers: Agents Rule of Two and The Attacker Moves Second](https://simonwillison.net/2025/Nov/2/new-prompt-injection-papers/), 2025-11-02, 10 min; and Nasr et al., [The Attacker Moves Second](https://arxiv.org/abs/2510.09023), 2025-10-10, paper, about 60 min (only the abstract was read in the research pass). Why filters alone do not hold.
- Anthropic, [Mitigating the risk of prompt injections in browser use](https://www.anthropic.com/research/prompt-injection-defenses), 2025-11-24, lab blog, 10 min.
- OWASP GenAI Security Project: [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/), 2025, 10 min; [Top 10 for Agentic Applications for 2026](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/), 2025-12-09, 10 min; [Exploit Roundup Q2 2026](https://genai.owasp.org/2026/07/08/genai-and-agentic-ai-exploit-roundup-q2-2026/), 2026-07-08, 10 min.
- Anthropic, [sandbox-runtime](https://github.com/anthropic-experimental/sandbox-runtime), code, 25 min. An open-source sandbox with its threat model written down.
- Claude Code docs, [Configure permissions](https://code.claude.com/docs/en/permissions), 15 min, and [Hooks reference](https://code.claude.com/docs/en/hooks), 40 min. Reference, not reading.
- OpenAI Codex docs, [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security), 15 min, [Auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review), 8 min, and [Hooks](https://learn.chatgpt.com/docs/hooks), 15 min. The same layers under other names.
- Srini Sekaran and Craig Gumbley, Docker, [Why MicroVMs: The Architecture Behind Docker Sandboxes](https://www.docker.com/blog/why-microvms-the-architecture-behind-docker-sandboxes/), 2026-04-16, vendor post, 10 min. Containers, micro-VMs and isolates compared; no benchmarks.

## Module 06: Delegation and long-running work

**Core (about 90 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Justin Young, Anthropic, [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | 2025-11-26 | lab blog | 15 min | The progress file, git as memory, a routine for each session |
| 2 | Prithvi Rajasekaran, Anthropic Labs, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) | 2026-03-24 | lab blog | 25 min | Planner, generator and evaluator; what was removed later, and the cost |
| 3 | Cara Phillips et al., Anthropic, [Multi-agent coordination patterns](https://claude.com/resources/articles/multi-agent-coordination-patterns), with Walden Yan, Cognition, [Multi-Agents: What's Actually Working](https://cognition.com/blog/multi-agents-working) | 2026-04-10, 2026-04-22 | lab blog, vendor blog | 35 min | Both sides of the multi-agent debate. The first page states a 19-minute read |
| 4 | Barry Zhang, Keith Lazuka, Mahesh Murag, Anthropic, [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) | 2025-10-16 | lab blog | 15 min | Progressive disclosure: a description always, the body on demand |

**Optional**

- Nicholas Carlini, Anthropic, [Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler), 2026-02-05, lab blog, 20 min. Parallel agents over git with tests as the judge. Core in module 10.
- Geoffrey Huntley, [Ralph Wiggum as a "software engineer"](https://ghuntley.com/ralph/), 2025-07-14, practitioner post, 10 to 12 min. The loop that restarts with fresh context.
- Hadfield et al., Anthropic, [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system), 2025-06-13, lab blog, 20 to 25 min. An orchestrator with workers, and what it costs in tokens.
- Cara Phillips et al., Anthropic, [Building multi-agent systems: When and how to use them](https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them), 2026-01-23, lab blog, 12 min.
- Walden Yan, Cognition, [Don't Build Multi-Agents](https://cognition.com/blog/dont-build-multi-agents), 2025-06-12, vendor blog, 12 min. The original argument that the 2026 post narrows.
- Claude Code docs: [Create custom subagents](https://code.claude.com/docs/en/sub-agents), 20 to 25 min; [Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams), 20 min (experimental); [Checkpointing](https://code.claude.com/docs/en/checkpointing), 8 min; [Skills](https://code.claude.com/docs/en/skills), 20 min.
- Armin Ronacher, [The Coming Loop](https://lucumr.pocoo.org/2026/6/23/the-coming-loop/), 2026-06-23, practitioner post, 10 min. Where harness-level loops work and where they erode understanding.
- Addy Osmani, [Software Factories, Light and Dark](https://addyosmani.com/blog/software-factories/), 2026-07-20, practitioner post, 15 min. Verification as the bottleneck.
- Shinn et al., [Reflexion](https://arxiv.org/abs/2303.11366), 2023-03-20, paper, about 1 hour. Feedback in words, kept for the next attempt.

## Module 07: Observability and evals

**Core (about 100 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Mikaela Grace et al., Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 2026-01-09 | lab blog | 25 min | The vocabulary, the two pass-rate measures, a starter suite |
| 2 | Hamel Husain and Shreya Shankar, [AI Evals: Everything You Need to Know](https://hamel.dev/blog/posts/evals-faq/), the parts on error analysis and on validating a model judge | 2026-09-18 | practitioner FAQ | 25 min | Read traces first; label pass or fail; check the judge against people. The full page is 60 to 90 min |
| 3 | Gian Segato, Anthropic, [Quantifying infrastructure noise in agentic coding evals](https://www.anthropic.com/engineering/infrastructure-noise), with Anthropic, [A statistical approach to model evaluations](https://www.anthropic.com/research/statistical-approach-to-model-evals) | 2026-02-05, 2024-11-19 | lab blog | 25 min | How large the noise is, and how to report an interval |
| 4 | Claude Agent SDK docs, [Observability with OpenTelemetry](https://code.claude.com/docs/en/agent-sdk/observability), with Steve Kearns, aaif.io, [Agent observability: what to track first](https://aaif.io/blog/agent-observability-what-to-track-first) | undated, 2026-08-11 | docs, practitioner post | 25 min | A run as a tree of spans; the first six things to log |

**Optional**

- Liu and Han, [What Does a Harness Buy? Tokens, Mostly](https://arxiv.org/abs/2610.04433), and Vivek Trivedy, LangChain, [Improving Deep Agents with harness engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering). Both are core in module 11; reading them here shows what this module's tools are for.
- Hamel Husain, [A Field Guide to Rapidly Improving AI Products](https://hamel.dev/blog/posts/field-guide/), 2025-03-24, practitioner post, 20 min. Error analysis as the loop.
- Zhang et al., [Stop Comparing LLM Agents Without Disclosing the Harness](https://arxiv.org/abs/2605.23950), 2026-05-07, preprint, 45 min.
- OpenAI, [Why SWE-bench Verified no longer measures frontier coding capabilities](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/), 2026-02-23, lab blog, 15 min; and Epoch AI, [SWE-bench Verified benchmark review](https://epoch.ai/benchmarks/swe-bench-verified/review), reviewed 2026-09-03, 10 min. How a benchmark stops measuring what it claims.
- Merrill et al., [Terminal-Bench](https://arxiv.org/abs/2601.11868), 2026-01-17, paper, 40 min; and the [leaderboard](https://www.tbench.ai/), which reports agent and model together with intervals. Numbers go stale quickly.
- Kapoor et al., [Holistic Agent Leaderboard](https://arxiv.org/abs/2510.11977), 2025-10-13, paper, 50 min, with the [leaderboard](https://hal.cs.princeton.edu/); and Kapoor et al., [AI Agents That Matter](https://arxiv.org/abs/2407.01502), 2024-07-01, paper, 40 min. Cost-aware evaluation.
- Yao et al., [tau-bench](https://arxiv.org/abs/2406.12045), 2024-06-17, paper, 30 min. Grading the end state; where "passes every time" was first measured.
- Kwa, West et al., METR, [Measuring AI Ability to Complete Long Software Tasks](https://arxiv.org/abs/2503.14499), 2025-03-18, paper, 40 min.
- Runners to try: [Inspect](https://inspect.aisi.org.uk/) (UK AI Security Institute, about 30 min for the basics), [Harbor](https://docs.harborframework.com/) (20 min), [promptfoo](https://www.promptfoo.dev/docs/intro/) (10 min). Commercial platforms with good concept pages: [Braintrust](https://docs.braintrust.dev/evaluate), [LangSmith](https://docs.langchain.com/langsmith/evaluation-concepts).
- OpenAI docs, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), undated, 10 min.
- Claude Code docs, [Monitoring](https://code.claude.com/docs/en/monitoring-usage), 40 min, reference; OpenTelemetry, [Generative AI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/), advanced; on 2026-11-21 the page said these conventions have moved to the repository `open-telemetry/semantic-conventions-genai`.

## Module 08: Anatomy of a production harness

**Core (about 100 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Claude Code docs, [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | undated | docs | 15 min | The loop, the window, checkpoints and permission modes, as the product names them |
| 2 | Claude Agent SDK docs, [Overview](https://code.claude.com/docs/en/agent-sdk/overview) and [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) | undated | docs | 35 min | The same harness as a library |
| 3 | Michael Bolin, OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/), again | 2026-01-23 | lab blog | 10 min | A second production harness to compare by function |
| 4 | Lance Martin, Gabe Cemaj, Michael Cohen, Anthropic, [Scaling Managed Agents: Decoupling the brain from the hands](https://anthropic.com/engineering/managed-agents) | 2026-04-08 | lab blog | 20 min | Loop, tool execution and session as three separate parts |
| 5 | SWE-agent team, [mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent), the default agent | undated | code | 20 to 30 min | A whole harness small enough to read |

**Optional**

- Celia Chen, OpenAI, [Unlocking the Codex harness: how we built the App Server](https://openai.com/index/unlocking-the-codex-harness), 2026-02-04, lab blog, 20 min, advanced. One harness behind several front ends.
- Mario Zechner, [pi-mono](https://github.com/badlogic/pi-mono), code, about 2 hours for the loop and the tools. A TypeScript harness to read once yours exists.
- Claude Code docs, [Run Claude Code programmatically](https://code.claude.com/docs/en/headless), undated, 20 min.
- OpenAI Codex docs, for the comparison table: [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md), 8 min; [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents), 10 min; [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode), 10 min.
- Large open-source harnesses, as reference rather than reading: [openai/codex](https://github.com/openai/codex), [OpenCode](https://github.com/anomalyco/opencode), [OpenHands](https://github.com/OpenHands/OpenHands).

## Module 09: Guides, the feedforward side

**Core (about 100 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Birgitta Böckeler, [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html), the sections on feedforward, the steering loop and harness templates | 2026-04-02 | practitioner article | 15 min | What a guide is, and how guides are steered |
| 2 | Ryan Lopopolo, OpenAI, [Harness engineering](https://openai.com/index/harness-engineering/), the parts on the instruction file as a map and the repository as system of record | 2026-02-11 | lab blog | 10 min | A short file that points to deeper documents |
| 3 | Claude Code docs, [Best practices](https://code.claude.com/docs/en/best-practices) and [Memory](https://code.claude.com/docs/en/memory) | undated | docs | 45 min | The vendor's own rules for instruction files, including what to stop doing |
| 4 | Gloaguen et al., [Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?](https://arxiv.org/abs/2602.11988), the abstract, results and limitations | 2026-02-12 | preprint | 15 min | Measured: little gain in success, higher cost. Only the abstract was read in the research pass |
| 5 | Claude Code docs, [Skills](https://code.claude.com/docs/en/skills) | undated | docs | 20 min | The file format the lab's skill uses |

**Lab reference:** Claude Code docs, [Run Claude Code programmatically](https://code.claude.com/docs/en/headless), for the with-and-without runs.

**Optional**

- Mitchell Hashimoto, [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey), 2026-02-05, 10 to 20 min. Core in module 11.
- Kyle, HumanLayer, [Skill Issue: Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents), 2026-03-12, vendor post, 15 min. Core in module 10.
- [AGENTS.md](https://agents.md), the open format's site, 5 min; OpenAI Codex docs, [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md), 8 min.
- Anthropic docs, [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview), undated, 15 min.

## Module 10: Sensors, the feedback side

**Core (about 95 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Birgitta Böckeler, [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html), the sections on feedback, computational and inferential controls, timing and the regulation categories | 2026-04-02 | practitioner article | 15 min | The vocabulary of sensors |
| 2 | Ryan Lopopolo, OpenAI, [Harness engineering](https://openai.com/index/harness-engineering/), the parts on lint messages and clean-up agents | 2026-02-11 | lab blog | 10 min | Checks whose messages are written for the agent |
| 3 | Claude Code docs, [Hooks guide](https://code.claude.com/docs/en/hooks-guide), hands-on | undated | docs | 25 min | Feeding a failure back while the agent is still working |
| 4 | Prithvi Rajasekaran, Anthropic Labs, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps), the generator and evaluator split | 2026-03-24 | lab blog | 10 min | A separate judge, and why self-review is lenient |
| 5 | Nicholas Carlini, Anthropic, [Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler) | 2026-02-05 | lab blog | 20 min | Tests as the judge for many agents at once, with numbers and limits |
| 6 | Kyle, HumanLayer, [Skill Issue: Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents) | 2026-03-12 | vendor post | 15 min | Back-pressure; checks that are silent on success |

**Optional**

- Simon Willison, [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/), started 2026-02-23, guide, 3 to 4 hours for all chapters. For this module: the chapters on red and green tests, running the tests first, and manual testing by the agent.
- Walden Yan, Cognition, [Multi-Agents: What's Actually Working](https://cognition.com/blog/multi-agents-working), 2026-04-22. The generator and verifier pattern, from module 06.
- John Hughes, Anthropic, [How we built Claude Code auto mode](https://www.anthropic.com/engineering/claude-code-auto-mode), 2026-03-25. From module 05: read it again as an inferential sensor with a measured miss rate.
- Claude Code docs, [Hooks reference](https://code.claude.com/docs/en/hooks), 40 min, reference.
- Geoffrey Huntley, [Ralph Wiggum as a "software engineer"](https://ghuntley.com/ralph/), 2025-07-14, 10 to 12 min. Back-pressure in a restart loop.

## Module 11: Measuring and improving a harness

**Core (about 95 minutes)**

| # | Source | Date | Type | Time | What it teaches |
|---|---|---|---|---|---|
| 1 | Vivek Trivedy, LangChain, [Improving Deep Agents with harness engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering) | 2026-02-17 | vendor blog | 15 min | A method to copy (read traces, change the harness), and a large gain with the model fixed. Self-reported |
| 2 | Yangze Liu and Zhongyi Han, [What Does a Harness Buy? Tokens, Mostly](https://arxiv.org/abs/2610.04433) | 2026-10-03, revised 2026-11-18 | preprint | 40 min | The counterweight: gaps of a few points, close to rerun noise, with large cost differences |
| 3 | Prithvi Rajasekaran, Anthropic Labs, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps), what was removed | 2026-03-24 | lab blog | 10 min | Components encode assumptions about the model, and assumptions expire |
| 4 | Mitchell Hashimoto, [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey) | 2026-02-05 | practitioner post | 15 min | The habit: fix the harness after each repeated mistake |
| 5 | Addy Osmani, [Agent Harness Engineering](https://addyosmani.com/blog/agent-harness-engineering/) | 2026-04-19 | practitioner synthesis | 15 min | The ratchet, and the case that harness work moves and does not shrink. A digest: one of its attributions conflicts with the dated record |

**Optional**

- Han Lee, [Hidden Technical Debt of AI Systems: Agent Harness](https://leehanchung.github.io/blogs/2026/05/08/hidden-technical-debt-agent-harness/), 2026-05-08, practitioner critique, 15 min. What a harness costs to keep.
- Zhang et al., [Stop Comparing LLM Agents Without Disclosing the Harness](https://arxiv.org/abs/2605.23950), 2026-05-07, preprint, 45 min. The case that harness choice is a hidden variable.
- Lilian Weng, [Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/), 2026-07-04, essay, about 90 min. Optimising a harness automatically.
- Anthropic, [An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem), 2026-04-23, 10 min. A regression caused by harness changes.
- Hamel Husain, [A Field Guide to Rapidly Improving AI Products](https://hamel.dev/blog/posts/field-guide/), 2025-03-24, 20 min.
- The sceptical minority view, weakly sourced and self-interested: Fabio Akita, [Hot Take: Harness, Loop Engineering, Graph Engineering Are Bullshit](https://akitaonrails.com/en/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-are-bullshit/), 2026-08-18, opinion, 15 min. Read it to practise answering it.

## Module 12: Capstone

Nothing new is required. Re-read before the design:

- Anthropic, [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): is an agent the right shape for the task?
- Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents): the starter suite.

Useful while building: the Agent SDK [overview](https://code.claude.com/docs/en/agent-sdk/overview), [Observability](https://code.claude.com/docs/en/agent-sdk/observability) and [Run Claude Code programmatically](https://code.claude.com/docs/en/headless); the OWASP [Top 10 for Agentic Applications](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/) as a design checklist.

## Courses and books

None is required. The course is built to stand on the reading above and the labs.

- Scott Moss, master.dev, [Harness Engineering and Agent Orchestration](https://master.dev/courses/agent-harness/), 2026-07-01, course, 5 h 05 min. Builds a harness in TypeScript. It was not audited in the research pass, and it builds what Part B asks you to build: use it after Part B, or sample the preview.
- Anthropic, [Anthropic Academy](https://academy.claude.com/courses), courses, 45 minutes to 9 hours each. Vendor-authored and current. The tool-use course covers strict tool use (tool input that matches a JSON schema), which no reading above treats in depth.
- Andrew Ng, DeepLearning.AI, [Agentic AI](https://www.deeplearning.ai/courses/agentic-ai/), updated 2026-10-30, course, 9 h 55 min. Patterns (reflection, tool use, planning, multi-agent), not coding-agent harnesses.
- walkinglabs, [Learn Harness Engineering](https://github.com/walkinglabs/learn-harness-engineering), updated August 2026, free course, 14 lectures. A second syllabus to compare this one with.
- Paid, not sampled: Udacity, [Harness Engineering with Claude and Claude Code](https://www.udacity.com/course/claude-harness-engineering--cd15315) (updated 2026-11-11, 12 hours); Ian Johnson, Leanpub, [Harness Engineering (The Course)](https://leanpub.com/c/harness-engineering) (updated 2026-11-03, 62 lessons).
- Chip Huyen, [AI Engineering: Building Applications with Foundation Models](https://www.oreilly.com/library/view/ai-engineering/9781098166298/), O'Reilly, 2025, book. General, and written before coding agents changed the practice: chapter 2 for how models work, chapters 3 and 4 for evaluation, chapter 6 for agents. Chapter contents beyond the titles were not verified.

## Staying current

The vocabulary moved within a year, so dates matter: use 2026 essays for terms and the 2024 and 2025
lab posts for the underlying patterns. A short list of primary feeds beats aggregators:

- [Anthropic Engineering](https://www.anthropic.com/engineering)
- OpenAI's posts on Codex and its harness, at <https://openai.com/index/>
- Birgitta Böckeler's articles on <https://martinfowler.com/>
- [Simon Willison's weblog](https://simonwillison.net/)
- [Lilian Weng's blog](https://lilianweng.github.io/) (infrequent, long)
- [Latent Space](https://latent.space/), for conference coverage

## Leads, not verified

Known from search results or from a single abstract. Not to be cited as fact, and not yet reading-list
items. Check them when the module they belong to is started.

- Andrej Karpathy, the talks "Intro to Large Language Models" (about 1 hour) and "Deep Dive into LLMs like ChatGPT" (about 3.5 hours): training, why models make things up, how a chat model is made. Both are listed on <https://karpathy.ai/>, but neither video page could be read, so their dates and lengths are unverified. They would extend the fundamentals path. Module 01.
- Two disagreeing notes on whether "Agentic Harness Engineering" (arXiv 2604.25850) was fetched; treat its reported benchmark gain as second-hand. Module 11.
- Survey and source-code studies of harnesses, abstract only: arXiv 2606.20683 and arXiv 2609.00006. Neither is one of the two papers under "Survey papers" above. Modules 00 and 08.
- Evan Miller, "Adding Error Bars to Evals" (arXiv 2411.00640): the paper behind the statistics post in module 07; only the summary page was fetched.
- SWE-bench Pro, the "scaffold effect" paper listed at ICML 2026, and other harness-comparison results that appeared only as search snippets. Module 07.
- Shreya Shankar and Hamel Husain, "Evals for AI Engineers" (O'Reilly): surfaced by search, not fetched. Module 07.
- A Thoughtworks podcast on harness engineering, and Dex Horthy's talk on why software factories fail (the talk page was fetched; the video was not watched). Modules 09 to 11.
- Anthropic's post on dynamic workflows in Claude Code: one researcher fetched it from a domain another researcher declined to follow. Check the domain before using it. Module 06.
