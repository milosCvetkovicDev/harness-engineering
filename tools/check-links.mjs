// Checks that every relative link in the repository's Markdown files points at something that exists.
// External URLs are not fetched; that is a job for a fact-check pass, not for a fast local script.
//
// Run from the repository root:  node tools/check-links.mjs [folder]
// Exit code 0 when no link is broken, 1 when one is, 2 when the folder is missing or holds no
// Markdown file (a wrong path must not look like a pass).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The same folders .gitignore keeps out of git, so a run on the working tree does not read notes
// that are never published. Names match at any depth, as they do in .gitignore; a path with a
// slash matches from the root only. Dot folders are skipped too.
const SKIPPED_FOLDERS = new Set(["node_modules", "private", "research_notes", "reports"]);
const SKIPPED_PATHS = new Set(["resources/book-notes"]);
// The label may hold one level of brackets, so a linked image [![alt](i.png)](d.md) is one match;
// the links inside the label are read separately. A target is <anything in angle brackets>, or a run
// without spaces in which parentheses are balanced one level deep. A title may follow in double
// quotes, single quotes or parentheses.
const INLINE_LINK =
  /!?\[((?:[^[\]]|!?\[[^[\]]*\](?:\([^()]*\))?)*)\]\(\s*(<[^>]*>|(?:[^()\s]|\([^()\s]*\))+)(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)/g;
// "[label]: target", but not a footnote definition "[^1]: text".
const REFERENCE_DEFINITION = /^\s{0,3}\[(?!\^)[^\]]+\]:\s*(<[^>]*>|\S+)/;
const FENCE = /^\s*(`{3,}|~{3,})(.*)$/;
// Built from its code point so that no invisible character sits in this file.
const BYTE_ORDER_MARK = String.fromCharCode(0xfeff);

/**
 * Every link target in a Markdown text, with its 1-based line. Fenced code blocks and single-backtick
 * code spans are skipped. Indented code blocks are not recognised: a link in one is checked.
 */
export function findLinks(markdown) {
  const links = [];
  let fence = null;
  const text = markdown.startsWith(BYTE_ORDER_MARK) ? markdown.slice(1) : markdown;
  const lines = text.split(/\r?\n/);
  lines.forEach((rawLine, index) => {
    const fenceMatch = rawLine.match(FENCE);
    // A backtick fence's info string may not hold a backtick: "```a``` b" is a code span, not a fence.
    const opensFence = fenceMatch !== null && !(fenceMatch[1][0] === "`" && fenceMatch[2].includes("`"));
    if (fenceMatch && (fence !== null || opensFence)) {
      const [, marker, rest] = fenceMatch;
      if (fence === null) {
        fence = marker;
      } else if (marker[0] === fence[0] && marker.length >= fence.length && rest.trim() === "") {
        // Only the same character, at least as long as the opener and with nothing after it, closes.
        fence = null;
      }
      return;
    }
    if (fence !== null) return;
    const line = blankCodeSpans(rawLine);
    for (const target of inlineTargets(line)) links.push({ line: index + 1, target });
    const definition = line.match(REFERENCE_DEFINITION);
    if (definition) links.push({ line: index + 1, target: unwrap(definition[1]) });
  });
  return links;
}

/**
 * The line with each code span replaced by spaces. A span opens with a run of backticks and closes
 * with the next run of the same length; a run with no partner is literal text.
 */
function blankCodeSpans(line) {
  const runs = [...line.matchAll(/`+/g)].map((match) => ({ start: match.index, length: match[0].length }));
  let result = line;
  for (let i = 0; i < runs.length; i += 1) {
    const close = runs.findIndex((run, j) => j > i && run.length === runs[i].length);
    if (close === -1) continue;
    const start = runs[i].start;
    const end = runs[close].start + runs[close].length;
    result = result.slice(0, start) + " ".repeat(end - start) + result.slice(end);
    i = close;
  }
  return result;
}

/** The targets of the inline links in one line, a link inside a label before its own target. */
function inlineTargets(line) {
  const targets = [];
  for (const match of line.matchAll(INLINE_LINK)) {
    targets.push(...inlineTargets(match[1]), unwrap(match[2]));
  }
  return targets;
}

function unwrap(target) {
  return target.startsWith("<") && target.endsWith(">") ? target.slice(1, -1) : target;
}

/** True for anything this script does not resolve on disk: URLs with a scheme, protocol-relative URLs, bare anchors. */
export function isExternal(target) {
  return /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("//") || target.startsWith("#");
}

/** Symbolic links are not followed, so a link that points back up the tree cannot loop. */
function markdownFiles(folder, root = folder) {
  const found = [];
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      const fromRoot = path.relative(root, full).split(path.sep).join("/");
      if (entry.name.startsWith(".") || SKIPPED_FOLDERS.has(entry.name) || SKIPPED_PATHS.has(fromRoot)) continue;
      found.push(...markdownFiles(full, root));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      found.push(full);
    }
  }
  return found.sort();
}

function resolveTarget(target, file, root) {
  const withoutFragment = target.split("#")[0].split("?")[0];
  let decoded = withoutFragment;
  try {
    decoded = decodeURIComponent(withoutFragment);
  } catch {
    // A stray "%" is not an encoding; check the path as written.
  }
  return decoded.startsWith("/") ? path.join(root, decoded) : path.resolve(path.dirname(file), decoded);
}

/**
 * True when the path exists and every segment below the root is spelled exactly as on disk.
 * existsSync alone follows the file system, and the default macOS file system ignores letter case:
 * a link to B.MD would pass here when the file is b.md, and return 404 once published.
 */
function existsExactly(target, root) {
  // GitHub cannot serve a file above the repository, even when this machine has one there.
  const fromRoot = path.relative(root, target);
  if (fromRoot === ".." || fromRoot.startsWith(`..${path.sep}`) || path.isAbsolute(fromRoot)) return false;
  if (!fs.existsSync(target)) return false;
  let current = target;
  while (current !== root && current.startsWith(root + path.sep)) {
    const parent = path.dirname(current);
    if (!fs.readdirSync(parent).includes(path.basename(current))) return false;
    current = parent;
  }
  return true;
}

/** Walks a folder and returns how many files and links were checked, and which relative links are broken. */
export function checkTree(folder) {
  const root = path.resolve(folder);
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    throw new Error(`${folder} is not a folder`);
  }
  const files = markdownFiles(root);
  const broken = [];
  let links = 0;
  for (const file of files) {
    for (const link of findLinks(fs.readFileSync(file, "utf8"))) {
      if (isExternal(link.target)) continue;
      links += 1;
      if (!existsExactly(resolveTarget(link.target, file, root), root)) {
        broken.push({ file: path.relative(root, file).split(path.sep).join("/"), line: link.line, target: link.target });
      }
    }
  }
  return { files: files.length, links, broken };
}

function main(argv) {
  const root = path.resolve(argv[2] ?? ".");
  let result;
  try {
    result = checkTree(root);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 2;
  }
  if (result.files === 0) {
    console.error(`no Markdown file found under ${root}`);
    return 2;
  }
  for (const entry of result.broken) {
    console.log(`${entry.file}:${entry.line}: ${entry.target}`);
  }
  console.log(`checked ${result.links} relative links in ${result.files} files, ${result.broken.length} broken`);
  return result.broken.length === 0 ? 0 : 1;
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
