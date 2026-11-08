/* Challenge Science Lab - core: helpers, drawing kit, simulation engine, results table and graph. */
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) if (k != null && k !== false) el.append(k.nodeType ? k : document.createTextNode(k));
  return el;
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];
function gauss(sd = 1) { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
const roundTo = (v, step) => Math.round(v / step) * step;
function fmt(v, dp) { if (typeof v !== 'number' || !isFinite(v)) return v == null ? '' : String(v); return dp == null ? String(+v.toPrecision(4)) : v.toFixed(dp); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---------- progress (saved in this browser) ---------- */
const Store = {
  key: 'challenge-science-lab-v1',
  get() { try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch { return {}; } },
  set(fn) { const d = this.get(); fn(d); localStorage.setItem(this.key, JSON.stringify(d)); return d; },
  mark(group, id, val = true) { return this.set(d => { (d[group] ||= {})[id] = val; }); },
  has(group, id) { return !!(this.get()[group] || {})[id]; }
};

/* ---------- sources ---------- */
const SRC = {
  bite: q => ({name: 'BBC Bitesize', url: 'https://www.bbc.co.uk/bitesize/search?q=' + encodeURIComponent(q)}),
  cog: q => ({name: 'Cognito video', url: 'https://www.youtube.com/@Cognitoedu/search?query=' + encodeURIComponent(q)}),
  sme: (url, name = 'Save My Exams') => ({name, url}),
  oak: (url) => ({name: 'Oak National Academy', url}),
  pmt: {name: 'Physics & Maths Tutor', url: 'https://www.physicsandmathstutor.com/'}
};

/* ---------- canvas drawing kit ---------- */
const D = {
  line(c, x1, y1, x2, y2, col = '#333', w = 2) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); },
  rect(c, x, y, w, h, fill, stroke, lw = 1.5, r = 0) {
    c.beginPath(); if (r) c.roundRect(x, y, w, h, r); else c.rect(x, y, w, h);
    if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
  },
  circle(c, x, y, r, fill, stroke, lw = 1.5) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); } },
  text(c, s, x, y, o = {}) {
    c.font = `${o.bold ? '600 ' : ''}${o.size || 13}px system-ui, Segoe UI, sans-serif`;
    c.fillStyle = o.col || '#1d2733'; c.textAlign = o.align || 'left'; c.textBaseline = o.base || 'middle';
    if (o.bg) { const w = c.measureText(s).width, hh = (o.size || 13) + 6; const x0 = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x; D.rect(c, x0 - 4, y - hh / 2, w + 8, hh, o.bg, null, 0, 5); c.fillStyle = o.col || '#1d2733'; }
    c.fillText(s, x, y);
  },
  arrow(c, x1, y1, x2, y2, col = '#c0392b', w = 2.5, head = 9) {
    D.line(c, x1, y1, x2, y2, col, w);
    const a = Math.atan2(y2 - y1, x2 - x1);
    c.fillStyle = col; c.beginPath(); c.moveTo(x2, y2);
    c.lineTo(x2 - head * Math.cos(a - .4), y2 - head * Math.sin(a - .4));
    c.lineTo(x2 - head * Math.cos(a + .4), y2 - head * Math.sin(a + .4)); c.closePath(); c.fill();
  },
  bench(c, W, H, y) { const g = c.createLinearGradient(0, y, 0, H); g.addColorStop(0, '#c9a77c'); g.addColorStop(1, '#a8845a'); c.fillStyle = g; c.fillRect(0, y, W, H - y); D.line(c, 0, y, W, y, '#8a6a44', 2); },
  wall(c, W, H) { const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#f4f7fa'); g.addColorStop(1, '#e4eaf0'); c.fillStyle = g; c.fillRect(0, 0, W, H); },
  stand(c, x, baseY, height, arm, armY) {
    D.rect(c, x - 45, baseY - 10, 90, 10, '#56606b', '#3a424b', 1, 3);
    D.rect(c, x - 4, baseY - height, 8, height - 10, '#9aa4ae', '#6c7680', 1);
    if (arm) { const y = armY ?? baseY - height + 14; D.rect(c, x - 10, y - 8, 20, 16, '#3a424b', null, 0, 3); D.rect(c, x, y - 4, arm, 8, '#9aa4ae', '#6c7680', 1); }
  },
  spring(c, x, y1, y2, coils = 14, w = 10, col = '#7b8a99') {
    c.strokeStyle = col; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y1);
    const lead = 6, L = y2 - y1 - 2 * lead; c.lineTo(x, y1 + lead);
    for (let i = 0; i <= coils * 2; i++) c.lineTo(x + (i % 2 ? w : -w) * (i === 0 || i === coils * 2 ? 0 : 1), y1 + lead + L * i / (coils * 2));
    c.lineTo(x, y2); c.stroke();
  },
  ruler(c, x, y, len, pxPerCm, vertical = true, from = 0, label = true) {
    if (vertical) {
      D.rect(c, x, y, 26, len, '#fdf6d8', '#b8a45a', 1);
      for (let mm = 0; mm * pxPerCm / 10 <= len; mm++) {
        const yy = y + mm * pxPerCm / 10, l = mm % 10 === 0 ? 12 : mm % 5 === 0 ? 8 : 4;
        if (pxPerCm < 12 && mm % 5 && mm % 10) continue;
        D.line(c, x, yy, x + l, yy, '#5b4a14', 1);
        if (label && mm % 10 === 0) D.text(c, String(from + mm / 10), x + 14, yy, {size: 9, col: '#5b4a14'});
      }
    } else {
      D.rect(c, x, y, len, 22, '#fdf6d8', '#b8a45a', 1);
      for (let mm = 0; mm * pxPerCm / 10 <= len; mm++) {
        const xx = x + mm * pxPerCm / 10, l = mm % 10 === 0 ? 10 : mm % 5 === 0 ? 7 : 4;
        if (pxPerCm < 12 && mm % 5 && mm % 10) continue;
        D.line(c, xx, y, xx, y + l, '#5b4a14', 1);
        if (label && mm % 10 === 0) D.text(c, String(from + mm / 10), xx, y + 16, {size: 9, col: '#5b4a14', align: 'center'});
      }
    }
  },
  beaker(c, x, y, w, h, level, liquid = 'rgba(120,180,230,.45)', label) {
    if (level > 0) { const lh = h * level; D.rect(c, x + 2, y + h - lh, w - 4, lh - 2, liquid); D.line(c, x + 2, y + h - lh, x + w - 2, y + h - lh, 'rgba(60,110,160,.6)', 1.5); }
    c.strokeStyle = '#5d7083'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 4, y - 4); c.lineTo(x, y); c.lineTo(x, y + h); c.lineTo(x + w, y + h); c.lineTo(x + w, y); c.stroke();
    if (label) D.text(c, label, x + w / 2, y + h + 14, {size: 11, align: 'center', col: '#4a5868'});
  },
  testTube(c, x, y, w, h, level, liquid, angle = 0) {
    c.save(); c.translate(x, y); c.rotate(angle);
    if (level > 0) { const lh = (h - w / 2) * level + w / 2; c.fillStyle = liquid; c.beginPath(); c.moveTo(-w / 2 + 2, h - lh); c.lineTo(-w / 2 + 2, h - w / 2); c.arc(0, h - w / 2, w / 2 - 2, Math.PI, 0, true); c.lineTo(w / 2 - 2, h - lh); c.closePath(); c.fill(); }
    c.strokeStyle = '#5d7083'; c.lineWidth = 2; c.beginPath(); c.moveTo(-w / 2, 0); c.lineTo(-w / 2, h - w / 2); c.arc(0, h - w / 2, w / 2, Math.PI, 0, true); c.lineTo(w / 2, 0); c.stroke();
    c.restore();
  },
  bunsen(c, x, y, on, t, roaring = true) {
    D.rect(c, x - 22, y - 6, 44, 6, '#4b545e', null, 0, 2);
    D.rect(c, x - 6, y - 52, 12, 46, '#8d98a3', '#5d6772', 1);
    D.rect(c, x - 8, y - 22, 16, 7, '#5d6772');
    if (!on) return;
    const fl = 1 + .08 * Math.sin(t * 25) + .05 * Math.sin(t * 41);
    c.save(); c.translate(x, y - 52);
    let g = c.createLinearGradient(0, 0, 0, -60 * fl);
    if (roaring) { g.addColorStop(0, 'rgba(70,120,255,.9)'); g.addColorStop(1, 'rgba(150,180,255,0)'); }
    else { g.addColorStop(0, 'rgba(255,200,40,.95)'); g.addColorStop(1, 'rgba(255,120,20,0)'); }
    c.fillStyle = g; c.beginPath(); c.moveTo(-7, 0); c.quadraticCurveTo(-9, -30 * fl, 0, -62 * fl); c.quadraticCurveTo(9, -30 * fl, 7, 0); c.fill();
    if (roaring) { c.fillStyle = 'rgba(40,80,230,.9)'; c.beginPath(); c.moveTo(-4, 0); c.quadraticCurveTo(0, -24 * fl, 4, 0); c.fill(); }
    c.restore();
  },
  tripod(c, x, y, top) { D.line(c, x - 30, y, x - 24, top, '#454d56', 3); D.line(c, x + 30, y, x + 24, top, '#454d56', 3); D.line(c, x - 30, top, x + 30, top, '#454d56', 3.5); for (let i = -24; i <= 24; i += 6) D.line(c, x + i, top - 2, x + i, top, '#888', 1); },
  bubbles(c, list, col = 'rgba(255,255,255,.85)', stroke = 'rgba(70,120,170,.8)') { for (const b of list) D.circle(c, b.x, b.y, b.r, col, stroke, 1); },
  mass(c, x, y, n, label) { // slotted masses on hanger: top hook at (x,y)
    D.line(c, x, y, x, y + 10, '#555', 2);
    for (let i = 0; i < n; i++) D.rect(c, x - 16, y + 10 + i * 9, 32, 8, i % 2 ? '#8c96a1' : '#a3adb8', '#555', 1, 2);
    D.rect(c, x - 18, y + 10 + n * 9, 36, 6, '#6d7782', '#444', 1, 2);
    if (label) D.text(c, label, x + 24, y + 14 + n * 4.5, {size: 11, col: '#333'});
    return y + 16 + n * 9;
  },
  lamp(c, x, y, on, dir = 1) {
    D.rect(c, x - 8, y + 30, 16, 40, '#555'); D.rect(c, x - 25, y + 66, 50, 8, '#444', null, 0, 3);
    c.save(); c.translate(x, y); c.fillStyle = '#2d3640'; c.beginPath(); c.moveTo(-20 * dir, -20); c.lineTo(22 * dir, -28); c.lineTo(22 * dir, 28); c.lineTo(-20 * dir, 20); c.closePath(); c.fill();
    if (on) { const g = c.createRadialGradient(22 * dir, 0, 2, 22 * dir, 0, 160); g.addColorStop(0, 'rgba(255,240,150,.55)'); g.addColorStop(1, 'rgba(255,240,150,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(22 * dir, -26); c.lineTo(190 * dir, -110); c.lineTo(190 * dir, 110); c.lineTo(22 * dir, 26); c.closePath(); c.fill(); }
    c.restore();
  },
  thermometer(c, x, y, h, temp, min = 0, max = 110) {
    D.rect(c, x - 5, y, 10, h, '#fff', '#8899aa', 1.5, 5); D.circle(c, x, y + h + 4, 8, '#d33', '#8899aa', 1.5);
    const f = clamp((temp - min) / (max - min), 0, 1); D.rect(c, x - 2, y + h - f * (h - 8), 4, f * (h - 8) + 4, '#d33');
  }
};

/* ---------- shared particle helpers for animation ---------- */
function stepBubbles(list, dt, topY, speed = 40) { for (const b of list) { b.y -= (speed + b.r * 6) * dt; b.x += Math.sin((b.y + b.ph) * .08) * .3; } return list.filter(b => b.y > topY); }

/* ---------- practical registry ---------- */
const PRACTICALS = [];
function practical(def) { PRACTICALS.push(def); }

/* ---------- results: group records into a table ---------- */
function groupRecords(def, data) {
  const T = def.table, groups = new Map();
  let n = 0;
  for (const r of data) {
    const key = (T.noRepeats || !T.x) ? 'u' + (n++) : (T.series ? r[T.series] + '|' : '') + r[T.x.k];
    if (!groups.has(key)) groups.set(key, {rec: r, vals: {}});
    const g = groups.get(key);
    for (const y of T.ys) (g.vals[y.k] ||= []).push(r[y.k]);
  }
  const rows = [...groups.values()].map(g => {
    const mean = {};
    for (const y of T.ys) { const v = g.vals[y.k].filter(n => typeof n === 'number'); mean[y.k] = v.length ? v.reduce((a, b) => a + b, 0) / (T.tally ? 1 : v.length) : g.vals[y.k][0]; }
    const row = {...g.rec, ...mean, _vals: g.vals};
    for (const d of T.derived || []) row[d.k] = d.f(row);
    return row;
  });
  if (T.x && T.sort !== false) rows.sort((a, b) => (T.series && a[T.series] !== b[T.series]) ? String(a[T.series]).localeCompare(String(b[T.series])) : (typeof a[T.x.k] === 'number' ? a[T.x.k] - b[T.x.k] : 0));
  return rows;
}
const unit = u => u ? ` / ${u}` : '';

function renderTable(def, data, el) {
  el.innerHTML = '';
  if (!data.length) { el.append(h('div', {class: 'empty'}, 'No readings yet. Use the apparatus, then press “Record reading”.')); return []; }
  const T = def.table, rows = groupRecords(def, data);
  const reps = Math.max(1, ...rows.map(r => Math.max(...T.ys.map(y => r._vals[y.k].length))));
  const showReps = reps > 1 && !T.noRepeats && !T.tally;
  const tbl = h('table', {class: 'data'});
  const tr1 = h('tr'), tr2 = h('tr');
  if (T.series) tr1.append(h('th', {rowspan: showReps ? 2 : 1}, T.seriesName || 'Series'));
  if (T.x) tr1.append(h('th', {rowspan: showReps ? 2 : 1}, T.x.name + unit(T.x.unit)));
  for (const y of T.ys) {
    if (showReps) { tr1.append(h('th', {colspan: reps + 1}, y.name + unit(y.unit))); for (let i = 1; i <= reps; i++) tr2.append(h('th', null, ['1st', '2nd', '3rd', '4th', '5th'][i - 1] || i + 'th')); tr2.append(h('th', null, 'Mean')); }
    else tr1.append(h('th', null, y.name + unit(y.unit)));
  }
  for (const d of T.derived || []) tr1.append(h('th', {rowspan: showReps ? 2 : 1}, d.name + unit(d.unit)));
  tbl.append(tr1); if (showReps) tbl.append(tr2);
  for (const r of rows) {
    const tr = h('tr');
    if (T.series) tr.append(h('td', null, r[T.series]));
    if (T.x) tr.append(h('td', null, T.x.show ? T.x.show(r[T.x.k]) : fmt(r[T.x.k], T.x.dp)));
    for (const y of T.ys) {
      if (showReps) { for (let i = 0; i < reps; i++) tr.append(h('td', null, fmt(r._vals[y.k][i], y.dp))); tr.append(h('td', {class: 'mean'}, fmt(r[y.k], (y.dp ?? 1) + 1))); }
      else tr.append(h('td', null, fmt(r[y.k], y.dp)));
    }
    for (const d of T.derived || []) tr.append(h('td', {class: 'mean'}, fmt(r[d.k], d.dp)));
    tbl.append(tr);
  }
  el.append(h('div', {class: 'tablewrap'}, tbl));
  return rows;
}

/* ---------- graph (SVG, graph-paper style, crosses for points) ---------- */
const PALETTE = ['#2f6fb8', '#c2622b', '#3d8b3f', '#8e44ad', '#b7791f', '#c0392b', '#16a085'];
function niceStep(range, n = 6) { const raw = range / n, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p; }
function linfit(pts) { const n = pts.length; if (n < 2) return null; let sx = 0, sy = 0, sxx = 0, sxy = 0; for (const [x, y] of pts) { sx += x; sy += y; sxx += x * x; sxy += x * y; } const d = n * sxx - sx * sx; if (!d) return null; const m = (n * sxy - sx * sy) / d; return {m, c: (sy - m * sx) / n}; }

/* series: [{name, pts:[[x,y,{anom}]], color, fit:'line'|'curve'|'none', curve:fn}] */
function drawGraph(el, o) {
  const W = 620, H = 400, L = 66, R = 18, T = 18, B = 56;
  let xs = [], ys = [];
  for (const s of o.series) for (const p of s.pts) { xs.push(p[0]); ys.push(p[1]); }
  if (!xs.length) { el.innerHTML = '<div class="empty">The graph appears once you have readings.</div>'; return; }
  let x0 = o.xmin ?? Math.min(0, ...xs), x1 = o.xmax ?? Math.max(...xs), y0 = o.ymin ?? Math.min(0, ...ys), y1 = o.ymax ?? Math.max(...ys);
  if (x1 === x0) x1 = x0 + 1; if (y1 === y0) y1 = y0 + 1;
  const xs_ = niceStep(x1 - x0), ys_ = niceStep(y1 - y0);
  x0 = Math.floor(x0 / xs_) * xs_; x1 = Math.ceil(x1 / xs_) * xs_; y0 = Math.floor(y0 / ys_) * ys_; y1 = Math.ceil(y1 / ys_) * ys_;
  const X = v => L + (v - x0) / (x1 - x0) * (W - L - R), Y = v => H - B - (v - y0) / (y1 - y0) * (H - T - B);
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,Segoe UI,sans-serif">`;
  // graph paper: minor grid
  for (let v = x0; v <= x1 + 1e-9; v += xs_ / 10) s += `<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${H - B}" stroke="#e3eef0" stroke-width="1"/>`;
  for (let v = y0; v <= y1 + 1e-9; v += ys_ / 10) s += `<line x1="${L}" y1="${Y(v)}" x2="${W - R}" y2="${Y(v)}" stroke="#e3eef0" stroke-width="1"/>`;
  for (let v = x0; v <= x1 + 1e-9; v += xs_) s += `<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${H - B}" stroke="#bcd5da" stroke-width="1"/><text x="${X(v)}" y="${H - B + 17}" font-size="12" text-anchor="middle" fill="#334">${+v.toFixed(6)}</text>`;
  for (let v = y0; v <= y1 + 1e-9; v += ys_) s += `<line x1="${L}" y1="${Y(v)}" x2="${W - R}" y2="${Y(v)}" stroke="#bcd5da" stroke-width="1"/><text x="${L - 7}" y="${Y(v) + 4}" font-size="12" text-anchor="end" fill="#334">${+v.toFixed(6)}</text>`;
  s += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#223" stroke-width="1.6"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="#223" stroke-width="1.6"/>`;
  s += `<text x="${(L + W - R) / 2}" y="${H - 12}" font-size="13.5" text-anchor="middle" font-weight="600" fill="#223">${o.xLabel}</text>`;
  s += `<text transform="translate(17 ${(T + H - B) / 2}) rotate(-90)" font-size="13.5" text-anchor="middle" font-weight="600" fill="#223">${o.yLabel}</text>`;
  s += `<clipPath id="pc"><rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}"/></clipPath>`;
  o.series.forEach((se, i) => {
    const col = se.color || PALETTE[i % PALETTE.length];
    const good = se.pts.filter(p => !(p[2] && p[2].anom));
    if (se.fit === 'line' && good.length >= 2) {
      const f = linfit(good); if (f) { const a = o.fitFrom ?? x0, b = x1; s += `<line clip-path="url(#pc)" x1="${X(a)}" y1="${Y(f.m * a + f.c)}" x2="${X(b)}" y2="${Y(f.m * b + f.c)}" stroke="${col}" stroke-width="2" opacity=".8"/>`; se.fitResult = f; }
    } else if (se.fit === 'curve' && se.curve && good.length >= 2) {
      const lo = Math.min(...good.map(p => p[0])), hi = Math.max(...good.map(p => p[0]));
      let d = ''; for (let k = 0; k <= 80; k++) { const x = lerp(o.curveFrom ?? lo, hi, k / 80), y = se.curve(x); d += (k ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(y).toFixed(1); }
      s += `<path clip-path="url(#pc)" d="${d}" fill="none" stroke="${col}" stroke-width="2" opacity=".8"/>`;
    } else if (se.fit === 'join' && good.length >= 2) {
      const g = good.slice().sort((a, b) => a[0] - b[0]); s += `<polyline points="${g.map(p => X(p[0]) + ',' + Y(p[1])).join(' ')}" fill="none" stroke="${col}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
    }
    for (const p of se.pts) {
      const x = X(p[0]), y = Y(p[1]), k = 5;
      s += `<path d="M${x - k} ${y - k}L${x + k} ${y + k}M${x - k} ${y + k}L${x + k} ${y - k}" stroke="${col}" stroke-width="2.2"/>`;
      if (p[2] && p[2].anom) s += `<circle cx="${x}" cy="${y}" r="11" fill="none" stroke="#c0392b" stroke-width="1.8"/><text x="${x + 14}" y="${y - 8}" font-size="11" fill="#c0392b">anomaly</text>`;
    }
  });
  s += '</svg>';
  el.innerHTML = s;
  if (o.series.length > 1 || o.series[0].name) el.append(h('div', {class: 'legend'}, o.series.map((se, i) => h('span', null, h('i', {style: `background:${se.color || PALETTE[i % PALETTE.length]}`}), se.name))));
}

function drawBars(el, o) { // categorical bar chart / histogram: o.bars=[{label, value}], o.hist (touching bars)
  const W = 620, H = 380, L = 60, R = 16, T = 16, B = 70, n = o.bars.length;
  const ymax0 = Math.max(1, ...o.bars.map(b => b.value)), st = niceStep(ymax0, 5), ymax = Math.ceil(ymax0 / st) * st;
  const Y = v => H - B - v / ymax * (H - T - B), bw = (W - L - R) / n;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,Segoe UI,sans-serif">`;
  for (let v = 0; v <= ymax + 1e-9; v += st) s += `<line x1="${L}" y1="${Y(v)}" x2="${W - R}" y2="${Y(v)}" stroke="#d8e6ea"/><text x="${L - 7}" y="${Y(v) + 4}" font-size="12" text-anchor="end">${+v.toFixed(4)}</text>`;
  o.bars.forEach((b, i) => {
    const gap = o.hist ? 0 : bw * .22, x = L + i * bw + gap / 2;
    s += `<rect x="${x}" y="${Y(b.value)}" width="${bw - gap}" height="${H - B - Y(b.value)}" fill="${b.color || '#5b9bd5'}" stroke="#2c4f73" stroke-width="1"/>`;
    s += `<text x="${L + i * bw + bw / 2}" y="${H - B + 16}" font-size="11.5" text-anchor="middle">${b.label}</text>`;
  });
  s += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#223" stroke-width="1.6"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="#223" stroke-width="1.6"/>`;
  s += `<text x="${(L + W - R) / 2}" y="${H - 18}" font-size="13.5" text-anchor="middle" font-weight="600">${o.xLabel}</text><text transform="translate(16 ${(T + H - B) / 2}) rotate(-90)" font-size="13.5" text-anchor="middle" font-weight="600">${o.yLabel}</text></svg>`;
  el.innerHTML = s;
}

/* ---------- simulation engine ---------- */
function mountSim(def, host) {
  const sim = def.sim, W = sim.w || 720, H = sim.h || 440;
  const s = sim.init(); s.t = 0; s.W = W; s.H = H;
  let data = [], running = true, demoRun = 0;
  const cv = h('canvas', {width: W * 2, height: H * 2, 'aria-label': def.title + ' simulation'});
  const ctx = cv.getContext('2d'); ctx.scale(2, 2);
  const cap = h('div', {class: 'caption'});
  const ro = h('div', {class: 'readout'});
  const stage = h('div', {class: 'stage'}, cv, cap);
  const msg = h('div', {class: 'msg'});
  const inputs = {};
  const say = (t, bad, ms = 3200) => { msg.textContent = t; msg.className = 'msg show' + (bad ? ' bad' : ''); clearTimeout(say.tm); if (ms) say.tm = setTimeout(() => msg.className = 'msg', ms); };
  const caption = (t) => { cap.textContent = t || ''; cap.classList.toggle('show', !!t); };
  const api = {say, caption, record: () => recordNow(), get data() { return data; }, sync: () => syncInputs(), redraw: () => refreshResults()};
  s.api = api;

  const ctl = h('div', {class: 'controls'});
  for (const c of sim.controls || []) {
    if (c.type === 'range') {
      const out = h('output'), inp = h('input', {type: 'range', min: c.min, max: c.max, step: c.step || 1, value: s[c.key]});
      const show = () => out.textContent = (c.fmt ? c.fmt(+inp.value) : inp.value) + (c.unit ? ' ' + c.unit : '');
      inp.addEventListener('input', () => { s[c.key] = +inp.value; show(); c.change && c.change(s, api); });
      inputs[c.key] = {set: v => { inp.value = v; show(); }}; show();
      ctl.append(h('div', {class: 'ctl'}, h('label', null, c.label, out), inp));
    } else if (c.type === 'select') {
      const sel = h('select', null, c.options.map(([v, l]) => h('option', {value: v}, l)));
      sel.value = s[c.key];
      sel.addEventListener('change', () => { s[c.key] = isNaN(+sel.value) || sel.value === '' ? sel.value : +sel.value; c.change && c.change(s, api); });
      inputs[c.key] = {set: v => sel.value = v};
      ctl.append(h('div', {class: 'ctl'}, h('label', null, c.label), sel));
    } else if (c.type === 'buttons') {
      ctl.append(h('div', {class: 'btns'}, c.items.map(b => h('button', {class: 'btn' + (b.primary ? ' primary' : ''), onclick: () => { b.act(s, api); syncInputs(); }}, b.label))));
    } else if (c.type === 'note') ctl.append(h('div', {class: 'small muted'}, c.text));
  }
  const recBtn = h('button', {class: 'btn primary', onclick: () => recordNow()}, sim.recordLabel || 'Record reading');
  const demoBtn = h('button', {class: 'btn', onclick: () => runDemo()}, '▶ Watch demo');
  const clearBtn = h('button', {class: 'btn ghost', onclick: () => { data = []; refreshResults(); say('Results cleared.'); }}, 'Clear results');
  ctl.append(h('div', {class: 'btns'}, sim.read ? recBtn : null, def.demo ? demoBtn : null, sim.read ? clearBtn : null), msg);
  function syncInputs() { for (const [k, i] of Object.entries(inputs)) i.set(s[k]); }

  const tableEl = h('div'), graphEl = h('div', {class: 'graph'}), anomBox = h('label', {class: 'small'});
  let showAnom = false;
  if (def.graph && !def.graph.bars) { const cb = h('input', {type: 'checkbox', onchange: e => { showAnom = e.target.checked; refreshResults(); }}); anomBox.append(cb, ' Show anomalies (points far from the trend)'); }

  function recordNow() {
    const r = sim.read(s, api);
    if (!r) return;
    if (typeof r === 'string') { say(r, true); return; }
    (Array.isArray(r) ? r : [r]).forEach(x => data.push(x));
    refreshResults(); say(sim.recordMsg ? sim.recordMsg(r) : 'Reading recorded.');
    Store.mark('practicals', def.id);
  }
  function refreshResults() {
    const rows = renderTable(def, data, tableEl);
    if (!def.graph) return;
    if (def.graph.bars) { if (!rows.length) graphEl.innerHTML = '<div class="empty">The chart appears once you have readings.</div>'; else drawBars(graphEl, def.graph.bars(rows, s)); return; }
    const G = def.graph, T = def.table;
    const groups = {};
    for (const r of rows) { const k = T.series ? r[T.series] : ''; (groups[k] ||= []).push(r); }
    const series = [];
    for (const yk of G.y) for (const [name, rs] of Object.entries(groups)) {
      const pts = rs.map(r => [G.xf ? G.xf(r) : r[G.x], G.yf ? G.yf(r, yk) : r[yk], {}]).filter(p => isFinite(p[0]) && isFinite(p[1]));
      if (showAnom && G.model) for (const p of pts) { const exp = G.model(p[0], name, yk, s); if (Math.abs(p[1] - exp) > (G.anomTol ? G.anomTol(exp) : Math.max(.15 * Math.abs(exp), .2))) p[2].anom = true; }
      series.push({name: (G.y.length > 1 ? (G.yName?.[yk] || yk) : '') + (name ? (G.y.length > 1 ? ' – ' : '') + name : ''), pts, fit: G.fit, curve: G.model ? x => G.model(x, name, yk, s) : null, color: G.colors ? G.colors(name, yk) : null});
    }
    drawGraph(graphEl, {series, xLabel: G.xLabel, yLabel: G.yLabel, xmin: G.xmin, ymin: G.ymin, xmax: G.xmax, ymax: G.ymax, curveFrom: G.curveFrom});
  }

  async function runDemo() {
    const id = ++demoRun; demoBtn.disabled = true; data = []; refreshResults();
    if (sim.reset) sim.reset(s, api);
    for (const st of def.demo) {
      if (id !== demoRun || !running) break;
      if (st.set) Object.assign(s, typeof st.set === 'function' ? st.set(s) : st.set);
      if (st.act) st.act(s, api);
      syncInputs(); if (st.say) caption(st.say);
      await new Promise(r => setTimeout(r, st.wait ?? 1400));
      if (st.record) recordNow();
    }
    caption(''); demoBtn.disabled = false;
  }

  // pointer events for draggable sims
  const pos = e => { const b = cv.getBoundingClientRect(); return {x: (e.clientX - b.left) / b.width * W, y: (e.clientY - b.top) / b.height * H}; };
  if (sim.pointer) {
    let down = false;
    cv.addEventListener('pointerdown', e => { down = true; cv.setPointerCapture(e.pointerId); sim.pointer('down', pos(e), s, api); syncInputs(); });
    cv.addEventListener('pointermove', e => { const r = sim.pointer(down ? 'drag' : 'move', pos(e), s, api); cv.style.cursor = r || 'default'; if (down) syncInputs(); });
    cv.addEventListener('pointerup', e => { down = false; sim.pointer('up', pos(e), s, api); });
  }

  let last = performance.now();
  function frame(now) {
    if (!running) return;
    if (!document.body.contains(cv)) { running = false; return; }
    const dt = Math.min(.05, (now - last) / 1000); last = now; s.t += dt;
    sim.step && sim.step(s, dt, api);
    ctx.clearRect(0, 0, W, H); sim.draw(ctx, s, api);
    if (sim.readout) { const items = sim.readout(s); ro.innerHTML = items.map(([k, v]) => `<span>${k}: <b>${v}</b></span>`).join(''); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if (sim.readout) stage.append(ro);
  refreshResults();
  host.append(h('div', {class: 'labwrap'},
    h('div', null, stage),
    h('div', {class: 'card'}, h('h3', null, 'Controls'), ctl)));
  return {tableEl, graphEl, anomBox, s, stop: () => { running = false; demoRun++; }};
}
