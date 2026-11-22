# Module 03: Tools and tool design

**Part:** B. Build a harness · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

Why does the shape of a tool change what the agent does?

## Why it matters

Tools are the agent's hands, and their definitions are text the model reads on every call. A badly
described tool is used wrongly or not at all; a tool that returns too much crowds out the task. Most
"the agent is dumb" complaints about a custom agent turn out to be tool design.

## You can...

- write a tool definition that a model uses correctly without further help;
- validate tool input and return errors that tell the model what to do next;
- limit tool output and explain what the limit costs;
- compare two versions of a tool with a small experiment, and report counts;
- say what MCP standardises and what it does not make cheaper.

## Mental models

- [A tool definition](../../mental-models/03-tool-definition.md)
- Revisit: [a tool call](../../mental-models/01-tool-call.md),
  [a token](../../mental-models/01-token.md)

## Theory primer

- **A definition is prompt text.** Name, description and schema are all the model knows about a tool.
- **The agent-computer interface.** Tools designed for a model differ from tools designed for a
  person: fewer, more distinct, with compact output and errors that instruct.
- **Few distinct tools beat many overlapping ones.** Every definition costs tokens on every call, and
  near-duplicates make the choice harder.
- **Validate on the way in.** The model can send a call that fits the schema and still makes no
  sense. The harness checks; the error goes back as a result.
- **Limit on the way out.** Truncate, page or summarise large output, and say that you did.
- **MCP** is a standard way to connect tools to any harness. It reduces integration work. Each tool
  it brings still lands in the prompt, unless the harness loads definitions on demand.
- **Structured output** lets you require that a reply or a tool input matches a schema exactly.

## Read

**Core (about 85 minutes):**

1. Anthropic, "Writing effective tools for agents" (2025-09-11).
   <https://www.anthropic.com/engineering/writing-tools-for-agents>
2. Anthropic docs, "Define tools". <https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools>
3. Yang et al., the SWE-agent paper (2024-05-06): read the sections on the agent-computer
   interface. <https://arxiv.org/abs/2405.15793>
4. Anthropic, "Code execution with MCP" (2025-11-04): what many tools cost, and one way around it.
   <https://www.anthropic.com/engineering/code-execution-with-mcp>

**Optional:** see module 03 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** `mini-harness` gains file and shell tools with validation and output limits.
- **Predict first**, in `private/modules/03-tools/notes.md`: for one tool with a vague description and the same tool with a precise one, how
  many of ten tasks pass in each case?
- **Outline:** list, read, edit and shell tools; input validation; an output cap that reports what was
  cut; error messages that instruct; then the two-description comparison.
- **Stop condition:** the acceptance tests for lab 03 are green, and a table in
  `private/modules/03-tools/notes.md` shows the
  pass counts for both descriptions, with the number of runs per cell.
- **Stretch:** expose one tool through an MCP server and count the tokens its definition adds.

## Self-check

1. What are the three parts of a tool definition, and who reads them?
2. A tool returns 4,000 lines. Name two things you can do, and what each one costs.
3. Give an example of an error message that helps the model, and one that does not.
4. Why can adding a tool make an agent worse?
5. What does MCP standardise? What does it leave unchanged?

## Ship (optional)

Draft it in `private/writeups/`.

"One tool, two descriptions, ten tasks": the table, and what you changed.
