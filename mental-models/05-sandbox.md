# A sandbox

**Module:** 05

## The model in one sentence

A sandbox limits what a running process can reach, whatever the command claimed it would do: it is a
wall around the effect, where a permission rule is a question about the intent.

## Picture

```
            +------------- sandbox -------------+
 command -> | may write:  the project folder    |
            | may read:   most of the machine   |
            | network:    a short list of hosts |
            +-----------------------------------+
   enforced by the operating system, not by the harness asking nicely
```

From backend work: a container with a read-only root, one mounted volume and an egress allow-list.

## What it predicts

- Inside the walls the agent can be left to work without a prompt for every command.
- A command that tries to write outside the allowed folders fails, even though no rule ever
  mentioned that command.
- Reads are another matter. By default Claude Code's sandbox lets a command read most of the
  machine, `~/.ssh` included, until a setting denies those paths. Writes are what it confines.
- File limits without network limits are not enough, and the reverse: an agent that can read
  secrets and reach the internet can send them out.

## Where it breaks

- **Walls have doors.** Excluded commands, tools that run outside the sandbox, and an "allow this
  once without the sandbox" option are all ways through. Read which ones your harness has. In
  Claude Code the built-in file tools are among them: they follow permission rules, not the sandbox,
  so a sandbox entry that denies a read does not stop the Read tool.
- **Isolation strength differs.** A process-level sandbox shares the host's kernel; a virtual
  machine does not. Which you need depends on what you are protecting against.
- **A sandbox does not judge.** Deleting every file inside the allowed folder is permitted. It limits
  the damage; it does not make the action right.

## A small experiment

Module 05 lab: run the shell tool inside an operating-system or container sandbox that is already available (install nothing), and ask the agent to
write a file outside the project, then to read one there. Predict what the model sees each time and
what it does next.

## Sources

- Anthropic, "Beyond permission prompts: making Claude Code more secure and autonomous" (2025-10-20):
  why file and network isolation are needed together. <https://www.anthropic.com/engineering/claude-code-sandboxing>
- Claude Code docs, "Configure the sandboxed Bash tool": the defaults for reads, writes and the
  network, and which tools run outside the sandbox.
  <https://code.claude.com/docs/en/sandboxing>

## My version

Write it in `private/mental-models/05-sandbox.md`, not here: this card is public.
What the experiment above asks you to record goes in the module's private notes, or in the file
its lab names.
