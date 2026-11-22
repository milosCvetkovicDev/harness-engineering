# Module 00: Orientation and setup

**Part:** A. Foundations · **Time:** about 4 hours · **Status:** ready

## Question

What is a harness, and what are the two things people mean by "harness engineering"?

## Why it matters

A coding agent such as Claude Code, with its instruction files, hooks, skills and agents, is a large
harness. Without a map, each of those is a separate trick. With one, you can say what each part is
for, which rules are actually enforced, and where to look when the agent does the wrong thing.

## You can...

- place any part of an agent system in one of three boxes: model, harness, environment;
- tell prompt engineering, context engineering and harness engineering apart, with one example each;
- say whether a given rule is advisory or binding, and point to the code if it is binding;
- explain the two senses of "harness engineering" and which part of this course teaches which;
- run the lab environment check and explain every line it prints.

## Mental models

- [A harness](../../mental-models/00-harness.md)
- [Propose, decide, commit](../../mental-models/00-propose-decide-commit.md)

## Theory primer

**1. Three boxes.** The **model** turns tokens into tokens and nothing else. The **harness** is the
program around it: it builds the model's input, runs the tools the model asks for, enforces limits
and records what happened. The **environment** is what the tools touch: files, a shell, the network,
a database. An agent is all three working together.

**2. Three kinds of engineering.** They differ in what you change.

| | You change | Example for a coding agent that keeps breaking the build |
|---|---|---|
| Prompt engineering | the wording of one call | "Run the tests before you finish." |
| Context engineering | which information reaches the model | Load the build instructions only when a build file is touched |
| Harness engineering | how the system runs around the model | A hook runs the build after every edit and feeds failures back |

The first two are asked of the model. Only the third can be enforced.

**3. Two senses of the term.** Both are in use, and sources rarely say which they mean.

- **Building a harness:** writing the loop, the tools, the context handling, the controls. This is
  Part B, where you write `mini-harness`.
- **Engineering around an existing agent:** taking a coding agent somebody else built and shaping
  what it reads (guides) and what checks its work (sensors). This is Part C.

**4. Where the term came from.** It is recent. Per our research notes: Mitchell Hashimoto described
the practice in a post of 5 February 2026; OpenAI's post on building software with Codex followed on
11 February 2026 and gave the term its reach; LangChain's "anatomy of an agent harness" (10 March
2026) and Birgitta Böckeler's article on martinfowler.com (2 April 2026, replacing a memo of 17
February) supplied most of the vocabulary this course uses. The dates other than Böckeler's come from
page summaries; open each page and check its date before repeating them.

**5. What is disputed.** Three things, and the course returns to each:

- *How wide the word is.* For some authors the harness is everything but the model; for others it is
  only the loop.
- *How much it matters.* Vendors report large gains from harness changes with the model held fixed.
  At least one independent rerun study finds much smaller ones. Module 07 gives you the tools to
  judge such claims, module 11 makes you produce one.
- *Whether it lasts.* One view: harness parts are workarounds that better models make unnecessary.
  The other: the work moves to new problems. Both are opinions from practice.

**6. Workflow or agent.** If your code decides the sequence of model calls, it is a workflow. If the
model decides its own next step in a loop, it is an agent. Workflows are cheaper and more predictable;
reach for an agent when the steps cannot be known in advance.

## Read

**Core (about 95 minutes):**

1. Anthropic, "Building effective agents" (2024-12-19): workflows and agents, and when not to build
   an agent. <https://www.anthropic.com/engineering/building-effective-agents>
2. Vivek Trivedy, LangChain, "The Anatomy of an Agent Harness" (2026-03-10): what a harness is made
   of. <https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>
3. Birgitta Böckeler, "Harness engineering for coding agent users" (2026-04-02): the second sense,
   with guides and sensors. Read it for the map now; modules 09 and 10 come back to the detail.
   <https://martinfowler.com/articles/harness-engineering.html>
4. OpenAI, "Harness engineering: leveraging Codex in an agent-first world" (2026-02-11): the case
   study that spread the term. It is a vendor's account of its own project; read it as that.
   <https://openai.com/index/harness-engineering/>

**If you are reading the companion book:** chapter 1 belongs here. Our notes on it are kept locally
in `resources/book-notes/` and are not published.

**If you want a wider map:** two survey papers give two more definitions of "harness". Read only
their openings now, about 35 minutes together, and only after the core reading. The plan is in
[resources/paper-notes/](../../resources/paper-notes/README.md).

**Optional:** see module 00 in [the reading list](../../resources/reading-list.md).

## Lab

- **Goal:** a working lab environment, and a one-page inventory of your own set-up sorted into the
  three boxes.
- **Predict first** (write these in `private/modules/00-orientation/notes.md`, your copy of [the template](notes.md),
  before step 3):
  1. The environment check sends one short sentence as the prompt. Will the reply's `content` hold
     one block or more, and of which types?
  2. Will the request's input be closer to 10, 20 or 200 tokens?
  3. Which `stop_reason` will the reply carry?
- **Outline:**
  1. Set up the workspace: [labs/README.md](../../labs/README.md).
  2. Run `npm run test:smoke`. It needs no key and no network. Expect every test to pass (the summary ends with `fail 0`).
  3. Run `npm run smoke`. Compare each printed line with your predictions.
  4. Open `labs/00-smoke/smoke.ts` and find where the request is built. Name each field in it, in your private
     notes; do not edit the file.
  5. Inventory: list the parts of your Claude Code set-up (instruction files, settings, hooks, skills,
     agents, commands). Read configuration only, not transcripts or history. For each part, write
     which box it belongs to and what it is for. Save it as `private/00-inventory.md`.
  6. Pick three rules from your own instruction file. For each: advisory or binding? If binding,
     name the hook, permission rule or CI check that enforces it. The table is in your private notes.
- **Stop condition:** `npm run smoke` prints `OK: the lab environment works.` and exits 0;
  `private/00-inventory.md` has at least ten rows; your own one-paragraph definition of "harness" is
  in `private/modules/00-orientation/notes.md`.
- **Stretch:** read `labs/00-smoke/smoke.test.ts`. The tests never call the real API. How do they
  manage that, and why does it matter for everything you will build in Part B?

## Self-check

1. In one sentence each: what is the model, the harness, the environment?
2. The same model gives a good result in one harness and a bad one in another. Name three harness
   parts that could explain it.
3. An agent keeps committing code that does not compile. Give one fix from each of the three kinds
   of engineering.
4. What is the difference between an advisory rule and a binding one? Give one of each from your own
   set-up.
5. What are the two senses of "harness engineering", and which part of this course teaches each?
6. Someone tells you their harness change raised a benchmark score by five points. What do you ask
   before you believe it?
7. When would you build a workflow and not an agent?

## Ship (optional)

Draft it in `private/writeups/`.

"What I think a harness is, before building one": 300 words. Keep it; you will rewrite it after
module 07 and the difference is the interesting part.
