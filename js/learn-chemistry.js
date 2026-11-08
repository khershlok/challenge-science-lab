/* Lessons: chemistry (GCSE, with early A level stretch) */
'use strict';

lesson({id: 'particles', code: 'C1', subject: 'chemistry', title: 'Particles, states and diffusion', level: 'GCSE',
  search: 'GCSE chemistry states of matter particle model diffusion', viz: 'particles',
  vizNote: 'Heat ice until it becomes steam. Notice the flat parts of the graph, where the state changes.',
  intro: 'Everything in chemistry is made of particles too small to see. This lesson builds the model you will use to explain melting, dissolving, diffusion and gas pressure.',
  goals: ['Describe the arrangement and movement of particles in solids, liquids and gases', 'Name and explain the changes of state', 'Explain diffusion and what affects its rate', 'Explain dissolving and the difference between solute, solvent and solution'],
  points: [
    {tag: 'rule', title: 'Solids', text: 'Particles touching, in a regular arrangement, vibrating about fixed positions. Fixed shape and volume; cannot be compressed.'},
    {tag: 'rule', title: 'Liquids', text: 'Particles touching but randomly arranged, able to move past each other. Fixed volume, but take the shape of the container; flow.'},
    {tag: 'rule', title: 'Gases', text: 'Particles far apart, moving quickly and randomly in all directions. Fill the container; can be compressed because there is space between the particles.'},
    {tag: 'rule', title: 'Changes of state', text: 'Melting, boiling and subliming need energy put in to overcome the forces between particles. Freezing and condensing release energy. The stronger the forces, the higher the melting and boiling points.'},
    {tag: 'rule', title: 'Diffusion', text: 'The net movement of particles from an area of high concentration to low concentration, caused by their random movement. Fastest in gases, slower in liquids, almost none in solids. It is faster at higher temperature and for lighter particles.'},
    {tag: 'rule', title: 'Dissolving', text: 'A <strong>solute</strong> (e.g. salt) dissolves in a <strong>solvent</strong> (e.g. water) to make a <strong>solution</strong>. The solute particles spread out between the solvent particles. Mass is conserved: 100 g water + 5 g salt = 105 g solution.'},
    {tag: 'rule', title: 'Ammonia and hydrogen chloride', text: 'In the classic tube experiment, a white ring of ammonium chloride forms nearer the hydrochloric acid end. Ammonia molecules (M<sub>r</sub> 17) are lighter than hydrogen chloride molecules (M<sub>r</sub> 36.5), so they diffuse faster and travel further.'},
    {tag: 'watch', title: 'Particles do not change', text: 'When something melts, the particles do not melt or get bigger. Only their arrangement and movement change. When a gas is heated, the particles move faster, they do not expand.'}
  ],
  labs: ['diffusion', 'distillation'],
  worked: [
    {q: 'In a 100 cm tube, ammonia (from the left) and hydrogen chloride (from the right) meet. The ring forms 59 cm from the ammonia end. Explain this.', steps: ['The ring is where the two gases meet and react: NH₃ + HCl → NH₄Cl.', 'Ammonia has travelled 59 cm; hydrogen chloride only 41 cm in the same time.', 'So ammonia diffuses faster.', 'This is because ammonia particles have a smaller mass (17 vs 36.5), so they move faster at the same temperature.'], a: 'Ammonia particles are lighter, so they diffuse faster and travel further before meeting.'},
    {q: 'A crystal of potassium manganate(VII) is placed in cold water and another in hot water. Predict and explain what you see.', steps: ['The purple colour spreads out through the water by diffusion in both.', 'In hot water the particles have more energy and move faster.', 'So the colour spreads more quickly in hot water.'], a: 'The purple colour spreads faster in the hot water, because the particles move faster.'}
  ],
  quiz: [
    {q: 'Why can gases be compressed but liquids cannot (easily)?', opts: ['Gas particles are smaller', 'There are large spaces between gas particles', 'Gas particles are lighter', 'Liquids are colder'], correct: 1, explain: 'In a liquid the particles are already touching.'},
    {q: 'Which change of state releases energy to the surroundings?', opts: ['Melting', 'Boiling', 'Condensing', 'Subliming'], correct: 2, explain: 'Condensing and freezing release energy as forces between particles form.'},
    {q: 'Diffusion is fastest in:', opts: ['a solid', 'a liquid', 'a gas', 'all the same'], correct: 2, explain: 'Gas particles move fastest and have the most space.'},
    {q: 'In salt water, the water is the:', opts: ['solute', 'solvent', 'solution', 'precipitate'], correct: 1, explain: 'The solvent does the dissolving.'},
    {q: 'A substance melts at −7 °C and boils at 59 °C. At 20 °C it is a:', opts: ['solid', 'liquid', 'gas', 'plasma'], correct: 1, explain: '20 °C is between the melting and boiling points. (This is bromine.)'}
  ],
  challenges: [
    {prompt: 'A student puts a drop of perfume in one corner of a room. After a few minutes it can be smelt across the room. Use the particle model to explain this, and explain why it takes longer in a cold room.', marks: 4, answer: 'Perfume evaporates: the particles escape into the air. They move randomly, colliding with air particles, and spread from where the concentration is high to where it is low (diffusion) until they reach your nose. In a cold room the particles have less kinetic energy and move more slowly, so diffusion is slower.'},
    {prompt: 'The melting point of sodium chloride is 801 °C; the melting point of water is 0 °C. What does this suggest about the forces between their particles?', marks: 2, answer: 'Much more energy is needed to separate the particles in sodium chloride, so the forces between its particles (strong ionic bonds between oppositely charged ions in a giant lattice) are much stronger than the forces between water molecules (weak intermolecular forces).'}
  ],
  keywords: [['Diffusion', 'Net movement of particles from high to low concentration.'], ['Solute', 'The substance that dissolves.'], ['Solvent', 'The liquid it dissolves in.'], ['Soluble', 'Able to dissolve.'], ['Sublimation', 'Solid to gas directly, e.g. dry ice.']],
  stretch: 'At A level, <strong>Graham’s law</strong> says the rate of diffusion of a gas is inversely proportional to the square root of its relative molecular mass. For ammonia and hydrogen chloride: rate ratio = √(36.5/17) ≈ 1.47, which predicts the ring at about 59 cm along a 100 cm tube, matching experiments.',
  links: [['Save My Exams: states of matter', 'https://www.savemyexams.com/']]
});

lesson({id: 'atoms', code: 'C2', subject: 'chemistry', title: 'Atoms, elements, compounds and mixtures', level: 'GCSE → A level',
  search: 'GCSE chemistry atomic structure protons neutrons electrons isotopes', viz: 'atom',
  vizNote: 'Slide through the first 20 elements. Watch how the electron shells fill, and how that sets the group.',
  intro: 'An atom is mostly empty space, with a tiny nucleus and electrons around it. How those electrons are arranged explains the whole periodic table.',
  goals: ['Tell elements, compounds and mixtures apart', 'Describe protons, neutrons and electrons', 'Work out numbers of particles from atomic and mass numbers', 'Write electron arrangements and explain isotopes'],
  points: [
    {tag: 'rule', title: 'Element, compound, mixture', text: '<strong>Element</strong>: one type of atom (about 118 known). <strong>Compound</strong>: two or more elements <em>chemically joined</em> in fixed proportions (H₂O). <strong>Mixture</strong>: substances not chemically joined, which can be separated by physical methods (air, sea water).'},
    {tag: 'rule', title: 'Inside the atom', text: 'Proton: charge +1, mass 1, in the nucleus. Neutron: charge 0, mass 1, in the nucleus. Electron: charge −1, mass almost 0 (1/1840), in shells around the nucleus.'},
    {tag: 'rule', title: 'Atomic number and mass number', text: 'Atomic number = number of protons (and electrons, in a neutral atom). Mass number = protons + neutrons. So neutrons = mass number − atomic number. Sodium, mass 23 and atomic number 11, has 12 neutrons.'},
    {tag: 'rule', title: 'Electron shells', text: 'The first shell holds 2, the next 8, then 8 (for the first 20 elements). Sodium: 2, 8, 1. Chlorine: 2, 8, 7.'},
    {tag: 'rule', title: 'Isotopes', text: 'Atoms of the same element with different numbers of neutrons, e.g. carbon-12 and carbon-14. Same chemistry (same electrons), different mass.'},
    {tag: 'rule', title: 'Relative atomic mass', text: 'The average mass of an element’s atoms, allowing for isotopes. Chlorine is 75% chlorine-35 and 25% chlorine-37, so A<sub>r</sub> = (75 × 35 + 25 × 37) ÷ 100 = 35.5.'},
    {tag: 'rule', title: 'History of the model', text: 'Dalton: solid spheres. Thomson: plum pudding (electrons in a positive ball). Rutherford: gold foil experiment showed a tiny, dense, positive nucleus. Bohr: electrons in shells. Chadwick: discovered the neutron.'},
    {tag: 'watch', title: 'Compounds are not like their elements', text: 'Sodium (a reactive metal) and chlorine (a poisonous gas) make sodium chloride, table salt. A compound has completely new properties; a mixture keeps the properties of its parts.'}
  ],
  worked: [
    {q: 'How many protons, neutrons and electrons are in an atom of potassium, mass number 39, atomic number 19? Give its electron arrangement.', steps: ['Protons = atomic number = 19.', 'Electrons = 19 (neutral atom).', 'Neutrons = 39 − 19 = 20.', 'Shells: 2, 8, 8, 1, so it is in group 1, period 4.'], a: '19 p, 20 n, 19 e; 2, 8, 8, 1'},
    {q: 'Copper is 69% copper-63 and 31% copper-65. Find its relative atomic mass.', steps: ['A<sub>r</sub> = (69 × 63 + 31 × 65) ÷ 100.', '= (4347 + 2015) ÷ 100.', '= 63.62 ≈ 63.6.'], a: '63.6'}
  ],
  quiz: [
    {q: 'Which of these is a compound?', opts: ['Oxygen', 'Air', 'Carbon dioxide', 'Iron'], correct: 2, explain: 'CO₂ has carbon and oxygen chemically joined. Air is a mixture.'},
    {q: 'An atom has 8 protons, 8 neutrons and 8 electrons. Its mass number is:', opts: ['8', '16', '24', '0'], correct: 1, explain: 'Mass number = protons + neutrons = 16 (oxygen-16).'},
    {q: 'What did Rutherford’s gold foil experiment show?', opts: ['Electrons exist', 'Atoms have a small, dense, positive nucleus', 'Neutrons exist', 'Atoms are solid spheres'], correct: 1, explain: 'Most alpha particles passed straight through, but a few bounced back off something tiny and positive.'},
    {q: 'Isotopes of an element have different numbers of:', opts: ['protons', 'electrons', 'neutrons', 'shells'], correct: 2, explain: 'Same protons (same element), different neutrons.'},
    {q: 'The electron arrangement 2, 8, 2 belongs to:', opts: ['sodium', 'magnesium', 'calcium', 'neon'], correct: 1, explain: '12 electrons, so atomic number 12: magnesium.'}
  ],
  challenges: [
    {prompt: 'Iron filings and sulfur powder are mixed, then heated strongly to make iron sulfide. Give two ways to show that the mixture and the product are different.', marks: 4, answer: '1) A magnet pulls the iron filings out of the mixture, but does not attract iron sulfide, since the iron is chemically joined. 2) The mixture can be separated by physical means and contains yellow and grey bits; iron sulfide is a new black solid with different properties. Also: heating gave out energy (glowing), a sign that a chemical reaction happened. Adding acid gives hydrogen with the mixture but toxic hydrogen sulfide with the compound.'},
    {prompt: 'Explain why isotopes of the same element have the same chemical reactions.', marks: 2, answer: 'Chemical reactions depend on electrons, especially the outer shell. Isotopes have the same number of protons and so the same number and arrangement of electrons. Only the number of neutrons, and so the mass, differs.'}
  ],
  keywords: [['Element', 'A substance made of only one type of atom.'], ['Compound', 'Two or more elements chemically bonded.'], ['Mixture', 'Substances together but not chemically bonded.'], ['Isotope', 'Same element, different number of neutrons.'], ['Atomic number', 'Number of protons.']],
  stretch: 'A level replaces simple shells with <strong>sub-shells</strong> and orbitals: s, p, d and f. Sodium is 1s² 2s² 2p⁶ 3s¹. This explains why the transition metals appear after calcium (the 3d sub-shell fills after 4s), and why ionisation energies jump when an electron is removed from a new, inner shell.',
  links: [['Save My Exams: atomic structure', 'https://www.savemyexams.com/']]
});

lesson({id: 'periodic', code: 'C3', subject: 'chemistry', title: 'The periodic table and its groups', level: 'GCSE',
  search: 'GCSE chemistry periodic table group 1 group 7 noble gases',
  intro: 'Mendeleev arranged the elements so that similar ones lined up in columns, and he left gaps for elements nobody had found yet. Knowing the patterns means you can predict how an unfamiliar element behaves.',
  goals: ['Explain how the periodic table is arranged', 'Describe and explain trends in group 1, group 7 and group 0', 'Compare metals and non-metals', 'Predict properties of an unfamiliar element'],
  points: [
    {tag: 'rule', title: 'Arrangement', text: 'Elements are in order of atomic number. <strong>Groups</strong> are columns: same number of outer electrons, so similar reactions. <strong>Periods</strong> are rows: same number of shells.'},
    {tag: 'rule', title: 'Metals and non-metals', text: 'Metals (left and centre) are shiny, conduct heat and electricity, are malleable, and form positive ions. Their oxides are basic. Non-metals (top right) are usually dull, brittle insulators with low melting points; their oxides are acidic.'},
    {tag: 'rule', title: 'Group 1: alkali metals', text: 'Soft metals stored under oil. React with water to give hydrogen and an alkaline hydroxide: 2Na + 2H₂O → 2NaOH + H₂. <strong>More reactive going down</strong>, because the outer electron is further from the nucleus and more shielded, so it is lost more easily. Lithium fizzes; potassium bursts into lilac flame.'},
    {tag: 'rule', title: 'Group 7: halogens', text: 'Non-metals made of pairs of atoms (Cl₂). Fluorine pale yellow gas, chlorine green gas, bromine red-brown liquid, iodine grey solid. <strong>Less reactive going down</strong>, because the extra electron they gain is attracted less strongly by a nucleus further away.'},
    {tag: 'rule', title: 'Halogen displacement', text: 'A more reactive halogen displaces a less reactive one from its salt: chlorine + potassium bromide → potassium chloride + bromine (the solution turns orange).'},
    {tag: 'rule', title: 'Group 0: noble gases', text: 'Full outer shell, so very unreactive. Used in lights (neon), balloons (helium, less dense than air) and welding (argon). Boiling point increases down the group.'},
    {tag: 'tip', title: 'Predicting', text: 'For an unfamiliar element, find its group and continue the trend. Rubidium (group 1, below potassium) will react even more violently with water.'}
  ],
  worked: [
    {q: 'Astatine is below iodine in group 7. Predict its state at room temperature, its colour and its reactivity compared with iodine.', steps: ['Down group 7 melting and boiling points increase: gas → gas → liquid → solid.', 'Colours get darker going down.', 'Reactivity decreases going down.'], a: 'A dark (black) solid, less reactive than iodine.'},
    {q: 'Chlorine water is added to potassium iodide solution. What would you see and why? Write a word equation.', steps: ['Chlorine is above iodine, so it is more reactive.', 'It displaces iodine from the solution.', 'Chlorine + potassium iodide → potassium chloride + iodine.', 'Iodine in solution is brown.'], a: 'The colourless solution turns brown as iodine forms.'}
  ],
  quiz: [
    {q: 'Why do elements in the same group react similarly?', opts: ['Same number of shells', 'Same number of outer electrons', 'Same mass', 'Same number of neutrons'], correct: 1, explain: 'Reactions involve the outer electrons.'},
    {q: 'Which alkali metal reacts most vigorously with water?', opts: ['Lithium', 'Sodium', 'Potassium', 'They are the same'], correct: 2, explain: 'Reactivity increases down group 1.'},
    {q: 'Bromine water is added to sodium chloride solution. What happens?', opts: ['Chlorine is displaced', 'No reaction', 'Sodium is displaced', 'Hydrogen is released'], correct: 1, explain: 'Bromine is less reactive than chlorine, so it cannot displace it.'},
    {q: 'Helium is used in party balloons because it is:', opts: ['flammable and dense', 'unreactive and less dense than air', 'coloured', 'a metal'], correct: 1, explain: 'It is safe (unreactive) and lighter than air, so the balloon floats.'},
    {q: 'Which is a property of most non-metals?', opts: ['Good conductor of electricity', 'Shiny', 'Low boiling point', 'Malleable'], correct: 2, explain: 'Most non-metals are simple molecules with weak forces between them. (Graphite is an exception that conducts.)'}
  ],
  challenges: [
    {prompt: 'Explain fully why potassium is more reactive than sodium.', marks: 3, answer: 'Both have one outer electron, which they lose when they react. Potassium’s outer electron is in the fourth shell, further from the nucleus than sodium’s (third shell), and more shielded by inner shells. So it is attracted less strongly and is lost more easily.'},
    {prompt: 'Mendeleev left gaps in his table and predicted “eka-silicon”. When germanium was found in 1886 it matched. Why did this make scientists accept his table?', marks: 2, answer: 'A scientific idea is convincing when it makes predictions that are later confirmed. Mendeleev predicted the properties (density, oxide formula, atomic mass) of undiscovered elements from the patterns in the groups, and these turned out to be correct, which showed the table reflected a real pattern in nature.'}
  ],
  keywords: [['Group', 'A column; same number of outer electrons.'], ['Period', 'A row; same number of electron shells.'], ['Alkali metal', 'Group 1 element.'], ['Halogen', 'Group 7 element.'], ['Displacement', 'A more reactive element takes the place of a less reactive one in a compound.']],
  stretch: 'At A level, trends are explained with <strong>ionisation energy</strong> (energy to remove an electron), <strong>electronegativity</strong> (how strongly an atom attracts bonding electrons) and atomic radius. Across a period the nuclear charge increases while shielding stays similar, so atoms get smaller and hold their electrons more tightly.',
  links: [['Save My Exams: periodic table', 'https://www.savemyexams.com/']]
});

lesson({id: 'bonding', code: 'C4', subject: 'chemistry', title: 'Bonding, structure and properties', level: 'GCSE → A level',
  search: 'GCSE chemistry ionic covalent metallic bonding structure properties',
  intro: 'Why does salt have a high melting point but wax a low one? Why does copper conduct but diamond not? It all depends on the type of bond and the structure.',
  goals: ['Describe ionic, covalent and metallic bonding', 'Draw dot-and-cross diagrams for simple examples', 'Link structure to melting point, conductivity and hardness', 'Compare diamond and graphite'],
  points: [
    {tag: 'rule', title: 'Ionic bonding', text: 'Between a metal and a non-metal. The metal atom <em>transfers</em> electrons to the non-metal, making positive and negative ions with full outer shells: Na (2,8,1) → Na⁺ (2,8); Cl (2,8,7) → Cl⁻ (2,8,8). Oppositely charged ions attract strongly.'},
    {tag: 'rule', title: 'Giant ionic lattices', text: 'Huge regular arrays of ions. High melting points (lots of strong bonds to break). Conduct when melted or dissolved, because the ions are free to move, but not when solid.'},
    {tag: 'rule', title: 'Covalent bonding', text: 'Between non-metals. Atoms <em>share</em> pairs of electrons. H₂: one shared pair. O₂: a double bond. CH₄, H₂O, NH₃, CO₂ are simple molecules.'},
    {tag: 'rule', title: 'Simple molecules', text: 'Strong covalent bonds inside each molecule, but weak forces <em>between</em> molecules. Little energy separates the molecules, so low melting and boiling points (often gases or liquids). They do not conduct.'},
    {tag: 'rule', title: 'Giant covalent structures', text: 'Diamond: each carbon bonded to 4 others; very hard, very high melting point, no conduction. Graphite: layers of carbons each bonded to 3; layers slide (soft, a lubricant); one free (delocalised) electron per atom, so it conducts. Silicon dioxide (sand) is like diamond.'},
    {tag: 'rule', title: 'Metallic bonding', text: 'Positive metal ions in a sea of delocalised electrons. Conduct heat and electricity (electrons move); malleable (layers of ions slide but the bonding is kept).'},
    {tag: 'watch', title: 'Breaking molecules versus separating them', text: 'Boiling water does <em>not</em> break covalent bonds; it overcomes the weak forces between molecules. Steam is still H₂O.'}
  ],
  tables: [{title: 'Structure decides properties', headers: ['Structure', 'Example', 'Melting point', 'Conducts?'], rows: [['giant ionic', 'sodium chloride', 'high', 'only when molten or dissolved'], ['simple molecular', 'water, CO₂', 'low', 'no'], ['giant covalent', 'diamond, SiO₂', 'very high', 'no (graphite yes)'], ['metallic', 'copper', 'usually high', 'yes, as solid and liquid']]}],
  worked: [
    {q: 'Describe how magnesium and oxygen form magnesium oxide.', steps: ['Mg is 2, 8, 2; O is 2, 6.', 'Magnesium transfers its two outer electrons to an oxygen atom.', 'Mg²⁺ (2, 8) and O²⁻ (2, 8) form, both with full outer shells.', 'The ions attract strongly in a giant lattice: MgO.'], a: 'Two electrons transferred from Mg to O, giving Mg²⁺ and O²⁻ ions held by strong electrostatic attraction.'},
    {q: 'A substance melts at 1700 °C and does not conduct electricity, solid or molten. What structure is it?', steps: ['Very high melting point: a giant structure.', 'Not ionic (would conduct when molten).', 'Not metallic (would conduct when solid).'], a: 'Giant covalent (it is silicon dioxide).'}
  ],
  quiz: [
    {q: 'In ionic bonding electrons are:', opts: ['shared', 'transferred from metal to non-metal', 'transferred from non-metal to metal', 'delocalised'], correct: 1, explain: 'Metals lose electrons; non-metals gain them.'},
    {q: 'Why does solid sodium chloride not conduct electricity?', opts: ['It has no ions', 'The ions cannot move', 'It has no electrons', 'It is covalent'], correct: 1, explain: 'The ions are fixed in the lattice. Melted or dissolved, they can move.'},
    {q: 'Why does graphite conduct electricity?', opts: ['It is a metal', 'It has delocalised electrons between layers', 'It has ions', 'It is very hard'], correct: 1, explain: 'Each carbon uses only 3 electrons in bonds; the fourth is free to move.'},
    {q: 'Methane has a low boiling point because:', opts: ['its covalent bonds are weak', 'the forces between molecules are weak', 'it is ionic', 'it has delocalised electrons'], correct: 1, explain: 'The C–H bonds are strong; it is the intermolecular forces that are weak.'},
    {q: 'The formula of the compound formed from Ca²⁺ and Cl⁻ is:', opts: ['CaCl', 'CaCl₂', 'Ca₂Cl', 'Ca₂Cl₃'], correct: 1, explain: 'Two Cl⁻ are needed to balance one Ca²⁺.'}
  ],
  challenges: [
    {prompt: 'Explain why diamond is hard and used in cutting tools, but graphite is soft and used in pencils, even though both are pure carbon.', marks: 4, answer: 'In diamond, every carbon atom is joined by strong covalent bonds to four others in a rigid 3D network, so a huge amount of energy is needed to break it: very hard. In graphite, each carbon bonds to three others in flat layers; the layers are held together by only weak forces, so they slide over each other easily, and rub off onto paper.'},
    {prompt: 'Copper is used for electrical wires. Explain this using its structure.', marks: 3, answer: 'Copper has metallic bonding: positive ions in a sea of delocalised electrons. The electrons can move through the structure, carrying charge, so it conducts well. The layers of ions can slide without breaking the bonding, so it is ductile and can be drawn into wires.'}
  ],
  keywords: [['Ion', 'A charged atom or group of atoms.'], ['Covalent bond', 'A shared pair of electrons.'], ['Lattice', 'A regular repeating 3D arrangement.'], ['Delocalised electrons', 'Electrons free to move through a structure.'], ['Intermolecular forces', 'Weak forces between molecules.']],
  stretch: 'A level adds <strong>electronegativity</strong> and polarity. In water, oxygen pulls the shared electrons more than hydrogen does, making the molecule polar. This gives <strong>hydrogen bonds</strong> between water molecules, which is why water boils at 100 °C, far higher than similar-sized molecules like methane (−162 °C), and why ice floats.',
  links: [['Save My Exams: bonding', 'https://www.savemyexams.com/']]
});

lesson({id: 'separating', code: 'C5', subject: 'chemistry', title: 'Separating mixtures and purity', level: 'GCSE',
  search: 'GCSE chemistry separating mixtures chromatography distillation filtration',
  intro: 'Chromatography with Rf values was in the specimen paper. You need to choose the right method for any mixture, describe it step by step, and explain how it works.',
  goals: ['Choose a method to separate any mixture', 'Describe filtration, evaporation, crystallisation, distillation and chromatography', 'Calculate and use Rf values', 'Explain how to test for a pure substance'],
  points: [
    {tag: 'rule', title: 'Filtration', text: 'Separates an insoluble solid from a liquid (sand from water). The solid stays in the filter paper as the <strong>residue</strong>; the liquid passing through is the <strong>filtrate</strong>.'},
    {tag: 'rule', title: 'Evaporation and crystallisation', text: 'Get a soluble solid out of a solution. Evaporating to dryness is quick but can decompose the solid. For good crystals: heat until the solution is <em>saturated</em> (crystals form on a cold glass rod), then leave it to cool slowly and filter off the crystals.'},
    {tag: 'rule', title: 'Simple distillation', text: 'Gets a pure liquid (solvent) from a solution: boil it, the vapour goes into a condenser cooled by water (in at the bottom, out at the top), and condenses into the collecting flask. The solute stays behind.'},
    {tag: 'rule', title: 'Fractional distillation', text: 'Separates liquids with different boiling points (ethanol 78 °C from water 100 °C; crude oil). A fractionating column is hot at the bottom and cooler at the top. The thermometer at the top shows which liquid is coming over.'},
    {tag: 'rule', title: 'Paper chromatography', text: 'Separates dissolved substances, such as dyes or amino acids. Spot the mixture on a <strong>pencil</strong> start line above the solvent level. The solvent rises up the paper; substances that are more soluble in the solvent and less attracted to the paper travel further.'},
    {tag: 'rule', title: 'Rf values', text: 'Rf = distance moved by the spot ÷ distance moved by the solvent front. Always between 0 and 1, no units. A substance always has the same Rf in the same solvent, so you can identify it by comparing with known samples. Colourless spots (amino acids) are made visible with a <em>locating agent</em> such as ninhydrin.'},
    {tag: 'rule', title: 'Purity', text: 'In chemistry, pure means one substance only. A pure substance melts and boils at one exact temperature; impurities lower the melting point and make it melt over a range. A pure substance gives one spot in chromatography.'},
    {tag: 'watch', title: 'Pencil, not pen', text: 'The start line is in pencil because ink would dissolve and run. The spots must be above the solvent, or they would dissolve into the solvent in the beaker.'}
  ],
  labs: ['chromatography', 'rock-salt', 'distillation', 'solubility'],
  worked: [
    {q: 'The solvent front moves 8.0 cm. A spot moves 3.2 cm. Find its Rf value.', steps: ['Rf = distance by spot ÷ distance by solvent.', '= 3.2 ÷ 8.0.', '= 0.40.'], a: '0.40'},
    {q: 'How would you get pure, dry salt from rock salt (salt mixed with sand and grit)?', steps: ['Crush the rock salt and stir with warm water: the salt dissolves; sand does not.', 'Filter: sand stays as the residue; salt solution is the filtrate.', 'Heat the filtrate gently to evaporate some water until saturated.', 'Leave to cool and crystallise; filter off and dry the crystals on filter paper.'], a: 'Dissolve, filter, evaporate to saturation, crystallise, dry.'}
  ],
  quiz: [
    {q: 'Which method separates ethanol from water?', opts: ['Filtration', 'Fractional distillation', 'Chromatography', 'Crystallisation'], correct: 1, explain: 'They are both liquids with different boiling points.'},
    {q: 'A spot has Rf 0.75 and the solvent moved 12 cm. How far did the spot move?', opts: ['16 cm', '9 cm', '0.06 cm', '12.75 cm'], correct: 1, explain: '0.75 × 12 = 9 cm.'},
    {q: 'A sample melts between 112 and 118 °C. The pure substance melts at 122 °C. The sample is:', opts: ['pure', 'impure', 'a different element', 'a gas'], correct: 1, explain: 'Impurities lower the melting point and spread it over a range.'},
    {q: 'In a condenser, cold water enters at the:', opts: ['top', 'bottom', 'middle', 'either end'], correct: 1, explain: 'Entering at the bottom keeps the jacket full of water, so cooling is most efficient.'},
    {q: 'In filtration, the solid left in the paper is the:', opts: ['filtrate', 'residue', 'solvent', 'solute'], correct: 1, explain: 'The residue stays behind; the filtrate passes through.'}
  ],
  challenges: [
    {prompt: 'A food colouring gives three spots. One matches a banned dye. Describe how you would use chromatography to show this, and how you would be sure of the identification.', marks: 5, answer: 'Draw a pencil line 1 cm from the bottom of chromatography paper. Put a small spot of the food colouring and spots of known dyes, including the banned one, on the line, spaced out. Stand the paper in a beaker of solvent below the line, with a lid. Remove it when the solvent is near the top and mark the solvent front. If one of the food colouring’s spots is at the same height as the banned dye (same Rf), the banned dye is probably present. To be more certain, repeat with a different solvent: the spots should still match.'},
    {prompt: 'Explain why substances move different distances up chromatography paper.', marks: 2, answer: 'Each substance divides its time between dissolving in the moving solvent (mobile phase) and sticking to the paper (stationary phase). Substances that are more soluble in the solvent and less attracted to the paper spend more time moving, so they travel further.'}
  ],
  keywords: [['Residue', 'Solid left in the filter paper.'], ['Filtrate', 'Liquid that passes through the filter.'], ['Saturated solution', 'Holds the maximum solute it can at that temperature.'], ['Rf value', 'Spot distance ÷ solvent distance.'], ['Pure substance', 'Only one element or compound.']],
  stretch: 'Labs now use <strong>thin-layer chromatography</strong> (TLC) and <strong>gas chromatography</strong>. In GC the mobile phase is a gas and each substance comes out of a long column after a characteristic retention time; joined to a mass spectrometer (GC-MS) it identifies drugs in blood or pesticides in food from tiny samples.',
  links: [['Save My Exams: chromatography', 'https://www.savemyexams.com/']]
});

lesson({id: 'moles', code: 'C6', subject: 'chemistry', title: 'Equations, conservation of mass and moles', level: 'GCSE → A level',
  search: 'GCSE chemistry balancing equations conservation of mass moles',
  intro: 'Chemical equations are a precise language. Balance them, and you can calculate exactly how much of each substance reacts, the core of quantitative chemistry.',
  goals: ['Write word and balanced symbol equations, with state symbols', 'Explain conservation of mass, including when mass seems to change', 'Calculate relative formula mass', 'Use moles to find reacting masses'],
  points: [
    {tag: 'rule', title: 'Word and symbol equations', text: 'Reactants → products. Magnesium + oxygen → magnesium oxide becomes 2Mg + O₂ → 2MgO. State symbols: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water.'},
    {tag: 'rule', title: 'Balancing', text: 'Atoms are not created or destroyed, so each element must have the same number of atoms on both sides. Change only the big numbers in front, never the small ones in formulae.'},
    {tag: 'rule', title: 'Conservation of mass', text: 'Total mass of reactants = total mass of products. If mass seems to go <em>up</em> (heating magnesium), a gas from the air has joined. If it seems to go <em>down</em> (heating copper carbonate), a gas has escaped: CuCO₃ → CuO + CO₂.'},
    {tag: 'rule', title: 'Relative formula mass', text: 'M<sub>r</sub> = sum of the relative atomic masses. CO₂: 12 + 16 + 16 = 44. H₂SO₄: 2 + 32 + 64 = 98.'},
    {tag: 'rule', title: 'The mole', text: 'One mole of any substance has a mass in grams equal to its M<sub>r</sub>, and contains 6.02 × 10²³ particles. moles = mass ÷ M<sub>r</sub>.'},
    {tag: 'rule', title: 'Reacting masses', text: 'Use the equation’s ratio. 1 Find moles of what you know. 2 Use the ratio to find moles of what you want. 3 Convert to mass.'},
    {tag: 'tip', title: 'Percentage composition', text: '% of an element = (A<sub>r</sub> × number of atoms ÷ M<sub>r</sub>) × 100. In MgO: 24/40 = 60% magnesium.'}
  ],
  labs: ['heating-mass'],
  worked: [
    {q: 'Balance: Al + O₂ → Al₂O₃', steps: ['Oxygen: 2 on the left, 3 on the right. Lowest common multiple is 6: 3O₂ and 2Al₂O₃.', 'Now there are 4 Al on the right, so 4Al on the left.', '4Al + 3O₂ → 2Al₂O₃. Check: Al 4 = 4; O 6 = 6.'], a: '4Al + 3O₂ → 2Al₂O₃'},
    {q: 'What mass of magnesium oxide forms when 6.0 g of magnesium burns? (Mg = 24, O = 16)', steps: ['2Mg + O₂ → 2MgO.', 'Moles of Mg = 6.0 ÷ 24 = 0.25 mol.', 'Ratio Mg : MgO = 2 : 2, so 0.25 mol MgO.', 'Mass = 0.25 × 40 = 10 g.'], a: '10 g'}
  ],
  quiz: [
    {q: 'When copper carbonate is heated in an open tube its mass decreases. This is because:', opts: ['mass is destroyed', 'carbon dioxide gas escapes', 'oxygen is added', 'the copper evaporates'], correct: 1, explain: 'CuCO₃ → CuO + CO₂; the gas leaves the tube.'},
    {q: 'The M<sub>r</sub> of CaCO₃ is (Ca 40, C 12, O 16):', opts: ['68', '100', '84', '56'], correct: 1, explain: '40 + 12 + 3 × 16 = 100.'},
    {q: 'How many moles are in 36 g of water (M<sub>r</sub> 18)?', opts: ['0.5', '2', '18', '648'], correct: 1, explain: '36 ÷ 18 = 2 mol.'},
    {q: 'Which equation is balanced?', opts: ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O', 'H₂ + O₂ → 2H₂O', '2H₂ + 2O₂ → 2H₂O'], correct: 1, explain: '4 H and 2 O on each side.'},
    {q: 'The state symbol (aq) means:', opts: ['a gas', 'a liquid', 'dissolved in water', 'a solid'], correct: 2, explain: 'Aqueous: in solution in water.'}
  ],
  challenges: [
    {prompt: 'A student heats 2.40 g of magnesium in a crucible with a lid, lifting the lid now and then. The mass of the product is 4.00 g. Explain why the mass increased, why the lid is lifted, and why the lid is not removed completely.', marks: 4, answer: 'Magnesium combines with oxygen from the air to form magnesium oxide, so the product includes the mass of oxygen gained (1.60 g). Lifting the lid lets more oxygen in so all the magnesium reacts. Keeping the lid mostly on stops white magnesium oxide smoke escaping, which would make the final mass too low.'},
    {prompt: 'Using the data above (Mg 2.40 g, oxide 4.00 g), show that the formula of magnesium oxide is MgO. (Mg = 24, O = 16)', marks: 3, answer: 'Mass of oxygen = 4.00 − 2.40 = 1.60 g. Moles Mg = 2.40 ÷ 24 = 0.100; moles O = 1.60 ÷ 16 = 0.100. Ratio 1 : 1, so MgO.'}
  ],
  keywords: [['Reactant', 'A substance that reacts.'], ['Product', 'A substance made in the reaction.'], ['Relative formula mass', 'Sum of relative atomic masses in a formula.'], ['Mole', 'The amount containing 6.02 × 10²³ particles.'], ['Conservation of mass', 'No atoms are lost or made in a reaction.']],
  stretch: 'A level extends moles to <strong>solutions</strong> (moles = concentration in mol/dm³ × volume in dm³) and <strong>gases</strong> (1 mol of any gas occupies 24 dm³ at room temperature and pressure). It also uses <strong>percentage yield</strong> and <strong>atom economy</strong> to judge how wasteful an industrial process is.',
  links: [['Save My Exams: moles', 'https://www.savemyexams.com/']]
});

lesson({id: 'acids', code: 'C7', subject: 'chemistry', title: 'Acids, alkalis and salts', level: 'GCSE',
  search: 'GCSE chemistry acids alkalis pH neutralisation salts',
  intro: 'Acids and alkalis are everywhere, from stomach acid to toothpaste. You need to use the pH scale, predict the salts made in neutralisation, and describe how to make a pure salt.',
  goals: ['Use the pH scale and indicators', 'Write equations for neutralisation and for acids with metals and carbonates', 'Name the salt made from any acid', 'Describe how to make a pure, dry salt'],
  points: [
    {tag: 'rule', title: 'The pH scale', text: '0 to 14. Below 7 acidic (stronger acids are lower), 7 neutral, above 7 alkaline. Universal indicator: red (strong acid), orange/yellow (weak acid), green (neutral), blue (weak alkali), purple (strong alkali).'},
    {tag: 'rule', title: 'What makes an acid or alkali', text: 'Acids release hydrogen ions, H⁺, in water. Alkalis release hydroxide ions, OH⁻. A base is any substance that neutralises an acid; an alkali is a base that dissolves in water.'},
    {tag: 'rule', title: 'Neutralisation', text: 'acid + base → salt + water. The ionic equation is always H⁺ + OH⁻ → H₂O. It is exothermic (the temperature rises).'},
    {tag: 'rule', title: 'Other reactions of acids', text: 'acid + metal → salt + hydrogen (squeaky pop test). acid + carbonate → salt + water + carbon dioxide (turns limewater milky).'},
    {tag: 'rule', title: 'Naming salts', text: 'Hydrochloric acid → chlorides. Sulfuric acid → sulfates. Nitric acid → nitrates. The metal gives the first name: sodium hydroxide + hydrochloric acid → sodium chloride + water.'},
    {tag: 'rule', title: 'Making a soluble salt from an insoluble base', text: 'Warm the acid, add the base (e.g. copper oxide) in excess until no more dissolves, filter off the excess, then crystallise the filtrate. With an alkali, do a <strong>titration</strong> instead, because you cannot see when the reaction is complete.'},
    {tag: 'rule', title: 'Indicators', text: 'Litmus: red in acid, blue in alkali. Phenolphthalein: colourless in acid, pink in alkali. Methyl orange: red in acid, yellow in alkali.'},
    {tag: 'watch', title: 'Strong is not the same as concentrated', text: 'Strong means the acid fully splits into ions; concentrated means lots of acid in a small volume. A dilute solution of a strong acid is possible.'}
  ],
  labs: ['neutralisation'],
  worked: [
    {q: 'Name the salt made and write a word equation: zinc carbonate + sulfuric acid.', steps: ['Acid + carbonate → salt + water + carbon dioxide.', 'Zinc from the carbonate; sulfuric acid gives a sulfate.'], a: 'zinc carbonate + sulfuric acid → zinc sulfate + water + carbon dioxide'},
    {q: 'Describe how to make pure dry crystals of copper sulfate from copper oxide.', steps: ['Warm dilute sulfuric acid in a beaker.', 'Add copper oxide a spatula at a time, stirring, until no more dissolves (excess black solid remains).', 'Filter to remove excess copper oxide; the filtrate is blue copper sulfate solution.', 'Heat gently to evaporate some water, then leave to crystallise; pat the crystals dry.'], a: 'React excess CuO with warm H₂SO₄, filter, crystallise, dry.'}
  ],
  quiz: [
    {q: 'Which pH is a strong alkali?', opts: ['1', '6', '7', '13'], correct: 3, explain: 'High pH values are strongly alkaline.'},
    {q: 'The salt formed from potassium hydroxide and nitric acid is:', opts: ['potassium chloride', 'potassium nitrate', 'potassium sulfate', 'potassium nitride'], correct: 1, explain: 'Nitric acid makes nitrates.'},
    {q: 'Which gas is made when magnesium reacts with an acid?', opts: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Chlorine'], correct: 2, explain: 'Metal + acid → salt + hydrogen.'},
    {q: 'The ions that make a solution acidic are:', opts: ['OH⁻', 'H⁺', 'Cl⁻', 'Na⁺'], correct: 1, explain: 'Acids release hydrogen ions.'},
    {q: 'Why is excess copper oxide added when making copper sulfate?', opts: ['To make the reaction faster', 'To make sure all the acid has reacted', 'To change the colour', 'To make it alkaline'], correct: 1, explain: 'Then no acid is left in the solution, and the excess solid is easily filtered off.'}
  ],
  challenges: [
    {prompt: 'Sodium hydroxide solution is added a little at a time to 25 cm³ of hydrochloric acid with universal indicator. Describe and explain the colour changes and how the pH changes.', marks: 4, answer: 'At first the acid is red (pH about 1). As alkali is added, the hydroxide ions react with hydrogen ions to make water, so the H⁺ concentration falls and the pH rises: orange, yellow, then green (pH 7) at neutralisation. Beyond this, excess OH⁻ makes the solution alkaline: blue, then purple (pH 13). Near neutral the pH changes very quickly with a few drops.'},
    {prompt: 'Explain why farmers spread lime (calcium hydroxide) on fields, and why indigestion tablets contain magnesium hydroxide or calcium carbonate.', marks: 3, answer: 'Both are bases that neutralise acids. Lime raises the pH of acidic soil to suit crops. Indigestion is caused by excess stomach (hydrochloric) acid; the base neutralises some of it, making a salt and water (and CO₂ with a carbonate), relieving the pain.'}
  ],
  keywords: [['Acid', 'Releases H⁺ ions in water; pH below 7.'], ['Alkali', 'A soluble base; releases OH⁻ ions; pH above 7.'], ['Neutralisation', 'Acid + base → salt + water.'], ['Salt', 'Compound formed when the H of an acid is replaced by a metal.'], ['Indicator', 'A dye that changes colour with pH.']],
  stretch: 'pH is a logarithmic scale: <strong>pH = −log₁₀[H⁺]</strong>. Each pH unit is a factor of 10 in hydrogen ion concentration, so pH 2 is ten times more acidic than pH 3. Weak acids such as ethanoic acid only partly ionise, setting up an equilibrium, and <strong>buffer solutions</strong> resist pH changes, which is how blood stays at pH 7.4.',
  links: [['Save My Exams: acids and bases', 'https://www.savemyexams.com/']]
});

lesson({id: 'reactivity', code: 'C8', subject: 'chemistry', title: 'The reactivity series and metals', level: 'GCSE',
  search: 'GCSE chemistry reactivity series displacement extraction of metals',
  intro: 'Why is gold found as nuggets but aluminium has to be extracted with electricity? The reactivity series explains which metals react, how they are extracted, and why iron rusts.',
  goals: ['Recall the reactivity series and use it to predict reactions', 'Write displacement reactions', 'Explain how metals are extracted using carbon or electrolysis', 'Describe oxidation, reduction and rusting'],
  points: [
    {tag: 'rule', title: 'The series', text: 'Potassium, sodium, calcium, magnesium, aluminium, (carbon), zinc, iron, tin, lead, (hydrogen), copper, silver, gold. Most reactive at the top. (“Please send cats, monkeys and camels zipping into the lovely house, carefully saving gold.”)'},
    {tag: 'rule', title: 'Reactions with water and acid', text: 'Metals above hydrogen react with dilute acids to give hydrogen. Potassium, sodium and calcium react with cold water; magnesium reacts with steam. Copper, silver and gold do not react with dilute acids.'},
    {tag: 'rule', title: 'Displacement', text: 'A more reactive metal displaces a less reactive one from its compound. Iron nail in copper sulfate: iron + copper sulfate → iron sulfate + copper (pink coating, blue colour fades). The reaction gives out heat.'},
    {tag: 'rule', title: 'Oxidation and reduction', text: 'Oxidation is gain of oxygen (or loss of electrons). Reduction is loss of oxygen (or gain of electrons). In a displacement both happen together: a <strong>redox</strong> reaction. “OIL RIG”: oxidation is loss, reduction is gain (of electrons).'},
    {tag: 'rule', title: 'Extraction with carbon', text: 'Metals below carbon can be extracted from their oxides by heating with carbon: iron oxide + carbon → iron + carbon dioxide, in a blast furnace. The metal oxide is reduced.'},
    {tag: 'rule', title: 'Extraction by electrolysis', text: 'Metals above carbon (aluminium, sodium) are too reactive for carbon to reduce, so they are extracted by electrolysis of the molten compound. It needs lots of electricity, so it is expensive.'},
    {tag: 'rule', title: 'Rusting', text: 'Iron needs both <strong>oxygen and water</strong> to rust (hydrated iron(III) oxide). Prevent it with a barrier (paint, oil, plastic) or with a more reactive metal: galvanising (zinc coating) or sacrificial blocks of magnesium on ships, which corrode instead of the iron.'}
  ],
  tables: [{title: 'Where a metal sits decides how it is extracted', headers: ['Metal', 'Position', 'Extraction'], rows: [['potassium, sodium, aluminium', 'above carbon', 'electrolysis of molten compound'], ['zinc, iron, lead', 'below carbon', 'heat the oxide with carbon'], ['gold, silver (some copper)', 'very unreactive', 'found native, as the metal itself']]}],
  worked: [
    {q: 'Predict whether a reaction happens, and write a word equation if it does: (a) zinc + copper sulfate; (b) copper + zinc sulfate.', steps: ['Zinc is above copper in the series.', '(a) Zinc can displace copper: zinc + copper sulfate → zinc sulfate + copper.', '(b) Copper is less reactive than zinc, so it cannot displace it.'], a: '(a) reacts; (b) no reaction'},
    {q: 'In iron oxide + carbon → iron + carbon dioxide, what is oxidised and what is reduced?', steps: ['Iron oxide loses oxygen, so it is reduced.', 'Carbon gains oxygen to become carbon dioxide, so it is oxidised.', 'Carbon is the reducing agent.'], a: 'Iron oxide reduced; carbon oxidised'}
  ],
  quiz: [
    {q: 'Which metal will NOT react with dilute hydrochloric acid?', opts: ['Magnesium', 'Zinc', 'Iron', 'Copper'], correct: 3, explain: 'Copper is below hydrogen in the series.'},
    {q: 'Aluminium is extracted by electrolysis because:', opts: ['it is very unreactive', 'it is more reactive than carbon', 'it is found as the pure metal', 'electrolysis is cheap'], correct: 1, explain: 'Carbon cannot remove oxygen from aluminium oxide.'},
    {q: 'Rusting needs:', opts: ['oxygen only', 'water only', 'oxygen and water', 'salt'], correct: 2, explain: 'Salt speeds it up, but oxygen and water are both needed.'},
    {q: 'Reduction is:', opts: ['gain of oxygen', 'loss of electrons', 'loss of oxygen', 'gain of protons'], correct: 2, explain: 'Reduction is loss of oxygen (or gain of electrons).'},
    {q: 'A piece of magnesium is placed in iron sulfate solution. You would see:', opts: ['no change', 'a grey coating of iron forming on the magnesium', 'a pink coating', 'bubbles of oxygen'], correct: 1, explain: 'Magnesium is more reactive, so it displaces iron.'}
  ],
  challenges: [
    {prompt: 'Four nails are set up: (A) in air and tap water, (B) in boiled water with oil on top, (C) in dry air with calcium chloride, (D) in salty water. Predict which rust and explain the purpose of B and C.', marks: 4, answer: 'A rusts (oxygen and water present). D rusts fastest (salt speeds up rusting). B does not rust: boiling removes dissolved air and the oil stops more oxygen getting in, so there is water but no oxygen. C does not rust: calcium chloride absorbs water vapour, so there is oxygen but no water. Together B and C show both oxygen and water are needed.'},
    {prompt: 'Explain how blocks of zinc attached to a steel ship’s hull stop the hull rusting.', marks: 2, answer: 'Zinc is more reactive than iron, so it loses electrons (is oxidised) in preference to the iron. The zinc corrodes instead of the steel: sacrificial protection. The blocks are replaced when they wear away.'}
  ],
  keywords: [['Reactivity series', 'Metals listed from most to least reactive.'], ['Displacement', 'A more reactive metal replaces a less reactive one in a compound.'], ['Oxidation', 'Gain of oxygen / loss of electrons.'], ['Reduction', 'Loss of oxygen / gain of electrons.'], ['Ore', 'A rock containing enough metal compound to be worth extracting.']],
  stretch: 'A level measures reactivity with <strong>electrode potentials</strong>. Two metals in solutions of their ions, joined by a wire and salt bridge, make a cell; the further apart they are in the series, the bigger the voltage. This is how batteries work, and the table of standard electrode potentials is the A level version of the reactivity series.',
  links: [['Save My Exams: reactivity series', 'https://www.savemyexams.com/']]
});

lesson({id: 'rates', code: 'C9', subject: 'chemistry', title: 'Rates of reaction and catalysts', level: 'GCSE → A level',
  search: 'GCSE chemistry rates of reaction collision theory catalysts', viz: 'collision',
  vizNote: 'Raise the temperature or concentration, or add a catalyst, and watch the number of successful collisions per second change.',
  intro: 'The specimen paper asked which catalyst decomposes hydrogen peroxide fastest. Collision theory explains every factor that changes a rate, and graphs show it.',
  goals: ['Explain rates using collision theory and activation energy', 'Describe how temperature, concentration, surface area and catalysts change the rate', 'Measure a rate and read rate graphs', 'Explain how a catalyst works using an energy profile'],
  points: [
    {tag: 'rule', title: 'Collision theory', text: 'Particles react only when they collide with enough energy, the <strong>activation energy</strong>. The rate depends on how often they collide and what fraction of collisions have enough energy.'},
    {tag: 'rule', title: 'Temperature', text: 'Particles move faster, so they collide more often <em>and</em> a much bigger fraction of collisions have at least the activation energy. A rise of 10 °C roughly doubles many rates.'},
    {tag: 'rule', title: 'Concentration and pressure', text: 'More particles in the same volume means more frequent collisions. For gases, higher pressure does the same.'},
    {tag: 'rule', title: 'Surface area', text: 'Powder reacts faster than lumps of the same mass, because more particles are exposed to collisions. (Flour dust in a mill can explode.)'},
    {tag: 'rule', title: 'Catalysts', text: 'Speed up a reaction without being used up. They provide a different pathway with a <strong>lower activation energy</strong>, so more collisions are successful. Manganese(IV) oxide catalyses the decomposition of hydrogen peroxide: 2H₂O₂ → 2H₂O + O₂. Enzymes are biological catalysts.'},
    {tag: 'rule', title: 'Measuring rate', text: 'Rate = amount of product formed (or reactant used) ÷ time. Collect gas in a gas syringe or upturned measuring cylinder, measure mass loss on a balance as gas escapes, or time how long a cross takes to disappear.'},
    {tag: 'rule', title: 'Rate graphs', text: 'Volume of gas against time: steep at first (most reactant), then less steep, then flat when a reactant is used up. A steeper initial gradient means a faster rate. The same amounts of reactants give the same final volume, whatever the rate.'},
    {tag: 'tip', title: 'Showing a catalyst is unchanged', text: 'Weigh it before, filter it out after, dry and weigh again: the same mass. It can be reused.'}
  ],
  labs: ['catalysts'],
  worked: [
    {q: 'In 20 s, 30 cm³ of oxygen is collected. Then 8 cm³ more is collected in the next 20 s. Find the mean rate in each period and explain the difference.', steps: ['First 20 s: 30 ÷ 20 = 1.5 cm³/s.', 'Next 20 s: 8 ÷ 20 = 0.4 cm³/s.', 'The rate decreases because hydrogen peroxide is being used up, so its concentration falls and collisions become less frequent.'], a: '1.5 cm³/s then 0.4 cm³/s'},
    {q: 'Two catalysts are tested with the same peroxide. Catalyst X gives 40 cm³ in 30 s; catalyst Y gives 40 cm³ in 75 s. Which is better and why is the final volume the same?', steps: ['X gives the same volume faster: its rate is 40/30 = 1.33 cm³/s vs 0.53 cm³/s.', 'X is the better catalyst (lower activation energy pathway).', 'The final volume depends only on the amount of hydrogen peroxide, not the catalyst, since a catalyst does not change how much product forms.'], a: 'X is better; same final volume because the amount of peroxide is the same.'}
  ],
  quiz: [
    {q: 'A catalyst works by:', opts: ['giving particles more energy', 'providing a pathway with lower activation energy', 'increasing concentration', 'being used up'], correct: 1, explain: 'More collisions then have enough energy to react.'},
    {q: 'Why does powdered calcium carbonate react faster with acid than lumps?', opts: ['It has a higher concentration', 'It has a larger surface area', 'It is hotter', 'It is a catalyst'], correct: 1, explain: 'More particles are exposed, so there are more collisions per second.'},
    {q: 'A gas-volume graph becomes flat. This means:', opts: ['the reaction has speeded up', 'the reaction has stopped because a reactant is used up', 'the catalyst has been used up', 'the gas is escaping'], correct: 1, explain: 'No more gas is being produced.'},
    {q: 'Raising the temperature increases the rate mainly because:', opts: ['the particles get bigger', 'more collisions have energy above the activation energy', 'there are more particles', 'the activation energy falls'], correct: 1, explain: 'Particles collide more often too, but the big effect is that more collisions are energetic enough.'},
    {q: 'Which apparatus measures the volume of gas most precisely?', opts: ['A beaker', 'A gas syringe', 'A test tube', 'A conical flask'], correct: 1, explain: 'A gas syringe has a fine scale and no gas is lost through water.'}
  ],
  challenges: [
    {prompt: 'Describe how to compare three catalysts (manganese(IV) oxide, copper oxide and potato) for the decomposition of hydrogen peroxide. Say where the catalyst goes, what you measure and how you make it fair.', marks: 6, answer: 'Put 25 cm³ of hydrogen peroxide (same concentration) in a conical flask connected by a bung and delivery tube to a gas syringe (or to an upturned measuring cylinder full of water in a trough). Weigh 0.5 g of the catalyst. Add the catalyst to the peroxide in the flask, quickly replace the bung and start the stopwatch. Record the volume of oxygen every 10 s for 2 minutes. Repeat for each catalyst with the same volume, concentration and temperature of peroxide and the same mass and surface area (powder) of catalyst. Repeat each three times. The best catalyst gives the steepest initial gradient (largest volume in the first 30 s). Test that the gas is oxygen with a glowing splint, which relights.'},
    {prompt: 'Sketch an energy profile for an exothermic reaction with and without a catalyst, and label the activation energies and the overall energy change.', marks: 3, answer: 'Reactants on a level on the left, products on a lower level on the right (exothermic). A hump between them: its height above the reactants is the activation energy. The catalysed route is a lower hump between the same two levels, so the activation energy is smaller but the overall energy change (the drop from reactants to products) is the same.'}
  ],
  keywords: [['Rate of reaction', 'How fast reactants become products.'], ['Activation energy', 'The minimum energy colliding particles need to react.'], ['Catalyst', 'Speeds up a reaction without being used up.'], ['Collision theory', 'Reactions need collisions with enough energy.'], ['Enzyme', 'A biological catalyst, a protein.']],
  stretch: 'A level uses the <strong>Maxwell–Boltzmann distribution</strong>: a graph of the number of particles with each energy. Raising the temperature flattens and shifts the curve to the right, greatly increasing the area beyond the activation energy. A level also writes <strong>rate equations</strong> (rate = k[A]ᵐ[B]ⁿ), found from experiments, and studies equilibrium, where forward and reverse rates are equal.',
  links: [['Save My Exams: rates of reaction', 'https://www.savemyexams.com/']]
});

lesson({id: 'energychem', code: 'C10', subject: 'chemistry', title: 'Energy changes, fuels and the atmosphere', level: 'GCSE',
  search: 'GCSE chemistry exothermic endothermic combustion atmosphere greenhouse effect',
  intro: 'Burning fuels gives us energy but changes the air. This lesson links exothermic reactions, combustion and the atmosphere, a favourite area for “explain” questions.',
  goals: ['Classify reactions as exothermic or endothermic', 'Explain energy changes in terms of bonds', 'Describe complete and incomplete combustion', 'Explain the greenhouse effect and acid rain'],
  points: [
    {tag: 'rule', title: 'Exothermic', text: 'Transfers energy <em>to</em> the surroundings, so the temperature rises: combustion, neutralisation, respiration, most oxidation. Uses: hand warmers, self-heating cans.'},
    {tag: 'rule', title: 'Endothermic', text: 'Takes energy <em>from</em> the surroundings, so the temperature falls: thermal decomposition, photosynthesis, dissolving ammonium nitrate. Uses: instant cold packs.'},
    {tag: 'rule', title: 'Bonds', text: 'Breaking bonds takes energy in; making bonds gives energy out. If more energy is released making new bonds than is used breaking old ones, the reaction is exothermic.'},
    {tag: 'rule', title: 'Combustion', text: 'Fuel + oxygen. Complete (plenty of oxygen): hydrocarbon → carbon dioxide + water. Incomplete (limited oxygen): carbon monoxide (toxic, odourless) and soot also form. The fire triangle: fuel, heat, oxygen.'},
    {tag: 'rule', title: 'The air', text: 'About 78% nitrogen, 21% oxygen, 0.9% argon, 0.04% carbon dioxide, plus water vapour. The early atmosphere was mostly CO₂ from volcanoes; oxygen came from photosynthesis by plants and algae.'},
    {tag: 'rule', title: 'Greenhouse effect', text: 'The Earth absorbs sunlight and gives out infrared. Greenhouse gases (CO₂, methane, water vapour) absorb the infrared and re-emit it, keeping the Earth warm. Burning fossil fuels and deforestation increase CO₂, enhancing the effect and causing global warming and climate change.'},
    {tag: 'rule', title: 'Acid rain', text: 'Sulfur impurities in fuels burn to sulfur dioxide; hot engines make nitrogen oxides. These dissolve in rain to form acids, which damage buildings (limestone), trees and lakes.'},
    {tag: 'tip', title: 'Testing gases', text: 'Oxygen relights a glowing splint. Hydrogen gives a squeaky pop with a lit splint. Carbon dioxide turns limewater milky. Chlorine bleaches damp litmus paper.'}
  ],
  labs: ['neutralisation', 'heating-mass'],
  worked: [
    {q: 'Methane is burned: CH₄ + 2O₂ → CO₂ + 2H₂O. Bond energies: C–H 413, O=O 498, C=O 805, O–H 464 kJ/mol. Is it exothermic? Find the energy change.', steps: ['Bonds broken: 4 C–H + 2 O=O = 4 × 413 + 2 × 498 = 1652 + 996 = 2648 kJ.', 'Bonds made: 2 C=O + 4 O–H = 2 × 805 + 4 × 464 = 1610 + 1856 = 3466 kJ.', 'Energy change = broken − made = 2648 − 3466 = −818 kJ/mol.', 'Negative: more energy released than taken in, so exothermic.'], a: '−818 kJ/mol, exothermic'},
    {q: 'Dissolving a salt in water changes the temperature from 21.0 °C to 15.5 °C. Exothermic or endothermic?', steps: ['The temperature of the surroundings (the water) fell by 5.5 °C.', 'Energy was taken in from the surroundings.'], a: 'Endothermic'}
  ],
  quiz: [
    {q: 'Which is an endothermic process?', opts: ['Burning petrol', 'Respiration', 'Thermal decomposition of calcium carbonate', 'Neutralisation'], correct: 2, explain: 'Heating is needed to keep breaking it down.'},
    {q: 'Incomplete combustion is dangerous because it produces:', opts: ['carbon dioxide', 'carbon monoxide', 'water', 'oxygen'], correct: 1, explain: 'Carbon monoxide binds to haemoglobin and stops blood carrying oxygen.'},
    {q: 'About what percentage of the air is oxygen?', opts: ['78%', '21%', '1%', '0.04%'], correct: 1, explain: 'Nitrogen is 78%; oxygen 21%.'},
    {q: 'Breaking bonds is:', opts: ['exothermic', 'endothermic', 'neither', 'both'], correct: 1, explain: 'Energy must be put in to pull atoms apart.'},
    {q: 'The test for carbon dioxide is:', opts: ['glowing splint relights', 'squeaky pop', 'limewater turns milky', 'litmus bleaches'], correct: 2, explain: 'CO₂ reacts with calcium hydroxide to form insoluble calcium carbonate.'}
  ],
  challenges: [
    {prompt: 'Explain how burning fossil fuels may lead to climate change. Use the words absorb, infrared and greenhouse.', marks: 4, answer: 'Burning fossil fuels releases carbon dioxide that was locked up for millions of years. Sunlight passes through the atmosphere and warms the Earth, which then emits infrared radiation. Greenhouse gases such as CO₂ absorb some of this infrared and re-emit it in all directions, including back towards the Earth. More CO₂ means more is absorbed, so the average temperature rises (the enhanced greenhouse effect), changing weather patterns, melting ice and raising sea levels.'},
    {prompt: 'A gas boiler in a badly ventilated room has a yellow, sooty flame instead of a blue one. Explain why this is dangerous.', marks: 3, answer: 'A yellow, sooty flame shows incomplete combustion due to too little oxygen. This produces carbon monoxide, which is colourless and odourless, so people cannot detect it. It combines with haemoglobin in red blood cells, reducing the oxygen carried, and can kill. Rooms need ventilation and a CO alarm.'}
  ],
  keywords: [['Exothermic', 'Gives out energy; temperature of surroundings rises.'], ['Endothermic', 'Takes in energy; temperature falls.'], ['Combustion', 'Burning: reaction with oxygen releasing energy.'], ['Greenhouse gas', 'A gas that absorbs infrared radiation.'], ['Fossil fuel', 'Coal, oil or gas formed from ancient living things.']],
  stretch: 'At A level, energy changes are <strong>enthalpy changes</strong> (ΔH), measured by calorimetry with q = mcΔT, and <strong>Hess’s law</strong> lets you find ΔH for reactions you cannot measure directly, by going round a cycle of reactions you can. Bond energies are averages, which is why bond-energy answers differ slightly from measured values.',
  links: [['Save My Exams: energy changes', 'https://www.savemyexams.com/']]
});
