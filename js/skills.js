/* Data skills trainer and calculation drill */
'use strict';

/* ---------------- Table doctor ---------------- */
const BAD_TABLES = [
  {title: 'Spring experiment', head: ['Mass', 'Length'], rows: [['100 g', '12.1 cm'], ['200g', '14.6'], ['300', '17'], ['400 g', '19.55 cm']],
    issues: [[true, 'Units are written in the cells instead of the column headings (e.g. “Mass / g”)'], [true, 'Readings are not all to the same number of decimal places (14.6, 17, 19.55)'], [true, 'No column for extension, which is what the experiment is about'], [false, 'The independent variable is in the wrong column'], [true, 'No repeat readings or means']],
    fixed: [['Mass / g', 'Length / cm', 'Extension / cm'], ['0', '9.6', '0.0'], ['100', '12.1', '2.5'], ['200', '14.6', '5.0'], ['300', '17.0', '7.4']]},
  {title: 'Pondweed experiment', head: ['Bubbles per minute', 'Distance / cm'], rows: [['15, 16, 14', '10'], ['7, 8', '20'], ['3, 4, 9', '30'], ['1, 1, 2', '40']],
    issues: [[true, 'The independent variable (distance) should be in the first column'], [true, 'Repeats are crammed into one cell. Each repeat needs its own column, plus a mean column'], [true, '30 cm has an anomaly (9) that should be spotted and left out of the mean'], [true, 'One row has only two readings'], [false, 'Bubbles per minute should have a unit of cm']],
    fixed: [['Distance / cm', '1st', '2nd', '3rd', 'Mean bubbles per minute'], ['10', '15', '16', '14', '15'], ['20', '7', '8', '7', '7.3'], ['30', '3', '4', '(9)', '3.5'], ['40', '1', '1', '2', '1.3']]},
  {title: 'Newton-meters (specimen practical)', head: ['position', 'meter 1', 'meter 2'], rows: [['1', '4.3', '0.5'], ['3', '3.8', '0.9'], ['2', '4.1', '0.7'], ['4', '3.6', '1.1']],
    issues: [[true, 'No units in the headings (cm and N)'], [true, 'Rows are not in order of the independent variable (1, 3, 2, 4)'], [true, 'The headings are vague: “position” of what, measured from where?'], [false, 'Newton-meter readings should be whole numbers'], [true, 'No repeat readings, which the question asked for']],
    fixed: [['Distance of mass from left hook / cm', 'Meter 1 reading / N', 'Meter 2 reading / N'], ['1', '4.3', '0.5'], ['2', '4.1', '0.7'], ['3', '3.8', '0.9'], ['4', '3.6', '1.1']]}
];

function tableDoctor(el) {
  let k = 0;
  const show = () => {
    const T = BAD_TABLES[k];
    el.innerHTML = '';
    const t = h('table', {class: 'data', style: 'max-width:520px'}, h('tr', null, T.head.map(x => h('th', null, x))), T.rows.map(r => h('tr', null, r.map(x => h('td', null, x)))));
    const checks = shuffle(T.issues).map(([ok, text]) => { const cb = h('input', {type: 'checkbox'}); const lab = h('label', {style: 'display:block;margin:5px 0'}, cb, ' ', text); return {cb, lab, ok}; });
    const res = h('div');
    el.append(h('h3', null, `Table ${k + 1} of ${BAD_TABLES.length}: ${T.title}`), h('p', {class: 'muted small'}, 'Tick every real problem with this results table.'), t, h('div', {style: 'margin:10px 0'}, checks.map(c => c.lab)),
      h('div', {class: 'btns'}, h('button', {class: 'btn primary', onclick: () => {
        let right = 0; checks.forEach(c => { const good = c.cb.checked === c.ok; if (good) right++; c.lab.style.color = good ? 'var(--good)' : 'var(--bad)'; c.lab.style.fontWeight = c.ok ? 700 : 400; });
        res.innerHTML = ''; res.append(h('p', null, h('b', null, `${right} / ${checks.length} correct. `), 'Bold lines are the real problems. A better table:'), h('table', {class: 'data', style: 'max-width:620px'}, T.fixed.map((r, i) => h('tr', null, r.map(x => h(i ? 'td' : 'th', null, x))))));
      }}, 'Check'), h('button', {class: 'btn', onclick: () => { k = (k + 1) % BAD_TABLES.length; show(); }}, 'Next table ▶')), res);
  };
  show();
}

/* ---------------- Graph plotting trainer ---------------- */
const PLOT_SETS = [
  {title: 'Catalase in liver: oxygen produced', x: 'Time / min', y: 'Volume of oxygen / cm³', pts: [[0, 0], [1, 4.0], [2, 7.0], [3, 9.2], [4, 7.4], [5, 11.6], [6, 12.3], [7, 12.8]], anom: 4, model: t => 13.5 * (1 - Math.exp(-t / 2.4)), xmax: 8, ymax: 14, curve: true},
  {title: 'Hanging masses: Meter 2 reading', x: 'Distance from left hook / cm', y: 'Meter 2 reading / N', pts: [[2, .7], [4, 1.1], [6, 1.5], [8, 1.9], [10, 2.3], [12, 3.3], [14, 3.1], [16, 3.5]], anom: 5, model: x => .3 + .2 * x, xmax: 20, ymax: 5, curve: false},
  {title: 'Cooling water: temperature over time', x: 'Time / min', y: 'Temperature / °C', pts: [[0, 80], [2, 66], [4, 55], [6, 47], [8, 52], [10, 36], [12, 32], [14, 29]], anom: 4, model: t => 20 + 60 * Math.exp(-t / 6.3), xmax: 14, ymax: 80, curve: true}
];

function plotTrainer(el) {
  let k = 0;
  const show = () => {
    const P = PLOT_SETS[k], W = 600, H = 380, L = 60, R = 16, T = 16, B = 50;
    const xs = niceStep(P.xmax, 7), ys = niceStep(P.ymax, 7);
    const X = v => L + v / P.xmax * (W - L - R), Y = v => H - B - v / P.ymax * (H - T - B);
    const iX = px => (px - L) / (W - L - R) * P.xmax, iY = py => (H - B - py) / (H - T - B) * P.ymax;
    let placed = [], phase = 'plot', anomPick = null;
    el.innerHTML = '';
    const info = h('p', {class: 'small'}, 'Click on the grid to plot each point as a cross, in order. You can undo.');
    const svgWrap = h('div', {class: 'plotgrid card', style: 'padding:8px'});
    const res = h('div');
    const tbl = h('table', {class: 'data', style: 'max-width:300px'}, h('tr', null, h('th', null, P.x), h('th', null, P.y)), P.pts.map(p => h('tr', null, h('td', null, p[0]), h('td', null, p[1]))));
    function render() {
      let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="system-ui">`;
      for (let v = 0; v <= P.xmax + 1e-9; v += xs / 10) s += `<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${H - B}" stroke="#e3eef0"/>`;
      for (let v = 0; v <= P.ymax + 1e-9; v += ys / 10) s += `<line x1="${L}" y1="${Y(v)}" x2="${W - R}" y2="${Y(v)}" stroke="#e3eef0"/>`;
      for (let v = 0; v <= P.xmax + 1e-9; v += xs) s += `<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${H - B}" stroke="#bcd5da"/><text x="${X(v)}" y="${H - B + 16}" font-size="12" text-anchor="middle">${+v.toFixed(3)}</text>`;
      for (let v = 0; v <= P.ymax + 1e-9; v += ys) s += `<line x1="${L}" y1="${Y(v)}" x2="${W - R}" y2="${Y(v)}" stroke="#bcd5da"/><text x="${L - 6}" y="${Y(v) + 4}" font-size="12" text-anchor="end">${+v.toFixed(3)}</text>`;
      s += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#223" stroke-width="1.6"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="#223" stroke-width="1.6"/>`;
      s += `<text x="${(L + W) / 2}" y="${H - 10}" font-size="13" text-anchor="middle" font-weight="600">${P.x}</text><text transform="translate(16 ${(T + H - B) / 2}) rotate(-90)" font-size="13" text-anchor="middle" font-weight="600">${P.y}</text>`;
      if (phase === 'done') { let d = ''; for (let i = 0; i <= 60; i++) { const x = P.pts[0][0] + (P.pts[P.pts.length - 1][0] - P.pts[0][0]) * i / 60; d += (i ? 'L' : 'M') + X(x) + ' ' + Y(P.model(x)); } s += `<path d="${d}" fill="none" stroke="#1f7a6d" stroke-width="2"/>`; }
      placed.forEach((p, i) => { const ok = p.ok, col = phase === 'plot' ? '#2f6fb8' : ok ? '#2e8b57' : '#c0392b'; s += `<path d="M${p.px - 5} ${p.py - 5}L${p.px + 5} ${p.py + 5}M${p.px - 5} ${p.py + 5}L${p.px + 5} ${p.py - 5}" stroke="${col}" stroke-width="2.2"/>`; if (anomPick === i) s += `<circle cx="${p.px}" cy="${p.py}" r="12" fill="none" stroke="${i === P.anom ? '#2e8b57' : '#c0392b'}" stroke-width="2"/>`; });
      s += '</svg>';
      svgWrap.innerHTML = s;
      const svg = svgWrap.querySelector('svg');
      svg.addEventListener('click', e => {
        const b = svg.getBoundingClientRect(), px = (e.clientX - b.left) / b.width * W, py = (e.clientY - b.top) / b.height * H;
        if (phase === 'plot' && placed.length < P.pts.length) {
          const t = P.pts[placed.length], ok = Math.abs(iX(px) - t[0]) <= xs / 8 + 1e-9 && Math.abs(iY(py) - t[1]) <= ys / 8 + 1e-9;
          placed.push({px, py, ok}); if (placed.length === P.pts.length) check(); render();
        } else if (phase === 'anom') {
          let best = -1, bd = 1e9; placed.forEach((p, i) => { const d = Math.hypot(p.px - X(P.pts[i][0]), p.py - Y(P.pts[i][1])); const dd = Math.hypot(px - X(P.pts[i][0]), py - Y(P.pts[i][1])); if (dd < bd) { bd = dd; best = i; } });
          anomPick = best; phase = 'done'; render();
          res.append(h('p', null, best === P.anom ? h('span', {class: 'ok'}, '✔ Correct: that point is the anomaly. ') : h('span', {class: 'no'}, `✘ The anomaly is the point at ${P.pts[P.anom][0]}. `),
            `The green ${P.curve ? 'smooth curve' : 'straight line'} of best fit ignores it. ${P.curve ? 'Never join the dots with a ruler: draw one smooth curve.' : 'Use a ruler, with roughly equal numbers of points either side.'}`));
        }
      });
    }
    function check() {
      const good = placed.filter(p => p.ok).length;
      res.innerHTML = ''; res.append(h('p', null, h('b', null, `${good} / ${P.pts.length} points plotted accurately`), ' (to within a small square). Red crosses are off. Now click on the point you think is the anomaly.'));
      phase = 'anom';
    }
    el.append(h('h3', null, P.title), h('div', {class: 'grid g2', style: 'align-items:start'}, h('div', null, tbl, info,
      h('div', {class: 'btns'}, h('button', {class: 'btn', onclick: () => { if (phase === 'plot') { placed.pop(); render(); } }}, '↶ Undo'), h('button', {class: 'btn', onclick: () => show()}, 'Start again'), h('button', {class: 'btn', onclick: () => { k = (k + 1) % PLOT_SETS.length; show(); }}, 'Next data set ▶')),
      h('div', {class: 'callout tip small'}, 'Each small square is ', h('b', null, `${+(xs / 10).toFixed(3)}`), ` on the x-axis and `, h('b', null, `${+(ys / 10).toFixed(3)}`), ' on the y-axis. Count squares carefully!')), h('div', null, svgWrap, res)));
    render();
  };
  show();
}

/* ---------------- Variables quiz ---------------- */
const VAR_Q = [
  {s: 'A student times how long sugar takes to dissolve in water at 20, 40, 60 and 80 °C, stirring each the same amount.', iv: 'Temperature of the water', dv: 'Time for the sugar to dissolve', cvs: ['Mass of sugar', 'Volume of water', 'Amount of stirring'], wrong: ['Time for the sugar to dissolve', 'The stopwatch']},
  {s: 'Pupils drop a ball from different heights and measure how high it bounces, always on the same floor with the same ball.', iv: 'Drop height', dv: 'Bounce height', cvs: ['The same ball', 'The same floor surface'], wrong: ['Bounce height', 'How hard it is thrown']},
  {s: 'Seedlings are grown with 0, 5, 10 and 20 cm³ of fertiliser each week. Their height is measured after 3 weeks in the same light and temperature.', iv: 'Volume of fertiliser per week', dv: 'Height of seedlings after 3 weeks', cvs: ['Light intensity', 'Temperature', 'Type of seedling'], wrong: ['Height of seedlings after 3 weeks', 'Colour of the pot']}
];
function varQuiz(el) {
  el.innerHTML = '';
  VAR_Q.forEach((Q, i) => {
    const opts = shuffle([Q.iv, Q.dv, ...Q.cvs.slice(0, 1), Q.wrong[1]]);
    const mk = (label, right) => { const sel = h('select', null, h('option', {value: ''}, 'choose…'), opts.map(o => h('option', {value: o}, o))); return {label, right, sel}; };
    const parts = [mk('Independent variable (what you change)', Q.iv), mk('Dependent variable (what you measure)', Q.dv), mk('A control variable (kept the same)', Q.cvs)];
    const out = h('div', {class: 'a'});
    el.append(h('div', {class: 'qa'}, h('div', {class: 'q'}, `${i + 1}. ${Q.s}`),
      parts.map(p => h('div', {style: 'margin:6px 0;display:flex;gap:10px;align-items:center;flex-wrap:wrap'}, h('span', {style: 'min-width:270px'}, p.label), p.sel)),
      h('button', {class: 'btn', onclick: () => {
        out.innerHTML = ''; parts.forEach(p => { const ok = Array.isArray(p.right) ? p.right.includes(p.sel.value) : p.sel.value === p.right; out.append(h('div', null, h('span', {class: ok ? 'ok' : 'no'}, ok ? '✔ ' : '✘ '), `${p.label.split(' (')[0]}: ${Array.isArray(p.right) ? p.right.join(', ') : p.right}`)); });
        out.classList.add('show');
      }}, 'Check'), out));
  });
}

/* ---------------- Calculation drill ---------------- */
const r1 = (a, b, st = 1) => a + st * Math.floor(Math.random() * ((b - a) / st + 1));
const CALCS = [
  {topic: 'Speed', subj: 'physics', gen() { const d = r1(120, 900, 20), t = r1(8, 60, 2); return {q: `A cyclist travels ${d} m in ${t} s. Calculate the average speed.`, eq: 'speed = distance ÷ time', ans: d / t, unit: 'm/s', work: `${d} ÷ ${t} = ${fmt(d / t)} m/s`}; }},
  {topic: 'Speed (rearranged)', subj: 'physics', gen() { const v = r1(3, 30), t = r1(5, 40); return {q: `A car moves at ${v} m/s for ${t} s. How far does it travel?`, eq: 'distance = speed × time', ans: v * t, unit: 'm', work: `${v} × ${t} = ${v * t} m`}; }},
  {topic: 'Relative motion', subj: 'physics', gen() { const a = r1(20, 40), b = r1(15, 35), L = r1(100, 300, 20); return {q: `Two trains, each ${L / 2} m long, pass each other on parallel tracks, travelling in opposite directions at ${a} m/s and ${b} m/s. How long does it take them to pass completely (total distance ${L} m)?`, eq: 'relative speed = sum of speeds (opposite directions)', ans: L / (a + b), unit: 's', work: `relative speed = ${a} + ${b} = ${a + b} m/s; time = ${L} ÷ ${a + b} = ${fmt(L / (a + b))} s`}; }},
  {topic: 'Echo', subj: 'physics', gen() { const t = r1(2, 12) / 2, v = pick([340, 1500]); return {q: `A sound pulse is sent towards a ${v === 340 ? 'cliff' : 'sea bed'} and the echo returns after ${t} s. The speed of sound is ${v} m/s. How far away is the ${v === 340 ? 'cliff' : 'sea bed'}?`, eq: 'distance = speed × time ÷ 2', ans: v * t / 2, unit: 'm', work: `${v} × ${t} = ${v * t} m there and back, ÷ 2 = ${v * t / 2} m`}; }},
  {topic: 'Density', subj: 'physics', gen() { const V = r1(10, 80, 5), rho = pick([2.7, 7.9, 8.9, 11.3, 1.2, .8]); const m = +(V * rho).toFixed(1); return {q: `A block of volume ${V} cm³ has a mass of ${m} g. Calculate its density.`, eq: 'density = mass ÷ volume', ans: m / V, unit: 'g/cm³', work: `${m} ÷ ${V} = ${fmt(m / V)} g/cm³`}; }},
  {topic: 'Pressure', subj: 'physics', gen() { const F = r1(200, 900, 50), A = pick([.02, .05, .1, .25, .5]); return {q: `A person weighing ${F} N stands on skis with a total area of ${A} m². What pressure do they put on the snow?`, eq: 'pressure = force ÷ area', ans: F / A, unit: 'Pa', work: `${F} ÷ ${A} = ${fmt(F / A)} Pa (N/m²)`}; }},
  {topic: 'Moments', subj: 'physics', gen() { const W1 = r1(2, 8), d1 = r1(10, 40, 5), W2 = r1(2, 10); const d2 = W1 * d1 / W2; return {q: `On a balanced metre rule, ${W1} N hangs ${d1} cm to the left of the pivot. Where must ${W2} N hang on the right?`, eq: 'clockwise moment = anticlockwise moment (F × d)', ans: d2, unit: 'cm', work: `${W2} × d = ${W1} × ${d1} = ${W1 * d1}, so d = ${fmt(d2)} cm`}; }},
  {topic: 'Hooke’s law', subj: 'physics', gen() { const k = pick([20, 25, 40, 50, 80]), F = r1(1, 8); return {q: `A spring has a spring constant of ${k} N/m. What is its extension in cm when a ${F} N load is hung on it?`, eq: 'F = k × e, so e = F ÷ k', ans: F / k * 100, unit: 'cm', work: `e = ${F} ÷ ${k} = ${fmt(F / k)} m = ${fmt(F / k * 100)} cm`}; }},
  {topic: 'Weight', subj: 'physics', gen() { const m = r1(2, 90), g = pick([[10, 'Earth'], [1.6, 'the Moon'], [3.7, 'Mars']]); return {q: `What is the weight of a ${m} kg mass on ${g[1]} (g = ${g[0]} N/kg)?`, eq: 'weight = mass × g', ans: m * g[0], unit: 'N', work: `${m} × ${g[0]} = ${fmt(m * g[0])} N`}; }},
  {topic: 'Gas pressure (Boyle)', subj: 'physics', gen() { const p1 = pick([100000, 101000, 120000]), v1 = r1(10, 60, 2) / 10, f = pick([2, 3, 4, .5]); return {q: `A bubble of volume ${v1} cm³ is at a pressure of ${p1.toLocaleString()} Pa. The pressure changes to ${(p1 * f).toLocaleString()} Pa at constant temperature. What is its new volume?`, eq: 'p₁V₁ = p₂V₂', ans: v1 / f, unit: 'cm³', work: `V₂ = ${p1} × ${v1} ÷ ${p1 * f} = ${fmt(v1 / f)} cm³`}; }},
  {topic: 'Linear scale', subj: 'physics', gen() { const per = pick([.1, .15, .2, .25]), h0 = r1(2, 10), a = +(h0 + per * 100).toFixed(2), h1 = a, h2 = +(a - per * 20).toFixed(2); return {q: `A thermometer has a linear scale. At 100 °C the liquid column is ${h1} cm long; at 80 °C it is ${h2} cm. How long is it at 0 °C?`, eq: 'change per °C = (difference in length) ÷ (difference in temperature)', ans: h0, unit: 'cm', work: `${fmt(h1 - h2)} cm per 20 °C = ${fmt(per)} cm per °C. 100 °C lower: ${h1} − 100 × ${fmt(per)} = ${fmt(h0)} cm`}; }},
  {topic: 'Energy and efficiency', subj: 'physics', gen() { const tot = r1(200, 1000, 50), pc = pick([20, 25, 40, 60, 75, 90]); return {q: `A motor is supplied with ${tot} J of energy and transfers ${tot * pc / 100} J usefully to its kinetic store. What is its efficiency as a percentage?`, eq: 'efficiency = useful output ÷ total input × 100%', ans: pc, unit: '%', work: `${tot * pc / 100} ÷ ${tot} × 100 = ${pc}%`}; }},
  {topic: 'Current in parallel', subj: 'physics', gen() { const a = r1(1, 9) / 10, b = r1(1, 9) / 10, c = r1(1, 9) / 10; return {q: `Three branches of a parallel circuit carry ${a} A, ${b} A and ${c} A. What current flows in the main wire?`, eq: 'currents add at a junction', ans: a + b + c, unit: 'A', work: `${a} + ${b} + ${c} = ${fmt(a + b + c)} A`}; }},
  {topic: 'Rf value', subj: 'chemistry', gen() { const sf = r1(60, 100, 2) / 10, d = r1(5, Math.floor(sf * 10) - 3) / 10; return {q: `A spot moves ${d} cm and the solvent front moves ${sf} cm. Calculate the Rf value.`, eq: 'Rf = distance moved by spot ÷ distance moved by solvent', ans: d / sf, unit: '', work: `${d} ÷ ${sf} = ${fmt(d / sf)}`}; }},
  {topic: 'Rf (rearranged)', subj: 'chemistry', gen() { const rf = r1(20, 90, 5) / 100, sf = r1(60, 100, 5) / 10; return {q: `A dye has Rf = ${rf}. If the solvent travels ${sf} cm, how far does the dye travel?`, eq: 'distance = Rf × solvent distance', ans: rf * sf, unit: 'cm', work: `${rf} × ${sf} = ${fmt(rf * sf)} cm`}; }},
  {topic: 'Conservation of mass', subj: 'chemistry', gen() { const a = r1(120, 300, 2) / 100, frac = pick([.645, .5, .56]); const b = +(a * frac).toFixed(2); return {q: `${a} g of a metal carbonate is heated until its mass stops changing. ${b} g of solid oxide remains. What mass of carbon dioxide was given off?`, eq: 'mass of reactants = mass of products', ans: a - b, unit: 'g', work: `${a} − ${b} = ${fmt(a - b)} g`}; }},
  {topic: 'Percentage purity', subj: 'chemistry', gen() { const m = r1(15, 40), pc = r1(55, 95); const s = +(m * pc / 100).toFixed(1); return {q: `${m}.0 g of rock salt gives ${s} g of pure salt. What percentage of the rock salt is salt?`, eq: '% = part ÷ whole × 100', ans: s / m * 100, unit: '%', work: `${s} ÷ ${m} × 100 = ${fmt(s / m * 100)}%`}; }},
  {topic: 'Solubility', subj: 'chemistry', gen() { const g = r1(2, 9), w = pick([10, 20, 25, 50]); return {q: `${g} g of a salt dissolves in ${w} g of water to make a saturated solution. What is its solubility in g per 100 g of water?`, eq: 'scale up to 100 g of water', ans: g * 100 / w, unit: 'g/100 g', work: `${g} × 100 ÷ ${w} = ${fmt(g * 100 / w)} g per 100 g`}; }},
  {topic: 'Mean of repeats', subj: 'all', gen() { const base = r1(10, 40), v = [base + r1(-2, 2), base + r1(-2, 2), base + r1(-2, 2)], an = base + pick([9, -9, 12]); const all = shuffle([...v, an]); return {q: `Repeat readings: ${all.join(', ')}. Ignoring the anomaly, calculate the mean.`, eq: 'mean = sum ÷ number of readings (leave out anomalies)', ans: (v[0] + v[1] + v[2]) / 3, unit: '', work: `Anomaly = ${an}. (${v.join(' + ')}) ÷ 3 = ${fmt((v[0] + v[1] + v[2]) / 3)}`}; }},
  {topic: 'Percentage error', subj: 'all', gen() { const t = pick([40030, 9.81, 340, 1500, 2.70]), e = +(t * (1 + pick([-1, 1]) * r1(2, 25) / 100)).toPrecision(4); return {q: `A student measures a value of ${e} but the accepted value is ${t}. Calculate the percentage error.`, eq: '% error = |measured − true| ÷ true × 100', ans: Math.abs(e - t) / t * 100, unit: '%', work: `|${e} − ${t}| ÷ ${t} × 100 = ${fmt(Math.abs(e - t) / t * 100)}%`}; }},
  {topic: 'Magnification', subj: 'biology', gen() { const act = r1(20, 120, 5), mag = pick([40, 100, 400, 1000]); return {q: `A cell ${act} µm long is viewed at ×${mag}. How long is the image in mm? (1 mm = 1000 µm)`, eq: 'image size = actual size × magnification', ans: act * mag / 1000, unit: 'mm', work: `${act} × ${mag} = ${act * mag} µm = ${fmt(act * mag / 1000)} mm`}; }},
  {topic: 'Rate', subj: 'biology', gen() { const n = r1(20, 90), t = pick([2, 4, 5]); return {q: `Pondweed gives off ${n} bubbles in ${t} minutes. What is the rate in bubbles per minute?`, eq: 'rate = amount ÷ time', ans: n / t, unit: 'bubbles/min', work: `${n} ÷ ${t} = ${fmt(n / t)}`}; }},
  {topic: 'Unit conversion', subj: 'all', gen() { const c = pick([['km/h', 'm/s', v => v / 3.6, 'divide by 3.6 (1000 m ÷ 3600 s)', [36, 72, 90, 108, 54]], ['cm³', 'm³', v => v / 1e6, 'divide by 1 000 000', [5000, 250000, 2e6]], ['g/cm³', 'kg/m³', v => v * 1000, 'multiply by 1000', [1, 2.7, 0.8, 7.9]], ['kJ', 'J', v => v * 1000, 'multiply by 1000', [2.5, 40, 0.3]]]); const v = pick(c[4]); return {q: `Convert ${v} ${c[0]} into ${c[1]}.`, eq: c[3], ans: c[2](v), unit: c[1], work: `${v} ${c[0]} = ${fmt(c[2](v))} ${c[1]}`}; }}
];

function calcDrill(el) {
  let subj = 'all', cur = null, streak = 0, score = 0, tries = 0;
  const qBox = h('div', {class: 'card'}), stats = h('div', {class: 'muted small'});
  const filt = h('div', {class: 'filters'}, ['all', 'physics', 'chemistry', 'biology'].map(s => h('button', {class: 'chip' + (s === subj ? ' on' : ''), onclick: e => { subj = s; $$('.chip', filt).forEach(c => c.classList.toggle('on', c === e.target)); next(); }}, s === 'all' ? 'Everything' : s[0].toUpperCase() + s.slice(1))));
  function next() {
    const pool = CALCS.filter(c => subj === 'all' || c.subj === subj || c.subj === 'all'), G = pick(pool);
    cur = {...G.gen(), topic: G.topic};
    const inp = h('input', {type: 'number', step: 'any', style: 'width:150px;padding:8px;font-size:1.05rem;border:1px solid var(--line);border-radius:8px'});
    const out = h('div', {class: 'a'}), hint = h('div', {class: 'a'}, 'Equation: ', h('span', {class: 'eq'}, cur.eq));
    const check = () => {
      const v = parseFloat(inp.value); if (isNaN(v)) return;
      const ok = Math.abs(v - cur.ans) <= Math.max(Math.abs(cur.ans) * .02, .011); tries++;
      if (ok) { score++; streak++; } else streak = 0;
      out.innerHTML = ''; out.append(h('div', null, h('span', {class: ok ? 'ok' : 'no'}, ok ? '✔ Correct. ' : `✘ Not quite: the answer is ${fmt(cur.ans)} ${cur.unit}. `)), h('div', null, h('b', null, 'Working: '), cur.work)); out.classList.add('show');
      stats.textContent = `Score ${score} / ${tries} · streak ${streak}`;
    };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    qBox.innerHTML = '';
    qBox.append(h('span', {class: 'pill spec'}, cur.topic), h('p', {class: 'calcq', style: 'margin-top:10px'}, cur.q), h('div', {class: 'btns', style: 'align-items:center'}, inp, h('span', null, cur.unit), h('button', {class: 'btn primary', onclick: check}, 'Check'), h('button', {class: 'btn', onclick: () => hint.classList.add('show')}, 'Hint'), h('button', {class: 'btn', onclick: next}, 'Next ▶')), hint, out);
    inp.focus();
  }
  el.append(filt, qBox, stats); next();
}
