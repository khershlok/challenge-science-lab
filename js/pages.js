/* Home page and the two halves of the app: Core paper and Specialism (practical) paper */
'use strict';
function home() {
  const st = Store.get(), nDone = Object.keys(st.practicals || {}).length;
  const ms = LESSONS.filter(L => lessonStatus(L) === 'high').length;
  const spec = PRACTICALS.filter(p => p.specimen);
  page('',
    h('section', {class: 'hero'},
      h('div', null,
        h('span', {class: 'pill spec'}, 'Westminster Challenge · Science · first exam 2027'),
        h('h1', {style: 'margin-top:10px'}, 'Learn the science. See the practicals. Nail the exam.'),
        h('p', {class: 'lead'}, `The Challenge has two kinds of science paper, and this app is split the same way. The Core paper tests what you know and can apply; the Specialism paper is a real practical. ${LESSONS.length} taught lessons, ${PRACTICALS.length} animated practicals, videos, quizzes and drills, pitched at GCSE with early A level stretch.`),
        h('div', {class: 'btns'}, h('a', {class: 'btn primary', href: '#/learn'}, '📘 Start learning'), h('a', {class: 'btn', href: '#/lab'}, '🧪 Practical lab'), h('a', {class: 'btn', href: '#/exam'}, 'How the exam works')),
        h('p', {class: 'small muted', style: 'margin-top:12px'}, `Your progress on this device: ${ms} of ${LESSONS.length} lessons mastered · ${nDone} of ${PRACTICALS.length} practicals tried${st.quizBest ? ` · best quiz ${st.quizBest}/10` : ''}`)),
      heroCanvas()),
    h('div', {class: 'papers section'},
      h('a', {class: 'paper', href: '#/core'}, h('span', {class: 'pill', style: 'background:var(--accent2);color:var(--accent)'}, 'Core paper · 90 minutes'), h('h2', null, 'Core'),
        h('p', {class: 'small'}, 'Physics, chemistry and biology, 30 minutes each: multiple choice, then structured questions in unfamiliar contexts.'),
        h('ul', {class: 'small'}, h('li', null, `Learn: ${LESSONS.filter(L => L.subject !== 'skills').length} lessons with videos`), h('li', null, `Quiz: ${QUIZ.length} exam-style questions`), h('li', null, 'Calculations drill and syllabus checklist'))),
      h('a', {class: 'paper spec', href: '#/specialism'}, h('span', {class: 'pill chemistry'}, 'Specialism paper · 60 minutes'), h('h2', null, 'Specialism: the practical'),
        h('p', {class: 'small'}, 'A real experiment in the lab. Marked for collecting data (8), presenting it (6) and analysing it (6).'),
        h('ul', {class: 'small'}, h('li', null, `${PRACTICALS.length} animated practicals, each explained step by step`), h('li', null, 'Working-scientifically lessons'), h('li', null, 'Data skills: tables, graphs, anomalies, variables')))),
    h('h2', null, 'Start with the specimen papers'),
    h('div', {class: 'grid g3 section'}, spec.map(pcard)));
}

function corePage() {
  page('Core paper',
    h('div', {class: 'crumbs'}, 'Core paper'),
    h('h1', null, 'Core paper'),
    h('p', {class: 'lead'}, '90 minutes: three 30-minute sections (Physics, Chemistry, Biology). Each starts with multiple-choice questions, then structured questions that ask you to apply what you know to unfamiliar situations. The specimen has Empedocles’ water clock, Eratosthenes measuring the Earth, catalysts for hydrogen peroxide and the Rf values of amino acids. Calculator allowed; any equations needed are given.'),
    h('div', {class: 'callout tip'}, h('b', null, 'How to use this section. '), 'Work through the lessons for each subject in order. Each has short videos, the key ideas, worked examples, checked questions and harder Challenge questions. Then test yourself with the quiz and the calculations drill, and tick off the syllabus checklist.'),
    h('div', {class: 'tiles section'},
      tile('#/learn', '📘', 'Learn', `${LESSONS.length} taught lessons with videos, examples and checks.`),
      tile('#/quiz', '✅', 'Quiz', `${QUIZ.length} multiple-choice questions in the style of the specimen.`),
      tile('#/calc', '🧮', 'Calculations', 'Endless generated questions with worked answers.'),
      tile('#/topics', '📋', 'Syllabus checklist', 'Every topic in the syllabus guidance, ticked off as you go.')),
    ['physics', 'chemistry', 'biology'].map(s => [h('h2', null, SUBJ[s]), h('div', {class: 'lgrid section'}, LESSONS.filter(L => L.subject === s).map(lcard))]));
}

function specialismPage() {
  page('Specialism paper',
    h('div', {class: 'crumbs'}, 'Specialism paper'),
    h('h1', null, 'Specialism paper: the practical'),
    h('p', {class: 'lead'}, '60 minutes in a real lab. The specimen is “Hanging Masses”: a steel bar hangs from two newton-meters and you move a 100 g mass along it 1 cm at a time. You record the readings in a table (with repeats), plot both sets on one graph, describe the patterns, then predict the readings for a new situation.'),
    h('div', {class: 'grid g3 section'},
      h('div', {class: 'card'}, h('h3', null, 'Collection of data · 8 marks'), h('p', {class: 'small'}, 'Taking enough readings over a sensible range, with repeats, recorded to a consistent precision in a table with proper headings.')),
      h('div', {class: 'card'}, h('h3', null, 'Presentation of data · 6 marks'), h('p', {class: 'small'}, 'A graph with labelled axes and units, a sensible scale, accurately plotted points and a good line of best fit.')),
      h('div', {class: 'card'}, h('h3', null, 'Analysis · 6 marks'), h('p', {class: 'small'}, 'Describing patterns with numbers from your data, spotting anomalies, explaining with science and making predictions.'))),
    h('div', {class: 'callout tip'}, h('b', null, 'How to use this section. '), 'First do the four working-scientifically lessons. Then open the practicals: read “What is going on” for each one, watch the demo, run it yourself and answer the questions. Finish with the data skills drills.'),
    h('h2', null, 'Working-scientifically lessons'),
    h('div', {class: 'lgrid section'}, LESSONS.filter(L => L.subject === 'skills').map(lcard)),
    h('h2', null, 'Experiments from the specimen papers'),
    h('div', {class: 'grid g3 section'}, PRACTICALS.filter(p => p.specimen).map(pcard)),
    h('div', {class: 'tiles section'},
      tile('#/lab', '🧪', 'All practicals', `${PRACTICALS.length} animated experiments with live readings, tables and graphs.`),
      tile('#/skills', '📈', 'Data skills', 'Fix bad tables, plot points by hand, spot anomalies, name the variables.')));
}
