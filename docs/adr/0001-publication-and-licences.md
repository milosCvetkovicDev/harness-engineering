# 0001: Publish as a new repository, with two licences

- **Status:** accepted by the owner, 2026-11-22

## Context

The course is to be public and readable like a book. A private repository's history and pull-request
refs keep every earlier version of every file, so switching it to public would publish those too. A
public repository also needs to say what others may do with its text and its code.

## Decision

1. The private working repository stays private and is renamed. A new public `harness-engineering`
   repository starts from one fresh commit of the final tree.
2. The text is licensed under CC BY 4.0 and the code under MIT. The Licence section of
   [README.md](../../README.md) says which is which.
3. Before publication some personal details were taken out of the documents. The design and the plan
   carry dated notes about it.

Not chosen: switching the existing repository to public, or publishing its `main` with history; a
single licence for everything, or none.

## Consequences

- The new repository takes the old name, so the old URL will mean the public one. After the rename
  and before the new repository is created, `origin` of every clone of the private repository is set
  to the renamed URL and read back with `git remote -v`. Worktrees share their clone's setting.
- The public repository has none of the earlier history, pull requests or CI runs.
- The first commit is made with the GitHub noreply address set in that new repository, and its
  author and committer are checked before the push. Every fresh clone needs the same setting.
- Work continues in a fresh clone of the public repository. The private repository's clones never
  push to it.
- What is published under either licence cannot be withdrawn from those who already received it.
