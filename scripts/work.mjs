// Project cards. 3 columns on desktop, 1 on phones. A card with cta: true is the dashed "your project?" one.
import { esc, mono, fonts, panel, grid, box, textLines, svg } from './svg.mjs';

const CH = 172, MAX_TITLE = 24, MAX_LINE = 32;

const card = (it, [x, y], w, t) => `<g transform="translate(${x} ${y})">
${box(w, CH, t, it.cta ? { fill: 0, stroke: t.accent, dash: '7 6' } : {})}
<circle cx="30" cy="34" r="5" fill="${it.color}"/>${mono(44, 39, it.tag.toUpperCase(), 13, `fill="${it.color}"`, 1.6)}
<text class="sans" x="24" y="80" font-size="22" font-weight="700" fill="${t.text}">${esc(it.title)}</text>
${textLines(24, 112, it.lines, 17, t.muted, 26)}</g>`;

export const work = (items, t, W = 1200) => {
  const bad = items?.find(it => !it.tag || !it.title || it.title.length > MAX_TITLE || !it.lines?.length || it.lines.some(l => l.length > MAX_LINE));
  if (!items?.length || bad) throw new Error(`work card missing or too long: ${bad?.title}`);
  const g = grid(items.length, W, W >= 900 ? 3 : 1, CH, 40, 20);
  const alt = items.filter(it => !it.cta).map(it => `${it.title}: ${it.lines.join(' ')}`).join(' | ');
  return svg(W, g.h, `Some stuff I built. ${alt}`, `<style>${fonts(t)}</style>${panel(W, g.h, t)}${items.map((it, i) => card(it, g.at(i), g.w, t)).join('')}`);
};
