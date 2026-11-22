// Module 00 environment check: one small request to the Claude API.
// Run it from labs/ with:  npm run smoke
import Anthropic from "@anthropic-ai/sdk";

import { MODEL, applyNormalizedApiKey, isMissingCredentialError, supportsServerFallback } from "../lib/config.ts";

const CREDENTIAL_HELP = [
  "No usable Anthropic credential was found.",
  "Put a key in labs/.env as the line  ANTHROPIC_API_KEY=<your key>  (the file is gitignored),",
  "or log in with the Anthropic CLI (`ant auth login`). Then run `npm run smoke` again.",
].join("\n");

const PROMPT = "Reply with one short sentence that says the lab environment works.";

type Reply = Anthropic.Message | Anthropic.Beta.BetaMessage;

async function ask(client: Anthropic): Promise<Reply> {
  const request = {
    model: MODEL,
    max_tokens: 16000,
    output_config: { effort: "low" as const },
    messages: [{ role: "user" as const, content: PROMPT }],
  };
  if (!supportsServerFallback(MODEL)) return client.messages.create(request);
  // If a safety classifier declines the request, the API re-runs it on a fallback model in the same call.
  return client.beta.messages.create({
    ...request,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
  });
}

function explain(error: unknown): string {
  if (error instanceof Anthropic.AuthenticationError) {
    return `The API rejected the credential (HTTP ${error.status}).\n${CREDENTIAL_HELP}`;
  }
  if (error instanceof Anthropic.APIConnectionError) {
    return `Could not reach the API: ${error.message}`;
  }
  if (error instanceof Anthropic.APIError) {
    return `The API returned an error (HTTP ${error.status}) for model "${MODEL}": ${error.message}`;
  }
  const message = error instanceof Error ? error.message : String(error);
  // The SDK raises a plain error before any request when it finds no credential at all.
  if (isMissingCredentialError(error)) return `${message}\n${CREDENTIAL_HELP}`;
  return `Unexpected error: ${message}`;
}

async function main(): Promise<number> {
  applyNormalizedApiKey();

  let reply: Reply;
  try {
    reply = await ask(new Anthropic());
  } catch (error) {
    console.error(explain(error));
    return 1;
  }

  if (reply.stop_reason === "refusal") {
    console.error(`The model declined the request (stop_reason: refusal). Details: ${JSON.stringify(reply.stop_details)}`);
    return 1;
  }

  const text = reply.content.flatMap((block) => (block.type === "text" ? [block.text] : [])).join("");
  if (text.trim() === "") {
    console.error(`The reply held no text (stop_reason: ${reply.stop_reason}).`);
    return 1;
  }

  console.log(`model:       ${reply.model} (requested ${MODEL})`);
  console.log(`blocks:      ${reply.content.map((block) => block.type).join(", ")}`);
  console.log(`stop_reason: ${reply.stop_reason}`);
  console.log(`reply:       ${text}`);
  console.log(`usage:       ${JSON.stringify(reply.usage)}`);
  console.log("OK: the lab environment works.");
  return 0;
}

process.exitCode = await main();
