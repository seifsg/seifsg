// The animated header. Name on the left, a terminal typing what I do on the right.
import { esc, cw, monoW, mono, fonts, shine, bgGrad, border, svg } from './svg.mjs';

const W = 1200, H = 420, FS = 19, SLOT = 4.2, TYPE = 1.5;
const BOX = { x: 640, y: 85, w: 490, h: 250 };
const X0 = BOX.x + 26, Y = [175, 209, 257, 291]; // text column + line baselines
const CX = X0 + monoW('~ $ ', FS); // typed commands start here

const defs = t => `<defs>
${bgGrad(t)}
<radialGradient id="glowA"><stop offset="0" stop-color="${t.brand}" stop-opacity=".9"/><stop offset="1" stop-color="${t.brand}" stop-opacity="0"/></radialGradient>
<radialGradient id="glowB"><stop offset="0" stop-color="${t.cyan}" stop-opacity=".35"/><stop offset="1" stop-color="${t.cyan}" stop-opacity="0"/></radialGradient>
<linearGradient id="name" gradientUnits="userSpaceOnUse" x1="70" y1="0" x2="600" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#9aabff"/></linearGradient>
<linearGradient id="tag" gradientUnits="userSpaceOnUse" x1="70" y1="0" x2="470" y2="0"><stop offset="0" stop-color="${t.cyan}"/><stop offset="1" stop-color="${t.accent}"/></linearGradient>
${shine('nameShine', -100, 900, 7)}
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".05"/></pattern>
<radialGradient id="fadeG"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
<mask id="fade"><rect width="${W}" height="${H}" fill="url(#fadeG)"/></mask>
<clipPath id="card"><rect width="${W}" height="${H}" rx="24"/></clipPath>
<clipPath id="term"><rect x="${BOX.x}" y="${BOX.y + 44}" width="${BOX.w}" height="${BOX.h - 44}"/></clipPath>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="${t.brand}" flood-opacity=".55"/></filter>
</defs>`;

const background = t => `<g clip-path="url(#card)"><rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#fade)"/>
<circle class="glow" cx="140" cy="0" r="520" fill="url(#glowA)"/><circle class="glow b" cx="1150" cy="430" r="400" fill="url(#glowB)"/></g>
${border(W, H, t)}`;

const pill = (b, t, x = 70, y = 88) => {
  const s = b.pill.toUpperCase(), cy = y + 15;
  return `<rect x="${x}" y="${y}" width="${monoW(s, 15, 1.6) + 50}" height="30" rx="15" fill="${t.green}" fill-opacity=".1" stroke="${t.green}" stroke-opacity=".45"/>
<circle cx="${x + 17}" cy="${cy}" r="4.5" fill="${t.green}"/><circle class="pulse" cx="${x + 17}" cy="${cy}" r="4.5" fill="none" stroke="${t.green}" stroke-width="2"/>
${mono(x + 33, y + 20.3, s, 15, `fill="${t.green}"`, 1.6)}`;
};

const name = (b, fill) => `<text class="sans" x="70" y="196" font-size="78" font-weight="800" letter-spacing="-1.5" fill="${fill}">${esc(b.name)}</text>`;

const identity = (b, t) => `${pill(b, t)}${name(b, 'url(#name)')}${name(b, 'url(#nameShine)')}
<text class="sans" x="70" y="248" font-size="28" font-weight="500" fill="${t.text}">${esc(b.lines[0])}</text>
<text class="sans" x="70" y="286" font-size="28" font-weight="600" fill="url(#tag)">${esc(b.lines[1])}</text>
<text class="sans" x="70" y="334" font-size="17" fill="${t.muted}">${esc(b.meta)}</text>`;

const frame = (b, t, { x, y, w, h } = BOX) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${t.panel}" filter="url(#shadow)"/>
<rect x="${x + .5}" y="${y + .5}" width="${w - 1}" height="${h - 1}" rx="14" fill="none" stroke="${t.edge}"/><path d="M${x} ${y + 44}H${x + w}" stroke="${t.edge}"/>
${['#ff5f57', '#febc2e', '#28c840'].map((c, i) => `<circle cx="${x + 26 + i * 22}" cy="${y + 22}" r="6" fill="${c}"/>`).join('')}
<text class="mono" x="${x + w / 2}" y="${y + 27}" font-size="14" text-anchor="middle" fill="${t.muted}">${esc(b.host)}</text>`;

const prompt = (y, t) => `<text class="mono" x="${X0}" y="${y}" font-size="${FS}" textLength="${monoW('~ $', FS)}" lengthAdjust="spacing"><tspan fill="${t.cyan}">~</tspan><tspan fill="${t.green}"> $</tspan></text>`;

const intro = (b, t) => prompt(Y[0], t) + mono(CX, Y[0], b.intro[0], FS, `fill="${t.text}"`) + mono(X0, Y[1], b.intro[1], FS, `fill="${t.muted}"`);

// One typed command: an opaque cover slides right in steps (one char each), the cursor rides its edge.
// Default attrs = first command fully shown, so renderers without CSS animation still look right.
const command = ([cmd, out], i, t) => {
  const w = monoW(cmd, FS), hide = i ? ' opacity="0"' : '';
  return `<g class="v${i}"${hide}>${mono(CX, Y[2], cmd, FS, `fill="${t.text}"`)}<g class="t${i}" transform="translate(${w} 0)">
<rect x="${CX}" y="${Y[2] - 21}" width="${w + cw(FS)}" height="30" fill="${t.panel}"/><rect class="cur" x="${CX + 1}" y="${Y[2] - 17}" width="${cw(FS) * .6}" height="22" fill="${t.cyan}"/></g></g>
<text class="mono o${i}" x="${X0}" y="${Y[3]}" font-size="${FS}"${hide}><tspan fill="${t.green}">✔ </tspan><tspan fill="${t.text}">${esc(out)}</tspan></text>`;
};

const typed = (b, t) => `${prompt(Y[2], t)}<g clip-path="url(#term)">${b.cmds.map((c, i) => command(c, i, t)).join('')}</g>`;

// Each command owns one slot of the loop: type, show output, hold, vanish.
const keyframes = (cmd, i, T) => {
  const p = s => +(s / T * 100).toFixed(2), s0 = i * SLOT;
  const [a, b, c, d, e] = [s0, s0 + TYPE, s0 + TYPE + .3, s0 + SLOT - .4, s0 + SLOT - .2].map(p);
  const pre = a ? `0%,${(a - .01).toFixed(2)}%{opacity:0}` : '';
  return `.v${i}{animation:v${i} ${T}s linear infinite}@keyframes v${i}{${pre}${a}%,${d}%{opacity:1}${e}%,100%{opacity:0}}` +
    `.t${i}{animation:t${i} ${T}s steps(${cmd.length}) infinite}@keyframes t${i}{0%,${a}%{transform:translateX(0)}${b}%,100%{transform:translateX(${monoW(cmd, FS)}px)}}` +
    `.o${i}{animation:o${i} ${T}s linear infinite}@keyframes o${i}{0%,${c}%{opacity:0}${(c + 1.5).toFixed(2)}%,${d}%{opacity:1}${e}%,100%{opacity:0}}`;
};

const css = (b, t) => `<style>${fonts(t)}${b.cmds.map(([cmd], i) => keyframes(cmd, i, b.cmds.length * SLOT)).join('')}
.cur{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2s ease-out infinite}@keyframes pulse{from{transform:scale(1);opacity:.9}to{transform:scale(3.2);opacity:0}}
.glow{animation:breathe 7s ease-in-out infinite alternate}.glow.b{animation-delay:-3.5s}@keyframes breathe{from{opacity:.6}to{opacity:1}}</style>`;

export const banner = (b, t) => {
  if (!b?.name || !b.cmds?.length || !(b.lines?.length >= 2) || !(b.intro?.length >= 2)) throw new Error('banner config incomplete');
  const long = b.cmds.find(([c, o]) => !c || !o || CX + monoW(c, FS) > BOX.x + BOX.w - 26);
  if (long) throw new Error(`terminal line missing or too long: ${long}`);
  return svg(W, H, `${b.name}. ${b.lines.join(' ')}`,
    css(b, t) + defs(t) + background(t) + identity(b, t) + frame(b, t) + intro(b, t) + typed(b, t));
};
