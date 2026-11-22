// Tests for the test runner. Run: node --test tools/run-tests.test.mjs
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { findTestFiles, readPending, planRun, PENDING_LIST } from "./run-tests.mjs";

const script = fileURLToPath(new URL("./run-tests.mjs", import.meta.url));
// Built from its code point so that no invisible character sits in this file.
const BYTE_ORDER_MARK = String.fromCharCode(0xfeff);
const PASSING = 'import { test } from "node:test";\ntest("ok", () => {});\n';
const FAILING =
  'import { test } from "node:test";\nimport assert from "node:assert/strict";\ntest("red", () => assert.equal(1, 2));\n';
// What a lab's acceptance test looks like before the learner's code exists.
const MISSING_IMPORT = 'import { loop } from "./loop.mjs";\nimport { test } from "node:test";\ntest("loop", () => loop());\n';
// Never finishes: an open handle and a promise that never settles.
const HANGING =
  'import { test } from "node:test";\ntest("hangs", async () => { setInterval(() => {}, 1000); await new Promise(() => {}); });\n';
let base;
let trees = 0;

/** A new fixture folder holding the given files (path from the folder → content). */
function tree(files) {
  trees += 1;
  const root = path.join(base, `tree-${trees}`);
  fs.mkdirSync(root, { recursive: true });
  for (const [relative, content] of Object.entries(files)) {
    const file = path.join(root, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return root;
}

/** The text of a pending list that excludes node_modules and the given entries. */
function pendingList(...entries) {
  return JSON.stringify({ extends: "./tsconfig.json", exclude: ["node_modules", ...entries] });
}

function run(root, scriptPath = script, extraEnv = {}) {
  return spawnSync(process.execPath, [scriptPath, root], { encoding: "utf8", env: { ...process.env, ...extraEnv } });
}

before(() => {
  base = fs.mkdtempSync(path.join(os.tmpdir(), "hx-ci-run-tests-"));
});

after(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

test("findTestFiles finds test files of each kind, sorted, with forward slashes", () => {
  const root = tree({
    "tools/b.test.mjs": PASSING,
    "tools/a.test.js": PASSING,
    "labs/00-smoke/smoke.test.ts": PASSING,
    "labs/02-loop/deep/x.test.mts": PASSING,
    "labs/02-loop/loop.ts": "",
    "labs/02-loop/test.ts": "",
    "labs/02-loop/old.test.ts.bak": "",
    "README.md": "",
  });
  assert.deepEqual(findTestFiles(root), [
    "labs/00-smoke/smoke.test.ts",
    "labs/02-loop/deep/x.test.mts",
    "tools/a.test.js",
    "tools/b.test.mjs",
  ]);
});

test("findTestFiles skips node_modules, private and dot folders, and finds odd letter case", () => {
  const root = tree({
    "labs/node_modules/pkg/x.test.mjs": PASSING,
    "private/y.test.mjs": PASSING,
    ".runs/z.test.mjs": PASSING,
    "labs/Odd.Test.MJS": PASSING,
  });
  assert.deepEqual(findTestFiles(root), ["labs/Odd.Test.MJS"]);
});

test("findTestFiles returns nothing for an empty folder and refuses a missing one", () => {
  assert.deepEqual(findTestFiles(tree({})), []);
  assert.throws(() => findTestFiles(path.join(base, "nowhere")), /is not a folder/);
});

test("readPending returns the excluded test files as paths from the root", () => {
  const root = tree({ [PENDING_LIST]: pendingList("02-loop/loop.test.ts", "./03-tools/tools.test.ts") });
  assert.deepEqual(readPending(root), ["labs/02-loop/loop.test.ts", "labs/03-tools/tools.test.ts"]);
});

test("readPending returns nothing when only node_modules is excluded or nothing is", () => {
  assert.deepEqual(readPending(tree({ [PENDING_LIST]: pendingList() })), []);
  assert.deepEqual(readPending(tree({ [PENDING_LIST]: "{}" })), []);
});

test("readPending reads past a leading BOM", () => {
  const root = tree({ [PENDING_LIST]: BYTE_ORDER_MARK + pendingList("02-loop/loop.test.ts") });
  assert.deepEqual(readPending(root), ["labs/02-loop/loop.test.ts"]);
});

test("readPending refuses a missing, blank or malformed list", () => {
  assert.throws(() => readPending(tree({})), /labs\/tsconfig\.ci\.json is missing/);
  for (const content of ["", " \n\t", "{", "[]", "null", '{"exclude":"x"}', '{"exclude":[1]}']) {
    assert.throws(() => readPending(tree({ [PENDING_LIST]: content })), /labs\/tsconfig\.ci\.json/, content);
  }
});

test("readPending refuses patterns, blank entries and paths that leave the labs folder", () => {
  const refused = [
    "**/*.test.ts",
    "02-loop/*.test.ts",
    "02-loop/l?op.test.ts",
    "/abs/x.test.ts",
    "../tools/x.test.mjs",
    "02-loop/../../x.test.ts",
    "02-loop\\loop.test.ts",
    "02-loop//loop.test.ts",
    "",
    "  ",
  ];
  for (const entry of refused) {
    assert.throws(() => readPending(tree({ [PENDING_LIST]: pendingList(entry) })), /exclude/, JSON.stringify(entry));
  }
});

test("planRun runs every test file that is not pending", () => {
  const root = tree({
    [PENDING_LIST]: pendingList("02-loop/loop.test.ts"),
    "labs/02-loop/loop.test.ts": FAILING,
    "labs/00-smoke/smoke.test.ts": PASSING,
    "tools/a.test.mjs": PASSING,
  });
  assert.deepEqual(planRun(root), {
    run: ["labs/00-smoke/smoke.test.ts", "tools/a.test.mjs"],
    pending: ["labs/02-loop/loop.test.ts"],
  });
});

test("planRun refuses a pending entry that names no test file in the tree", () => {
  const stale = tree({ [PENDING_LIST]: pendingList("02-loop/gone.test.ts"), "tools/a.test.mjs": PASSING });
  assert.throws(() => planRun(stale), /02-loop\/gone\.test\.ts/);
  // On a file system that ignores letter case the file "exists"; the list must still be exact.
  const cased = tree({
    [PENDING_LIST]: pendingList("02-Loop/loop.test.ts"),
    "labs/02-loop/loop.test.ts": FAILING,
    "tools/a.test.mjs": PASSING,
  });
  assert.throws(() => planRun(cased), /02-Loop\/loop\.test\.ts/);
  const notATest = tree({
    [PENDING_LIST]: pendingList("02-loop/loop.ts"),
    "labs/02-loop/loop.ts": "",
    "tools/a.test.mjs": PASSING,
  });
  assert.throws(() => planRun(notATest), /02-loop\/loop\.ts/);
});

test("planRun refuses a test file whose path node --test would read as a pattern", () => {
  for (const name of ["tools/a[1].test.mjs", "tools/{a}.test.mjs"]) {
    const root = tree({ [PENDING_LIST]: pendingList(), [name]: PASSING });
    assert.throws(() => planRun(root), /cannot be run under this name/, name);
  }
});

test("planRun refuses an entry listed twice and a tree with no test file", () => {
  const twice = tree({
    [PENDING_LIST]: pendingList("02-loop/loop.test.ts", "./02-loop/loop.test.ts"),
    "labs/02-loop/loop.test.ts": FAILING,
  });
  assert.throws(() => planRun(twice), /listed twice/);
  assert.throws(() => planRun(tree({ [PENDING_LIST]: pendingList() })), /no test file/);
});

test("the command runs the files that are not pending and exits 0 when they pass", () => {
  const root = tree({
    [PENDING_LIST]: pendingList("02-loop/loop.test.mjs", "03-tools/tools.test.mjs"),
    "labs/02-loop/loop.test.mjs": FAILING,
    "labs/03-tools/tools.test.mjs": MISSING_IMPORT,
    "tools/a.test.mjs": PASSING,
    "tools/with space.test.mjs": PASSING,
  });
  const result = run(root);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /# pending, output hidden: labs\/02-loop\/loop\.test\.mjs/);
  assert.match(result.stdout, /pending: labs\/02-loop\/loop\.test\.mjs/);
  assert.match(result.stdout, /pending: labs\/03-tools\/tools\.test\.mjs/);
  assert.match(result.stdout, /ran 2 test files, 0 failed, 2 pending/);
});

test("the command exits 1 and names the file when a test file that is not pending fails", () => {
  const root = tree({ [PENDING_LIST]: pendingList(), "tools/a.test.mjs": PASSING, "tools/b.test.mjs": FAILING });
  const result = run(root);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /failed: tools\/b\.test\.mjs/);
  assert.match(result.stdout, /ran 2 test files, 1 failed, 0 pending/);
});

test("the command exits 1 when a pending file has turned green, and says to take it off the list", () => {
  const root = tree({
    [PENDING_LIST]: pendingList("02-loop/loop.test.mjs", "03-tools/tools.test.mjs"),
    "labs/02-loop/loop.test.mjs": PASSING,
    "labs/03-tools/tools.test.mjs": FAILING,
    "tools/a.test.mjs": PASSING,
  });
  const result = run(root);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /no longer red: labs\/02-loop\/loop\.test\.mjs/);
  assert.match(result.stdout, /pending: labs\/03-tools\/tools\.test\.mjs/);
  assert.doesNotMatch(result.stdout, /pending: labs\/02-loop\/loop\.test\.mjs/);
  assert.match(result.stdout, /ran 1 test file, 0 failed, 1 pending/);
});

test("the command stops a file that runs past the time limit, names it and fails, pending or not", () => {
  const root = tree({
    [PENDING_LIST]: pendingList("02-loop/hang.test.mjs"),
    "labs/02-loop/hang.test.mjs": HANGING,
    "tools/a.test.mjs": PASSING,
    "tools/b.test.mjs": HANGING,
  });
  const result = run(root, script, { RUN_TESTS_TIMEOUT_SECONDS: "1" });
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /failed: tools\/b\.test\.mjs \(stopped after 1 s\)/);
  assert.match(result.stdout, /failed: labs\/02-loop\/hang\.test\.mjs \(stopped after 1 s\)/);
  assert.doesNotMatch(result.stdout, /^pending: /m);
  assert.match(result.stdout, /ran 2 test files, 2 failed, 0 pending/);
});

test("the command refuses a time limit that is not a whole number of seconds", () => {
  const root = tree({ [PENDING_LIST]: pendingList(), "tools/a.test.mjs": PASSING });
  for (const value of ["0", "-1", "1.5", "abc", " 5"]) {
    const result = run(root, script, { RUN_TESTS_TIMEOUT_SECONDS: value });
    assert.equal(result.status, 2, `${JSON.stringify(value)}: ${result.stdout}${result.stderr}`);
    assert.match(result.stderr, /RUN_TESTS_TIMEOUT_SECONDS/);
  }
  const blank = run(root, script, { RUN_TESTS_TIMEOUT_SECONDS: "" });
  assert.equal(blank.status, 0, blank.stdout + blank.stderr);
});

test("the command exits 2 with a message when the folder or the list is wrong", () => {
  const noList = run(tree({ "tools/a.test.mjs": PASSING }));
  assert.equal(noList.status, 2, noList.stdout + noList.stderr);
  assert.match(noList.stderr, /labs\/tsconfig\.ci\.json is missing/);
  const noFolder = run(path.join(base, "nowhere"));
  assert.equal(noFolder.status, 2, noFolder.stdout + noFolder.stderr);
  assert.match(noFolder.stderr, /is not a folder/);
  const noTests = run(tree({ [PENDING_LIST]: pendingList() }));
  assert.equal(noTests.status, 2, noTests.stdout + noTests.stderr);
  assert.match(noTests.stderr, /no test file/);
});

test("the command still runs when it is started through a symlinked path", () => {
  const root = tree({ [PENDING_LIST]: pendingList(), "tools/a.test.mjs": PASSING });
  const link = path.join(base, "linked-tools");
  fs.symlinkSync(path.dirname(script), link, "dir");
  const result = run(root, path.join(link, "run-tests.mjs"));
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /ran 1 test file, 0 failed, 0 pending/);
});
