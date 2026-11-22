# Propose, decide, commit

**Module:** 00 (returns in 02, 05 and 09)

## The model in one sentence

The model only proposes; code in the harness decides; and something becomes real only when the
system commits it.

## Picture

From web work: **the model is the client, the harness is the server.**

| | In a web application | In an agent |
|---|---|---|
| Advisory | A button disabled in the UI | A rule written in the prompt or an instruction file |
| Binding | An authorisation check on the API | A check in the harness, on the path of execution |

A disabled button usually stops people. Only the server-side check holds on every request and leaves
a log entry.

Where the analogy stops: this "client" is not hostile, it is unpredictable. And the "server" also
builds everything the client sees, because the harness assembles the context.

## What it predicts

- A rule that lives only in a prompt will be broken sooner or later, more often in long sessions.
- If an action must never happen, there is a line of code you can point to that prevents it. If you
  cannot find that line, the rule is advisory.
- A refusal by the harness shows up in the conversation as an ordinary message, and the model can
  react to it: propose something else, or recommend the action to a human.

## Where it breaks

- **A harness check is only as good as what it can see.** A rule that matches command text can be
  passed by a command that does more than its text suggests. See [permission rule](05-permission-rule.md)
  and [sandbox](05-sandbox.md).
- **Not every rule can be code.** "Write clear commit messages" has no cheap check. Most of a real
  set-up stays advisory; the skill is choosing which few rules to make binding.
- **Verified is not the same as correct.** A check that the answer cites a tool that ran says
  nothing about whether the conclusion follows.

## A small experiment

Take three rules from your own instruction file, without editing it: write in the three-rules table
of `private/modules/00-orientation/notes.md`. For each, find the code that enforces it (a hook, a
permission rule, a CI check). Write "advisory" next to the ones where you find nothing.

## Sources

- The [companion book](../resources/reading-list.md#companion-book), chapter 1 (our notes on it are
  kept locally): the proposal and commitment vocabulary, advisory and binding.
- Claude Code docs, best practices: an instruction-file line usually works, a hook always runs
  (paraphrase from our research notes). <https://code.claude.com/docs/en/best-practices>
- Anthropic docs, "How tool use works": the model emits a request and your code runs the operation.
  <https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works>

## My version

Write it in `private/mental-models/00-propose-decide-commit.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
