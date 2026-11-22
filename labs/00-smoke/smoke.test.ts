// Tests for the environment check. They never reach the real API: the smoke script is pointed at a
// local fake server through ANTHROPIC_BASE_URL, which is the same trick Part B uses to test a harness.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { dirname, join } from "node:path";
import { after, before, beforeEach, describe, test } from "node:test";
import { fileURLToPath } from "node:url";

import { DEFAULT_MODEL, isMissingCredentialError, normalizeApiKey, supportsServerFallback } from "../lib/config.ts";

// Built from its code point so that no invisible character sits in this file.
const BYTE_ORDER_MARK = String.fromCharCode(0xfeff);
const here = dirname(fileURLToPath(import.meta.url));
const labsDir = join(here, "..");
// An empty home directory, so no credential profile on this machine can leak into a test.
const emptyHome = join(here, ".runs", "empty-home");

type Mode = "ok" | "unauthorized" | "refusal";
type Seen = { headers: Record<string, string | string[] | undefined>; body: Record<string, unknown> };

let mode: Mode = "ok";
let seen: Seen[] = [];

const server = createServer((req, res) => {
  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    seen.push({ headers: req.headers, body: raw ? JSON.parse(raw) : {} });
    res.setHeader("content-type", "application/json");
    if (mode === "unauthorized") {
      res.statusCode = 401;
      res.end(JSON.stringify({ type: "error", error: { type: "authentication_error", message: "invalid x-api-key" } }));
      return;
    }
    const refused = mode === "refusal";
    res.end(
      JSON.stringify({
        id: "msg_test",
        type: "message",
        role: "assistant",
        model: "fake-model",
        content: refused ? [] : [{ type: "text", text: "The lab environment works." }],
        stop_reason: refused ? "refusal" : "end_turn",
        stop_sequence: null,
        stop_details: refused ? { type: "refusal", category: null, explanation: "declined by the fake server" } : null,
        usage: { input_tokens: 21, output_tokens: 7 },
      }),
    );
  });
});

// The credential as it arrived, whichever header the SDK version uses for it.
function credentialOf(request: Seen): string | undefined {
  const value = request.headers["x-api-key"] ?? request.headers["authorization"];
  return value === undefined ? undefined : String(value).replace(/^Bearer /, "");
}

function runSmoke(extraEnv: Record<string, string>): Promise<{ code: number | null; stdout: string; stderr: string }> {
  const { port } = server.address() as AddressInfo;
  const child = spawn(process.execPath, ["00-smoke/smoke.ts"], {
    cwd: labsDir,
    env: {
      PATH: process.env.PATH ?? "",
      HOME: emptyHome,
      ANTHROPIC_BASE_URL: `http://127.0.0.1:${port}`,
      ...extraEnv,
    },
  });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => (stdout += chunk));
  child.stderr.on("data", (chunk) => (stderr += chunk));
  return new Promise((resolve) => child.on("close", (code) => resolve({ code, stdout, stderr })));
}

describe("normalizeApiKey", () => {
  test("trims spaces, newlines and a leading byte-order mark from a pasted key", () => {
    assert.equal(normalizeApiKey(" sk-test\n"), "sk-test");
    assert.equal(normalizeApiKey(`${BYTE_ORDER_MARK}sk-test`), "sk-test");
    assert.equal(normalizeApiKey("sk-test\r\n"), "sk-test");
  });

  test("treats a blank or missing key as absent", () => {
    assert.equal(normalizeApiKey("   "), undefined);
    assert.equal(normalizeApiKey(""), undefined);
    assert.equal(normalizeApiKey(undefined), undefined);
  });
});

describe("supportsServerFallback", () => {
  test("is true for the default model and false for a Haiku model or an unknown id", () => {
    assert.equal(supportsServerFallback(DEFAULT_MODEL), true);
    assert.equal(supportsServerFallback("claude-haiku-5-5"), false);
    assert.equal(supportsServerFallback("something-else"), false);
  });

  // The list is the one on the docs page "Refusals and fallback", read on 2026-11-21. It is copied
  // here on purpose, not imported from config.ts: an edit to either copy fails this test until the
  // two agree with the page again.
  test("is true for every model that page lists with server-side fallback", () => {
    for (const model of [
      "claude-fable-5-2",
      "claude-fable-5-1",
      "claude-fable-5",
      "claude-opus-5-5",
      "claude-opus-5",
      "claude-sonnet-5-5",
    ]) {
      assert.equal(supportsServerFallback(model), true, model);
    }
  });
});

describe("isMissingCredentialError", () => {
  test("recognises the error the SDK raises when it finds no credential", () => {
    const fromSdk = new Error(
      "Could not resolve authentication method. Expected one of apiKey, authToken, credentials, config, or profile to be set.",
    );
    assert.equal(isMissingCredentialError(fromSdk), true);
  });

  test("is false for any other error or value", () => {
    assert.equal(isMissingCredentialError(new Error("Unexpected end of JSON input")), false);
    assert.equal(isMissingCredentialError(new TypeError("fetch failed")), false);
    assert.equal(isMissingCredentialError("Could not resolve authentication method"), false);
    assert.equal(isMissingCredentialError(undefined), false);
  });
});

describe("smoke.ts against a fake API", () => {
  before(async () => {
    mkdirSync(emptyHome, { recursive: true });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  });
  after(() => server.close());
  beforeEach(() => {
    mode = "ok";
    seen = [];
  });

  test("exits 0 and prints the reply, the stop reason and the usage", async () => {
    const result = await runSmoke({ ANTHROPIC_API_KEY: " sk-test " });

    assert.equal(result.code, 0, result.stderr);
    assert.match(result.stdout, /The lab environment works\./);
    assert.match(result.stdout, /end_turn/);
    assert.match(result.stdout, /"input_tokens":21/);

    // What was actually sent, not only what was printed.
    assert.equal(seen.length, 1);
    const sent = seen[0]!;
    assert.equal(credentialOf(sent), "sk-test", "the key is trimmed before it is sent");
    assert.ok(sent.headers["anthropic-version"], "the API version header is present");
    assert.equal(sent.body.model, DEFAULT_MODEL);
    assert.equal(sent.body.fallbacks, "default", "the default model opts into server-side refusal fallback");
    // The fallbacks field is rejected without its beta header, so a typo here would only fail live.
    assert.match(String(sent.headers["anthropic-beta"]), /(^|,\s*)server-side-fallback-2026-07-01(\s*,|$)/);
  });

  test("uses HX_MODEL when it is set and sends no fallback for a model without one", async () => {
    const result = await runSmoke({ ANTHROPIC_API_KEY: "sk-test", HX_MODEL: "claude-haiku-5-5" });

    assert.equal(result.code, 0, result.stderr);
    assert.equal(seen[0]!.body.model, "claude-haiku-5-5");
    assert.equal("fallbacks" in seen[0]!.body, false);
  });

  // The fake API answers "ok" here, so a request sent without a credential would make smoke.ts
  // succeed and these tests fail. That proves the SDK stops before anything is sent.
  test("exits 1 and names ANTHROPIC_API_KEY when there is no credential", async () => {
    const result = await runSmoke({});

    assert.equal(result.code, 1);
    assert.match(result.stderr, /ANTHROPIC_API_KEY/);
    assert.equal(result.stdout.includes("OK:"), false);
    assert.equal(seen.length, 0, "no request is sent without a credential");
  });

  test("exits 1 with the status and names ANTHROPIC_API_KEY when the API rejects the key", async () => {
    mode = "unauthorized";
    const result = await runSmoke({ ANTHROPIC_API_KEY: "sk-test" });

    assert.equal(result.code, 1);
    assert.match(result.stderr, /HTTP 401/);
    assert.match(result.stderr, /ANTHROPIC_API_KEY/);
    assert.equal(seen.length, 1, "a rejected key is not retried");
  });

  test("exits 1 and names ANTHROPIC_API_KEY when the key is blank", async () => {
    const result = await runSmoke({ ANTHROPIC_API_KEY: "   " });

    assert.equal(result.code, 1);
    assert.match(result.stderr, /ANTHROPIC_API_KEY/);
    // A blank key must never be sent as if it were a credential.
    assert.equal(seen.length, 0, "no request is sent with a blank key");
  });

  test("exits 1 and reports a refusal instead of printing an empty reply", async () => {
    mode = "refusal";
    const result = await runSmoke({ ANTHROPIC_API_KEY: "sk-test" });

    assert.equal(result.code, 1);
    assert.match(result.stderr, /refusal/);
  });
});
