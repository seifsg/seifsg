// Client quotes, verbatim from public reviews. 3 columns on desktop, 1 on phones.
import { mono, fonts, panel, grid, box, textLines, svg } from './svg.mjs';

const CH = 212, MAX_LINE = 28, GOLD = '#f5b301';

const card = (q, [x, y], w, t) => `<g transform="translate(${x} ${y})">${box(w, CH, t)}
<text class="serif" x="20" y="70" font-size="64" fill="${t.accent}">“</text>${textLines(24, 100, q.lines, 20, t.text, 28)}
<text class="sans" x="24" y="${CH - 22}" font-size="16" fill="${GOLD}">★★★★★</text>${mono(118, CH - 23, q.who.toUpperCase(), 12, `fill="${t.muted}"`, 1.2)}</g>`;

export const quotes = (items, t, W = 1200) => {
  const bad = items?.find(q => !q.who || !q.lines?.length || q.lines.length > 3 || q.lines.some(l => l.length > MAX_LINE));
  if (!items?.length || bad) throw new Error(`quote missing or too long: ${bad?.who}`);
  const g = grid(items.length, W, W >= 900 ? 3 : 1, CH, 40, 20);
  const alt = items.map(q => `"${q.lines.join(' ')}" (${q.who})`).join(' ');
  return svg(W, g.h, `What clients say: ${alt}`,
    `<style>${fonts(t)}.serif{font-family:Georgia,'Times New Roman',serif}</style>${panel(W, g.h, t)}${items.map((q, i) => card(q, g.at(i), g.w, t)).join('')}`);
};
