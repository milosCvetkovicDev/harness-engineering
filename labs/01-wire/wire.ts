// Module 01 lab, part 2: the tool round trip you did by hand with curl, now through the SDK.
//
// This file is a starter. You write the code; README.md in this folder has the steps, and the
// numbered comments below mark where each one goes. Until step 5 is done the script exits 1.
//
// Run it from labs/:  npm run wire

import Anthropic from "@anthropic-ai/sdk";
import { MODEL, applyNormalizedApiKey } from "../lib/config.ts";

applyNormalizedApiKey();
const client = new Anthropic();

// Step 1. Define the one tool, typed as Anthropic.Tool[]. Reuse the definition from your curl
//         request: a name, a description written for the model, and an input schema.

// Step 2. Start the conversation as Anthropic.MessageParam[] with one user message that needs
//         the tool.

// Step 3. Send the first request with client.messages.create. Print the block types, the stop
//         reason and the usage. Append the assistant's content to the conversation unchanged.

// Step 4. Find the tool_use block (narrow the type on block.type). "Run" the tool: return an
//         invented value for a known input and an error for an unknown one. Append one user
//         message that holds the tool_result block.

// Step 5. Send the second request. Print the final text and the usage of this call. When that
//         works, delete the two lines below.

console.error(`wire.ts is still the starter. Model in use: ${MODEL}. Client ready: ${client instanceof Anthropic}.`);
process.exitCode = 1;
