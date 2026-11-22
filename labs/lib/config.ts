// The one place the labs name a model and decide how to treat the API key.

/** The model every lab uses unless HX_MODEL says otherwise. */
export const DEFAULT_MODEL = "claude-opus-5-5";

/** The model in use: HX_MODEL when it is set and not blank, otherwise the default. */
export const MODEL: string = process.env.HX_MODEL?.trim() || DEFAULT_MODEL;

// Models whose safety refusals the API can re-run on another model (the `fallbacks` request field).
// A model that is not listed gets a plain request; Haiku models have no server-side fallback.
// Checked against the docs page "Refusals and fallback" on 2026-11-21; check it again when you add one.
const SERVER_FALLBACK_MODELS: ReadonlySet<string> = new Set([
  "claude-fable-5-2",
  "claude-fable-5-1",
  "claude-fable-5",
  "claude-opus-5-5",
  "claude-opus-5",
  "claude-sonnet-5-5",
]);

export function supportsServerFallback(model: string): boolean {
  return SERVER_FALLBACK_MODELS.has(model);
}

/**
 * True for the plain error the SDK raises before any request when it finds no credential at all.
 * It has no class of its own, so this goes by the opening words of its message (SDK 1.12).
 */
export function isMissingCredentialError(error: unknown): boolean {
  return error instanceof Error && /^Could not resolve authentication method/i.test(error.message);
}

/** A pasted key often carries spaces, a newline or a byte-order mark. A blank key counts as no key. */
export function normalizeApiKey(raw: string | undefined): string | undefined {
  const trimmed = raw?.trim();
  return trimmed ? trimmed : undefined;
}

/** Clean ANTHROPIC_API_KEY in place before the SDK reads it; remove it when it is blank. */
export function applyNormalizedApiKey(env: NodeJS.ProcessEnv = process.env): void {
  const key = normalizeApiKey(env.ANTHROPIC_API_KEY);
  if (key === undefined) delete env.ANTHROPIC_API_KEY;
  else env.ANTHROPIC_API_KEY = key;
}
