// Runs every test file in the repository except the ones listed as pending.
//
// A pending test is red on purpose: a lab's acceptance tests are written before the learner's code.
// The list is the "exclude" of labs/tsconfig.ci.json, so one entry keeps a file out of this run and
// out of CI's typecheck. A test file that is not on the list always runs; nothing is registered.
// A pending file that has turned green fails the run, so a finished lab cannot stay on the list.
//
// Run from the repository root:  node tools/run-tests.mjs [folder]
// Exit code 0 when every file passed, 1 when one failed or a pending file passed, 2 when the folder
// or the list is wrong or no test file was found (a wrong path must not look like a pass).
//
// A test file is one whose name ends in .test.js, .test.mjs, .test.cjs, .test.ts, .test.mts or
// .test.cts. Other names that `node --test` would also pick up on its own (loop_test.ts, test/*.ts)
// are not run. A file that runs longer than RUN_TESTS_TIMEOUT_SECONDS (default 120) is stopped and
// counts as failed, pending or not.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const PENDING_LIST = "labs/tsconfig.ci.json";
const SKIPPED_FOLDERS = new Set(["node_modules", "private"]);
// Any letter case, so that a file named Loop.Test.ts is found and run instead of being left out.
const TEST_FILE = /\.test\.[cm]?[jt]s$/i;
// Built from its code point so that no invisible character sits in this file.
const BYTE_ORDER_MARK = String.fromCharCode(0xfeff);
// `node --test` reads these in the path it is given as a glob pattern, so such a file is never found.
const PATTERN_CHARACTERS = /[[\]{}*?]/;
const TIMEOUT_VARIABLE = "RUN_TESTS_TIMEOUT_SECONDS";
const DEFAULT_TIMEOUT_SECONDS = 120;

/** Every test file under a folder, as sorted paths from that folder with forward slashes. */
export function findTestFiles(folder) {
  const root = path.resolve(folder);
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    throw new Error(`${folder} is not a folder`);
  }
  const found = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".") || SKIPPED_FOLDERS.has(entry.name)) continue;
        walk(full);
      } else if (entry.isFile() && TEST_FILE.test(entry.name)) {
        found.push(path.relative(root, full).split(path.sep).join("/"));
      }
    }
  };
  walk(root);
  return found.sort();
}

/**
 * The pending test files, as paths from the root: the "exclude" entries other than node_modules.
 * Each entry must be the plain path of one file inside labs/. A pattern would hide files nobody
 * decided to leave out.
 */
export function readPending(folder) {
  const file = path.join(path.resolve(folder), PENDING_LIST);
  if (!fs.existsSync(file)) throw new Error(`${PENDING_LIST} is missing`);
  const raw = fs.readFileSync(file, "utf8");
  let config;
  try {
    config = JSON.parse(raw.startsWith(BYTE_ORDER_MARK) ? raw.slice(1) : raw);
  } catch {
    throw new Error(`${PENDING_LIST} is not valid JSON (this file takes no comments)`);
  }
  if (config === null || typeof config !== "object" || Array.isArray(config)) {
    throw new Error(`${PENDING_LIST} must hold a JSON object`);
  }
  const exclude = config.exclude ?? [];
  if (!Array.isArray(exclude)) throw new Error(`${PENDING_LIST}: "exclude" must be a list`);
  const labs = path.posix.dirname(PENDING_LIST);
  const pending = [];
  for (const entry of exclude) {
    if (entry === "node_modules") continue;
    const relative = typeof entry === "string" && entry.startsWith("./") ? entry.slice(2) : entry;
    const segments = typeof relative === "string" ? relative.split("/") : [];
    const plain =
      typeof relative === "string" &&
      relative.trim() !== "" &&
      !/[*?\\]/.test(relative) &&
      !segments.includes("..") &&
      !segments.includes("");
    if (!plain) {
      throw new Error(
        `${PENDING_LIST}: "exclude" entry ${JSON.stringify(entry)} must be the path of one test file inside ${labs}/, without patterns`,
      );
    }
    pending.push(`${labs}/${relative}`);
  }
  return pending;
}

/** Which test files run and which are pending. Throws when the list and the tree disagree. */
export function planRun(folder) {
  const all = findTestFiles(folder);
  const pending = readPending(folder);
  if (all.length === 0) throw new Error(`no test file found under ${folder}`);
  for (const file of all) {
    if (PATTERN_CHARACTERS.test(file)) {
      throw new Error(`${file} cannot be run under this name: node --test reads [ ] { } * ? as a pattern. Rename it.`);
    }
  }
  const listed = new Set();
  for (const entry of pending) {
    if (listed.has(entry)) throw new Error(`${PENDING_LIST}: ${entry} is listed twice`);
    listed.add(entry);
    // Compared with the names read from disk, so a wrong letter case fails on every file system.
    if (!all.includes(entry)) {
      throw new Error(
        `${PENDING_LIST}: ${entry} is not a test file in this tree (check the spelling and the letter case, or take the entry out)`,
      );
    }
  }
  return { run: all.filter((file) => !listed.has(file)), pending };
}

/** Written straight to the descriptor: the lines must not be overtaken by a child's output. */
function say(line) {
  fs.writeSync(1, `${line}\n`);
}

/** The time limit per file, in seconds. Unset or blank means the default. */
function readTimeout(env) {
  const value = env[TIMEOUT_VARIABLE];
  if (value === undefined || value === "") return DEFAULT_TIMEOUT_SECONDS;
  if (!/^[1-9][0-9]*$/.test(value)) {
    throw new Error(`${TIMEOUT_VARIABLE} must be a whole number of seconds above 0, not ${JSON.stringify(value)}`);
  }
  return Number(value);
}

/**
 * Runs one test file. `--test-isolation=none` keeps the file in this one child process: with the
 * default isolation Node starts a second process for it, and stopping the first one at the time
 * limit would leave the second one running.
 */
function runFile(file, { root, env, seconds, stdio }) {
  const result = spawnSync(process.execPath, ["--test", "--test-isolation=none", file], {
    cwd: root,
    env,
    stdio,
    timeout: seconds * 1000,
    killSignal: "SIGKILL",
  });
  if (result.error?.code === "ETIMEDOUT") return { passed: false, broken: `stopped after ${seconds} s` };
  if (result.error) return { passed: false, broken: `could not start: ${result.error.code ?? result.error.message}` };
  if (result.signal) return { passed: false, broken: `ended by ${result.signal}` };
  return { passed: result.status === 0 };
}

function main(argv) {
  const root = path.resolve(argv[2] ?? ".");
  let plan;
  let seconds;
  try {
    seconds = readTimeout(process.env);
    plan = planRun(root);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 2;
  }
  // Node marks a child of `node --test` with NODE_TEST_CONTEXT, and a test runner that sees the
  // mark skips its files and exits 0. Each file here is a run of its own, so the mark comes off.
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const failed = [];
  for (const file of plan.run) {
    say(`\n# ${file}`);
    const outcome = runFile(file, { root, env, seconds, stdio: "inherit" });
    if (!outcome.passed) failed.push(outcome.broken ? `${file} (${outcome.broken})` : file);
  }
  // A pending file is run too, without its output. Red is what the list says it is. Green means
  // the lab is done and the entry was forgotten: the run fails until the entry is taken out, and
  // from then on the file is run and typechecked like any other. A file that was stopped or could
  // not start says nothing about red or green, so it fails the run.
  const stillRed = [];
  const turnedGreen = [];
  for (const file of plan.pending) {
    say(`\n# pending, output hidden: ${file}`);
    const outcome = runFile(file, { root, env, seconds, stdio: "ignore" });
    if (outcome.broken) failed.push(`${file} (${outcome.broken})`);
    else (outcome.passed ? turnedGreen : stillRed).push(file);
  }
  say("");
  for (const file of stillRed) say(`pending: ${file}`);
  for (const file of turnedGreen) say(`no longer red: ${file} (take it out of the "exclude" of ${PENDING_LIST})`);
  for (const file of failed) say(`failed: ${file}`);
  const count = plan.run.length;
  say(`ran ${count} test ${count === 1 ? "file" : "files"}, ${failed.length} failed, ${stillRed.length} pending`);
  return failed.length === 0 && turnedGreen.length === 0 ? 0 : 1;
}

/**
 * True when this file is the script Node was started with. Both sides go through realpath: Node
 * resolves symlinks for the module's own URL, so a start through a symlinked folder (/tmp on macOS)
 * would otherwise never match, and the script would print nothing and exit 0.
 */
function startedDirectly() {
  if (!process.argv[1]) return false;
  try {
    return fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (startedDirectly()) {
  process.exitCode = main(process.argv);
}
