/* Router and pages */
'use strict';
const SUBJ = {physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology'};
let current = null;

function page(title, ...kids) { const app = $('#app'); app.innerHTML = ''; app.append(...kids.flat(Infinity).filter(k => k != null && k !== false)); document.title = title ? title + ' · Challenge Science Lab' : 'Challenge Science Lab'; window.scrollTo(0, 0); }

/* ---------- home ---------- */
function heroCanvas() {
  const W = 520, H = 300, cv = h('canvas', {width: W * 2, height: H * 2}), c = cv.getContext('2d'); c.scale(2, 2);
  const ps = Array.from({length: 46}, (_, i) => ({x: rnd(20, W - 20), y: rnd(20, H - 20), vx: rnd(-1, 1), vy: rnd(-1, 1), c: i % 3}));
  const cols = ['#66d9c4', '#f0a35e', '#7fb2f0'];
  let t = 0;
  (function f() {
    if (!document.body.contains(cv)) return;
    t += 1 / 60; const T = .6 + .5 * Math.sin(t * .5);
    c.fillStyle = '#12202c'; c.fillRect(0, 0, W, H);
    for (const p of ps) { p.x += p.vx * T * 2.2; p.y += p.vy * T * 2.2; if (p.x < 10 || p.x > W - 10) p.vx *= -1; if (p.y < 10 || p.y > H - 10) p.vy *= -1; D.circle(c, p.x, p.y, 7, cols[p.c]); }
    D.text(c, `Gas particles · temperature ${T > .9 ? 'high' : T > .4 ? 'medium' : 'low'}`, 14, H - 16, {size: 12, col: '#9fc'});
    requestAnimationFrame(f);
  })();
  return cv;
}

const tile = (href, ico, t, p) => h('a', {class: 'tile', href}, h('div', {class: 'ico'}, ico), h('h3', null, t), h('p', null, p));
function pcard(p) {
  return h('a', {class: 'pcard ' + p.subject, href: '#/lab/' + p.id},
    h('div', {class: 'row'}, h('span', {class: 'pill ' + p.subject}, SUBJ[p.subject]), p.specimen ? h('span', {class: 'pill spec'}, 'in specimen paper') : null, Store.has('practicals', p.id) ? h('span', {class: 'pill done'}, '✔ tried') : null),
    h('h3', null, p.title), h('p', null, p.short), h('p', {class: 'small muted'}, p.syllabus));
}

/* ---------- lab list ---------- */
let labFilter = 'all';
function labList() {
  const grid = h('div', {class: 'grid g3'});
  const render = () => { grid.innerHTML = ''; PRACTICALS.filter(p => labFilter === 'all' || p.subject === labFilter || (labFilter === 'spec' && p.specimen)).forEach(p => grid.append(pcard(p))); };
  const filt = h('div', {class: 'filters'}, [['all', 'All'], ['spec', 'In the specimen papers'], ['physics', 'Physics'], ['chemistry', 'Chemistry'], ['biology', 'Biology']].map(([k, l]) => h('button', {class: 'chip' + (k === labFilter ? ' on' : ''), onclick: e => { labFilter = k; $$('.chip', filt).forEach(c => c.classList.toggle('on', c === e.target)); render(); }}, l)));
  page('Practical lab', h('h1', null, 'Practical lab'), h('p', {class: 'lead'}, 'Pick a practical. Watch the demo or run it yourself: change the variables, take readings (including repeats), and the table and graph build as you go.'), filt, grid);
  render();
}

/* ---------- practical page ---------- */
function practicalPage(id) {
  const p = PRACTICALS.find(x => x.id === id);
  if (!p) return labList();
  const host = h('div');
  const i = PRACTICALS.indexOf(p), prev = PRACTICALS[i - 1], next = PRACTICALS[i + 1];
  page(p.title,
    h('div', {class: 'crumbs'}, h('a', {href: '#/lab'}, '← All practicals')),
    h('div', {class: 'phead'}, h('div', null, h('div', {class: 'row', style: 'display:flex;gap:6px;margin-bottom:6px'}, h('span', {class: 'pill ' + p.subject}, SUBJ[p.subject]), p.specimen ? h('span', {class: 'pill spec'}, 'in specimen paper') : null, h('span', {class: 'pill', style: 'background:#eef2f6'}, p.syllabus)), h('h1', null, p.title), h('p', {class: 'lead', style: 'margin:0'}, p.aim))),
    host);
  const X = EXPLAIN[p.id], vids = (VIDEOS[p.id] || []), rel = LESSONS.filter(L => (L.labs || []).includes(p.id));
  if (X) host.append(h('div', {class: 'explain'}, h('h3', null, 'What this experiment does'), h('p', null, X.what),
    h('h3', {style: 'margin-top:12px'}, 'Where everything goes'), h('ol', null, X.setup.map(t => h('li', null, t))),
    h('p', {class: 'small muted'}, 'The labels on the picture below show each piece of apparatus. You can turn them off in the controls.')));
  const m = mountSim(p, host);
  if (X) host.append(h('div', {class: 'explain', style: 'background:#f1faf8;border-color:#bfe3da'}, h('h3', null, 'What is going on'), h('p', null, X.going),
    rel.length ? h('p', {class: 'small'}, h('b', null, 'Learn the theory: '), rel.map((L, k) => [k ? ' · ' : '', h('a', {href: '#/learn/' + L.id}, L.code + ' ' + L.title)])) : null));
  if (vids.length) host.append(h('h3', null, 'Watch'), videoGrid(vids));
  current = m;
  if (p.table) host.append(h('div', {class: 'grid g2', style: 'margin-top:18px;align-items:start'},
    h('div', {class: 'card'}, h('h3', null, 'Results table'), h('p', {class: 'small muted'}, 'Units go in the headings, readings to the same precision, and repeats are averaged.'), m.tableEl),
    p.graph ? h('div', {class: 'card'}, h('h3', null, 'Graph'), m.graphEl, p.graph.bars ? null : m.anomBox) : h('div', {class: 'card'}, h('h3', null, 'Why no graph?'), h('p', {class: 'small'}, p.noGraph || 'The results here are categories or single values rather than a pattern between two continuous variables, so a clear results table is the right way to present them.'))));

  // tabs
  const tabs = [['method', 'Method & variables'], ['tips', 'Exam tips'], ['qs', 'Questions'], ['src', 'Sources']];
  const box = h('div');
  const bar = h('div', {class: 'tabs'}, tabs.map(([k, l], j) => h('button', {class: j ? '' : 'on', onclick: e => { $$('button', bar).forEach(b => b.classList.toggle('on', b === e.target)); show(k); }}, l)));
  function show(k) {
    box.innerHTML = '';
    if (k === 'method') box.append(
      h('div', {class: 'vars section'}, h('div', {class: 'var'}, h('h4', null, 'Independent variable'), p.variables.iv), h('div', {class: 'var'}, h('h4', null, 'Dependent variable'), p.variables.dv), h('div', {class: 'var'}, h('h4', null, 'Control variables'), h('ul', {class: 'tidy'}, p.variables.cv.map(c => h('li', null, c))))),
      h('div', {class: 'grid g2'}, h('div', {class: 'card'}, h('h3', null, 'Method'), h('ol', {class: 'steps'}, p.method.map(s => h('li', null, s)))),
        h('div', null, h('div', {class: 'card section'}, h('h3', null, 'Apparatus'), h('ul', {class: 'tidy'}, p.apparatus.map(a => h('li', null, a)))), h('div', {class: 'callout'}, h('b', null, '⚠ Safety'), h('ul', {class: 'tidy'}, p.safety.map(a => h('li', null, a)))))));
    if (k === 'tips') box.append(h('div', {class: 'card'}, h('h3', null, 'What examiners look for'), h('ul', {class: 'tidy'}, p.tips.map(t => h('li', null, t)))),
      h('div', {class: 'callout tip'}, h('b', null, 'Practical paper reminder: '), 'Collection of data (8), Presentation of data (6), Analysis (6). See ', h('a', {href: '#/skills'}, 'Data skills'), ' to practise each one.'));
    if (k === 'qs') p.questions.forEach((Q, j) => {
      const qt = typeof Q.q === 'function' ? Q.q(m.s) : Q.q, at = () => typeof Q.a === 'function' ? Q.a(m.s) : Q.a;
      const ans = h('div', {class: 'a'});
      const row = h('div', {class: 'btns', style: 'margin-top:8px;align-items:center'});
      if (Q.num) {
        const inp = h('input', {type: 'number', step: 'any'}), res = h('span');
        row.append(inp, Q.unit ? h('span', null, Q.unit) : null, h('button', {class: 'btn', onclick: () => {
          const v = parseFloat(inp.value), t = Q.num(m.s); if (isNaN(v)) return;
          const ok = Math.abs(v - t) <= Q.tol; res.className = ok ? 'ok' : 'no'; res.textContent = ok ? '✔ Correct' : '✘ Not quite';
          ans.textContent = at(); ans.classList.add('show');
        }}, 'Check'), res);
      }
      row.append(h('button', {class: 'btn ghost', onclick: () => { ans.textContent = at(); ans.classList.toggle('show'); }}, 'Show answer'));
      box.append(h('div', {class: 'qa'}, h('div', {class: 'q'}, `${j + 1}. ${qt}`), row, ans));
    });
    if (k === 'src') box.append(h('p', null, 'Read more about this practical from trusted GCSE revision sources:'), h('div', {class: 'src'}, p.sources.map(s => h('a', {href: s.url, target: '_blank', rel: 'noopener'}, s.name + ' ↗'))),
      h('p', {class: 'small muted', style: 'margin-top:12px'}, 'Bitesize and Cognito links open a search for this topic, so they keep working even when individual pages move.'));
  }
  host.append(bar, box); show('method');
  host.append(h('div', {class: 'btns', style: 'justify-content:space-between;margin-top:24px'}, prev ? h('a', {class: 'btn', href: '#/lab/' + prev.id}, '← ' + prev.title) : h('span'), next ? h('a', {class: 'btn', href: '#/lab/' + next.id}, next.title + ' →') : h('span')));
}

/* ---------- other pages ---------- */
function skillsPage() {
  const t1 = h('div', {class: 'card section'}), t2 = h('div', {class: 'section'}), t3 = h('div', {class: 'section'});
  page('Data skills',
    h('h1', null, 'Data skills'),
    h('p', {class: 'lead'}, 'The practical paper gives 20 marks for what you do with data, not for remembering facts. Practise each skill here.'),
    h('div', {class: 'marks section'}, h('div', null, h('b', null, '8'), 'Collection of data'), h('div', null, h('b', null, '6'), 'Presentation of data'), h('div', null, h('b', null, '6'), 'Analysis')),
    h('div', {class: 'grid g3 section'},
      h('div', {class: 'card'}, h('h3', null, '1. Collecting data'), h('ul', {class: 'tidy small'}, ['Draw the table before you start.', 'Independent variable in the first column, dependent variable(s) after it.', 'Units in the headings only: “Distance / cm”.', 'Same number of decimal places for every reading of one instrument (e.g. 0.1 N).', 'Take repeats and calculate a mean. Leave anomalies out of the mean (circle them).', 'Cover a sensible range with at least 5 values, evenly spaced.'].map(t => h('li', null, t)))),
      h('div', {class: 'card'}, h('h3', null, '2. Presenting data'), h('ul', {class: 'tidy small'}, ['Independent variable on the x-axis.', 'Label both axes with quantity and unit.', 'A linear scale (1, 2, 5 or 10 per square) that uses more than half the grid. No odd scales like 3 per square.', 'Plot crosses (×) accurately, to within half a small square.', 'A line of best fit: a ruler-straight line or one smooth curve. Never join the dots.', 'Two data sets on one graph: use a key.', 'Categories (e.g. catalyst type) → bar chart.'].map(t => h('li', null, t)))),
      h('div', {class: 'card'}, h('h3', null, '3. Analysing data'), h('ul', {class: 'tidy small'}, ['Describe the trend: “As x increases, y increases…”', 'Be precise: “directly proportional” only for a straight line through the origin; otherwise “linear” or “positive correlation”.', 'Describe curves: “increases quickly at first, then levels off at about 60 cm³”.', 'Quote numbers from your data, with units.', 'Use the pattern to predict, and show your working.', 'Explain the pattern with science (particles, moments, enzymes…).', 'Evaluate: identify anomalies, suggest causes and improvements.'].map(t => h('li', null, t))))),
    h('h2', null, 'Table doctor'), t1,
    h('h2', null, 'Plot it yourself'), h('p', {class: 'muted'}, 'Plot each point from the table by clicking on the grid, then find the anomaly.'), t2,
    h('h2', null, 'Name the variables'), t3,
    h('h2', null, 'Words that earn marks'),
    h('div', {class: 'grid g2'}, [['Accurate', 'Close to the true value.'], ['Precise', 'Repeat readings are close to each other (little spread).'], ['Repeatable', 'The same person, method and equipment gives similar results.'], ['Reproducible', 'A different person or method gets similar results.'], ['Resolution', 'The smallest change an instrument can show (e.g. 1 mm on a ruler).'], ['Random error', 'Unpredictable scatter (reaction time, judging a reading). Reduce it by repeating and taking a mean.'], ['Systematic error', 'Every reading is out by the same amount (e.g. a newton-meter that is not zeroed). Repeating does not fix it.'], ['Zero error', 'An instrument reads something when it should read zero. Check and correct before starting.'], ['Parallax error', 'Reading a scale from an angle. Read at eye level.'], ['Anomaly', 'A result that does not fit the pattern. Repeat it, and leave it out of the mean and the line of best fit.'], ['Fair test', 'Only the independent variable is changed; everything else is controlled.'], ['Directly proportional', 'Straight line through the origin: double x, double y.']].map(([w, d]) => h('div', {class: 'card'}, h('b', null, w), h('div', {class: 'small'}, d)))));
  tableDoctor(t1); plotTrainer(t2); varQuiz(t3);
}
function calcPage() { const box = h('div'); page('Calculations', h('h1', null, 'Calculation drill'), h('p', {class: 'lead'}, 'A calculator is allowed and “any data needed will be given”, but you must know how to use it. Show working, include units, and give a sensible number of significant figures.'), box); calcDrill(box); }
function quizPage_() { const box = h('div'); page('Quiz', h('h1', null, 'Multiple-choice quiz'), h('p', {class: 'lead'}, 'Ten questions at a time, in the style of the specimen core paper’s multiple-choice sections. Every answer is explained.'), box); quizPage(box); }
function topicsPage_() { const box = h('div'); page('Syllabus', h('h1', null, 'Syllabus checklist'), h('p', {class: 'lead'}, 'The topics in the Challenge Science syllabus guidance (it follows the ISEB 13+ science specification), with the key facts to know. Tick each one off when you are confident.'), box); topicsPage(box); }

function examPage() {
  page('The exam',
    h('h1', null, 'The Challenge Science papers'),
    h('p', {class: 'lead'}, 'From the specimen papers for the first examination in 2027. The syllabus follows the ISEB 13+ list, but the questions reach into GCSE; this app teaches at GCSE level with early A level stretch, because the paper rewards clear reasoning, careful data handling and applying ideas to unfamiliar situations.'),
    h('div', {class: 'grid g2 section'},
      h('div', {class: 'card'}, h('h2', null, 'Core paper · 90 minutes'), h('ul', {class: 'tidy'},
        ['Three sections of 30 minutes each: Physics, Chemistry, Biology. Answer every question.', 'Each section opens with multiple-choice questions (A–E in physics), then longer structured questions.', 'Calculator allowed. Any data needed is given in the question, such as equations like p₁V₁ = p₂V₂.', 'Expect unfamiliar contexts: the specimen has Empedocles’ clepsydra, Eratosthenes measuring the Earth, catalysts for hydrogen peroxide, and Rf values of amino acids.', 'Skills tested: calculations with units and significant figures, force diagrams, sketching and justifying graphs, designing experiments, variables, plotting with a line of best fit and spotting anomalies.'].map(t => h('li', null, t))),
        h('div', {class: 'btns', style: 'margin-top:10px'}, h('a', {class: 'btn', href: '#/lab/catalysts'}, 'Catalysts practical'), h('a', {class: 'btn', href: '#/lab/chromatography'}, 'Chromatography'), h('a', {class: 'btn', href: '#/quiz'}, 'Practise MCQs'))),
      h('div', {class: 'card'}, h('h2', null, 'Practical (specialism) · 60 minutes'), h('ul', {class: 'tidy'},
        ['A real experiment in the lab. The specimen is “Hanging Masses”: a steel bar hung from two newton-meters, with a mass moved 1 cm at a time.', 'Q1: record the readings in a suitable table, including repeats.', 'Q2: plot both meters’ readings on one graph.', 'Q3: describe the patterns or rules in your data.', 'Q4: predict the readings for a new situation (a mass twice as big at 7.5 cm).', 'Marks: Collection of data 8, Presentation of data 6, Analysis 6 (total 20).'].map(t => h('li', null, t))),
        h('div', {class: 'btns', style: 'margin-top:10px'}, h('a', {class: 'btn primary', href: '#/lab/hanging-masses'}, 'Try the Hanging Masses practical'), h('a', {class: 'btn', href: '#/skills'}, 'Data skills')))),
    h('h2', null, 'How to prepare'),
    h('div', {class: 'grid g3 section'},
      h('div', {class: 'card'}, h('h3', null, 'Know the content'), h('p', {class: 'small'}, 'Work through the syllabus checklist. Use BBC Bitesize (KS3 and GCSE), Cognito videos and Save My Exams notes to fill gaps.'), h('a', {href: '#/topics'}, 'Syllabus checklist →')),
      h('div', {class: 'card'}, h('h3', null, 'Do the practicals'), h('p', {class: 'small'}, 'For each practical, be able to state the variables, describe the method, explain safety and interpret the graph.'), h('a', {href: '#/lab'}, 'Practical lab →')),
      h('div', {class: 'card'}, h('h3', null, 'Handle data fluently'), h('p', {class: 'small'}, 'Tables, graphs, anomalies, means, rearranging equations, percentages and unit conversions come up in every section.'), h('a', {href: '#/calc'}, 'Calculation drill →'))),
    h('div', {class: 'callout tip'}, h('b', null, 'Exam technique: '), 'Look at the marks in brackets: 2 marks usually means two separate points. In “explain” questions, give the reason with “because”. With calculations: equation → substitute → answer → unit. For “describe the pattern”, quote data from the graph.'),
    h('h2', null, 'Trusted revision sources'),
    h('p', {class: 'small muted'}, 'Videos in the lessons and practicals are from Cognito, with a few practical walkthroughs from Free Science Lessons. Both are free, UK-curriculum GCSE channels.'),
    h('div', {class: 'src'}, [['BBC Bitesize KS3 & GCSE Science', 'https://www.bbc.co.uk/bitesize'], ['Cognito (free videos and notes)', 'https://cognito.org/'], ['Save My Exams', 'https://www.savemyexams.com/'], ['Physics & Maths Tutor', 'https://www.physicsandmathstutor.com/'], ['Oak National Academy', 'https://www.thenational.academy/'], ['ISEB (13+ syllabus)', 'https://www.iseb.co.uk/']].map(([n, u]) => h('a', {href: u, target: '_blank', rel: 'noopener'}, n + ' ↗'))));
}

/* ---------- router ---------- */
function route() {
  if (current) { current.stop(); current = null; }
  const hash = location.hash.replace(/^#\/?/, ''), [a, b] = hash.split('/');
  $$('#nav a').forEach(x => x.classList.toggle('on', x.getAttribute('href') === '#/' + a));
  if (!a) home();
  else if (a === 'lab' && b) practicalPage(b);
  else if (a === 'lab') labList();
  else if (a === 'skills') skillsPage();
  else if (a === 'calc') calcPage();
  else if (a === 'quiz') quizPage_();
  else if (a === 'topics') topicsPage_();
  else if (a === 'exam') examPage();
  else if (a === 'learn' && b) lessonPage(b);
  else if (a === 'learn') learnPage();
  else if (a === 'core') corePage();
  else if (a === 'specialism') specialismPage();
  else home();
}
window.addEventListener('hashchange', route);
route();
