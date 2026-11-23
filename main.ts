// The World in One Day — an entry for make.fun's news-image-20261122 bounty
// ("Sum up 22 November's world news in one image"), Node 22, standard library only.
//
// The deliverable is the entry.png beside this file: one 1024x1024 front page that
// sums up Sunday 22 November 2026. This program copies it, byte for byte, to the
// output directory — MAKEFUN_OUTPUT_DIR when run locally, /output in the grader's
// container — with no decode and no re-encode, so two runs write identical bytes:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const head = readFileSync(src).subarray(0, 8);
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
if (!PNG_SIGNATURE.every((b, i) => head[i] === b)) {
  throw new Error('entry.png is missing or is not a PNG file');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
// Write to a temporary name, then rename, so a reader never sees a partial file.
const tmp = join(outDir, 'entry.png.tmp');
copyFileSync(src, tmp);
renameSync(tmp, join(outDir, 'entry.png'));
