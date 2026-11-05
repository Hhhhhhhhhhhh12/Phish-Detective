import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const base = '/Phish-Detective/';
const mediaFiles = ['intro.mp4', 'pov.mp4', 'poster.jpg'];
const expectedFiles = new Set([
  'index.html',
  'manifest.json',
  'sw.js',
  ...mediaFiles.map(name => `media/detective/${name}`),
]);
const builtAsset = /^assets\/index-[\w-]+\.(?:js|css)$/;
const credentialPatterns = [
  /AIza[0-9A-Za-z_-]{35}/,
  /(?:gh[pousr]_[0-9A-Za-z]{36}|github_pat_[0-9A-Za-z_]{82})/,
  /-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/,
];

async function listFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const name = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(name));
    else {
      assert(entry.isFile(), 'Pages artifacts may contain only regular files and directories.');
      files.push(name);
    }
  }
  return files;
}

const files = await listFiles(root);
let applicationScripts = 0;
for (const file of files) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  assert(expectedFiles.has(relative) || builtAsset.test(relative), `Unexpected Pages artifact file: ${relative}`);
  if (relative.startsWith('media/')) continue;
  if (relative.startsWith('assets/') && relative.endsWith('.js')) applicationScripts += 1;

  const content = await readFile(file, 'utf8');
  for (const endpoint of ['/api/analyze', '/api/generate-scenario']) {
    assert(!content.includes(endpoint), `Static file contains a live AI endpoint: ${relative}`);
  }
  assert(!credentialPatterns.some(pattern => pattern.test(content)), `Potential credential found in ${relative}`);
}
assert(applicationScripts > 0, 'No application JavaScript found.');

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
for (const file of files) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  if (builtAsset.test(relative)) {
    assert(localReferences.includes(`${base}${relative}`), `Unreferenced Pages asset: ${relative}`);
  }
}

const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
assert.equal(manifest.start_url, './', 'App launch must stay inside the repository path.');
assert.equal(manifest.scope, './', 'App scope must stay inside the repository path.');
assert(files.includes(path.join(root, 'sw.js')), 'Service worker file is missing.');

for (const name of mediaFiles) {
  const file = path.join(root, 'media', 'detective', name);
  assert(files.includes(file), `Detective media is missing: ${name}`);
  const data = await readFile(file);
  if (name.endsWith('.mp4')) {
    assert.equal(data.subarray(4, 8).toString(), 'ftyp', `Invalid MP4 media: ${name}`);
  } else {
    assert(data[0] === 0xff && data[1] === 0xd8, `Invalid JPEG poster: ${name}`);
  }
}

console.log(`Pages artifact verified: ${files.length} allowed files; valid repository paths; no known credential patterns or live AI endpoints.`);
