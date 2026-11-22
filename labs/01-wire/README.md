# Lab 01: the wire

You call the model by hand until nothing about a tool call is mysterious, then do the same in
TypeScript. Module brief: [modules/01-model-interface](../../modules/01-model-interface/README.md).

There is no acceptance test here. The work is the six predictions in your copy of the module's notes,
`private/modules/01-model-interface/notes.md`: write
each one **before** you run its step.

Everything this lab asks you to note, guess, compare or put in a table goes in that same private file.
Its path starts at the repository root, not in `labs/`.

## Before you start

Run everything from `labs/`. Load the key and the model name into the shell:

```bash
set -a; . ./.env; set +a          # exports ANTHROPIC_API_KEY from labs/.env
MODEL=$(npm run -s model)          # the model the labs use, from lib/config.ts
mkdir -p 01-wire/.runs             # responses go here; the folder is gitignored
```

This lab is about the raw request, so the key travels in plain sight: it sits in this shell's
environment, and the `curl` commands below put it on their own command line, where any other
process on the machine can read it while the command runs. That is acceptable on a machine only you
use. Elsewhere, `curl` can read a header from a file instead (`-H @file`); see its manual.

The shell reads `labs/.env` more strictly than `npm run smoke` does. Write the key line exactly as
`ANTHROPIC_API_KEY=` followed by the key, with no space on either side of `=`, no quotes, and Unix
line endings. A space after `=` makes the shell run the key as a command, which prints it in the
terminal and leaves the variable empty. Check before the first call: `test -n "$ANTHROPIC_API_KEY"
&& echo loaded` prints `loaded` and nothing else.

The first line exports the file's values into this shell, and an exported value wins over the same
line in `labs/.env` when an `npm run` script starts. After you edit `labs/.env`, run that line again
or open a new shell, or the scripts keep using the old key or model.

Every step sends real requests and costs a little. Step 6 sends a large request three times and is
the most expensive part of the lab; check the pricing page of the docs if you want the figure.

## Part 1: by hand, with `curl`

You are the harness. The model only ever sees what you put in the request.

### Step 1. A plain message

This first request is given in full. Every later one is yours to write.

```bash
curl -s https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -d "$(jq -n --arg model "$MODEL" '{
        model: $model,
        max_tokens: 16000,
        messages: [{role: "user", content: "In one sentence: what is an HTTP 409?"}]
      }')" | tee 01-wire/.runs/01-plain.json | jq .
```

The `anthropic-version` value was taken from the API reference bundled with Claude Code on
2026-11-21. If the API rejects it, use the value in the first example of the current docs.

Look at the response and answer in your private notes:

- Which block types are in `content`? (`jq '[.content[].type]' 01-wire/.runs/01-plain.json`)
- What is `stop_reason`?
- What does `usage` report?

### Step 2. Nothing is remembered

1. Send a message that states a fact the model cannot know, such as an invented order number.
2. Send a **new** request that only asks for that fact. Save the response.
3. Send a third request whose `messages` hold the first exchange and then the question: the user
   message, the assistant's reply, the new user message.

Pointer: the assistant message you send back is `{role: "assistant", content: <the content array
from the response, unchanged>}`. `jq '.content' file.json` prints that array.

### Step 3. A tool round trip

1. Add a `tools` array with one tool to the request. Invent a tool whose answer you can make up,
   such as an order-status lookup that takes an order ID. Ask a question that needs it.
2. Read the response. Find the `tool_use` block. Note its `id`, `name` and `input`. Note the
   `stop_reason`. Nothing has run anywhere: there is no such system.
3. Send the next request: the same `tools`, and `messages` holding the original user message, the
   assistant's content unchanged, and a new `user` message whose content is one `tool_result` block
   with the `tool_use_id` and the result you invented.

Pointers: the shapes of both blocks are in
[Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls).
Build the JSON with `jq -n` and `--slurpfile` so that you never paste a response by hand.

### Step 4. An error as the result

Repeat step 3, but this time your "tool" fails. Send a `tool_result` marked as an error, with a
message a person would find useful (what was wrong, what would work). Watch what the model does next.
Then try an unhelpful message, such as the single word "failed", and compare.

### Step 5. Where the tokens go

1. Before sending a request, ask the API to count it: the token-counting endpoint takes the same
   body as a message request, without `max_tokens`. Write down your guess first.
2. Count the same request with and without the `tools` array.
3. Collect `usage.input_tokens` from the three requests of a conversation (steps 3.1, 3.3 and one
   follow-up question). Put them in a table.

Pointer: [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
explains what is counted.

### Step 6. The cache

1. Build a request whose `system` is a list with one long text block. Any long file will do, for
   example `../resources/reading-list.md`. Mark the block with `cache_control`.
   `jq -Rs .` turns a file into a JSON string.
2. Send it. Read `usage.cache_creation_input_tokens` and `usage.cache_read_input_tokens`.
3. Send the identical request again within a few minutes. Read the two fields again.
4. Change one character at the **start** of the system text and send it a third time.

Pointer: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) has
the marker's shape and the minimum size below which nothing is cached.

## Part 2: the same round trip in TypeScript

Open [wire.ts](wire.ts). It is a starter with five numbered steps; you write the code. It must do
what you did by hand in step 3, with the "tool" as a small function in the file.

- The types you need are exported by the SDK: `Anthropic.Tool`, `Anthropic.MessageParam`,
  `Anthropic.ToolUseBlock`, `Anthropic.ToolResultBlockParam`.
- Do not set a sampling temperature, and do not redefine the SDK's types.
- Print one usage line per call, so that you can compare with your curl numbers.

Run it with `npm run wire`, and check types with `npm run typecheck`.

## Stop condition

- `npm run wire` exits 0 and prints the final answer and one usage line per call.
- All six predictions in `private/modules/01-model-interface/notes.md` have a result next to them.

Show the output of `npm run wire` in the conversation before you tick the Lab box in `private/PROGRESS.md`.

## If you get stuck

Ask Claude. It will answer with a question first, then a pointer, then pseudo-code. Ask for code
outright if you want it; the rule is only that it does not offer it unasked.
