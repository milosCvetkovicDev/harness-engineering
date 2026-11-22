// Tests for the relative-link checker. Run: node --test tools/check-links.test.mjs
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { findLinks, isExternal, checkTree } from "./check-links.mjs";

const script = fileURLToPath(new URL("./check-links.mjs", import.meta.url));
// Built from its code point so that no invisible character sits in this file.
const BYTE_ORDER_MARK = String.fromCharCode(0xfeff);
let root;

function write(relative, content) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

before(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "hx-organize-links-"));
  write("README.md", "[ok](docs/a.md) and [gone](docs/missing.md)\n");
  write("docs/a.md", "[up](../README.md#start-here) [dir](../docs/) [web](https://example.com/x.md)\n");
  write("docs/space file.md", "x\n");
  write("docs/b.md", "[enc](space%20file.md) [angle](<space file.md>) [anchor](#here) ![img](nope.png)\n");
  write("docs/code.md", "```\n[not a link](nowhere.md)\n```\nand `[inline](nowhere.md)` too\n");
  write("docs/empty.md", "");
  write("docs/bom.md", `${BYTE_ORDER_MARK}[first](a.md)\n`);
  write("node_modules/pkg/README.md", "[broken](nope.md)\n");
  write("private/notes.md", "[broken](nope.md)\n");
  write(".hidden/x.md", "[broken](nope.md)\n");
  write("research_notes/topic/n.md", "[broken](nope.md)\n");
  write("reports/r.md", "[broken](nope.md)\n");
  write("resources/book-notes/c.md", "[broken](nope.md)\n");
});

after(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

test("findLinks returns each inline link with its line number", () => {
  const links = findLinks("one [a](x.md)\n\ntwo [b](y.md \"title\") and ![c](z.png)\n");
  assert.deepEqual(links, [
    { line: 1, target: "x.md" },
    { line: 3, target: "y.md" },
    { line: 3, target: "z.png" },
  ]);
});

test("findLinks ignores fenced code, inline code and blank input", () => {
  assert.deepEqual(findLinks("```\n[a](x.md)\n```\n`[b](y.md)`\n"), []);
  assert.deepEqual(findLinks(""), []);
  assert.deepEqual(findLinks("\n \n\t\n"), []);
});

test("findLinks reads past a leading BOM and handles angle-bracket targets", () => {
  assert.deepEqual(findLinks(`${BYTE_ORDER_MARK}[a](<my file.md>)`), [{ line: 1, target: "my file.md" }]);
  assert.deepEqual(findLinks(BYTE_ORDER_MARK), []);
  // Three spaces are the most a reference definition may be indented. Left in place, the BOM would
  // count as a fourth leading character and the definition would be missed.
  assert.deepEqual(findLinks(`${BYTE_ORDER_MARK}   [r]: x.md`), [{ line: 1, target: "x.md" }]);
});

test("findLinks finds both targets of a linked image and a link whose label holds brackets", () => {
  assert.deepEqual(findLinks("[![alt](i.png)](d.md)"), [
    { line: 1, target: "i.png" },
    { line: 1, target: "d.md" },
  ]);
  assert.deepEqual(findLinks("[see [1]](x.md)"), [{ line: 1, target: "x.md" }]);
});

test("isExternal separates URLs and bare anchors from relative paths", () => {
  for (const target of ["https://a.b/c", "http://a.b", "mailto:x@y.z", "#anchor", "//cdn.x/y"]) {
    assert.equal(isExternal(target), true, target);
  }
  for (const target of ["a.md", "../a.md#x", "docs/", "./a b.md"]) {
    assert.equal(isExternal(target), false, target);
  }
});

test("checkTree reports only links whose target is missing", () => {
  const result = checkTree(root);
  const broken = result.broken.map((entry) => `${entry.file}:${entry.line} ${entry.target}`).sort();
  assert.deepEqual(broken, ["README.md:1 docs/missing.md", "docs/b.md:1 nope.png"]);
  assert.equal(result.files, 7);
});

test("checkTree skips dependency, hidden and unpublished folders", () => {
  const files = checkTree(root).broken.map((entry) => entry.file);
  for (const folder of ["node_modules/", "private/", ".hidden/", "research_notes/", "reports/", "resources/book-notes/"]) {
    assert.equal(files.some((file) => file.startsWith(folder)), false, folder);
  }
});

test("checkTree reports a link that leaves the folder, even when its target exists", () => {
  const holder = fs.mkdtempSync(path.join(os.tmpdir(), "hx-organize-links-outside-"));
  try {
    fs.mkdirSync(path.join(holder, "repo"));
    fs.writeFileSync(path.join(holder, "outside.md"), "x\n");
    fs.writeFileSync(path.join(holder, "repo", "a.md"), "[out](../outside.md) [abs](/../outside.md) [root](/) [self](a.md)\n");
    const broken = checkTree(path.join(holder, "repo")).broken.map((entry) => entry.target).sort();
    assert.deepEqual(broken, ["../outside.md", "/../outside.md"]);
  } finally {
    fs.rmSync(holder, { recursive: true, force: true });
  }
});

test("checkTree on a missing folder throws a clear error", () => {
  assert.throws(() => checkTree(path.join(root, "does-not-exist")), /not a folder/);
});

test("the command exits 1 and names each broken link", () => {
  const run = spawnSync(process.execPath, [script, root], { encoding: "utf8" });
  assert.equal(run.status, 1);
  assert.match(run.stdout, /README\.md:1: docs\/missing\.md/);
  assert.match(run.stdout, /2 broken/);
});

test("the command exits 0 when every link resolves", () => {
  const clean = fs.mkdtempSync(path.join(os.tmpdir(), "hx-organize-links-clean-"));
  try {
    fs.writeFileSync(path.join(clean, "a.md"), "[b](b.md)\n");
    fs.writeFileSync(path.join(clean, "b.md"), "[a](a.md#top)\n");
    const run = spawnSync(process.execPath, [script, clean], { encoding: "utf8" });
    assert.equal(run.status, 0);
    assert.match(run.stdout, /0 broken/);
  } finally {
    fs.rmSync(clean, { recursive: true, force: true });
  }
});

test("findLinks accepts single-quoted and parenthesised titles", () => {
  assert.deepEqual(findLinks("[a](x.md 'title') and [b](y.md (title))"), [
    { line: 1, target: "x.md" },
    { line: 1, target: "y.md" },
  ]);
});

test("findLinks keeps balanced parentheses inside a target", () => {
  assert.deepEqual(findLinks("[a](foo_(bar).md) [b](plain.md)"), [
    { line: 1, target: "foo_(bar).md" },
    { line: 1, target: "plain.md" },
  ]);
});

test("findLinks does not read a footnote definition as a link", () => {
  assert.deepEqual(findLinks("Text[^1].\n\n[^1]: Footnote text\n[ref]: target.md\n"), [{ line: 4, target: "target.md" }]);
});

test("findLinks closes a fence only on a marker at least as long as its opener", () => {
  const text = ["````", "```", "[inside](x.md)", "```", "````", "[outside](y.md)"].join("\n");
  assert.deepEqual(findLinks(text), [{ line: 6, target: "y.md" }]);
  const withInfo = ["```", "```js", "[inside](x.md)", "```", "[outside](y.md)"].join("\n");
  assert.deepEqual(findLinks(withInfo), [{ line: 5, target: "y.md" }]);
});

test("findLinks does not open a fence on a backtick line whose info string holds a backtick", () => {
  assert.deepEqual(findLinks("```npm run smoke``` prints OK\n[next](x.md)"), [{ line: 2, target: "x.md" }]);
  // A tilde fence may carry backticks in its info string.
  assert.deepEqual(findLinks("~~~ `js`\n[inside](x.md)\n~~~\n[after](y.md)"), [{ line: 4, target: "y.md" }]);
});

test("findLinks pairs a code span's backticks by run length", () => {
  assert.deepEqual(findLinks("`` a ` b `` see [x](missing.md) and `c`"), [{ line: 1, target: "missing.md" }]);
  assert.deepEqual(findLinks("``[a](b.md)`` and ``` [c](d.md) ```"), []);
  // An unclosed run is literal text, so the link after it is read.
  assert.deepEqual(findLinks("a ` b [x](y.md)"), [{ line: 1, target: "y.md" }]);
});

test("checkTree reports a link whose letter case differs from the file name", () => {
  const tree = fs.mkdtempSync(path.join(os.tmpdir(), "hx-organize-links-case-"));
  try {
    fs.mkdirSync(path.join(tree, "docs"));
    fs.writeFileSync(path.join(tree, "docs", "b.md"), "x\n");
    fs.writeFileSync(path.join(tree, "a.md"), "[exact](docs/b.md) [file](docs/B.MD) [folder](Docs/b.md) [up](docs/../a.md)\n");
    const broken = checkTree(tree).broken.map((entry) => entry.target).sort();
    assert.deepEqual(broken, ["Docs/b.md", "docs/B.MD"]);
  } finally {
    fs.rmSync(tree, { recursive: true, force: true });
  }
});

test("the command runs when it is started through a symlinked path", () => {
  const holder = fs.mkdtempSync(path.join(os.tmpdir(), "hx-organize-links-symlink-"));
  try {
    const linked = path.join(holder, "tools");
    fs.symlinkSync(path.dirname(script), linked, "dir");
    const run = spawnSync(process.execPath, [path.join(linked, "check-links.mjs"), root], { encoding: "utf8" });
    assert.equal(run.status, 1);
    assert.match(run.stdout, /2 broken/);
  } finally {
    fs.rmSync(holder, { recursive: true, force: true });
  }
});

test("the command exits 2 when the folder holds no Markdown file", () => {
  const empty = fs.mkdtempSync(path.join(os.tmpdir(), "hx-organize-links-empty-"));
  try {
    fs.writeFileSync(path.join(empty, "notes.txt"), "[a](missing.md)\n");
    const run = spawnSync(process.execPath, [script, empty], { encoding: "utf8" });
    assert.equal(run.status, 2);
    assert.match(run.stderr, /no Markdown file/);
  } finally {
    fs.rmSync(empty, { recursive: true, force: true });
  }
});
