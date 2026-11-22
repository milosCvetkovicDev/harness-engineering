# A permission rule

**Module:** 05

## The model in one sentence

A permission rule is a check on what the agent says it is about to do: the harness compares the
requested tool call with a list and answers allow, ask or deny before anything runs.

## Picture

```
model asks: run_shell("rm -rf build/")
                |
        +-------v--------+
        | permission gate|  deny list? -> refuse
        | (reads the     |  allow list? -> run
        |  request text) |  otherwise  -> ask a human
        +----------------+
```

From web work: route-level authorisation. It runs before the handler and decides from the request.

## What it predicts

- A denied call comes back to the model as a message, and the model will often try another route to
  the same goal.
- If people are asked too often, they approve without reading. Fewer, better prompts are safer than
  many.
- An allow rule is a convenience. It tells you what will not be asked about, not what is safe.

## Where it breaks

- **It checks intent, not effect.** A rule that matches the command text does not know what the
  command does when it runs. A script the agent wrote a minute ago passes a rule that allows running
  scripts. Limiting effect is the [sandbox](05-sandbox.md)'s job.
- **A model can be the approver.** Some harnesses let a second model decide instead of a person. That
  moves the judgment; it does not make it certain. Published miss rates for such classifiers are
  well above zero.
- **A rule only covers the tools it names.** An action that reaches the same result through another
  tool is not covered.

## A small experiment

Module 05 lab: write a deny rule for one command. Then, playing the attacker, find a second way to
get the same effect that your rule does not match.

## Sources

- Claude Code docs, "Sandboxing" and "Permission modes": rules are evaluated on the request before it
  runs; the sandbox limits the running process. <https://code.claude.com/docs/en/sandboxing>,
  <https://code.claude.com/docs/en/permission-modes>
- Anthropic, "How we built Claude Code auto mode" (2026-03-25): approval fatigue, and measured error
  rates of a model-based approver. <https://www.anthropic.com/engineering/claude-code-auto-mode>

## My version

Write it in `private/mental-models/05-permission-rule.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
