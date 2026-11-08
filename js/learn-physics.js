/* Lessons: physics (GCSE, with early A level stretch) */
'use strict';

lesson({id: 'motion', code: 'P1', subject: 'physics', title: 'Speed, velocity and motion graphs', level: 'GCSE → A level',
  search: 'GCSE physics distance time velocity time graphs acceleration', viz: 'motion',
  vizNote: 'Set a starting speed and an acceleration, then drive. Watch both graphs build at once.',
  intro: 'Motion graphs turn a journey into a picture. Read the gradient and the area correctly and most motion questions become easy.',
  goals: ['Use speed = distance ÷ time and acceleration = change in velocity ÷ time', 'Explain the difference between speed and velocity', 'Read distance–time and velocity–time graphs, including gradients and areas', 'Use the equation v² = u² + 2as'],
  points: [
    {tag: 'rule', title: 'Speed', text: 'speed = distance ÷ time (v = d/t), in m/s. Average speed uses the total distance and total time. Typical speeds: walking 1.5 m/s, cycling 6 m/s, sound in air 330 m/s.'},
    {tag: 'rule', title: 'Scalars and vectors', text: 'Speed and distance are <strong>scalars</strong> (size only). Velocity and displacement are <strong>vectors</strong> (size and direction). A car going round a roundabout at a steady speed has a changing velocity.'},
    {tag: 'rule', title: 'Acceleration', text: 'a = (v − u) ÷ t, in m/s². A negative acceleration is a deceleration. Objects falling freely near the Earth accelerate at about 10 m/s² (9.8 m/s²).'},
    {tag: 'rule', title: 'Distance–time graphs', text: 'Gradient = speed. A flat line means stationary; a straight sloping line means constant speed; a curve getting steeper means accelerating.'},
    {tag: 'rule', title: 'Velocity–time graphs', text: 'Gradient = acceleration. <strong>Area under the line = distance travelled</strong>. A flat line means constant velocity (zero acceleration, not stopped!).'},
    {tag: 'rule', title: 'The equation of motion', text: 'For constant acceleration: v² − u² = 2as, where u is starting velocity, v final velocity and s distance. Useful when time is not given.'},
    {tag: 'watch', title: 'Flat lines', text: 'A flat line on a d–t graph means stopped. A flat line on a v–t graph means moving at a steady speed. Always check the y-axis label first.'},
    {tag: 'tip', title: 'Areas', text: 'Split the area under a v–t graph into rectangles and triangles. Triangle area = ½ × base × height.'}
  ],
  labs: ['spinners'],
  worked: [
    {q: 'A cyclist speeds up from 4 m/s to 10 m/s in 3 s, then travels at 10 m/s for 5 s. Find the acceleration and the total distance.', steps: ['a = (10 − 4) ÷ 3 = 2 m/s².', 'Distance in first 3 s = area of trapezium = ½ × (4 + 10) × 3 = 21 m.', 'Distance in next 5 s = 10 × 5 = 50 m.', 'Total = 21 + 50 = 71 m.'], a: 'a = 2 m/s²; distance = 71 m'},
    {q: 'A car at 20 m/s brakes with a deceleration of 5 m/s². How far does it travel before stopping?', steps: ['Use v² = u² + 2as with v = 0, u = 20, a = −5.', '0 = 400 + 2 × (−5) × s.', '10s = 400, so s = 40 m.'], a: '40 m'}
  ],
  quiz: [
    {q: 'What does the gradient of a velocity–time graph give?', opts: ['Distance', 'Speed', 'Acceleration', 'Time'], correct: 2, explain: 'Change in velocity ÷ time = acceleration.'},
    {q: 'A horizontal line on a distance–time graph shows the object is:', opts: ['moving at constant speed', 'stationary', 'accelerating', 'decelerating'], correct: 1, explain: 'Distance is not changing, so it is not moving.'},
    {q: 'A sprinter goes from rest to 9 m/s in 3 s. Acceleration?', opts: ['27 m/s²', '3 m/s²', '6 m/s²', '0.33 m/s²'], correct: 1, explain: '(9 − 0) ÷ 3 = 3 m/s².'},
    {q: 'Which of these is a vector?', opts: ['Speed', 'Mass', 'Distance', 'Velocity'], correct: 3, explain: 'Velocity has a direction as well as a size.'},
    {q: 'The area under a velocity–time graph is 120 m. This is the:', opts: ['acceleration', 'distance travelled', 'average speed', 'time taken'], correct: 1, explain: 'Area = velocity × time = distance.'}
  ],
  challenges: [
    {prompt: 'An echo is heard 1.5 s after a shout towards a cliff. The speed of sound is 340 m/s. How far away is the cliff? Explain each step.', marks: 3, answer: 'The sound travels to the cliff and back, so total distance = 340 × 1.5 = 510 m. The cliff is half this: 255 m away.', note: 'The most common mistake is forgetting to halve.'},
    {prompt: 'A ball is thrown straight up at 15 m/s. Sketch its velocity–time graph until it is caught again at the same height, taking up as positive. Explain the shape.', marks: 3, answer: 'A straight line from +15 m/s sloping down through zero (at the top, after 1.5 s) to −15 m/s at 3 s. It is straight because the acceleration is constant (−10 m/s², the gradient). The velocity is negative after the top because it is moving down. The areas above and below the axis are equal, because it goes up and down the same distance.'}
  ],
  keywords: [['Velocity', 'Speed in a stated direction.'], ['Acceleration', 'Rate of change of velocity, m/s².'], ['Displacement', 'Distance in a straight line in a stated direction from the start.'], ['Gradient', 'Rate of change shown by the slope of a graph.']],
  stretch: 'A level uses all four <strong>suvat</strong> equations for constant acceleration: v = u + at, s = ut + ½at², s = ½(u + v)t and v² = u² + 2as. With them you can solve projectile problems by treating horizontal motion (constant velocity) and vertical motion (constant acceleration g) separately.',
  links: [['Save My Exams: motion graphs', 'https://www.savemyexams.com/']]
});

lesson({id: 'forces', code: 'P2', subject: 'physics', title: 'Forces and Newton’s laws', level: 'GCSE',
  search: 'GCSE physics resultant force newtons laws',
  intro: 'Forces explain why things start, stop and change direction. The Challenge asks you to draw force diagrams and to reason about balanced and unbalanced forces.',
  goals: ['Draw and label force diagrams', 'Find a resultant force', 'Use Newton’s three laws, including F = ma', 'Calculate weight with W = mg and explain terminal velocity'],
  points: [
    {tag: 'rule', title: 'What a force is', text: 'A push or pull, measured in newtons (N) with a newton-meter. Contact forces: friction, air resistance (drag), tension, normal reaction, upthrust. Non-contact forces: gravity (weight), magnetic, electrostatic.'},
    {tag: 'rule', title: 'Force diagrams', text: 'Draw arrows from the object; the length shows the size and the arrow shows the direction. Label each arrow with its name and size.'},
    {tag: 'rule', title: 'Resultant force', text: 'Add forces in the same direction; subtract opposite ones. If the resultant is zero the forces are <strong>balanced</strong>.'},
    {tag: 'rule', title: 'Newton’s first law', text: 'If the resultant force is zero, an object stays still or keeps moving at the same velocity. Balanced forces do <em>not</em> mean stopped.'},
    {tag: 'rule', title: 'Newton’s second law', text: 'Resultant force = mass × acceleration (F = ma). A bigger force gives a bigger acceleration; a bigger mass gives a smaller one. The tendency to resist a change in motion is <strong>inertia</strong>.'},
    {tag: 'rule', title: 'Newton’s third law', text: 'When A pushes on B, B pushes back on A with an equal force in the opposite direction. The two forces act on <em>different</em> objects, so they never cancel each other out.'},
    {tag: 'rule', title: 'Weight', text: 'W = m × g, where g is the gravitational field strength (10 N/kg on Earth, 1.6 N/kg on the Moon). Mass (kg) is the amount of matter and does not change; weight (N) is a force and does.'},
    {tag: 'rule', title: 'Terminal velocity', text: 'A falling skydiver speeds up; air resistance grows with speed until it equals the weight. The resultant force is then zero, so the speed stays constant: terminal velocity. Opening the parachute increases drag, so they slow to a new, lower terminal velocity.'}
  ],
  labs: ['hookes-law', 'spinners'],
  worked: [
    {q: 'A 1200 kg car has a driving force of 3000 N and total resistive forces of 600 N. Find its acceleration.', steps: ['Resultant force = 3000 − 600 = 2400 N forwards.', 'a = F ÷ m = 2400 ÷ 1200.', 'a = 2 m/s².'], a: '2 m/s² forwards'},
    {q: 'An astronaut has a mass of 70 kg. Find their weight on Earth and on the Moon.', steps: ['W = mg.', 'Earth: 70 × 10 = 700 N.', 'Moon: 70 × 1.6 = 112 N.', 'Mass is still 70 kg in both places.'], a: '700 N on Earth; 112 N on the Moon'}
  ],
  quiz: [
    {q: 'A book rests on a table. The third-law partner of the Earth pulling the book down is:', opts: ['the table pushing the book up', 'the book pulling the Earth up', 'the book pushing on the table', 'friction'], correct: 1, explain: 'Third-law pairs are the same type of force acting on two different objects: gravity, Earth on book and book on Earth.'},
    {q: 'A car moves at a constant 30 m/s on a straight road. The resultant force is:', opts: ['forwards', 'backwards', 'zero', 'equal to its weight'], correct: 2, explain: 'Constant velocity means zero acceleration, so zero resultant force (first law).'},
    {q: 'A force of 12 N acts on a 3 kg mass. Acceleration?', opts: ['36 m/s²', '4 m/s²', '0.25 m/s²', '15 m/s²'], correct: 1, explain: 'a = F/m = 12/3 = 4 m/s².'},
    {q: 'Which is NOT a contact force?', opts: ['Friction', 'Upthrust', 'Magnetic force', 'Tension'], correct: 2, explain: 'Magnets can act on each other without touching.'},
    {q: 'At terminal velocity, air resistance is:', opts: ['zero', 'less than the weight', 'equal to the weight', 'greater than the weight'], correct: 2, explain: 'The forces are balanced, so velocity is constant.'}
  ],
  challenges: [
    {prompt: 'Describe and explain the motion of a skydiver from jumping out of the plane until landing, using the ideas of forces. Include what happens when the parachute opens.', marks: 6, answer: 'At first the only force is weight, so they accelerate downwards at about 10 m/s². As speed increases, air resistance increases, so the resultant force and acceleration decrease. When air resistance equals weight, the resultant force is zero and they fall at terminal velocity. Opening the parachute greatly increases the surface area and air resistance, so air resistance is now greater than weight; the resultant force is upwards and they decelerate. As they slow, air resistance falls until it again equals weight, giving a new, lower terminal velocity for a safe landing.'},
    {prompt: 'A horse pulls a cart. A student says: “By Newton’s third law the cart pulls back on the horse with an equal force, so they can never move.” Explain the mistake.', marks: 3, answer: 'The two third-law forces act on different objects (one on the horse, one on the cart), so they cannot cancel. Whether the cart accelerates depends only on the forces acting on the cart: if the horse’s pull on it is greater than friction on the cart, the resultant on the cart is forwards and it accelerates. The horse moves forward because the ground pushes it forward (the reaction to its hooves pushing back on the ground).'}
  ],
  keywords: [['Resultant force', 'The single force that has the same effect as all the forces together.'], ['Inertia', 'The tendency of an object to keep doing what it is doing.'], ['Weight', 'The gravitational force on a mass, W = mg.'], ['Terminal velocity', 'The steady maximum speed when drag equals weight.']],
  stretch: 'A level writes Newton’s second law as <strong>F = Δp/Δt</strong>: force is the rate of change of <em>momentum</em> (p = mv). This explains crumple zones and airbags: they make the time of a collision longer, so the same change of momentum needs a smaller force.',
  links: [['Save My Exams: Newton’s laws', 'https://www.savemyexams.com/']]
});

lesson({id: 'springs', code: 'P3', subject: 'physics', title: 'Springs, stretching and Hooke’s law', level: 'GCSE',
  search: 'GCSE physics Hookes law extension spring constant',
  intro: 'Springs are a perfect practical: one variable, one measurement, and a graph with a clear rule that breaks down at the end. A classic Challenge data question.',
  goals: ['State Hooke’s law and use F = k × e', 'Measure extension correctly', 'Recognise the limit of proportionality on a graph', 'Calculate energy stored in a stretched spring'],
  points: [
    {tag: 'rule', title: 'Extension', text: 'Extension = stretched length − original length. Measure from the same point on the spring each time, with the ruler vertical and your eye level with the pointer.'},
    {tag: 'rule', title: 'Hooke’s law', text: 'The extension of a spring is directly proportional to the force applied, as long as the <strong>limit of proportionality</strong> is not passed: F = k × e.'},
    {tag: 'rule', title: 'Spring constant k', text: 'k measures stiffness, in N/m (or N/cm). A stiffer spring has a bigger k and stretches less for the same force. On a graph of force (y) against extension (x), k is the gradient.'},
    {tag: 'rule', title: 'Elastic and plastic', text: 'Up to the elastic limit, the spring returns to its original length when the force is removed (elastic). Beyond it the spring is permanently stretched (plastic deformation).'},
    {tag: 'rule', title: 'Springs in series and parallel', text: 'Two identical springs end to end (series): each feels the full force, so the extension doubles. Side by side (parallel): each takes half the force, so the extension halves.'},
    {tag: 'rule', title: 'Energy stored', text: 'Elastic potential energy E = ½ × k × e² (e in metres). It is also the area under a force–extension graph.'},
    {tag: 'watch', title: 'Length is not extension', text: 'A graph of total length against force is a straight line that does not go through the origin. Only extension against force goes through (0, 0).'}
  ],
  labs: ['hookes-law'],
  worked: [
    {q: 'A spring stretches 4.0 cm when a 2.0 N weight hangs on it. What weight gives 10.0 cm (below the limit of proportionality)? What is k?', steps: ['k = F ÷ e = 2.0 ÷ 4.0 = 0.50 N/cm (50 N/m).', 'F = k × e = 0.50 × 10.0 = 5.0 N.', 'Check by proportion: 2.5 times the extension needs 2.5 times the force.'], a: '5.0 N; k = 0.50 N/cm = 50 N/m'},
    {q: 'A spring with k = 200 N/m is stretched by 5.0 cm. How much energy is stored?', steps: ['Convert: e = 0.050 m.', 'E = ½ k e² = 0.5 × 200 × 0.050².', '= 0.5 × 200 × 0.0025 = 0.25 J.'], a: '0.25 J'}
  ],
  quiz: [
    {q: 'A spring is 12.0 cm long unstretched and 15.5 cm long with a load. The extension is:', opts: ['15.5 cm', '3.5 cm', '27.5 cm', '12.0 cm'], correct: 1, explain: '15.5 − 12.0 = 3.5 cm.'},
    {q: 'On a force–extension graph, the gradient of the straight part is:', opts: ['the spring constant', 'the elastic limit', 'the energy stored', 'the weight'], correct: 0, explain: 'k = F/e, which is the gradient when F is on the y-axis.'},
    {q: 'Two identical springs are hung in series. Compared with one spring, the extension for the same load is:', opts: ['half', 'the same', 'double', 'four times'], correct: 2, explain: 'Each spring feels the full load and stretches the same amount, so the total extension doubles.'},
    {q: 'A spring is stretched past its elastic limit. When the load is removed it:', opts: ['returns to its original length', 'stays permanently longer', 'snaps immediately', 'becomes shorter'], correct: 1, explain: 'That is plastic deformation.'},
    {q: 'A 300 g mass hangs on a spring. The force on the spring is (g = 10 N/kg):', opts: ['300 N', '30 N', '3 N', '0.3 N'], correct: 2, explain: '0.300 kg × 10 N/kg = 3 N.'}
  ],
  challenges: [
    {prompt: 'Results: force 0, 1, 2, 3, 4, 5 N; extension 0.0, 2.1, 4.0, 6.1, 8.0, 11.5 cm. Describe the pattern and explain what happened at 5 N.', marks: 3, answer: 'Up to 4 N the extension increases by about 2 cm for each newton: the extension is directly proportional to the force (Hooke’s law, k ≈ 0.5 N/cm). At 5 N the extension (11.5 cm) is much larger than the 10 cm the pattern predicts, so the spring has gone past its limit of proportionality. (It is not an anomaly if repeats agree; a repeat would tell you which.)'},
    {prompt: 'Explain why a car’s suspension uses springs with a large spring constant, but a newton-meter for weighing small masses uses a spring with a small one.', marks: 2, answer: 'A car is very heavy: a stiff spring (large k) gives only a small extension, so the car does not sink too far. A newton-meter for small forces needs a large, easily read extension for a small force, so it needs a weak spring (small k), which also gives better resolution.'}
  ],
  keywords: [['Hooke’s law', 'Extension is directly proportional to force up to the limit of proportionality.'], ['Spring constant', 'Force per unit extension, k = F/e.'], ['Elastic limit', 'Beyond this point an object does not return to its original shape.'], ['Plastic deformation', 'Permanent change in shape.']],
  stretch: 'For materials (not just springs), A level uses <strong>stress</strong> (force ÷ cross-sectional area) and <strong>strain</strong> (extension ÷ original length). The gradient of stress against strain is the <strong>Young modulus</strong>, a property of the material itself, so a thick and a thin steel wire have the same Young modulus but different spring constants.',
  links: [['Save My Exams: Hooke’s law', 'https://www.savemyexams.com/']]
});

lesson({id: 'moments', code: 'P4', subject: 'physics', title: 'Moments, levers and centre of mass', level: 'GCSE',
  search: 'GCSE physics moments principle of moments levers',
  intro: 'This is the physics behind the Hanging Masses specimen practical. Master the principle of moments and you can predict those newton-meter readings before you take them.',
  goals: ['Calculate a moment with M = F × d', 'Use the principle of moments to balance a beam', 'Explain how levers and gears multiply forces', 'Use centre of mass to explain stability, and solve a bar held by two supports'],
  points: [
    {tag: 'rule', title: 'Moment', text: 'The turning effect of a force: moment = force × <em>perpendicular</em> distance from the pivot to the line of the force. Units: N m (or N cm).'},
    {tag: 'rule', title: 'Principle of moments', text: 'For an object in balance: total clockwise moment = total anticlockwise moment, about any pivot.'},
    {tag: 'rule', title: 'Levers', text: 'A small force far from the pivot can balance a large force close to it. That is how spanners, crowbars and wheelbarrows make work easier. A longer handle means a bigger moment for the same force.'},
    {tag: 'rule', title: 'Centre of mass', text: 'The point where the whole weight seems to act. For a uniform bar it is in the middle. An object hanging freely comes to rest with its centre of mass directly below the pivot.'},
    {tag: 'rule', title: 'Stability', text: 'An object topples when its centre of mass moves outside its base, because its weight then gives a turning moment that tips it further. A low centre of mass and a wide base make it more stable.'},
    {tag: 'rule', title: 'A bar on two supports', text: 'For a beam held by two newton-meters, two rules apply: the readings add up to the total weight (forces balance up and down), and moments balance about any point. Moving a mass towards one meter increases that meter’s reading and decreases the other’s by the same amount, in a straight-line pattern.'},
    {tag: 'tip', title: 'Choose your pivot', text: 'When there are two unknown forces, take moments about the point where one of them acts. That force then has zero moment and disappears from the equation.'}
  ],
  labs: ['hanging-masses', 'moments'],
  worked: [
    {q: 'A 1.0 m light bar hangs from newton-meters A (at 0 cm) and B (at 100 cm). A 10 N weight hangs at 30 cm. Find both readings.', steps: ['Take moments about A, so A’s force disappears.', 'Clockwise: 10 N × 30 cm = 300 N cm. Anticlockwise: B × 100 cm.', 'B = 300 ÷ 100 = 3 N.', 'Forces balance: A + B = 10 N, so A = 7 N.', 'The meter nearer the mass takes more of the weight.'], a: 'A = 7 N, B = 3 N'},
    {q: 'A see-saw has a pivot in the middle. A 300 N child sits 2.0 m from the pivot. Where must a 400 N child sit to balance it?', steps: ['Anticlockwise moment = 300 × 2.0 = 600 N m.', 'Clockwise moment = 400 × d.', '400d = 600, so d = 1.5 m.'], a: '1.5 m from the pivot, on the other side'}
  ],
  quiz: [
    {q: 'A 20 N force acts 0.5 m from a pivot. The moment is:', opts: ['40 N m', '10 N m', '20.5 N m', '0.025 N m'], correct: 1, explain: '20 × 0.5 = 10 N m.'},
    {q: 'Why is it easier to open a door by pushing near the handle than near the hinge?', opts: ['The force is smaller', 'The distance from the pivot is larger, so the moment is larger', 'There is less friction', 'The door is lighter there'], correct: 1, explain: 'Moment = force × distance. More distance gives more turning effect for the same force.'},
    {q: 'A bar is held by two meters reading 6 N and 4 N. The total weight of the bar and masses is:', opts: ['2 N', '10 N', '24 N', '1.5 N'], correct: 1, explain: 'The upward forces must balance the total weight: 6 + 4 = 10 N.'},
    {q: 'Which change makes a bus less likely to topple?', opts: ['Putting luggage on the roof', 'A higher centre of mass', 'A lower centre of mass', 'A narrower base'], correct: 2, explain: 'A lower centre of mass means it must tilt further before the weight acts outside the base.'},
    {q: 'In the Hanging Masses practical, the mass moves 1 cm towards meter A each time. Meter A’s reading:', opts: ['stays the same', 'increases by the same amount each step', 'decreases', 'doubles each step'], correct: 1, explain: 'The reading changes linearly with position: equal steps in position give equal changes in reading.'}
  ],
  challenges: [
    {prompt: 'In the specimen practical, a 100 g mass at 7.5 cm gives meter readings X and Y. Predict what happens to the readings if the mass is replaced by one twice as heavy at the same place. Explain using moments.', marks: 3, answer: 'The part of each reading caused by the bar’s own weight stays the same. The part caused by the mass doubles, because its weight doubles and the distances (and so the moments) are unchanged. So each meter increases by the same extra amount it gained when the first mass was added. In other words: new reading = reading with the bar alone + 2 × (old reading − reading with the bar alone).', note: 'Very similar to Q4 of the specimen practical paper. Use the lab to test your prediction.'},
    {prompt: 'A uniform 2.0 m plank weighing 100 N rests on a pivot 0.5 m from one end. What downward force at that end will balance it?', marks: 3, answer: 'The weight acts at the centre, 1.0 m from the end, so 0.5 m from the pivot on the long side: moment = 100 × 0.5 = 50 N m. The force acts 0.5 m from the pivot on the short side: F × 0.5 = 50, so F = 100 N.'}
  ],
  keywords: [['Moment', 'Turning effect of a force, force × perpendicular distance.'], ['Pivot (fulcrum)', 'The point about which something turns.'], ['Principle of moments', 'In equilibrium, clockwise moments = anticlockwise moments.'], ['Centre of mass', 'The point at which the weight of an object can be taken to act.'], ['Equilibrium', 'No resultant force and no resultant moment.']],
  stretch: 'At A level a <strong>couple</strong> is a pair of equal and opposite forces that are not in line. It produces turning without any resultant force, like hands on a steering wheel. Its moment (torque) is one force × the perpendicular distance between them.',
  links: [['Save My Exams: moments', 'https://www.savemyexams.com/']]
});

lesson({id: 'pressure', code: 'P5', subject: 'physics', title: 'Pressure in solids, liquids and gases', level: 'GCSE → A level',
  search: 'GCSE physics pressure liquids gases Boyles law',
  intro: 'Snowshoes, dams, syringes and the specimen paper’s gas laws all come down to one idea: how a force is spread over an area.',
  goals: ['Calculate pressure with p = F ÷ A', 'Explain why pressure in a liquid increases with depth, and use p = hρg', 'Explain gas pressure using particles', 'Use Boyle’s law p₁V₁ = p₂V₂'],
  points: [
    {tag: 'rule', title: 'Pressure', text: 'pressure = force ÷ area, in pascals (Pa = N/m²). A sharp knife has a tiny area, so a high pressure; snowshoes and tractor tyres spread the weight over a large area, so a low pressure.'},
    {tag: 'rule', title: 'Pressure in liquids', text: 'Pressure increases with depth, because there is more liquid above pushing down. It acts equally in all directions. That is why dams are thicker at the bottom and water spurts furthest from the lowest hole in a can.'},
    {tag: 'rule', title: 'p = hρg', text: 'Pressure due to a liquid column = depth × density × g. For water: every 10 m of depth adds about 100 kPa, roughly one extra atmosphere.'},
    {tag: 'rule', title: 'Gas pressure', text: 'Gas particles move randomly and collide with the walls. Each collision exerts a tiny force; together they give a pressure. More collisions per second, or harder collisions, mean more pressure.'},
    {tag: 'rule', title: 'Changing a gas', text: 'Heat it (fixed volume): particles move faster, hit harder and more often, so pressure rises. Squash it (fixed temperature): the same particles hit the walls more often, so pressure rises.'},
    {tag: 'rule', title: 'Boyle’s law', text: 'For a fixed mass of gas at constant temperature, pV = constant: p₁V₁ = p₂V₂. Halve the volume and the pressure doubles. A graph of p against V is a curve; p against 1/V is a straight line through the origin.'},
    {tag: 'rule', title: 'Atmospheric pressure', text: 'About 100 000 Pa (100 kPa) at sea level, caused by the weight of the air above. It decreases with height, which is why ears “pop” on a plane.'},
    {tag: 'watch', title: 'Area units', text: '1 cm² = 0.0001 m². A force of 10 N on 1 cm² is 100 000 Pa, not 10 Pa.'}
  ],
  labs: ['density'],
  worked: [
    {q: 'A 600 N person stands on one foot of area 150 cm². Find the pressure on the floor.', steps: ['A = 150 cm² = 150 ÷ 10 000 = 0.015 m².', 'p = F ÷ A = 600 ÷ 0.015.', 'p = 40 000 Pa (40 kPa).'], a: '40 000 Pa'},
    {q: 'Find the extra pressure on a diver at 25 m depth in sea water (density 1030 kg/m³, g = 10 N/kg).', steps: ['p = hρg.', '= 25 × 1030 × 10.', '= 257 500 Pa ≈ 260 kPa (on top of the 100 kPa of air above).'], a: 'about 2.6 × 10⁵ Pa'}
  ],
  quiz: [
    {q: 'Why do camels have wide feet?', opts: ['To increase the force on the sand', 'To decrease the pressure on the sand', 'To increase their weight', 'To increase the pressure'], correct: 1, explain: 'The same weight over a bigger area gives a lower pressure, so they sink less.'},
    {q: 'A gas syringe is pushed in slowly (constant temperature). The pressure increases because:', opts: ['the particles move faster', 'the particles get bigger', 'the particles hit the walls more often', 'more particles are made'], correct: 2, explain: 'Same particles, same speed, smaller space: more collisions per second with each part of the wall.'},
    {q: 'Gas at 200 kPa in 50 cm³ expands to 125 cm³ at constant temperature. New pressure?', opts: ['500 kPa', '80 kPa', '250 kPa', '40 kPa'], correct: 1, explain: 'p₂ = 200 × 50 ÷ 125 = 80 kPa.'},
    {q: 'A can of water has holes at three heights. Water spurts furthest from:', opts: ['the top hole', 'the middle hole', 'the bottom hole', 'they are all the same'], correct: 2, explain: 'Pressure is greatest at the greatest depth.'},
    {q: '50 N acts on 0.25 m². The pressure is:', opts: ['12.5 Pa', '200 Pa', '50.25 Pa', '0.005 Pa'], correct: 1, explain: '50 ÷ 0.25 = 200 Pa.'}
  ],
  challenges: [
    {prompt: 'Empedocles’ clepsydra had holes in the bottom and an open top. When he put his thumb over the top and lifted it out of water, the water stayed inside. Explain this using pressure.', marks: 3, answer: 'With the top sealed, no air can get in above the water. If a little water fell out, the trapped air above would expand and its pressure would drop below atmospheric. The atmospheric pressure pushing up on the water at the holes is then greater than the pressure inside pushing down, so it holds the water in. When the thumb is removed, air enters, the pressures equalise, and the water falls out.', note: 'This experiment was the context of a specimen core paper question.'},
    {prompt: 'A diver’s lungs hold 6.0 litres of air at the surface (100 kPa). What would that air’s volume be at 20 m depth, where the total pressure is 300 kPa, if the temperature is constant? Why must divers breathing compressed air never hold their breath while rising?', marks: 3, answer: 'V₂ = p₁V₁ ÷ p₂ = 100 × 6.0 ÷ 300 = 2.0 litres. Going the other way, air breathed in at depth expands as the pressure falls on the way up (to three times its volume from 20 m), which could burst the lungs, so divers breathe out as they rise.'}
  ],
  keywords: [['Pressure', 'Force per unit area, in pascals.'], ['Pascal (Pa)', '1 N/m².'], ['Boyle’s law', 'pV is constant for a fixed mass of gas at constant temperature.'], ['Atmospheric pressure', 'Pressure caused by the weight of air above, about 100 kPa at sea level.']],
  stretch: 'Boyle’s law is part of the <strong>ideal gas equation</strong> pV = nRT, where T is in kelvin (°C + 273), n is the number of moles and R = 8.31 J/(mol K). It also explains why pressure is proportional to absolute temperature at fixed volume, and why temperatures can never go below absolute zero (0 K = −273 °C), where particles would stop moving.',
  links: [['Save My Exams: pressure', 'https://www.savemyexams.com/']]
});

lesson({id: 'density-matter', code: 'P6', subject: 'physics', title: 'Density, changes of state and heating', level: 'GCSE',
  search: 'GCSE physics density specific heat capacity latent heat',
  intro: 'Why does ice float, why does the kettle’s temperature stop rising, and how do you find the density of a stone? This lesson links particles to measurements.',
  goals: ['Calculate density and measure it for regular and irregular objects', 'Use the particle model to explain changes of state', 'Use specific heat capacity, E = mcΔθ', 'Explain latent heat and the flat parts of a heating curve'],
  points: [
    {tag: 'rule', title: 'Density', text: 'density = mass ÷ volume (ρ = m/V), in g/cm³ or kg/m³. Water is 1.0 g/cm³. Objects less dense than a liquid float in it.'},
    {tag: 'rule', title: 'Measuring volume', text: 'Regular solid: measure length × width × height. Irregular solid: displacement, using a eureka (displacement) can or the rise in water level in a measuring cylinder.'},
    {tag: 'rule', title: 'Particles and states', text: 'Solids: particles close, in a regular pattern, vibrating. Liquids: close but random, moving past each other. Gases: far apart, fast, random. Gases are usually about 1000 times less dense than solids.'},
    {tag: 'rule', title: 'Changes of state', text: 'Melting, freezing, boiling, evaporating, condensing and subliming are <strong>physical changes</strong>: no new substance forms and mass is conserved.'},
    {tag: 'rule', title: 'Specific heat capacity', text: 'The energy needed to raise 1 kg of a substance by 1 °C. E = m × c × Δθ. Water has a very high c (4200 J/(kg °C)), so it heats up and cools down slowly.'},
    {tag: 'rule', title: 'Latent heat', text: 'While a substance melts or boils, its temperature stays the same even though energy is going in. The energy breaks the bonds between particles instead of making them move faster. E = m × L.'},
    {tag: 'watch', title: 'Evaporation versus boiling', text: 'Evaporation happens at any temperature, only at the surface, as the fastest particles escape (so the liquid left behind cools). Boiling happens throughout the liquid at one temperature, the boiling point.'}
  ],
  viz: 'particles', vizNote: 'Heat a block of ice from −40 °C until it is steam. Watch the particles and the heating curve together.',
  labs: ['density', 'distillation'],
  worked: [
    {q: 'A stone of mass 135 g raises the water in a measuring cylinder from 50 cm³ to 100 cm³. Find its density.', steps: ['V = 100 − 50 = 50 cm³.', 'ρ = m ÷ V = 135 ÷ 50.', 'ρ = 2.7 g/cm³.'], a: '2.7 g/cm³'},
    {q: 'How much energy heats 2.0 kg of water from 20 °C to 100 °C? (c = 4200 J/(kg °C))', steps: ['Δθ = 100 − 20 = 80 °C.', 'E = mcΔθ = 2.0 × 4200 × 80.', 'E = 672 000 J = 672 kJ.'], a: '6.72 × 10⁵ J'}
  ],
  quiz: [
    {q: 'A 40 cm³ block has a mass of 360 g. Its density is:', opts: ['0.11 g/cm³', '9 g/cm³', '14 400 g/cm³', '320 g/cm³'], correct: 1, explain: '360 ÷ 40 = 9 g/cm³ (about the density of copper).'},
    {q: 'While ice is melting, its temperature:', opts: ['rises steadily', 'falls', 'stays at 0 °C', 'jumps to 100 °C'], correct: 2, explain: 'The energy is used to break bonds (latent heat), so the temperature stays at the melting point.'},
    {q: 'Which object will float in water (density 1.0 g/cm³)?', opts: ['Density 2.7 g/cm³', 'Density 1.3 g/cm³', 'Density 0.9 g/cm³', 'Density 7.9 g/cm³'], correct: 2, explain: 'Only objects less dense than water float.'},
    {q: 'Why does sweating cool you down?', opts: ['Sweat is cold', 'The fastest particles evaporate, lowering the average energy of those left', 'Sweat reflects heat', 'Sweat increases blood flow'], correct: 1, explain: 'Evaporation removes the most energetic particles, so the remaining liquid (and your skin) cools.'},
    {q: 'In which state are particles far apart and moving fast in all directions?', opts: ['Solid', 'Liquid', 'Gas', 'All of them'], correct: 2, explain: 'That describes a gas.'}
  ],
  challenges: [
    {prompt: 'Explain, using particles, why the mass of water stays the same when it freezes but the volume increases (ice floats).', marks: 3, answer: 'Freezing is a physical change: the same particles are present, so the mass is unchanged. In ice, water molecules are held in an open, regular arrangement that takes up more space than in liquid water, so the volume increases. Same mass in a bigger volume means a lower density, so ice floats on water.', note: 'Water is unusual: most substances are densest as solids.'},
    {prompt: 'Describe how to find the density of a small, irregular piece of rock. Name the equipment and say how to make the result as accurate as possible.', marks: 4, answer: 'Measure the mass on a zeroed electronic balance. Fill a eureka can until water drips from the spout; when it stops, put a measuring cylinder under the spout and lower the rock in on a thread. The volume of water collected is the volume of the rock. Read the cylinder at eye level from the bottom of the meniscus. Density = mass ÷ volume. Repeat and average; use a smaller cylinder (higher resolution) for a small volume; make sure no air bubbles cling to the rock.'}
  ],
  keywords: [['Density', 'Mass per unit volume.'], ['Displacement', 'Finding volume by the liquid an object pushes aside.'], ['Specific heat capacity', 'Energy to raise 1 kg by 1 °C.'], ['Latent heat', 'Energy to change state without changing temperature.'], ['Sublimation', 'Changing straight from solid to gas.']],
  stretch: 'At A level, <strong>internal energy</strong> is the sum of the random kinetic and potential energies of all the particles. Heating at a melting point raises the potential energy (particles move further apart against their attractions) but not the kinetic energy, which is why the temperature, a measure of average kinetic energy, does not change.',
  links: [['Save My Exams: density', 'https://www.savemyexams.com/']]
});

lesson({id: 'energy', code: 'P7', subject: 'physics', title: 'Energy, work, power and efficiency', level: 'GCSE',
  search: 'GCSE physics energy stores transfers efficiency power',
  intro: 'Energy is never made or destroyed, only moved between stores. The Challenge expects clear descriptions of energy transfers and confident calculations.',
  goals: ['Name energy stores and the ways energy is transferred', 'Calculate kinetic and gravitational potential energy', 'Calculate work done, power and efficiency', 'Compare renewable and non-renewable energy resources'],
  points: [
    {tag: 'rule', title: 'Stores', text: 'Kinetic, gravitational potential, elastic potential, chemical, thermal (internal), magnetic, electrostatic and nuclear.'},
    {tag: 'rule', title: 'Transfers', text: 'Energy moves between stores by heating, by forces doing work (mechanically), by an electric current, and by radiation (light, sound). Example: a falling apple, gravitational store → kinetic store.'},
    {tag: 'rule', title: 'Conservation of energy', text: 'Energy cannot be created or destroyed. The total stays the same, but some always ends up as <strong>wasted</strong> energy, usually in thermal stores of the surroundings.'},
    {tag: 'rule', title: 'Two key equations', text: 'Kinetic energy E<sub>k</sub> = ½mv². Gravitational potential energy E<sub>p</sub> = mgh. A falling object (ignoring air resistance) turns mgh into ½mv².'},
    {tag: 'rule', title: 'Work done', text: 'Work done = force × distance moved in the direction of the force (W = Fd), in joules. Doing work transfers energy: 1 J is the work done by 1 N moving 1 m.'},
    {tag: 'rule', title: 'Power', text: 'Power = energy transferred ÷ time (P = E/t), in watts. 1 W = 1 J/s. A more powerful motor transfers the same energy in less time.'},
    {tag: 'rule', title: 'Efficiency', text: 'efficiency = useful output energy ÷ total input energy (× 100 for a %). It can never be more than 100%. Reduce waste by lubricating, insulating and streamlining.'},
    {tag: 'rule', title: 'Resources', text: 'Non-renewable: coal, oil, gas (burning releases CO₂), nuclear. Renewable: solar, wind, hydroelectric, tidal, wave, geothermal, biofuel. Renewables do not run out but some are unreliable (no wind, no sun at night).'}
  ],
  labs: ['heating-mass'],
  worked: [
    {q: 'A 2.0 kg ball is dropped from 5.0 m. Ignoring air resistance, how fast is it moving when it hits the ground?', steps: ['E<sub>p</sub> lost = mgh = 2.0 × 10 × 5.0 = 100 J.', 'This becomes kinetic energy: ½mv² = 100.', '½ × 2.0 × v² = 100, so v² = 100 and v = 10 m/s.', 'Notice the mass cancels: any object dropped from 5 m reaches 10 m/s.'], a: '10 m/s'},
    {q: 'A motor lifts a 50 kg load 12 m in 20 s. The motor uses 8000 J of electrical energy. Find the useful power and the efficiency.', steps: ['Useful energy = mgh = 50 × 10 × 12 = 6000 J.', 'Useful power = 6000 ÷ 20 = 300 W.', 'Efficiency = 6000 ÷ 8000 = 0.75 = 75%.'], a: '300 W; 75%'}
  ],
  quiz: [
    {q: 'A kettle is 90% efficient. Where does most of the wasted 10% go?', opts: ['It is destroyed', 'Thermal store of the surroundings (and some as sound)', 'Chemical store of the water', 'Back to the power station'], correct: 1, explain: 'Energy is never destroyed: it heats the kettle body and the air, and some is transferred as sound.'},
    {q: 'A 60 W bulb is on for 10 s. Energy transferred?', opts: ['6 J', '600 J', '70 J', '0.17 J'], correct: 1, explain: 'E = Pt = 60 × 10 = 600 J.'},
    {q: 'If a car’s speed doubles, its kinetic energy:', opts: ['doubles', 'stays the same', 'quadruples', 'halves'], correct: 2, explain: 'E<sub>k</sub> = ½mv², so doubling v multiplies E<sub>k</sub> by 2² = 4.'},
    {q: 'Which resource is renewable?', opts: ['Natural gas', 'Uranium', 'Tidal', 'Coal'], correct: 2, explain: 'The tides are driven by the Moon and never run out.'},
    {q: 'Pushing a box 4 m with a 25 N force does how much work?', opts: ['6.25 J', '29 J', '100 J', '21 J'], correct: 2, explain: 'W = Fd = 25 × 4 = 100 J.'}
  ],
  challenges: [
    {prompt: 'Describe the energy transfers in a pendulum swinging, and explain why it eventually stops.', marks: 4, answer: 'At the top of each swing the bob is momentarily still: energy is in the gravitational potential store. As it falls it speeds up, transferring energy to the kinetic store, which is greatest at the bottom. It then slows as it rises, moving energy back to the gravitational store. On each swing, air resistance and friction at the pivot do work, transferring some energy to thermal stores of the surroundings, so the amplitude decreases until it stops. The total energy is conserved throughout.'},
    {prompt: 'A student climbs stairs 3.0 m high in 4.0 s. Their mass is 60 kg. Calculate their useful power, and suggest why their body actually transfers much more energy than this.', marks: 3, answer: 'Energy = mgh = 60 × 10 × 3.0 = 1800 J; power = 1800 ÷ 4.0 = 450 W. Muscles are only about 25% efficient: most of the chemical energy from respiration is transferred to thermal stores (they get hot and sweat).'}
  ],
  keywords: [['Energy store', 'A way energy is held, e.g. kinetic or chemical.'], ['Work done', 'Energy transferred by a force moving through a distance.'], ['Power', 'Rate of energy transfer, in watts.'], ['Efficiency', 'Useful output ÷ total input.'], ['Dissipated', 'Spread out into the surroundings, so less useful.']],
  stretch: 'A level explores why energy spreads out: the <strong>second law of thermodynamics</strong> says that in any real process the total disorder (entropy) of the universe increases. That is why no heat engine can be 100% efficient, and why the wasted thermal energy cannot easily be gathered back up.',
  links: [['Save My Exams: energy', 'https://www.savemyexams.com/']]
});

lesson({id: 'electricity', code: 'P8', subject: 'physics', title: 'Electric circuits', level: 'GCSE → A level',
  search: 'GCSE physics series parallel circuits current potential difference resistance',
  intro: 'Current, potential difference and resistance are linked by one equation, and series and parallel circuits behave in two opposite ways. Learn both sets of rules side by side.',
  goals: ['Draw circuit diagrams with standard symbols', 'Measure current and potential difference correctly', 'Use V = IR and P = IV', 'State the rules for series and parallel circuits'],
  points: [
    {tag: 'rule', title: 'Current', text: 'The rate of flow of charge, measured in amps (A) with an <strong>ammeter in series</strong>. In metals it is a flow of electrons. Current is not used up: it is the same all the way round a series loop.'},
    {tag: 'rule', title: 'Potential difference', text: 'The energy transferred per unit of charge between two points, in volts (V), measured with a <strong>voltmeter in parallel</strong> across the component.'},
    {tag: 'rule', title: 'Resistance', text: 'How hard it is for current to flow: R = V ÷ I, in ohms (Ω). For a fixed resistor at constant temperature, current is directly proportional to p.d. (Ohm’s law). A filament lamp’s resistance rises as it heats up.'},
    {tag: 'rule', title: 'Series circuits', text: 'One loop. Same current everywhere. The supply p.d. is <em>shared</em> between components. Total resistance = R₁ + R₂. One bulb breaks: all go out.'},
    {tag: 'rule', title: 'Parallel circuits', text: 'Several branches. Each branch gets the <em>full</em> supply p.d. The currents in the branches add up to the total. Adding a branch <em>lowers</em> the total resistance. One bulb breaks: the others stay lit. Houses are wired in parallel.'},
    {tag: 'rule', title: 'Power and energy', text: 'P = I × V (watts). Energy = P × t. Fuses and circuit breakers cut the current if it gets too high, protecting the wiring from overheating.'},
    {tag: 'rule', title: 'Special components', text: 'LDR: resistance falls as light increases. Thermistor: resistance falls as temperature rises. Diode: lets current flow one way only.'},
    {tag: 'watch', title: 'Voltmeters across, ammeters in line', text: 'An ammeter connected in parallel will short-circuit the component (it has almost no resistance). A voltmeter in series will stop the current (it has a huge resistance).'}
  ],
  tables: [{title: 'Series vs parallel', headers: ['', 'Series', 'Parallel'], rows: [['Current', 'same everywhere', 'splits between branches; branch currents add up'], ['Potential difference', 'shared; adds up to the supply', 'same across each branch as the supply'], ['Total resistance', 'R₁ + R₂ (bigger)', 'smaller than the smallest branch'], ['If one lamp fails', 'all go out', 'others stay on']]}],
  labs: ['circuits', 'electromagnet'],
  worked: [
    {q: 'A 12 V battery is connected to a 4 Ω and an 8 Ω resistor in series. Find the current and the p.d. across each.', steps: ['Total R = 4 + 8 = 12 Ω.', 'I = V ÷ R = 12 ÷ 12 = 1.0 A (the same through both).', 'V across 4 Ω = 1.0 × 4 = 4 V; across 8 Ω = 1.0 × 8 = 8 V.', 'Check: 4 + 8 = 12 V, the supply p.d.'], a: '1.0 A; 4 V and 8 V'},
    {q: 'Two 6 Ω resistors are in parallel across a 6 V supply. Find the current from the supply.', steps: ['Each branch has the full 6 V.', 'Current in each = 6 ÷ 6 = 1.0 A.', 'Total = 1.0 + 1.0 = 2.0 A.', 'So the total resistance is 6 ÷ 2.0 = 3 Ω, less than either resistor.'], a: '2.0 A'}
  ],
  quiz: [
    {q: 'How is a voltmeter connected?', opts: ['In series', 'In parallel across the component', 'Either way', 'Only next to the battery'], correct: 1, explain: 'It compares the energy per charge either side of the component.'},
    {q: 'A lamp has 3 V across it and 0.5 A through it. Its resistance is:', opts: ['1.5 Ω', '6 Ω', '0.17 Ω', '3.5 Ω'], correct: 1, explain: 'R = V/I = 3 ÷ 0.5 = 6 Ω.'},
    {q: 'In a parallel circuit, adding another lamp in a new branch makes the total current from the cell:', opts: ['decrease', 'stay the same', 'increase', 'zero'], correct: 2, explain: 'The new branch draws its own current, and total resistance falls.'},
    {q: 'The resistance of an LDR when it gets darker:', opts: ['increases', 'decreases', 'stays the same', 'becomes zero'], correct: 0, explain: 'LDRs have high resistance in the dark, which is why they are used in automatic night lights.'},
    {q: 'A 230 V kettle draws 10 A. Its power is:', opts: ['23 W', '240 W', '2300 W', '2.3 W'], correct: 2, explain: 'P = IV = 10 × 230 = 2300 W.'}
  ],
  challenges: [
    {prompt: 'Explain why the lights in a house are wired in parallel rather than in series. Give two reasons.', marks: 2, answer: 'Each light gets the full mains p.d., so each is fully bright. Each can be switched on and off on its own, and if one bulb fails the others stay on.'},
    {prompt: 'A student plots current against p.d. for a filament lamp and gets a curve that flattens as p.d. increases. Explain the shape.', marks: 3, answer: 'As the current increases, the filament gets hotter. The metal ions vibrate more, so electrons collide with them more often, and the resistance increases. The current therefore increases less for each extra volt, so the graph’s gradient (I/V = 1/R) gets smaller and the curve flattens.'}
  ],
  keywords: [['Current', 'Rate of flow of charge, amps.'], ['Potential difference', 'Energy transferred per unit charge, volts.'], ['Resistance', 'Opposition to current, R = V/I, ohms.'], ['Series', 'Components in one loop.'], ['Parallel', 'Components on separate branches.']],
  stretch: 'At A level, charge Q = It (in coulombs), and V = W/Q (energy per coulomb). Parallel resistors combine as 1/R = 1/R₁ + 1/R₂. Real batteries have an <strong>internal resistance</strong> r, so the p.d. at the terminals is less than the e.m.f. when a current flows: V = ε − Ir.',
  links: [['Save My Exams: circuits', 'https://www.savemyexams.com/']]
});

lesson({id: 'magnetism', code: 'P9', subject: 'physics', title: 'Magnetism and electromagnetism', level: 'GCSE',
  search: 'GCSE physics magnetic fields electromagnet motor effect',
  intro: 'Magnets, compasses and electric motors are all about magnetic fields. You need to draw fields, build an electromagnet and explain how a motor turns.',
  goals: ['Draw magnetic field lines around bar magnets and wires', 'Describe how to make an electromagnet stronger', 'Explain the motor effect', 'Use the idea of induction for generators and transformers'],
  points: [
    {tag: 'rule', title: 'Magnets', text: 'Like poles repel, unlike poles attract. Magnetic materials: iron, steel, nickel, cobalt. Only <em>repulsion</em> proves that something is a magnet, because a magnet attracts plain iron too.'},
    {tag: 'rule', title: 'Field lines', text: 'Go from north to south outside the magnet. Closer lines mean a stronger field. Plot them with a plotting compass or iron filings. The Earth has a magnetic field, so a compass points north.'},
    {tag: 'rule', title: 'Electromagnets', text: 'A current in a wire makes a circular magnetic field around it. A coil (solenoid) makes a field like a bar magnet. Stronger by: more turns, more current, an iron core. Electromagnets can be switched off, which is why scrapyard cranes and relays use them.'},
    {tag: 'rule', title: 'The motor effect', text: 'A current-carrying wire in a magnetic field feels a force. Bigger current or stronger field means bigger force. Reverse the current or the field and the force reverses. Fleming’s left-hand rule gives the direction: First finger = Field, seCond = Current, thuMb = Motion.'},
    {tag: 'rule', title: 'Electric motors', text: 'A coil in a magnetic field has forces in opposite directions on its two sides, so it turns. A split-ring commutator reverses the current every half turn so it keeps turning the same way.'},
    {tag: 'rule', title: 'Induction', text: 'Moving a wire through a magnetic field (or moving a magnet in a coil) induces a p.d. Faster movement, a stronger magnet or more turns gives more p.d. Generators use this; transformers use it to change a.c. voltages.'},
    {tag: 'watch', title: 'Iron and steel', text: 'Soft iron magnetises and demagnetises easily, so it is used for electromagnet cores. Steel stays magnetised, so it is used for permanent magnets.'}
  ],
  labs: ['electromagnet'],
  worked: [
    {q: 'An electromagnet with 20 turns picks up 8 paperclips at 1 A. Predict how many it might pick up with 40 turns at 1 A, and with 20 turns at 2 A.', steps: ['Field strength is roughly proportional to (number of turns × current).', '40 turns × 1 A doubles this: about 16 clips.', '20 turns × 2 A also doubles it: about 16 clips.', 'In reality it levels off as the iron core becomes saturated.'], a: 'about 16 in each case'},
    {q: 'The force on a wire in a magnetic field is F = BIL. Find the force on a 0.20 m wire carrying 3.0 A in a field of 0.050 T.', steps: ['F = B × I × L.', '= 0.050 × 3.0 × 0.20.', '= 0.030 N.'], a: '0.030 N'}
  ],
  quiz: [
    {q: 'Which test proves that a metal bar is a magnet?', opts: ['It attracts iron', 'It attracts another magnet', 'It repels one pole of a magnet', 'It conducts electricity'], correct: 2, explain: 'Only two magnets can repel. Attraction happens to unmagnetised iron as well.'},
    {q: 'Which does NOT make an electromagnet stronger?', opts: ['More turns', 'More current', 'Iron core', 'Using thicker insulation'], correct: 3, explain: 'Insulation has no effect on the magnetic field.'},
    {q: 'Field lines outside a bar magnet go from:', opts: ['south to north', 'north to south', 'the middle outwards', 'nowhere: they are circles'], correct: 1, explain: 'By convention they point the way a north pole would be pushed.'},
    {q: 'In an electric motor, what reverses the current each half turn?', opts: ['The magnet', 'The split-ring commutator', 'The brushes', 'The iron core'], correct: 1, explain: 'The commutator swaps the connections so the coil keeps turning one way.'},
    {q: 'Which material is best for the core of an electromagnet?', opts: ['Steel', 'Soft iron', 'Copper', 'Aluminium'], correct: 1, explain: 'Soft iron is easily magnetised and loses its magnetism when the current stops.'}
  ],
  challenges: [
    {prompt: 'Plan an investigation into how the number of turns of wire affects the strength of an electromagnet. Include how you would measure strength and what you would keep the same.', marks: 5, answer: 'IV: number of turns (10, 20, 30, 40, 50) on an iron nail. DV: the number of paperclips picked up (or the mass of iron held, or the reading on a balance when a magnet is attracted). Controls: the current (keep it the same using a variable resistor and ammeter), the same nail, the same size of paperclip, the same wire. Turn off between readings so the wire does not overheat. Repeat each three times and find the mean; plot a line graph of mean clips against turns.'},
    {prompt: 'Explain why an electric bell rings continuously when the switch is held down.', marks: 4, answer: 'Current flows through the electromagnet, which attracts the iron armature, so the hammer hits the gong. Moving the armature breaks the contact, so the current stops and the electromagnet switches off. A spring pulls the armature back, remaking the contact, so the current flows again. This repeats many times a second.'}
  ],
  keywords: [['Magnetic field', 'Region where a magnetic material or magnet feels a force.'], ['Solenoid', 'A long coil of wire that acts like a bar magnet when current flows.'], ['Motor effect', 'Force on a current-carrying wire in a magnetic field.'], ['Induction', 'Producing a p.d. by changing the magnetic field through a conductor.']],
  stretch: 'A level defines the tesla (T) using F = BIL and links induction to <strong>magnetic flux</strong>. Faraday’s law says the induced e.m.f. equals the rate of change of flux linkage, and Lenz’s law says the induced current always opposes the change that caused it: a consequence of conservation of energy.',
  links: [['Save My Exams: electromagnetism', 'https://www.savemyexams.com/']]
});

lesson({id: 'waves', code: 'P10', subject: 'physics', title: 'Waves, sound and light', level: 'GCSE → A level',
  search: 'GCSE physics waves wave equation sound light refraction', viz: 'wave',
  vizNote: 'Change the frequency and speed and watch the wavelength change. Switch to longitudinal to see sound.',
  intro: 'Waves carry energy without carrying matter. One equation, v = fλ, works for every wave, and light and sound behave in ways you can predict.',
  goals: ['Describe transverse and longitudinal waves', 'Use v = f × λ', 'Explain reflection and refraction of light', 'Describe sound, hearing range and the electromagnetic spectrum'],
  points: [
    {tag: 'rule', title: 'Two kinds of wave', text: '<strong>Transverse</strong>: vibrations at right angles to the direction of travel (light, water ripples). <strong>Longitudinal</strong>: vibrations along the direction of travel, with compressions and rarefactions (sound).'},
    {tag: 'rule', title: 'Describing waves', text: 'Amplitude: maximum displacement from rest. Wavelength (λ): length of one complete wave. Frequency (f): waves per second, in hertz. Period T = 1/f.'},
    {tag: 'rule', title: 'The wave equation', text: 'wave speed = frequency × wavelength: v = fλ.'},
    {tag: 'rule', title: 'Sound', text: 'Needs a medium (it cannot travel through a vacuum). Faster in solids than in air (air ≈ 340 m/s). Louder = bigger amplitude; higher pitch = higher frequency. Humans hear about 20 Hz to 20 000 Hz; the top limit falls with age. Above 20 kHz is ultrasound.'},
    {tag: 'rule', title: 'Light', text: 'Travels at 3 × 10⁸ m/s in a vacuum, much faster than sound (which is why you see lightning before you hear thunder). It travels in straight lines, so shadows form.'},
    {tag: 'rule', title: 'Reflection', text: 'Angle of incidence = angle of reflection, both measured from the <strong>normal</strong> (a line at 90° to the surface).'},
    {tag: 'rule', title: 'Refraction', text: 'Light changes speed, and so direction, when it enters a new material. Into glass (slower): bends towards the normal. Out into air: bends away. A prism splits white light into a spectrum because each colour refracts by a different amount (dispersion); violet bends most.'},
    {tag: 'rule', title: 'The EM spectrum', text: 'Radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma: increasing frequency and energy, decreasing wavelength. All travel at the speed of light in a vacuum.'}
  ],
  labs: ['light', 'sound'],
  worked: [
    {q: 'A sound wave has frequency 680 Hz in air (v = 340 m/s). Find its wavelength.', steps: ['v = fλ, so λ = v ÷ f.', 'λ = 340 ÷ 680.', 'λ = 0.50 m.'], a: '0.50 m'},
    {q: 'You count 3 s between seeing lightning and hearing thunder. How far away is the storm?', steps: ['Light arrives almost instantly, so the 3 s is the time for the sound.', 'd = v × t = 340 × 3.', '≈ 1000 m, about 1 km.'], a: 'about 1 km'}
  ],
  quiz: [
    {q: 'Sound cannot travel through:', opts: ['water', 'steel', 'a vacuum', 'air'], correct: 2, explain: 'Sound needs particles to pass on the vibrations.'},
    {q: 'A wave has frequency 5 Hz and wavelength 2 m. Its speed is:', opts: ['2.5 m/s', '10 m/s', '7 m/s', '0.4 m/s'], correct: 1, explain: 'v = fλ = 5 × 2 = 10 m/s.'},
    {q: 'Light passing from air into glass:', opts: ['speeds up and bends away from the normal', 'slows down and bends towards the normal', 'does not change direction at any angle', 'stops'], correct: 1, explain: 'Glass is optically denser, so light slows and bends towards the normal (unless it hits along the normal).'},
    {q: 'Which colour is refracted most by a prism?', opts: ['Red', 'Green', 'Yellow', 'Violet'], correct: 3, explain: 'Violet has the shortest wavelength and slows the most in glass.'},
    {q: 'A higher-pitched note has a:', opts: ['bigger amplitude', 'higher frequency', 'longer wavelength', 'lower speed'], correct: 1, explain: 'Pitch depends on frequency.'}
  ],
  challenges: [
    {prompt: 'Explain why a straw in a glass of water looks bent at the surface.', marks: 3, answer: 'Light from the part of the straw under water refracts away from the normal as it leaves the water into air, because it speeds up. Your brain assumes light travels in straight lines, so it traces the ray back to a point that is higher than the real straw. The underwater part therefore appears raised, so the straw looks bent.'},
    {prompt: 'A bell ringing in a sealed jar becomes quieter as the air is pumped out, but you can still see it moving. What does this show about sound and light?', marks: 2, answer: 'Sound needs a medium (particles) to travel, so as the air is removed less sound reaches you. Light does not need a medium; it can travel through a vacuum, so you can still see the bell.'}
  ],
  keywords: [['Amplitude', 'Maximum displacement from the rest position.'], ['Frequency', 'Number of waves per second, Hz.'], ['Wavelength', 'Distance from one point on a wave to the same point on the next.'], ['Normal', 'A line at 90° to a surface where a ray hits it.'], ['Refraction', 'Change in direction when a wave changes speed.']],
  stretch: 'A level makes refraction quantitative with <strong>Snell’s law</strong>: n₁ sin θ₁ = n₂ sin θ₂, where n is the refractive index (glass ≈ 1.5). Above the <strong>critical angle</strong>, light trying to leave glass is totally internally reflected, which is how optical fibres carry internet signals. A level also covers superposition, interference and diffraction, which prove light is a wave.',
  links: [['Save My Exams: waves', 'https://www.savemyexams.com/']]
});

lesson({id: 'space', code: 'P11', subject: 'physics', title: 'Space, gravity and the Earth', level: 'GCSE',
  search: 'GCSE physics solar system orbits gravity seasons',
  intro: 'From why we have seasons to how Eratosthenes measured the Earth with a stick, space questions test whether you can apply simple physics to huge scales.',
  goals: ['Describe the Solar System and the forces that keep orbits going', 'Explain day and night, seasons, phases of the Moon and eclipses', 'Explain how weight changes with g', 'Use light-years and other big numbers'],
  points: [
    {tag: 'rule', title: 'The Solar System', text: 'The Sun (a star), eight planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune), dwarf planets such as Pluto, moons, asteroids and comets. The Solar System is one of billions in the Milky Way galaxy.'},
    {tag: 'rule', title: 'Gravity and orbits', text: 'Every mass attracts every other mass. Gravity provides the force towards the centre that keeps planets and moons moving in (nearly) circular orbits. The further from the Sun, the weaker the pull, so the slower a planet moves and the longer its year.'},
    {tag: 'rule', title: 'Day, year and seasons', text: 'Day and night: the Earth spins on its axis once every 24 hours. Year: one orbit of the Sun. Seasons: the Earth’s axis is tilted at 23.5°. In summer your hemisphere tilts towards the Sun, so the Sun is higher, days are longer and the sunlight is more concentrated. It is <em>not</em> because we are closer to the Sun.'},
    {tag: 'rule', title: 'The Moon', text: 'Orbits the Earth about every 27 days. We see phases because we see different amounts of its sunlit half. Solar eclipse: the Moon passes between the Sun and Earth. Lunar eclipse: the Earth’s shadow falls on the Moon.'},
    {tag: 'rule', title: 'Weight in space', text: 'g is 10 N/kg on Earth, 1.6 N/kg on the Moon and 26 N/kg on Jupiter. Your mass is the same everywhere; your weight changes.'},
    {tag: 'rule', title: 'Light-years', text: 'A light-year is a <em>distance</em>: how far light travels in a year, about 9.5 × 10¹² km. The nearest star after the Sun is about 4.2 light-years away.'},
    {tag: 'tip', title: 'Shadow geometry', text: 'Sunlight arrives in parallel rays. Different shadow angles at the same moment in two places prove that the Earth is curved, which is how Eratosthenes measured its size around 240 BC.'}
  ],
  worked: [
    {q: 'Light from the Sun takes about 500 s to reach the Earth. Light travels at 3.0 × 10⁸ m/s. How far is the Sun?', steps: ['d = v × t.', '= 3.0 × 10⁸ × 500.', '= 1.5 × 10¹¹ m (150 million km).'], a: '1.5 × 10¹¹ m'},
    {q: 'An 80 kg astronaut weighs how much on Mars, where g = 3.7 N/kg?', steps: ['W = mg.', '= 80 × 3.7.', '= 296 N (compared with 800 N on Earth).'], a: 'about 300 N'}
  ],
  quiz: [
    {q: 'What causes the seasons on Earth?', opts: ['The Earth’s changing distance from the Sun', 'The tilt of the Earth’s axis', 'The Moon’s orbit', 'Sunspots'], correct: 1, explain: 'The tilt changes the height of the Sun in the sky and the length of the day through the year.'},
    {q: 'A light-year is a unit of:', opts: ['time', 'speed', 'distance', 'brightness'], correct: 2, explain: 'It is the distance light travels in one year.'},
    {q: 'What force keeps the Moon in orbit around the Earth?', opts: ['Magnetism', 'Gravity', 'Friction', 'Air resistance'], correct: 1, explain: 'The Earth’s gravity pulls the Moon towards the Earth’s centre.'},
    {q: 'A solar eclipse happens when:', opts: ['the Earth is between the Sun and Moon', 'the Moon is between the Sun and Earth', 'the Sun is between the Earth and Moon', 'the Moon is full'], correct: 1, explain: 'The Moon blocks the Sun’s light from reaching part of the Earth.'},
    {q: 'Which planet has the longest year?', opts: ['Mercury', 'Earth', 'Jupiter', 'Neptune'], correct: 3, explain: 'It is furthest from the Sun, so it has the longest orbit and moves slowest (about 165 Earth years).'}
  ],
  challenges: [
    {prompt: 'Explain why, at midday in June, a stick in London casts a shorter shadow than the same stick at midday in December.', marks: 3, answer: 'In June the northern hemisphere is tilted towards the Sun, so the Sun is higher in the sky at midday. Light arrives at a steeper angle, closer to vertical, so the shadow is shorter. In December the hemisphere tilts away, the Sun is lower and the shadow is longer.'},
    {prompt: 'Why do astronauts on the International Space Station float, even though the Earth’s gravity there is still about 90% as strong as on the ground?', marks: 3, answer: 'The station and the astronauts are all in free fall: they are constantly falling towards the Earth, but moving sideways so fast (about 7.7 km/s) that they keep missing it, so they orbit. Because everything falls together at the same rate, nothing presses on the floor, and they feel weightless. Gravity has not disappeared; it is providing the force that keeps them in orbit.'}
  ],
  keywords: [['Orbit', 'The curved path of one body around another, kept by gravity.'], ['Gravitational field strength', 'Force of gravity per kg, g, in N/kg.'], ['Light-year', 'Distance light travels in one year.'], ['Galaxy', 'A huge group of billions of stars held together by gravity.']],
  stretch: 'At A level, Newton’s law of gravitation gives the force between two masses: F = GMm/r². It is an <strong>inverse square law</strong>: double the distance and the force falls to a quarter. Setting this equal to the force needed for circular motion (mv²/r) explains Kepler’s third law, that T² is proportional to r³.',
  links: [['Save My Exams: space physics', 'https://www.savemyexams.com/']]
});
