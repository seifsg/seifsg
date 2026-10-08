// Numbers strip under the banner. One row on desktop, 2x2 on phones.
import { esc, mono, monoW, fonts, panel, grid, box, svg } from './svg.mjs';

const TH = 128, TRACK = 1.2;
const NUM = '<defs><linearGradient id="num" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#9aabff"/></linearGradient></defs>';

const tile = (s, [x, y], w, t, fs) => `<g transform="translate(${x} ${y})">
${box(w, TH, t)}
<text class="sans" x="22" y="60" font-size="42" font-weight="800" letter-spacing="-1" fill="url(#num)">${esc(s.value)}</text>
${mono(22, 90, s.label.toUpperCase(), fs, `fill="${t.text}"`, TRACK)}${s.sub ? mono(22, 111, s.sub, fs, `fill="${t.muted}"`) : ''}</g>`;

export const stats = (items, t, W = 1200) => {
  if (!items?.length || items.some(s => !s.value || !s.label)) throw new Error('stats config incomplete');
  const cols = W >= 900 ? items.length : 2, fs = cols > 2 ? 13 : 12, g = grid(items.length, W, cols, TH);
  const tooLong = items.find(s => 44 + monoW(s.label, fs, TRACK) > g.w);
  if (tooLong) throw new Error(`stats label too long for ${W}px: ${tooLong.label}`);
  return svg(W, g.h, items.map(s => `${s.value} ${s.label}${s.sub ? ` (${s.sub})` : ''}`).join(', '),
    `<style>${fonts(t)}</style>${panel(W, g.h, t)}${NUM}${items.map((s, i) => tile(s, g.at(i), g.w, t, fs)).join('')}`);
};
