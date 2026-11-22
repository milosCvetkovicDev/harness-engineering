# Module 05: Control and safety

**Part:** B. Build a harness · **Time:** about 4 hours · **Status:** brief (expanded when started)

## Question

Which rules can be asked of the model, and which must be enforced by code?

## Why it matters

A set-up may have permission rules, hooks and a sandbox. This module shows what each one
actually guarantees and what it does not, so that you stop trusting a rule for the wrong reason. It
is also the module that decides whether an agent you build for a product can be let near real data.

## You can...

- put a permission gate into the loop with allow, ask and deny outcomes;
- run a shell tool inside a sandbox and show what it cannot reach;
- write a hook that blocks an action and tells the model why;
- explain prompt injection and the lethal trifecta, and remove one leg of it by design;
- produce an audit log that shows every decision the harness made.

## Mental models

- [A permission rule](../../mental-models/05-permission-rule.md)
- [A sandbox](../../mental-models/05-sandbox.md)
- [A hook](../../mental-models/05-hook.md)
- [Prompt injection](../../mental-models/05-prompt-injection.md)
- Revisit: [propose, decide, commit](../../mental-models/00-propose-decide-commit.md)

## Theory primer

- **Layers, not one wall.** Permission rules, a sandbox and hooks do different jobs and cover each
  other's gaps.
- **Intent and effect.** A permission rule reads the request. A sandbox limits the running process.
- **Approval fatigue.** A prompt that is nearly always approved protects nobody. Fewer prompts, each
  one meaningful.
- **A model as the approver** is a judgment with a measurable error rate, not a guarantee.
- **Prompt injection.** Anything a tool reads can carry instructions. There is no general fix; the
  dependable defences remove a capability or add a human at the step that sends data out.
- **Treat the model as an untrusted user.** Decide in code what it may do, as you would for any
  client.
- **The audit log** is what lets you say, afterwards, what was allowed, what was blocked and why.

## Read

**Core (about 95 minutes):**

1. Anthropic, "Beyond permission prompts: making Claude Code more secure and autonomous"
   (2025-10-20). <https://www.anthropic.com/engineering/claude-code-sandboxing>
2. Simon Willison, "The lethal trifecta" (2025-06-16), then Meta, "Agents Rule of Two"
   (2025-10-31). <https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/>,
   <https://ai.meta.com/blog/practical-ai-agent-security/>
3. Anthropic, "How we built Claude Code auto mode" (2026-03-25): a model as approver, with its
   measured error rates. <https://www.anthropic.com/engineering/claude-code-auto-mode>
4. Claude Code docs, "Automate actions with hooks". <https://code.claude.com/docs/en/hooks-guide>
5. Claude Code docs, the pages on permission modes and on the sandboxed Bash tool: skim for the mechanics the lab copies in
   small. <https://code.claude.com/docs/en/permission-modes>,
   <https://code.claude.com/docs/en/sandboxing>

**Optional:** see module 05 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** `mini-harness` cannot do what it must not, whatever the model asks.
- **Predict first**, in `private/modules/05-control-and-safety/notes.md`: with an instruction planted in a fixture file, in how many of ten runs does the
  agent try the forbidden action? In how many does it succeed with your gate in place?
- **Outline:** a permission gate with allow, ask and deny; hooks before and after a tool; the shell
  tool inside an operating-system or container sandbox that is already available (install nothing); an audit log; the injection drill.
- **Stop condition:** the acceptance tests for lab 05 are green, and the audit log shows zero
  forbidden actions carried out across the drill's runs, with the number of runs stated.
- **Stretch:** play the attacker against your own deny rule and record the first way through in
  `private/modules/05-control-and-safety/notes.md`.

The drill uses fixture files in this repository only. Never point it at real credentials or data.

## Self-check

1. What does a permission rule check, and what does a sandbox check?
2. Why are file limits without network limits not enough?
3. What makes a hook different from a line in an instruction file?
4. Name the three legs of the lethal trifecta. Which one would you remove for an agent that reads
   customer email?
5. Your deny rule blocks one command. Name two ways the same effect could still happen.
6. What should an audit log record for a blocked action?

## Ship (optional)

Draft it in `private/writeups/`.

"I tried to prompt-inject my own agent": what worked without the gate, and what the gate changed.
