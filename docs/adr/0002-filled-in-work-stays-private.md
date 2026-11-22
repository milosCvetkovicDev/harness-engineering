# 0002: What the learner fills in stays private

- **Status:** accepted by the owner, 2026-11-22

## Context

Once the course is published, every push is public. Notes, predictions, the learning log and draft
posts say what the learner does not know yet, and some labs describe a private set-up.

## Decision

The templates are public. What the learner fills in goes to `private/`, which git ignores, at the
template's path, the capstone's to `private/capstone/`: notes, predictions and results, "My version" of each card, the glossary, the
progress log, draft posts and the capstone's documents.

Not chosen: keeping the filled-in files tracked.

## Consequences

- Lab code and fixture tasks are still committed and will be public, unless they are derived from the
  learner's set-up or a real job: those stay in `labs/private/`, ignored by the same
  rule, where code still resolves the lab packages. A catch-up's annotations are private too.
- A post enters `writeups/` only when the learner decides to publish it. The same decision is needed
  for any other piece of filled-in work, and it never overrides the privacy and publication boundaries.
- Git does not protect a tracked template from being filled in by mistake. The templates say where
  to write, and a change is read before it is staged.
- `private/` has no history and no backup in git, and it has to be copied into a fresh clone.
