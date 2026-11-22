# Module 08: Anatomy of a production harness

**Part:** C. Engineer the environment · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

How do production harnesses solve what `mini-harness` solves?

## Why it matters

You have built every layer once, in small. Now you read Claude Code and one other harness as an
engineer who knows what each part is for. This is the bridge from building a harness to shaping an
existing one, and it produces the inventory that modules 09 to 11 work on.

## You can...

- name, for each layer of `mini-harness`, the matching feature of Claude Code and where it is
  documented;
- point out three problems a production harness solves that yours does not;
- read a small open-source harness and find its loop, its tools and its context handling;
- list every part of your own set-up, with what it costs and what it is for.

## Mental models

No new cards. Revisit all of Part B's cards and add to "My version" (in `private/mental-models/`) where a production harness
differs from what you built.

## Theory primer

- **The same layers, hardened.** Loop, tools, context handling, permissions, sandbox, hooks,
  sub-agents, skills, memory, tracing. Each exists in Claude Code under a documented name.
- **What production adds:** streaming, cancellation, retries, cost limits, resumable sessions,
  configuration at several levels, and a great deal of care about the prompt cache.
- **Product, SDK, service.** Claude Code is a harness you configure. The Agent SDK is the same
  harness as a library. A managed agent service runs the loop for you and separates the "brain" (the
  loop), the "hands" (where tools run) and the session (durable state).
- **Small harnesses are the best reading.** A few hundred lines of someone else's loop teach more
  than a description of a large one.
- **Vendors differ in names more than in parts.** Compare by function, not by vocabulary.

## Read

**Core (about 100 minutes):**

1. Claude Code docs, "How Claude Code works". <https://code.claude.com/docs/en/how-claude-code-works>
2. Claude Agent SDK docs, the overview and "How the agent loop works".
   <https://code.claude.com/docs/en/agent-sdk/overview>,
   <https://code.claude.com/docs/en/agent-sdk/agent-loop>
3. OpenAI, "Unrolling the Codex agent loop" (2026-01-23): re-read it, now as a comparison.
   <https://openai.com/index/unrolling-the-codex-agent-loop/>
4. Anthropic, "Scaling Managed Agents: Decoupling the brain from the hands" (2026-04-08): brain,
   hands and session. <https://anthropic.com/engineering/managed-agents>
5. The source of one small harness: mini-swe-agent's default agent.
   <https://github.com/SWE-agent/mini-swe-agent>

**Optional:** see module 08 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** a comparison table and an inventory.
- **Predict first**, in `private/modules/08-production-harness/notes.md`: which layer of `mini-harness` will differ most from Claude Code's version? Which
  part of your own set-up loads the most context before you type anything?
- **Outline:** fill a table with one row per layer and one column each for `mini-harness`, Claude
  Code and one open-source harness; then list your own set-up's instruction files, hooks, skills,
  agents and commands, reading configuration only.
- **Stop condition:** the table is in your private notes and every cell holds a link to a doc page or a file and line; the
  inventory is saved as `private/08-inventory.md` with one line per part saying what it is for.
- **Stretch:** use the harness's context view to record what your set-up costs in tokens before the
  first message.

The inventory describes your own set-up, so it stays in `private/`, which git ignores.

## Self-check

1. For each layer you built, what is it called in Claude Code?
2. Name three things a production harness handles that `mini-harness` does not.
3. What is the difference between Claude Code, the Agent SDK and a managed agent service?
4. In the small harness you read, where is the loop, and how does it stop?
5. Which part of your own set-up could you not place in any layer?

## Ship (optional)

Draft it in `private/writeups/`.

"I built a toy harness, then read a real one: five things I had not thought of."
