// Builds every svg in /assets from config.mjs. Zero deps, just: node scripts/build.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { theme, banner as bannerCfg, stack as stackCfg, stats as statsCfg, work as workCfg, buttons } from './config.mjs';
import { banner } from './banner.mjs';
import { stack } from './stack.mjs';
import { stats } from './stats.mjs';
import { work } from './work.mjs';
import { button } from './button.mjs';

// Desktop + phone (600px wide) versions of one card image
const both = (name, fn, cfg) => ({ [`${name}.svg`]: fn(cfg, theme), [`${name}-mobile.svg`]: fn(cfg, theme, 600) });

// Render all first, write after. One bad config = nothing half-written.
const files = {
  'banner.svg': banner(bannerCfg, theme),
  ...both('stats', stats, statsCfg),
  ...both('work', work, workCfg),
  ...both('stack', stack, stackCfg),
  ...Object.fromEntries(Object.entries(buttons).map(([k, v]) => [`btn-${k}.svg`, button(v, theme)])),
};

const dir = new URL('../assets/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [f, svg] of Object.entries(files)) writeFileSync(new URL(f, dir), svg);
console.log(`built ${Object.keys(files).join(', ')}`);
