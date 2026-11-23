// The World in One Day — an entry for make.fun's news-image-20261122 bounty
// ("Sum up 22 November's world news in one image"), Node 22, standard library only.
//
// The deliverable is the entry.png beside this file: one 1024x1024 front page that
// sums up Sunday 22 November 2026. This program copies it, byte for byte, to the
// output directory — MAKEFUN_OUTPUT_DIR when run locally, /output in the grader's
// container — with no decode and no re-encode, so two runs write identical bytes:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
