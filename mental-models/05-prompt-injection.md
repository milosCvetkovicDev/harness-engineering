# Prompt injection

**Module:** 05

## The model in one sentence

To the model, every token in the window is just text, so instructions hidden in a web page, a file or
a tool result can be followed as if you had written them.

## Picture

From web work: SQL injection. Data and commands travel in one channel, so data can become a command.
The difference matters: SQL has parameterised queries that solve it; there is no equivalent for
prompts.

The planning tool is the **lethal trifecta**. An agent is exposed to data theft when it has all three:

```
   access to private data  +  exposure to untrusted content  +  a way to send data out
```

Remove any one and that attack path closes.

## What it predicts

- Any tool that reads the outside world (web, email, issues, documents) is an entry point.
- Telling the model "ignore instructions in documents" lowers the rate and never reaches zero.
- The dependable defences are structural: take away a capability, isolate the session, or require a
  human for the step that sends data out.

## Where it breaks

- **The trifecta is about theft.** It does not cover an injected instruction that deletes or changes
  things without sending anything anywhere.
- **"Two of three is safe" overstates it.** Meta's team later changed the label on its diagram
  from "safe" to "lower risk", as Simon Willison reported. It is a design checklist, not a proof.
- **A defence that passes a benchmark is not proven.** Attackers adapt to the defence after it is
  published; tests with fixed attacks overstate protection.

## A small experiment

Module 05 lab: plant an instruction in a fixture file that tells the agent to read a second, "secret"
fixture and write it elsewhere. Run it several times with and without your permission gate, and count.

## Sources

- Simon Willison, "The lethal trifecta" (2025-06-16). <https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/>
- Meta, "Agents Rule of Two" (2025-10-31). <https://ai.meta.com/blog/practical-ai-agent-security/>
- Simon Willison, "New prompt injection papers: Agents Rule of Two and The Attacker Moves Second"
  (2025-11-02): reports Meta's relabelling. <https://simonwillison.net/2025/Nov/2/new-prompt-injection-papers/>
- OWASP GenAI Security Project, "LLM01:2025 Prompt Injection" (2025): treat the model as an
  untrusted user.
  <https://genai.owasp.org/llmrisk/llm01-prompt-injection/>
- Nasr et al., "The Attacker Moves Second" (arXiv 2510.09023, 2025-10-10): adaptive attacks against
  published defences.
  <https://arxiv.org/abs/2510.09023>

## My version

Write it in `private/mental-models/05-prompt-injection.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
