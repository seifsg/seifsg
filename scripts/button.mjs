// CTA buttons. The main one gets the brand gradient + a light sweep, the rest stay quiet.
import { monoW, mono, fonts, shine, border, svg } from './svg.mjs';

const FS = 18, H = 56, PADX = 26;

export const button = ({ label, primary } = {}, t) => {
  if (!label) throw new Error('button needs a label');
  const w = Math.round(monoW(label, FS) + PADX * 2);
  const defs = primary ? `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.brand}"/>` +
    `<stop offset="1" stop-color="${t.accent}"/></linearGradient>${shine('s', -60, w + 300, 4)}</defs>` : '';
  const sweep = primary ? `<rect width="${w}" height="${H}" rx="12" fill="url(#s)"/>` : '';
  return svg(w, H, label, `<style>${fonts(t)}</style>${defs}<rect width="${w}" height="${H}" rx="12" fill="${primary ? 'url(#g)' : t.panel}"/>` +
    `${sweep}${border(w, H, t, 12, primary ? t.edge : 'rgba(255,255,255,.2)')}` +
    mono(PADX, 35, label, FS, `fill="${primary ? '#fff' : t.text}" font-weight="${primary ? 700 : 500}"`));
};
