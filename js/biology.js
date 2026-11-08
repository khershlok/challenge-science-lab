/* Biology practicals */
'use strict';

/* shared: count bubbles for one (sped-up) minute */
function bubbleCounter(rateFn) {
  return {
    start(s) { s.counting = true; s.clock = 0; s.count = 0; s.acc = 0; },
    step(s, dt, api, emit) {
      const r = rateFn(s) / 60; // bubbles per second of experiment time
      const speed = 10; // 1 real second = 10 s of experiment time
      s.acc += r * dt * speed * (0.6 + Math.random() * 0.8);
      while (s.acc >= 1) { s.acc -= 1; emit(); if (s.counting) s.count++; }
      if (s.counting) { s.clock += dt * speed; if (s.clock >= 60) { s.counting = false; s.clock = 60; s.done = true; api.say(`One minute up: ${s.count} bubbles. Press “Record reading”.`, false, 5000); } }
    }
  };
}

/* 1. Photosynthesis and light intensity */
(() => {
  const rate = d => 40 / (1 + (d / 9) ** 2);
  const BC = bubbleCounter(s => rate(s.d) * (s.co2 === 'high' ? 1 : .55));
  practical({
    id: 'photosynthesis', subject: 'biology', title: 'Photosynthesis: pondweed and light intensity', syllabus: 'B2 Photosynthesis',
    short: 'Move a lamp away from pondweed and count the oxygen bubbles per minute.',
    aim: 'Investigate how light intensity (distance from a lamp) affects the rate of photosynthesis in pondweed.',
    apparatus: ['Pondweed (Elodea or Cabomba) with the stem cut at an angle', 'Boiling tube of sodium hydrogencarbonate solution (supplies carbon dioxide)', 'Lamp and metre rule', 'Beaker of water as a heat shield (or use an LED, which stays cool)', 'Stopwatch'],
    variables: {iv: 'Distance of the lamp from the pondweed (cm), which changes the light intensity', dv: 'Number of oxygen bubbles per minute', cv: ['Temperature (heat shield / LED lamp)', 'Concentration of sodium hydrogencarbonate (carbon dioxide)', 'The same piece of pondweed', 'Background light: work in a darkened room']},
    method: [
      'Put the pondweed, cut end up, in a boiling tube of sodium hydrogencarbonate solution.',
      'Place the lamp 10 cm away, measured with a metre rule. Leave it for 5 minutes for the plant to adjust.',
      'Count the bubbles given off in one minute.',
      'Repeat twice more at this distance and work out the mean.',
      'Move the lamp to 20, 30, 40 and 50 cm and repeat.'
    ],
    safety: ['Lamps get hot. Keep water away from the mains plug and wires.', 'Wash your hands after handling pondweed.'],
    tips: ['photosynthesis: carbon dioxide + water → glucose + oxygen (using light energy, absorbed by chlorophyll in chloroplasts).', 'The bubbles are oxygen. They are made in the leaves and escape through the cut stem.', 'Closer lamp → more light → faster photosynthesis → more bubbles. At low intensities, light is the limiting factor.', 'Light intensity is inversely proportional to distance squared: halving the distance makes the light four times as intense.', 'Counting bubbles is imprecise because bubbles vary in size. Collecting the gas in a syringe or measuring cylinder is more accurate.', 'Almost all life depends on photosynthesis: it makes the food at the start of food chains and keeps oxygen and carbon dioxide levels in the air in balance.'],
    sim: {
      w: 720, h: 440,
      init: () => ({d: 10, co2: 'high', counting: false, clock: 0, count: 0, acc: 0, bub: [], done: false}),
      controls: [
        {type: 'range', key: 'd', label: 'Distance of lamp', min: 10, max: 50, step: 10, unit: 'cm', change: s => { s.counting = false; s.done = false; }},
        {type: 'select', key: 'co2', label: 'Sodium hydrogencarbonate (CO₂)', options: [['high', '1% (plenty of CO₂)'], ['low', '0.2% (less CO₂)']], change: s => { s.counting = false; s.done = false; }},
        {type: 'buttons', items: [{label: '⏱ Count bubbles for 1 minute', primary: true, act: s => BC.start(s)}]},
        {type: 'note', text: 'Time runs 10 × faster: a minute takes 6 seconds.'}
      ],
      step(s, dt, api) {
        BC.step(s, dt, api, () => s.bub.push({x: 520 + rnd(-3, 3), y: 214, r: rnd(2.5, 4.5), ph: rnd(0, 99)}));
        s.bub = stepBubbles(s.bub, dt, 120, 60);
      },
      draw(c, s) {
        c.fillStyle = '#d8dde3'; c.fillRect(0, 0, s.W, s.H); D.bench(c, s.W, s.H, 400);
        const lx = 520 - s.d * 9;
        D.lamp(c, lx - 40, 250, true, 1);
        D.rect(c, lx + 10, 210, 50, 110, 'rgba(150,200,240,.4)', '#7a8a99', 1.5, 4);
        D.text(c, 'heat shield', lx + 35, 330, {size: 10, align: 'center', col: '#444'});
        D.testTube(c, 520, 110, 46, 270, .92, 'rgba(160,210,235,.5)');
        c.strokeStyle = '#2f7d32'; c.lineWidth = 4; c.beginPath(); c.moveTo(520, 360); c.quadraticCurveTo(512, 290, 520, 216); c.stroke();
        for (let i = 0; i < 9; i++) { const y = 350 - i * 15; c.fillStyle = '#3f9a44'; c.beginPath(); c.ellipse(520 + (i % 2 ? 10 : -10), y, 11, 4, i % 2 ? .5 : -.5, 0, 7); c.fill(); }
        D.bubbles(c, s.bub);
        D.ruler(c, lx - 10, 395, 530 - lx, 9, false, 0, false);
        D.arrow(c, lx + 2, 384, 518, 384, '#c0392b', 1.5, 7); D.arrow(c, 518, 384, lx + 2, 384, '#c0392b', 1.5, 7);
        D.text(c, s.d + ' cm', (lx + 520) / 2, 372, {size: 13, bold: true, align: 'center', col: '#c0392b', bg: '#fff'});
        D.rect(c, 560, 20, 140, 80, '#fff', '#c9d2dc', 1, 10);
        D.text(c, '⏱ ' + Math.floor(s.clock) + ' s', 574, 42, {size: 15, bold: true});
        D.text(c, 'Bubbles: ' + s.count, 574, 74, {size: 17, bold: true, col: '#1f7a6d'});
        D.text(c, 'carbon dioxide + water → glucose + oxygen', 20, 30, {size: 14, bold: true});
        D.text(c, 'light energy, chlorophyll', 20, 50, {size: 11, col: '#555'});
      },
      readout: s => [['Distance', s.d + ' cm'], ['Relative light intensity (1/d²)', (10000 / s.d ** 2).toFixed(1)]],
      read(s) { if (!s.done || s.counting) return 'Count the bubbles for a full minute first.'; s.done = false; return {co2: s.co2 === 'high' ? '1% NaHCO₃' : '0.2% NaHCO₃', d: s.d, n: s.count}; }
    },
    table: {series: 'co2', seriesName: 'CO₂ supply', x: {k: 'd', name: 'Distance from lamp', unit: 'cm', dp: 0}, ys: [{k: 'n', name: 'Bubbles per minute', dp: 0}]},
    graph: {x: 'd', y: ['n'], fit: 'curve', model: (x, name) => rate(x) * (name.startsWith('1%') ? 1 : .55), xLabel: 'Distance of lamp from pondweed / cm', yLabel: 'Mean bubbles per minute', xmin: 0, ymin: 0, anomTol: e => Math.max(3, e * .35)},
    demo: [10, 20, 30, 40, 50].flatMap(d => [
      {say: `Lamp at ${d} cm. Leave it for 5 minutes to adjust, then count bubbles for 1 minute.`, set: {d, co2: 'high', done: false}, act: s => BC.start(s), wait: 6600},
      {say: 'Record the count.', record: true, wait: 700}
    ]).concat([{say: 'Fewer bubbles as the lamp moves away: less light, slower photosynthesis.', wait: 3000}]),
    questions: [
      {q: 'Why is a beaker of water (or an LED) placed between the lamp and the pondweed?', a: 'To stop the lamp heating the pondweed. Temperature also affects the rate of photosynthesis, so it must be kept constant: it is a control variable.'},
      {q: 'Why is sodium hydrogencarbonate added to the water?', a: 'It releases carbon dioxide, so carbon dioxide does not limit the rate of photosynthesis.'},
      {q: 'Suggest why the bubble count is not a very accurate measure of the rate.', a: 'Bubbles are different sizes and can be hard to count when they come fast. Some oxygen dissolves in the water. Collecting the gas and measuring its volume is better.'},
      {num: () => 4, tol: .01, q: 'The lamp is moved from 20 cm to 10 cm. By what factor does the light intensity increase?', a: 'Light intensity ∝ 1/d². Halving the distance gives 2² = 4 times the intensity.'}
    ],
    sources: [SRC.oak('https://www.thenational.academy/teachers/lessons/the-effect-of-light-intensity-on-rate-of-photosynthesis-in-pondweed-practical'), SRC.bite('photosynthesis pondweed light intensity practical'), SRC.cog('photosynthesis required practical')]
  });
})();

/* 2. Respiration in yeast */
(() => {
  const rate = T => T <= 37 ? 30 * Math.exp(-(((T - 37) / 15) ** 2)) : 30 * Math.max(0, 1 - ((T - 37) / 21) ** 2);
  const BC = bubbleCounter(s => rate(s.T));
  practical({
    id: 'yeast', subject: 'biology', title: 'Respiration in yeast and temperature', syllabus: 'B2 Cellular respiration · fermentation',
    short: 'Yeast and sugar in a water bath: count the carbon dioxide bubbles at different temperatures.',
    aim: 'Investigate how temperature affects the rate of anaerobic respiration (fermentation) in yeast.',
    apparatus: ['Yeast suspension in sugar (glucose) solution', 'Boiling tube with a bung and delivery tube', 'Test tube of limewater (or just water) for the bubbles to pass through', 'Water baths at different temperatures, thermometer, stopwatch'],
    variables: {iv: 'Temperature of the water bath (°C)', dv: 'Number of carbon dioxide bubbles per minute', cv: ['Volume and concentration of yeast and of sugar solution', 'Same apparatus', 'Leave 5 minutes to reach the temperature before counting']},
    method: [
      'Mix the yeast suspension with sugar solution in a boiling tube. Fit the bung and delivery tube, with the end under limewater.',
      'Stand the tube in a water bath at 20 °C for 5 minutes so it reaches the temperature.',
      'Count the bubbles in one minute. Repeat twice and find the mean.',
      'Repeat at 30, 40, 50 and 60 °C.',
      'The limewater turns milky, showing the gas is carbon dioxide.'
    ],
    safety: ['Take care with hot water baths.', 'Wash your hands after handling yeast.'],
    tips: ['Aerobic respiration: glucose + oxygen → carbon dioxide + water (+ lots of energy released). It happens in mitochondria.', 'Anaerobic respiration in yeast (fermentation): glucose → ethanol + carbon dioxide. Used for bread (CO₂ makes it rise) and brewing (ethanol).', 'Anaerobic respiration in muscles: glucose → lactic acid. It releases much less energy and causes an oxygen debt.', 'The rate rises with temperature up to an optimum (about 35–40 °C), then falls quickly as the enzymes are denatured.', 'Respiration happens in all living cells, all the time. It is not the same as breathing.'],
    sim: {
      w: 720, h: 440,
      init: () => ({T: 20, counting: false, clock: 0, count: 0, acc: 0, bub: [], bub2: [], done: false, milky: 0}),
      controls: [
        {type: 'range', key: 'T', label: 'Water bath temperature', min: 10, max: 70, step: 10, unit: '°C', change: s => { s.counting = false; s.done = false; }},
        {type: 'buttons', items: [{label: '⏱ Count bubbles for 1 minute', primary: true, act: s => BC.start(s)}]},
        {type: 'note', text: 'Time runs 10 × faster: a minute takes 6 seconds.'}
      ],
      step(s, dt, api) {
        BC.step(s, dt, api, () => { s.bub2.push({x: 470 + rnd(-4, 4), y: 372, r: rnd(2.5, 4), ph: rnd(0, 99)}); s.milky = Math.min(1, s.milky + .01); });
        if (Math.random() < rate(s.T) * dt * .2) s.bub.push({x: 200 + rnd(-14, 14), y: 360, r: rnd(1.5, 3), ph: rnd(0, 99)});
        s.bub = stepBubbles(s.bub, dt, 210, 25); s.bub2 = stepBubbles(s.bub2, dt, 270, 50);
      },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 405);
        D.beaker(c, 110, 200, 180, 205, .8, `rgba(${Math.round(lerp(150, 240, (s.T - 10) / 60))},170,${Math.round(lerp(240, 140, (s.T - 10) / 60))},.35)`, 'water bath');
        D.testTube(c, 200, 140, 46, 250, .62, 'rgba(225,205,150,.8)');
        D.bubbles(c, s.bub, 'rgba(255,250,235,.9)', 'rgba(160,130,80,.7)');
        D.rect(c, 182, 128, 36, 16, '#b5651d', null, 0, 3);
        c.strokeStyle = '#6a7d90'; c.lineWidth = 4; c.beginPath(); c.moveTo(200, 128); c.lineTo(200, 100); c.lineTo(470, 100); c.lineTo(470, 380); c.stroke();
        D.testTube(c, 470, 250, 44, 150, .8, `rgba(235,235,235,${.25 + s.milky * .7})`);
        D.bubbles(c, s.bub2);
        D.thermometer(c, 260, 120, 230, s.T, 0, 100);
        D.text(c, s.T + ' °C', 280, 130, {size: 15, bold: true, col: '#c0392b', bg: '#fff'});
        D.text(c, 'yeast + sugar solution', 200, 420, {size: 11, align: 'center'});
        D.text(c, 'limewater', 520, 330, {size: 11});
        D.rect(c, 560, 20, 140, 80, '#fff', '#c9d2dc', 1, 10);
        D.text(c, '⏱ ' + Math.floor(s.clock) + ' s', 574, 42, {size: 15, bold: true});
        D.text(c, 'Bubbles: ' + s.count, 574, 74, {size: 17, bold: true, col: '#1f7a6d'});
        D.text(c, 'glucose → ethanol + carbon dioxide', 20, 30, {size: 14, bold: true});
        if (s.T >= 60) D.text(c, 'Enzymes in the yeast are being denatured', 20, 54, {size: 12, bold: true, col: '#c0392b'});
      },
      readout: s => [['Temperature', s.T + ' °C']],
      read(s) { if (!s.done || s.counting) return 'Count the bubbles for a full minute first.'; s.done = false; return {T: s.T, n: s.count}; }
    },
    table: {x: {k: 'T', name: 'Temperature', unit: '°C', dp: 0}, ys: [{k: 'n', name: 'Bubbles per minute', dp: 0}]},
    graph: {x: 'T', y: ['n'], fit: 'curve', model: x => rate(x), xLabel: 'Temperature / °C', yLabel: 'Mean bubbles per minute', xmin: 0, ymin: 0, anomTol: e => Math.max(3, e * .35)},
    demo: [10, 20, 30, 40, 50, 60, 70].flatMap(T => [
      {say: `Water bath at ${T} °C. Leave 5 minutes, then count for 1 minute.`, set: {T, done: false}, act: s => BC.start(s), wait: 6500},
      {record: true, wait: 600}
    ]).concat([{say: 'The rate peaks near 40 °C, then drops as the yeast’s enzymes are denatured.', wait: 3000}]),
    questions: [
      {q: 'Write the word equation for anaerobic respiration in yeast.', a: 'glucose → ethanol + carbon dioxide.'},
      {q: 'Explain the shape of the graph.', a: 'As the temperature rises to about 40 °C the enzymes and molecules move faster, so there are more successful collisions and respiration speeds up. Above the optimum the enzymes’ active sites change shape (they are denatured), so the rate falls quickly.'},
      {q: 'Give two differences between aerobic and anaerobic respiration.', a: 'Aerobic needs oxygen and anaerobic does not. Aerobic releases much more energy per glucose. Aerobic makes carbon dioxide and water, while anaerobic makes lactic acid (animals) or ethanol and carbon dioxide (yeast).'},
      {q: 'How do the reactants of respiration reach your muscle cells?', a: 'In the blood: glucose is dissolved in the plasma (absorbed from the small intestine) and oxygen is carried by red blood cells (absorbed in the lungs). Carbon dioxide is carried back to the lungs in the blood.'}
    ],
    sources: [SRC.bite('anaerobic respiration yeast fermentation'), SRC.cog('respiration'), SRC.pmt]
  });
})();

/* 3. Food tests */
(() => {
  const FOODS = {
    water: {n: 'Distilled water (control)', s: 0, g: 0, p: 0, l: 0},
    bread: {n: 'Bread', s: 1, g: .15, p: .5, l: 0},
    glucose: {n: 'Glucose solution', s: 0, g: 1, p: 0, l: 0},
    egg: {n: 'Egg white', s: 0, g: 0, p: 1, l: 0},
    oil: {n: 'Olive oil', s: 0, g: 0, p: 0, l: 1},
    milk: {n: 'Milk', s: 0, g: .6, p: .7, l: .6},
    potato: {n: 'Potato', s: 1, g: 0, p: 0, l: 0}
  };
  const TESTS = {
    s: {n: 'Starch: iodine solution', reagent: 'iodine solution (orange-brown)', neg: [200, 120, 40], pos: [25, 20, 45], heat: false, word: ['orange-brown (no starch)', 'blue-black: starch present']},
    g: {n: 'Sugar: Benedict’s + heat', reagent: 'Benedict’s solution (blue), then heat in a water bath', neg: [60, 110, 220], pos: [190, 60, 20], heat: true, word: ['stays blue (no reducing sugar)', 'brick red: reducing sugar present']},
    p: {n: 'Protein: biuret', reagent: 'biuret solution (blue)', neg: [70, 120, 220], pos: [130, 50, 160], heat: false, word: ['stays blue (no protein)', 'purple (lilac): protein present']},
    l: {n: 'Lipid: ethanol emulsion', reagent: 'ethanol, shake, then pour into water', neg: [225, 235, 245], pos: [250, 250, 250], heat: false, word: ['stays clear (no lipid)', 'cloudy white emulsion: lipid present']}
  };
  const mix = (a, b, t) => a.map((v, i) => Math.round(lerp(v, b[i], t)));
  function benedict(t) { const c = [[60, 110, 220], [70, 160, 80], [220, 200, 40], [230, 130, 30], [190, 60, 20]]; const x = clamp(t, 0, 1) * 4, i = Math.min(3, Math.floor(x)); return mix(c[i], c[i + 1], x - i); }
  function result(f, t) {
    const amt = FOODS[f][t], T = TESTS[t];
    if (t === 'g') { if (!amt) return T.word[0]; return amt < .3 ? 'green: a little reducing sugar' : amt < .7 ? 'orange: some reducing sugar' : T.word[1]; }
    return amt ? T.word[1] : T.word[0];
  }
  practical({
    id: 'food-tests', subject: 'biology', title: 'Food tests', syllabus: 'B1 Nutrition · a healthy diet',
    short: 'Test foods for starch, sugar, protein and fat, and watch the colour changes.',
    aim: 'Find out which nutrients are present in different foods.',
    apparatus: ['Food samples, ground up with a little water (pestle and mortar)', 'Test tubes, rack and pipettes', 'Iodine solution, Benedict’s solution, biuret solution, ethanol', 'Water bath at about 80 °C (for Benedict’s)'],
    variables: {iv: 'The food being tested', dv: 'The colour change', cv: ['Same volume of food sample and of reagent', 'Same heating time for Benedict’s', 'Run a control with distilled water to compare colours']},
    method: [
      'Grind the food with a little distilled water and put about 2 cm³ into a test tube.',
      'Starch: add a few drops of iodine solution. Blue-black means starch.',
      'Reducing sugar: add an equal volume of Benedict’s solution and heat in a water bath for about 5 minutes. Green → yellow → orange → brick red shows more and more sugar.',
      'Protein: add biuret solution. Purple (lilac) means protein.',
      'Lipid (fat): shake the food with ethanol, then pour the ethanol into a tube of water. A cloudy white emulsion means fat.'
    ],
    safety: ['Wear eye protection. Benedict’s and biuret solutions are irritants.', 'Ethanol is highly flammable: no flames nearby, so use a water bath from a kettle.'],
    tips: ['A balanced diet contains carbohydrates (energy), lipids (energy store, insulation), proteins (growth and repair), vitamins and minerals (health, for example vitamin C prevents scurvy, iron prevents anaemia), dietary fibre (keeps food moving through the gut) and water.', 'Benedict’s only detects reducing sugars such as glucose. It needs heating.', 'Always compare with a control (distilled water) so you can see whether the colour really changed.', 'An imbalanced diet causes problems: obesity (too much energy), starvation, or deficiency diseases.'],
    sim: {
      w: 720, h: 440,
      init: () => ({f: 'bread', test: 's', p: 0, go: false}),
      controls: [
        {type: 'select', key: 'f', label: 'Food', options: Object.entries(FOODS).map(([k, v]) => [k, v.n]), change: s => { s.go = false; s.p = 0; }},
        {type: 'select', key: 'test', label: 'Test', options: Object.entries(TESTS).map(([k, v]) => [k, v.n]), change: s => { s.go = false; s.p = 0; }},
        {type: 'buttons', items: [{label: '🧪 Do the test', primary: true, act: s => { s.go = true; s.p = 0; }}]}
      ],
      step(s, dt) { if (s.go) s.p = Math.min(1, s.p + dt / (TESTS[s.test].heat ? 4 : 2.2)); },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 405);
        const T = TESTS[s.test], amt = FOODS[s.f][s.test];
        let col;
        if (!s.go) col = [235, 230, 215];
        else if (s.test === 'g') col = s.p < .3 ? mix([235, 230, 215], T.neg, s.p / .3) : benedict(amt * clamp((s.p - .3) / .7, 0, 1));
        else col = s.p < .4 ? mix([235, 230, 215], T.neg, s.p / .4) : mix(T.neg, amt ? T.pos : T.neg, clamp((s.p - .4) / .6, 0, 1) * Math.min(1, amt * 1.5 + (amt ? .3 : 0)));
        if (T.heat) { D.beaker(c, 250, 210, 200, 195, .75, 'rgba(240,170,130,.35)', 'water bath ~80 °C'); }
        const cloudy = s.test === 'l' && s.go && amt && s.p > .4;
        D.testTube(c, 350, 120, 52, 260, .45, cloudy ? `rgba(250,250,250,${.5 + .45 * clamp((s.p - .4) / .6, 0, 1)})` : `rgba(${col.join(',')},.85)`);
        if (s.go && s.p < .4) { D.rect(c, 342, 40, 16, 70, '#ccd5de', '#889', 1, 4); D.circle(c, 350, 112 + s.p * 200, 4, `rgb(${(s.test === 's' ? [200, 120, 40] : s.test === 'l' ? [230, 235, 240] : [60, 110, 220]).join(',')})`); }
        // control tube
        D.testTube(c, 160, 160, 40, 210, .45, s.go ? (s.test === 'l' ? 'rgba(225,235,245,.6)' : `rgba(${T.neg.join(',')},.85)`) : 'rgba(225,235,245,.6)');
        D.text(c, 'control (water)', 160, 395, {size: 11, align: 'center'});
        D.text(c, FOODS[s.f].n, 350, 395, {size: 12, align: 'center', bold: true});
        D.rect(c, 470, 40, 230, 150, '#fff', '#c9d2dc', 1, 10);
        D.text(c, T.n, 484, 62, {size: 13, bold: true});
        D.text(c, 'Add: ' + T.reagent.split(',')[0], 484, 86, {size: 11.5});
        if (T.heat) D.text(c, 'then heat in a water bath', 484, 104, {size: 11.5});
        D.text(c, s.go && s.p >= 1 ? 'Result:' : s.go ? 'Watching…' : 'Press “Do the test”', 484, 132, {size: 12, col: '#666'});
        if (s.go && s.p >= 1) { const r = result(s.f, s.test); D.text(c, r.split(':')[0], 484, 156, {size: 15, bold: true, col: '#1f7a6d'}); if (r.includes(':')) D.text(c, r.split(':')[1].trim(), 484, 178, {size: 12}); }
      },
      readout: s => [['Food', FOODS[s.f].n], ['Test', TESTS[s.test].n]],
      read(s) { if (!s.go || s.p < 1) return 'Do the test and wait for the result first.'; return {food: FOODS[s.f].n, test: TESTS[s.test].n.split(':')[0], res: result(s.f, s.test)}; }
    },
    table: {series: 'food', seriesName: 'Food', x: {k: 'test', name: 'Nutrient tested'}, noRepeats: true, sort: false, ys: [{k: 'res', name: 'Observation'}]},
    demo: [['bread', 's'], ['potato', 's'], ['glucose', 'g'], ['milk', 'g'], ['egg', 'p'], ['oil', 'l'], ['water', 'p']].flatMap(([f, t]) => [
      {say: `${FOODS[f].n}: ${TESTS[t].n}.`, set: {f, test: t, go: true, p: 0}, wait: TESTS[t].heat ? 4600 : 2800},
      {record: true, wait: 400}
    ]),
    questions: [
      {q: 'Which test needs heating, and what are the colour changes?', a: 'Benedict’s test for reducing sugar. Blue → green → yellow → orange → brick red as the amount of sugar increases.'},
      {q: 'Why is a test tube of distilled water tested too?', a: 'It is a control: it shows the colour of the reagent with no nutrient present, so you can tell whether a colour change really happened.'},
      {q: 'Name the nutrients in a balanced diet and give the use of each.', a: 'Carbohydrates: energy. Lipids: stored energy and insulation. Proteins: growth and repair. Vitamins and minerals: staying healthy (for example vitamin C prevents scurvy, iron prevents anaemia). Fibre: keeps food moving through the gut. Water: needed by every cell.'}
    ],
    sources: [SRC.bite('food tests benedicts biuret iodine'), SRC.cog('food tests'), SRC.pmt]
  });
})();

/* 4. Microscope: plant and animal cells */
(() => {
  const OBJ = {4: 4000, 10: 1600, 40: 400}; // field of view diameter in µm with a x10 eyepiece
  const SAMPLES = {onion: {n: 'Onion epidermis (iodine stain)', w: 220, h: 60}, cheek: {n: 'Cheek cells (methylene blue)', w: 55, h: 55}, leaf: {n: 'Leaf (pondweed) cells', w: 90, h: 45}};
  practical({
    id: 'microscope', subject: 'biology', title: 'Looking at cells with a microscope', syllabus: 'B1 Cells and organisation',
    short: 'Focus a light microscope on onion, cheek and leaf cells, and estimate cell size from the field of view.',
    aim: 'Prepare slides of plant and animal cells, look at them under a light microscope and estimate the size of a cell.',
    apparatus: ['Light microscope', 'Microscope slides, coverslips, mounted needle', 'Onion, iodine solution', 'Cotton bud and methylene blue for cheek cells (or prepared slides)'],
    variables: {iv: 'Type of cell (plant or animal)', dv: 'Features seen and estimated cell length (µm)', cv: ['Same magnification when comparing', 'Thin layer of cells so light can pass through']},
    method: [
      'Peel a thin layer of epidermis from inside an onion and lay it flat on a slide with a drop of iodine solution (stains the nucleus and starch).',
      'Lower a coverslip at an angle with a mounted needle to avoid trapping air bubbles.',
      'Put the slide on the stage. Start with the lowest-power objective lens (×4).',
      'Use the coarse focus to bring the cells into view, then the fine focus to make them sharp.',
      'Switch to a higher-power objective and refocus with the fine focus only.',
      'Count how many cells fit across the field of view, and divide the field of view diameter by that number to estimate one cell’s length.'
    ],
    safety: ['Iodine and methylene blue stain skin and are irritants.', 'Put used cheek swabs straight into disinfectant.', 'Never point the mirror at the Sun.'],
    tips: ['Total magnification = eyepiece lens × objective lens (for example 10 × 40 = 400).', 'Magnification = image size ÷ actual size. 1 mm = 1000 µm.', 'Both plant and animal cells have a nucleus (genetic material, controls the cell), cytoplasm (where reactions happen), a cell membrane (controls what goes in and out) and mitochondria (respiration).', 'Only plant cells have a cell wall (cellulose, strengthens), chloroplasts (photosynthesis) and a permanent vacuole (cell sap, keeps the cell firm). Onion cells have no chloroplasts because they grow underground.', 'Organisation: cells → tissues → organs → organ systems → organism.'],
    sim: {
      w: 720, h: 440,
      init: () => ({smp: 'onion', obj: 4, focus: 30}),
      controls: [
        {type: 'select', key: 'smp', label: 'Slide', options: Object.entries(SAMPLES).map(([k, v]) => [k, v.n])},
        {type: 'select', key: 'obj', label: 'Objective lens (eyepiece ×10)', options: [[4, '×4 (total ×40)'], [10, '×10 (total ×100)'], [40, '×40 (total ×400)']], change: s => { s.focus = clamp(s.focus + (s.obj === 40 ? 8 : -4), 0, 100); }},
        {type: 'range', key: 'focus', label: 'Focus', min: 0, max: 100, step: 1}
      ],
      draw(c, s) {
        c.fillStyle = '#10161c'; c.fillRect(0, 0, s.W, s.H);
        const R = 190, cx = 260, cy = 220, best = {4: 62, 10: 64, 40: 66}[s.obj], blur = Math.abs(s.focus - best) / 3;
        const um = OBJ[s.obj] / (2 * R), S = SAMPLES[s.smp];
        c.save(); c.beginPath(); c.arc(cx, cy, R, 0, 7); c.clip();
        c.fillStyle = s.smp === 'cheek' ? '#eaf0f8' : s.smp === 'leaf' ? '#eaf5e2' : '#f6efd9'; c.fillRect(cx - R, cy - R, 2 * R, 2 * R);
        c.filter = blur > .4 ? `blur(${Math.min(12, blur).toFixed(1)}px)` : 'none';
        const w = S.w / um, hh = S.h / um;
        if (s.smp === 'cheek') {
          for (let i = 0; i < 70; i++) { const x = cx - R + ((i * 97) % 400) / 400 * 2 * R + (i % 3) * 7, y = cy - R + ((i * 61) % 400) / 400 * 2 * R; c.fillStyle = 'rgba(120,150,210,.35)'; c.strokeStyle = 'rgba(60,90,170,.7)'; c.beginPath(); c.ellipse(x, y, w / 2, w / 2.4, i, 0, 7); c.fill(); c.stroke(); D.circle(c, x + 2, y - 1, Math.max(1.5, w / 9), 'rgba(40,60,140,.85)'); }
        } else {
          for (let r = -12; r <= 12; r++) for (let k = -12; k <= 12; k++) {
            const off = (r % 2) * w / 2, x = cx + k * w + off, y = cy + r * hh;
            if (Math.abs(x - cx) > R + w || Math.abs(y - cy) > R + hh) continue;
            c.strokeStyle = s.smp === 'onion' ? 'rgba(150,110,40,.9)' : 'rgba(60,110,50,.9)'; c.lineWidth = Math.max(1, 2.2 / um * 1.5); c.strokeRect(x - w / 2, y - hh / 2, w, hh);
            if (s.smp === 'leaf') for (let q = 0; q < 8; q++) D.circle(c, x - w / 2 + 6 / um * 2 + (q % 4) * w / 4.4, y - hh / 4 + Math.floor(q / 4) * hh / 2, Math.max(1, 3 / um * 1.2), '#3d9a3a');
            D.circle(c, x + w / 5, y, Math.max(1.5, (s.smp === 'onion' ? 9 : 6) / um), s.smp === 'onion' ? 'rgba(120,70,20,.85)' : 'rgba(40,80,40,.6)');
          }
        }
        c.filter = 'none'; c.restore();
        D.circle(c, cx, cy, R, null, '#000', 6);
        D.text(c, `×${10 * s.obj}`, cx, cy + R + 16, {size: 13, bold: true, align: 'center', col: '#ddd'});
        D.rect(c, 470, 30, 230, 380, '#1b252f', '#2e3a46', 1, 10);
        D.text(c, 'Field of view diameter', 484, 54, {size: 12, col: '#aab'});
        D.text(c, `${OBJ[s.obj]} µm = ${(OBJ[s.obj] / 1000).toFixed(1)} mm`, 484, 76, {size: 15, bold: true, col: '#66d9c4'});
        D.text(c, blur > 3 ? 'Out of focus: adjust the focus' : blur > .8 ? 'Nearly in focus…' : 'Sharp focus ✔', 484, 104, {size: 13, bold: true, col: blur > .8 ? '#f5b041' : '#5cffb1'});
        const parts = s.smp === 'onion' ? ['cell wall', 'cell membrane', 'nucleus', 'cytoplasm', 'vacuole', '(no chloroplasts)'] : s.smp === 'leaf' ? ['cell wall', 'chloroplasts', 'nucleus', 'vacuole', 'cytoplasm'] : ['cell membrane', 'nucleus', 'cytoplasm', '(no cell wall, no vacuole)'];
        D.text(c, 'You can see:', 484, 136, {size: 12, col: '#aab'});
        parts.forEach((p, i) => D.text(c, '• ' + p, 490, 158 + i * 20, {size: 12.5, col: '#e8eef4'}));
        D.text(c, 'Cells across the view ≈ ' + Math.round(OBJ[s.obj] / S.w), 484, 300, {size: 12.5, col: '#e8eef4'});
        D.text(c, 'Tip: start on ×4, then use', 484, 340, {size: 11.5, col: '#aab'});
        D.text(c, 'the fine focus at higher power.', 484, 358, {size: 11.5, col: '#aab'});
      },
      readout: s => [['Total magnification', '×' + 10 * s.obj]],
      read(s) {
        const best = {4: 62, 10: 64, 40: 66}[s.obj]; if (Math.abs(s.focus - best) > 3) return 'Get the cells into sharp focus first.';
        const S = SAMPLES[s.smp], n = Math.max(1, Math.round(OBJ[s.obj] / S.w * (1 + gauss(.05))));
        return {smp: S.n, mag: 10 * s.obj, fov: OBJ[s.obj], n};
      }
    },
    table: {series: 'smp', seriesName: 'Slide', x: {k: 'mag', name: 'Total magnification', dp: 0}, noRepeats: true, ys: [{k: 'fov', name: 'Field of view', unit: 'µm', dp: 0}, {k: 'n', name: 'Cells across the view', dp: 0}], derived: [{k: 'len', name: 'Estimated cell length', unit: 'µm', dp: 0, f: r => r.fov / r.n}]},
    demo: [
      {say: 'Onion cells. Start with the ×4 objective and the coarse focus.', set: {smp: 'onion', obj: 4, focus: 20}, wait: 1500},
      {say: 'Bring them into focus…', set: {focus: 50}, wait: 1000}, {set: {focus: 62}, say: 'Sharp: lots of brick-shaped cells.', wait: 1600, record: true},
      {say: 'Switch to ×10 and use the fine focus.', set: {obj: 10, focus: 64}, wait: 2000, record: true},
      {say: 'Leaf cells have chloroplasts as well as a cell wall and vacuole.', set: {smp: 'leaf', obj: 40, focus: 66}, wait: 2500, record: true},
      {say: 'Cheek cells: animal cells, with no cell wall, chloroplasts or permanent vacuole.', set: {smp: 'cheek', obj: 40, focus: 66}, wait: 2800, record: true}
    ],
    questions: [
      {num: () => 400, tol: .1, q: 'An eyepiece is ×10 and the objective is ×40. What is the total magnification?', a: '10 × 40 = ×400.'},
      {num: () => 50, tol: .5, unit: 'µm', q: 'A cell’s image is 20 mm long at ×400. What is its actual length in µm?', a: 'Actual size = image ÷ magnification = 20 mm ÷ 400 = 0.05 mm = 50 µm.'},
      {q: 'Name three structures found in plant cells but not in animal cells, and give their functions.', a: 'Cell wall (made of cellulose: strengthens and supports the cell), chloroplasts (absorb light for photosynthesis), permanent vacuole (filled with cell sap, keeps the cell firm).'},
      {q: 'Why do onion epidermis cells have no chloroplasts?', a: 'The onion bulb grows underground in the dark, so these cells do not photosynthesise.'}
    ],
    sources: [SRC.bite('microscope onion cells practical'), SRC.cog('microscopy required practical'), SRC.pmt]
  });
})();

/* 5. Variation */
(() => {
  const EYES = [['Brown', .5, '#6b4423'], ['Blue', .25, '#3b7dd8'], ['Green', .1, '#4c9a52'], ['Hazel', .15, '#9a7b3c']];
  function makeClass() { return Array.from({length: 30}, () => { let r = Math.random(), e = EYES[0]; for (const E of EYES) { if (r < E[1]) { e = E; break; } r -= E[1]; } return {span: +(18.5 + gauss(1.4)).toFixed(1), eye: e[0], col: e[2]}; }); }
  practical({
    id: 'variation', subject: 'biology', title: 'Measuring variation in a class', syllabus: 'B4 Variation and classification',
    short: 'Measure hand span (continuous) and record eye colour (discontinuous), then draw a histogram and a bar chart.',
    aim: 'Collect data on continuous and discontinuous variation and present each in the right type of graph.',
    apparatus: ['Ruler or tape measure (to 0.1 cm)', 'Tally chart', 'A class of volunteers'],
    variables: {iv: 'The person (each member of the class)', dv: 'Hand span (cm), or eye colour', cv: ['Measure hand span the same way every time: right hand, fingers stretched, thumb tip to little-finger tip', 'The same person measures everyone']},
    method: [
      'Ask each person to spread their right hand flat on the ruler. Measure from the tip of the thumb to the tip of the little finger, to the nearest 0.1 cm.',
      'Record each measurement in a tally chart using groups (classes) such as 16.0–16.9 cm, 17.0–17.9 cm, and so on.',
      'Record each person’s eye colour in a separate tally chart.',
      'Draw a histogram (bars touching) for hand span and a bar chart (gaps between bars) for eye colour.'
    ],
    safety: ['Be sensitive: people should only share data they are happy to share.'],
    tips: ['Continuous variation: any value within a range (height, mass, hand span). Usually affected by both genes and environment. Plot as a histogram: often a bell-shaped (normal) curve.', 'Discontinuous variation: distinct categories with nothing in between (blood group, eye colour, tongue rolling). Usually just genes. Plot as a bar chart.', 'Classification: the five kingdoms are animals, plants, fungi, protists (protoctists) and prokaryotes (bacteria). Vertebrate groups: mammals, birds, reptiles, amphibians, fish.', 'A species is a group of organisms that can breed together to produce fertile offspring.'],
    sim: {
      w: 720, h: 440,
      init: () => ({mode: 'span', cls: makeClass(), i: 0}),
      controls: [
        {type: 'select', key: 'mode', label: 'Feature', options: [['span', 'Hand span (continuous)'], ['eye', 'Eye colour (discontinuous)']], change: (s, api) => { s.i = 0; }},
        {type: 'buttons', items: [{label: 'Measure next person', primary: true, act: (s, api) => api.record()}, {label: 'Measure the rest of the class', act: (s, api) => { while (s.i < 30) api.record(); }}, {label: 'New class', act: s => { s.cls = makeClass(); s.i = 0; }}]}
      ],
      draw(c, s) {
        D.wall(c, s.W, s.H);
        s.cls.forEach((p, k) => {
          const x = 40 + (k % 15) * 44, y = 70 + Math.floor(k / 15) * 120, done = k < s.i;
          D.circle(c, x, y, 13, done ? '#f3d9b8' : '#e3e6ea', done ? '#a07850' : '#bbb', 1.5);
          if (done && s.mode === 'eye') { D.circle(c, x - 5, y - 2, 2.6, p.col); D.circle(c, x + 5, y - 2, 2.6, p.col); }
          D.rect(c, x - 12, y + 14, 24, 34, done ? '#7fa7d6' : '#d6dbe0', null, 0, 6);
          if (done) D.text(c, s.mode === 'span' ? p.span.toFixed(1) : p.eye, x, y + 60, {size: 10, align: 'center', col: '#333'});
        });
        const p = s.cls[Math.min(29, s.i)];
        if (s.i < 30) {
          D.rect(c, 40, 300, 640, 110, '#fff', '#c9d2dc', 1, 10);
          D.text(c, `Person ${s.i + 1} of 30`, 56, 322, {size: 13, bold: true});
          if (s.mode === 'span') {
            D.ruler(c, 220, 360, 340, 14, false, 0, true);
            const w = p.span * 14; c.fillStyle = '#f3d9b8'; c.strokeStyle = '#a07850'; c.beginPath(); c.moveTo(220, 352); for (let f = 0; f <= 4; f++) { const fx = 220 + w * f / 4; c.lineTo(fx, 335 - (f === 0 || f === 4 ? 0 : 12)); c.lineTo(fx + 6, 352); } c.closePath(); c.fill(); c.stroke();
            D.line(c, 220, 345, 220, 395, '#c0392b', 1.5); D.line(c, 220 + w, 345, 220 + w, 395, '#c0392b', 1.5);
            D.text(c, 'thumb tip to little-finger tip', 56, 346, {size: 12, col: '#555'});
          } else {
            D.circle(c, 330, 360, 36, '#fff', '#888', 1.5); D.circle(c, 330, 360, 20, p.col); D.circle(c, 330, 360, 8, '#111');
            D.text(c, 'Look closely and choose the nearest category.', 56, 346, {size: 12, col: '#555'});
          }
        } else D.text(c, 'Everyone measured. Look at the table and the graph below.', 360, 350, {size: 15, bold: true, align: 'center', col: '#1f7a6d'});
      },
      readout: s => [['Measured', s.i + ' / 30']],
      read(s) {
        if (s.i >= 30) return 'Everyone has been measured. Choose “New class” to start again.';
        const p = s.cls[s.i++];
        if (s.mode === 'span') return {feat: 'Hand span', bin: Math.floor(p.span), n: 1};
        return {feat: 'Eye colour', bin: p.eye, n: 1};
      },
      recordMsg: () => 'Added to the tally.'
    },
    table: {series: 'feat', seriesName: 'Feature', x: {k: 'bin', name: 'Group', show: v => typeof v === 'number' ? `${v}.0–${v}.9 cm` : v}, tally: true, ys: [{k: 'n', name: 'Frequency (number of people)', dp: 0}]},
    graph: {bars: rows => {
      const span = rows.filter(r => r.feat === 'Hand span'), eye = rows.filter(r => r.feat === 'Eye colour');
      if (span.length >= eye.length) { const lo = Math.min(...span.map(r => r.bin)), hi = Math.max(...span.map(r => r.bin)), bars = []; for (let b = lo; b <= hi; b++) { const r = span.find(x => x.bin === b); bars.push({label: `${b}–${b + 1}`, value: r ? r.n : 0}); } return {bars, hist: true, xLabel: 'Hand span / cm (histogram: continuous data, bars touch)', yLabel: 'Frequency'}; }
      return {bars: EYES.map(([n, , col]) => ({label: n, value: (eye.find(r => r.bin === n) || {n: 0}).n, color: col})), xLabel: 'Eye colour (bar chart: discontinuous data, gaps between bars)', yLabel: 'Frequency'};
    }},
    demo: [
      {say: 'Hand span: thumb tip to little-finger tip, measured to 0.1 cm and tallied in 1 cm groups.', set: {mode: 'span', i: 0}, wait: 2200},
      ...Array.from({length: 6}, () => ({record: true, wait: 500})),
      {say: 'Measuring the rest of the class…', act: s => { while (s.i < 30) s.api.record(); }, wait: 2500},
      {say: 'Continuous data → histogram with touching bars. Notice the bell shape (normal distribution).', wait: 3500}
    ],
    questions: [
      {q: 'Is hand span continuous or discontinuous variation? Explain.', a: 'Continuous: it can take any value within a range (for example 18.3 cm or 18.37 cm), not just a few fixed categories.'},
      {q: 'Why is eye colour shown on a bar chart but hand span on a histogram?', a: 'Eye colour is discontinuous (separate categories), so the bars have gaps. Hand span is continuous, so the groups join on to each other and the bars touch.'},
      {q: 'Suggest why hand span varies between people of the same age.', a: 'It is affected by both genes (inherited from parents) and the environment (such as diet and health during growth).'},
      {q: 'Name the five kingdoms of living things.', a: 'Animals, plants, fungi, protists (protoctists) and prokaryotes (bacteria).'}
    ],
    sources: [SRC.bite('continuous and discontinuous variation'), SRC.cog('variation'), SRC.pmt]
  });
})();

/* 6. Seed dispersal: paper spinners */
(() => {
  const fall = L => .75 + .26 * L; // seconds to fall 2.0 m
  practical({
    id: 'spinners', subject: 'biology', title: 'Seed dispersal: paper spinners', syllabus: 'B1 Reproduction in plants · seed dispersal',
    short: 'Model a sycamore seed with a paper spinner. Change its wing length and time how long it takes to fall.',
    aim: 'Investigate how the wing length of a model sycamore seed affects how long it takes to fall (and so how far the wind could carry it).',
    apparatus: ['Paper spinners with wings of different lengths, each with a paper clip as the “seed”', 'Metre rule or tape measure: drop from 2.0 m', 'Stopwatch'],
    variables: {iv: 'Wing length (cm)', dv: 'Time to fall 2.0 m (s)', cv: ['Drop height (2.0 m)', 'Same paper, wing width and paper-clip mass', 'Drop the same way each time, with no draughts']},
    method: [
      'Make spinners with wing lengths of 2, 4, 6, 8 and 10 cm, all the same width, each with one paper clip.',
      'Hold the spinner at 2.0 m (check with a metre rule) and drop it. Start the stopwatch as you let go.',
      'Stop the stopwatch when it hits the floor.',
      'Repeat three times for each wing length and calculate the mean.',
      'Plot mean fall time against wing length.'
    ],
    safety: ['Stand on a stable step (not a chair) to reach 2 m, or drop from a balcony with supervision.'],
    tips: ['A longer fall time means the wind has longer to carry the seed further from the parent plant.', 'Seeds are dispersed to reduce competition with the parent plant (and each other) for light, water and minerals, and to colonise new areas.', 'Dispersal methods: wind (sycamore, dandelion), animals (eaten: berries; hooked: burdock), explosive (pea pods), water (coconut).', 'Reaction time makes stopwatch timing imprecise (about 0.2 s). Repeats and means reduce random errors, and a longer drop height helps.', 'Pollination: insect-pollinated flowers have bright petals, scent and nectar, with sticky pollen. Wind-pollinated flowers have small dull petals, feathery stigmas and lots of light pollen.'],
    sim: {
      w: 720, h: 440,
      init: () => ({L: 6, y: 0, falling: false, landed: false, ft: 0, ang: 0}),
      controls: [
        {type: 'range', key: 'L', label: 'Wing length', min: 2, max: 10, step: 2, unit: 'cm', change: s => { s.falling = false; s.landed = false; s.y = 0; s.ft = 0; }},
        {type: 'buttons', items: [{label: '⬇ Drop and time it', primary: true, act: s => { s.y = 0; s.ft = 0; s.falling = true; s.landed = false; s.meas = +(fall(s.L) + gauss(.08)).toFixed(2); }}]}
      ],
      step(s, dt) {
        if (s.falling) { s.ft += dt; const T = s.meas, frac = clamp(s.ft / T, 0, 1); s.y = frac; s.ang += dt * (6 + s.L * 1.5); if (frac >= 1) { s.falling = false; s.landed = true; } }
      },
      draw(c, s) {
        D.wall(c, s.W, s.H); D.bench(c, s.W, s.H, 410);
        D.ruler(c, 120, 30, 380, 19, true, 0, false);
        for (let m = 0; m <= 20; m += 5) D.text(c, (2 - m / 10).toFixed(1) + ' m', 150, 30 + m * 19, {size: 10});
        const x = 330, y = 40 + s.y * 360, wl = s.L * 6;
        c.save(); c.translate(x, y);
        const sq = Math.cos(s.ang);
        c.fillStyle = '#f2e8c9'; c.strokeStyle = '#a89262'; c.lineWidth = 1.2;
        c.beginPath(); c.rect(-4, 0, 8, 22); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(0, 0); c.lineTo(-wl * sq, -8); c.lineTo(-wl * sq, 2); c.closePath(); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(0, 0); c.lineTo(wl * sq, -8); c.lineTo(wl * sq, 2); c.closePath(); c.fill(); c.stroke();
        D.rect(c, -3, 18, 6, 8, '#8a96a3', null, 0, 2);
        c.restore();
        D.rect(c, 520, 30, 180, 90, '#fff', '#c9d2dc', 1, 10);
        D.text(c, '⏱ stopwatch', 534, 50, {size: 12, col: '#666'});
        D.text(c, (s.landed ? s.meas : s.ft).toFixed(2) + ' s', 534, 84, {size: 24, bold: true, col: '#1f7a6d'});
        D.text(c, s.landed ? 'Landed. Record it!' : s.falling ? 'Falling…' : 'Ready at 2.0 m', 534, 108, {size: 12});
        // sycamore picture
        D.text(c, 'Model of a sycamore seed', 610, 180, {size: 12, align: 'center', col: '#555'});
        c.save(); c.translate(610, 250); c.fillStyle = '#c9a86b'; c.beginPath(); c.ellipse(-30, -10, 34, 12, -.4, 0, 7); c.fill(); c.beginPath(); c.ellipse(30, -10, 34, 12, .4, 0, 7); c.fill(); D.circle(c, 0, 4, 10, '#8a6a3b'); c.restore();
      },
      readout: s => [['Wing length', s.L + ' cm'], ['Drop height', '2.0 m']],
      read(s) { if (!s.landed) return 'Drop the spinner and wait for it to land first.'; s.landed = false; return {L: s.L, t: s.meas}; }
    },
    table: {x: {k: 'L', name: 'Wing length', unit: 'cm', dp: 0}, ys: [{k: 't', name: 'Time to fall 2.0 m', unit: 's', dp: 2}]},
    graph: {x: 'L', y: ['t'], fit: 'line', xLabel: 'Wing length / cm', yLabel: 'Mean time to fall / s', xmin: 0, ymin: 0, model: x => fall(x), anomTol: () => .3},
    demo: [2, 4, 6, 8, 10].flatMap(L => [0, 1].flatMap(rep => [
      {say: rep ? 'Repeat.' : `Wing length ${L} cm. Drop from 2.0 m and time the fall.`, set: {L, y: 0, ft: 0, falling: true, landed: false}, act: s => s.meas = +(fall(L) + gauss(.08)).toFixed(2), wait: fall(L) * 1000 + 600},
      {record: true, wait: 300}
    ])).concat([{say: 'Longer wings → longer fall time → the wind can carry the seed further from the parent plant.', wait: 3000}]),
    questions: [
      {q: 'Why is it an advantage for a seed to fall slowly?', a: 'It stays in the air longer, so the wind can carry it further from the parent plant. That reduces competition for light, water and minerals.'},
      {q: 'Why are three repeats taken for each wing length?', a: 'Reaction times and draughts cause random errors. Taking a mean of repeats reduces their effect, and repeats let you spot anomalies.'},
      {q: 'Suggest one improvement to make the timing more accurate.', a: 'Drop from a greater height so the times are longer (the reaction-time error is then a smaller fraction), or film the fall with a timer in shot, or use light gates.'},
      {q: 'Describe two features of a wind-pollinated flower.', a: 'Small, dull petals with no scent or nectar; anthers and feathery stigmas hanging outside the flower; huge numbers of small, light pollen grains.'}
    ],
    sources: [SRC.bite('seed dispersal ks3'), SRC.bite('wind and insect pollination'), SRC.pmt]
  });
})();

/* 7. Breathing: bell jar model and lung volume */
(() => {
  const PEOPLE = {student: {n: 'Student (age 13)', v: 2.8}, adult: {n: 'Adult', v: 4.6}, swimmer: {n: 'Trained swimmer', v: 5.8}, smoker: {n: 'Long-term smoker', v: 3.6}};
  practical({
    id: 'breathing', subject: 'biology', title: 'Breathing: bell jar model and lung volume', syllabus: 'B1 Gas exchange · breathing',
    short: 'Pull the rubber “diaphragm” to inflate balloon lungs, then measure vital capacity by blowing into an upturned bottle.',
    aim: 'Use a model to explain how pressure changes move air into and out of the lungs, and measure lung volume (vital capacity).',
    apparatus: ['Bell jar model: balloons (lungs) on a Y-tube (trachea and bronchi) inside a bell jar (rib cage), with a rubber sheet (diaphragm)', 'Large plastic bottle (5 litres) marked in 0.1 L steps, filled with water and upside down in a bowl of water', 'Rubber tube with a clean mouthpiece'],
    variables: {iv: 'The person being tested', dv: 'Volume of air breathed out in one big breath (litres)', cv: ['Take the deepest breath possible each time', 'Breathe out fully in one breath', 'Read the volume with the bottle held still']},
    method: [
      'Bell jar: pull the rubber sheet down. The volume inside the jar increases, so the pressure falls, and air rushes into the balloons. Push it up and the opposite happens.',
      'Lung volume: fill the bottle with water and turn it upside down in the bowl. Put one end of the tube up inside the bottle.',
      'Take the deepest breath you can, then breathe out fully through the tube.',
      'Air pushes water out of the bottle. Read the volume of air collected: this is your vital capacity.',
      'Refill and repeat three times. Calculate the mean.'
    ],
    safety: ['Use a new, clean mouthpiece for each person.', 'Stop if you feel dizzy. Do not take part if you have asthma that is not under control.'],
    tips: ['Breathing in: the intercostal muscles contract (ribs move up and out) and the diaphragm contracts and flattens. Chest volume increases, pressure decreases, and air is pushed in from outside, where the pressure is higher.', 'Breathing out: the muscles relax, volume decreases and pressure increases, so air is pushed out.', 'Alveoli are adapted for gas exchange: huge surface area, walls one cell thick, a rich blood supply and a moist lining.', 'Limits of the bell jar model: the rubber sheet is pulled down rather than contracting itself, the bell jar (rib cage) cannot move, and there is only one “lung” chamber.', 'Smoking: tar coats the alveoli (less surface area), cilia are damaged (more infections), and it can cause emphysema, bronchitis and lung cancer. Asthma: the bronchioles narrow and make extra mucus. Exercise makes breathing faster and deeper.'],
    sim: {
      w: 720, h: 440,
      init: () => ({mode: 'jar', dia: 0, who: 'student', blow: 0, blowing: false, vol: 0}),
      controls: [
        {type: 'select', key: 'mode', label: 'Experiment', options: [['jar', 'Bell jar model'], ['vc', 'Measure vital capacity']]},
        {type: 'range', key: 'dia', label: 'Pull diaphragm down', min: 0, max: 100, step: 1, unit: '%'},
        {type: 'select', key: 'who', label: 'Person (vital capacity)', options: Object.entries(PEOPLE).map(([k, v]) => [k, v.n])},
        {type: 'buttons', items: [{label: '💨 Deep breath, then blow out fully', primary: true, act: s => { s.mode = 'vc'; s.blowing = true; s.blow = 0; s.vol = Math.max(.5, +(PEOPLE[s.who].v + gauss(.12)).toFixed(1)); }}]}
      ],
      step(s, dt) { if (s.blowing) { s.blow = Math.min(1, s.blow + dt / 2.5); if (s.blow >= 1) s.blowing = false; } },
      draw(c, s) {
        D.wall(c, s.W, s.H);
        if (s.mode === 'jar') {
          const d = s.dia / 100, P = 101.3 - d * .4 * (1 - Math.min(1, (s.t % 100) * 0)), cx = 300;
          c.fillStyle = 'rgba(220,235,245,.35)'; c.strokeStyle = '#5d7083'; c.lineWidth = 2.5;
          c.beginPath(); c.moveTo(cx - 20, 60); c.lineTo(cx - 20, 90); c.quadraticCurveTo(cx - 130, 110, cx - 130, 200); c.lineTo(cx - 130, 330); c.lineTo(cx + 130, 330); c.lineTo(cx + 130, 200); c.quadraticCurveTo(cx + 130, 110, cx + 20, 90); c.lineTo(cx + 20, 60); c.stroke();
          D.rect(c, cx - 22, 48, 44, 16, '#b5651d', null, 0, 3);
          D.line(c, cx, 20, cx, 150, '#7a8a99', 5); D.line(c, cx, 150, cx - 45, 185, '#7a8a99', 5); D.line(c, cx, 150, cx + 45, 185, '#7a8a99', 5);
          const r = 22 + d * 26;
          for (const sx of [-1, 1]) { c.fillStyle = 'rgba(230,110,120,.8)'; c.beginPath(); c.ellipse(cx + sx * 55, 205 + r * .3, r * .8, r, 0, 0, 7); c.fill(); c.strokeStyle = '#a0404c'; c.lineWidth = 1.5; c.stroke(); }
          const ctrl = 330 + d * 80, mid = 330 + d * 40;
          c.fillStyle = 'rgba(60,60,70,.9)'; c.beginPath(); c.moveTo(cx - 130, 328); c.quadraticCurveTo(cx, ctrl, cx + 130, 328); c.lineTo(cx + 130, 336); c.quadraticCurveTo(cx, ctrl + 8, cx - 130, 336); c.fill();
          D.line(c, cx, mid + 6, cx, mid + 32, '#333', 3); D.rect(c, cx - 12, mid + 32, 24, 10, '#333', null, 0, 3);
          if (s.dia > 5) for (let i = 0; i < 4; i++) D.arrow(c, cx - 2, 0 + ((s.t * 50 + i * 12) % 40), cx - 2, 8 + ((s.t * 50 + i * 12) % 40), '#2f6fb8', 2, 6);
          D.text(c, 'trachea', cx + 10, 30, {size: 11}); D.text(c, 'balloons = lungs', cx + 90, 210, {size: 11}); D.text(c, 'bell jar = rib cage', cx + 140, 120, {size: 11}); D.text(c, 'rubber sheet = diaphragm', cx + 140, 340, {size: 11});
          D.rect(c, 500, 30, 200, 120, '#fff', '#c9d2dc', 1, 10);
          D.text(c, 'Volume inside jar: ' + (d > .05 ? 'increased ↑' : 'normal'), 514, 54, {size: 12});
          D.text(c, 'Pressure inside: ' + (d > .05 ? 'decreased ↓' : 'same as outside'), 514, 78, {size: 12});
          D.text(c, d > .05 ? 'Air is pushed IN by the higher' : 'Pull the diaphragm down', 514, 106, {size: 12, bold: true, col: '#1f7a6d'});
          D.text(c, d > .05 ? 'pressure outside → lungs inflate' : 'to “breathe in”.', 514, 126, {size: 12, bold: true, col: '#1f7a6d'});
        } else {
          D.bench(c, s.W, s.H, 410);
          D.rect(c, 230, 300, 300, 110, 'rgba(120,180,230,.45)'); D.beaker(c, 230, 280, 300, 130, 0);
          const air = s.vol * s.blow, bx = 320, top = 60, bh = 300;
          D.rect(c, bx, top + air / 5 * bh, 120, bh - air / 5 * bh, 'rgba(120,180,230,.5)');
          c.strokeStyle = '#5d7083'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(bx + 40, 360); c.lineTo(bx, 330); c.lineTo(bx, top + 10); c.quadraticCurveTo(bx, top, bx + 10, top); c.lineTo(bx + 110, top); c.quadraticCurveTo(bx + 120, top, bx + 120, top + 10); c.lineTo(bx + 120, 330); c.lineTo(bx + 80, 360); c.stroke();
          for (let v = 0; v <= 5; v += .5) { const y = top + v / 5 * bh; D.line(c, bx + 120, y, bx + 108, y, '#334', 1); if (v % 1 === 0) D.text(c, v + ' L', bx + 126, y, {size: 10}); }
          c.strokeStyle = '#7d4f2a'; c.lineWidth = 5; c.beginPath(); c.moveTo(120, 200); c.quadraticCurveTo(180, 400, 360, 395); c.lineTo(370, 280); c.stroke();
          if (s.blowing) for (let i = 0; i < 4; i++) D.circle(c, 370 + Math.sin(i * 2 + s.t * 5) * 8, 280 - ((s.t * 120 + i * 30) % 120), 4, '#fff', '#8ab', .8);
          D.text(c, '😮‍💨', 95, 190, {size: 34});
          D.rect(c, 500, 30, 200, 90, '#fff', '#c9d2dc', 1, 10);
          D.text(c, PEOPLE[s.who].n, 514, 52, {size: 12, bold: true});
          D.text(c, 'Air collected: ' + air.toFixed(1) + ' L', 514, 80, {size: 16, bold: true, col: '#1f7a6d'});
          D.text(c, s.blow >= 1 ? 'Done: record it' : s.blowing ? 'Blowing…' : '', 514, 104, {size: 12});
        }
      },
      readout: s => [['Mode', s.mode === 'jar' ? 'Bell jar model' : 'Vital capacity']],
      read(s) { if (s.mode !== 'vc' || s.blow < 1) return 'Measure a vital capacity first (press the blow button and wait).'; s.blow = 0; return {who: PEOPLE[s.who].n, v: s.vol}; }
    },
    table: {x: {k: 'who', name: 'Person'}, sort: false, ys: [{k: 'v', name: 'Vital capacity', unit: 'L', dp: 1}]},
    graph: {bars: rows => ({bars: rows.map(r => ({label: r.who, value: +r.v.toFixed(2)})), xLabel: 'Person', yLabel: 'Mean vital capacity / L'})},
    demo: [
      {say: 'Pull the diaphragm down: the volume of the jar increases and the pressure inside drops.', set: {mode: 'jar', dia: 0}, wait: 1200},
      {set: {dia: 50}, wait: 700}, {set: {dia: 100}, say: 'Air from outside (higher pressure) is pushed into the balloons: breathing in.', wait: 2500},
      {set: {dia: 40}, wait: 600}, {set: {dia: 0}, say: 'Push it back up: the volume falls, the pressure rises and air is pushed out.', wait: 2500},
      ...['student', 'student', 'swimmer', 'smoker'].flatMap(w => [
        {say: `Vital capacity: ${PEOPLE[w].n}. Deep breath in, then breathe out fully into the bottle.`, set: {mode: 'vc', who: w, blow: 0, blowing: true}, act: s => s.vol = Math.max(.5, +(PEOPLE[w].v + gauss(.1)).toFixed(1)), wait: 3200},
        {record: true, wait: 400}
      ])
    ],
    questions: [
      {q: 'Explain how air enters the lungs when you breathe in.', a: 'The diaphragm contracts and flattens and the intercostal muscles pull the ribs up and out. The volume of the chest increases, so the pressure inside falls below atmospheric pressure, and air is pushed in.'},
      {q: 'Give one way the bell jar model is not like the real chest.', a: 'Any one of: the bell jar is rigid, but ribs move; the diaphragm is pulled by hand rather than contracting; the balloons are not alveoli; there is space between the balloons and jar that does not exist in the body.'},
      {q: 'Why might a long-term smoker have a lower vital capacity?', a: 'Tar and smoke damage the alveoli (emphysema breaks down their walls), reducing the elastic, working lung tissue and the surface area for gas exchange.'},
      {q: 'Give two ways alveoli are adapted for gas exchange.', a: 'Any two: very large total surface area, walls only one cell thick (short diffusion distance), surrounded by many capillaries, and a moist lining so gases dissolve.'}
    ],
    sources: [SRC.bite('bell jar model breathing'), SRC.bite('gas exchange alveoli ks3'), SRC.cog('ventilation lungs')]
  });
})();
