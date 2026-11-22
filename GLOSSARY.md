# Glossary

One line per term, in plain words. The tracked file is the public starting point: in
`private/GLOSSARY.md`, add a term when you meet it, and rewrite a definition when your
understanding changes. Terms from later modules are listed without a definition until you reach them.

## Modules 00-01

| Term | Meaning |
|---|---|
| Model (LLM) | A program that takes a sequence of tokens and predicts the next ones. Its weights do not change while you use it. |
| Agent | A model that chooses its own next step, using tools in a loop, until the task is done or a limit is hit. |
| Workflow | A fixed sequence of model calls decided by your code, not by the model. |
| Harness | Everything around the model that makes it an agent: the loop, tools, context handling, permissions, checks, logging. |
| Harness engineering | (1) Building a harness. (2) Shaping the environment around an existing agent: what it reads and what checks its work. |
| Prompt engineering | Improving the instruction text of a single model call. |
| Context engineering | Deciding which information is in the model's input at each step. |
| Token | The unit a model reads and writes: a piece of a word. Cost and limits are counted in tokens. |
| Context window | Everything the model can see in one call: system prompt, tool definitions, messages, tool results. It has a maximum size. |
| Stateless | The model keeps nothing between calls. Your code resends the whole conversation every time. |
| System prompt | Instructions sent with every call, separate from the conversation. |
| Message | One turn in the conversation, from the `user` or the `assistant`, made of content blocks. |
| Content block | A typed piece of a message: `text`, `thinking`, `tool_use`, `tool_result`. |
| Tool | A function your code offers to the model, described by a name, a description and an input schema. |
| Tool call (`tool_use`) | The model's request that your code run a tool with given input. The model runs nothing itself. |
| Tool result (`tool_result`) | What your code sends back after running the tool, including errors. |
| Stop reason | Why the model stopped producing output: it finished, it wants a tool, it hit a limit, or it declined. |
| Thinking | Reasoning the model writes before its answer. It is billed as output and counts toward the window. |
| Effort | A request setting for how much reasoning the model spends on a call. |
| Prompt cache | A discount for resending an unchanged beginning of a request. It matches from the start, exactly. |
| Proposal | A model output before anything has acted on it (term from the companion book). |
| Commitment | The moment a proposal gets consequences: an action runs, state changes, a result is accepted. |
| Advisory rule | A rule written in the prompt or an instruction file. The model usually follows it. |
| Binding rule | A rule enforced by code on the path of execution. It holds on every run. |

## Later modules

- **02:** agent loop, turn, step limit, dependency injection, scripted model.
- **03:** tool schema, tool registry, agent-computer interface, MCP, structured output.
- **04:** attention budget, context rot, compaction, clearing, retrieval, memory file.
- **05:** permission mode, allow / ask / deny, sandbox, hook, prompt injection, lethal trifecta, audit log.
- **06:** sub-agent, orchestrator, plan tool, checkpoint, resume, skill, progressive disclosure.
- **07:** trace, span, task, trial, grader, pass@k, pass^k, standard error, paired comparison.
- **08:** permission system, session, managed agent, agent SDK.
- **09:** guide (feedforward), instruction file, `CLAUDE.md`, `AGENTS.md`.
- **10:** sensor (feedback), computational and inferential control, back-pressure.
- **11:** baseline, rerun noise, ablation, ratchet, assumption expiry.
