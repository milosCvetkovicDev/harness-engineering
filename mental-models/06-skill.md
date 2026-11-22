# A skill

**Module:** 06 (written in 09)

## The model in one sentence

A skill is a manual the agent opens only when it needs it: a one-line description is always loaded,
and the body and its files are read on demand.

## Picture

```
always in the window:   name + one-line description          (cheap, for every skill)
loaded when triggered:  the instructions                     (the "chapter")
read only if needed:    reference files, scripts to run      (the "appendix")
```

From web work: lazy loading. The index ships with the page; the heavy modules load when a route
needs them. This pattern is called progressive disclosure.

## What it predicts

- You can install many skills without filling the window, because only descriptions are loaded.
- A skill with a vague description never triggers. The description is the only thing the model sees
  when deciding.
- A script inside a skill costs no tokens until its output is read, so exact procedures belong in
  scripts and judgment belongs in the text.

## Where it breaks

- **Loaded means paid for.** Once a skill's body is in the window it stays there for the following
  turns.
- **Triggering is a model decision.** A skill may fire when it should not, or not fire when it
  should. If a procedure must always run, it belongs in a [hook](05-hook.md).
- **Descriptions add up.** Hundreds of skills make a long list of descriptions, and choosing between
  near-duplicates gets worse.

## A small experiment

Module 09 lab: write a `/quiz` skill. Check with the harness's context view how many tokens it costs
before it is triggered and after.

## Sources

- Anthropic, "Equipping agents for the real world with Agent Skills" (2025-10-16): progressive
  disclosure. <https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills>
- Claude Code docs, "Skills": how a skill is found and loaded. <https://code.claude.com/docs/en/skills>

## My version

Write it in `private/mental-models/06-skill.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
