/* Lessons: working scientifically (all three sciences, and the whole practical paper) */
'use strict';

lesson({id: 'variables', code: 'W1', subject: 'skills', title: 'Variables, fair tests and hypotheses', level: 'GCSE',
  search: 'GCSE variables fair test hypothesis',
  intro: 'Every Challenge practical question starts here. If you can name the variables and say how to control them, you can plan any experiment, even one you have never seen.',
  goals: ['Name the independent, dependent and control variables in any experiment', 'Write a testable hypothesis and a prediction', 'Explain why repeats and controls make results more trustworthy', 'Tell categoric, discrete and continuous variables apart'],
  points: [
    {tag: 'rule', title: 'Independent variable (IV)', text: 'The one thing <em>you</em> change on purpose. In the Hanging Masses practical it is the position of the mass.'},
    {tag: 'rule', title: 'Dependent variable (DV)', text: 'The thing you <em>measure</em>, which depends on the IV: the newton-meter readings. Graphs put the IV on the x-axis and the DV on the y-axis.'},
    {tag: 'rule', title: 'Control variables', text: 'Everything else that could affect the DV, kept the same so the test is <strong>fair</strong>. Only then can a change in the DV be put down to the IV.'},
    {tag: 'rule', title: 'Hypothesis and prediction', text: 'A hypothesis is a testable idea that explains something, usually with a reason (“the rate increases with temperature because particles collide more often and with more energy”). A prediction says what you expect to measure if it is true.'},
    {tag: 'rule', title: 'Types of variable', text: '<strong>Categoric</strong>: names or groups (type of metal). <strong>Discrete</strong>: whole-number counts (number of bubbles). <strong>Continuous</strong>: any value on a scale (temperature, length). Continuous data gets a line graph; categoric data gets a bar chart.'},
    {tag: 'rule', title: 'Controls and repeats', text: 'A <strong>control experiment</strong> leaves out the factor being tested (boiled yeast, no catalyst) to show it is the IV that makes the difference. <strong>Repeats</strong> let you spot anomalies and calculate a mean, making the result more <em>repeatable</em>.'},
    {tag: 'watch', title: 'Name the variable, not the action', text: '“The temperature of the water” is a variable. “Heat the water” is not. And “keep it fair” earns no marks: name the variable you would keep the same and say how (for example, use the same volume of acid, measured with a measuring cylinder).'},
    {tag: 'tip', title: 'Unfamiliar experiments', text: 'The Challenge likes new contexts (an ancient water clock, seed spinners). Ask: what is being changed? what is being measured? what else could change the measurement?'}
  ],
  tables: [{title: 'Spotting the variables', headers: ['Experiment', 'Independent', 'Dependent', 'Two control variables'], rows: [
    ['Hooke’s law with a spring', 'mass (force) added', 'extension of the spring', 'same spring; measure from the same point'],
    ['Pondweed and light', 'distance of the lamp', 'bubbles per minute', 'temperature; same piece of pondweed'],
    ['Catalysts and H<sub>2</sub>O<sub>2</sub>', 'type of catalyst', 'volume of oxygen in 1 minute', 'volume and concentration of peroxide; mass of catalyst'],
    ['Seed spinners', 'wing length', 'time to fall', 'drop height; paper type and mass']]}],
  labs: ['hanging-masses', 'catalysts', 'spinners'],
  worked: [
    {q: 'A student wants to find out whether the temperature of water affects how fast sugar dissolves. Plan the variables.', steps: ['IV: the temperature of the water (for example 20, 30, 40, 50, 60 °C).', 'DV: the time for the sugar to dissolve completely, measured with a stopwatch.', 'Controls: the mass of sugar, the type of sugar (granulated, not cubes), the volume of water, how much it is stirred.', 'Repeat each temperature three times and calculate a mean.'], a: 'IV temperature; DV time to dissolve; controls: mass and type of sugar, volume of water, stirring.'},
    {q: 'Turn this into a testable hypothesis: “plants like light”.', steps: ['A hypothesis must say what is linked to what, in a way you can measure.', 'Link the IV (light intensity) to a DV (rate of photosynthesis, measured as bubbles of oxygen per minute).', 'Add the reason using science you know.'], a: '“As light intensity increases, the rate of photosynthesis increases, because light provides the energy for photosynthesis.”'}
  ],
  quiz: [
    {q: 'In an experiment on how the length of a pendulum affects its time period, what is the dependent variable?', opts: ['The length of the string', 'The time period', 'The mass of the bob', 'The angle it is released from'], correct: 1, explain: 'The time period is what is measured. Length is the IV; mass and angle are control variables.'},
    {q: 'Which of these is a continuous variable?', opts: ['Colour of light', 'Number of seeds that germinate', 'Mass of a beaker', 'Type of metal'], correct: 2, explain: 'Mass can take any value on a scale. A count of seeds is discrete; colour and metal are categoric.'},
    {q: 'Why does a yeast experiment include a flask with boiled yeast?', opts: ['To make the test fair', 'As a control, showing the gas comes from living yeast', 'To increase the rate', 'To make the results more precise'], correct: 1, explain: 'Boiling kills the yeast. If no gas is made, the gas in the other flasks must come from the living yeast respiring.'},
    {q: 'A student repeats each reading three times. What is the main benefit?', opts: ['The results become accurate', 'Anomalies can be spotted and a mean found', 'It removes all error', 'It changes the independent variable'], correct: 1, explain: 'Repeats improve repeatability and let you spot anomalies. They do not remove systematic errors, so they do not by themselves make results accurate.'},
    {q: 'Which graph should be used for “type of fuel” against “temperature rise”?', opts: ['Line graph', 'Scatter graph with a curve', 'Bar chart', 'Pie chart'], correct: 2, explain: 'The IV is categoric (types of fuel), so use a bar chart with gaps between the bars.'}
  ],
  challenges: [
    {prompt: 'Empedocles tested a clepsydra (a vessel with holes in the bottom). Suggest how you could investigate whether the size of the holes affects how quickly the vessel empties. Name the variables and give two control variables.', marks: 4, answer: 'IV: diameter of the holes (use several vessels or plates with holes of 1, 2, 3, 4 mm). DV: time for a fixed volume of water to drain, measured with a stopwatch. Controls: the number of holes; the starting volume (or depth) of water; the temperature of the water. Repeat each size three times and find the mean.', note: 'One mark each for IV, DV and each correctly named control (not just “keep it fair”).'},
    {prompt: 'A student says: “My results are accurate because I repeated them three times and they were all the same.” Explain why the student may be wrong.', marks: 2, answer: 'Results that agree are <em>repeatable</em> (precise), but they can all be wrong by the same amount if there is a systematic error, such as a balance that has not been zeroed or reading a scale from an angle. Accuracy means close to the true value.'}
  ],
  keywords: [['Fair test', 'Only the independent variable changes; all other variables are controlled.'], ['Hypothesis', 'A testable explanation, usually linking two variables with a reason.'], ['Control experiment', 'A version without the factor being tested, for comparison.'], ['Repeatable', 'The same person gets similar results using the same method and equipment.'], ['Reproducible', 'Someone else, or a different method, gets similar results.']],
  stretch: 'At A level a hypothesis is often tested statistically. You write a <strong>null hypothesis</strong> (“there is no link between light intensity and rate”) and use a test such as Spearman’s rank or a t-test to decide how likely it is that your pattern is just chance. A result is called <em>significant</em> if the probability of it being chance is under 5%.',
  links: [['Save My Exams: KS3 working scientifically', 'https://www.savemyexams.com/']]
});

lesson({id: 'tables-graphs', code: 'W2', subject: 'skills', title: 'Results tables and graphs', level: 'GCSE',
  search: 'GCSE drawing graphs results tables line of best fit',
  intro: 'In the practical paper, presenting data is worth 6 of the 20 marks. These rules are where students lose easy marks, and they are the same rules at GCSE and A level.',
  goals: ['Draw a results table that would get full marks', 'Choose scales, label axes and plot points accurately', 'Draw a line of best fit (straight or curved)', 'Find a gradient and an intercept and say what they mean'],
  points: [
    {tag: 'rule', title: 'The table', text: 'IV in the first column, DV (with repeats and a mean) in the next. Every heading has a quantity <em>and</em> unit, written “length / cm”. Units go in the heading only, never in the cells.'},
    {tag: 'rule', title: 'Consistent precision', text: 'Record every reading to the same number of decimal places, matching the instrument (a ruler marked in mm gives 12.0 cm, not 12 cm). The mean can be given to one more decimal place, at most.'},
    {tag: 'rule', title: 'The axes', text: 'IV on the x-axis, DV on the y-axis, both labelled with quantity and unit. Choose scales so the points fill more than half the grid, going up in easy steps (1, 2, 5 or 10 per square, never 3 or 7). The axes do not have to start at zero.'},
    {tag: 'rule', title: 'Plotting', text: 'Use small neat crosses (×) with a sharp pencil, accurate to half a small square. Plot the mean values.'},
    {tag: 'rule', title: 'Line of best fit', text: 'One smooth line, straight <em>or</em> curved, with roughly as many points above as below. Ignore anomalies. Never join the dots dot to dot, and never force the line through the origin unless the science says it must go there.'},
    {tag: 'rule', title: 'Gradient and intercept', text: 'Gradient = change in y ÷ change in x, using a large triangle (at least half the line). Its unit is the y unit per x unit. The y-intercept is where the line crosses x = 0. For a curve, draw a <em>tangent</em> at the point and find its gradient.'},
    {tag: 'rule', title: 'Describing patterns', text: '“As x increases, y increases” is a positive correlation. If the line is straight <em>and</em> goes through the origin, y is <strong>directly proportional</strong> to x: double x and y doubles. Quote numbers from the graph to back it up.'},
    {tag: 'watch', title: 'Proportional is not the same as “increases”', text: 'A straight line that does not pass through the origin shows a linear relationship, not proportionality. This is a favourite trap.'}
  ],
  tables: [{title: 'A table that gets full marks', headers: ['Mass added / g', 'Extension 1 / cm', 'Extension 2 / cm', 'Extension 3 / cm', 'Mean extension / cm'], rows: [['100', '2.1', '2.0', '2.2', '2.10'], ['200', '4.0', '4.2', '4.1', '4.10'], ['300', '6.2', '6.1', '7.9', '6.15']], note: 'The 7.9 cm is an anomaly: it is left out of the mean, so the mean is (6.2 + 6.1) ÷ 2 = 6.15 cm.'}],
  labs: ['hookes-law', 'hanging-masses'],
  worked: [
    {q: 'A straight line passes through (2.0 s, 5.0 m) and (8.0 s, 29.0 m) on a distance–time graph. Find the gradient and say what it means.', steps: ['Gradient = Δy ÷ Δx.', 'Δy = 29.0 − 5.0 = 24.0 m; Δx = 8.0 − 2.0 = 6.0 s.', 'Gradient = 24.0 ÷ 6.0 = 4.0 m/s.', 'The gradient of a distance–time graph is the speed.'], a: '4.0 m/s, the speed of the object.'},
    {q: 'Data goes from 0 to 37 on the y-axis. The grid has 10 large squares up the side. Choose a scale.', steps: ['37 ÷ 10 = 3.7 per large square, which is awkward.', 'Round up to an easy step: 4 per square is still awkward; 5 per square gives 50 at the top.', '37 out of 50 fills 74% of the axis, more than half.'], a: '5 units per large square (0 to 50).'}
  ],
  quiz: [
    {q: 'Which table heading is written correctly?', opts: ['Time (seconds)', 'Time / s', 'Time s', 'Seconds'], correct: 1, explain: 'Quantity, then a slash, then the unit symbol. Brackets, as in Time (s), are also accepted by most boards, but “Time / s” is the standard form.'},
    {q: 'A line of best fit is straight and passes through the origin. What does this show?', opts: ['y increases as x increases', 'y is directly proportional to x', 'There is no correlation', 'y is inversely proportional to x'], correct: 1, explain: 'Straight line through (0, 0) means direct proportion. “y increases” is true but incomplete.'},
    {q: 'A graph has velocity (m/s) on the y-axis and time (s) on the x-axis. What is the unit of the gradient?', opts: ['m', 'm/s', 'm/s²', 's/m'], correct: 2, explain: 'y unit ÷ x unit = (m/s) ÷ s = m/s². The gradient is the acceleration.'},
    {q: 'Readings: 12.5, 12.6, 13, 12.4 cm. What is wrong?', opts: ['Nothing', '13 should be written 13.0', 'The mean is missing', 'The values are too close together'], correct: 1, explain: 'All readings should have the same precision: 13.0 cm.'},
    {q: 'Which scale is best for data from 0 to 8.3 on 10 large squares?', opts: ['1 per square', '2 per square', '0.3 per square', '5 per square'], correct: 0, explain: '1 per square uses 83% of the grid and is easy to read. 2 per square uses less than half.'}
  ],
  challenges: [
    {prompt: 'In the Hanging Masses practical a student moves a 100 g mass along a bar 1 cm at a time, from 0 to 10 cm, and reads two newton-meters. They do each position twice. Draw (on paper) the headings of the table they should use.', marks: 3, answer: 'Position of mass / cm | Reading on meter A, 1st / N | A, 2nd / N | Mean A / N | Reading on meter B, 1st / N | B, 2nd / N | Mean B / N. The IV (position) is in the first column with values 0, 1, 2 … 10.', note: 'Marks: IV first with unit; both meters with repeats; units in headings only.'},
    {prompt: 'A student draws a graph of the volume of gas produced against time. The points rise steeply then level off. The student draws a straight line through the first and last points. Explain what is wrong and what they should do.', marks: 2, answer: 'The data shows a curve (the rate slows as the reactant is used up), so a straight line is not a good fit. They should draw a single smooth curve of best fit through or close to the points, ignoring any anomaly.'}
  ],
  keywords: [['Line of best fit', 'A single straight line or smooth curve showing the trend, with points spread evenly either side.'], ['Gradient', 'Steepness: change in y ÷ change in x, with units.'], ['Directly proportional', 'A straight-line graph through the origin: y = kx.'], ['Tangent', 'A straight line touching a curve at one point, used to find the gradient there.'], ['Intercept', 'Where a line crosses an axis.']],
  stretch: 'At A level you often <strong>linearise</strong> data: plot something so the graph becomes a straight line. For example, a pendulum has T = 2π√(L/g), so a graph of T² against L is a straight line through the origin with gradient 4π²/g, and you can find g from the gradient. You also add <em>error bars</em> to show the uncertainty of each point.',
  links: [['Physics & Maths Tutor: practical skills', 'https://www.physicsandmathstutor.com/']]
});

lesson({id: 'errors', code: 'W3', subject: 'skills', title: 'Accuracy, precision, errors and anomalies', level: 'GCSE → A level',
  search: 'GCSE accuracy precision random systematic error',
  intro: 'The analysis marks go to students who can judge how trustworthy their own data is. These words have exact meanings, and examiners expect you to use them exactly.',
  goals: ['Define accuracy, precision, resolution and repeatability', 'Tell random and systematic errors apart, with examples', 'Identify and deal with anomalies', 'Calculate a mean, a range and a percentage uncertainty'],
  points: [
    {tag: 'rule', title: 'Accuracy', text: 'How close a measurement is to the <em>true</em> value.'},
    {tag: 'rule', title: 'Precision', text: 'How close repeated measurements are to <em>each other</em> (small spread). Results can be precise but inaccurate, like darts all hitting the same wrong spot.'},
    {tag: 'rule', title: 'Resolution', text: 'The smallest change an instrument can show: 1 mm for a ruler, 0.01 g for a good balance. A higher-resolution instrument gives more precise readings.'},
    {tag: 'rule', title: 'Random error', text: 'Unpredictable scatter either side of the true value, such as reaction time with a stopwatch or a reading fluctuating. Reduce its effect by taking repeats and a mean.'},
    {tag: 'rule', title: 'Systematic error', text: 'Every reading is out by the same amount or proportion, such as a balance not set to zero (a <strong>zero error</strong>) or always reading a scale from above (<strong>parallax</strong>). Repeats do <em>not</em> help; fix the method or correct the readings.'},
    {tag: 'rule', title: 'Anomalies', text: 'A result that does not fit the pattern. Check it, repeat it if you can, and leave it out of the mean and the line of best fit. Say what might have caused it.'},
    {tag: 'rule', title: 'Mean and uncertainty', text: 'Mean = sum ÷ number of values (not counting anomalies). Uncertainty ≈ half the range: for 4.1, 4.3, 4.2 the mean is 4.2 and the uncertainty is ±0.1.'},
    {tag: 'tip', title: 'Improving an experiment', text: 'Be specific. Not “use better equipment” but “use a data logger with a light gate instead of a stopwatch, to remove reaction time”.'}
  ],
  tables: [{title: 'Which error, and what to do', headers: ['Problem', 'Type', 'Fix'], rows: [['Reaction time starting a stopwatch', 'random (and sometimes systematic)', 'time more swings or a longer fall; use light gates'], ['Balance reads 0.3 g with nothing on it', 'systematic (zero error)', 'zero the balance, or subtract 0.3 g'], ['Reading a meniscus from above', 'systematic (parallax)', 'read at eye level from the bottom of the meniscus'], ['Draughts moving a newton-meter', 'random', 'shield the apparatus; repeat and average']]}],
  labs: ['hanging-masses', 'yeast'],
  worked: [
    {q: 'Times for a ball to fall: 0.61 s, 0.64 s, 0.58 s, 0.92 s, 0.62 s. Find the mean and the uncertainty.', steps: ['0.92 s is an anomaly: leave it out.', 'Mean = (0.61 + 0.64 + 0.58 + 0.62) ÷ 4 = 2.45 ÷ 4 = 0.6125 ≈ 0.61 s.', 'Range = 0.64 − 0.58 = 0.06 s, so uncertainty = ±0.03 s.'], a: '0.61 ± 0.03 s'},
    {q: 'A length is measured as 25.0 cm with a ruler marked in mm. Find the percentage uncertainty.', steps: ['The uncertainty of a single ruler reading is about half the resolution, ±0.05 cm, but there are two ends, so take ±0.1 cm.', 'Percentage uncertainty = (uncertainty ÷ value) × 100.', '= (0.1 ÷ 25.0) × 100 = 0.4%.'], a: '0.4% (measuring a longer length makes the percentage uncertainty smaller).'}
  ],
  quiz: [
    {q: 'Four readings are 5.1, 5.1, 5.2, 5.1 g, but the true mass is 6.0 g. The readings are:', opts: ['accurate and precise', 'precise but not accurate', 'accurate but not precise', 'neither'], correct: 1, explain: 'They agree closely (precise) but are far from the true value (not accurate), suggesting a systematic error.'},
    {q: 'Which would reduce the effect of random error?', opts: ['Zeroing the balance', 'Taking repeat readings and finding a mean', 'Reading the scale at eye level', 'Using a different method'], correct: 1, explain: 'Random errors scatter both ways, so averaging cancels much of them out.'},
    {q: 'A thermometer always reads 2 °C too high. This is a:', opts: ['random error', 'zero / systematic error', 'anomaly', 'resolution problem'], correct: 1, explain: 'Every reading is wrong by the same amount: a systematic (zero) error.'},
    {q: 'What is the resolution of a measuring cylinder marked every 2 cm³?', opts: ['1 cm³', '2 cm³', '0.5 cm³', '10 cm³'], correct: 1, explain: 'Resolution is the smallest division the instrument shows: 2 cm³.'},
    {q: 'Readings 3.2, 3.4, 3.3, 3.5. What is the mean?', opts: ['3.3', '3.35', '3.4', '13.4'], correct: 1, explain: '(3.2 + 3.4 + 3.3 + 3.5) ÷ 4 = 13.4 ÷ 4 = 3.35.'}
  ],
  challenges: [
    {prompt: 'In the catalysts experiment, oxygen is collected in an upturned measuring cylinder. Suggest two sources of error and how each could be reduced.', marks: 4, answer: '1) Some gas escapes before the bung is put in, so the volume is too low (systematic): add the catalyst through a side arm, or put the catalyst in a small tube that is tipped over after sealing. 2) The cylinder’s scale is hard to read and has low resolution: use a gas syringe. Also: timing reaction error, so use a stopwatch and start it the moment the catalyst touches the peroxide; the temperature may vary, so use a water bath.'},
    {prompt: 'Explain why measuring the time for 20 swings of a pendulum, and dividing by 20, gives a better value for one swing than timing one swing.', marks: 2, answer: 'The reaction-time error (about 0.2 s) is the same whatever the total time, so over 20 swings it is a much smaller fraction of the time measured. Dividing by 20 also divides the error by 20, so the percentage uncertainty is much smaller.'}
  ],
  keywords: [['Accuracy', 'Closeness to the true value.'], ['Precision', 'Closeness of repeated readings to each other.'], ['Resolution', 'Smallest change an instrument can detect.'], ['Systematic error', 'A constant offset in every reading; repeats do not remove it.'], ['Random error', 'Unpredictable scatter; reduced by repeating and averaging.'], ['Parallax', 'Error from reading a scale at an angle.']],
  stretch: 'At A level, uncertainties are combined. When you add or subtract quantities, add their <em>absolute</em> uncertainties. When you multiply or divide, add their <em>percentage</em> uncertainties. When you raise to a power, multiply the percentage uncertainty by the power: if r has 2% uncertainty, the area πr² has 4%.',
  links: [['Save My Exams: errors and uncertainty', 'https://www.savemyexams.com/']]
});

lesson({id: 'maths', code: 'W4', subject: 'skills', title: 'Units, equations and numbers', level: 'GCSE',
  search: 'GCSE physics rearranging equations units standard form significant figures',
  intro: 'The Challenge gives you any equation you need, but you must use it fluently: rearrange it, convert units, and give an answer to sensible significant figures. This is how calculation marks are won.',
  goals: ['Rearrange an equation to make any quantity the subject', 'Convert between units, including cm³ and m³', 'Use standard form and prefixes', 'Round to significant figures sensibly'],
  points: [
    {tag: 'rule', title: 'Method for every calculation', text: '1 Write the equation. 2 Convert to standard units. 3 Rearrange. 4 Substitute. 5 Answer with a unit. You can still get marks for working even if the final answer is wrong.'},
    {tag: 'rule', title: 'Rearranging', text: 'Do the same to both sides. For a = b × c: b = a ÷ c and c = a ÷ b. The triangle trick works for these, but not for equations like v² = u² + 2as, so learn to rearrange properly.'},
    {tag: 'rule', title: 'SI units', text: 'Metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol). Derived: newton N = kg m/s², joule J = N m, watt W = J/s, pascal Pa = N/m².'},
    {tag: 'rule', title: 'Prefixes', text: 'G = 10⁹, M = 10⁶, k = 10³, c = 10⁻², m = 10⁻³, µ = 10⁻⁶, n = 10⁻⁹. So 3.2 kJ = 3200 J and 450 mA = 0.45 A.'},
    {tag: 'watch', title: 'Area and volume units', text: '1 m = 100 cm but 1 m² = 10 000 cm² and 1 m³ = 1 000 000 cm³. Also 1 dm³ = 1000 cm³ = 1 litre. Water has density 1 g/cm³ = 1000 kg/m³.'},
    {tag: 'rule', title: 'Standard form', text: 'A × 10ⁿ with 1 ≤ A < 10. 0.00056 = 5.6 × 10⁻⁴; 3 000 000 = 3 × 10⁶. Use the EXP or ×10ˣ key on your calculator.'},
    {tag: 'rule', title: 'Significant figures', text: 'Give your answer to the same number of significant figures as the least precise data in the question (usually 2 or 3). 0.004 560 has 4 s.f. (leading zeros do not count).'},
    {tag: 'tip', title: 'Sense check', text: 'Is the answer sensible? A person running at 300 m/s, or a density of 0.0002 g/cm³ for a metal, means a unit slip.'}
  ],
  tables: [{title: 'Equations the Challenge uses often (they are usually given)', headers: ['Quantity', 'Equation', 'Units'], rows: [['speed', 'v = d ÷ t', 'm/s'], ['density', 'ρ = m ÷ V', 'kg/m³ or g/cm³'], ['pressure', 'p = F ÷ A', 'Pa = N/m²'], ['moment', 'M = F × d', 'N m'], ['weight', 'W = m × g (g = 10 N/kg)', 'N'], ['gas at constant temperature', 'p₁V₁ = p₂V₂', 'any matching units'], ['Rf value', 'distance by spot ÷ distance by solvent', 'no units'], ['magnification', 'image size ÷ actual size', 'no units']]}],
  worked: [
    {q: 'A gas at 100 kPa has volume 240 cm³. It is squashed to 80 cm³ at constant temperature. Find the new pressure.', steps: ['p₁V₁ = p₂V₂, so p₂ = p₁V₁ ÷ V₂.', 'Units match on both sides (kPa and cm³), so no conversion is needed.', 'p₂ = 100 × 240 ÷ 80 = 300 kPa.', 'Check: volume went down to a third, so pressure went up 3 times. Sensible.'], a: '300 kPa'},
    {q: 'A block is 2.0 cm × 3.0 cm × 5.0 cm and has a mass of 81 g. Find its density in kg/m³.', steps: ['V = 2.0 × 3.0 × 5.0 = 30 cm³.', 'ρ = m ÷ V = 81 ÷ 30 = 2.7 g/cm³.', '1 g/cm³ = 1000 kg/m³, so ρ = 2700 kg/m³.', 'This is the density of aluminium.'], a: '2700 kg/m³ (2.7 g/cm³)'}
  ],
  quiz: [
    {q: 'Rearrange P = I × V to make I the subject.', opts: ['I = P × V', 'I = V ÷ P', 'I = P ÷ V', 'I = P − V'], correct: 2, explain: 'Divide both sides by V.'},
    {q: 'How many cm³ are in 1 m³?', opts: ['100', '1000', '10 000', '1 000 000'], correct: 3, explain: '100 × 100 × 100 = 1 000 000.'},
    {q: '0.000 47 in standard form is:', opts: ['4.7 × 10⁴', '4.7 × 10⁻⁴', '47 × 10⁻⁵', '0.47 × 10⁻³'], correct: 1, explain: 'Move the decimal point 4 places right to get 4.7, so the power is −4.'},
    {q: '3.4567 to 3 significant figures is:', opts: ['3.45', '3.46', '3.5', '3.457'], correct: 1, explain: 'The fourth figure (6) rounds the third (5) up to 6.'},
    {q: 'A car travels 1.5 km in 2 minutes. Its speed in m/s is:', opts: ['0.75', '12.5', '45', '750'], correct: 1, explain: '1500 m ÷ 120 s = 12.5 m/s.'}
  ],
  challenges: [
    {prompt: 'Eratosthenes found that the Sun’s rays at Alexandria were at 7.2° to the vertical when they were vertical at Syene, 800 km away. A full circle is 360°. Calculate the circumference of the Earth.', marks: 3, answer: '7.2° is 7.2/360 = 1/50 of a circle, so 800 km is 1/50 of the circumference. Circumference = 50 × 800 = 40 000 km.', note: 'This was in the specimen core paper. It is a ratio (proportion) problem dressed up in history.'},
    {prompt: 'Using v² = u² + 2as, find the speed of a stone dropped from rest after it has fallen 20 m (a = 10 m/s²).', marks: 3, answer: 'u = 0, so v² = 2 × 10 × 20 = 400, and v = √400 = 20 m/s.'}
  ],
  keywords: [['Subject (of an equation)', 'The quantity on its own on one side.'], ['SI unit', 'The standard international unit, e.g. kg, m, s.'], ['Standard form', 'A × 10ⁿ with 1 ≤ A < 10.'], ['Significant figures', 'The digits that carry meaning, counted from the first non-zero digit.']],
  stretch: 'A level uses <strong>homogeneity of units</strong>: both sides of a correct equation must have the same base units. For example, in E = ½mv² the right side has kg × (m/s)² = kg m² s⁻², which is the joule. If the units do not match, the equation is wrong. This is a quick way to check equations you are unsure of.',
  links: [['BBC Bitesize: maths skills for science', 'https://www.bbc.co.uk/bitesize/search?q=maths%20skills%20science%20gcse']]
});
