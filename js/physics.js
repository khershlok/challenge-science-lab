/* Physics practicals */
'use strict';

/* 1. Hanging masses - the specimen practical paper */
(() => {
  const xL = 200, xR = 480, PX = 14, BAR = 20, G = 10, BARW = 0.6;
  const meter = (m, x) => {
    const W = m / 1000 * G;
    return {L: W * (BAR - x) / BAR + BARW / 2, R: W * x / BAR + BARW / 2};
  };
  function drawMeter(c, x, F, label) {
    D.line(c, x, 40, x, 60, '#444', 2);
    D.rect(c, x - 17, 60, 34, 170, '#2c3640', '#1a2129', 1.5, 6);
    D.rect(c, x - 11, 70, 22, 150, '#f3f1e6', null, 0, 3);
    for (let n = 0; n <= 10; n++) {
      const y = 76 + n * 14; D.line(c, x - 11, y, x - 3, y, '#333', 1);
      if (n % 2 === 0) D.text(c, String(n), x + 2, y, {size: 9});
      if (n < 10) D.line(c, x - 11, y + 7, x - 6, y + 7, '#555', .8);
    }
    const py = 76 + clamp(F, 0, 10) * 14; D.line(c, x - 13, py, x + 11, py, '#d63b2f', 2.5);
    D.line(c, x, 230, x, 246 + F * 3, '#555', 2.5);
    c.strokeStyle = '#555'; c.lineWidth = 2.5; c.beginPath(); c.arc(x, 252 + F * 3, 6, -Math.PI / 2, Math.PI * .9); c.stroke();
    D.text(c, label, x, 22 + 2, {size: 12, bold: true, align: 'center', col: '#2c3640', bg: '#ffffffcc'});
    D.text(c, 'N', x - 7, 66, {size: 8, col: '#fff', align: 'center'});
  }
  practical({
    id: 'hanging-masses', subject: 'physics', specimen: true,
    title: 'Hanging masses: two newton-meters', syllabus: 'P2 Forces · moments and equilibrium',
    short: 'The 2027 specimen practical. Slide a mass along a bar held by two newton-meters and see how the load is shared.',
    aim: 'Find out how the readings on two newton-meters supporting a bar change as a mass is moved along the bar, and use the pattern to predict new readings.',
    apparatus: ['Two newton-meters (0–10 N) hung side by side from a clamp stand', 'Steel bar hung between the two hooks (hooks 20 cm apart)', 'Slotted mass on a hanger (g = 10 N/kg, so 100 g weighs 1 N)', 'Ruler, or the cm marks on the bar'],
    variables: {iv: 'Distance of the mass from the left-hand hook (cm)', dv: 'Reading on each newton-meter (N)', cv: ['The same mass throughout', 'The same bar and newton-meters', 'Meters hanging vertically and zeroed before starting', 'Reading taken at eye level once the bar is still']},
    method: [
      'Check both newton-meters read zero before the bar is attached (adjust the zero screw if not). Then note what they read with just the bar hanging.',
      'Hang the mass on the bar 1 cm in from the left-hand hook.',
      'Wait for the bar to stop swinging. Read both meters at eye level, to the nearest 0.1 N, and record them in the table.',
      'Move the mass 1 cm to the right and read both meters again. Carry on to the far end of the bar.',
      'Go back along the bar and take a repeat reading at every position. Work out the mean of each pair of readings.',
      'Plot both meters on the same axes (reading against distance) with two lines of best fit.'
    ],
    safety: ['Keep feet clear of the masses and clamp the stand to the bench (or weigh down its base) so it cannot topple.', 'Do not load a newton-meter beyond its maximum.'],
    tips: [
      'Collection of data (8 marks): table with the distance column first, units in the headings (not in the cells), every reading to the same precision (0.1 N), repeat readings and means.',
      'Presentation (6 marks): independent variable (distance) on the x-axis. Label both axes with units, use a sensible scale that fills over half the grid, plot crosses accurately, and draw a straight line of best fit for each meter with a key.',
      'Analysis (6 marks): one reading goes up by the same amount as the other goes down, so the two always add to the same total (the weight of the mass plus the bar). The lines cross in the middle of the bar, where both meters read the same.',
      'The meters do not read exactly 0 N and the full weight at the ends, because the bar itself has weight (shared equally by the two meters).'
    ],
    sim: {
      w: 720, h: 440,
      init: () => ({x: 1, m: 400, Lr: 0, Rr: 0}),
      controls: [
        {type: 'range', key: 'x', label: 'Distance from left hook', min: 0, max: 20, step: 0.5, unit: 'cm'},
        {type: 'select', key: 'm', label: 'Mass on the hanger', options: [[200, '200 g (2 N)'], [300, '300 g (3 N)'], [400, '400 g (4 N)'], [500, '500 g (5 N)']]},
        {type: 'note', text: 'Tip: you can also drag the mass along the bar.'}
      ],
      step(s, dt) { const t = meter(s.m, s.x); s.Lr += (t.L - s.Lr) * Math.min(1, dt * 5); s.Rr += (t.R - s.Rr) * Math.min(1, dt * 5); },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 415);
        D.rect(c, 600, 30, 10, 385, '#9aa4ae', '#6c7680', 1); D.rect(c, 560, 405, 90, 10, '#56606b', null, 0, 3);
        D.rect(c, 150, 36, 460, 8, '#9aa4ae', '#6c7680', 1);
        drawMeter(c, xL, s.Lr, 'Meter 1'); drawMeter(c, xR, s.Rr, 'Meter 2');
        const yl = 258 + s.Lr * 3, yr = 258 + s.Rr * 3;
        const ang = Math.atan2(yr - yl, xR - xL);
        c.save(); c.translate(xL, yl); c.rotate(ang);
        D.rect(c, -14, -4, xR - xL + 28, 8, '#b7c0c9', '#5d6772', 1.5, 3);
        for (let i = 0; i <= BAR; i++) D.line(c, i * PX, -4, i * PX, i % 5 ? -1 : 2, '#333', 1);
        c.restore();
        const mx = xL + s.x * PX, my = lerp(yl, yr, s.x / BAR);
        D.circle(c, mx, my, 5, null, '#444', 2);
        D.mass(c, mx, my + 4, s.m / 100, (s.m) + ' g');
        D.text(c, '0 cm', xL - 6, yl - 16, {size: 10, align: 'center', col: '#555'});
        D.text(c, '20 cm', xR + 6, yr - 16, {size: 10, align: 'center', col: '#555'});
        // zoomed dial readouts
        for (const [x, F, n] of [[70, s.Lr, 'Meter 1'], [650, s.Rr, 'Meter 2']]) {
          D.rect(c, x - 46, 300, 92, 52, '#fff', '#c9d2dc', 1, 8);
          D.text(c, n, x, 314, {size: 11, align: 'center', col: '#666'});
          D.text(c, (Math.round(F * 10) / 10).toFixed(1) + ' N', x, 336, {size: 18, bold: true, align: 'center', col: '#1f7a6d'});
        }
      },
      pointer(type, p, s) {
        const mx = xL + s.x * PX;
        if (type === 'down' || type === 'drag') { if (type === 'down' && Math.abs(p.x - mx) > 30) return; s.dragging = true; s.x = clamp(Math.round((p.x - xL) / PX * 2) / 2, 0, BAR); return 'grabbing'; }
        if (type === 'up') s.dragging = false;
        return Math.abs(p.x - mx) < 30 && p.y > 240 ? 'grab' : 'default';
      },
      readout: s => [['Distance', s.x.toFixed(1) + ' cm'], ['Meter 1', s.Lr.toFixed(1) + ' N'], ['Meter 2', s.Rr.toFixed(1) + ' N'], ['Total', (s.Lr + s.Rr).toFixed(1) + ' N']],
      read(s) {
        const t = meter(s.m, s.x), slip = Math.random() < .07 ? .4 : 0;
        return {x: s.x, m: s.m + ' g', L: +roundTo(t.L + gauss(.03) + slip, .1).toFixed(1), R: +roundTo(t.R + gauss(.03), .1).toFixed(1)};
      }
    },
    table: {x: {k: 'x', name: 'Distance from left hook', unit: 'cm', dp: 1}, series: 'm', seriesName: 'Mass', ys: [{k: 'L', name: 'Meter 1 reading', unit: 'N', dp: 1}, {k: 'R', name: 'Meter 2 reading', unit: 'N', dp: 1}],
      derived: [{k: 'sum', name: 'Total of means', unit: 'N', dp: 2, f: r => r.L + r.R}]},
    graph: {x: 'x', y: ['L', 'R'], yName: {L: 'Meter 1', R: 'Meter 2'}, fit: 'line', xLabel: 'Distance of mass from left hook / cm', yLabel: 'Newton-meter reading / N', xmin: 0, xmax: 20,
      model: (x, name, yk) => { const t = meter(parseInt(name) || 400, x); return yk === 'L' ? t.L : t.R; }, anomTol: () => .25},
    demo: [
      {say: 'Both meters are zeroed first. With 400 g on the bar, start 1 cm from the left hook.', set: {m: 400, x: 1}, wait: 2200},
      ...[1, 3, 5, 7, 9, 11, 13, 15, 17, 19].map(x => ({say: `Mass at ${x} cm: wait for the bar to settle, then read both meters at eye level.`, set: {x}, wait: 1100, record: true})),
      ...[19, 15, 11, 7, 3].map(x => ({say: `Repeat reading at ${x} cm.`, set: {x}, wait: 900, record: true})),
      {say: 'Meter 1 falls and Meter 2 rises by the same amount, so the total stays at about 4.6 N (4 N mass + 0.6 N bar).', wait: 3800}
    ],
    questions: [
      {q: 'Describe the pattern in the two sets of readings.', a: 'As the mass moves to the right, Meter 1’s reading falls steadily and Meter 2’s rises by the same amount: both graphs are straight lines, one with a negative gradient and one with a positive gradient. The two readings always add up to the same total, and the lines cross in the middle (10 cm), where the meters read the same.'},
      {q: 'Why is the total of the two readings constant? What is it equal to?', a: 'The bar and mass are in equilibrium (not moving), so the upward forces balance the downward forces. Upward: the two meter forces. Downward: weight of mass + weight of bar. So Meter 1 + Meter 2 = total weight, wherever the mass is.'},
      {q: 'Why does Meter 2 not read 0 N when the mass is right next to the left hook?', a: 'The steel bar has its own weight (about 0.6 N here), which acts at its middle and is shared equally, so each meter carries about 0.3 N from the bar alone. This gives both lines a y-intercept.'},
      {q: 'Use moments to explain why the readings change.', a: 'Take moments about the left hook: Meter 2 × 20 cm = W × x (+ the bar’s moment). So Meter 2’s reading is proportional to x. The closer the mass is to a meter, the bigger the share of its weight that meter carries.'},
      {num: s => meter(2 * s.m, 7.5).L, tol: .15, unit: 'N', q: s => `Prediction (like Q4 of the specimen): what would Meter 1 read if a mass twice as big (${2 * s.m} g) hung 7.5 cm from the left hook? Use the bar weight from your own data (≈ 0.6 N).`,
        a: s => { const W = 2 * s.m / 100, t = meter(2 * s.m, 7.5); return `Weight = ${W} N. Meter 1 takes the fraction (20 − 7.5)/20 = 0.625 of it: ${(.625 * W).toFixed(2)} N, plus 0.3 N for half the bar = ${t.L.toFixed(2)} N. Meter 2 = 0.375 × ${W} + 0.3 = ${t.R.toFixed(2)} N. Check: they add to ${(t.L + t.R).toFixed(2)} N = ${W} + 0.6.`; }}
    ],
    sources: [SRC.sme('https://www.savemyexams.com/gcse/physics/edexcel/18/revision-notes/9-forces-and-their-effects/9-2-moments/9-2-2-the-principle-of-moments/', 'Save My Exams: principle of moments'), SRC.bite('moments principle of moments'), SRC.cog('moments')]
  });
})();

/* 2. Hooke's law */
(() => {
  const TOP = 50, PX = 7, L0 = 9, X = 330;
  const ext = F => F <= 5 ? 2.5 * F : 12.5 + 2.5 * (F - 5) + 0.9 * (F - 5) ** 2;
  practical({
    id: 'hookes-law', subject: 'physics', title: 'Stretching a spring (Hooke’s law)', syllabus: 'P2 Forces · deforming objects',
    short: 'Add masses to a spring, measure the extension and find the limit of proportionality. A recommended practical in the syllabus.',
    aim: 'Investigate how the extension of a spring depends on the force (load) stretching it.',
    apparatus: ['Clamp stand, boss and clamp', 'Spring', 'Metre rule clamped vertically next to the spring', 'Pointer (splint) taped to the bottom of the spring', '100 g slotted masses (each weighs 1 N)', 'G-clamp to fix the stand to the bench'],
    variables: {iv: 'Force (weight added) in N', dv: 'Extension of the spring in cm', cv: ['The same spring', 'Ruler kept vertical and fixed', 'Read the pointer at eye level each time']},
    method: [
      'Hang the spring from the clamp and fix the metre rule vertically beside it. Note the pointer’s reading with no load: this is the original length reading.',
      'Hang a 100 g mass (1 N) on the spring. Wait for it to stop bouncing and read the pointer at eye level.',
      'Extension = new reading − original reading. Record force and extension in a table.',
      'Add masses 1 N at a time, recording each reading, up to 8 N.',
      'Remove the masses one at a time and take readings again as a repeat. Check whether the spring returns to its original length.',
      'Plot extension against force and draw a line of best fit.'
    ],
    safety: ['Wear eye protection in case the spring snaps or flies off.', 'Clamp the stand to the bench and keep feet away from under the masses.'],
    tips: ['Hooke’s law: extension is directly proportional to force (a straight line through the origin) up to the limit of proportionality.', 'Beyond the limit of proportionality the graph curves: the spring stretches more for each extra newton.', 'Past the elastic limit the spring is permanently stretched and does not return to its original length.', 'Spring constant k = force ÷ extension (N/m). Convert cm to m first!'],
    sim: {
      w: 720, h: 440,
      init: () => ({F: 0, maxF: 0, len: L0}),
      controls: [{type: 'buttons', items: [
        {label: '＋ Add 100 g', primary: true, act: s => { if (s.F < 8) s.F++; s.maxF = Math.max(s.maxF, s.F); }},
        {label: '－ Remove 100 g', act: s => { if (s.F > 0) s.F--; }}]},
        {type: 'note', text: 'The spring is stretched past its elastic limit at about 6 N. Take the load right up to 8 N, then unload it and see what happens.'}],
      reset: s => { s.F = 0; s.maxF = 0; },
      perm: s => s.maxF > 6 ? 0.5 * (s.maxF - 6) ** 2 : 0,
      step(s, dt) { const target = L0 + ext(s.F) + this.perm(s); s.len += (target - s.len) * Math.min(1, dt * 6) + Math.sin(s.t * 12) * .004 * Math.abs(target - s.len); },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 415);
        D.stand(c, 210, 415, 385, 160, TOP);
        const bot = TOP + 8 + s.len * PX;
        D.spring(c, X, TOP + 4, bot, 16 + Math.round(s.len / 4), 9, '#6d7d8c');
        D.line(c, X, bot, 392, bot, '#c0392b', 2); D.circle(c, 392, bot, 2.5, '#c0392b');
        D.ruler(c, 392, TOP, 360, PX * 1, true, 0, false);
        for (let cm = 0; cm <= 50; cm += 5) D.text(c, String(cm), 422, TOP + cm * PX, {size: 9, col: '#5b4a14'});
        if (s.F) D.mass(c, X, bot, s.F, s.F * 100 + ' g');
        D.rect(c, 470, 60, 220, 122, '#fff', '#c9d2dc', 1, 10);
        D.text(c, 'Pointer reading', 486, 80, {size: 12, col: '#666'});
        D.text(c, (s.len - 0.01).toFixed(1) + ' cm', 486, 104, {size: 20, bold: true, col: '#1f7a6d'});
        D.text(c, 'Original reading: ' + L0.toFixed(1) + ' cm', 486, 130, {size: 12});
        D.text(c, 'Extension: ' + (s.len - L0).toFixed(1) + ' cm', 486, 152, {size: 12, bold: true});
        if (this.perm(s) > .05 && s.F === 0) D.text(c, 'Permanently stretched!', 486, 172, {size: 12, bold: true, col: '#c0392b'});
        // eye-level hint
        D.text(c, '👁', 470, bot, {size: 16}); D.line(c, 484, bot, 422, bot, 'rgba(0,0,0,.15)', 1);
      },
      readout: s => [['Force', s.F + ' N'], ['Extension', (s.len - L0).toFixed(1) + ' cm']],
      read(s) { const e = ext(s.F) + this.perm(s); return {F: s.F, e: +Math.max(0, roundTo(e + gauss(.06), .1)).toFixed(1)}; },
      recordMsg: () => 'Reading recorded. Repeat readings appear if you record the same force again (for example while unloading).'
    },
    table: {x: {k: 'F', name: 'Force', unit: 'N', dp: 0}, ys: [{k: 'e', name: 'Extension', unit: 'cm', dp: 1}]},
    graph: {x: 'F', y: ['e'], fit: 'curve', model: x => ext(x), xLabel: 'Force / N', yLabel: 'Extension / cm', xmin: 0, ymin: 0, anomTol: () => .6},
    demo: [
      {say: 'With no load, the pointer reads the original length. Read at eye level to avoid parallax error.', set: {F: 0, maxF: 0}, record: true, wait: 2200},
      ...[1, 2, 3, 4, 5, 6, 7, 8].map(F => ({say: F === 6 ? 'Notice the extensions getting bigger for each newton: we have passed the limit of proportionality.' : `Add 100 g. Load = ${F} N. Wait until it stops bouncing, then read the pointer.`, set: s => ({F, maxF: Math.max(s.maxF, F)}), wait: 1500, record: true})),
      ...[6, 4, 2, 0].map(F => ({say: F === 0 ? 'Unloaded completely: the spring has not returned to its original length. It went past its elastic limit.' : `Unloading: ${F} N.`, set: {F}, wait: 1600, record: true}))
    ],
    questions: [
      {q: 'Describe the shape of the graph.', a: 'A straight line through the origin up to about 5 N, so extension is directly proportional to force (Hooke’s law). After that the line curves upwards: the limit of proportionality has been passed.'},
      {num: () => 40, tol: 2, unit: 'N/m', q: 'Using the straight part, the extension is 2.5 cm for each 1 N. Calculate the spring constant in N/m.', a: 'k = F ÷ e = 1 N ÷ 0.025 m = 40 N/m. (Always convert 2.5 cm into 0.025 m first.)'},
      {q: 'Why should you read the pointer at eye level?', a: 'To avoid parallax error: viewing from above or below makes the pointer appear against the wrong mark on the ruler.'},
      {q: 'A student loaded the spring to 8 N and found it longer than at the start when unloaded. Explain.', a: 'It was stretched past its elastic limit, so it has been permanently deformed (inelastic deformation) and will not return to its original length.'}
    ],
    sources: [SRC.sme('https://www.savemyexams.com/gcse/physics/aqa/18/revision-notes/5-forces/5-3-forces-and-elasticity/5-3-5-required-practical-investigating-force-and-extension/', 'Save My Exams: force and extension'), SRC.bite('hookes law spring extension'), SRC.cog('hookes law required practical')]
  });
})();

/* 3. Principle of moments */
(() => {
  const PX = 6, PV = {x: 360, y: 290};
  practical({
    id: 'moments', subject: 'physics', title: 'Balancing a metre rule (principle of moments)', syllabus: 'P2 Force and rotation',
    short: 'Hang weights either side of a pivot and find where the rule balances.',
    aim: 'Test the principle of moments: when a rule balances, the total clockwise moment equals the total anticlockwise moment.',
    apparatus: ['Metre rule balanced at its centre (50 cm) on a pivot', 'Two mass hangers with 100 g slotted masses (1 N each)', 'Loops of thread to hang the masses'],
    variables: {iv: 'Weight hung on the right (N)', dv: 'Distance from the pivot at which the rule balances (cm)', cv: ['The weight and distance on the left side', 'The same metre rule balanced at its centre', 'Distances measured from the pivot to the thread']},
    method: [
      'Balance the metre rule on the pivot at its 50 cm mark (its centre of mass), so its own weight has no moment.',
      'Hang a 2 N weight 30 cm to the left of the pivot. Leave it there for the whole experiment.',
      'Hang a 1 N weight on the right side and slide it until the rule balances horizontally. Record the distance from the pivot.',
      'Repeat with 2 N, 3 N, 4 N, 5 N and 6 N on the right.',
      'For each row, calculate weight × distance on each side and compare.'
    ],
    safety: ['Keep feet clear of the masses in case they slip off.'],
    tips: ['Moment = force × perpendicular distance from the pivot (N cm or N m).', 'Balanced: sum of clockwise moments = sum of anticlockwise moments.', 'Doubling the weight halves the balance distance: they are inversely proportional, so the graph is a curve, not a straight line.', 'Plotting distance against 1 ÷ weight gives a straight line through the origin.'],
    sim: {
      w: 720, h: 440,
      init: () => ({W1: 2, d1: 30, W2: 1, d2: 40, a: 0}),
      controls: [
        {type: 'range', key: 'W1', label: 'Left weight', min: 1, max: 4, step: 1, unit: 'N'},
        {type: 'range', key: 'd1', label: 'Left distance from pivot', min: 5, max: 45, step: 1, unit: 'cm'},
        {type: 'range', key: 'W2', label: 'Right weight', min: 1, max: 6, step: 1, unit: 'N'},
        {type: 'range', key: 'd2', label: 'Right distance from pivot', min: 1, max: 48, step: 0.5, unit: 'cm'},
        {type: 'note', text: 'Drag the right-hand weight along the rule until it balances, then record.'}
      ],
      step(s, dt) { const net = s.W2 * s.d2 - s.W1 * s.d1; const target = clamp(net * .004, -.16, .16); s.a += (target - s.a) * Math.min(1, dt * 3); },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 415);
        c.fillStyle = '#56606b'; c.beginPath(); c.moveTo(PV.x, PV.y + 2); c.lineTo(PV.x - 28, 415); c.lineTo(PV.x + 28, 415); c.fill();
        c.save(); c.translate(PV.x, PV.y); c.rotate(s.a);
        D.rect(c, -300, -12, 600, 12, '#fdf6d8', '#b8a45a', 1);
        for (let cm = 0; cm <= 100; cm++) { const x = -300 + cm * PX; D.line(c, x, -12, x, -12 + (cm % 10 ? (cm % 5 ? 3 : 5) : 8), '#5b4a14', .8); if (cm % 10 === 0) D.text(c, String(cm), x, -2, {size: 7.5, align: 'center', col: '#5b4a14'}); }
        c.restore();
        const hang = (d, W, side) => {
          const x = PV.x + side * Math.cos(s.a) * d * PX, y = PV.y + side * Math.sin(s.a) * d * PX;
          D.line(c, x, y, x, y + 26, '#555', 1.2); D.mass(c, x, y + 26, W, W + ' N');
        };
        hang(s.d1, s.W1, -1); hang(s.d2, s.W2, 1);
        const M1 = s.W1 * s.d1, M2 = s.W2 * s.d2, bal = Math.abs(M2 - M1) <= s.W2 * .25 + .01;
        D.rect(c, 20, 20, 300, 80, '#fff', '#c9d2dc', 1, 10);
        D.text(c, `Anticlockwise moment = ${s.W1} N × ${s.d1} cm = ${M1} N cm`, 32, 42, {size: 12});
        D.text(c, `Clockwise moment = ${s.W2} N × ${s.d2} cm = ${+(M2).toFixed(1)} N cm`, 32, 64, {size: 12});
        D.text(c, bal ? '✔ Balanced' : (M2 > M1 ? 'Tips clockwise ↻' : 'Tips anticlockwise ↺'), 32, 86, {size: 13, bold: true, col: bal ? '#2e8b57' : '#c0392b'});
      },
      pointer(type, p, s) {
        const x = PV.x + Math.cos(s.a) * s.d2 * PX;
        if (type === 'down' && Math.abs(p.x - x) > 30) return;
        if (type === 'down' || type === 'drag') { s.d2 = clamp(Math.round((p.x - PV.x) / PX * 2) / 2, 1, 48); return 'grabbing'; }
        return Math.abs(p.x - x) < 30 ? 'grab' : 'default';
      },
      readout: s => [['Left', `${s.W1} N at ${s.d1} cm`], ['Right', `${s.W2} N at ${s.d2} cm`]],
      read(s) {
        const M1 = s.W1 * s.d1, M2 = s.W2 * s.d2;
        if (Math.abs(M2 - M1) > s.W2 * .25 + .01) return 'The rule is not balanced yet: move the right-hand weight until it is level.';
        return {left: `${s.W1} N at ${s.d1} cm`, W2: s.W2, d2: s.d2};
      }
    },
    table: {series: 'left', seriesName: 'Left side', x: {k: 'W2', name: 'Right weight', unit: 'N', dp: 0}, ys: [{k: 'd2', name: 'Balance distance', unit: 'cm', dp: 1}],
      derived: [{k: 'M', name: 'Clockwise moment', unit: 'N cm', dp: 0, f: r => r.W2 * r.d2}]},
    graph: {x: 'W2', y: ['d2'], fit: 'curve', model: (x, name) => { const m = /([\d.]+) N at ([\d.]+)/.exec(name); return m ? m[1] * m[2] / x : 60 / x; }, xLabel: 'Weight on right / N', yLabel: 'Balance distance / cm', xmin: 0, ymin: 0, anomTol: () => 1.2},
    demo: [
      {say: 'The rule balances at its centre. Hang 2 N at 30 cm on the left: an anticlockwise moment of 60 N cm.', set: {W1: 2, d1: 30, W2: 1, d2: 30}, wait: 2400},
      ...[[1, 60 / 1], [2, 30], [3, 20], [4, 15], [5, 12], [6, 10]].flatMap(([W, d]) => [
        {say: `Hang ${W} N on the right and slide it…`, set: {W2: W, d2: Math.min(48, d + 8)}, wait: 900},
        {say: `Balanced at ${d} cm: ${W} N × ${d} cm = 60 N cm, equal to the anticlockwise moment.`, set: {d2: Math.min(48, d)}, wait: 1500, record: d <= 48}
      ]),
      {say: 'Double the weight, half the distance: weight and balance distance are inversely proportional.', wait: 3000}
    ],
    questions: [
      {num: () => 15, tol: .1, unit: 'cm', q: 'A 2 N weight hangs 30 cm left of the pivot. Where must a 4 N weight hang on the right to balance it?', a: 'Clockwise = anticlockwise: 4 × d = 2 × 30 = 60, so d = 15 cm.'},
      {q: 'Why must the rule be balanced at its centre (50 cm mark) before starting?', a: 'The rule’s weight acts at its centre of mass. If the pivot is there, the rule’s weight has zero moment about the pivot and does not affect the results.'},
      {q: 'Describe the relationship between the right-hand weight and the balance distance.', a: 'As the weight increases, the balance distance decreases. Weight × distance is constant (60 N cm), so they are inversely proportional: doubling the weight halves the distance.'},
      {q: 'A see-saw: a 400 N child sits 1.5 m from the pivot. How far from the pivot must a 600 N adult sit to balance?', num: () => 1, tol: .01, unit: 'm', a: '600 × d = 400 × 1.5 = 600, so d = 1.0 m.'}
    ],
    sources: [SRC.sme('https://www.savemyexams.com/gcse/physics/edexcel/18/revision-notes/9-forces-and-their-effects/9-2-moments/9-2-2-the-principle-of-moments/', 'Save My Exams: principle of moments'), SRC.bite('principle of moments'), SRC.cog('moments levers')]
  });
})();

/* 4. Density */
(() => {
  const OBJ = [
    {n: 'Aluminium block', reg: true, dims: [4.0, 3.0, 2.0], rho: 2.70, col: '#c9ced4'},
    {n: 'Steel block', reg: true, dims: [3.0, 2.0, 2.0], rho: 7.85, col: '#8d96a0'},
    {n: 'Stone', reg: false, V: 18.5, rho: 2.6, col: '#8b7d6b'},
    {n: 'Brass key', reg: false, V: 4.0, rho: 8.5, col: '#c9a23a'}
  ];
  const vol = o => o.reg ? o.dims[0] * o.dims[1] * o.dims[2] : o.V;
  practical({
    id: 'density', subject: 'physics', title: 'Measuring density', syllabus: 'P2 Density',
    short: 'Regular blocks with a ruler, irregular objects with a displacement (eureka) can.',
    aim: 'Find the density of regular and irregular solid objects.',
    apparatus: ['Top-pan balance (to 0.1 g)', 'Ruler (to 1 mm)', 'Displacement (eureka) can', 'Measuring cylinder (50 cm³, marked every 1 cm³)', 'Thread'],
    variables: {iv: 'The object being tested', dv: 'Mass (g) and volume (cm³), giving density (g/cm³)', cv: ['Zero (tare) the balance first', 'Fill the eureka can until water drips out of the spout, and wait for it to stop before starting', 'Read the bottom of the meniscus at eye level']},
    method: [
      'Measure the mass of the object on a zeroed top-pan balance.',
      'Regular object: measure length, width and height with a ruler. Volume = l × w × h.',
      'Irregular object: fill the eureka can until water runs out of the spout. When it stops dripping, put an empty measuring cylinder under the spout.',
      'Lower the object gently into the can on a thread. The volume of water pushed out equals the volume of the object.',
      'Read the volume in the measuring cylinder at eye level, from the bottom of the meniscus.',
      'Density = mass ÷ volume.'
    ],
    safety: ['Wipe up spilled water so nobody slips.', 'Lower objects gently so the water does not splash out (that would give a volume reading that is too small).'],
    tips: ['ρ = m ÷ V. In g/cm³ here; 1 g/cm³ = 1000 kg/m³ (water).', 'If an object floats in water, its density is less than 1 g/cm³.', 'Small objects give a small volume: the 1 cm³ resolution of the cylinder makes a big percentage error (see the brass key).', 'An object made of the same material has the same density whatever its size.'],
    sim: {
      w: 720, h: 440,
      init: () => ({o: 0, phase: 'idle', p: 0, mass: null, vol: null}),
      controls: [
        {type: 'select', key: 'o', label: 'Object', options: OBJ.map((o, i) => [i, o.n]), change: s => { s.phase = 'idle'; s.p = 0; s.mass = null; s.vol = null; }},
        {type: 'buttons', items: [
          {label: '1. Weigh it', primary: true, act: s => { s.phase = 'weigh'; s.p = 0; s.mass = +(vol(OBJ[s.o]) * OBJ[s.o].rho + gauss(.05)).toFixed(1); }},
          {label: '2. Measure volume', act: (s, api) => { if (s.mass == null) { api.say('Weigh the object first.', true); return; } s.phase = 'vol'; s.p = 0; const o = OBJ[s.o]; s.vol = o.reg ? vol(o) : Math.max(1, Math.round(o.V + gauss(.35))); }}
        ]}
      ],
      step(s, dt) { s.p = Math.min(1, s.p + dt / 2.6); },
      draw(c, s) {
        const o = OBJ[s.o];
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 380);
        // balance
        D.rect(c, 40, 340, 170, 40, '#e9edf1', '#8a96a3', 1.5, 6); D.rect(c, 60, 325, 130, 14, '#cdd4db', '#8a96a3', 1, 3);
        D.rect(c, 120, 350, 70, 22, '#0f2a1f', null, 0, 3);
        const onBal = s.phase === 'weigh';
        D.text(c, onBal ? (s.p > .5 ? s.mass.toFixed(1) : (s.mass * s.p * 2).toFixed(1)) + ' g' : '0.0 g', 185, 361, {size: 13, col: '#5cffb1', align: 'right', bold: true});
        D.text(c, 'balance', 70, 361, {size: 11, col: '#555'});
        // eureka can
        const cx = 360, cy = 200;
        D.rect(c, cx - 50, cy + 20, 100, 160, 'rgba(120,180,230,.4)'); D.rect(c, cx - 50, cy, 100, 180, null, '#5d7083', 2);
        D.line(c, cx + 50, cy + 22, cx + 92, cy + 50, '#5d7083', 6);
        D.text(c, 'eureka can', cx, cy + 195, {size: 11, align: 'center', col: '#555'});
        // measuring cylinder
        const mx = 470, my = 230, mh = 150, cap = 50;
        const fill = s.phase === 'vol' && !o.reg ? s.vol * clamp((s.p - .35) / .5, 0, 1) : 0;
        D.rect(c, mx - 18, my + mh - fill / cap * mh, 36, fill / cap * mh, 'rgba(120,180,230,.55)');
        D.rect(c, mx - 18, my, 36, mh, null, '#5d7083', 2);
        for (let v = 0; v <= cap; v += 5) { const y = my + mh - v / cap * mh; D.line(c, mx - 18, y, mx - (v % 10 ? 10 : 4), y, '#334', 1); if (v % 10 === 0) D.text(c, String(v), mx + 22, y, {size: 9}); }
        D.text(c, 'cm³', mx + 22, my - 8, {size: 9});
        if (s.phase === 'vol' && !o.reg && s.p > .3 && s.p < .9) for (let i = 0; i < 4; i++) D.circle(c, cx + 92 + (i * 7 + s.t * 60) % 20 * .3, cy + 52 + (i * 13 + s.t * 120) % 40, 2.5, 'rgba(90,150,210,.8)');
        // object
        const draw = (x, y) => { if (o.reg) D.rect(c, x - o.dims[0] * 8, y - o.dims[2] * 8, o.dims[0] * 16, o.dims[2] * 16, o.col, '#555', 1.5, 2); else { c.fillStyle = o.col; c.beginPath(); c.ellipse(x, y, o.V > 10 ? 26 : 14, o.V > 10 ? 18 : 8, .3, 0, Math.PI * 2); c.fill(); c.strokeStyle = '#444'; c.stroke(); } };
        if (s.phase === 'weigh') draw(125, 312);
        else if (s.phase === 'vol' && !o.reg) { const y = lerp(80, cy + 140, clamp(s.p / .5, 0, 1)); D.line(c, cx, 30, cx, y, '#777', 1); draw(cx, y + 12); }
        else if (s.phase === 'vol' && o.reg) {
          draw(600, 180); const [l, w, hh] = o.dims, x0 = 600 - l * 8, y0 = 180 - hh * 8;
          D.ruler(c, x0, 220, l * 16 + 20, 16, false, 0, true);
          D.text(c, `l = ${l.toFixed(1)} cm   w = ${w.toFixed(1)} cm   h = ${hh.toFixed(1)} cm`, 600, 110, {size: 12, align: 'center', bold: true, bg: '#fff'});
          D.arrow(c, x0, y0 - 10, x0 + l * 16, y0 - 10, '#2f6fb8', 1.5, 6);
        } else draw(600, 300);
        D.rect(c, 20, 20, 250, 70, '#fff', '#c9d2dc', 1, 10);
        D.text(c, o.n + (o.reg ? ' (regular)' : ' (irregular)'), 32, 38, {size: 13, bold: true});
        D.text(c, `mass: ${s.mass == null ? '–' : s.mass.toFixed(1) + ' g'}   volume: ${s.vol == null || s.p < .85 ? '–' : s.vol.toFixed(1) + ' cm³'}`, 32, 62, {size: 12});
      },
      readout: s => [['Density so far', s.mass != null && s.vol != null && s.p > .85 ? (s.mass / s.vol).toFixed(2) + ' g/cm³' : '–']],
      read(s) { if (s.mass == null || s.vol == null || s.p < .85) return 'Weigh the object and measure its volume first.'; return {obj: OBJ[s.o].n, m: s.mass, V: s.vol}; }
    },
    table: {x: {k: 'obj', name: 'Object'}, sort: false, ys: [{k: 'm', name: 'Mass', unit: 'g', dp: 1}, {k: 'V', name: 'Volume', unit: 'cm³', dp: 1}], derived: [{k: 'rho', name: 'Density', unit: 'g/cm³', dp: 2, f: r => r.m / r.V}]},
    demo: [
      {say: 'Aluminium block: weigh it on a zeroed balance.', set: {o: 0, phase: 'idle', mass: null, vol: null}, act: s => { s.phase = 'weigh'; s.p = 0; s.mass = +(24 * 2.7 + gauss(.05)).toFixed(1); }, wait: 2600},
      {say: 'Regular shape: volume = length × width × height = 4.0 × 3.0 × 2.0 = 24.0 cm³.', act: s => { s.phase = 'vol'; s.p = 0; s.vol = 24; }, wait: 3000, record: true},
      {say: 'Stone: irregular, so weigh it, then use the displacement can.', set: {o: 2, mass: null, vol: null}, act: s => { s.phase = 'weigh'; s.p = 0; s.mass = +(18.5 * 2.6 + gauss(.05)).toFixed(1); }, wait: 2600},
      {say: 'Lower it gently on a thread. The water it pushes out is caught in the measuring cylinder.', act: s => { s.phase = 'vol'; s.p = 0; s.vol = 18; }, wait: 3200, record: true},
      {say: 'Density = mass ÷ volume. Stone ≈ 2.6 g/cm³, aluminium ≈ 2.7 g/cm³.', wait: 2500}
    ],
    questions: [
      {num: () => 2.7, tol: .02, unit: 'g/cm³', q: 'A block measures 5.0 cm × 4.0 cm × 2.0 cm and has a mass of 108 g. Calculate its density.', a: 'V = 5 × 4 × 2 = 40 cm³. ρ = 108 ÷ 40 = 2.7 g/cm³ (aluminium).'},
      {q: 'Why must the eureka can be filled until water drips from the spout before you start?', a: 'So that the water level is exactly at the spout. Then every cm³ of object pushed in makes exactly one cm³ of water flow out into the cylinder.'},
      {q: 'Why is the brass key’s density less reliable than the stone’s?', a: 'Its volume is small (about 4 cm³) and the cylinder reads to 1 cm³, so the uncertainty is large compared with the reading (about 25%). Using a narrower cylinder with finer markings, or measuring several identical keys together, would help.'},
      {num: () => 2500, tol: 1, unit: 'kg/m³', q: 'Convert 2.5 g/cm³ into kg/m³.', a: 'Multiply by 1000: 2.5 g/cm³ = 2500 kg/m³.'}
    ],
    sources: [SRC.bite('density required practical'), SRC.cog('density required practical'), SRC.pmt]
  });
})();

/* 5. Light: reflection, refraction and dispersion */
(() => {
  const N = 1.5;
  function refract(d, nrm, n1, n2) { // d, nrm unit vectors; nrm points against d
    const r = n1 / n2, ci = -(nrm.x * d.x + nrm.y * d.y), k = 1 - r * r * (1 - ci * ci);
    if (k < 0) return null; const ct = Math.sqrt(k);
    return {x: r * d.x + (r * ci - ct) * nrm.x, y: r * d.y + (r * ci - ct) * nrm.y};
  }
  function hitSeg(p, d, a, b) { // ray p+t d with segment a-b
    const ex = b.x - a.x, ey = b.y - a.y, den = d.x * ey - d.y * ex; if (Math.abs(den) < 1e-9) return null;
    const t = ((a.x - p.x) * ey - (a.y - p.y) * ex) / den, u = ((a.x - p.x) * d.y - (a.y - p.y) * d.x) / den;
    return t > 1e-6 && u >= 0 && u <= 1 ? {t, x: p.x + t * d.x, y: p.y + t * d.y} : null;
  }
  const arc = (c, x, y, r, a1, a2, col) => { c.strokeStyle = col; c.lineWidth = 1.5; c.beginPath(); c.arc(x, y, r, Math.min(a1, a2), Math.max(a1, a2)); c.stroke(); };
  const glow = (c, x1, y1, x2, y2, col, w = 3) => { c.save(); c.shadowColor = col; c.shadowBlur = 8; D.line(c, x1, y1, x2, y2, col, w); c.restore(); };
  practical({
    id: 'light', subject: 'physics', title: 'Light: reflection, refraction and prisms', syllabus: 'P3 Light waves',
    short: 'Shine a ray box at a mirror, a glass block or a prism and measure the angles.',
    aim: 'Measure angles of incidence and reflection for a plane mirror, and angles of incidence and refraction for a glass block. See white light dispersed by a prism.',
    apparatus: ['Ray box with a single slit, and a power supply', 'Plane mirror, rectangular glass block, triangular glass prism', 'Protractor, ruler, sharp pencil, plain paper'],
    variables: {iv: 'Angle of incidence i (°)', dv: 'Angle of reflection or refraction r (°)', cv: ['The same block and the same point of entry', 'Angles always measured from the normal', 'A thin ray (narrow slit) in a darkened room']},
    method: [
      'Draw round the block (or along the mirror) on paper. Draw a normal: a line at 90° to the surface where the ray will hit.',
      'Shine a thin ray at the point where the normal meets the surface, at 10° to the normal.',
      'Mark the path of the rays with small crosses, then join them up with a ruler.',
      'Measure the angle of incidence and the angle of reflection or refraction from the normal with a protractor.',
      'Repeat for angles of incidence from 10° to 70°.'
    ],
    safety: ['The ray box gets hot: do not touch the bulb housing.', 'Work in a dim room but keep walkways clear.'],
    tips: ['Always measure angles from the normal, never from the surface.', 'Law of reflection: angle of incidence = angle of reflection.', 'Entering a denser material (air → glass) light slows down and bends towards the normal. Leaving it, light bends away from the normal.', 'A ray along the normal (i = 0°) does not bend.', 'A prism disperses white light into a spectrum: red bends least, violet bends most (ROYGBIV).'],
    sim: {
      w: 720, h: 440,
      init: () => ({mode: 'block', i: 40}),
      controls: [
        {type: 'select', key: 'mode', label: 'Experiment', options: [['block', 'Glass block (refraction)'], ['mirror', 'Plane mirror (reflection)'], ['prism', 'Prism (dispersion)']]},
        {type: 'range', key: 'i', label: 'Angle of incidence', min: 0, max: 80, step: 5, unit: '°'}
      ],
      draw(c, s) {
        c.fillStyle = '#121a24'; c.fillRect(0, 0, s.W, s.H);
        const i = s.i * Math.PI / 180;
        if (s.mode === 'block' || s.mode === 'mirror') {
          const P = {x: 330, y: 170};
          if (s.mode === 'block') { D.rect(c, 200, 170, 300, 170, 'rgba(160,220,255,.15)', 'rgba(190,230,255,.8)', 2); D.text(c, 'glass block', 490, 325, {size: 12, col: '#9cc', align: 'right'}); }
          else { D.rect(c, 120, 170, 460, 8, '#9fb3c8'); for (let x = 125; x < 580; x += 12) D.line(c, x, 178, x - 8, 190, '#9fb3c8', 1); D.text(c, 'plane mirror', 580, 200, {size: 12, col: '#9cc', align: 'right'}); }
          c.setLineDash([6, 5]); D.line(c, P.x, 40, P.x, s.mode === 'block' ? 400 : 165, '#ffffff88', 1.2); c.setLineDash([]);
          D.text(c, 'normal', P.x + 6, 48, {size: 11, col: '#ccc'});
          const L = 190, sx = P.x - L * Math.sin(i), sy = P.y - L * Math.cos(i);
          D.rect(c, sx - 22, sy - 12, 44, 24, '#3a4654', '#777', 1, 4);
          c.save(); c.translate(sx, sy); c.rotate(Math.PI / 2 - i); c.restore();
          glow(c, sx, sy, P.x, P.y, '#ffe680'); D.arrow(c, lerp(sx, P.x, .45), lerp(sy, P.y, .45), lerp(sx, P.x, .55), lerp(sy, P.y, .55), '#ffe680', 0, 10);
          arc(c, P.x, P.y, 46, -Math.PI / 2, -Math.PI / 2 - i, '#ffe680');
          D.text(c, `i = ${s.i}°`, P.x - 60, P.y - 62, {size: 13, bold: true, col: '#ffe680'});
          if (s.mode === 'mirror') {
            const ex = P.x + L * Math.sin(i), ey = P.y - L * Math.cos(i); glow(c, P.x, P.y, ex, ey, '#7fe0ff');
            arc(c, P.x, P.y, 56, -Math.PI / 2, -Math.PI / 2 + i, '#7fe0ff'); D.text(c, `r = ${s.i}°`, P.x + 26, P.y - 70, {size: 13, bold: true, col: '#7fe0ff'});
          } else {
            const r = Math.asin(Math.sin(i) / N), Q = {x: P.x + 170 * Math.tan(r), y: 340};
            glow(c, P.x, P.y, Q.x, Q.y, '#7fe0ff');
            c.setLineDash([4, 4]); D.line(c, P.x + 170 * Math.tan(i) * 0 + P.x - P.x + P.x, P.y, P.x + 150 * Math.sin(i) * 1.2, P.y + 150 * Math.cos(i) * 1.2, '#ffe68055', 1); c.setLineDash([]);
            c.setLineDash([6, 5]); D.line(c, Q.x, 300, Q.x, 420, '#ffffff66', 1); c.setLineDash([]);
            glow(c, Q.x, Q.y, Q.x + 120 * Math.sin(i), Q.y + 120 * Math.cos(i), '#ffe680');
            arc(c, P.x, P.y, 54, Math.PI / 2, Math.PI / 2 - r, '#7fe0ff');
            D.text(c, `r = ${(r * 180 / Math.PI).toFixed(0)}°`, P.x + 10, P.y + 78, {size: 13, bold: true, col: '#7fe0ff'});
            D.text(c, 'Bends towards the normal entering glass, away from it leaving. The emerging ray is parallel to the incident ray.', 20, 420, {size: 12, col: '#cfe'});
          }
        } else {
          const A = {x: 380, y: 90}, B = {x: 250, y: 330}, C = {x: 510, y: 330};
          c.fillStyle = 'rgba(160,220,255,.15)'; c.strokeStyle = 'rgba(190,230,255,.8)'; c.lineWidth = 2; c.beginPath(); c.moveTo(A.x, A.y); c.lineTo(B.x, B.y); c.lineTo(C.x, C.y); c.closePath(); c.fill(); c.stroke();
          const ab = {x: B.x - A.x, y: B.y - A.y}, len = Math.hypot(ab.x, ab.y), n1 = {x: -ab.y / len, y: ab.x / len}; // outward normal of left face
          const M = {x: lerp(A.x, B.x, .5), y: lerp(A.y, B.y, .5)};
          const inward = {x: -n1.x, y: -n1.y}, ang = Math.atan2(inward.y, inward.x) - i * .9;
          const d = {x: Math.cos(ang), y: Math.sin(ang)}, S = {x: M.x - d.x * 220, y: M.y - d.y * 220};
          glow(c, S.x, S.y, M.x, M.y, '#ffffff', 3.5);
          const cols = [['#ff3b3b', 1.50], ['#ff9a2e', 1.515], ['#ffe94a', 1.53], ['#4be06b', 1.545], ['#3fa8ff', 1.56], ['#5b5bff', 1.575], ['#b05bff', 1.59]];
          for (const [col, n] of cols) {
            const t1 = refract(d, n1, 1, n); if (!t1) continue;
            const H2 = hitSeg(M, t1, A, C) || hitSeg(M, t1, B, C); if (!H2) continue;
            c.save(); c.globalAlpha = .6; D.line(c, M.x, M.y, H2.x, H2.y, col, 1.5); c.restore();
            const e = {x: C.x - A.x, y: C.y - A.y}, el = Math.hypot(e.x, e.y); let n2 = {x: -e.y / el, y: e.x / el}; if (n2.x * t1.x + n2.y * t1.y > 0) n2 = {x: -n2.x, y: -n2.y};
            const t2 = refract(t1, n2, n, 1); if (!t2) continue;
            glow(c, H2.x, H2.y, H2.x + t2.x * 260, H2.y + t2.y * 260, col, 2.5);
          }
          D.text(c, 'White light is a mixture of colours. Each colour refracts by a different amount, so they spread out (dispersion).', 20, 420, {size: 12, col: '#cfe'});
          D.text(c, 'Red is bent least, violet most.', 20, 400, {size: 12, col: '#cfe'});
        }
      },
      readout: s => {
        if (s.mode === 'prism') return [['Mode', 'Prism (qualitative)']];
        const r = s.mode === 'mirror' ? s.i : Math.asin(Math.sin(s.i * Math.PI / 180) / N) * 180 / Math.PI;
        return [['i', s.i + '°'], [s.mode === 'mirror' ? 'Reflection angle' : 'Refraction angle', r.toFixed(0) + '°']];
      },
      read(s) {
        if (s.mode === 'prism') return 'The prism part is for looking, not measuring. Choose the glass block or the mirror to take readings.';
        const r = s.mode === 'mirror' ? s.i : Math.asin(Math.sin(s.i * Math.PI / 180) / N) * 180 / Math.PI;
        return {mode: s.mode === 'mirror' ? 'Mirror (reflection)' : 'Glass block (refraction)', i: s.i, r: Math.max(0, Math.round(r + gauss(.6)))};
      }
    },
    table: {series: 'mode', seriesName: 'Experiment', x: {k: 'i', name: 'Angle of incidence', unit: '°', dp: 0}, ys: [{k: 'r', name: 'Angle of reflection / refraction', unit: '°', dp: 0}]},
    graph: {x: 'i', y: ['r'], fit: 'curve', model: (x, name) => name.startsWith('Mirror') ? x : Math.asin(Math.sin(x * Math.PI / 180) / N) * 180 / Math.PI, xLabel: 'Angle of incidence / °', yLabel: 'Angle of reflection or refraction / °', xmin: 0, ymin: 0, xmax: 80, ymax: 80, anomTol: () => 3},
    demo: [
      {say: 'Plane mirror: aim the ray at the point where the normal meets the mirror.', set: {mode: 'mirror', i: 20}, wait: 2000, record: true},
      ...[40, 60].map(i => ({say: `i = ${i}°: the reflected ray leaves at the same angle to the normal.`, set: {i}, wait: 1400, record: true})),
      {say: 'Now the glass block. Light slows down in glass and bends towards the normal.', set: {mode: 'block', i: 0}, wait: 2200, record: true},
      ...[20, 40, 60, 80].map(i => ({say: `i = ${i}°: measure r from the normal inside the block.`, set: {i}, wait: 1400, record: true})),
      {say: 'Finally a prism: white light splits into a spectrum.', set: {mode: 'prism', i: 30}, wait: 3000}
    ],
    questions: [
      {q: 'State the law of reflection.', a: 'The angle of incidence equals the angle of reflection, both measured from the normal.'},
      {q: 'Why does light bend when it enters glass at an angle?', a: 'Light travels more slowly in glass than in air. Hitting the surface at an angle, one side of the beam slows down first, so the beam changes direction (refraction), bending towards the normal.'},
      {q: 'Describe the image in a plane mirror.', a: 'Virtual (cannot be put on a screen), upright, the same size as the object, as far behind the mirror as the object is in front, and laterally inverted (left and right swapped).'},
      {q: 'Which colour of light is refracted most by a prism?', a: 'Violet (it has the highest frequency). Red is refracted least.'}
    ],
    sources: [SRC.bite('refraction glass block practical'), SRC.cog('refraction'), SRC.bite('reflection plane mirror ks3')]
  });
})();

/* 6. Series and parallel circuits */
(() => {
  const R = 6, VC = 1.5;
  const model = (type, n, cells) => type === 'series' ? cells * VC / (R * n) : n * cells * VC / R;
  function buildPaths(s) {
    if (s.type === 'series') return [{pts: [[120, 380], [120, 100], [620, 100], [620, 380], [120, 380]], I: model('series', s.n, s.cells)}];
    const yb = k => 100 + k * 90, Ib = s.cells * VC / R, paths = [{pts: [[540, 100], [620, 100], [620, 380], [120, 380], [120, 100], [200, 100]], I: Ib * s.n}];
    for (let k = 0; k < s.n; k++) paths.push({pts: [[200, 100], [200, yb(k)], [540, yb(k)], [540, 100]], I: Ib});
    return paths;
  }
  const plen = p => { let L = 0; for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; };
  function at(p, u) { for (let i = 1; i < p.length; i++) { const l = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); if (u <= l) return [lerp(p[i - 1][0], p[i][0], u / l), lerp(p[i - 1][1], p[i][1], u / l)]; u -= l; } return p[p.length - 1]; }
  function bulb(c, x, y, P, vertical) {
    const b = clamp(P / 1.5, 0, 1.3);
    if (b > .02) { const g = c.createRadialGradient(x, y, 2, x, y, 40 * b + 10); g.addColorStop(0, `rgba(255,230,120,${.9 * Math.min(1, b)})`); g.addColorStop(1, 'rgba(255,230,120,0)'); c.fillStyle = g; c.beginPath(); c.arc(x, y, 50, 0, 7); c.fill(); }
    D.circle(c, x, y, 14, b > .02 ? `rgba(255,240,170,${Math.min(1, .3 + b)})` : '#fff', '#222', 2);
    const k = 9.9; D.line(c, x - k, y - k, x + k, y + k, '#222', 1.6); D.line(c, x - k, y + k, x + k, y - k, '#222', 1.6);
  }
  function ammeter(c, x, y, I, label) { D.circle(c, x, y, 15, '#fff', '#222', 2); D.text(c, 'A', x, y + 1, {size: 14, bold: true, align: 'center'}); D.text(c, `${label}: ${I.toFixed(2)} A`, x + 20, y - 20, {size: 12, bold: true, col: '#1f7a6d', bg: '#ffffffdd'}); }
  practical({
    id: 'circuits', subject: 'physics', title: 'Series and parallel circuits', syllabus: 'P4 Circuits',
    short: 'Build series and parallel circuits, add bulbs and cells, and measure current with ammeters.',
    aim: 'Investigate how the current in series and parallel circuits depends on the number of bulbs and cells.',
    apparatus: ['Cells (1.5 V each) or a low-voltage power supply', 'Identical filament bulbs in holders', 'Ammeters', 'Connecting leads and a switch'],
    variables: {iv: 'Number of bulbs (and the type of circuit)', dv: 'Current from the cells (A)', cv: ['Same number of cells', 'Identical bulbs', 'Same ammeter, connected in series']},
    method: [
      'Draw the circuit diagram first, then build a series circuit with one bulb, the cells and an ammeter in series.',
      'Close the switch and record the ammeter reading. Note how bright the bulb is.',
      'Add a second, then a third bulb in series, recording the current each time.',
      'Build a parallel circuit: each bulb on its own branch. Put an ammeter in the main circuit and one in each branch.',
      'Record the currents for 1, 2 and 3 branches. Open the switch between readings so the cells do not run down.'
    ],
    safety: ['Use low voltages only. Bulbs and wires can get hot: switch off between readings.', 'Never connect an ammeter straight across a cell (it short-circuits it).'],
    tips: ['An ammeter always goes in series. A voltmeter goes in parallel.', 'Series: the same current everywhere. More bulbs → more resistance → less current, and dimmer bulbs.', 'Parallel: the branch currents add up to the current in the main wire (current splits at a junction). Each bulb is as bright as a single bulb would be.', 'Current is not “used up”: the readings either side of a bulb are the same. Energy is transferred from the cells to the bulbs.', 'More cells (in the same direction) → bigger current.'],
    sim: {
      w: 720, h: 440,
      init: () => ({type: 'series', n: 1, cells: 2, on: true, dots: null}),
      controls: [
        {type: 'select', key: 'type', label: 'Circuit', options: [['series', 'Series'], ['parallel', 'Parallel']], change: s => s.dots = null},
        {type: 'range', key: 'n', label: 'Number of bulbs', min: 1, max: 3, step: 1, change: s => s.dots = null},
        {type: 'range', key: 'cells', label: 'Number of 1.5 V cells', min: 1, max: 3, step: 1},
        {type: 'buttons', items: [{label: 'Switch on / off', act: s => s.on = !s.on}]}
      ],
      step(s, dt) {
        const paths = buildPaths(s);
        if (!s.dots) s.dots = paths.map(p => { const L = plen(p.pts), n = Math.floor(L / 34); return Array.from({length: n}, (_, i) => i * L / n); });
        paths.forEach((p, k) => { const L = plen(p.pts); s.dots[k] = s.dots[k].map(u => s.on ? (u + p.I * 160 * dt) % L : u); });
      },
      draw(c, s) {
        c.fillStyle = '#fbfcfd'; c.fillRect(0, 0, s.W, s.H);
        const paths = buildPaths(s);
        for (const p of paths) { c.strokeStyle = '#222'; c.lineWidth = 2.5; c.beginPath(); p.pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); }
        // cells on bottom wire
        const cx0 = 370 - s.cells * 18;
        D.rect(c, cx0 - 6, 365, s.cells * 36 + 12, 30, '#fbfcfd');
        for (let k = 0; k < s.cells; k++) { const x = cx0 + k * 36 + 6; D.line(c, x, 362, x, 398, '#222', 2.5); D.line(c, x + 12, 370, x + 12, 390, '#222', 6); if (k < s.cells - 1) D.line(c, x + 12, 380, x + 36, 380, '#222', 2.5); }
        D.text(c, `${s.cells} × 1.5 V = ${(s.cells * 1.5).toFixed(1)} V`, 370, 420, {size: 12, align: 'center'});
        // switch
        D.rect(c, 600, 220, 40, 50, '#fbfcfd'); D.circle(c, 620, 225, 3, '#222'); D.circle(c, 620, 265, 3, '#222'); D.line(c, 620, 265, s.on ? 620 : 640, s.on ? 225 : 232, '#222', 2.5);
        const on = s.on ? 1 : 0;
        if (s.type === 'series') {
          const I = model('series', s.n, s.cells) * on;
          for (let k = 0; k < s.n; k++) { const x = 220 + (k + 1) * 300 / (s.n + 1) + 30; D.rect(c, x - 16, 85, 32, 30, '#fbfcfd'); bulb(c, x, 100, I * I * R, false); }
          ammeter(c, 120, 240, I, 'A1'); ammeter(c, 620, 160, I, 'A2');
        } else {
          const Ib = s.cells * VC / R * on;
          for (let k = 0; k < s.n; k++) { const y = 100 + k * 90; D.rect(c, 340, y - 16, 40, 32, '#fbfcfd'); bulb(c, 360, y, Ib * Ib * R); ammeter(c, 470, y, Ib, 'A' + (k + 2)); }
          ammeter(c, 120, 240, Ib * s.n, 'A1');
        }
        s.dots && s.dots.forEach((arr, k) => { const p = paths[k]; if (!p) return; for (const u of arr) { const [x, y] = at(p.pts, u); D.circle(c, x, y, 3, '#2f6fb8'); } });
        D.text(c, s.on ? 'Blue dots show the flow of charge. Faster dots = bigger current.' : 'Switch is open: no current flows.', 20, 30, {size: 12, col: '#555'});
      },
      readout: s => [['Total current (A1)', (s.on ? model(s.type, s.n, s.cells) : 0).toFixed(2) + ' A']],
      read(s) { if (!s.on) return 'Close the switch first.'; return {set: `${s.type === 'series' ? 'Series' : 'Parallel'}, ${s.cells} cell${s.cells > 1 ? 's' : ''}`, n: s.n, I: +(model(s.type, s.n, s.cells) + gauss(.004)).toFixed(2)}; }
    },
    table: {series: 'set', seriesName: 'Circuit', x: {k: 'n', name: 'Number of bulbs', dp: 0}, ys: [{k: 'I', name: 'Current from cells (A1)', unit: 'A', dp: 2}]},
    graph: {x: 'n', y: ['I'], fit: 'curve', model: (x, name) => model(name.startsWith('Series') ? 'series' : 'parallel', x, +(/(\d) cell/.exec(name) || [0, 2])[1]), xLabel: 'Number of bulbs', yLabel: 'Current / A', xmin: 0, ymin: 0, xmax: 3, anomTol: () => .05},
    demo: [
      {say: 'Series circuit, 2 cells, 1 bulb. The ammeters either side of the bulb read the same: current is not used up.', set: {type: 'series', n: 1, cells: 2, on: true, dots: null}, wait: 3000, record: true},
      {say: 'Add a second bulb in series: double the resistance, so the current halves and both bulbs are dimmer.', set: {n: 2, dots: null}, wait: 2600, record: true},
      {say: 'Three bulbs in series: the current is a third.', set: {n: 3, dots: null}, wait: 2200, record: true},
      {say: 'Parallel: each bulb has its own branch. Branch currents add up to the main current.', set: {type: 'parallel', n: 1, dots: null}, wait: 2600, record: true},
      {say: 'Two branches: each bulb gets the full voltage and is as bright as before. The main current doubles.', set: {n: 2, dots: null}, wait: 2600, record: true},
      {say: 'Three branches: A1 = A2 + A3 + A4.', set: {n: 3, dots: null}, wait: 2600, record: true}
    ],
    questions: [
      {num: () => 0.6, tol: .01, unit: 'A', q: 'In a parallel circuit the branch currents are 0.25 A and 0.35 A. What does the ammeter in the main circuit read?', a: 'Currents add where branches meet: 0.25 + 0.35 = 0.60 A.'},
      {q: 'Why are bulbs in series dimmer than one bulb on its own?', a: 'Adding bulbs in series increases the total resistance, so a smaller current flows and the energy from the cells is shared between the bulbs.'},
      {q: 'Give two advantages of wiring house lights in parallel.', a: 'Each light can be switched on and off on its own, and if one bulb breaks the others stay on. Each bulb also gets the full voltage, so it is fully bright.'},
      {q: 'How must an ammeter be connected, and why?', a: 'In series, so that all the current being measured flows through it. It has a very low resistance so it does not change the current.'}
    ],
    sources: [SRC.bite('series and parallel circuits current'), SRC.cog('series and parallel circuits'), SRC.pmt]
  });
})();

/* 7. Electromagnet */
(() => {
  const CORE = {iron: {n: 'Soft iron nail', f: 1, keep: 0}, steel: {n: 'Steel nail', f: .85, keep: .4}, none: {n: 'No core (air)', f: .05, keep: 0}};
  const clips = s => Math.min(30, Math.round(.22 * s.turns * s.I * CORE[s.core].f));
  practical({
    id: 'electromagnet', subject: 'physics', title: 'Strength of an electromagnet', syllabus: 'P4 Electromagnets',
    short: 'Wind a coil round a nail and count the paperclips it picks up as you change the turns, the current or the core.',
    aim: 'Investigate how the number of turns on the coil affects the strength of an electromagnet.',
    apparatus: ['Iron nail (and a steel nail to compare)', 'Insulated wire', 'Low-voltage power supply and an ammeter', 'Variable resistor to keep the current constant', 'Box of identical paperclips'],
    variables: {iv: 'Number of turns of wire on the coil', dv: 'Number of paperclips picked up (a measure of strength)', cv: ['Current (check the ammeter and adjust the variable resistor)', 'The same nail (core)', 'The same size of paperclip']},
    method: [
      'Wind 10 turns of insulated wire around the iron nail and connect it in series with the power supply, ammeter and variable resistor.',
      'Switch on and adjust the current to 1.0 A.',
      'Dip the end of the nail into the paperclips, lift it out and count the clips picked up.',
      'Switch off between readings: the wire gets hot.',
      'Repeat with 20, 30, 40, 50 and 60 turns. Take each reading three times and find the mean.'
    ],
    safety: ['The coil gets hot with a large current: switch off between readings and use a low voltage.'],
    tips: ['A current in a coil produces a magnetic field like a bar magnet’s.', 'Make an electromagnet stronger by: more turns, more current, or an iron core.', 'Soft iron is used because it loses its magnetism when the current is switched off. Steel stays magnetised (a permanent magnet), which would be no good in a scrapyard crane.', 'Uses: lifting magnets, relays, door locks, electric bells, loudspeakers and motors.'],
    sim: {
      w: 720, h: 440,
      init: () => ({turns: 20, I: 1, core: 'iron', on: false, lift: 0, held: 0, after: 0}),
      controls: [
        {type: 'range', key: 'turns', label: 'Turns on the coil', min: 10, max: 60, step: 10},
        {type: 'range', key: 'I', label: 'Current', min: 0.5, max: 2, step: 0.5, unit: 'A'},
        {type: 'select', key: 'core', label: 'Core', options: Object.entries(CORE).map(([k, v]) => [k, v.n])},
        {type: 'buttons', items: [{label: 'Switch on and dip into clips', primary: true, act: s => { s.on = true; s.lift = 0; s.held = Math.max(0, clips(s) + Math.round(gauss(.7))); }}, {label: 'Switch off', act: s => { s.on = false; s.after = Math.round(s.held * CORE[s.core].keep); }}]}
      ],
      step(s, dt) { s.lift = clamp(s.lift + dt * (s.on ? 1.2 : -1.2), 0, 1); },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 400);
        const y = 150 - s.lift * 30, x0 = 210, x1 = 470;
        if (s.on) for (let k = 1; k <= 3; k++) { c.strokeStyle = `rgba(47,111,184,${.45 - k * .1})`; c.lineWidth = 1.5; c.beginPath(); c.ellipse((x0 + x1) / 2, y, 140 + k * 30, 22 + k * 26, 0, 0, 7); c.stroke(); }
        D.rect(c, x0 - 12, y - 14, 10, 28, '#7f8a95', null, 0, 2);
        c.fillStyle = s.core === 'none' ? 'rgba(200,200,200,.25)' : s.core === 'steel' ? '#9aa3ad' : '#6f7880'; c.beginPath(); c.moveTo(x0, y - 7); c.lineTo(x1, y - 7); c.lineTo(x1 + 18, y); c.lineTo(x1, y + 7); c.lineTo(x0, y + 7); c.fill();
        const nT = Math.round(s.turns / 2);
        for (let k = 0; k < nT; k++) { const x = x0 + 30 + k * (200 / nT); c.strokeStyle = '#b5651d'; c.lineWidth = 2.2; c.beginPath(); c.ellipse(x, y, 4, 13, 0, 0, 7); c.stroke(); }
        D.line(c, x0 + 30, y + 12, 130, 300, '#b5651d', 2); D.line(c, x0 + 230, y + 12, 250, 300, '#b5651d', 2);
        D.rect(c, 90, 290, 190, 70, '#33414f', '#1d2630', 1.5, 8); D.text(c, s.on ? `${s.I.toFixed(1)} A` : 'OFF', 185, 318, {size: 18, bold: true, align: 'center', col: s.on ? '#5cffb1' : '#999'});
        D.text(c, 'power supply + ammeter', 185, 345, {size: 11, align: 'center', col: '#ccd'});
        if (s.on) { D.text(c, 'N', x1 + 26, y - 12, {size: 14, bold: true, col: '#c0392b'}); D.text(c, 'S', x0 - 30, y - 12, {size: 14, bold: true, col: '#2f6fb8'}); }
        const clip = (x, yy, a) => { c.save(); c.translate(x, yy); c.rotate(a); c.strokeStyle = '#8c98a4'; c.lineWidth = 1.6; c.beginPath(); c.roundRect(-4, -9, 8, 18, 4); c.stroke(); c.restore(); };
        for (let k = 0; k < 40; k++) clip(520 + (k * 37) % 150, 392 - (k % 4) * 6, k);
        const n = s.on ? s.held : s.after;
        for (let k = 0; k < n; k++) { const row = Math.floor(k / 5), col = k % 5; clip(x1 + 6 + (col - 2) * 9 + row * 2, y + 18 + row * 16 + (1 - s.lift) * 60, (col - 2) * .15); }
        D.rect(c, 500, 20, 200, 64, '#fff', '#c9d2dc', 1, 10);
        D.text(c, 'Paperclips held', 512, 38, {size: 12, col: '#666'});
        D.text(c, String(n), 512, 64, {size: 22, bold: true, col: '#1f7a6d'});
        if (!s.on && s.after) D.text(c, 'Steel keeps its magnetism!', 512, 100, {size: 12, bold: true, col: '#c0392b'});
      },
      readout: s => [['Turns', s.turns], ['Current', s.I + ' A'], ['Core', CORE[s.core].n]],
      read(s) { if (!s.on) return 'Switch on and dip the nail into the paperclips first.'; return {set: `${CORE[s.core].n}, ${s.I} A`, turns: s.turns, n: s.held}; },
      recordMsg: () => 'Recorded. Press “Switch on and dip” again for a repeat reading.'
    },
    table: {series: 'set', seriesName: 'Core and current', x: {k: 'turns', name: 'Number of turns', dp: 0}, ys: [{k: 'n', name: 'Paperclips picked up', dp: 0}]},
    graph: {x: 'turns', y: ['n'], fit: 'line', xLabel: 'Number of turns', yLabel: 'Mean number of paperclips', xmin: 0, ymin: 0, model: (x, name) => { const I = +(/([\d.]+) A/.exec(name) || [0, 1])[1], core = name.startsWith('Steel') ? 'steel' : name.startsWith('No') ? 'none' : 'iron'; return .22 * x * I * CORE[core].f; }, anomTol: () => 2.5},
    demo: [
      {say: 'Iron nail, 1.0 A, 10 turns. Switch on and dip into the paperclips.', set: {core: 'iron', I: 1, turns: 10}, act: s => { s.on = true; s.lift = 0; s.held = clips(s); }, wait: 2400, record: true},
      ...[20, 30, 40, 50, 60].map(t => ({say: `${t} turns, current kept at 1.0 A.`, set: {turns: t}, act: s => { s.on = true; s.lift = 0; s.held = Math.max(0, clips(s) + Math.round(gauss(.6))); }, wait: 1800, record: true})),
      {say: 'Switch off: soft iron loses its magnetism and drops the clips.', act: s => { s.on = false; s.after = 0; }, wait: 2400},
      {say: 'Now a steel nail: when switched off it stays magnetised and keeps some of the clips.', set: {core: 'steel', turns: 40}, act: s => { s.on = true; s.lift = 0; s.held = clips(s); }, wait: 2000},
      {act: s => { s.on = false; s.after = Math.round(s.held * .4); }, say: 'That is why electromagnets use soft iron cores.', wait: 3000}
    ],
    questions: [
      {q: 'State three ways to make an electromagnet stronger.', a: 'Increase the number of turns on the coil, increase the current, and use a soft iron core.'},
      {q: 'Why is soft iron, not steel, used for the core of a scrapyard electromagnet?', a: 'Soft iron loses its magnetism as soon as the current is switched off, so the crane can drop the scrap. Steel would stay magnetised.'},
      {q: 'Why is counting paperclips not a very precise way of measuring strength?', a: 'It only goes up in whole clips, clips can hang off one another (not all held by the magnet), and it depends on how you dip and lift. Repeating and taking a mean helps, or use a newton-meter or a sensor instead.'},
      {q: 'Describe the magnetic field pattern around a current-carrying coil.', a: 'The same as a bar magnet’s: field lines loop from the north-pole end round to the south-pole end, and run straight and close together through the middle of the coil.'}
    ],
    sources: [SRC.bite('electromagnet strength'), SRC.cog('electromagnets'), SRC.pmt]
  });
})();

/* 8. Sound and hearing */
(() => {
  const freq = v => 20 * Math.pow(1000, v / 100);
  let audio = null;
  function tone(s, on) {
    try {
      if (on) {
        if (!audio) { const A = new (window.AudioContext || window.webkitAudioContext)(); const o = A.createOscillator(), g = A.createGain(); o.connect(g); g.connect(A.destination); g.gain.value = 0; o.start(); audio = {A, o, g}; }
        audio.A.resume(); audio.o.frequency.setTargetAtTime(freq(s.fv), audio.A.currentTime, .02); audio.g.gain.setTargetAtTime(.012 * s.amp, audio.A.currentTime, .03);
      } else if (audio) audio.g.gain.setTargetAtTime(0, audio.A.currentTime, .03);
    } catch (e) { /* audio unavailable */ }
  }
  practical({
    id: 'sound', subject: 'physics', title: 'Sound waves and the range of hearing', syllabus: 'P3 Sound waves · hearing',
    short: 'See how pitch and loudness change the wave, and test the range of your own hearing (a recommended practical).',
    aim: 'Find the range of frequencies a person can hear, and relate pitch to frequency and loudness to amplitude.',
    apparatus: ['Signal generator', 'Loudspeaker', 'Oscilloscope (or a microphone and a computer) to show the wave', 'Volume kept at a safe, low level'],
    variables: {iv: 'Frequency of the sound (Hz)', dv: 'Whether the person can hear it', cv: ['The same loudness (amplitude) throughout', 'The same distance from the speaker', 'A quiet room']},
    method: [
      'Connect the signal generator to the loudspeaker, with the volume low.',
      'Start at about 1000 Hz, which everyone can hear. Slowly raise the frequency.',
      'The listener raises a hand while they can still hear the sound. Record the frequency at which they can no longer hear it.',
      'Repeat three times and take a mean. Then lower the frequency to find the lowest pitch they can hear.',
      'Compare results across the class: older people usually have a lower upper limit.'
    ],
    safety: ['Keep the volume low: loud sounds can damage the hair cells in the inner ear, causing temporary deafness or permanent hearing loss and tinnitus.', 'Do not wear headphones for this test.'],
    tips: ['Sound is a longitudinal wave made by vibrations. It needs a medium (solid, liquid or gas) and cannot travel through a vacuum.', 'Speed of sound: about 340 m/s in air, about 1500 m/s in water, about 5000 m/s in steel. It is faster in solids because the particles are closer together.', 'Higher frequency = higher pitch. Larger amplitude = louder.', 'Human hearing: about 20 Hz to 20 000 Hz. Dogs can hear up to about 45 000 Hz and bats up to about 110 000 Hz. Sound above 20 000 Hz is ultrasound.', 'Echo: distance = speed × time ÷ 2 (the sound goes there and back).'],
    sim: {
      w: 720, h: 440,
      init: () => ({fv: 50, amp: 5, playing: false}),
      controls: [
        {type: 'range', key: 'fv', label: 'Frequency', min: 0, max: 100, step: 0.5, fmt: v => Math.round(freq(v)).toLocaleString(), unit: 'Hz', change: s => tone(s, s.playing)},
        {type: 'range', key: 'amp', label: 'Amplitude (loudness)', min: 1, max: 10, step: 1, change: s => tone(s, s.playing)},
        {type: 'buttons', items: [{label: '🔊 Play tone (quiet)', primary: true, act: s => { s.playing = true; tone(s, true); }}, {label: '■ Stop', act: s => { s.playing = false; tone(s, false); }}]},
        {type: 'note', text: 'Raise the frequency slowly. When you can no longer hear the tone, press “Record reading”. Phone and laptop speakers may not reach the very highest frequencies.'}
      ],
      reset: s => { s.playing = false; tone(s, false); },
      draw(c, s) {
        c.fillStyle = '#fbfcfd'; c.fillRect(0, 0, s.W, s.H);
        const f = freq(s.fv), vis = 1 + Math.log10(f / 20) * 1.6, k = .02 + Math.log10(f / 20) * .03, A = s.amp * 1.4 * (s.playing ? 1 : .0);
        D.rect(c, 20, 60, 34, 120, '#2c3640', null, 0, 6);
        c.fillStyle = '#56606b'; c.beginPath(); c.moveTo(54, 90); c.lineTo(54 + 18 + Math.sin(s.t * vis * 6) * A * .5, 60); c.lineTo(54 + 18 + Math.sin(s.t * vis * 6) * A * .5, 180); c.lineTo(54, 150); c.fill();
        for (let col = 0; col < 56; col++) for (let row = 0; row < 12; row++) {
          const x0 = 90 + col * 11, dx = A * Math.sin(k * x0 * 2 - s.t * vis * 6);
          D.circle(c, x0 + dx, 66 + row * 10 + ((col * 7 + row * 3) % 5), 2.2, '#5b7da3');
        }
        D.text(c, 'compression = particles squashed together, rarefaction = spread out. The particles only vibrate back and forth.', 90, 200, {size: 11.5, col: '#555'});
        D.rect(c, 90, 220, 600, 170, '#0e2318', '#334', 2, 10);
        for (let gx = 0; gx <= 10; gx++) D.line(c, 90 + gx * 60, 220, 90 + gx * 60, 390, 'rgba(120,255,170,.12)', 1);
        for (let gy = 0; gy <= 4; gy++) D.line(c, 90, 220 + gy * 42.5, 690, 220 + gy * 42.5, 'rgba(120,255,170,.12)', 1);
        c.strokeStyle = '#5cffb1'; c.lineWidth = 2; c.beginPath();
        const cyc = 1.5 + Math.log10(f / 20) * 4;
        for (let x = 0; x <= 600; x += 2) { const y = 305 - s.amp * 7 * Math.sin(x / 600 * cyc * Math.PI * 2 - s.t * 3); x ? c.lineTo(90 + x, y) : c.moveTo(90, y); }
        c.stroke();
        D.text(c, 'oscilloscope trace: amplitude = height (loudness), waves on screen = frequency (pitch)', 100, 236, {size: 11, col: '#8fe'});
        const band = f < 20 ? 'infrasound' : f > 20000 ? 'ultrasound' : 'audible to humans';
        D.text(c, `${Math.round(f).toLocaleString()} Hz · ${band}`, 690, 30, {size: 16, bold: true, align: 'right', col: '#1f7a6d'});
        D.text(c, s.playing ? '🔊 playing' : '🔇 silent: press Play', 20, 30, {size: 13, col: '#555'});
      },
      readout: s => [['Frequency', Math.round(freq(s.fv)).toLocaleString() + ' Hz'], ['Period', (1000 / freq(s.fv)).toFixed(3) + ' ms']],
      read(s) { const n = (s.api.data.length) + 1; return {trial: n, f: Math.round(freq(s.fv))}; },
      recordMsg: () => 'Recorded as your upper limit of hearing for this trial.'
    },
    table: {x: {k: 'trial', name: 'Trial', dp: 0}, noRepeats: true, ys: [{k: 'f', name: 'Highest frequency heard', unit: 'Hz', dp: 0}]},
    questions: [
      {q: 'Why can sound not travel through space?', a: 'Sound is a vibration passed on by particles. Space is a vacuum with no particles to vibrate, so sound cannot travel through it (light can).'},
      {num: () => 750, tol: 1, unit: 'm', q: 'A ship sends a sound pulse down to the sea bed and hears the echo 1.0 s later. Sound travels at 1500 m/s in sea water. How deep is the sea?', a: 'Distance travelled = 1500 × 1.0 = 1500 m, but that is there and back, so depth = 1500 ÷ 2 = 750 m.'},
      {q: 'What happens to the oscilloscope trace when a sound gets (a) louder, (b) higher pitched?', a: '(a) The waves get taller: bigger amplitude. (b) More waves fit on the screen: higher frequency, shorter wavelength.'},
      {q: 'Why is it unwise to listen to very loud music through headphones?', a: 'Loud sounds can damage the eardrum and the tiny hair cells in the cochlea, causing temporary deafness, tinnitus (ringing) or permanent hearing loss.'}
    ],
    sources: [SRC.bite('sound waves ks3 hearing range'), SRC.cog('sound waves'), SRC.pmt]
  });
})();
