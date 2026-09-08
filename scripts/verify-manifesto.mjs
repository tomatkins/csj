import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Compare the current approved revision; earlier copy remains in Git history.
const original = readFileSync(new URL('../content/manifesto.md', import.meta.url), 'utf8');
const sections = JSON.parse(readFileSync(new URL('../content/manifesto.json', import.meta.url), 'utf8'));
const normalize = text => text.replace(/^#+ |^> |^- |^---$/gm, '').replace(/\[([^\]]+)\]\(https:\/\/[^\s)]+\)/g, '$1').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
const laidOut = ['The Cloud Surfing Jupiter Founding Manifesto', ...sections.flatMap(section => [
  section.heading,
  ...section.blocks.map(block => block.type === 'list' ? block.items.join(' ') : block.text),
])].join('\n');
assert.equal(normalize(laidOut), normalize(original), 'Manifesto wording or order differs from the approved source');
assert.equal(new Set(sections.map(section => section.id)).size, sections.length, 'Section IDs must be unique');
console.log('Manifesto matches the approved source verbatim (ignoring layout whitespace and Markdown).');
