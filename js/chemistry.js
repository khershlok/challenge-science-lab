/* Chemistry practicals */
'use strict';

/* 1. Chromatography - as in the specimen core paper */
(() => {
  const PX = 30, BASE = 355, LANES = [
    {n: 'X (unknown)', spots: [[0, '#222'], [.25, '#2f5fd0'], [.70, '#e3b505']]},
    {n: 'A', spots: [[.25, '#2f5fd0']]}, {n: 'B', spots: [[.45, '#d0342c']]},
    {n: 'C', spots: [[.70, '#e3b505']]}, {n: 'D', spots: [[.85, '#2e9e4f']]}
  ];
  const lx = k => 205 + k * 78;
  const front = s => Math.min(9.2, 9.6 * (1 - Math.exp(-s.time / 22)));
  practical({
    id: 'chromatography', subject: 'chemistry', specimen: true, title: 'Paper chromatography and Rf values', syllabus: 'C3 Separating mixtures',
    short: 'Separate inks, measure how far each spot moves and calculate Rf values. Rf calculations are in the specimen core paper.',
    aim: 'Find out which dyes are in an unknown ink X by comparing it with known dyes A–D.',
    apparatus: ['Chromatography paper', 'Pencil and ruler', 'Capillary tube to spot the inks', 'Beaker with a small depth of solvent (water)', 'Lid (or watch glass) to cover the beaker'],
    variables: {iv: 'The ink being tested', dv: 'Distance travelled by each spot, and the Rf value', cv: ['Same solvent and type of paper', 'Same temperature', 'Baseline above the solvent level', 'Small, concentrated spots of the same size']},
    method: [
      'Draw a baseline in pencil about 1.5 cm from the bottom of the paper. Pencil (graphite) does not dissolve, so it will not run up the paper.',
      'Use a capillary tube to put a small spot of each ink on the baseline, well spaced out. Label each in pencil.',
      'Stand the paper in a beaker with solvent below the baseline, so the spots do not just dissolve into the solvent. Cover with a lid to stop the solvent evaporating.',
      'Let the solvent soak up the paper. Remove the paper before the solvent reaches the top and mark the solvent front in pencil straight away.',
      'Let it dry. Measure the distance from the baseline to the centre of each spot, and from the baseline to the solvent front.',
      'Rf = distance moved by spot ÷ distance moved by solvent.'
    ],
    safety: ['If you use a flammable solvent (such as ethanol), keep it away from flames and use a fume cupboard.'],
    tips: ['Rf has no units and is always between 0 and 1.', 'A pure substance gives one spot (in every solvent). A mixture gives more than one.', 'A spot left on the baseline is insoluble in that solvent.', 'Dyes travel different distances because they have different solubilities in the solvent and different attractions to the paper.', 'Spots at the same height (same Rf) in the same solvent are probably the same substance.'],
    sim: {
      w: 720, h: 440,
      init: () => ({time: 0, run: false, out: false, sel: null}),
      controls: [{type: 'buttons', items: [
        {label: '1. Stand paper in solvent', primary: true, act: s => { if (!s.out) s.run = true; }},
        {label: '2. Remove and mark front', act: (s, api) => { if (!s.run && !s.out) { api.say('Start the chromatogram first.', true); return; } s.run = false; s.out = true; api.say('Solvent front marked. Now click on any spot to measure it.'); }},
        {label: 'Start again', act: s => { s.time = 0; s.run = false; s.out = false; s.sel = null; }}]},
        {type: 'note', text: 'Once the paper is out, click a spot to measure it. Each one you click is recorded in the table.'}],
      reset: s => { s.time = 0; s.run = false; s.out = false; s.sel = null; },
      step(s, dt) { if (s.run) s.time += dt * 6; if (s.run && front(s) > 9.1) { s.run = false; s.out = true; } },
      draw(c, s) {
        D.wall(c, s.W, s.H);
        const f = front(s), fy = BASE - f * PX, inB = !s.out;
        if (inB) { D.rect(c, 130, 360, 460, 70, 'rgba(150,200,240,.35)'); c.strokeStyle = '#5d7083'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(130, 60); c.lineTo(130, 430); c.lineTo(590, 430); c.lineTo(590, 60); c.stroke(); D.rect(c, 120, 52, 480, 8, '#9fb3c8', null, 0, 3); }
        D.rect(c, 160, 40, 400, 380, '#fffef8', '#c8c1a8', 1);
        if (s.time > 0) { c.fillStyle = 'rgba(160,200,235,.25)'; c.fillRect(161, fy, 398, 420 - fy - 1); }
        D.line(c, 165, BASE, 555, BASE, '#777', 1);
        D.text(c, 'baseline (pencil)', 165, BASE + 12, {size: 10, col: '#777'});
        if (s.time > 0) { c.setLineDash(s.out ? [] : [4, 3]); D.line(c, 165, fy, 555, fy, s.out ? '#555' : '#7aa7d6', 1.2); c.setLineDash([]); if (s.out) D.text(c, 'solvent front', 555, fy - 8, {size: 10, align: 'right', col: '#555'}); }
        LANES.forEach((L, k) => {
          D.text(c, L.n.split(' ')[0], lx(k), BASE + 26, {size: 13, bold: true, align: 'center', col: '#444'});
          L.spots.forEach(([rf, col], j) => {
            const y = BASE - rf * f * PX, spread = 1 + rf * f * .12;
            c.save(); c.globalAlpha = .85; c.fillStyle = col; c.beginPath(); c.ellipse(lx(k), y, 9 * spread, 6 * spread, 0, 0, 7); c.fill(); c.restore();
            if (s.sel && s.sel[0] === k && s.sel[1] === j) {
              D.line(c, lx(k) + 18, BASE, lx(k) + 18, y, '#c0392b', 1.5); D.line(c, lx(k) + 14, y, lx(k) + 22, y, '#c0392b', 1.5);
              D.text(c, (rf * f).toFixed(1) + ' cm', lx(k) + 24, (BASE + y) / 2, {size: 11, bold: true, col: '#c0392b', bg: '#fff'});
            }
          });
        });
        if (s.out) {
          D.ruler(c, 570, fy - 2, (BASE - fy) + 4, PX, true, 0, false);
          D.text(c, `${f.toFixed(1)} cm`, 600, (fy + BASE) / 2, {size: 12, bold: true, col: '#1f7a6d', bg: '#fff'});
        }
        D.text(c, s.out ? 'Paper removed and dried.' : s.run ? 'Solvent soaking up the paper…' : 'Ready: inks spotted on a pencil baseline.', 20, 20, {size: 13, col: '#555'});
      },
      pointer(type, p, s, api) {
        if (!s.out) return 'default';
        const f = front(s); let hit = null;
        LANES.forEach((L, k) => L.spots.forEach(([rf], j) => { if (Math.hypot(p.x - lx(k), p.y - (BASE - rf * f * PX)) < 14) hit = [k, j]; }));
        if (type === 'down' && hit) { s.sel = hit; api.record(); }
        return hit ? 'pointer' : 'default';
      },
      readout: s => [['Solvent front', front(s).toFixed(1) + ' cm']],
      read(s) {
        if (!s.out || !s.sel) return 'Remove the paper and click on a spot to measure it.';
        const [k, j] = s.sel, f = front(s), [rf, col] = LANES[k].spots[j];
        const names = {'#222': 'black', '#2f5fd0': 'blue', '#e3b505': 'yellow', '#d0342c': 'red', '#2e9e4f': 'green'};
        return {lane: LANES[k].n, spot: names[col], d: +Math.max(0, roundTo(rf * f + gauss(.04), .1)).toFixed(1), sf: +f.toFixed(1)};
      }
    },
    table: {series: 'lane', seriesName: 'Ink', x: {k: 'spot', name: 'Spot colour'}, ys: [{k: 'd', name: 'Distance moved by spot', unit: 'cm', dp: 1}, {k: 'sf', name: 'Distance moved by solvent', unit: 'cm', dp: 1}],
      derived: [{k: 'rf', name: 'Rf', dp: 2, f: r => r.d / r.sf}]},
    graph: {bars: rows => ({bars: rows.map(r => ({label: r.lane.split(' ')[0] + ' ' + r.spot, value: +r.rf.toFixed(2), color: {black: '#555', blue: '#2f5fd0', yellow: '#e3b505', red: '#d0342c', green: '#2e9e4f'}[r.spot]})), xLabel: 'Spot', yLabel: 'Rf value'})},
    demo: [
      {say: 'Baseline drawn in pencil. Spots of the unknown ink X and known dyes A–D.', act: s => { s.time = 0; s.run = false; s.out = false; s.sel = null; }, wait: 2400},
      {say: 'Stand the paper in the solvent, which must be below the baseline. Put a lid on.', act: s => s.run = true, wait: 5200},
      {say: 'Remove the paper before the solvent reaches the top, and mark the solvent front.', act: s => { s.run = false; s.out = true; }, wait: 2200},
      {say: 'Measure each spot from the baseline to its centre. X’s blue spot…', set: {sel: [0, 1]}, record: true, wait: 1600},
      {say: '…and its yellow spot.', set: {sel: [0, 2]}, record: true, wait: 1400},
      {say: 'Dye A: same Rf as X’s blue spot.', set: {sel: [1, 0]}, record: true, wait: 1400},
      {say: 'Dye C: same Rf as X’s yellow spot.', set: {sel: [3, 0]}, record: true, wait: 1400},
      {say: 'So X contains dyes A and C, plus a black substance that is insoluble in water (it stayed on the baseline).', set: {sel: [0, 0]}, record: true, wait: 3500}
    ],
    questions: [
      {num: () => .75, tol: .01, q: 'A spot moves 6.0 cm while the solvent moves 8.0 cm. Calculate its Rf value.', a: 'Rf = 6.0 ÷ 8.0 = 0.75 (no units).'},
      {num: () => 3.75, tol: .02, unit: 'cm', q: 'In a repeat run the solvent moves 7.5 cm. How far will a spot with Rf = 0.50 move?', a: 'Distance = Rf × solvent distance = 0.50 × 7.5 = 3.75 cm (about 3.8 cm).'},
      {q: 'Why is the baseline drawn in pencil, not ink?', a: 'Pencil (graphite) is insoluble in the solvent, so it will not move up the paper and mix with the spots. Ink would dissolve and run.'},
      {q: 'Why must the solvent level be below the baseline?', a: 'Otherwise the spots would dissolve straight into the solvent in the beaker instead of moving up the paper.'},
      {q: 'Two dyes have the same Rf value. Does that prove they are the same substance? How could you be more sure?', a: 'Not on its own: different substances can have the same Rf in one solvent. Run the chromatogram again in a different solvent. If they still match, they are very likely the same.'}
    ],
    sources: [SRC.sme('https://cognito.org/courses/gcse/chemistry-triple/ocra/higher/notes/WWljWkpJWWQ/7.1-paper-chromatography-rf-values', 'Cognito notes: Rf values'), SRC.bite('paper chromatography rf value'), SRC.cog('chromatography')]
  });
})();

/* 2. Catalysts and hydrogen peroxide - as in the specimen core paper */
(() => {
  const CAT = {MnO2: {n: 'Manganese(IV) oxide', k: .05, col: '#222'}, PbO: {n: 'Lead(II) oxide', k: .02, col: '#d9a520'}, CuO: {n: 'Copper(II) oxide', k: .009, col: '#1b1b1b'}, Fe2O3: {n: 'Iron(III) oxide', k: .0045, col: '#8b2c13'}, liver: {n: 'Liver (catalase)', k: .035, col: '#6d1a1a'}, none: {n: 'No catalyst', k: .0004, col: null}};
  const VMAX = 60, vol = (cat, t) => VMAX * (1 - Math.exp(-CAT[cat].k * t));
  practical({
    id: 'catalysts', subject: 'chemistry', specimen: true, title: 'Catalysts and hydrogen peroxide', syllabus: 'C4 Chemical reactions · rates and catalysts',
    short: 'Compare metal oxide catalysts by collecting oxygen from hydrogen peroxide. This is the experiment in the specimen core paper.',
    aim: 'Find out which metal oxide is the best catalyst for the decomposition of hydrogen peroxide: 2H₂O₂ → 2H₂O + O₂',
    apparatus: ['Conical (side-arm) flask with a bung and delivery tube', 'Upturned measuring cylinder full of water in a water trough, or a gas syringe', 'Hydrogen peroxide solution', 'Metal oxide powders: manganese(IV) oxide, copper(II) oxide, lead(II) oxide, iron(III) oxide', 'Top-pan balance and stopwatch'],
    variables: {iv: 'The type of catalyst', dv: 'Volume of oxygen collected (cm³) over time', cv: ['Volume and concentration of hydrogen peroxide', 'Mass of catalyst (for example 0.5 g)', 'Particle size of the powder (all fine powders)', 'Temperature']},
    method: [
      'Fill a measuring cylinder with water and turn it upside down in a trough of water, with no air at the top. Clamp it. (Or use a gas syringe.)',
      'Measure 25 cm³ of hydrogen peroxide into the conical flask.',
      'Weigh 0.5 g of the catalyst. Add it, put the bung in quickly and start the stopwatch.',
      'Read the volume of gas collected every 20 seconds for 3 minutes.',
      'Repeat with each catalyst, and with no catalyst as a control.',
      'Plot volume of oxygen against time for each catalyst on the same axes. The steepest curve shows the fastest reaction.'
    ],
    safety: ['Hydrogen peroxide is an irritant (corrosive at higher concentrations): wear eye protection and gloves.', 'Lead(II) oxide is toxic: avoid making dust, and wash your hands.', 'Do not seal a flask that is giving off gas without a delivery tube, as pressure builds up. This is also why peroxide bottles have a small vent in the lid.'],
    tips: ['A catalyst speeds up a reaction without being used up. Show this by filtering, drying and re-weighing it afterwards: the mass is the same.', 'Rate = gradient of the volume–time graph. Steepest at the start, where the concentration of peroxide is highest. The graph levels off when the peroxide is used up.', 'Every curve finishes at the same final volume, because the same amount of peroxide was used. Catalysts change the rate, not the amount of product.', 'Another method without collecting gas: put the flask on a balance and record the loss in mass as oxygen escapes.', 'Catalase in liver is an enzyme, a biological catalyst.'],
    sim: {
      w: 720, h: 440,
      init: () => ({cat: 'MnO2', app: 'cyl', time: 0, run: false, next: 0, bub: []}),
      controls: [
        {type: 'select', key: 'cat', label: 'Catalyst (0.5 g)', options: Object.entries(CAT).map(([k, v]) => [k, v.n]), change: s => { s.time = 0; s.run = false; }},
        {type: 'select', key: 'app', label: 'Gas collection', options: [['cyl', 'Upturned measuring cylinder'], ['syr', 'Gas syringe']]},
        {type: 'buttons', items: [{label: '▶ Add catalyst and start', primary: true, act: s => { s.time = 0; s.next = 0; s.run = true; }}, {label: '■ Stop', act: s => s.run = false}]},
        {type: 'note', text: 'Once you start, a reading is taken automatically every 20 s (a partner calling out the time). Time runs 10 × faster than real life.'}
      ],
      reset: s => { s.time = 0; s.run = false; },
      step(s, dt, api) {
        if (s.run) {
          s.time += dt * 10;
          if (s.time >= s.next) { api.record(); s.next += 20; }
          if (s.time >= 180) s.run = false;
          const rate = VMAX * CAT[s.cat].k * Math.exp(-CAT[s.cat].k * s.time);
          if (Math.random() < rate * dt * 6) s.bub.push({x: rnd(110, 190), y: 365, r: rnd(2, 4), ph: rnd(0, 99)});
          if (s.app === 'cyl' && Math.random() < rate * dt * 4) s.bub.push({x: rnd(452, 468), y: 392, r: rnd(2, 4), ph: rnd(0, 99), cyl: 1});
        }
        const surf = 140 + 240 * vol(s.cat, s.time) / 100;
        s.bub = s.bub.filter(b => { b.y -= (b.cyl ? 70 : 40) * dt; return b.cyl ? b.y > surf : b.y > 300; });
      },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 405);
        const V = s.run || s.time ? vol(s.cat, s.time) : 0;
        // conical flask
        c.fillStyle = 'rgba(200,225,245,.55)'; c.beginPath(); c.moveTo(105, 330); c.lineTo(195, 330); c.lineTo(225, 402); c.lineTo(75, 402); c.closePath(); c.fill();
        if (CAT[s.cat].col) {
          if (s.run || s.time) { c.fillStyle = CAT[s.cat].col; c.beginPath(); c.ellipse(150, 402, 30, 9, 0, Math.PI, 0); c.fill(); }
          else { D.rect(c, 242, 394, 62, 9, '#efe9d8', '#999', 1, 3); c.fillStyle = CAT[s.cat].col; c.beginPath(); c.ellipse(273, 395, 20, 8, 0, Math.PI, 0); c.fill(); D.text(c, '0.5 g weighed', 273, 375, {size: 10, align: 'center', col: '#444'}); }
        }
        c.strokeStyle = '#5d7083'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(130, 250); c.lineTo(130, 300); c.lineTo(72, 404); c.lineTo(228, 404); c.lineTo(170, 300); c.lineTo(170, 250); c.stroke();
        D.rect(c, 126, 236, 48, 18, '#b5651d', null, 0, 3);
        D.bubbles(c, s.bub.filter(b => !b.cyl));
        D.text(c, 'H₂O₂(aq)', 150, 420, {size: 11, align: 'center', col: '#444'});
        if (s.app === 'cyl') {
          c.strokeStyle = '#6a7d90'; c.lineWidth = 4; c.beginPath(); c.moveTo(150, 236); c.lineTo(150, 200); c.lineTo(400, 200); c.lineTo(400, 395); c.lineTo(455, 395); c.lineTo(455, 380); c.stroke();
          D.rect(c, 370, 330, 200, 75, 'rgba(120,180,230,.45)'); c.strokeStyle = '#5d7083'; c.lineWidth = 2; c.beginPath(); c.moveTo(370, 300); c.lineTo(370, 405); c.lineTo(570, 405); c.lineTo(570, 300); c.stroke();
          const top = 140, bot = 380, hgt = bot - top, gas = V / 100 * hgt;
          D.rect(c, 440, top + gas, 40, hgt - gas, 'rgba(120,180,230,.5)');
          D.rect(c, 440, top, 40, hgt, null, '#5d7083', 2);
          for (let v = 0; v <= 100; v += 5) { const y = top + v / 100 * hgt; D.line(c, 440, y, 440 + (v % 10 ? 6 : 12), y, '#334', 1); if (v % 20 === 0) D.text(c, String(v), 486, y, {size: 9}); }
          D.text(c, 'cm³', 486, top - 10, {size: 9});
          D.bubbles(c, s.bub.filter(b => b.cyl));
          D.text(c, 'water trough', 470, 420, {size: 11, align: 'center', col: '#444'});
        } else {
          c.strokeStyle = '#6a7d90'; c.lineWidth = 4; c.beginPath(); c.moveTo(150, 236); c.lineTo(150, 200); c.lineTo(300, 200); c.stroke();
          D.rect(c, 300, 186, 260, 28, 'rgba(230,240,250,.6)', '#5d7083', 2, 4);
          const px = 304 + V / 100 * 250; D.rect(c, px, 188, 6, 24, '#8899aa'); D.rect(c, px + 6, 197, 140, 6, '#aab4be');
          for (let v = 0; v <= 100; v += 10) D.line(c, 304 + v * 2.5, 186, 304 + v * 2.5, 194, '#334', 1);
          D.text(c, 'gas syringe (0–100 cm³)', 430, 236, {size: 11, align: 'center', col: '#444'});
        }
        D.rect(c, 560, 20, 140, 74, '#fff', '#c9d2dc', 1, 10);
        D.text(c, '⏱ ' + Math.floor(s.time) + ' s', 574, 42, {size: 16, bold: true});
        D.text(c, 'O₂: ' + V.toFixed(0) + ' cm³', 574, 72, {size: 16, bold: true, col: '#1f7a6d'});
      },
      readout: s => [['Catalyst', CAT[s.cat].n], ['Time', Math.floor(s.time) + ' s'], ['Volume', vol(s.cat, s.time).toFixed(0) + ' cm³']],
      read(s) {
        if (!s.run && !s.time) return 'Start the reaction first.';
        const t = Math.round(s.time / 20) * 20, slip = Math.random() < .05 ? -6 : 0;
        return {cat: CAT[s.cat].n, t, V: Math.max(0, Math.round(vol(s.cat, t) + gauss(.6) + slip))};
      },
      recordMsg: () => 'Reading taken.'
    },
    table: {series: 'cat', seriesName: 'Catalyst', x: {k: 't', name: 'Time', unit: 's', dp: 0}, ys: [{k: 'V', name: 'Volume of oxygen', unit: 'cm³', dp: 0}]},
    graph: {x: 't', y: ['V'], fit: 'curve', model: (x, name) => { const k = Object.keys(CAT).find(k => CAT[k].n === name); return vol(k || 'MnO2', x); }, xLabel: 'Time / s', yLabel: 'Volume of oxygen / cm³', xmin: 0, ymin: 0, xmax: 180, anomTol: () => 3.5},
    demo: [
      {say: 'Measuring cylinder full of water, upside down in the trough. 25 cm³ of hydrogen peroxide in the flask.', set: {cat: 'MnO2', app: 'cyl', time: 0, run: false}, wait: 2600},
      {say: 'Add 0.5 g of manganese(IV) oxide, put the bung in and start timing. Readings every 20 s.', set: {next: 0, run: true}, wait: 19000},
      {say: 'Now copper(II) oxide, with everything else kept the same: a much slower reaction.', set: {cat: 'CuO', time: 0, next: 0, run: true}, wait: 19000},
      {say: 'Manganese(IV) oxide gives the steepest curve, so it is the best catalyst. Both curves would end at the same volume.', wait: 3500}
    ],
    questions: [
      {q: 'State the independent and dependent variables.', a: 'Independent: the type of catalyst (metal oxide). Dependent: the volume of oxygen collected in a set time (or the rate of oxygen production).'},
      {q: 'How could you show that the catalyst was not used up?', a: 'Weigh the catalyst before the reaction. Afterwards, filter it off, wash and dry it and weigh it again: the mass is unchanged. It would also speed up a fresh batch of peroxide.'},
      {q: 'Suggest a method that does not involve collecting the oxygen.', a: 'Stand the flask (with a cotton-wool plug) on a top-pan balance and record the loss of mass over time as oxygen escapes.'},
      {q: 'Why do all the curves level off at the same volume?', a: 'The same amount of hydrogen peroxide was used each time, so the same total amount of oxygen forms. The catalyst only changes how fast it is made.'},
      {q: 'Suggest a reason for an anomalous low reading.', a: 'Gas escaping because the bung was not put in quickly enough or a joint leaked, misreading the scale, or a reading taken late or early.'}
    ],
    sources: [SRC.sme('https://www.savemyexams.com/igcse/chemistry/edexcel/19/revision-notes/3-physical-chemistry/3-2-rates-of-reaction/3-2-6-practical-effect-of-catalysts-on-rate-of-reaction/', 'Save My Exams: effect of catalysts'), SRC.bite('rate of reaction catalyst hydrogen peroxide'), SRC.cog('rates of reaction required practical')]
  });
})();

/* 3. Diffusion */
(() => {
  const spreadTime = T => 30 * Math.exp(-(T - 20) / 28); // minutes to reach the beaker sides
  practical({
    id: 'diffusion', subject: 'chemistry', title: 'Diffusion in liquids and gases', syllabus: 'C1 Particle model · diffusion',
    short: 'A purple crystal spreading through water at different temperatures, and the ammonia–hydrogen chloride tube.',
    aim: 'Investigate how temperature affects the rate of diffusion, and compare how fast two gases diffuse.',
    apparatus: ['Beakers of water at different temperatures', 'Potassium manganate(VII) crystals and tweezers', 'Stopwatch', 'Long glass tube, cotton wool soaked in ammonia and in hydrochloric acid (teacher demonstration, in a fume cupboard)'],
    variables: {iv: 'Temperature of the water (°C)', dv: 'Time for the colour to spread to the sides of the beaker', cv: ['Same size of crystal', 'Same volume of water and the same beaker', 'Do not stir or knock the beaker']},
    method: [
      'Fill a beaker with water at a measured temperature and let it settle.',
      'Gently drop one small crystal of potassium manganate(VII) into the centre with tweezers. Start the stopwatch.',
      'Do not stir. Stop timing when the purple colour reaches the sides of the beaker.',
      'Repeat at different temperatures, using crystals of the same size.'
    ],
    safety: ['Potassium manganate(VII) is an oxidiser and stains skin: use tweezers.', 'Ammonia and hydrogen chloride gases are toxic and corrosive: teacher demonstration in a fume cupboard only.'],
    tips: ['Diffusion: the net movement of particles from where they are in high concentration to where they are in low concentration, because of their random motion.', 'Higher temperature → particles have more kinetic energy and move faster → faster diffusion.', 'Diffusion is fastest in gases, slower in liquids, and almost none happens in solids.', 'In the tube, the white ring of ammonium chloride forms nearer the hydrochloric acid end. Ammonia particles are lighter (Mr 17 compared with 36.5), so they move faster and travel further.'],
    sim: {
      w: 720, h: 440,
      init: () => ({mode: 'kmno4', T: 20, time: 0, run: false, parts: null}),
      controls: [
        {type: 'select', key: 'mode', label: 'Experiment', options: [['kmno4', 'Crystal in water'], ['gas', 'Ammonia + hydrogen chloride tube']], change: s => { s.time = 0; s.run = false; s.parts = null; }},
        {type: 'range', key: 'T', label: 'Water temperature', min: 5, max: 70, step: 5, unit: '°C', change: s => { s.time = 0; s.run = false; }},
        {type: 'buttons', items: [{label: '▶ Start', primary: true, act: s => { s.time = 0; s.run = true; s.parts = null; }}]}
      ],
      reset: s => { s.time = 0; s.run = false; s.parts = null; },
      step(s, dt, api) {
        if (!s.run) return;
        if (s.mode === 'kmno4') { s.time += dt * 3; if (s.time >= spreadTime(s.T)) { s.time = spreadTime(s.T); s.run = false; api.say(`The colour reached the sides after ${s.time.toFixed(1)} minutes. Press “Record reading”.`, false, 6000); } }
        else {
          s.time += dt; if (!s.parts) { s.parts = []; for (let i = 0; i < 260; i++) s.parts.push({x: 80, y: 220 + rnd(-14, 14), a: i % 2 ? 'N' : 'H'}); s.parts.forEach(p => { if (p.a === 'H') p.x = 640; }); s.ring = null; }
          for (const p of s.parts) { if (p.stuck) continue; const v = p.a === 'N' ? 1 : .68; p.x += gauss(1) * 9 * v + (p.a === 'N' ? 2.2 : -1.5) * v * dt * 30 * .1; p.y = clamp(p.y + gauss(1) * 2, 206, 234); p.x = clamp(p.x, 80, 640); }
          if (!s.ring) { const n = s.parts.filter(p => p.a === 'N'), hh = s.parts.filter(p => p.a === 'H'); const fN = Math.max(...n.map(p => p.x)), fH = Math.min(...hh.map(p => p.x)); if (fN >= fH) s.ring = (fN + fH) / 2; }
          if (s.time > 14) s.run = false;
        }
      },
      draw(c, s) {
        D.wall(c, s.W, s.H);
        if (s.mode === 'kmno4') {
          D.bench(c, s.W, s.H, 400);
          const cx = 360, f = s.run || s.time ? clamp(s.time / spreadTime(s.T), 0, 1) : 0;
          D.rect(c, 210, 140, 300, 258, 'rgba(150,200,240,.25)');
          const g = c.createRadialGradient(cx, 390, 4, cx, 390, 20 + f * 300);
          g.addColorStop(0, 'rgba(110,0,120,.85)'); g.addColorStop(.5, `rgba(150,40,160,${.5 * (1 - f * .4)})`); g.addColorStop(1, 'rgba(160,60,180,0)');
          c.save(); c.beginPath(); c.rect(212, 140, 296, 256); c.clip(); c.fillStyle = g; c.fillRect(200, 100, 320, 300); c.restore();
          D.circle(c, cx, 392, 5, '#4b0050');
          D.beaker(c, 210, 120, 300, 280, 0);
          D.thermometer(c, 470, 70, 250, s.T, 0, 100);
          D.text(c, s.T + ' °C', 490, 80, {size: 14, bold: true});
          D.rect(c, 20, 20, 180, 60, '#fff', '#c9d2dc', 1, 10);
          D.text(c, '⏱ ' + s.time.toFixed(1) + ' min', 34, 50, {size: 18, bold: true, col: '#1f7a6d'});
        } else {
          c.fillStyle = '#eef3f7'; c.fillRect(0, 0, s.W, s.H);
          D.rect(c, 60, 200, 600, 40, 'rgba(255,255,255,.7)', '#5d7083', 2, 20);
          D.rect(c, 62, 202, 22, 36, '#f4f4f4', '#aaa', 1, 8); D.rect(c, 636, 202, 22, 36, '#f4f4f4', '#aaa', 1, 8);
          D.text(c, 'cotton wool + ammonia', 70, 260, {size: 12}); D.text(c, 'cotton wool + hydrochloric acid', 650, 260, {size: 12, align: 'right'});
          if (s.parts) for (const p of s.parts) D.circle(c, p.x, p.y, p.a === 'N' ? 2.2 : 2.8, p.a === 'N' ? '#2f6fb8' : '#c0392b');
          if (s.ring) { D.rect(c, s.ring - 8, 202, 16, 36, 'rgba(255,255,255,.95)', '#999', 1, 4); D.arrow(c, s.ring, 170, s.ring, 196, '#333', 2); D.text(c, 'white ring of ammonium chloride', s.ring, 160, {size: 13, bold: true, align: 'center'});
            D.text(c, `${((s.ring - 80) / 560 * 100).toFixed(0)} cm from the ammonia end of a 100 cm tube`, 360, 300, {size: 13, align: 'center', col: '#1f7a6d', bold: true}); }
          D.text(c, 'NH₃(g) + HCl(g) → NH₄Cl(s)', 360, 340, {size: 15, align: 'center'});
          D.text(c, 'blue = ammonia (Mr 17, faster), red = hydrogen chloride (Mr 36.5, slower)', 360, 370, {size: 12, align: 'center', col: '#555'});
        }
      },
      readout: s => s.mode === 'kmno4' ? [['Temperature', s.T + ' °C'], ['Time', s.time.toFixed(1) + ' min']] : [['Experiment', 'Gas tube (demonstration)']],
      read(s) {
        if (s.mode !== 'kmno4') return 'The gas tube is a demonstration. Switch to “Crystal in water” to take readings.';
        if (s.run || s.time < spreadTime(s.T) - .01) return 'Wait until the colour has reached the sides of the beaker.';
        return {T: s.T, time: +(spreadTime(s.T) * (1 + gauss(.03))).toFixed(1)};
      }
    },
    table: {x: {k: 'T', name: 'Temperature', unit: '°C', dp: 0}, ys: [{k: 'time', name: 'Time to spread', unit: 'min', dp: 1}]},
    graph: {x: 'T', y: ['time'], fit: 'curve', model: x => spreadTime(x), xLabel: 'Temperature / °C', yLabel: 'Time to spread / min', xmin: 0, ymin: 0, anomTol: e => e * .12},
    demo: [
      {say: 'Cold water, 10 °C. Drop the crystal in gently and start timing.', set: {mode: 'kmno4', T: 10}, act: s => { s.time = 0; s.run = true; }, wait: 13500, record: true},
      {say: 'Warm water, 50 °C: the particles move faster, so the colour spreads faster.', set: {T: 50}, act: s => { s.time = 0; s.run = true; }, wait: 4500, record: true},
      {say: 'Ammonia and hydrogen chloride diffuse towards each other along the tube…', set: {mode: 'gas'}, act: s => { s.time = 0; s.run = true; s.parts = null; }, wait: 9000},
      {say: 'The ring forms nearer the HCl end because the lighter ammonia particles move faster.', wait: 3500}
    ],
    questions: [
      {q: 'Explain, using the particle model, why the colour spreads faster in hot water.', a: 'At a higher temperature the water and manganate particles have more kinetic energy and move faster, so they mix more quickly by random motion.'},
      {q: 'Why does the white ring form closer to the hydrochloric acid end?', a: 'Ammonia molecules are lighter (smaller Mr) than hydrogen chloride molecules, so at the same temperature they move faster and diffuse further in the same time.'},
      {q: 'Why does diffusion happen faster in gases than in liquids?', a: 'Gas particles are far apart and move quickly with few collisions in the way. Liquid particles are close together, so each particle collides very often and spreads out more slowly.'}
    ],
    sources: [SRC.bite('diffusion particles ks3'), SRC.cog('diffusion'), SRC.pmt]
  });
})();

/* 4. Separating rock salt */
(() => {
  const STEPS = ['Grind the rock salt with a pestle and mortar', 'Add warm water and stir to dissolve the salt', 'Filter: sand stays in the filter paper (residue), salt solution passes through (filtrate)', 'Evaporate: heat the filtrate in an evaporating basin until crystals start to form', 'Leave to crystallise and dry, then weigh the salt'];
  practical({
    id: 'rock-salt', subject: 'chemistry', title: 'Purifying rock salt (filtration and evaporation)', syllabus: 'C3 Separating mixtures',
    short: 'Step through dissolving, filtering and evaporating, then work out the percentage of salt in rock salt.',
    aim: 'Get pure salt from rock salt (salt mixed with sand and grit) and find the percentage of salt in it.',
    apparatus: ['Rock salt, pestle and mortar', 'Beaker, warm water, stirring rod', 'Filter funnel, filter paper, conical flask', 'Evaporating basin, tripod, gauze, Bunsen burner', 'Top-pan balance'],
    variables: {iv: '(A separation, so not a fair test)', dv: 'Mass of pure salt obtained (g)', cv: ['Start with a known mass of rock salt', 'Use enough water to dissolve all the salt']},
    method: STEPS,
    safety: ['Wear eye protection: hot salt can spit when the last water evaporates. Stop heating when crystals start to appear and let the rest evaporate slowly.', 'Let the evaporating basin cool before handling it.'],
    tips: ['Salt is soluble in water; sand is insoluble. That difference is what makes the separation work.', 'Filtration separates an insoluble solid from a liquid. Evaporation gets a dissolved solid back out of its solution.', 'Crystallisation (slow evaporation) gives bigger, purer crystals than heating to dryness.', 'Percentage of salt = mass of salt ÷ mass of rock salt × 100.', 'Why grind? A larger surface area, so the salt dissolves faster. Why warm water? Salt dissolves faster in it.'],
    sim: {
      w: 720, h: 440,
      init: () => ({step: 0, p: 0, salt: null}),
      controls: [{type: 'buttons', items: [{label: '◀ Back', act: s => { s.step = Math.max(0, s.step - 1); s.p = 0; }}, {label: 'Next step ▶', primary: true, act: s => { s.step = Math.min(4, s.step + 1); s.p = 0; if (s.step === 4) s.salt = +(20 * .72 + gauss(.25)).toFixed(2); }}]}],
      reset: s => { s.step = 0; s.p = 0; s.salt = null; },
      step(s, dt) { s.p = Math.min(1, s.p + dt / 3); },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 400);
        D.text(c, `Step ${s.step + 1} of 5: ${STEPS[s.step]}`, 20, 26, {size: 14, bold: true});
        const p = s.p;
        if (s.step === 0) {
          c.fillStyle = '#e5e1d8'; c.beginPath(); c.moveTo(270, 300); c.quadraticCurveTo(360, 420, 450, 300); c.closePath(); c.fill(); c.strokeStyle = '#999'; c.stroke();
          for (let i = 0; i < 40; i++) { const sz = lerp(9, 3, p) * (.6 + (i % 3) * .3); D.rect(c, 300 + (i * 37) % 120, 315 + (i * 13) % 30, sz, sz, i % 4 ? '#f0ece4' : '#b59a6a', '#aaa', .5); }
          c.save(); c.translate(380, 250); c.rotate(-.6 + Math.sin(s.t * 6) * .2); D.rect(c, -8, -90, 16, 110, '#ccc', '#888', 1, 8); c.restore();
        } else if (s.step === 1) {
          D.beaker(c, 290, 180, 140, 200, .6, `rgba(150,200,240,${.4 + p * .1})`);
          for (let i = 0; i < 30; i++) { const salt = i % 3; if (salt && p > .5) continue; D.rect(c, 300 + (i * 29) % 120, 372 - (i % 4) * 3 - (salt ? (1 - p) * 0 : 0), 5, 5, salt ? '#f5f3ee' : '#a08560'); }
          c.save(); c.translate(360, 260); c.rotate(Math.sin(s.t * 4) * .3); D.rect(c, -3, -110, 6, 220, '#e5ecf2', '#9ab', 1, 3); c.restore();
          D.text(c, p > .5 ? 'Salt dissolved; sand did not.' : 'Stirring…', 360, 160, {size: 13, align: 'center', col: '#1f7a6d', bold: true});
        } else if (s.step === 2) {
          c.fillStyle = 'rgba(150,200,240,.4)'; c.beginPath(); c.moveTo(285, 140); c.lineTo(435, 140); c.lineTo(370, 230); c.lineTo(350, 230); c.closePath(); c.fill();
          c.strokeStyle = '#5d7083'; c.lineWidth = 2; c.beginPath(); c.moveTo(275, 130); c.lineTo(352, 235); c.lineTo(352, 290); c.moveTo(445, 130); c.lineTo(368, 235); c.lineTo(368, 290); c.stroke();
          c.strokeStyle = '#ddd'; c.beginPath(); c.moveTo(285, 135); c.lineTo(360, 230); c.lineTo(435, 135); c.stroke();
          for (let i = 0; i < 18; i++) D.rect(c, 338 + (i * 7) % 40, 214 - Math.floor(i / 6) * 5, 4, 4, '#a08560');
          for (let i = 0; i < 3; i++) D.circle(c, 360, 295 + ((s.t * 80 + i * 30) % 70), 3, 'rgba(120,180,230,.9)');
          c.fillStyle = 'rgba(150,200,240,.4)'; c.fillRect(320, 400 - 40 * p, 80, 40 * p);
          c.strokeStyle = '#5d7083'; c.beginPath(); c.moveTo(340, 290); c.lineTo(340, 320); c.lineTo(290, 400); c.lineTo(430, 400); c.lineTo(380, 320); c.lineTo(380, 290); c.stroke();
          D.text(c, 'residue: sand', 460, 210, {size: 12, bold: true}); D.arrow(c, 455, 210, 380, 212, '#333', 1.5, 7);
          D.text(c, 'filtrate: salt solution', 450, 380, {size: 12, bold: true});
        } else if (s.step === 3) {
          D.tripod(c, 360, 400, 300); D.rect(c, 320, 296, 80, 4, '#999');
          D.bunsen(c, 360, 400, true, s.t);
          c.fillStyle = '#f2f2f2'; c.beginPath(); c.ellipse(360, 285, 52, 16, 0, 0, Math.PI); c.fill(); c.strokeStyle = '#888'; c.stroke();
          c.fillStyle = `rgba(150,200,240,${.5 * (1 - p)})`; c.beginPath(); c.ellipse(360, 285, 46 * (1 - p * .5), 7, 0, 0, 7); c.fill();
          for (let i = 0; i < p * 20; i++) D.rect(c, 330 + (i * 13) % 60, 286 - (i % 3) * 2, 4, 4, '#fff', '#bbb', .5);
          for (let i = 0; i < 6; i++) { const y = 260 - ((s.t * 40 + i * 25) % 120); c.fillStyle = `rgba(200,210,220,${.4 * (1 - p * .7)})`; c.beginPath(); c.arc(340 + i * 8 + Math.sin(y * .05) * 6, y, 6, 0, 7); c.fill(); }
          D.text(c, 'Stop heating when crystals first appear, and let the rest evaporate slowly.', 360, 150, {size: 13, align: 'center', bold: true, col: '#c0392b'});
        } else {
          D.rect(c, 260, 330, 200, 50, '#e9edf1', '#8a96a3', 1.5, 6); D.rect(c, 280, 318, 160, 12, '#cdd4db', '#8a96a3', 1, 3);
          for (let i = 0; i < 40; i++) D.rect(c, 310 + (i * 17) % 100, 304 - (i % 4) * 4, 6, 6, '#fff', '#bbb', .5);
          D.rect(c, 330, 345, 110, 26, '#0f2a1f', null, 0, 3); D.text(c, s.salt.toFixed(2) + ' g', 432, 358, {size: 15, bold: true, col: '#5cffb1', align: 'right'});
          D.text(c, `Rock salt used: 20.00 g · Pure salt: ${s.salt.toFixed(2)} g`, 360, 170, {size: 14, align: 'center'});
          D.text(c, `Percentage of salt = ${s.salt.toFixed(2)} ÷ 20.00 × 100 = ${(s.salt / 20 * 100).toFixed(1)}%`, 360, 200, {size: 14, align: 'center', bold: true, col: '#1f7a6d'});
        }
      },
      readout: s => [['Step', s.step + 1 + ' / 5']],
      read(s) { if (s.step < 4) return 'Finish all the steps first.'; const r = {start: 20, salt: s.salt}; s.salt = +(20 * .72 + gauss(.25)).toFixed(2); return r; },
      recordMsg: () => 'Recorded. Record again for a repeat with a fresh sample.'
    },
    table: {noRepeats: true, x: {k: 'start', name: 'Mass of rock salt', unit: 'g', dp: 2}, sort: false, ys: [{k: 'salt', name: 'Mass of pure salt', unit: 'g', dp: 2}], derived: [{k: 'pc', name: 'Percentage of salt', unit: '%', dp: 1, f: r => r.salt / r.start * 100}]},
    demo: [0, 1, 2, 3, 4].map(k => ({say: STEPS[k], set: {step: k, p: 0}, act: s => { if (k === 4) s.salt = +(20 * .72 + gauss(.2)).toFixed(2); }, wait: 3300, record: k === 4})),
    questions: [
      {num: () => 72, tol: .5, unit: '%', q: 'From 25.0 g of rock salt a student gets 18.0 g of pure salt. What percentage of the rock salt is salt?', a: '18.0 ÷ 25.0 × 100 = 72%.'},
      {q: 'Give two reasons why the mass of salt obtained might be lower than expected.', a: 'Some salt solution stays soaked in the filter paper or sand (wash the residue with a little water), some salt spits out of the basin while heating, or not all the salt dissolved.'},
      {q: 'Why is filtration alone not enough to get the salt?', a: 'Filtration only removes the insoluble sand. The salt is dissolved in the filtrate, so the water must then be evaporated to get the salt back.'},
      {q: 'How could you check that the salt you made is pure?', a: 'Pure substances melt at a sharp, fixed temperature (sodium chloride melts at 801 °C). An impure sample melts over a range of temperatures.'}
    ],
    sources: [SRC.bite('separating rock salt filtration evaporation'), SRC.cog('separating mixtures filtration crystallisation'), SRC.pmt]
  });
})();

/* 5. Distillation */
(() => {
  const temp = (mix, t) => {
    if (mix === 'salt') return Math.min(100, 20 + 80 * (1 - Math.exp(-t / 70)) * 1.08);
    if (t < 150) return Math.min(78, 20 + 58 * (1 - Math.exp(-t / 45)) * 1.08);
    if (t < 330) return 78 + (t - 150) / 180 * 3;
    return Math.min(100, 81 + 19 * (1 - Math.exp(-(t - 330) / 40)) * 1.1);
  };
  const distil = (mix, t) => { const T = temp(mix, t); return T >= (mix === 'salt' ? 99.5 : 77.5); };
  practical({
    id: 'distillation', subject: 'chemistry', title: 'Simple and fractional distillation', syllabus: 'C3 Separating mixtures',
    short: 'Boil salty water or an ethanol–water mixture, watch the thermometer and collect the distillate.',
    aim: 'Get pure water from salty water, and see how the temperature changes while a mixture of liquids distils.',
    apparatus: ['Round-bottomed flask with anti-bumping granules', 'Thermometer with its bulb level with the side arm', 'Liebig condenser: cold water in at the bottom, out at the top', 'Heat source (Bunsen, or a heating mantle for ethanol), and a beaker to collect the distillate'],
    variables: {iv: 'Time of heating (s)', dv: 'Temperature at the top of the flask (°C)', cv: ['Same heating rate', 'Thermometer bulb kept level with the side arm']},
    method: [
      'Put the mixture in the flask with a few anti-bumping granules. Fit the thermometer so its bulb is level with the side arm.',
      'Connect the condenser: cold water goes in at the bottom and out at the top, so the condenser stays full and cold.',
      'Heat gently. Record the temperature every 30 seconds.',
      'Vapour rises, passes into the condenser, cools and condenses back into a liquid (the distillate), which drips into the beaker.',
      'Plot temperature against time. Flat sections show a pure substance boiling.'
    ],
    safety: ['Ethanol is highly flammable: use a heating mantle or water bath, not a flame.', 'Never heat a sealed apparatus. Use anti-bumping granules for smooth boiling.'],
    tips: ['Distillation works because the substances have different boiling points.', 'Salty water: the water boils off at 100 °C and condenses; the salt stays in the flask.', 'Ethanol (78 °C) and water (100 °C): the ethanol distils first, and the temperature stays near 78 °C. A fractionating column improves the separation (fractional distillation).', 'A pure liquid boils at one fixed temperature. Impurities raise the boiling point and make it boil over a range.'],
    sim: {
      w: 720, h: 440,
      init: () => ({mix: 'salt', time: 0, run: false, next: 0, coll: 0, drips: []}),
      controls: [
        {type: 'select', key: 'mix', label: 'Mixture', options: [['salt', 'Salty water'], ['eth', 'Ethanol and water']], change: s => { s.time = 0; s.run = false; s.coll = 0; }},
        {type: 'buttons', items: [{label: '🔥 Heat', primary: true, act: s => { s.time = 0; s.next = 0; s.run = true; s.coll = 0; }}, {label: '■ Stop', act: s => s.run = false}]},
        {type: 'note', text: 'A reading is taken automatically every 30 s. Time runs 15 × faster than real life.'}
      ],
      reset: s => { s.time = 0; s.run = false; s.coll = 0; },
      step(s, dt, api) {
        if (!s.run) return;
        s.time += dt * 15; if (s.time >= s.next) { api.record(); s.next += 30; }
        if (s.time > 480) s.run = false;
        if (distil(s.mix, s.time)) { s.coll = Math.min(1, s.coll + dt * .05); if (Math.random() < dt * 4) s.drips.push({y: 266}); }
        s.drips = s.drips.filter(d => (d.y += 120 * dt) < 370);
      },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 410);
        const T = s.time || s.run ? temp(s.mix, s.time) : 20, boiling = T > (s.mix === 'salt' ? 99 : 77);
        D.stand(c, 60, 410, 360, 90, 130);
        D.bunsen(c, 150, 410, s.run && s.mix === 'salt', s.t);
        if (s.mix === 'eth') { D.rect(c, 95, 330, 110, 70, s.run ? '#b0533c' : '#6b5048', '#444', 1.5, 12); D.text(c, 'heating mantle', 150, 402, {size: 10, align: 'center', col: '#fff'}); }
        c.fillStyle = s.mix === 'salt' ? 'rgba(150,200,240,.5)' : 'rgba(180,215,240,.5)'; c.beginPath(); c.arc(150, 300, 48, .2, Math.PI - .2); c.fill();
        if (boiling) for (let i = 0; i < 8; i++) D.circle(c, 120 + (i * 9), 330 - ((s.t * 50 + i * 13) % 30), 2.5, '#fff', '#8ab', .6);
        c.strokeStyle = '#5d7083'; c.lineWidth = 2; c.beginPath(); c.arc(150, 300, 50, -Math.PI / 2 + .25, -Math.PI / 2 - .25 + Math.PI * 2); c.stroke();
        D.rect(c, 138, 140, 24, 112, 'rgba(255,255,255,.4)', '#5d7083', 2);
        D.rect(c, 136, 130, 28, 12, '#b5651d', null, 0, 2);
        D.thermometer(c, 150, 70, 110, T, 0, 110);
        D.text(c, T.toFixed(1) + ' °C', 172, 92, {size: 15, bold: true, col: '#c0392b', bg: '#fff'});
        c.save(); c.translate(162, 170); c.rotate(.28);
        D.rect(c, 0, -5, 330, 10, 'rgba(255,255,255,.5)', '#5d7083', 1.5);
        D.rect(c, 40, -18, 240, 36, 'rgba(150,200,240,.35)', '#5d7083', 2, 6);
        D.rect(c, 250, 18, 10, 18, '#7a8a99'); D.rect(c, 60, -36, 10, 18, '#7a8a99');
        if (boiling) for (let i = 0; i < 5; i++) D.circle(c, ((s.t * 70 + i * 66) % 320), 0, 2.5, 'rgba(255,255,255,.95)', '#9ab', .6);
        c.restore();
        D.text(c, 'cold water in', 420, 300, {size: 11}); D.arrow(c, 430, 290, 420, 268, '#2f6fb8', 1.8, 7);
        D.text(c, 'water out', 210, 128, {size: 11}); D.arrow(c, 230, 140, 238, 118, '#2f6fb8', 1.8, 7);
        D.text(c, 'Liebig condenser', 330, 168, {size: 11, col: '#444'});
        for (const d of s.drips) D.circle(c, 482, d.y, 3, 'rgba(120,180,230,.95)');
        D.beaker(c, 445, 330, 80, 75, s.coll * .7, s.mix === 'salt' ? 'rgba(150,200,240,.5)' : 'rgba(200,225,245,.6)', 'distillate');
        D.rect(c, 560, 20, 140, 70, '#fff', '#c9d2dc', 1, 10);
        D.text(c, '⏱ ' + Math.floor(s.time) + ' s', 574, 42, {size: 15, bold: true});
        D.text(c, boiling ? (s.mix === 'eth' && s.time < 330 ? 'ethanol distilling' : 'water distilling') : 'heating…', 574, 70, {size: 12, col: '#1f7a6d', bold: true});
      },
      readout: s => [['Temperature', temp(s.mix, s.time).toFixed(1) + ' °C'], ['Time', Math.floor(s.time) + ' s']],
      read(s) { if (!s.run && !s.time) return 'Start heating first.'; const t = Math.round(s.time / 30) * 30; return {mix: s.mix === 'salt' ? 'Salty water' : 'Ethanol and water', t, T: +(temp(s.mix, t) + gauss(.25)).toFixed(1)}; },
      recordMsg: () => 'Temperature recorded.'
    },
    table: {series: 'mix', seriesName: 'Mixture', x: {k: 't', name: 'Time', unit: 's', dp: 0}, ys: [{k: 'T', name: 'Temperature', unit: '°C', dp: 1}]},
    graph: {x: 't', y: ['T'], fit: 'curve', model: (x, name) => temp(name.startsWith('Salty') ? 'salt' : 'eth', x), xLabel: 'Time / s', yLabel: 'Temperature / °C', xmin: 0, ymin: 0, anomTol: () => 2},
    demo: [
      {say: 'Salty water. The thermometer bulb is level with the side arm, where it measures the vapour going into the condenser.', set: {mix: 'salt'}, act: s => { s.time = 0; s.next = 0; s.run = true; s.coll = 0; }, wait: 12000},
      {say: 'Flat at 100 °C: pure water is boiling off. The salt stays behind.', wait: 9000},
      {say: 'Now ethanol and water: the temperature levels off near 78 °C while the ethanol distils, then rises to 100 °C.', set: {mix: 'eth'}, act: s => { s.time = 0; s.next = 0; s.run = true; s.coll = 0; }, wait: 30000}
    ],
    questions: [
      {q: 'Why does the cooling water enter the condenser at the bottom?', a: 'So that the condenser fills completely with cold water (no air pocket at the top), which cools the vapour most effectively.'},
      {q: 'Why must the thermometer bulb be level with the side arm?', a: 'To measure the temperature of the vapour that is actually going into the condenser. That tells you which substance is distilling.'},
      {q: 'Explain the flat part of the temperature–time graph.', a: 'While a pure substance boils, the energy supplied is used to break the forces between particles (change of state), not to raise the temperature. So it stays at the boiling point.'},
      {q: 'Ethanol boils at 78 °C and water at 100 °C. Which is collected first, and why?', a: 'Ethanol, because it has the lower boiling point, so it turns into vapour first.'}
    ],
    sources: [SRC.bite('simple distillation fractional distillation'), SRC.cog('distillation'), SRC.pmt]
  });
})();

/* 6. Neutralisation and pH */
(() => {
  const pH = V => { const nOH = 2.5 - .1 * V, tot = (25 + V) / 1000, x = nOH / 1000 / tot, H = (-x + Math.sqrt(x * x + 4e-14)) / 2; return -Math.log10(H); };
  const UI = [[1, [220, 30, 40]], [3, [240, 110, 30]], [5, [240, 200, 40]], [7, [60, 170, 70]], [9, [30, 140, 150]], [11, [40, 70, 190]], [13, [100, 40, 140]]];
  const uiColour = p => { p = clamp(p, 1, 13); for (let i = 1; i < UI.length; i++) if (p <= UI[i][0]) { const t = (p - UI[i - 1][0]) / 2, a = UI[i - 1][1], b = UI[i][1]; return `rgb(${a.map((v, k) => Math.round(lerp(v, b[k], t))).join(',')})`; } return 'rgb(100,40,140)'; };
  practical({
    id: 'neutralisation', subject: 'chemistry', title: 'Neutralisation and the pH scale', syllabus: 'C4 Acids, alkalis and indicators',
    short: 'Add acid from a burette to an alkali with universal indicator and plot the pH curve.',
    aim: 'Find the volume of hydrochloric acid needed to neutralise 25 cm³ of sodium hydroxide, and see how the pH changes.',
    apparatus: ['Burette containing 0.10 mol/dm³ hydrochloric acid', 'Pipette and filler to measure 25.0 cm³ of 0.10 mol/dm³ sodium hydroxide', 'Conical flask on a white tile', 'Universal indicator or a pH probe'],
    variables: {iv: 'Volume of acid added (cm³)', dv: 'pH of the mixture', cv: ['Concentration of acid and alkali', 'Volume of alkali (25.0 cm³)', 'Swirl after every addition']},
    method: [
      'Use a pipette to put 25.0 cm³ of sodium hydroxide into a conical flask. Add a few drops of universal indicator (or put in a pH probe).',
      'Fill the burette with acid and read the starting volume at eye level, from the bottom of the meniscus.',
      'Add the acid 2 cm³ at a time, swirling, and record the pH each time.',
      'Near the end point, add the acid drop by drop. The end point is when the solution turns green (pH 7).',
      'Plot pH against volume of acid added.'
    ],
    safety: ['Sodium hydroxide is corrosive, even when dilute: wear eye protection.', 'Fill the burette below eye level, using a funnel that you then remove.'],
    tips: ['acid + alkali → salt + water. Hydrochloric acid + sodium hydroxide → sodium chloride + water.', 'acid + metal → salt + hydrogen (a squeaky pop with a lighted splint).', 'pH 0–6 acidic (red/orange/yellow), 7 neutral (green), 8–14 alkaline (blue/purple) with universal indicator.', 'Metal oxides are basic (they neutralise acids). Non-metal oxides (CO₂, SO₂) dissolve to form acidic solutions. Sulfur dioxide and nitrogen oxides cause acid rain, which damages limestone buildings, lakes and trees.', 'The pH changes very sharply near the end point: one drop can change it by several pH units.'],
    sim: {
      w: 720, h: 440,
      init: () => ({V: 0, drip: 0}),
      controls: [{type: 'buttons', items: [
        {label: '+ 2 cm³', primary: true, act: s => { s.V = Math.min(50, +(s.V + 2).toFixed(2)); s.drip = 1; }},
        {label: '+ 0.5 cm³', act: s => { s.V = Math.min(50, +(s.V + .5).toFixed(2)); s.drip = 1; }},
        {label: '+ 1 drop', act: s => { s.V = Math.min(50, +(s.V + .05).toFixed(2)); s.drip = 1; }},
        {label: 'Empty and refill', act: s => { s.V = 0; }}]}],
      reset: s => { s.V = 0; },
      step(s, dt) { s.drip = Math.max(0, s.drip - dt * 1.5); },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 410);
        D.stand(c, 230, 410, 380, 120, 120);
        const bx = 340, top = 40, bh = 260, lev = s.V / 50;
        D.rect(c, bx - 9, top + lev * (bh - 10) + 4, 18, (bh - 10) * (1 - lev), 'rgba(230,240,255,.85)');
        D.rect(c, bx - 9, top, 18, bh, null, '#5d7083', 2, 3);
        for (let v = 0; v <= 50; v += 1) { const y = top + 4 + v / 50 * (bh - 10); D.line(c, bx - 9, y, bx - 9 + (v % 5 ? 4 : 9), y, '#334', .8); if (v % 10 === 0) D.text(c, String(v), bx + 12, y, {size: 9}); }
        D.rect(c, bx - 3, top + bh, 6, 22, '#9fb3c8'); D.rect(c, bx - 10, top + bh + 6, 20, 6, '#2d3640', null, 0, 2);
        if (s.drip > 0) D.circle(c, bx, top + bh + 30 + (1 - s.drip) * 45, 3, 'rgba(180,200,230,.9)');
        const p = pH(s.V), col = uiColour(p);
        c.fillStyle = col; c.globalAlpha = .75; c.beginPath(); c.moveTo(310, 360); c.lineTo(370, 360); c.lineTo(395, 405); c.lineTo(285, 405); c.closePath(); c.fill(); c.globalAlpha = 1;
        c.strokeStyle = '#5d7083'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(325, 320); c.lineTo(325, 345); c.lineTo(280, 407); c.lineTo(400, 407); c.lineTo(355, 345); c.lineTo(355, 320); c.stroke();
        D.rect(c, 260, 407, 160, 3, '#fff');
        D.text(c, 'burette: HCl', bx + 30, top + 10, {size: 11, col: '#444'});
        // pH scale
        for (let k = 0; k <= 14; k++) { D.rect(c, 470 + k * 15, 340, 15, 26, uiColour(k)); D.text(c, String(k), 477 + k * 15, 376, {size: 9, align: 'center'}); }
        D.arrow(c, 477 + clamp(p, 0, 14) * 15, 318, 477 + clamp(p, 0, 14) * 15, 336, '#222', 2, 7);
        D.text(c, 'universal indicator', 582, 394, {size: 11, align: 'center', col: '#555'});
        D.rect(c, 470, 40, 226, 110, '#fff', '#c9d2dc', 1, 10);
        D.text(c, `Acid added: ${s.V.toFixed(2)} cm³`, 484, 62, {size: 13});
        D.text(c, `pH ${p.toFixed(1)}`, 484, 94, {size: 24, bold: true, col: '#1f7a6d'});
        D.text(c, p < 6.5 ? 'acidic' : p > 7.5 ? 'alkaline' : 'neutral: end point!', 484, 126, {size: 14, bold: true, col: p > 6.5 && p < 7.5 ? '#2e8b57' : '#555'});
      },
      readout: s => [['Volume', s.V.toFixed(2) + ' cm³'], ['pH', pH(s.V).toFixed(1)]],
      read: s => ({V: +s.V.toFixed(2), pH: +(pH(s.V) + gauss(.04)).toFixed(1)})
    },
    table: {x: {k: 'V', name: 'Volume of acid added', unit: 'cm³', dp: 2}, ys: [{k: 'pH', name: 'pH', dp: 1}]},
    graph: {x: 'V', y: ['pH'], fit: 'curve', model: x => pH(x), xLabel: 'Volume of hydrochloric acid added / cm³', yLabel: 'pH', xmin: 0, ymin: 0, ymax: 14, anomTol: () => .6},
    demo: [
      {say: '25.0 cm³ of sodium hydroxide with universal indicator: purple, about pH 13.', set: {V: 0}, record: true, wait: 2200},
      ...[4, 8, 12, 16, 20, 22, 24].map(V => ({say: `${V} cm³ of acid added: still alkaline.`, set: {V, drip: 1}, record: true, wait: 900})),
      {say: 'Near the end point, add drop by drop…', set: {V: 24.6, drip: 1}, record: true, wait: 1400},
      {say: 'Green: neutral at 25.0 cm³. Sodium chloride solution and water.', set: {V: 25, drip: 1}, record: true, wait: 2400},
      {say: 'One more drop past the end point and it is acidic: a very sharp change.', set: {V: 25.4, drip: 1}, record: true, wait: 1800},
      ...[28, 32, 40].map(V => ({say: 'Excess acid: pH levels off near 2.', set: {V, drip: 1}, record: true, wait: 900}))
    ],
    questions: [
      {q: 'Write a word equation for the reaction in the flask.', a: 'hydrochloric acid + sodium hydroxide → sodium chloride + water.'},
      {q: 'Name the salt formed when sulfuric acid reacts with magnesium, and the gas given off.', a: 'Magnesium sulfate, and hydrogen (it burns with a squeaky pop).'},
      {q: 'Why does the pH change so suddenly near 25 cm³?', a: 'Near the end point almost all of the alkali has been used up, so even a drop of extra acid leaves an excess of hydrogen ions in solution, and the pH scale is logarithmic.'},
      {q: 'A farmer’s soil is too acidic. What could be added, and why?', a: 'Lime (calcium hydroxide or calcium oxide), a base, which neutralises the acid in the soil.'}
    ],
    sources: [SRC.bite('neutralisation ph scale indicator'), SRC.cog('neutralisation titration'), SRC.pmt]
  });
})();

/* 7. Solubility curve */
(() => {
  const DATA = [[0, 13.3], [10, 20.9], [20, 31.6], [30, 45.8], [40, 63.9], [50, 85.5], [60, 110], [70, 138], [80, 169], [90, 202], [100, 246]];
  const sol = T => { for (let i = 1; i < DATA.length; i++) if (T <= DATA[i][0]) return lerp(DATA[i - 1][1], DATA[i][1], (T - DATA[i - 1][0]) / 10); return 246; };
  const crystT = S => { for (let i = 1; i < DATA.length; i++) if (S <= DATA[i][1]) return lerp(DATA[i - 1][0], DATA[i][0], (S - DATA[i - 1][1]) / (DATA[i][1] - DATA[i - 1][1])); return 100; };
  practical({
    id: 'solubility', subject: 'chemistry', title: 'Solubility curve of potassium nitrate', syllabus: 'C3 Solubility and saturated solutions',
    short: 'Dissolve potassium nitrate in hot water, let it cool, and note when crystals appear.',
    aim: 'Find how the solubility of potassium nitrate changes with temperature.',
    apparatus: ['Boiling tube containing 10 cm³ (10 g) of water', 'Potassium nitrate and a balance', 'Hot water bath (beaker of hot water)', 'Thermometer'],
    variables: {iv: 'Mass of potassium nitrate in 10 g of water', dv: 'Temperature at which crystals first appear (°C)', cv: ['Volume of water (10 cm³)', 'Stir gently and keep the thermometer in the solution', 'Look against a dark background to spot the first crystals']},
    method: [
      'Weigh 4.0 g of potassium nitrate into a boiling tube with 10 cm³ of water.',
      'Warm the tube in a hot water bath, stirring with the thermometer, until all the solid dissolves.',
      'Take the tube out and let it cool, stirring gently. Record the temperature at which crystals first appear: the solution is saturated at that temperature.',
      'Add another 2.0 g of potassium nitrate and repeat, up to 14 g.',
      'Solubility (g per 100 g of water) = mass dissolved × 10. Plot solubility against temperature.'
    ],
    safety: ['Hot water can scald: handle boiling tubes with a holder.', 'Potassium nitrate is an oxidiser: keep it away from flames and anything flammable.'],
    tips: ['A saturated solution contains the maximum mass of solute that can dissolve at that temperature.', 'Most solids get more soluble as the temperature rises, so cooling a hot saturated solution makes crystals form.', 'Read a solubility curve: mass that crystallises out = solubility at the high temperature − solubility at the low temperature (for 100 g of water).', 'Solubility depends on the solvent: for example, iodine barely dissolves in water but dissolves well in ethanol.'],
    sim: {
      w: 720, h: 440,
      init: () => ({m: 4, T: 20, phase: 'solid', xt: crystT(40)}),
      controls: [
        {type: 'range', key: 'm', label: 'Potassium nitrate in 10 g of water', min: 4, max: 14, step: 2, unit: 'g', change: s => { s.phase = 'solid'; s.T = 20; }},
        {type: 'buttons', items: [{label: '🔥 Heat in water bath', primary: true, act: s => { s.phase = 'heating'; s.xt = crystT(s.m * 10) + gauss(.5); }}, {label: '❄ Take out and cool', act: (s, api) => { if (s.phase !== 'dissolved') { api.say('Heat it until it has all dissolved first.', true); return; } s.phase = 'cooling'; }}]}
      ],
      reset: s => { s.phase = 'solid'; s.T = 20; },
      step(s, dt, api) {
        const need = crystT(s.m * 10);
        if (s.phase === 'heating') { s.T = Math.min(95, s.T + dt * 14); if (s.T > need + 6) { s.phase = 'dissolved'; api.say('All dissolved. Now let it cool and watch for the first crystals.'); } }
        if (s.phase === 'cooling') { s.T = Math.max(15, s.T - dt * 4.5); if (s.T <= s.xt) { s.phase = 'crystals'; api.say(`Crystals appeared at ${s.T.toFixed(0)} °C. Record it.`, false, 6000); } }
      },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 410);
        if (s.phase === 'heating') { D.beaker(c, 180, 210, 180, 195, .8, 'rgba(240,160,120,.35)', 'hot water bath'); }
        D.testTube(c, 270, 120, 40, 250, .4, 'rgba(160,210,240,.55)');
        const solid = s.phase === 'solid' || s.phase === 'heating' ? (s.phase === 'heating' ? clamp(1 - (s.T - 20) / (crystT(s.m * 10) + 6 - 20), 0, 1) : 1) : s.phase === 'crystals' ? clamp((s.xt - s.T + 2) / 12, .1, .6) : 0;
        for (let i = 0; i < 40 * solid; i++) D.rect(c, 256 + (i * 7) % 26 + (s.phase === 'crystals' ? Math.sin(i) * 3 : 0), 352 - Math.floor(i / 4) * 3 - (s.phase === 'crystals' ? (i * 13) % 60 : 0), 4, s.phase === 'crystals' ? 9 : 4, '#fff', '#99a', .6);
        D.thermometer(c, 285, 90, 250, s.T, 0, 100);
        D.text(c, s.T.toFixed(1) + ' °C', 312, 110, {size: 16, bold: true, col: '#c0392b', bg: '#fff'});
        D.rect(c, 440, 40, 260, 120, '#fff', '#c9d2dc', 1, 10);
        D.text(c, `${s.m} g potassium nitrate in 10 g water`, 454, 62, {size: 13});
        D.text(c, `= ${s.m * 10} g per 100 g of water`, 454, 86, {size: 13, bold: true});
        D.text(c, {solid: 'Not dissolved yet', heating: 'Heating…', dissolved: 'All dissolved', cooling: 'Cooling: watch for crystals', crystals: 'Crystals forming: saturated!'}[s.phase], 454, 120, {size: 14, bold: true, col: '#1f7a6d'});
        // mini solubility curve
        const gx = 440, gy = 390, gw = 260, gh = 200;
        D.line(c, gx, gy, gx + gw, gy, '#333', 1.2); D.line(c, gx, gy, gx, gy - gh, '#333', 1.2);
        c.strokeStyle = '#ccd'; c.lineWidth = 1.5; c.beginPath(); DATA.forEach(([T, S], i) => { const x = gx + T / 100 * gw, y = gy - S / 250 * gh; i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke();
        D.circle(c, gx + s.T / 100 * gw, gy - s.m * 10 / 250 * gh, 4, '#c0392b');
        D.text(c, 'temperature →', gx + gw, gy + 12, {size: 10, align: 'right', col: '#666'}); D.text(c, 'solubility ↑', gx + 4, gy - gh - 8, {size: 10, col: '#666'});
      },
      readout: s => [['Temperature', s.T.toFixed(1) + ' °C'], ['Solubility tested', s.m * 10 + ' g/100 g water']],
      read(s) { if (s.phase !== 'crystals') return 'Wait until crystals first appear while cooling.'; return {m: s.m, T: +s.T.toFixed(0)}; }
    },
    table: {x: {k: 'm', name: 'Mass of KNO₃ in 10 g water', unit: 'g', dp: 1}, ys: [{k: 'T', name: 'Temperature crystals appear', unit: '°C', dp: 0}], derived: [{k: 'S', name: 'Solubility', unit: 'g per 100 g water', dp: 0, f: r => r.m * 10}]},
    graph: {x: 'T', xf: r => r.T, yf: r => r.m * 10, y: ['S'], fit: 'curve', model: x => sol(x), curveFrom: 10, xLabel: 'Temperature / °C', yLabel: 'Solubility / g per 100 g of water', xmin: 0, ymin: 0, xmax: 100, anomTol: e => 8},
    demo: [4, 6, 8, 10, 12, 14].flatMap(m => [
      {say: `${m} g in 10 g of water. Heat in the water bath until it has all dissolved…`, set: {m, T: 20, phase: 'heating'}, act: s => s.xt = crystT(m * 10) + gauss(.4), wait: 2600},
      {say: 'Cool, stirring gently, and note when the first crystals appear.', set: {phase: 'cooling'}, wait: 1800},
      {act: s => { s.T = s.xt; s.phase = 'crystals'; }, say: 'Crystals! The solution is saturated at this temperature.', wait: 1300, record: true}
    ]),
    questions: [
      {num: () => 64, tol: 3, unit: 'g', q: '100 g of water saturated with potassium nitrate at 60 °C (110 g dissolved) is cooled to 30 °C, where the solubility is about 46 g per 100 g. What mass of crystals forms?', a: '110 − 46 = 64 g crystallises out, because only 46 g can stay dissolved at 30 °C.'},
      {q: 'What is meant by a saturated solution?', a: 'A solution containing the maximum mass of solute that can dissolve in that amount of solvent at that temperature. Any more solid just stays undissolved.'},
      {q: 'Describe how the solubility of potassium nitrate changes with temperature.', a: 'It increases as temperature increases, and faster and faster: the curve gets steeper at higher temperatures.'}
    ],
    sources: [SRC.bite('solubility curve saturated solution'), SRC.cog('solubility curves'), SRC.pmt]
  });
})();

/* 8. Mass changes on heating: magnesium and copper carbonate */
(() => {
  const CRU = 22.5;
  const M = {
    mg: {n: 'Magnesium (in a crucible)', m0: .24, m1: .40, tau: 50},
    cu: {n: 'Copper carbonate', m0: 1.24, m1: .80, tau: 45}
  };
  const mass = (k, t) => M[k].m1 + (M[k].m0 - M[k].m1) * Math.exp(-t / M[k].tau);
  practical({
    id: 'heating-mass', subject: 'chemistry', title: 'Heating: oxidation and thermal decomposition', syllabus: 'C4 Combustion, oxidation, thermal decomposition, conservation of mass',
    short: 'Magnesium gains mass when it burns; copper carbonate loses mass when it decomposes. Heat to constant mass.',
    aim: 'Measure the mass change when magnesium is heated in air and when copper carbonate is heated, and explain each one using conservation of mass.',
    apparatus: ['Crucible and lid, pipe-clay triangle, tripod, Bunsen burner, tongs', 'Magnesium ribbon (cleaned with emery paper)', 'Copper(II) carbonate in a boiling tube with a delivery tube into limewater', 'Balance reading to 0.01 g'],
    variables: {iv: 'Heating time (s)', dv: 'Mass of the contents (g)', cv: ['Same starting mass', 'Same strength of flame', 'Weigh the crucible or tube with its lid each time']},
    method: [
      'Weigh the empty crucible and lid. Add the coiled magnesium ribbon and weigh again.',
      'Heat strongly, lifting the lid now and then with tongs to let air in but keep the white powder (magnesium oxide) from escaping.',
      'Cool and weigh. Heat again, cool, and reweigh until the mass stops changing (heat to constant mass), so the reaction is complete.',
      'For copper carbonate: weigh the tube, heat it and bubble the gas through limewater. The green powder turns black and the limewater turns milky (carbon dioxide).',
      'Remove the delivery tube from the limewater before you stop heating, to prevent suck-back.'
    ],
    safety: ['Do not look directly at burning magnesium: the white light can damage your eyes.', 'The crucible is very hot: use tongs and let it cool on a heatproof mat.', 'Prevent suck-back: take the delivery tube out of the limewater before turning off the Bunsen.'],
    tips: ['Oxidation: a substance gains oxygen. magnesium + oxygen → magnesium oxide. The mass goes up because oxygen atoms from the air join on.', 'Thermal decomposition: one substance breaks down into two or more when heated. copper carbonate → copper oxide + carbon dioxide. The mass goes down because the gas escapes.', 'Conservation of mass: no atoms are created or destroyed. Total mass of reactants = total mass of products. In a sealed container the mass would not change.', 'Combustion is burning in oxygen: a fuel + oxygen → oxides (for example carbon dioxide and water), releasing energy.', 'Limewater test: carbon dioxide turns limewater milky (cloudy).'],
    sim: {
      w: 720, h: 440,
      init: () => ({k: 'mg', time: 0, heat: false, lid: false}),
      controls: [
        {type: 'select', key: 'k', label: 'Substance', options: [['mg', 'Magnesium ribbon'], ['cu', 'Copper carbonate']], change: s => { s.time = 0; s.heat = false; }},
        {type: 'buttons', items: [{label: '🔥 Heat / stop heating', primary: true, act: s => s.heat = !s.heat}, {label: 'Lift lid', act: s => s.lid = !s.lid}, {label: 'Start again', act: s => { s.time = 0; s.heat = false; }}]},
        {type: 'note', text: 'Press “Record reading” to weigh at any time. Keep heating and weighing until the mass stops changing.'}
      ],
      reset: s => { s.time = 0; s.heat = false; },
      step(s, dt) { if (s.heat) s.time += dt * 12; },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 410);
        const f = 1 - (mass(s.k, s.time) - M[s.k].m1) / (M[s.k].m0 - M[s.k].m1);
        if (s.k === 'mg') {
          D.tripod(c, 260, 410, 290); D.bunsen(c, 260, 410, s.heat, s.t);
          c.fillStyle = '#d9d4cc'; c.beginPath(); c.moveTo(225, 230); c.lineTo(295, 230); c.lineTo(282, 288); c.lineTo(238, 288); c.closePath(); c.fill(); c.strokeStyle = '#888'; c.stroke();
          if (s.heat && f < .97 && s.lid) { const g = c.createRadialGradient(260, 250, 2, 260, 250, 90); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.beginPath(); c.arc(260, 250, 90, 0, 7); c.fill(); }
          c.strokeStyle = `rgb(${Math.round(lerp(150, 245, f))},${Math.round(lerp(155, 245, f))},${Math.round(lerp(165, 240, f))})`; c.lineWidth = 3; c.beginPath(); for (let a = 0; a < 18; a += .3) c.lineTo(260 + Math.cos(a) * (6 + a), 270 + Math.sin(a) * 4); c.stroke();
          c.save(); c.translate(260, s.lid ? 205 : 228); c.rotate(s.lid ? -.4 : 0); D.rect(c, -42, -4, 84, 7, '#cfc9bf', '#888', 1, 3); c.restore();
          D.text(c, 'magnesium + oxygen → magnesium oxide', 260, 120, {size: 14, bold: true, align: 'center'});
          D.text(c, 'mass increases: oxygen from the air is added', 260, 144, {size: 12, align: 'center', col: '#555'});
        } else {
          D.stand(c, 120, 410, 330, 120, 200);
          D.bunsen(c, 230, 410, s.heat, s.t);
          c.save(); c.translate(230, 205); c.rotate(-1.35); D.testTube(c, 0, 0, 30, 150, 0, null); c.restore();
          const g = Math.round(lerp(0, 1, f) * 100) / 100;
          c.fillStyle = `rgb(${Math.round(lerp(60, 30, g))},${Math.round(lerp(160, 30, g))},${Math.round(lerp(110, 30, g))})`; c.beginPath(); c.ellipse(330, 215, 34, 9, -.22, 0, 7); c.fill();
          c.strokeStyle = '#6a7d90'; c.lineWidth = 4; c.beginPath(); c.moveTo(225, 205); c.lineTo(190, 200); c.lineTo(190, 160); c.lineTo(520, 160); c.lineTo(520, 370); c.stroke();
          D.testTube(c, 520, 280, 40, 120, .7, `rgba(${230},${230},${230},${.3 + f * .6})`);
          if (s.heat && f < .97) for (let i = 0; i < 4; i++) D.circle(c, 520 + Math.sin(i + s.t * 3) * 6, 390 - ((s.t * 60 + i * 20) % 70), 3, '#fff', '#99a', .7);
          D.text(c, 'limewater', 560, 360, {size: 11, col: '#444'});
          D.text(c, f > .5 ? 'turns milky: carbon dioxide!' : '', 560, 380, {size: 11, bold: true, col: '#1f7a6d'});
          D.text(c, 'copper carbonate → copper oxide + carbon dioxide', 360, 80, {size: 14, bold: true, align: 'center'});
          D.text(c, 'green → black · mass decreases because CO₂ escapes', 360, 104, {size: 12, align: 'center', col: '#555'});
        }
        D.rect(c, 560, 20, 140, 72, '#fff', '#c9d2dc', 1, 10);
        D.text(c, 'Heated: ' + Math.floor(s.time) + ' s', 574, 40, {size: 13});
        D.text(c, mass(s.k, s.time).toFixed(2) + ' g', 574, 70, {size: 19, bold: true, col: '#1f7a6d'});
      },
      readout: s => [['Contents', mass(s.k, s.time).toFixed(2) + ' g'], ['Container', CRU.toFixed(2) + ' g'], ['Balance reads', (CRU + mass(s.k, s.time)).toFixed(2) + ' g']],
      read: s => ({sub: M[s.k].n, t: Math.round(s.time / 5) * 5, m: +(mass(s.k, s.time) + gauss(.004)).toFixed(2)})
    },
    table: {series: 'sub', seriesName: 'Substance', x: {k: 't', name: 'Heating time', unit: 's', dp: 0}, ys: [{k: 'm', name: 'Mass of contents', unit: 'g', dp: 2}]},
    graph: {x: 't', y: ['m'], fit: 'curve', model: (x, name) => mass(name.startsWith('Mag') ? 'mg' : 'cu', x), xLabel: 'Heating time / s', yLabel: 'Mass of contents / g', xmin: 0, ymin: 0, anomTol: () => .04},
    demo: [
      {say: 'Magnesium ribbon in a crucible: 0.24 g. Heat with the lid on, lifting it now and then.', set: {k: 'mg', time: 0, heat: false, lid: false}, record: true, wait: 2200},
      ...[1, 2, 3, 4, 5].map(i => ({say: i < 4 ? 'Heat, cool, weigh…' : 'Mass has stopped changing: constant mass reached.', act: s => { s.heat = false; s.time = i * 45; s.lid = i % 2 === 1; }, record: true, wait: 1300})),
      {say: 'Copper carbonate: weigh, then heat. The CO₂ turns the limewater milky.', set: {k: 'cu', time: 0, heat: false}, record: true, wait: 2200},
      ...[1, 2, 3, 4, 5].map(i => ({say: i < 4 ? 'Heating: green to black, and the mass falls.' : 'Constant mass: decomposition is complete.', act: s => { s.heat = i < 5; s.time = i * 45; }, record: true, wait: 1300}))
    ],
    questions: [
      {q: 'Why does the mass go up when magnesium is heated, but down when copper carbonate is heated?', a: 'Magnesium combines with oxygen from the air, so the product contains extra atoms (gains mass). Copper carbonate breaks down and gives off carbon dioxide gas, which escapes into the air (loses mass). In both cases mass is conserved overall.'},
      {num: () => .44, tol: .01, unit: 'g', q: '1.24 g of copper carbonate leaves 0.80 g of copper oxide. What mass of carbon dioxide was given off?', a: '1.24 − 0.80 = 0.44 g, by conservation of mass.'},
      {q: 'Why do you heat to constant mass?', a: 'To make sure the reaction is complete. If the mass is still changing, some reactant is left.'},
      {q: 'Why lift the crucible lid only a little, and only now and then?', a: 'To let oxygen in so the magnesium can burn, while stopping the white magnesium oxide smoke from escaping, which would make the final mass too low.'}
    ],
    sources: [SRC.bite('thermal decomposition copper carbonate'), SRC.bite('burning magnesium mass oxidation'), SRC.cog('conservation of mass')]
  });
})();
