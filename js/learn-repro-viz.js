/* Diagrams for the reproduction lessons: mitosis, meiosis, asexual vs sexual, and the menstrual cycle.
   Simplified to 4 chromosomes (2 pairs) so you can follow each one; human body cells have 46 (23 pairs). */
'use strict';

/* a chromosome: one bar, or two joined copies (X shape) once it has copied itself */
function drawChrom(c, x, y, len, col, copied, alpha = 1) {
  c.save(); c.globalAlpha = alpha;
  const bar = (dx, ang) => { c.save(); c.translate(x + dx, y); c.rotate(ang); D.rect(c, -4.5, -len / 2, 9, len, col, 'rgba(0,0,0,.35)', 1, 4.5); c.restore(); };
  if (copied) { bar(0, -0.22); bar(0, 0.22); D.circle(c, x, y, 3.2, '#333'); } else bar(0, 0);
  c.restore();
}
function stageControls(n, texts, setTarget, getP) {
  const read = h('div', {class: 'readout prose', style: 'min-height:96px'});
  const prog = h('div', {class: 'small muted'});
  let playing = false, pending = false;
  let cur = 0;
  const go = k => { cur = clamp(k, 0, n - 1); setTarget(cur); };
  const play = h('button', {class: 'btn primary', onclick: () => { playing = !playing; if (playing && Math.round(getP()) >= n - 1) go(0); else if (playing) go(cur + 1); play.textContent = playing ? '❚❚ Pause' : '▶ Play all'; }}, '▶ Play all');
  const ctl = h('div', null,
    h('div', {class: 'btns'}, h('button', {class: 'btn', onclick: () => { playing = false; play.textContent = '▶ Play all'; go(cur - 1); }}, '← Back'), h('button', {class: 'btn', onclick: () => { playing = false; play.textContent = '▶ Play all'; go(cur + 1); }}, 'Next →'), play),
    read, prog);
  return {ctl, update(p, target) {
    const k = Math.round(p); read.innerHTML = texts[k]; prog.textContent = `Stage ${k + 1} of ${n}`;
    if (playing && !pending && Math.abs(p - target) < .01) {
      if (target < n - 1) { pending = true; setTimeout(() => { pending = false; if (playing) go(target + 1); }, 1400); }
      else { playing = false; play.textContent = '▶ Play all'; }
    }
  }, get playing() { return playing; }};
}
const lerpP = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
function cellOutline(c, x, y, rx, ry, fill = 'rgba(233,244,232,.9)') { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 7); c.fillStyle = fill; c.fill(); c.strokeStyle = '#3d8b3f'; c.lineWidth = 2.5; c.stroke(); }

/* ---------- mitosis ---------- */
VIZ.mitosis = function (box) {
  const W = 720, H = 340, [cv, c] = vcanvas(W, H);
  const CH = [{len: 70, col: '#c0392b'}, {len: 70, col: '#2f6fb8'}, {len: 42, col: '#c0392b'}, {len: 42, col: '#2f6fb8'}];
  const start = [[315, 140], [405, 150], [330, 240], [400, 235]], line = [[360, 62], [360, 136], [360, 206], [360, 260]];
  const texts = [
    '<b>1. The parent cell.</b> Its nucleus holds 4 chromosomes in 2 pairs (long and short). In each pair, one came from the mother (red) and one from the father (blue).',
    '<b>2. The chromosomes copy themselves.</b> Each DNA molecule is copied exactly, so each chromosome is now two identical copies joined in the middle (an X shape).',
    '<b>3. The copied chromosomes line up across the middle of the cell.</b> They sit one under another along the centre.',
    '<b>4. The two copies of each chromosome are pulled apart</b> to opposite ends of the cell, so each end gets one copy of every chromosome.',
    '<b>5. The cell splits in two.</b> Each new cell has the same 4 chromosomes as the parent cell: two <b>genetically identical</b> cells. This is how you grow, repair damage, and how organisms reproduce asexually.'];
  let p = 0, target = 0;
  const sc = stageControls(5, texts, t => { target = t; }, () => p);
  box.jump = k => { p = k; target = k; };
  vlayout(box, cv, sc.ctl, h('p', {class: 'small muted'}, 'Real human body cells have 46 chromosomes (23 pairs). Only 4 are shown so you can follow each one.'));
  vloop(cv, dt => {
    p += clamp(target - p, -dt * 1.1, dt * 1.1);
    c.fillStyle = '#f6f4ef'; c.fillRect(0, 0, W, H);
    const s3 = clamp(p - 3, 0, 1);
    if (p < 3) cellOutline(c, 360, 178, 190, 150);
    else { cellOutline(c, lerp(360, 200, s3), 178, lerp(190, 140, s3), lerp(150, 130, s3)); cellOutline(c, lerp(360, 520, s3), 178, lerp(190, 140, s3), lerp(150, 130, s3)); }
    if (p < 1.5) { c.save(); c.setLineDash([5, 4]); c.globalAlpha = 1 - clamp(p - .5, 0, 1); D.circle(c, 360, 190, 95, null, '#3d8b3f', 1.5); c.restore(); }
    if (p > 3.6) { c.save(); c.setLineDash([5, 4]); c.globalAlpha = clamp((p - 3.6) / .4, 0, 1); D.circle(c, 200, 178, 72, null, '#3d8b3f', 1.5); D.circle(c, 520, 178, 72, null, '#3d8b3f', 1.5); c.restore(); }
    CH.forEach((ch, i) => {
      if (p < 2) { const [x, y] = lerpP(start[i], line[i], clamp(p - 1, 0, 1)); drawChrom(c, x, y, ch.len, ch.col, p >= .9); }
      else {
        const k = clamp(p - 2, 0, 1), y = line[i][1];
        const xl = p < 3 ? lerp(352, 250, k) : lerp(250, 200, s3), xr = p < 3 ? lerp(368, 470, k) : lerp(470, 520, s3);
        const yy = p < 3 ? y : lerp(y, [95, 160, 215, 255][i], s3);
        if (k < .05) drawChrom(c, 360, y, ch.len, ch.col, true); else { drawChrom(c, xl, yy, ch.len * (p < 3 ? 1 : lerp(1, .8, s3)), ch.col, false); drawChrom(c, xr, yy, ch.len * (p < 3 ? 1 : lerp(1, .8, s3)), ch.col, false); }
      }
    });
    if (p > 3.9) { D.text(c, 'identical', 200, 322, {size: 13, bold: true, align: 'center', col: '#3d8b3f'}); D.text(c, 'identical', 520, 322, {size: 13, bold: true, align: 'center', col: '#3d8b3f'}); }
    D.text(c, 'MITOSIS: 1 cell → 2 identical cells', 16, 18, {size: 13, bold: true, col: '#3d8b3f'});
    sc.update(p, target);
  });
};

/* ---------- meiosis ---------- */
VIZ.meiosis = function (box) {
  const W = 720, H = 340, [cv, c] = vcanvas(W, H);
  const CH = [{len: 64, col: '#c0392b', pair: 0}, {len: 64, col: '#2f6fb8', pair: 0}, {len: 38, col: '#c0392b', pair: 1}, {len: 38, col: '#2f6fb8', pair: 1}];
  const start = [[300, 140], [410, 150], [330, 235], [400, 240]];
  let o = [0, 1]; // which way each pair lines up (0: red goes left)
  const texts = [
    '<b>1. A cell in the testis or ovary.</b> It has 4 chromosomes in 2 pairs: one of each pair from the mother (red), one from the father (blue).',
    '<b>2. The chromosomes copy themselves.</b> Just as in mitosis, each is now an X of two identical copies.',
    '<b>3. Matching pairs line up side by side in the middle.</b> Which way round each pair lines up is random.',
    '<b>4. First division: the pairs are separated.</b> Each new cell gets <b>one</b> chromosome from each pair, so it now has half the number of chromosomes.',
    '<b>5. Second division: the copies are pulled apart.</b> The result is <b>4 gametes</b> (sex cells), each with 2 chromosomes, half the original 4, and they are <b>not all the same</b>. Press “Shuffle” and play again to see a different mix.'];
  let p = 0, target = 0;
  const sc = stageControls(5, texts, t => { target = t; }, () => p);
  box.jump = k => { p = k; target = k; };
  vlayout(box, cv, sc.ctl, h('button', {class: 'btn', onclick: () => { o = [Math.random() < .5 ? 0 : 1, Math.random() < .5 ? 0 : 1]; p = Math.min(p, 2); target = Math.min(target, 2); }}, '🔀 Shuffle how the pairs line up'),
    h('p', {class: 'small muted'}, 'In humans: 46 chromosomes → gametes with 23. With 23 pairs lining up at random, one person can make over 8 million different combinations.'));
  const cells2 = [190, 530], cells4 = [100, 270, 450, 620];
  vloop(cv, dt => {
    p += clamp(target - p, -dt * 1.1, dt * 1.1);
    c.fillStyle = '#f6f4ef'; c.fillRect(0, 0, W, H);
    const k3 = clamp((p - 2.5) * 2, 0, 1), k4 = clamp((p - 3.5) * 2, 0, 1);
    if (p < 2.5) cellOutline(c, 360, 180, 200, 150);
    else if (p < 3.5) cells2.forEach(x => cellOutline(c, lerp(360, x, k3), 180, lerp(200, 140, k3), 140));
    else cells2.forEach((x, j) => [0, 1].forEach(m => cellOutline(c, lerp(x, cells4[j * 2 + m], k4), 180, lerp(140, 76, k4), lerp(140, 100, k4))));
    CH.forEach((ch, i) => {
      const isRed = i % 2 === 0, side = (isRed ? 0 : 1) ^ o[ch.pair]; // 0 = left cell
      const yPair = ch.pair === 0 ? 140 : 230, linePos = [side === 0 ? 345 : 375, yPair];
      if (p < 2) { const [x, y] = lerpP(start[i], linePos, clamp(p - 1, 0, 1)); drawChrom(c, x, y, ch.len, ch.col, p >= .9); return; }
      if (p < 3) { const [x, y] = lerpP(linePos, [cells2[side], yPair], clamp(p - 2, 0, 1)); drawChrom(c, x, y, ch.len, ch.col, true); return; }
      const kk = clamp(p - 3, 0, 1);
      if (kk < .05) { drawChrom(c, cells2[side], yPair, ch.len, ch.col, true); return; }
      [0, 1].forEach(m => { const tx = cells4[side * 2 + m], ty = ch.pair === 0 ? 150 : 215; const [x, y] = lerpP([cells2[side] + (m ? 6 : -6), yPair], [tx, ty], kk); drawChrom(c, x, y, ch.len * lerp(1, .85, kk), ch.col, false); });
    });
    if (p > 3.9) cells4.forEach((x, j) => D.text(c, 'gamete', x, 300, {size: 12, bold: true, align: 'center', col: '#3d8b3f'}));
    D.text(c, 'MEIOSIS: 1 cell → 4 different gametes with half the chromosomes', 16, 18, {size: 13, bold: true, col: '#3d8b3f'});
    sc.update(p, target);
  });
};

/* ---------- asexual vs sexual: who do the offspring look like? ---------- */
VIZ.sexasex = function (box) {
  const W = 720, H = 360, [cv, c] = vcanvas(W, H);
  const A = {top: ['#c0392b', '#e67e22', '#f1c40f', '#8e44ad'], bot: ['#2f6fb8', '#16a085', '#7f8c8d', '#d35400']};
  const P1 = {top: ['#c0392b', '#e67e22', '#f1c40f', '#8e44ad'], bot: ['#e84393', '#fd79a8', '#fab1a0', '#6c5ce7']};
  const P2 = {top: ['#2f6fb8', '#16a085', '#00b894', '#0984e3'], bot: ['#2d3436', '#636e72', '#55efc4', '#81ecec']};
  let kids = [];
  const gamete = P => P.top.map((t, i) => Math.random() < .5 ? t : P.bot[i]);
  const breed = () => { kids = [0, 1, 2].map(() => ({g1: gamete(P1), g2: gamete(P2)})); };
  breed();
  const org = (x, y, r, top, bot) => { c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.clip(); const w = 2 * r / 4; top.forEach((col, i) => { D.rect(c, x - r + i * w, y - r, w, r, col); D.rect(c, x - r + i * w, y, w, r, bot[i]); }); c.restore(); D.circle(c, x, y, r, null, '#333', 2); };
  const gam = (x, y, genes) => { c.save(); c.beginPath(); c.arc(x, y, 17, 0, 7); c.clip(); genes.forEach((col, i) => D.rect(c, x - 17 + i * 8.5, y - 17, 8.5, 34, col)); c.restore(); D.circle(c, x, y, 17, null, '#333', 1.5); };
  vlayout(box, cv, h('button', {class: 'btn primary', onclick: breed}, '🔁 Make new offspring'),
    h('p', {class: 'small'}, 'Each circle is an organism. Each stripe is a gene; its top and bottom halves are the two alleles (versions), one from each parent.'),
    h('p', {class: 'small muted'}, 'Press the button several times. The asexual offspring never change; the sexual offspring are different every time.'));
  vloop(cv, () => {
    c.fillStyle = '#f6f4ef'; c.fillRect(0, 0, W, H);
    D.line(c, 300, 20, 300, 345, '#c9d2dc', 2);
    D.text(c, 'ASEXUAL: one parent', 150, 18, {size: 14, bold: true, align: 'center', col: '#2f6fb8'});
    org(150, 85, 34, A.top, A.bot); D.text(c, 'parent', 150, 132, {size: 11, align: 'center', col: '#555'});
    D.arrow(c, 130, 140, 90, 205, '#555', 2, 7); D.arrow(c, 170, 140, 210, 205, '#555', 2, 7);
    D.text(c, 'mitosis', 150, 175, {size: 12, bold: true, align: 'center', col: '#3d8b3f'});
    org(80, 245, 34, A.top, A.bot); org(220, 245, 34, A.top, A.bot);
    D.text(c, 'offspring are clones:', 150, 305, {size: 12, bold: true, align: 'center'}); D.text(c, 'identical to the parent', 150, 323, {size: 12, align: 'center'});
    D.text(c, 'SEXUAL: two parents', 510, 18, {size: 14, bold: true, align: 'center', col: '#c0392b'});
    org(420, 70, 30, P1.top, P1.bot); org(600, 70, 30, P2.top, P2.bot);
    D.text(c, 'meiosis', 510, 112, {size: 12, bold: true, align: 'center', col: '#3d8b3f'});
    D.arrow(c, 420, 103, 420, 128, '#555', 2, 6); D.arrow(c, 600, 103, 600, 128, '#555', 2, 6);
    gam(420, 148, kids[0].g1); gam(600, 148, kids[0].g2);
    D.text(c, 'gametes (half the genes)', 510, 148, {size: 10.5, align: 'center', col: '#555'});
    D.arrow(c, 432, 165, 475, 220, '#555', 2, 6); D.arrow(c, 588, 165, 545, 220, '#555', 2, 6);
    D.text(c, 'fertilisation', 510, 195, {size: 12, bold: true, align: 'center', col: '#3d8b3f'});
    [[420, 0], [510, 1], [600, 2]].forEach(([x, k]) => org(x, 255, 30, kids[k].g1, kids[k].g2));
    D.text(c, 'offspring vary: each gets', 510, 305, {size: 12, bold: true, align: 'center'}); D.text(c, 'a different mix of alleles', 510, 323, {size: 12, align: 'center'});
  });
};

/* ---------- the menstrual cycle (no hormones: not examined) ---------- */
VIZ.menstrual = function (box) {
  const W = 720, H = 380, [cv, c] = vcanvas(W, H);
  let day = 1, play = false, fert = false, acc = 0;
  const lining = d => d <= 5 ? 0.9 - 0.65 * (d - 1) / 4 : d <= 14 ? 0.25 + 0.45 * (d - 5) / 9 : d <= 21 ? 0.7 + 0.3 * (d - 14) / 7 : 1;
  const read = h('div', {class: 'readout prose', style: 'min-height:84px'});
  const dayOut = h('output', null, 'Day 1'), inp = h('input', {type: 'range', min: 1, max: 28, step: .1, value: 1});
  inp.oninput = () => { day = +inp.value; play = false; pb.textContent = '▶ Play the cycle'; };
  const pb = h('button', {class: 'btn primary', onclick: () => { play = !play; if (play && day >= 28) day = 1; pb.textContent = play ? '❚❚ Pause' : '▶ Play the cycle'; }}, '▶ Play the cycle');
  const fsel = vselect('Is the egg fertilised?', [['no', 'No (the usual cycle)'], ['yes', 'Yes: pregnancy']], v => { fert = v === 'yes'; });
  vlayout(box, cv, h('div', {class: 'ctl'}, h('label', null, 'Day of the cycle', dayOut), inp), h('div', {class: 'btns'}, pb), fsel, read,
    h('p', {class: 'small muted'}, 'A typical cycle is about 28 days, but anything from about 21 to 35 days is normal, and cycles are often irregular at first. Hormones control the cycle but are not examined in the Challenge.'));
  const phase = d => {
    if (fert && d >= 15) return d < 21 ? '<b>Fertilised.</b> The egg was fertilised in the oviduct and is now a tiny ball of cells (an embryo) moving down to the uterus. The lining stays thick and keeps building.' : '<b>Implantation and pregnancy.</b> The embryo sinks into the thick lining (about a week after fertilisation). The lining is kept to nourish it, so there is <b>no period</b>: periods stop during pregnancy.';
    if (d < 6) return '<b>Days 1–5: menstruation (a period).</b> The thick lining of the uterus breaks down and leaves the body through the vagina, with a little blood.';
    if (d < 13.5) return '<b>Days 6–13: the lining rebuilds.</b> The uterus lining thickens again and grows a good blood supply, ready to receive a fertilised egg. Meanwhile an egg is maturing in one of the ovaries.';
    if (d < 15) return '<b>About day 14: ovulation.</b> A mature egg is released from an ovary into the oviduct. This is when the woman is most likely to become pregnant.';
    if (d < 18) return '<b>Days 15–17: the egg travels down the oviduct.</b> Cilia waft it towards the uterus. If it does not meet a sperm, it dies within about a day.';
    return '<b>Days 18–28: the lining is kept thick.</b> It is ready in case an embryo arrives. If no egg was fertilised, the lining starts to break down at the end of the cycle and a new period begins: day 1 again.';
  };
  vloop(cv, dt => {
    if (play) { day += dt * 2.2; if (day >= 28.9) { day = fert ? 28.9 : 1; if (fert) { play = false; pb.textContent = '▶ Play the cycle'; } } inp.value = Math.min(28, day); }
    const d = Math.min(28, day), th = lining(d);
    dayOut.textContent = 'Day ' + Math.floor(d); read.innerHTML = phase(d);
    c.fillStyle = '#f6f4ef'; c.fillRect(0, 0, W, H);
    // --- graph of lining thickness
    const gx = 40, gy = 40, gw = 300, gh = 150;
    D.text(c, 'Thickness of the uterus lining', gx, 22, {size: 13, bold: true});
    D.rect(c, gx, gy, gw, gh, '#fff', '#c9d2dc', 1);
    const X = dd => gx + (dd - 1) / 27 * gw, Y = v => gy + gh - v * (gh - 10);
    D.rect(c, X(1), gy, X(5.5) - X(1), gh, 'rgba(192,57,43,.12)'); D.text(c, 'period', (X(1) + X(5.5)) / 2, gy + 12, {size: 10, align: 'center', col: '#c0392b'});
    D.line(c, X(14), gy, X(14), gy + gh, 'rgba(47,111,184,.6)', 1.5); D.text(c, 'egg released', X(14), gy + 12, {size: 10, align: 'center', col: '#2f6fb8'});
    c.beginPath(); for (let dd = 1; dd <= 28; dd += .25) { const v = lining(dd); dd === 1 ? c.moveTo(X(dd), Y(v)) : c.lineTo(X(dd), Y(v)); } c.strokeStyle = '#c0392b'; c.lineWidth = 2.5; c.stroke();
    D.circle(c, X(d), Y(th), 6, '#c0392b', '#fff', 2);
    [1, 7, 14, 21, 28].forEach(dd => D.text(c, String(dd), X(dd), gy + gh + 12, {size: 10, align: 'center', col: '#7b8794'}));
    D.text(c, 'day', gx + gw / 2, gy + gh + 26, {size: 11, align: 'center', col: '#4a5868'});
    // --- 28-day timeline
    const ty = 262; D.text(c, 'The 28-day cycle', gx, ty - 14, {size: 13, bold: true});
    for (let dd = 1; dd <= 28; dd++) { const col = dd <= 5 ? '#e17070' : dd === 14 ? '#2f6fb8' : dd < 14 ? '#f4c6c6' : '#f0a9a9'; D.rect(c, X(dd) - gw / 56, ty, gw / 28 - 1, 22, col); }
    D.arrow(c, X(d), ty + 46, X(d), ty + 26, '#222', 2, 6);
    D.text(c, 'period', X(3), ty + 36, {size: 10, align: 'center', col: '#c0392b'}); D.text(c, 'lining rebuilds', X(9.5), ty + 36, {size: 10, align: 'center'}); D.text(c, 'ovulation', X(14), ty + 60, {size: 10, align: 'center', col: '#2f6fb8'}); D.text(c, 'lining kept thick', X(21.5), ty + 36, {size: 10, align: 'center'});
    // --- diagram of the female reproductive system
    const cx = 540;
    D.text(c, 'Female reproductive system (front view)', cx, 22, {size: 13, bold: true, align: 'center'});
    const ovL = [418, 150], ovR = [662, 150];
    c.strokeStyle = '#d98c9a'; c.lineWidth = 9; c.lineCap = 'round';
    c.beginPath(); c.moveTo(cx - 48, 112); c.quadraticCurveTo(cx - 95, 70, ovL[0] + 10, 125); c.stroke();
    c.beginPath(); c.moveTo(cx + 48, 112); c.quadraticCurveTo(cx + 95, 70, ovR[0] - 10, 125); c.stroke(); c.lineCap = 'butt';
    [ovL, ovR].forEach(([x, y]) => { c.beginPath(); c.ellipse(x, y, 24, 15, 0, 0, 7); c.fillStyle = '#f3d2a8'; c.fill(); c.strokeStyle = '#b07a3a'; c.lineWidth = 1.5; c.stroke(); });
    // uterus: muscle wall, then lining, then cavity
    const tri = (inset, fill) => { c.beginPath(); c.moveTo(cx - 60 + inset, 100 + inset * .6); c.lineTo(cx + 60 - inset, 100 + inset * .6); c.quadraticCurveTo(cx + 55 - inset, 200, cx + 14 - inset * .2, 248 - inset * .5); c.lineTo(cx - 14 + inset * .2, 248 - inset * .5); c.quadraticCurveTo(cx - 55 + inset, 200, cx - 60 + inset, 100 + inset * .6); c.closePath(); c.fillStyle = fill; c.fill(); };
    tri(0, '#d98c9a'); tri(9, '#c0392b'); tri(9 + 24 * th, '#fbeaea');
    D.rect(c, cx - 14, 246, 28, 26, '#d98c9a', null, 0, 4); D.rect(c, cx - 11, 270, 22, 70, '#e8b4b8', null, 0, 6);
    if (!fert && d < 6) for (let i = 0; i < 4; i++) D.circle(c, cx + Math.sin(i * 2) * 4, 275 + ((d * 40 + i * 17) % 60), 3, '#c0392b');
    // egg
    if (d < 14) { const r = 3 + 6 * (d / 14); D.circle(c, ovL[0], ovL[1], r + 3, 'rgba(255,255,255,.7)', '#b07a3a', 1); D.circle(c, ovL[0], ovL[1], r * .55, '#e1a95f'); }
    else {
      const t = clamp((d - 14) / (fert ? 7 : 3.5), 0, 1);
      const bx = (1 - t) * (1 - t) * (ovL[0] + 10) + 2 * (1 - t) * t * (cx - 95) + t * t * (cx - 48), by = (1 - t) * (1 - t) * 125 + 2 * (1 - t) * t * 70 + t * t * 112;
      const ex = fert && d > 21 ? cx : bx, ey = fert && d > 21 ? 160 : by;
      const alpha = fert ? 1 : clamp(1 - (d - 16) / 2, 0, 1);
      if (alpha > 0) { c.save(); c.globalAlpha = alpha; D.circle(c, ex, ey, fert && d > 15 ? 8 : 6, fert && d > 15 ? '#f1c40f' : '#fff', '#b07a3a', 1.5); c.restore(); }
    }
    // labels
    const lab = (t, x, y, lx, ly) => { D.line(c, x, y, lx, ly, 'rgba(0,0,0,.4)', 1); D.text(c, t, lx, ly + (ly > y ? 8 : -6), {size: 10.5, align: 'center', bg: 'rgba(255,255,255,.85)'}); };
    lab('ovary', ovL[0], ovL[1] + 15, 400, 205); lab('ovary', ovR[0], ovR[1] + 15, 680, 205); lab('oviduct', cx - 90, 82, 455, 50); lab('uterus lining', cx + 30, 150, 640, 255); lab('cervix', cx + 14, 258, 610, 300); lab('vagina', cx + 11, 315, 610, 335);
  });
};
