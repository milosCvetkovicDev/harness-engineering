# A harness

**Module:** 00

## The model in one sentence

An agent is a model plus a harness: everything that is not the model's weights is the harness, and
the harness is the part you can change.

## Picture

```
          +------------------- harness -------------------+
 task --> | instructions . loop . tools . context handling | --> result
          | permissions . checks . log                     |
          |                 +-------+                      |
          |                 | model |  tokens in, tokens out
          |                 +-------+                      |
          +------------------------------------------------+
```

From backend work: the model is a capable service you call over HTTP and cannot modify. The harness
is the application you write around that service. The analogy stops here: a normal service returns
the same output for the same input, and this one does not.

## What it predicts

- The same model behaves differently inside two harnesses. Claude Code and your `mini-harness` will
  disagree on the same task with the same model.
- When an agent fails, there are two places to look. Asking "model or harness?" first saves time.
- A failure that repeats can often be fixed today, in the harness, without waiting for a new model.

## Where it breaks

- **The line moves.** A coding agent ships with a harness you did not write. What you add around it
  (instruction files, hooks, skills) is a second harness around the first. Böckeler's article is about
  that outer part only.
- **The word is not used one way.** Hugging Face's glossary uses "harness" for the loop alone and
  other words for the rest. When you read a source, check which convention it uses.
- **It tempts you to blame the harness for everything.** Some failures are model limits. The evidence
  that harness work moves benchmark scores is disputed: see the
  [improvement loop](11-improvement-loop.md) card.

## A small experiment

Module 00 lab: list every part of your own Claude Code set-up and sort each one into the lab's
three boxes: model, harness (say whether the vendor's or yours) or environment. Save the list as
`private/00-inventory.md` and mark the ones you could not place.

## Sources

- Vivek Trivedy, LangChain, "The Anatomy of an Agent Harness" (2026-03-10): the model-plus-harness
  split. <https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>
- Birgitta Böckeler, "Harness engineering for coding agent users" (2026-04-02): the harness a user
  builds around an existing agent. <https://martinfowler.com/articles/harness-engineering.html>
- Hugging Face, "Harness, Scaffold, and the AI Agent Terms Worth Getting Right" (2026-05-25): the
  narrower vocabulary. Link in [the reading list](../resources/reading-list.md).

## My version

Write it in `private/mental-models/00-harness.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
