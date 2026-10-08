// Stack card. Chips wrap by themselves, so adding a tech is one line in config.
import { monoW, mono, fonts, panel, box, svg } from './svg.mjs';

const PAD = 40, LABEL = 100, FS = 17, CH = 44, GAP = 12, ROW_GAP = 22;
const chipW = name => Math.round(38 + monoW(name, FS) + 16);

const chip = ([name, color], x, y, t) => `<g transform="translate(${x} ${y})">
${box(chipW(name), CH, t, { rx: 12 })}
<circle cx="20" cy="22" r="9" fill="${color}" fill-opacity=".22"/><circle cx="20" cy="22" r="4.5" fill="${color}"/>
${mono(38, 28, name, FS, `fill="${t.text}"`)}</g>`;

// One labeled group, chips left to right, wrapping at the edge. Returns markup + next y.
const group = ([label, items], y, t, W) => {
  let x = PAD + LABEL, out = mono(PAD, y + 28, label.toUpperCase(), 14, `fill="${t.muted}"`, 1.8);
  for (const it of items) {
    const w = chipW(it[0]);
    if (x + w > W - PAD) [x, y] = [PAD + LABEL, y + CH + GAP];
    out += chip(it, x, y, t);
    x += w + GAP;
  }
  return { out, y: y + CH + ROW_GAP };
};

// W = card width. 1200 for desktop, ~600 for phones (chips just wrap more)
export const stack = (groups, t, W = 1200) => {
  if (!groups?.length) throw new Error('stack config empty');
  let y = PAD, body = '';
  for (const g of groups) {
    const r = group(g, y, t, W);
    body += r.out;
    y = r.y;
  }
  const h = y - ROW_GAP + PAD;
  return svg(W, h, `Stack: ${groups.flatMap(g => g[1].map(i => i[0])).join(', ')}`,
    `<style>${fonts(t)}</style>${panel(W, h, t)}${body}`);
};
