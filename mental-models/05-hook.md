# A hook

**Module:** 05 (returns in 10)

## The model in one sentence

A hook is your code that the harness runs at a fixed point in the loop, every time, whether or not
the model would have chosen to.

## Picture

From web work: middleware. It sits on the path of every request, can stop it, change it or add to
it, and the handler cannot skip it.

```
model asks for a tool
   -> hook before the tool   (can block, and say why)
   -> the tool runs
   -> hook after the tool    (can add feedback for the model)
model is about to finish
   -> hook at stop           (can send the agent back to work)
```

## What it predicts

- A rule moved from an instruction file into a hook stops being broken, at the price of writing and
  maintaining code.
- What a blocking hook prints becomes a message to the model, so the wording matters: say what was
  wrong and what to do instead.
- A hook that fires on every tool call adds time to every step.

## Where it breaks

- **It is deterministic only if its code is.** A hook that asks a model for a verdict is a judgment
  again, with the error rate that comes with it.
- **It sees only its event.** A hook on the shell tool does not see a file written by another tool.
- **The details bite.** Which exit code blocks, what silence means, and whether hooks run inside the
  sandbox differ by harness and change between versions. Read the hooks reference before relying on
  one.

## A small experiment

Module 05 lab: add a before-tool hook to `mini-harness` that blocks writes outside the project. Then
make the hook exit with an unexpected error and see whether the write goes through.

## Sources

- Claude Code docs, "Hooks guide" and the hooks reference: hooks as deterministic control, and the
  exact blocking behaviour. <https://code.claude.com/docs/en/hooks-guide>,
  <https://code.claude.com/docs/en/hooks>

## My version

Write it in `private/mental-models/05-hook.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
