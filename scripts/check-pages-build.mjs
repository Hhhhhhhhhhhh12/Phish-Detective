import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const base = '/Phish-Detective/';

async function listFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    assert(!entry.isSymbolicLink(), 'Pages artifacts must not contain symbolic links.');
    const name = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(name));
    else files.push(name);
  }
  return files;
}

const files = await listFiles(root);
for (const file of files) {
  const name = path.basename(file);
  assert(!name.startsWith('.env'), 'Pages must not publish environment files.');
  assert(!/^server\.(?:[cm]?js|ts)(?:\.map)?$/.test(name), 'Pages must not publish server files.');
}

const html = await readFile(path.join(root, 'index.html'), 'utf8');
assert(html.includes(`href="${base}manifest.json"`), 'Manifest must use the repository path.');
const localReferences = [...html.matchAll(/(?:src|href)="([^\"]+)"/g)]
  .map(match => match[1])
  .filter(reference => !/^(?:https?:|data:)/.test(reference));
assert(localReferences.some(reference => reference.includes('/assets/')), 'No built assets referenced by index.html.');
for (const asset of localReferences) {
  assert(asset.startsWith(base), 'An asset bypasses the repository path.');
  assert(files.includes(path.join(root, asset.slice(base.length))), 'Referenced asset is missing.');
}

const scripts = files.filter(file => file.endsWith('.js') && file.includes(`${path.sep}assets${path.sep}`));
assert(scripts.length > 0, 'No application JavaScript found.');
for (const script of scripts) {
  const text = await readFile(script, 'utf8');
  for (const endpoint of ['/api/analyze', '/api/generate-scenario']) {
    assert(!text.includes(endpoint), 'Static JavaScript still contains a live AI endpoint.');
  }
  assert(!/AIza[0-9A-Za-z_-]{35}/.test(text), 'Static JavaScript contains a Google API key pattern.');
}

const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
assert.equal(manifest.start_url, './', 'App launch must stay inside the repository path.');
assert.equal(manifest.scope, './', 'App scope must stay inside the repository path.');
assert(files.includes(path.join(root, 'sw.js')), 'Service worker file is missing.');

console.log(`Pages artifact verified: ${files.length} files; repository paths valid; no server outputs or live AI endpoints.`);
