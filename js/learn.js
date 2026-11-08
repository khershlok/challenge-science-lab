/* Learn: taught lessons, like the French course. Each lesson runs
   breakdown → (animation) → worked examples → your turn (checked MCQs) → challenge (written, model answer) → key words → A level taster.
   Pitched at GCSE with early A level stretch. Lesson content is in learn-*.js. */
'use strict';
const LESSONS = [];
const UNITS = {skills: 'Working scientifically', physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology'};
const TAGS = {rule: 'Key idea', watch: 'Watch out', tip: 'Exam tip', stretch: 'A level'};
const STATUS = {empty: 'Not started', seen: 'Opened', partial: 'In progress', low: 'Needs another go', high: 'Mastered'};
function lesson(def) { LESSONS.push(def); }

const LStore = {
  get(id) { return (Store.get().lessons || {})[id] || {}; },
  set(id, fn) { Store.set(d => { const L = (d.lessons ||= {}); fn(L[id] ||= {}); }); }
};
function quizScore(L) {
  const a = LStore.get(L.id).answers || [];
  return {n: a.filter(x => x != null).length, r: a.filter((x, i) => x != null && x === L.quiz[i].correct).length, of: L.quiz.length};
}
function lessonStatus(L) {
  const s = LStore.get(L.id), q = quizScore(L);
  if (q.n === q.of) return q.r / q.of >= .8 ? 'high' : 'low';
  if (q.n || s.done || Object.keys(s.ch || {}).length) return 'partial';
  return s.seen ? 'seen' : 'empty';
}

/* ---------- list ---------- */
function learnPage() {
  const ms = LESSONS.filter(L => lessonStatus(L) === 'high').length;
  const started = LESSONS.some(L => lessonStatus(L) !== 'empty');
  const next = LESSONS.find(L => !['high'].includes(lessonStatus(L))) || LESSONS[0];
  page('Learn',
    h('h1', null, 'Learn'),
    h('p', {class: 'lead'}, `${LESSONS.length} taught lessons covering the Challenge syllabus at GCSE level, with early A level stretch. Each one teaches the idea first, shows it working, then checks you have understood it.`),
    h('div', {class: 'card learnhead'},
      h('div', {style: 'flex:1;min-width:220px'}, h('b', null, `${ms} of ${LESSONS.length} lessons mastered`), h('div', {class: 'bar', style: 'margin-top:8px'}, h('div', {style: `width:${ms / LESSONS.length * 100}%`})),
        h('p', {class: 'small muted', style: 'margin:8px 0 0'}, 'A lesson is mastered when you have answered all its “Your turn” questions with at least 80% right. Progress is saved on this device.')),
      h('a', {class: 'btn primary', href: '#/learn/' + next.id}, started ? `Continue: ${next.code} ${next.title} →` : 'Start the first lesson →')),
    h('div', {class: 'callout tip'}, h('b', null, 'How each lesson works. '), 'Start with a short video. Then: 1 The breakdown teaches the idea. 2 Worked examples show it step by step. 3 Your turn checks it, with every answer explained. 4 Challenge questions are harder written questions in the style of the exam, with a model answer to mark yourself against. Then key words and a short A level taster.'),
    Object.keys(UNITS).map(u => {
      const ls = LESSONS.filter(L => L.subject === u);
      return ls.length ? [h('h2', null, UNITS[u]), h('div', {class: 'lgrid section'}, ls.map(lcard))] : null;
    }));
}
function lcard(L) {
  const s = lessonStatus(L);
  return h('a', {class: 'lcard ' + L.subject, href: '#/learn/' + L.id},
    h('span', {class: 'lcode'}, L.code),
    h('span', {class: 'lt'}, L.title, h('small', null, L.level)),
    h('span', {class: 'dot', 'data-s': s, title: STATUS[s]}));
}

/* ---------- lesson ---------- */
const secHead = (n, t, sub) => h('div', {class: 'lsec'}, h('span', {class: 'n'}, n), h('div', null, h('h2', null, t), sub ? h('p', {class: 'small muted'}, sub) : null));
function lessonPage(id) {
  const L = LESSONS.find(x => x.id === id);
  if (!L) return learnPage();
  LStore.set(id, s => { s.seen = true; });
  const i = LESSONS.indexOf(L), prev = LESSONS[i - 1], next = LESSONS[i + 1];
  const vizBox = L.viz && VIZ[L.viz] ? h('div', {class: 'card viz'}) : null;
  const scoreEl = h('p', {class: 'lscore'});
  const labs = (L.labs || []).map(x => PRACTICALS.find(p => p.id === x)).filter(Boolean);
  let n = 0; const num = () => String(++n);
  page(L.title,
    h('div', {class: 'crumbs'}, h('a', {href: '#/learn'}, '← All lessons')),
    h('div', {class: 'row', style: 'display:flex;gap:6px;flex-wrap:wrap'}, h('span', {class: 'pill ' + (L.subject === 'skills' ? 'spec' : L.subject)}, `${L.code} · ${UNITS[L.subject]}`), h('span', {class: 'pill lvl'}, L.level)),
    h('h1', {style: 'margin-top:8px'}, L.title),
    h('p', {class: 'lead', html: L.intro}),
    L.goals ? h('div', {class: 'card goals'}, h('b', null, 'By the end of this lesson you should be able to:'), h('ul', {class: 'tidy'}, L.goals.map(g => h('li', {html: g})))) : null,

    (VIDEOS[L.id] || []).length ? [secHead('🎬', 'Watch', 'Short videos that explain this topic (Cognito and Free Science Lessons). Watch one, then read the breakdown.'), videoGrid(VIDEOS[L.id])] : null,

    secHead(num(), 'The breakdown', 'Read this carefully. Everything after it builds on it.'),
    h('div', {class: 'teach'}, L.points.map(p => h('div', {class: 'tp ' + (p.tag || 'rule')}, h('span', {class: 'tag'}, TAGS[p.tag || 'rule']), h('p', null, h('b', {html: p.title + '. '}), h('span', {html: p.text}))))),
    (L.tables || []).map(refTable),
    vizBox ? [secHead('▶', 'See it move', L.vizNote || 'Change the settings and watch what happens.'), vizBox] : null,
    labs.length ? h('div', {class: 'callout tip'}, h('b', null, 'Try it in the lab: '), labs.map((p, k) => [k ? ' · ' : '', h('a', {href: '#/lab/' + p.id}, p.title)]), ' (animated practical with live readings).') : null,

    L.worked ? [secHead(num(), 'Worked examples', 'Try each one yourself, then reveal the steps one at a time.'), L.worked.map(workedEl)] : null,

    secHead(num(), 'Your turn', 'These check what you have just learnt. Each answer is explained.'),
    scoreEl, quizEl(L, scoreEl),

    L.challenges ? [secHead(num(), 'Challenge questions', 'Harder written questions in the style of the Challenge. Write your answer, then compare it with the model answer and mark yourself honestly.'), L.challenges.map((c, k) => challengeEl(L, c, k))] : null,

    L.keywords ? [secHead(num(), 'Key words'), h('dl', {class: 'kw'}, L.keywords.map(([t, d]) => [h('dt', {html: t}), h('dd', {html: d})]))] : null,

    L.stretch ? h('div', {class: 'callout stretch'}, h('b', null, 'Going further: an A level taster. '), h('span', {html: L.stretch})) : null,

    h('h3', null, 'Read and watch more'),
    h('div', {class: 'src'}, [SRC.bite(L.search || L.title), SRC.cog(L.search || L.title), ...(L.links || []).map(([name, url]) => ({name, url}))].map(s => h('a', {href: s.url, target: '_blank', rel: 'noopener'}, s.name + ' ↗'))),

    doneRow(L),
    h('div', {class: 'btns', style: 'justify-content:space-between;margin-top:18px'},
      prev ? h('a', {class: 'btn', href: '#/learn/' + prev.id}, `← ${prev.code} ${prev.title}`) : h('span'),
      next ? h('a', {class: 'btn primary', href: '#/learn/' + next.id}, `${next.code} ${next.title} →`) : h('a', {class: 'btn', href: '#/learn'}, 'Back to all lessons')));
  if (vizBox) VIZ[L.viz](vizBox);
}

function refTable(t) {
  return h('div', {class: 'tablewrap section'}, h('table', {class: 'data ref'},
    h('caption', {html: t.title}),
    h('thead', null, h('tr', null, t.headers.map(x => h('th', {html: x})))),
    h('tbody', null, t.rows.map(r => h('tr', null, r.map(c => h('td', {html: c})))))),
    t.note ? h('p', {class: 'small muted', html: t.note}) : null);
}

function workedEl(w) {
  let k = 0;
  const list = h('ol', {class: 'wsteps'});
  const ans = h('div', {class: 'wans', html: '<b>Answer:</b> ' + w.a});
  const one = () => { list.append(h('li', {html: w.steps[k++]})); if (k >= w.steps.length) { btns.remove(); ans.classList.add('show'); } };
  const btns = h('div', {class: 'btns'}, h('button', {class: 'btn', onclick: one}, 'Show next step'), h('button', {class: 'btn ghost', onclick: () => { while (k < w.steps.length) one(); }}, 'Show all'));
  return h('div', {class: 'card wk'}, h('p', {class: 'q', html: w.q}), list, btns, ans);
}

function quizEl(L, scoreEl) {
  const wrap = h('div');
  const upd = () => {
    const q = quizScore(L);
    scoreEl.textContent = !q.n ? `${q.of} questions.` : `Score: ${q.r} / ${q.n} answered (${q.of} questions)` + (q.n < q.of ? '' : q.r / q.of >= .8 ? ' · Mastered ✔' : ' · Go back over the breakdown, then reset and try again.');
    scoreEl.className = 'lscore' + (q.n === q.of ? (q.r / q.of >= .8 ? ' ok' : ' no') : '');
  };
  const saved = LStore.get(L.id).answers || [];
  L.quiz.forEach((q, i) => {
    const fb = h('div', {class: 'a'});
    const opts = q.opts.map((o, k) => h('button', {class: 'opt', onclick: () => {
      if ((LStore.get(L.id).answers || [])[i] != null) return;
      LStore.set(L.id, s => { (s.answers ||= [])[i] = k; });
      show(k); upd();
    }}, h('b', null, 'ABCDE'[k]), h('span', {html: o})));
    function show(k) {
      opts.forEach((b, j) => { b.disabled = true; if (j === q.correct) b.classList.add('right'); else if (j === k) b.classList.add('wrong'); });
      fb.innerHTML = `<b>${k === q.correct ? '✔ Correct.' : '✘ Not quite: the answer is ' + 'ABCDE'[q.correct] + '.'}</b> ${q.explain}`;
      fb.classList.add('show');
    }
    wrap.append(h('div', {class: 'qa'}, h('p', {class: 'q', html: `${i + 1}. ${q.q}`}), opts, fb));
    if (saved[i] != null) show(saved[i]);
  });
  wrap.append(h('button', {class: 'btn ghost', onclick: () => { LStore.set(L.id, s => { s.answers = []; }); wrap.replaceWith(quizEl(L, scoreEl)); }}, '↺ Reset these questions'));
  upd();
  return wrap;
}

function challengeEl(L, c, k) {
  const st = LStore.get(L.id);
  const ta = h('textarea', {class: 'ans', placeholder: 'Write your answer first…', rows: 4});
  ta.value = (st.txt || {})[k] || '';
  ta.oninput = () => LStore.set(L.id, s => { (s.txt ||= {})[k] = ta.value; });
  const res = h('span', {class: 'small'});
  const markBtn = (v, label) => h('button', {class: 'btn', onclick: () => { LStore.set(L.id, s => { (s.ch ||= {})[k] = v; }); res.textContent = v === 'got' ? '✔ Marked as got it' : 'Marked to come back to'; res.className = 'small ' + (v === 'got' ? 'ok' : 'no'); }}, label);
  const model = h('div', {class: 'model'}, h('div', {html: '<b>Model answer:</b> ' + c.answer}), c.note ? h('p', {class: 'small muted', html: c.note}) : null,
    h('div', {class: 'btns', style: 'align-items:center;margin-top:8px'}, markBtn('got', '✔ I got it'), markBtn('not', 'Not yet'), res));
  const reveal = h('button', {class: 'btn', onclick: () => { model.classList.add('show'); reveal.remove(); }}, 'Show model answer');
  const prior = (st.ch || {})[k];
  if (prior) { model.classList.add('show'); res.textContent = prior === 'got' ? '✔ Marked as got it' : 'Marked to come back to'; res.className = 'small ' + (prior === 'got' ? 'ok' : 'no'); }
  return h('div', {class: 'card ch'}, h('span', {class: 'chtag'}, 'Challenge'), h('p', {class: 'q', html: c.prompt + (c.marks ? ` <span class="marks">[${c.marks}]</span>` : '')}), ta, prior ? null : h('div', {class: 'btns', style: 'margin-top:8px'}, reveal), model);
}

function doneRow(L) {
  const b = h('button', {class: 'btn' + (LStore.get(L.id).done ? '' : ' primary'), onclick: () => {
    LStore.set(L.id, s => { s.done = !s.done; }); const d = LStore.get(L.id).done;
    b.textContent = d ? '✔ Finished, click to undo' : 'Mark this lesson as finished'; b.className = 'btn' + (d ? '' : ' primary');
  }}, LStore.get(L.id).done ? '✔ Finished, click to undo' : 'Mark this lesson as finished');
  return h('div', {class: 'btns', style: 'margin-top:22px'}, b);
}

/* ---------- videos: a thumbnail that becomes a YouTube player when clicked ---------- */
function videoGrid(list) {
  return h('div', {class: 'vids section'}, list.map(v => {
    const frame = h('div', {class: 'frame', role: 'button', tabindex: 0, title: 'Play ' + v.t},
      h('img', {src: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, alt: '', loading: 'lazy'}), h('span', {class: 'play'}, '▶'));
    const play = () => {
      // open full screen by default (must be called inside the click); leaving full screen keeps the video playing in the page
      const fs = frame.requestFullscreen || frame.webkitRequestFullscreen;
      if (fs) try { const p = fs.call(frame); if (p && p.catch) p.catch(() => {}); } catch (e) {}
      frame.innerHTML = ''; frame.append(h('iframe', {src: `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`, allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen', allowfullscreen: true, title: v.t})); frame.onclick = null; frame.onkeydown = null;
    };
    frame.onclick = play; frame.onkeydown = e => { if (e.key === 'Enter') play(); };
    return h('div', {class: 'vid'}, frame, h('div', {class: 'vt'}, v.t, h('small', null, `${v.by || 'Cognito'} · ${v.len}`)));
  }));
}

/* ================= animations used inside lessons ================= */
function vcanvas(W, H) { const cv = h('canvas', {width: W * 2, height: H * 2, class: 'vcv'}); const c = cv.getContext('2d'); c.scale(2, 2); return [cv, c]; }
function vslider(label, min, max, step, val, unit, on) {
  const out = h('output', null, val + unit), inp = h('input', {type: 'range', min, max, step, value: val});
  inp.oninput = () => { out.textContent = inp.value + unit; on(+inp.value); };
  on(val);
  return h('div', {class: 'ctl'}, h('label', null, label, out), inp);
}
function vselect(label, opts, on) {
  const s = h('select', null, opts.map(([v, t]) => h('option', {value: v}, t)));
  s.onchange = () => on(s.value); on(opts[0][0]);
  return h('div', {class: 'ctl'}, h('label', null, label), s);
}
function vloop(cv, f) { let last = performance.now(); (function tick(now) { if (!document.body.contains(cv)) return; const dt = Math.min(.05, (now - last) / 1000); last = now; f(dt); requestAnimationFrame(tick); })(last); }
function vlayout(box, cv, ...ctls) { box.append(h('div', {class: 'vwrap'}, cv, h('div', {class: 'controls'}, ...ctls))); }
function miniAxes(c, x, y, w, hh, xl, yl, xmax, ymax) {
  D.rect(c, x, y, w, hh, '#fff', '#c9d2dc', 1);
  for (let i = 1; i < 5; i++) { D.line(c, x + w * i / 5, y, x + w * i / 5, y + hh, '#eef1f5', 1); D.line(c, x, y + hh * i / 5, x + w, y + hh * i / 5, '#eef1f5', 1); }
  D.text(c, xl, x + w / 2, y + hh + 14, {size: 11, align: 'center', col: '#4a5868'});
  c.save(); c.translate(x - 12, y + hh / 2); c.rotate(-Math.PI / 2); D.text(c, yl, 0, 0, {size: 11, align: 'center', col: '#4a5868'}); c.restore();
  D.text(c, '0', x - 4, y + hh + 6, {size: 10, align: 'right', col: '#7b8794'}); D.text(c, String(xmax), x + w, y + hh + 6, {size: 10, align: 'center', col: '#7b8794'}); D.text(c, String(ymax), x - 4, y, {size: 10, align: 'right', col: '#7b8794'});
}

const VIZ = {
  /* motion graphs: a car with starting speed and acceleration, drawing d–t and v–t */
  motion(box) {
    const W = 640, H = 340, [cv, c] = vcanvas(W, H);
    let u = 4, a = 1, t = 0, s = 0, run = false, pts = [];
    const reset = () => { t = 0; s = 0; pts = [{t: 0, s: 0, v: u}]; };
    const read = h('div', {class: 'readout'});
    const play = h('button', {class: 'btn primary', onclick: () => { if (t >= 10) reset(); run = !run; play.textContent = run ? '❚❚ Pause' : '▶ Drive'; }}, '▶ Drive');
    vlayout(box, cv, vslider('Starting speed u', 0, 10, 1, u, ' m/s', v => { u = v; reset(); }), vslider('Acceleration a', -2, 2, .5, a, ' m/s²', v => { a = v; reset(); }),
      h('div', {class: 'btns'}, play, h('button', {class: 'btn', onclick: () => { run = false; play.textContent = '▶ Drive'; reset(); }}, '↺ Reset')), read,
      h('p', {class: 'small muted'}, 'Gradient of d–t = speed. Gradient of v–t = acceleration. Area under v–t = distance.'));
    reset();
    vloop(cv, dt => {
      if (run && t < 10) { const v0 = Math.max(0, u + a * t); t = Math.min(10, t + dt); const v1 = Math.max(0, u + a * t); s += (v0 + v1) / 2 * dt; pts.push({t, s, v: v1}); if (t >= 10) { run = false; play.textContent = '▶ Again'; } }
      const v = Math.max(0, u + a * t);
      c.fillStyle = '#f6f4ef'; c.fillRect(0, 0, W, H);
      D.rect(c, 0, 70, W, 34, '#5b6470'); for (let x = 0; x < W; x += 40) D.line(c, x, 87, x + 20, 87, '#fff', 2);
      const smax = Math.max(60, 10 * u + 50 * Math.max(a, 0)), cx = 20 + (W - 80) * Math.min(1, s / smax);
      D.rect(c, cx, 48, 50, 24, '#c2622b', null, 0, 6); D.rect(c, cx + 10, 38, 26, 14, '#e9b48f', null, 0, 4); D.circle(c, cx + 12, 74, 7, '#222'); D.circle(c, cx + 38, 74, 7, '#222');
      if (a && v > 0) D.arrow(c, cx + 25, 28, cx + 25 + a * 18, 28, a > 0 ? '#2e8b57' : '#c0392b', 3, 7);
      const ymaxS = Math.ceil(smax / 10) * 10, ymaxV = 14;
      miniAxes(c, 60, 140, 240, 160, 'time / s', 'distance / m', 10, ymaxS); miniAxes(c, 380, 140, 240, 160, 'time / s', 'velocity / m/s', 10, ymaxV);
      D.text(c, 'Distance–time', 60, 128, {bold: true, size: 12}); D.text(c, 'Velocity–time', 380, 128, {bold: true, size: 12});
      c.beginPath(); pts.forEach((p, k) => { const X = 60 + 24 * p.t, Y = 300 - 160 * Math.min(1, p.s / ymaxS); k ? c.lineTo(X, Y) : c.moveTo(X, Y); }); c.strokeStyle = '#2f6fb8'; c.lineWidth = 2.5; c.stroke();
      c.beginPath(); c.moveTo(380, 300); pts.forEach(p => c.lineTo(380 + 24 * p.t, 300 - 160 * Math.min(1, p.v / ymaxV))); c.lineTo(380 + 24 * t, 300); c.closePath(); c.fillStyle = 'rgba(194,98,43,.15)'; c.fill();
      c.beginPath(); pts.forEach((p, k) => { const X = 380 + 24 * p.t, Y = 300 - 160 * Math.min(1, p.v / ymaxV); k ? c.lineTo(X, Y) : c.moveTo(X, Y); }); c.strokeStyle = '#c2622b'; c.lineWidth = 2.5; c.stroke();
      D.text(c, 'shaded area = distance', 500, 290, {size: 10, col: '#c2622b', align: 'center'});
      read.innerHTML = `t = <b>${t.toFixed(1)} s</b> · v = <b>${v.toFixed(1)} m/s</b> · distance = <b>${s.toFixed(1)} m</b>`;
    });
  },

  /* particle model and heating curve */
  particles(box) {
    const W = 640, H = 320, [cv, c] = vcanvas(W, H), N = 36;
    const ps = Array.from({length: N}, (_, i) => ({hx: 70 + (i % 6) * 26, hy: 286 - Math.floor(i / 6) * 26, x: 0, y: 0, vx: rnd(-1, 1), vy: rnd(-1, 1), ph: rnd(0, 6.3), gas: false}));
    let E = 10, T = 0, t = 0;
    const read = h('div', {class: 'readout'});
    vlayout(box, cv, vslider('Energy put in by heating', 0, 100, 1, E, ' %', v => { E = v; }), read,
      h('p', {class: 'small muted'}, 'On the flat parts of the graph the temperature stays the same: the energy is breaking bonds between particles (latent heat), not speeding them up.'));
    function state(E) {
      if (E < 15) return {T: -40 + 40 * E / 15, melt: 0, boil: 0, name: 'solid (ice) warming up'};
      if (E < 35) return {T: 0, melt: (E - 15) / 20, boil: 0, name: 'melting at 0 °C'};
      if (E < 60) return {T: 100 * (E - 35) / 25, melt: 1, boil: 0, name: 'liquid water warming up'};
      if (E < 90) return {T: 100, melt: 1, boil: (E - 60) / 30, name: 'boiling at 100 °C'};
      return {T: 100 + 40 * (E - 90) / 10, melt: 1, boil: 1, name: 'steam (gas) warming up'};
    }
    vloop(cv, dt => {
      t += dt; const st = state(E); T = st.T;
      const nLiq = Math.round(st.melt * N), nGas = Math.round(st.boil * N), k = Math.sqrt((T + 273) / 273);
      c.fillStyle = '#f6f4ef'; c.fillRect(0, 0, W, H);
      D.rect(c, 40, 20, 220, 284, '#fff', '#4a5868', 2);
      ps.forEach((p, i) => {
        const isGas = i >= N - nGas, isLiq = !isGas && i >= N - nLiq;
        if (isGas) {
          if (!p.gas) { p.gas = true; p.x = p.hx; p.y = p.hy; }
          p.x += p.vx * 170 * k * dt; p.y += p.vy * 170 * k * dt;
          if (p.x < 50 || p.x > 250) p.vx *= -1; if (p.y < 30 || p.y > 294) p.vy *= -1;
          p.x = clamp(p.x, 50, 250); p.y = clamp(p.y, 30, 294);
        } else {
          p.gas = false;
          const amp = isLiq ? 9 : 1 + 2.2 * (T + 40) / 40;
          p.x = p.hx + (isLiq ? 8 * Math.sin(t * 1.3 + p.ph) : 0) + amp * Math.sin(t * 23 + p.ph * 3) * .4;
          p.y = p.hy + (isLiq ? 6 * Math.cos(t * 1.1 + p.ph * 2) + 4 : 0) + amp * Math.cos(t * 19 + p.ph) * .4;
        }
        D.circle(c, p.x, p.y, 10, isGas ? '#7fb2f0' : isLiq ? '#5aa0d8' : '#2f6fb8', '#1d4f86', 1);
      });
      // heating curve
      const gx = 320, gy = 30, gw = 290, gh = 240;
      miniAxes(c, gx, gy, gw, gh, 'energy put in', 'temperature / °C', '', 140);
      const Y = T => gy + gh - gh * (T + 40) / 180;
      c.beginPath(); for (let e = 0; e <= 100; e++) { const X = gx + gw * e / 100; e ? c.lineTo(X, Y(state(e).T)) : c.moveTo(X, Y(state(e).T)); } c.strokeStyle = '#2f6fb8'; c.lineWidth = 2.5; c.stroke();
      [[0, 'melting point 0 °C'], [100, 'boiling point 100 °C']].forEach(([v, s]) => { D.line(c, gx, Y(v), gx + gw, Y(v), '#c9d2dc', 1); D.text(c, s, gx + 4, Y(v) - 8, {size: 10, col: '#7b8794'}); });
      D.circle(c, gx + gw * E / 100, Y(T), 6, '#c2622b', '#fff', 2);
      read.innerHTML = `<b>${st.name}</b> · temperature ${T.toFixed(0)} °C`;
    });
  },

  /* transverse and longitudinal waves, v = f λ */
  wave(box) {
    const W = 640, H = 300, [cv, c] = vcanvas(W, H);
    let f = 1, A = 40, v = 2.4, kind = 'transverse', t = 0;
    const read = h('div', {class: 'readout'});
    vlayout(box, cv, vselect('Type of wave', [['transverse', 'Transverse (light, water ripples)'], ['longitudinal', 'Longitudinal (sound)']], k => { kind = k; }),
      vslider('Frequency f', .5, 3, .25, f, ' Hz', x => { f = x; }), vslider('Amplitude', 10, 60, 5, A, ' px', x => { A = x; }), vslider('Wave speed v', 1, 4, .2, v, ' m/s', x => { v = x; }), read,
      h('p', {class: 'small muted'}, 'Watch the red particle: it only moves back and forth about one spot. The wave carries energy along, not the particles.'));
    const px = 120; // 120 px = 1 m
    vloop(cv, dt => {
      t += dt; const lam = v / f, k = 2 * Math.PI / (lam * px), w = 2 * Math.PI * f;
      c.fillStyle = '#f6f4ef'; c.fillRect(0, 0, W, H);
      const y0 = 140;
      if (kind === 'transverse') {
        D.line(c, 20, y0, W - 20, y0, '#c9d2dc', 1);
        c.beginPath(); for (let x = 20; x <= W - 20; x += 2) { const y = y0 - A * Math.sin(k * x - w * t); x > 20 ? c.lineTo(x, y) : c.moveTo(x, y); } c.strokeStyle = '#2f6fb8'; c.lineWidth = 2.5; c.stroke();
        for (let x = 20; x <= W - 20; x += 20) D.circle(c, x, y0 - A * Math.sin(k * x - w * t), x === 200 ? 7 : 4, x === 200 ? '#c0392b' : '#1d4f86');
        // wavelength bracket between two crests
        let xc = 20; for (let x = 20; x < W; x++) { const ph = (k * x - w * t) % (2 * Math.PI); if (Math.abs(((ph + 2 * Math.PI) % (2 * Math.PI)) - Math.PI / 2) < k * 1.1) { xc = x; break; } }
        if (xc + lam * px < W - 20) { const yb = y0 - A - 22; D.line(c, xc, yb, xc + lam * px, yb, '#c2622b', 2); D.line(c, xc, yb - 6, xc, yb + 6, '#c2622b', 2); D.line(c, xc + lam * px, yb - 6, xc + lam * px, yb + 6, '#c2622b', 2); D.text(c, 'wavelength λ', xc + lam * px / 2, yb - 12, {size: 12, align: 'center', col: '#c2622b', bold: true}); }
        D.arrow(c, 600, y0, 600, y0 - A, '#2e8b57', 2, 6); D.text(c, 'amplitude', 596, y0 - A - 10, {size: 11, align: 'right', col: '#2e8b57'});
      } else {
        for (let i = 0; i < 70; i++) {
          const x0 = 25 + i * 8.6, dx = (A / 3) * Math.sin(k * x0 - w * t);
          for (let r = 0; r < 6; r++) D.circle(c, x0 + dx, 70 + r * 28 + (i % 2) * 14, i === 20 ? 5 : 3, i === 20 ? '#c0392b' : '#1d4f86');
        }
        D.text(c, 'compressions (particles close) and rarefactions (spread out) travel along', W / 2, 262, {size: 12, align: 'center', col: '#4a5868'});
      }
      D.arrow(c, 40, 280, 160, 280, '#7b8794', 2, 7); D.text(c, 'direction of travel', 170, 280, {size: 11, col: '#7b8794'});
      read.innerHTML = `v = f × λ → λ = ${v.toFixed(1)} ÷ ${f} = <b>${lam.toFixed(2)} m</b> · period T = 1/f = <b>${(1 / f).toFixed(2)} s</b>`;
    });
  },

  /* atom builder, Z = 1 to 20 */
  atom(box) {
    const W = 640, H = 320, [cv, c] = vcanvas(W, H);
    const EL = [['H', 'Hydrogen', 1], ['He', 'Helium', 4], ['Li', 'Lithium', 7], ['Be', 'Beryllium', 9], ['B', 'Boron', 11], ['C', 'Carbon', 12], ['N', 'Nitrogen', 14], ['O', 'Oxygen', 16], ['F', 'Fluorine', 19], ['Ne', 'Neon', 20], ['Na', 'Sodium', 23], ['Mg', 'Magnesium', 24], ['Al', 'Aluminium', 27], ['Si', 'Silicon', 28], ['P', 'Phosphorus', 31], ['S', 'Sulfur', 32], ['Cl', 'Chlorine', 35], ['Ar', 'Argon', 40], ['K', 'Potassium', 39], ['Ca', 'Calcium', 40]];
    let Z = 11, t = 0;
    const read = h('div', {class: 'readout'});
    vlayout(box, cv, vslider('Atomic (proton) number Z', 1, 20, 1, Z, '', v => { Z = v; }), read,
      h('p', {class: 'small muted'}, 'Shells fill 2, 8, 8 for the first 20 elements. The number of outer electrons gives the group; the number of shells gives the period.'));
    vloop(cv, dt => {
      t += dt; const [sym, name, A] = EL[Z - 1], N = A - Z;
      const shells = []; let left = Z; for (const cap of [2, 8, 8, 2]) { if (left <= 0) break; shells.push(Math.min(cap, left)); left -= cap; }
      const outer = shells[shells.length - 1], group = Z === 2 ? 0 : outer === 8 ? 0 : outer;
      c.fillStyle = '#f6f4ef'; c.fillRect(0, 0, W, H);
      const cx = 180, cy = 160;
      for (let j = 0; j < Math.min(Z + N, 40); j++) { const r = 3 + Math.sqrt(j) * 4.2, a = j * 2.4; D.circle(c, cx + r * Math.cos(a), cy + r * Math.sin(a), 5.5, j % 2 && j / 2 < N ? '#9aa5b1' : '#c0392b', '#fff', 1); }
      shells.forEach((n, s) => { const R = 48 + s * 34; D.circle(c, cx, cy, R, null, '#9aa5b1', 1.2); for (let e = 0; e < n; e++) { const a = e / n * 2 * Math.PI + t * (0.6 - s * .12); D.circle(c, cx + R * Math.cos(a), cy + R * Math.sin(a), 5, '#2f6fb8', '#fff', 1.2); } });
      const ion = group >= 1 && group <= 3 ? `${sym}${group > 1 ? group : ''}+ (loses ${group})` : group >= 5 && group <= 7 ? `${sym}${8 - group > 1 ? 8 - group : ''}− (gains ${8 - group})` : group === 0 ? 'none: full outer shell, unreactive' : 'usually shares electrons (covalent)';
      const x = 360; let y = 46;
      D.text(c, `${name} (${sym})`, x, y, {size: 20, bold: true}); y += 34;
      [['protons', Z, '#c0392b'], ['neutrons', N, '#7b8794'], ['electrons', Z, '#2f6fb8']].forEach(([l, v, col]) => { D.circle(c, x + 6, y, 6, col); D.text(c, `${v} ${l}`, x + 20, y, {size: 14}); y += 24; });
      y += 6; D.text(c, `Mass number ${A} = ${Z} protons + ${N} neutrons`, x, y, {size: 13}); y += 24;
      D.text(c, `Electron arrangement: ${shells.join(', ')}`, x, y, {size: 13, bold: true}); y += 24;
      D.text(c, `Group ${group} · Period ${shells.length}`, x, y, {size: 13}); y += 24;
      D.text(c, `Ion formed: ${ion}`, x, y, {size: 13});
      read.innerHTML = `<b>${A}${sym}</b>: top number = mass number ${A}, bottom number = atomic number ${Z}`;
    });
  },

  /* Punnett square with simulated offspring */
  punnett(box) {
    let p1 = 'Tt', p2 = 'Tt', kids = [];
    const grid = h('div'), read = h('div', {class: 'readout'}), tally = h('div', {class: 'small'});
    const G = [['TT', 'TT (homozygous tall)'], ['Tt', 'Tt (heterozygous tall)'], ['tt', 'tt (homozygous short)']];
    function draw() {
      const g1 = p1.split(''), g2 = p2.split(''), cells = [];
      grid.innerHTML = '';
      const t = h('table', {class: 'punnett'}, h('tr', null, h('th', null, ''), g2.map(a => h('th', null, a))),
        g1.map(a => h('tr', null, h('th', null, a), g2.map(b => { const gt = [a, b].sort((x, y) => x === 'T' ? -1 : y === 'T' ? 1 : 0).join(''); cells.push(gt); return h('td', {class: gt.includes('T') ? 'tall' : 'short'}, gt, h('small', null, gt.includes('T') ? 'tall' : 'short')); }))));
      grid.append(t);
      const n = k => cells.filter(x => x === k).length, tall = cells.filter(x => x.includes('T')).length;
      read.innerHTML = `Genotypes TT : Tt : tt = <b>${n('TT')} : ${n('Tt')} : ${n('tt')}</b> · Phenotypes tall : short = <b>${tall} : ${4 - tall}</b> · chance of a short plant = <b>${(4 - tall) * 25}%</b>`;
      kids = []; tally.textContent = '';
    }
    const breed = () => {
      for (let i = 0; i < 20; i++) { const a = pick(p1.split('')), b = pick(p2.split('')); kids.push(a === 'T' || b === 'T'); }
      const tall = kids.filter(Boolean).length;
      tally.innerHTML = `${kids.length} offspring so far: <b>${tall} tall</b>, <b>${kids.length - tall} short</b> (${(100 * (kids.length - tall) / kids.length).toFixed(0)}% short). With more offspring the result gets closer to the predicted ratio: the ratio is a probability, not a promise.`;
    };
    const s1 = vselect('Parent 1', G, v => { p1 = v; if (grid.isConnected) draw(); }), s2 = vselect('Parent 2', G, v => { p2 = v; if (grid.isConnected) draw(); });
    $('select', s1).value = 'Tt'; $('select', s2).value = 'Tt';
    box.append(h('div', {class: 'vwrap'}, h('div', null, h('p', {class: 'small muted', style: 'margin-top:0'}, 'Pea plants: T (tall) is dominant, t (short) is recessive. Each parent passes on one allele at random.'), grid, read),
      h('div', {class: 'controls'}, s1, s2, h('button', {class: 'btn primary', onclick: breed}, 'Breed 20 offspring'), tally)));
    draw();
  },

  /* collision theory: temperature, concentration, catalyst */
  collision(box) {
    const W = 640, H = 300, [cv, c] = vcanvas(W, H);
    let T = 300, conc = 16, cat = false, ps = [], flashes = [], hits = [], t = 0;
    const read = h('div', {class: 'readout'});
    const make = () => { ps = Array.from({length: conc * 2}, (_, i) => ({x: rnd(20, 380), y: rnd(20, 280), a: rnd(0, 6.3), sp: Math.abs(gauss(1)) + .3, k: i % 2})); hits = []; };
    vlayout(box, cv, vslider('Temperature', 250, 450, 10, T, ' K', v => { T = v; }), vslider('Concentration (particles of each)', 4, 30, 2, conc, '', v => { conc = v; make(); }),
      vselect('Catalyst', [['no', 'No catalyst'], ['yes', 'Catalyst added']], v => { cat = v === 'yes'; }), read,
      h('p', {class: 'small muted'}, 'A flash is a successful collision: the particles hit with at least the activation energy. Grey bumps are collisions that bounce off without reacting.'));
    make();
    vloop(cv, dt => {
      t += dt; const k = Math.sqrt(T / 300), Ea = cat ? 1.3 : 2.6, R = 9;
      c.fillStyle = '#f6f4ef'; c.fillRect(0, 0, W, H); D.rect(c, 10, 10, 380, 280, '#fff', '#4a5868', 2);
      for (const p of ps) { p.x += Math.cos(p.a) * p.sp * k * 140 * dt; p.y += Math.sin(p.a) * p.sp * k * 140 * dt; if (p.x < 10 + R || p.x > 390 - R) { p.a = Math.PI - p.a; p.x = clamp(p.x, 10 + R, 390 - R); } if (p.y < 10 + R || p.y > 290 - R) { p.a = -p.a; p.y = clamp(p.y, 10 + R, 290 - R); } }
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const A = ps[i], B = ps[j]; if (A.k === B.k) continue;
        const dx = B.x - A.x, dy = B.y - A.y; if (dx * dx + dy * dy > 4 * R * R) continue;
        const e = (A.sp * A.sp + B.sp * B.sp) * k * k / 2;
        if (A.cool > t || B.cool > t) continue; A.cool = B.cool = t + .25;
        const ok = e > Ea; flashes.push({x: (A.x + B.x) / 2, y: (A.y + B.y) / 2, t, ok}); if (ok) hits.push(t);
        [A.a, B.a] = [Math.atan2(-dy, -dx), Math.atan2(dy, dx)];
        A.sp = Math.abs(gauss(1)) + .3; B.sp = Math.abs(gauss(1)) + .3;
      }
      flashes = flashes.filter(f => t - f.t < .4); hits = hits.filter(x => t - x < 5);
      for (const f of flashes) D.circle(c, f.x, f.y, 10 + 30 * (t - f.t), f.ok ? 'rgba(240,163,94,.55)' : 'rgba(150,160,170,.3)');
      for (const p of ps) D.circle(c, p.x, p.y, R, p.k ? '#c2622b' : '#2f6fb8', '#fff', 1);
      // energy profile
      const gx = 430, gy = 40, gw = 190, gh = 200;
      miniAxes(c, gx, gy, gw, gh, 'progress of reaction', 'energy', '', '');
      const prof = (ea) => { c.beginPath(); for (let x = 0; x <= 1; x += .02) { const base = 150 + 40 * (x > .5 ? 1 : 0) * Math.min(1, (x - .5) * 6); const yy = gy + base - ea * Math.exp(-((x - .5) ** 2) / .02); x ? c.lineTo(gx + gw * x, yy) : c.moveTo(gx + gw * x, yy); } };
      prof(110); c.strokeStyle = cat ? '#c9d2dc' : '#2f6fb8'; c.lineWidth = 2.5; c.stroke();
      if (cat) { prof(60); c.strokeStyle = '#2e8b57'; c.lineWidth = 2.5; c.stroke(); D.text(c, 'with catalyst', gx + gw / 2, gy + 70, {size: 11, align: 'center', col: '#2e8b57'}); }
      D.text(c, 'activation energy', gx + gw / 2, gy + 20, {size: 11, align: 'center', col: cat ? '#7b8794' : '#2f6fb8'});
      D.text(c, 'exothermic: products lower', gx + gw / 2, gy + gh + 30, {size: 11, align: 'center', col: '#7b8794'});
      read.innerHTML = `Successful collisions: <b>${(t > .5 ? hits.length / Math.min(5, t) : 0).toFixed(1)} per second</b> (rate of reaction)`;
    });
  }
};
