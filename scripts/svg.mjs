// Tiny SVG helpers. Mono text gets a forced width, so layout math stays exact on any OS font.
const ENT = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
export const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ENT[c]);
export const cw = size => size * 0.6;
export const monoW = (s, size, track = 0) => +(String(s).length * (cw(size) + track)).toFixed(1);

export const mono = (x, y, s, size, attrs = '', track = 0) =>
  `<text class="mono" x="${x}" y="${y}" font-size="${size}" textLength="${monoW(s, size, track)}" lengthAdjust="spacing" ${attrs}>${esc(s)}</text>`;

export const fonts = t => `.sans{font-family:${t.sans}}.mono{font-family:${t.mono}}`;

// Moving light band, used on the name and the main button
export const shine = (id, from, to, dur = 6) =>
  `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="-260" y1="0" x2="0" y2="0">` +
  '<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/>' +
  '<stop offset="1" stop-color="#fff" stop-opacity="0"/>' +
  `<animateTransform attributeName="gradientTransform" type="translate" values="${from} 0;${to} 0;${to} 0" keyTimes="0;.5;1" dur="${dur}s" repeatCount="indefinite"/></linearGradient>`;

export const svg = (w, h, label, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">` +
  `<title>${esc(label)}</title>${body}</svg>\n`;

// Shared card pieces: background gradient (id="bg") and a hairline border
export const bgGrad = t =>
  `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.bg[0]}"/><stop offset="1" stop-color="${t.bg[1]}"/></linearGradient>`;
export const border = (w, h, t, rx = 24, stroke = t.edge) =>
  `<rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="${rx}" fill="none" stroke="${stroke}"/>`;

// Dark card behind a whole image (stack, stats, work)
export const panel = (w, h, t) => `<defs>${bgGrad(t)}</defs><rect width="${w}" height="${h}" rx="24" fill="url(#bg)"/>${border(w, h, t)}`;

// Grid math shared by card images: cols, cell width, total height, cell origin
export const grid = (n, W, cols, cellH, pad = 40, gap = 16) => {
  const w = (W - pad * 2 - gap * (cols - 1)) / cols, rows = Math.ceil(n / cols);
  return { w, h: pad * 2 + rows * cellH + (rows - 1) * gap, at: i => [pad + (i % cols) * (w + gap), pad + Math.floor(i / cols) * (cellH + gap)] };
};

// Soft glass cell used by chips, tiles and cards
export const box = (w, h, t, { rx = 16, fill = .035, stroke = t.edge, dash } = {}) =>
  `<rect width="${w}" height="${h}" rx="${rx}" fill="#fff" fill-opacity="${fill}" stroke="${stroke}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
