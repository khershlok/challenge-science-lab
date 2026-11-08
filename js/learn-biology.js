/* Lessons: biology (GCSE, with early A level stretch) */
'use strict';

lesson({id: 'cells', code: 'B1', subject: 'biology', title: 'Cells and microscopes', level: 'GCSE → A level',
  search: 'GCSE biology cell structure microscopy magnification',
  intro: 'All living things are made of cells. You need to know what is inside them, how cells are specialised for their jobs, and how to use a microscope and the magnification equation.',
  goals: ['Label animal and plant cells and give the function of each part', 'Explain how specialised cells are adapted', 'Use magnification = image size ÷ actual size with unit conversions', 'Describe how to prepare a slide and focus a microscope'],
  points: [
    {tag: 'rule', title: 'In animal and plant cells', text: '<strong>Nucleus</strong>: contains DNA, controls the cell. <strong>Cytoplasm</strong>: where most reactions happen. <strong>Cell membrane</strong>: controls what enters and leaves. <strong>Mitochondria</strong>: aerobic respiration. <strong>Ribosomes</strong>: make proteins.'},
    {tag: 'rule', title: 'Only in plant cells', text: '<strong>Cell wall</strong> (cellulose): support and shape. <strong>Chloroplasts</strong>: photosynthesis (contain green chlorophyll). <strong>Permanent vacuole</strong>: full of cell sap, keeps the cell firm.'},
    {tag: 'rule', title: 'Organisation', text: 'Cells → tissues (similar cells, e.g. muscle) → organs (several tissues, e.g. heart) → organ systems (e.g. circulatory) → organism.'},
    {tag: 'rule', title: 'Specialised cells', text: 'Red blood cell: no nucleus, biconcave, full of haemoglobin to carry oxygen. Sperm: tail to swim, many mitochondria for energy, enzymes in the head. Root hair cell: long projection, large surface area to absorb water. Nerve cell: long, to carry impulses. Palisade cell: packed with chloroplasts.'},
    {tag: 'rule', title: 'Bacteria', text: 'Prokaryotic: no nucleus (DNA loose in a loop, plus small rings called plasmids), cell wall, much smaller than animal or plant cells.'},
    {tag: 'rule', title: 'Magnification', text: 'magnification = image size ÷ actual size. Total magnification of a light microscope = eyepiece × objective (×10 × ×40 = ×400). Units: 1 mm = 1000 µm.'},
    {tag: 'rule', title: 'Using the microscope', text: 'Put the slide on the stage. Start with the lowest-power objective. Use the coarse focus to bring the stage up while looking from the side, then look through the eyepiece and use the fine focus. Then switch to a higher power and refocus with the fine focus only.'},
    {tag: 'tip', title: 'Making a slide', text: 'Onion cells: peel a thin layer of epidermis, lay it flat in a drop of water or iodine stain, lower a coverslip at an angle with a mounted needle to avoid air bubbles. Cheek cells: use methylene blue stain.'}
  ],
  labs: ['microscope'],
  worked: [
    {q: 'A cell is 25 mm across in a drawing. The actual cell is 50 µm across. Find the magnification.', steps: ['Same units first: 25 mm = 25 000 µm.', 'magnification = image ÷ actual = 25 000 ÷ 50.', '= ×500.'], a: '×500'},
    {q: 'A mitochondrion appears 12 mm long in a photo at ×6000. Find its real length in µm.', steps: ['actual = image ÷ magnification.', '= 12 mm ÷ 6000 = 0.002 mm.', '0.002 × 1000 = 2 µm.'], a: '2 µm'}
  ],
  quiz: [
    {q: 'Which structure is found in plant cells but not animal cells?', opts: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Cell membrane'], correct: 2, explain: 'Chloroplasts (and the cell wall and permanent vacuole) are only in plant cells.'},
    {q: 'Where does aerobic respiration take place?', opts: ['Nucleus', 'Ribosomes', 'Mitochondria', 'Vacuole'], correct: 2, explain: 'Mitochondria release energy from glucose using oxygen.'},
    {q: 'An eyepiece of ×10 and an objective of ×40 give a total magnification of:', opts: ['×50', '×400', '×4', '×30'], correct: 1, explain: 'Multiply: 10 × 40 = 400.'},
    {q: 'Why do root hair cells have a long projection?', opts: ['To photosynthesise', 'To increase surface area for absorbing water', 'To swim', 'To store starch'], correct: 1, explain: 'More surface area means faster absorption of water and minerals.'},
    {q: 'Which is an organ?', opts: ['Muscle tissue', 'Red blood cell', 'Stomach', 'Digestive system'], correct: 2, explain: 'The stomach is made of several tissues working together.'}
  ],
  challenges: [
    {prompt: 'Explain how a red blood cell is adapted to carry oxygen. Give three features.', marks: 3, answer: 'It has no nucleus, leaving more room for haemoglobin. It is packed with haemoglobin, which binds oxygen. Its biconcave disc shape gives a large surface area for oxygen to diffuse in and out quickly. It is small and flexible, so it can squeeze through narrow capillaries.'},
    {prompt: 'A student sees onion cells clearly at ×100 but they disappear when the ×400 objective is used. Suggest why and what they should do.', marks: 2, answer: 'At higher power the field of view is smaller and the depth of focus is less, so the cells may be out of focus or not in the centre. They should centre the cells at low power first, then switch to ×400 and adjust only the fine focus (and perhaps increase the light, as the image is dimmer).'}
  ],
  keywords: [['Organelle', 'A structure with a job inside a cell.'], ['Tissue', 'A group of similar cells working together.'], ['Specialised cell', 'A cell adapted for a particular function.'], ['Magnification', 'How many times bigger the image is than the object.'], ['Prokaryote', 'A cell with no nucleus, such as a bacterium.']],
  stretch: 'Electron microscopes have a much higher <strong>resolution</strong> (the ability to distinguish two points that are close together) than light microscopes, because electrons have a much shorter wavelength than light. They reveal the internal structure of organelles: the folded inner membrane of mitochondria, and the ribosomes on rough endoplasmic reticulum. A level studies these organelles in detail.',
  links: [['Save My Exams: cell structure', 'https://www.savemyexams.com/']]
});

lesson({id: 'transport', code: 'B2', subject: 'biology', title: 'Diffusion, osmosis and active transport', level: 'GCSE',
  search: 'GCSE biology diffusion osmosis active transport surface area to volume',
  intro: 'Substances move in and out of cells in three ways. Knowing which one, and why, explains everything from your lungs to a wilting lettuce.',
  goals: ['Define diffusion, osmosis and active transport', 'Explain the factors that affect diffusion', 'Use surface area to volume ratios', 'Interpret osmosis experiments with potato'],
  points: [
    {tag: 'rule', title: 'Diffusion', text: 'The net movement of particles from high to low concentration, down a concentration gradient. Passive (no energy from the cell). Oxygen into blood in the lungs; carbon dioxide into leaves.'},
    {tag: 'rule', title: 'Faster diffusion', text: 'Bigger concentration gradient, higher temperature, larger surface area, shorter distance (thinner membrane).'},
    {tag: 'rule', title: 'Osmosis', text: 'The diffusion of <em>water</em> across a partially permeable membrane, from a dilute solution (more water) to a concentrated solution (less water).'},
    {tag: 'rule', title: 'Osmosis in cells', text: 'Plant cells in pure water swell and become firm (turgid); the cell wall stops them bursting. In strong sugar solution they lose water and become soft (flaccid); the membrane can pull away from the wall (plasmolysis). Animal cells in water can burst, because they have no wall.'},
    {tag: 'rule', title: 'Active transport', text: 'Moves substances <em>against</em> a concentration gradient (low to high), using energy from respiration and carrier proteins. Root hair cells take in mineral ions from dilute soil water this way.'},
    {tag: 'rule', title: 'Surface area to volume ratio', text: 'Small organisms have a large SA:V and can rely on diffusion across their surface. Large organisms have a small SA:V, so they need exchange surfaces (lungs, gills, villi) and transport systems (blood).'},
    {tag: 'tip', title: 'Potato experiments', text: 'Weigh potato cylinders, leave them in different sugar concentrations, reweigh. Calculate <em>percentage change</em> in mass (so starting masses can differ). Where the line crosses 0% is the concentration equal to the inside of the cells.'}
  ],
  labs: ['diffusion'],
  worked: [
    {q: 'A potato cylinder goes from 2.50 g to 2.20 g in a sugar solution. Find the percentage change and explain it.', steps: ['Change = 2.20 − 2.50 = −0.30 g.', '% change = −0.30 ÷ 2.50 × 100 = −12%.', 'It lost water by osmosis: the solution was more concentrated than the cell contents.'], a: '−12%; water moved out by osmosis'},
    {q: 'Find the SA:V ratio of a 1 cm cube and of a 3 cm cube.', steps: ['1 cm cube: SA = 6 × 1 = 6 cm²; V = 1 cm³; ratio 6 : 1.', '3 cm cube: SA = 6 × 9 = 54 cm²; V = 27 cm³; ratio 2 : 1.', 'The larger cube has a smaller SA:V, so diffusion to its centre is relatively slower.'], a: '6:1 and 2:1'}
  ],
  quiz: [
    {q: 'Osmosis is the movement of:', opts: ['any particles', 'water across a partially permeable membrane', 'sugar against a gradient', 'ions using energy'], correct: 1, explain: 'It is a special case of diffusion, for water only.'},
    {q: 'Which process needs energy from respiration?', opts: ['Diffusion', 'Osmosis', 'Active transport', 'Evaporation'], correct: 2, explain: 'Moving against a concentration gradient needs energy.'},
    {q: 'A plant cell placed in pure water will:', opts: ['burst', 'become turgid', 'become plasmolysed', 'shrink'], correct: 1, explain: 'Water enters by osmosis; the cell wall stops it bursting.'},
    {q: 'Which does NOT increase the rate of diffusion?', opts: ['Larger surface area', 'Higher temperature', 'Thicker membrane', 'Steeper concentration gradient'], correct: 2, explain: 'A thicker membrane increases the distance, so diffusion is slower.'},
    {q: 'Why do large animals need lungs and a blood system?', opts: ['They have a large SA:V', 'They have a small SA:V', 'They do not respire', 'Diffusion is faster in large animals'], correct: 1, explain: 'Their surface is too small for their volume to supply all cells by diffusion.'}
  ],
  challenges: [
    {prompt: 'Explain why a fresh-water fish would die if placed in sea water, using the term osmosis.', marks: 3, answer: 'Sea water is more concentrated (contains more salt and less water) than the fish’s body fluids and cells. Water moves out of its cells, especially in the gills, by osmosis, from the dilute cell contents to the concentrated sea water. The cells lose too much water, shrink and stop working.'},
    {prompt: 'Explain why root hair cells use active transport to take up nitrate ions, but water enters them by osmosis.', marks: 3, answer: 'Nitrate ions are usually more concentrated inside the root cell than in the soil water, so they must be moved against the concentration gradient, which needs energy from respiration (active transport). Water is more concentrated in the soil (it is a dilute solution) than in the cell sap, so it moves in passively by osmosis.'}
  ],
  keywords: [['Concentration gradient', 'A difference in concentration between two areas.'], ['Partially permeable membrane', 'Lets small molecules like water through, but not larger ones.'], ['Turgid', 'Swollen and firm with water.'], ['Plasmolysis', 'The membrane pulling away from the wall as a plant cell loses water.'], ['Active transport', 'Movement against a gradient using energy.']],
  stretch: 'A level describes osmosis with <strong>water potential</strong> (ψ), measured in kilopascals: pure water has ψ = 0 and solutions are negative. Water moves from higher (less negative) to lower water potential. A level also studies <strong>Fick’s law</strong>: rate of diffusion ∝ surface area × concentration difference ÷ thickness of membrane.',
  links: [['Save My Exams: osmosis', 'https://www.savemyexams.com/']]
});

lesson({id: 'digestion', code: 'B3', subject: 'biology', title: 'Diet, digestion and enzymes', level: 'GCSE',
  search: 'GCSE biology enzymes digestion food tests balanced diet',
  intro: 'Food has to be broken into small, soluble molecules before your body can use it. Enzymes do this, and the food tests let you find out what a food contains.',
  goals: ['Describe a balanced diet and deficiency diseases', 'Describe the digestive system and what each part does', 'Explain how enzymes work and what affects them', 'Carry out and interpret the food tests'],
  points: [
    {tag: 'rule', title: 'A balanced diet', text: 'Carbohydrates (energy), lipids (energy store, insulation), proteins (growth and repair), vitamins and minerals (small amounts: vitamin C prevents scurvy; vitamin D and calcium for bones, prevent rickets; iron for haemoglobin, prevents anaemia), fibre (keeps food moving), water.'},
    {tag: 'rule', title: 'The digestive system', text: 'Mouth (teeth and amylase in saliva) → oesophagus → stomach (acid kills microbes; protease) → small intestine (most digestion; absorption through villi) → large intestine (water absorbed) → rectum and anus. The liver makes bile; the pancreas makes enzymes.'},
    {tag: 'rule', title: 'Enzymes', text: 'Biological catalysts, made of protein. Each has an <strong>active site</strong> with a specific shape that only fits one substrate (lock and key). Amylase: starch → sugars. Protease: proteins → amino acids. Lipase: lipids → fatty acids and glycerol.'},
    {tag: 'rule', title: 'Temperature and pH', text: 'Rate rises with temperature up to the optimum (about 37 °C for human enzymes). Above that, the active site changes shape and the enzyme is <strong>denatured</strong>: it stops working permanently. Each enzyme also has an optimum pH (stomach protease about 2).'},
    {tag: 'rule', title: 'Bile', text: 'Not an enzyme. It neutralises stomach acid and <em>emulsifies</em> fats into small droplets, giving lipase a bigger surface area to work on.'},
    {tag: 'rule', title: 'Villi', text: 'Finger-like folds lining the small intestine: huge surface area, walls one cell thick, a rich blood supply to keep the concentration gradient steep.'},
    {tag: 'rule', title: 'Food tests', text: 'Starch: iodine turns orange-brown → blue-black. Sugar (reducing): Benedict’s, heat in a water bath → brick red. Protein: biuret → purple (lilac). Fat: shake with ethanol then add water → cloudy white emulsion.'}
  ],
  labs: ['food-tests'],
  worked: [
    {q: 'Amylase is mixed with starch at 37 °C. Drops are tested with iodine every 30 s. The iodine stays orange from 2.5 minutes on. Calculate the rate.', steps: ['Iodine stays orange when no starch is left, so the starch was all digested in 2.5 minutes = 150 s.', 'Rate = 1 ÷ time = 1 ÷ 150 = 0.0067 s⁻¹.', 'A shorter time would mean a faster rate.'], a: '0.0067 per second'},
    {q: 'Explain why an enzyme stops working at 70 °C.', steps: ['High temperature makes the protein vibrate so much that bonds holding its shape break.', 'The shape of the active site changes.', 'The substrate no longer fits, so the enzyme is denatured.'], a: 'The active site changes shape (denatured), so the substrate cannot fit.'}
  ],
  quiz: [
    {q: 'Which enzyme breaks down starch?', opts: ['Protease', 'Lipase', 'Amylase', 'Bile'], correct: 2, explain: 'Amylase digests starch to sugars (maltose).'},
    {q: 'Rickets is caused by a lack of:', opts: ['vitamin C', 'vitamin D or calcium', 'iron', 'protein'], correct: 1, explain: 'Bones become soft and bent.'},
    {q: 'A food turns purple with biuret. It contains:', opts: ['starch', 'sugar', 'protein', 'fat'], correct: 2, explain: 'Biuret tests for protein.'},
    {q: 'Most absorption of digested food happens in the:', opts: ['stomach', 'small intestine', 'large intestine', 'oesophagus'], correct: 1, explain: 'The villi of the small intestine absorb food molecules into the blood.'},
    {q: 'A denatured enzyme:', opts: ['works faster', 'has a changed active site', 'is a different protein', 'is only temporarily slower'], correct: 1, explain: 'The change is permanent.'}
  ],
  challenges: [
    {prompt: 'Sketch and explain the shape of a graph of enzyme activity against temperature from 0 to 70 °C.', marks: 4, answer: 'Activity rises from low at 0 °C to a peak at the optimum (about 37 °C for a human enzyme), because particles move faster and collide (enzyme and substrate) more often and with more energy. Beyond the optimum it falls steeply to zero by about 60 °C, because the enzyme is denatured: its active site changes shape so the substrate no longer fits.'},
    {prompt: 'Explain why a person with very little bile would find it hard to digest fatty foods.', marks: 2, answer: 'Bile emulsifies fat into tiny droplets, increasing the surface area for lipase to act on. It also neutralises acid, giving the alkaline conditions lipase works best in. Without it, fat digestion would be much slower.'}
  ],
  keywords: [['Enzyme', 'A protein that speeds up a reaction in the body.'], ['Active site', 'The part of an enzyme where the substrate fits.'], ['Substrate', 'The molecule an enzyme acts on.'], ['Denatured', 'Permanently changed in shape so it no longer works.'], ['Emulsify', 'Break fat into small droplets.']],
  stretch: 'A level replaces lock and key with the <strong>induced fit</strong> model: the active site changes shape slightly as the substrate binds, putting strain on bonds and lowering the activation energy. It also studies <strong>inhibitors</strong>: competitive ones block the active site; non-competitive ones bind elsewhere and change its shape. Many drugs and poisons work this way.',
  links: [['Save My Exams: enzymes', 'https://www.savemyexams.com/']]
});

lesson({id: 'photosynthesis', code: 'B4', subject: 'biology', title: 'Photosynthesis and plant nutrition', level: 'GCSE → A level',
  search: 'GCSE biology photosynthesis limiting factors inverse square law',
  intro: 'Almost all food on Earth starts with photosynthesis. You need the equation, the factors that limit the rate, and how to investigate them with pondweed.',
  goals: ['Write the word and symbol equations for photosynthesis', 'Explain limiting factors and read rate graphs', 'Describe how leaves are adapted', 'Plan and interpret the pondweed experiment, including the inverse square law'],
  points: [
    {tag: 'rule', title: 'The equation', text: 'carbon dioxide + water → glucose + oxygen, using light energy absorbed by chlorophyll. 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. It is endothermic.'},
    {tag: 'rule', title: 'Uses of glucose', text: 'Respiration; stored as starch (insoluble, so it does not affect osmosis); converted to cellulose for cell walls; combined with nitrates to make proteins; made into fats and oils for seeds.'},
    {tag: 'rule', title: 'Limiting factors', text: 'Light intensity, carbon dioxide concentration and temperature. Whichever is in shortest supply limits the rate. Increasing it raises the rate until another factor becomes limiting, so the graph levels off.'},
    {tag: 'rule', title: 'Temperature is different', text: 'Photosynthesis is controlled by enzymes, so the rate rises to an optimum, then falls as the enzymes denature.'},
    {tag: 'rule', title: 'Leaf adaptations', text: 'Broad and thin (large area, short diffusion path), palisade cells packed with chloroplasts at the top, air spaces in the spongy layer, stomata on the underside for gas exchange, veins (xylem and phloem).'},
    {tag: 'rule', title: 'Testing a leaf for starch', text: 'Boil in water (kills it), boil in ethanol in a water bath (removes chlorophyll; no flames, ethanol is flammable), rinse, add iodine. Blue-black means starch. Variegated leaves only go blue-black where they were green.'},
    {tag: 'rule', title: 'Inverse square law', text: 'Light intensity ∝ 1/d². Halving the distance of the lamp makes the light four times as intense.'},
    {tag: 'tip', title: 'Pondweed control variables', text: 'Use a beaker of water between lamp and plant (or an LED) so the lamp does not heat the plant; add sodium hydrogencarbonate for a constant supply of CO₂; let the plant acclimatise for 5 minutes at each distance.'}
  ],
  labs: ['photosynthesis'],
  worked: [
    {q: 'At 10 cm a pondweed gives 48 bubbles per minute. Predict the light intensity at 20 cm compared with 10 cm, and explain why the bubble count does not simply quarter.', steps: ['Intensity ∝ 1/d², so doubling distance gives (1/2)² = 1/4 of the intensity.', 'If light were the only limiting factor, the rate would fall to about 12 bubbles per minute.', 'But at high light intensity another factor (CO₂ or temperature) may be limiting, so the rate at 10 cm may be less than four times the rate at 20 cm.'], a: 'Light is ¼ as intense; the rate may fall less than four-fold because light was not the only limiting factor at 10 cm.'},
    {q: 'A rate graph against light intensity rises then levels off at 30 units. Higher CO₂ gives a curve that levels off at 50 units. What limited the rate on the first plateau?', steps: ['On the plateau, more light makes no difference, so light is not limiting there.', 'Raising CO₂ raised the plateau.'], a: 'Carbon dioxide concentration was the limiting factor.'}
  ],
  quiz: [
    {q: 'Which gas is a product of photosynthesis?', opts: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Methane'], correct: 1, explain: 'Oxygen is released as a by-product.'},
    {q: 'Why is glucose stored as starch?', opts: ['Starch is sweeter', 'Starch is insoluble so it does not affect osmosis', 'Starch is a gas', 'Starch releases more energy'], correct: 1, explain: 'Insoluble starch does not draw water into cells.'},
    {q: 'A lamp moves from 30 cm to 10 cm. The light intensity becomes:', opts: ['3 times', '9 times', '1/3', '1/9'], correct: 1, explain: 'Distance ÷ 3, so intensity × 3² = 9.'},
    {q: 'Why is a leaf boiled in ethanol in the starch test?', opts: ['To add starch', 'To remove the chlorophyll', 'To kill bacteria', 'To make it green'], correct: 1, explain: 'Removing the green colour lets you see the iodine colour change.'},
    {q: 'Where are most chloroplasts in a leaf?', opts: ['Spongy mesophyll', 'Palisade mesophyll', 'Lower epidermis', 'Xylem'], correct: 1, explain: 'The palisade layer is near the top surface, where light is strongest.'}
  ],
  challenges: [
    {prompt: 'Explain why farmers growing tomatoes in greenhouses in winter may burn paraffin heaters.', marks: 3, answer: 'In winter, temperature and carbon dioxide are likely to limit photosynthesis. Burning paraffin releases heat, raising the temperature towards the optimum for photosynthesis enzymes, and produces carbon dioxide, raising its concentration. Both increase the rate of photosynthesis, so the plants make more glucose and grow faster, giving a bigger crop. (The farmer must balance the extra cost against the extra yield.)'},
    {prompt: 'A student counts bubbles from pondweed at five distances, but the lamp warms the water. Explain why this makes the results invalid and how to fix it.', marks: 3, answer: 'Closer distances heat the water more, so temperature changes as well as light intensity; the student cannot tell which caused the change in rate (temperature is not controlled). Fix: use an LED (which gives off little heat) or a beaker of water between the lamp and the tube as a heat filter, and monitor the water temperature with a thermometer.'}
  ],
  keywords: [['Chlorophyll', 'Green pigment that absorbs light.'], ['Limiting factor', 'The factor in shortest supply that stops the rate going higher.'], ['Stomata', 'Pores in the leaf for gas exchange.'], ['Inverse square law', 'Intensity ∝ 1/distance².'], ['Endothermic', 'Takes in energy.']],
  stretch: 'At A level photosynthesis is split into the <strong>light-dependent reactions</strong> (in the thylakoid membranes: light splits water, releasing oxygen, and makes ATP and NADPH) and the <strong>light-independent reactions</strong> (the Calvin cycle in the stroma: CO₂ is fixed by the enzyme rubisco and built into sugars).',
  links: [['Save My Exams: photosynthesis', 'https://www.savemyexams.com/']]
});

lesson({id: 'respiration', code: 'B5', subject: 'biology', title: 'Respiration: aerobic and anaerobic', level: 'GCSE → A level',
  search: 'GCSE biology aerobic anaerobic respiration yeast fermentation',
  intro: 'Respiration is how every living cell releases energy from glucose. It is not breathing. The yeast practical tests it directly.',
  goals: ['Write the equations for aerobic respiration and both kinds of anaerobic respiration', 'Compare aerobic and anaerobic respiration', 'Explain oxygen debt after exercise', 'Describe how to investigate respiration in yeast'],
  points: [
    {tag: 'rule', title: 'Aerobic respiration', text: 'glucose + oxygen → carbon dioxide + water (+ energy released). C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. Happens in mitochondria. Releases a lot of energy. Exothermic.'},
    {tag: 'rule', title: 'Anaerobic in animals', text: 'glucose → lactic acid. Happens in muscles when there is not enough oxygen during hard exercise. Releases much less energy per glucose.'},
    {tag: 'rule', title: 'Anaerobic in yeast and plants', text: 'glucose → ethanol + carbon dioxide. Called <strong>fermentation</strong>. Used in brewing (ethanol) and baking (CO₂ makes the bread rise).'},
    {tag: 'rule', title: 'Uses of the energy', text: 'Muscle contraction, building large molecules (proteins), active transport, keeping warm (mammals and birds), sending nerve impulses.'},
    {tag: 'rule', title: 'Oxygen debt', text: 'After hard exercise, lactic acid has built up in muscles. You keep breathing hard to supply the extra oxygen needed to break it down: the oxygen debt (EPOC). Lactic acid also causes muscle fatigue.'},
    {tag: 'rule', title: 'Respiration versus breathing', text: 'Breathing (ventilation) moves air in and out of the lungs. Respiration is a chemical reaction in every cell. Plants respire all the time, day and night.'},
    {tag: 'tip', title: 'Yeast practical', text: 'Mix yeast with sugar solution in a test tube in a water bath; count bubbles of CO₂ per minute, or measure gas in a syringe. Change the temperature or sugar. Limewater turns milky to confirm CO₂. A tube with boiled yeast is the control.'}
  ],
  tables: [{title: 'Aerobic vs anaerobic (in humans)', headers: ['', 'Aerobic', 'Anaerobic'], rows: [['Oxygen needed?', 'yes', 'no'], ['Products', 'carbon dioxide and water', 'lactic acid'], ['Energy released', 'a lot', 'much less'], ['Where', 'mitochondria', 'cytoplasm']]}],
  labs: ['yeast', 'breathing'],
  worked: [
    {q: 'Yeast in sugar solution makes 12 bubbles per minute at 20 °C and 30 bubbles per minute at 35 °C. At 60 °C it makes none. Explain.', steps: ['Respiration is controlled by enzymes.', 'From 20 to 35 °C enzyme activity rises (more collisions with more energy), so more CO₂ is produced.', 'At 60 °C the enzymes are denatured and the yeast is killed, so respiration stops.'], a: 'Rate rises towards the optimum, then enzymes denature.'},
    {q: 'Why does bread rise in a warm place but wine-makers use an airlock?', steps: ['In bread dough, yeast respires and CO₂ bubbles get trapped in the dough, making it rise. Warmth speeds up the enzymes.', 'In wine-making, the airlock lets CO₂ out but stops oxygen getting in, so the yeast respires anaerobically and makes ethanol.'], a: 'CO₂ raises bread; no oxygen forces fermentation to ethanol.'}
  ],
  quiz: [
    {q: 'The products of aerobic respiration are:', opts: ['glucose and oxygen', 'carbon dioxide and water', 'lactic acid', 'ethanol and carbon dioxide'], correct: 1, explain: 'Glucose and oxygen are the reactants.'},
    {q: 'Anaerobic respiration in human muscles produces:', opts: ['ethanol', 'lactic acid', 'carbon dioxide', 'oxygen'], correct: 1, explain: 'Only yeast and plants make ethanol and CO₂.'},
    {q: 'Where does aerobic respiration take place?', opts: ['Nucleus', 'Chloroplast', 'Mitochondria', 'Ribosome'], correct: 2, explain: 'Mitochondria are the site of aerobic respiration.'},
    {q: 'When do plants respire?', opts: ['Only at night', 'Only in the day', 'All the time', 'Only when not photosynthesising'], correct: 2, explain: 'All living cells respire all the time.'},
    {q: 'Which test shows a gas is carbon dioxide?', opts: ['Relights a glowing splint', 'Turns limewater milky', 'Squeaky pop', 'Bleaches litmus'], correct: 1, explain: 'Limewater test.'}
  ],
  challenges: [
    {prompt: 'Explain why a sprinter continues to breathe heavily for several minutes after a 400 m race.', marks: 4, answer: 'During the race the muscles needed energy faster than oxygen could be supplied, so they also respired anaerobically, producing lactic acid. Afterwards the sprinter has an oxygen debt: extra oxygen is needed to break down (oxidise) the lactic acid, which is taken to the liver. So breathing rate and depth stay high (and heart rate too) until the lactic acid has been removed.'},
    {prompt: 'Design a control and explain its purpose for an experiment showing that germinating peas release heat.', marks: 3, answer: 'Put germinating peas in one vacuum flask with a thermometer, and the same mass of boiled (dead) peas, rinsed in disinfectant to kill microbes, in an identical flask. The boiled peas cannot respire, so if only the living peas’ flask warms up, the heat must come from respiration in the living peas. The disinfectant stops microbes on the dead peas respiring and giving heat.'}
  ],
  keywords: [['Respiration', 'Chemical reaction releasing energy from glucose in cells.'], ['Aerobic', 'Using oxygen.'], ['Anaerobic', 'Without oxygen.'], ['Fermentation', 'Anaerobic respiration in yeast, making ethanol and CO₂.'], ['Oxygen debt', 'Extra oxygen needed after exercise to break down lactic acid.']],
  stretch: 'At A level, respiration is four stages: <strong>glycolysis</strong> (cytoplasm, glucose → pyruvate), the link reaction, the <strong>Krebs cycle</strong> (mitochondrial matrix) and <strong>oxidative phosphorylation</strong> (inner mitochondrial membrane), which makes most of the ATP. The energy is captured in ATP, the cell’s energy currency, about 30–32 per glucose aerobically but only 2 anaerobically.',
  links: [['Save My Exams: respiration', 'https://www.savemyexams.com/']]
});

lesson({id: 'breathing', code: 'B6', subject: 'biology', title: 'Breathing, gas exchange and circulation', level: 'GCSE',
  search: 'GCSE biology lungs gas exchange alveoli heart blood vessels',
  intro: 'Your lungs bring oxygen in; your heart and blood take it to every cell. The bell-jar model and vital capacity measurements bring this to life.',
  goals: ['Describe the structure of the breathing system', 'Explain inhaling and exhaling using pressure', 'Explain how alveoli are adapted', 'Describe the heart, blood vessels and blood, and the effects of smoking and exercise'],
  points: [
    {tag: 'rule', title: 'The airway', text: 'Nose/mouth → trachea (held open by rings of cartilage) → two bronchi → bronchioles → alveoli (air sacs). The ribs and intercostal muscles protect the lungs and move the chest.'},
    {tag: 'rule', title: 'Breathing in', text: 'Intercostal muscles contract, pulling the ribs up and out. The diaphragm contracts and flattens. The volume of the chest increases, so the pressure inside falls below atmospheric, and air is pushed in.'},
    {tag: 'rule', title: 'Breathing out', text: 'The muscles relax; ribs move down and in; the diaphragm domes up. Volume decreases, pressure rises above atmospheric, and air is pushed out.'},
    {tag: 'rule', title: 'Alveoli', text: 'Gas exchange by diffusion: oxygen into the blood, CO₂ out. Adapted with a huge surface area (about 70 m² in total), walls one cell thick, a rich capillary network, and a moist lining. Breathing and blood flow keep the concentration gradients steep.'},
    {tag: 'rule', title: 'The heart', text: 'A double pump. Right side pumps deoxygenated blood to the lungs; left side pumps oxygenated blood to the body (its wall is thicker, because it pumps further). Blood enters the atria and leaves from the ventricles; valves stop backflow.'},
    {tag: 'rule', title: 'Blood vessels', text: 'Arteries: away from the heart, thick muscular elastic walls, high pressure. Veins: back to the heart, thin walls, valves, low pressure. Capillaries: one cell thick, where exchange with cells happens.'},
    {tag: 'rule', title: 'Blood', text: 'Red cells (oxygen, with haemoglobin), white cells (fight disease), platelets (clotting), plasma (carries glucose, CO₂, urea, hormones).'},
    {tag: 'rule', title: 'Smoking and asthma', text: 'Tar: causes cancer, coats alveoli. Nicotine: addictive, raises heart rate. Carbon monoxide: binds to haemoglobin, so less oxygen is carried. Smoke damages cilia, so mucus builds up (smoker’s cough), and breaks down alveoli (emphysema). Asthma: bronchioles narrow and make extra mucus; relievers relax the muscles.'}
  ],
  labs: ['breathing'],
  worked: [
    {q: 'In the bell-jar model, what do the balloons, the rubber sheet and the glass tube represent? What happens when the sheet is pulled down?', steps: ['Balloons = lungs; rubber sheet = diaphragm; glass tube = trachea; bell jar = chest (ribcage).', 'Pulling the sheet down increases the volume inside the jar.', 'The pressure falls, so air is pushed into the balloons and they inflate: breathing in.'], a: 'Balloons inflate, like breathing in. (The model cannot show the ribs moving.)'},
    {q: 'Breathing rate goes from 12 to 30 breaths per minute during exercise, and each breath from 0.5 to 2.0 litres. Find the volume of air breathed per minute before and during exercise.', steps: ['Before: 12 × 0.5 = 6 litres per minute.', 'During: 30 × 2.0 = 60 litres per minute.', 'Ten times as much air: muscles need more oxygen for respiration and must lose more CO₂.'], a: '6 L/min rising to 60 L/min'}
  ],
  quiz: [
    {q: 'What happens to the diaphragm when you breathe in?', opts: ['It relaxes and domes up', 'It contracts and flattens', 'It stays still', 'It moves up'], correct: 1, explain: 'This increases the chest volume.'},
    {q: 'Why does the left ventricle have a thicker wall than the right?', opts: ['It carries more blood', 'It pumps blood all round the body, at higher pressure', 'It carries deoxygenated blood', 'It has more valves'], correct: 1, explain: 'The right ventricle only pumps to the nearby lungs.'},
    {q: 'Which vessels have valves?', opts: ['Arteries', 'Capillaries', 'Veins', 'All of them'], correct: 2, explain: 'Blood in veins is at low pressure, so valves stop it flowing backwards.'},
    {q: 'Carbon monoxide in smoke is harmful because it:', opts: ['causes cancer', 'is addictive', 'reduces the oxygen carried by red blood cells', 'damages cilia'], correct: 2, explain: 'It binds tightly to haemoglobin.'},
    {q: 'Which is NOT an adaptation of alveoli?', opts: ['Large surface area', 'Thin walls', 'Good blood supply', 'Thick muscular walls'], correct: 3, explain: 'Thick walls would slow diffusion.'}
  ],
  challenges: [
    {prompt: 'Explain how oxygen gets from the air in an alveolus to a respiring muscle cell.', marks: 5, answer: 'Oxygen diffuses from the alveolus (high concentration) across the thin alveolar and capillary walls into the blood (low concentration). It binds to haemoglobin in red blood cells, forming oxyhaemoglobin. Blood goes in the pulmonary vein to the left side of the heart and is pumped through the aorta and arteries to the muscle. In the capillaries, where the oxygen concentration is low because the muscle is respiring, oxyhaemoglobin releases oxygen, which diffuses into the muscle cell.'},
    {prompt: 'Explain why smokers are often short of breath when exercising.', marks: 3, answer: 'Carbon monoxide takes up haemoglobin so less oxygen is carried. Smoke breaks down alveolar walls (emphysema), reducing the surface area for gas exchange. Tar and mucus narrow the airways and damaged cilia let mucus build up, so less air reaches the alveoli. So less oxygen reaches the muscles; they respire anaerobically sooner.'}
  ],
  keywords: [['Alveoli', 'Tiny air sacs where gas exchange happens.'], ['Diaphragm', 'Sheet of muscle below the lungs.'], ['Artery', 'Carries blood away from the heart.'], ['Vein', 'Carries blood back to the heart.'], ['Haemoglobin', 'Red protein that carries oxygen.']],
  stretch: 'A level studies the <strong>oxygen dissociation curve</strong>, an S-shaped graph of how saturated haemoglobin is at each oxygen concentration. The <strong>Bohr effect</strong>: more CO₂ (in active muscles) shifts the curve right, so haemoglobin releases oxygen more readily exactly where it is needed. Cardiac output = heart rate × stroke volume.',
  links: [['Save My Exams: gas exchange', 'https://www.savemyexams.com/']]
});

lesson({id: 'plants', code: 'B7', subject: 'biology', title: 'Plants: transport and reproduction', level: 'GCSE',
  search: 'GCSE biology transpiration xylem phloem pollination seed dispersal',
  intro: 'Plants move water up tall stems without a pump, and reproduce without moving. The seed spinner practical in the lab is about one way seeds spread.',
  goals: ['Describe how water and sugars move through a plant', 'Explain transpiration and the factors that affect it', 'Describe the parts of a flower and pollination', 'Explain fertilisation, germination and seed dispersal'],
  points: [
    {tag: 'rule', title: 'Xylem and phloem', text: 'Xylem: dead, hollow tubes strengthened with lignin, carry water and minerals up from the roots. Phloem: living cells, carry dissolved sugars both up and down (translocation).'},
    {tag: 'rule', title: 'Transpiration', text: 'Water evaporates from the leaves through the stomata. This pulls water up the xylem from the roots in a continuous column (the transpiration stream).'},
    {tag: 'rule', title: 'Factors', text: 'Faster when it is warmer, windier, drier (lower humidity) and brighter (stomata open wider). Measured with a <strong>potometer</strong>: the movement of an air bubble shows water uptake.'},
    {tag: 'rule', title: 'Flowers', text: 'Male: stamen (anther makes pollen, on a filament). Female: carpel (stigma catches pollen; style; ovary contains ovules). Petals attract insects; sepals protect the bud.'},
    {tag: 'rule', title: 'Pollination', text: 'Transfer of pollen from an anther to a stigma. Insect-pollinated: bright petals, scent, nectar, sticky pollen. Wind-pollinated (grasses): small dull flowers, anthers and feathery stigmas hanging outside, lots of light pollen.'},
    {tag: 'rule', title: 'Fertilisation', text: 'A pollen tube grows down the style to the ovule; the male nucleus fuses with the female nucleus. The ovule becomes the <strong>seed</strong>; the ovary becomes the <strong>fruit</strong>.'},
    {tag: 'rule', title: 'Dispersal and germination', text: 'Seeds spread to reduce competition with the parent: wind (sycamore spinners, dandelion parachutes), animals (eaten berries, hooks), explosion, water. Germination needs water, oxygen and warmth (not light).'},
    {tag: 'tip', title: 'Spinners', text: 'Longer wings spin more slowly and fall for longer, so the wind can carry them further from the parent tree.'}
  ],
  labs: ['spinners', 'variation'],
  worked: [
    {q: 'In a potometer the bubble moves 30 mm in 5 minutes. The tube has a cross-sectional area of 0.8 mm². Find the rate of water uptake.', steps: ['Volume = distance × area = 30 × 0.8 = 24 mm³.', 'Rate = 24 ÷ 5 = 4.8 mm³ per minute.', 'A fan or heater would make the bubble move faster.'], a: '4.8 mm³/min'},
    {q: 'A sycamore seed with 3 cm wings takes 1.6 s to fall 2 m; with 5 cm wings it takes 2.5 s. Explain the advantage to the tree.', steps: ['Longer wings: more air resistance as it spins, so it falls more slowly.', 'More time in the air means wind carries it further.', 'The seedling is further from the parent, so less competition for light, water and minerals.'], a: 'Longer flight, further dispersal, less competition.'}
  ],
  quiz: [
    {q: 'Which tissue carries water up a plant?', opts: ['Phloem', 'Xylem', 'Epidermis', 'Palisade'], correct: 1, explain: 'Xylem carries water and minerals.'},
    {q: 'Transpiration is fastest when it is:', opts: ['cold, still and humid', 'warm, windy and dry', 'dark and cold', 'humid and warm'], correct: 1, explain: 'These conditions speed up evaporation and diffusion of water vapour away from the leaf.'},
    {q: 'The part of the flower that catches pollen is the:', opts: ['anther', 'stigma', 'ovary', 'sepal'], correct: 1, explain: 'The stigma is sticky (or feathery in wind-pollinated plants).'},
    {q: 'After fertilisation the ovule becomes the:', opts: ['fruit', 'seed', 'petal', 'pollen'], correct: 1, explain: 'The ovary becomes the fruit.'},
    {q: 'Which is NOT needed for germination?', opts: ['Water', 'Oxygen', 'Warmth', 'Light'], correct: 3, explain: 'Seeds use stored food until the shoot reaches light.'}
  ],
  challenges: [
    {prompt: 'Compare insect-pollinated and wind-pollinated flowers, explaining each difference.', marks: 4, answer: 'Insect-pollinated: large bright petals and scent to attract insects, nectar as a reward, anthers and stigma inside the flower so insects brush against them, sticky or spiky pollen to stick to insects. Wind-pollinated: small, dull, no scent or nectar (no need to attract insects), anthers hanging outside so wind blows pollen away, feathery stigmas to catch pollen from the air, huge amounts of light, smooth pollen because most is lost.'},
    {prompt: 'A plant’s leaves are covered in petroleum jelly on the underside only. Predict and explain the effect on transpiration.', marks: 2, answer: 'Transpiration would fall greatly, because most stomata are on the lower surface and the jelly blocks them, so water vapour cannot diffuse out. A little water may still be lost through the upper surface.'}
  ],
  keywords: [['Transpiration', 'Loss of water vapour from leaves.'], ['Xylem', 'Tissue that carries water.'], ['Phloem', 'Tissue that carries sugars.'], ['Pollination', 'Transfer of pollen from anther to stigma.'], ['Dispersal', 'Spreading seeds away from the parent.']],
  stretch: 'A level explains water movement with the <strong>cohesion–tension theory</strong>: water molecules stick together (cohesion, from hydrogen bonds), so evaporation at the top pulls a continuous column up the xylem under tension. Phloem transport is explained by the <strong>mass flow hypothesis</strong>, driven by pressure differences between sources and sinks.',
  links: [['Save My Exams: plant transport', 'https://www.savemyexams.com/']]
});

lesson({id: 'genetics', code: 'B8', subject: 'biology', title: 'DNA, inheritance and genetic diagrams', level: 'GCSE → A level',
  search: 'GCSE biology DNA genes inheritance punnett square', viz: 'punnett',
  vizNote: 'Pick the two parents’ genotypes. The Punnett square predicts the ratio; breeding real offspring shows chance at work.',
  intro: 'Why do you look like your parents, but not exactly? Genes, alleles and Punnett squares let you predict the chance of inheriting a feature.',
  goals: ['Describe DNA, genes, chromosomes and alleles', 'Use dominant, recessive, homozygous, heterozygous, genotype and phenotype correctly', 'Draw genetic diagrams and work out probabilities', 'Explain sex determination and the difference between sexual and asexual reproduction'],
  points: [
    {tag: 'rule', title: 'DNA and genes', text: 'DNA is a double helix found in the nucleus, coiled into <strong>chromosomes</strong>. A <strong>gene</strong> is a section of DNA that codes for a particular protein, which affects a characteristic. Humans have 23 pairs of chromosomes (46).'},
    {tag: 'rule', title: 'Alleles', text: 'Different versions of a gene (e.g. for eye colour). You inherit one allele of each gene from each parent.'},
    {tag: 'rule', title: 'Dominant and recessive', text: 'A dominant allele (capital letter, B) shows its effect even with one copy. A recessive allele (lower case, b) shows only if both copies are recessive (bb).'},
    {tag: 'rule', title: 'Genotype and phenotype', text: 'Genotype: the alleles you have (BB, Bb, bb). Phenotype: the feature you show (brown or blue eyes). Homozygous: two the same (BB or bb). Heterozygous: two different (Bb).'},
    {tag: 'rule', title: 'Genetic crosses', text: 'Write each parent’s gametes along the sides of a Punnett square and fill the boxes. Bb × Bb gives BB : Bb : bb = 1 : 2 : 1, so 3 : 1 dominant to recessive phenotype (a 25% chance of the recessive feature for each child).'},
    {tag: 'rule', title: 'Sex determination', text: 'Women are XX; men are XY. Every egg carries X; sperm carry X or Y. So each child has a 50% chance of being a boy.'},
    {tag: 'rule', title: 'Sexual and asexual reproduction', text: 'Sexual: two parents, gametes fuse, offspring vary (good for surviving change). Asexual: one parent, offspring are genetically identical clones (fast; e.g. bacteria, strawberry runners).'},
    {tag: 'watch', title: 'Probability is per child', text: 'A 1 in 4 chance does not mean that one child in every family of four will be affected. Each child is a separate event, like tossing a coin.'}
  ],
  worked: [
    {q: 'Cystic fibrosis is caused by a recessive allele (f). Two parents are carriers (Ff). What is the probability their child has cystic fibrosis?', steps: ['Gametes from each parent: F or f.', 'Punnett square: FF, Ff, Ff, ff.', 'Only ff has the disease: 1 out of 4.'], a: '1/4 (25%)'},
    {q: 'A black mouse is crossed with a white mouse (black is dominant). All 8 offspring are black. What are the parents’ genotypes most likely to be?', steps: ['The white mouse must be bb (recessive phenotype).', 'If the black parent were Bb, about half the offspring would be white.', 'All black suggests the black parent is BB, so every offspring is Bb.'], a: 'BB × bb'}
  ],
  quiz: [
    {q: 'An organism with genotype Tt is:', opts: ['homozygous dominant', 'heterozygous', 'homozygous recessive', 'a clone'], correct: 1, explain: 'Two different alleles.'},
    {q: 'Tt × tt gives offspring in what ratio of tall to short?', opts: ['3 : 1', '1 : 1', '1 : 0', '1 : 2 : 1'], correct: 1, explain: 'Tt, Tt, tt, tt: half tall, half short.'},
    {q: 'How many chromosomes are in a human egg cell?', opts: ['46', '23', '92', '22'], correct: 1, explain: 'Gametes have half the number, so that fertilisation gives 46.'},
    {q: 'A gene is:', opts: ['a whole chromosome', 'a section of DNA coding for a protein', 'a type of cell', 'a pair of alleles'], correct: 1, explain: 'Genes are sections of DNA.'},
    {q: 'The phenotype describes:', opts: ['the alleles present', 'the observable characteristic', 'the chromosomes', 'the DNA sequence'], correct: 1, explain: 'Genotype is the alleles; phenotype is what you see.'}
  ],
  challenges: [
    {prompt: 'Two brown-eyed parents have a blue-eyed child. Brown (B) is dominant. Explain how this is possible with a genetic diagram, and give the chance of their next child having blue eyes.', marks: 4, answer: 'Both parents must be heterozygous, Bb, each carrying the recessive allele. Gametes: B or b from each. Offspring: BB, Bb, Bb, bb. The blue-eyed child is bb, having received b from both. The chance of the next child having blue eyes is still 1/4 (25%), since each child is independent. (Eye colour is really controlled by several genes; this is a simplified model.)'},
    {prompt: 'Give one advantage and one disadvantage of asexual reproduction for a plant like a strawberry.', marks: 2, answer: 'Advantage: it is fast, needs only one parent (no pollination), and offspring keep the parent’s successful features. Disadvantage: no variation, so if the environment changes or a disease strikes, all the clones may be equally affected and die.'}
  ],
  keywords: [['Allele', 'A different version of a gene.'], ['Dominant', 'Shows its effect even with one copy.'], ['Recessive', 'Shows its effect only with two copies.'], ['Genotype', 'The alleles an organism has.'], ['Phenotype', 'The characteristic shown.']],
  stretch: 'A level covers <strong>dihybrid crosses</strong> (two genes at once, giving the classic 9 : 3 : 3 : 1 ratio), <strong>codominance</strong> (both alleles show, as in AB blood group), sex linkage (genes on the X chromosome, such as colour blindness, which is why it is more common in boys), and the <strong>chi-squared test</strong> to check whether observed ratios fit the expected ones.',
  links: [['Save My Exams: inheritance', 'https://www.savemyexams.com/']]
});

lesson({id: 'evolution', code: 'B9', subject: 'biology', title: 'Variation, evolution and classification', level: 'GCSE',
  search: 'GCSE biology variation natural selection evolution classification',
  intro: 'No two organisms are identical, and that variation is what natural selection acts on. This lesson connects the variation practical to Darwin’s big idea.',
  goals: ['Tell genetic and environmental variation apart, and continuous and discontinuous variation', 'Explain natural selection step by step', 'Describe evidence for evolution, including antibiotic resistance', 'Classify organisms and use a key'],
  points: [
    {tag: 'rule', title: 'Causes of variation', text: 'Genetic (inherited: eye colour, blood group), environmental (scars, language, accent) or both (height, weight: genes set the range, diet decides where you end up).'},
    {tag: 'rule', title: 'Continuous and discontinuous', text: 'Continuous: any value within a range (height, hand span): plot as a histogram, often a bell-shaped normal distribution. Discontinuous: distinct groups (blood group, tongue rolling): plot as a bar chart.'},
    {tag: 'rule', title: 'Natural selection', text: '1 Individuals in a population vary. 2 There is competition for food, mates and space, and there are predators and disease. 3 Those with features best suited to the environment are more likely to survive and reproduce. 4 They pass on the alleles for those features. 5 Over many generations those features become more common. That is evolution.'},
    {tag: 'rule', title: 'Evidence', text: 'Fossils show gradual change over time. Antibiotic-resistant bacteria (MRSA) evolve in years: a random mutation gives resistance, antibiotics kill the rest, and the resistant ones multiply. Peppered moths: dark moths became common in sooty industrial areas because birds could not see them.'},
    {tag: 'rule', title: 'Extinction', text: 'Happens when a species cannot adapt fast enough to a change: new predators or diseases, habitat loss, climate change, competition.'},
    {tag: 'rule', title: 'Classification', text: 'Kingdom, phylum, class, order, family, genus, species (“King Philip came over for good soup”). Five kingdoms: animals, plants, fungi, protoctists, prokaryotes. Each species has a two-part Latin name: genus then species, <em>Homo sapiens</em>.'},
    {tag: 'rule', title: 'Species', text: 'Organisms that can breed together to produce <em>fertile</em> offspring. A horse and donkey make a mule, which is infertile, so they are separate species.'},
    {tag: 'watch', title: 'Individuals do not evolve', text: 'A giraffe did not stretch its neck and pass that on. Variation already existed; selection changed how common each version was in the population.'}
  ],
  labs: ['variation'],
  worked: [
    {q: 'Explain how a population of rabbits could evolve thicker fur if the climate got colder.', steps: ['Some rabbits have thicker fur than others, because of variation in their alleles.', 'In the cold, rabbits with thin fur are more likely to die before breeding.', 'Rabbits with thicker fur survive and breed more, passing on alleles for thick fur.', 'Over many generations, thick fur becomes more common in the population.'], a: 'Natural selection of existing variation over many generations.'},
    {q: 'Hand spans of 30 pupils range from 16 to 23 cm. How should they be presented, and why?', steps: ['Hand span is continuous data.', 'Group into classes (16.0–16.9, 17.0–17.9 …), tally the frequency of each.', 'Draw a histogram with no gaps between the bars.'], a: 'A histogram of grouped frequencies, since the data is continuous.'}
  ],
  quiz: [
    {q: 'Which is an example of discontinuous variation?', opts: ['Height', 'Mass', 'Blood group', 'Hand span'], correct: 2, explain: 'You are in one group or another.'},
    {q: 'A scar is caused by:', opts: ['genes', 'environment', 'both', 'mutation'], correct: 1, explain: 'It is acquired, not inherited.'},
    {q: 'Antibiotic resistance spreads because:', opts: ['bacteria learn to resist', 'resistant bacteria survive treatment and reproduce', 'antibiotics make bacteria mutate on purpose', 'viruses help them'], correct: 1, explain: 'Selection: the non-resistant ones die.'},
    {q: 'Two organisms are the same species if they:', opts: ['look similar', 'live in the same place', 'can breed to produce fertile offspring', 'eat the same food'], correct: 2, explain: 'That is the definition of a species.'},
    {q: 'The largest group in classification is the:', opts: ['species', 'genus', 'family', 'kingdom'], correct: 3, explain: 'Kingdom is the broadest; species the narrowest.'}
  ],
  challenges: [
    {prompt: 'Explain why doctors tell patients to finish the full course of antibiotics, using ideas about natural selection.', marks: 4, answer: 'Bacteria vary; some are slightly more resistant than others. Stopping early kills the least resistant ones but may leave the most resistant alive. These survivors reproduce, passing on resistance, so the population becomes more resistant (natural selection). Finishing the course kills as many as possible, including the more resistant ones, reducing the chance of a resistant strain spreading.'},
    {prompt: 'Identical twins have the same genes. Suggest how a study of identical twins raised apart could show whether a feature is caused by genes or environment.', marks: 2, answer: 'Any differences between identical twins must be caused by the environment, since their genes are identical. If twins raised in different homes are still very similar in a feature (e.g. height), it is mostly genetic; if they differ a lot (e.g. accent, weight), the environment has a big effect.'}
  ],
  keywords: [['Variation', 'Differences between individuals.'], ['Natural selection', 'Better-adapted individuals survive and reproduce more.'], ['Evolution', 'Change in the inherited characteristics of a population over time.'], ['Species', 'Organisms that interbreed to give fertile offspring.'], ['Mutation', 'A random change in DNA.']],
  stretch: 'A level uses <strong>allele frequencies</strong> and the Hardy–Weinberg equation (p² + 2pq + q² = 1) to measure evolution in a population. It distinguishes directional, stabilising and disruptive selection, and explains how new species form when populations are isolated (allopatric speciation), as with Darwin’s Galápagos finches.',
  links: [['Save My Exams: evolution', 'https://www.savemyexams.com/']]
});

lesson({id: 'ecology', code: 'B10', subject: 'biology', title: 'Ecosystems, food webs and cycles', level: 'GCSE',
  search: 'GCSE biology food webs pyramids carbon cycle human impact',
  intro: 'Every organism depends on others. Food webs, pyramids and the carbon cycle show how energy and matter move, and how human actions upset the balance.',
  goals: ['Draw and interpret food chains and webs', 'Explain why energy is lost at each level, and draw pyramids', 'Describe the carbon cycle', 'Explain the effects of human activities, and how to sample with quadrats'],
  points: [
    {tag: 'rule', title: 'Food chains', text: 'Producer (plant, makes food by photosynthesis) → primary consumer (herbivore) → secondary consumer → tertiary consumer. Arrows show the direction energy flows: “is eaten by”.'},
    {tag: 'rule', title: 'Food webs', text: 'Interlinked food chains. Change one population and others change too: if foxes are removed, rabbits increase, then grass decreases.'},
    {tag: 'rule', title: 'Energy loss', text: 'Only about 10% of the energy at one level is passed to the next. The rest is used in respiration (movement, keeping warm), lost in faeces and urine, or in parts not eaten (bones, roots). That is why chains rarely have more than 4 or 5 links.'},
    {tag: 'rule', title: 'Pyramids', text: 'Pyramid of numbers can be an odd shape (one oak tree feeds thousands of caterpillars). Pyramid of biomass (dry mass at each level) is almost always a true pyramid.'},
    {tag: 'rule', title: 'Carbon cycle', text: 'Photosynthesis removes CO₂ from the air. Respiration (by plants, animals and decomposers) and combustion return it. Decomposers (bacteria, fungi) break down dead material, releasing CO₂ and recycling nutrients. Fossil fuels lock carbon away for millions of years.'},
    {tag: 'rule', title: 'Human impact', text: 'Deforestation (less photosynthesis, more CO₂, habitat loss), fossil fuels (global warming, acid rain), fertiliser run-off (eutrophication: algae bloom, oxygen falls, fish die), pesticides that build up along a food chain (bioaccumulation, e.g. DDT in birds of prey).'},
    {tag: 'rule', title: 'Sampling', text: 'Place quadrats at random (coordinates from a random number generator), count organisms in each, find the mean per quadrat, then scale up: population ≈ mean per m² × area. Use a transect to see how distribution changes across a habitat.'},
    {tag: 'rule', title: 'Adaptations and interdependence', text: 'Organisms are adapted to their habitat (cactus spines and deep roots; polar bear thick fur and small ears). Plants depend on animals for pollination and dispersal; animals depend on plants for food and oxygen.'}
  ],
  labs: ['variation', 'photosynthesis'],
  worked: [
    {q: 'Grass contains 10 000 kJ of energy. Assuming 10% passes on each time, how much reaches the hawk in: grass → grasshopper → frog → hawk?', steps: ['Grasshopper: 10% of 10 000 = 1000 kJ.', 'Frog: 10% of 1000 = 100 kJ.', 'Hawk: 10% of 100 = 10 kJ.'], a: '10 kJ'},
    {q: 'A field is 2000 m². Ten 1 m² quadrats contain 3, 5, 2, 0, 4, 6, 3, 2, 4, 1 daisies. Estimate the population.', steps: ['Total = 30 daisies in 10 m².', 'Mean = 3 per m².', 'Population ≈ 3 × 2000 = 6000 daisies.'], a: 'about 6000'}
  ],
  quiz: [
    {q: 'In a food chain, the arrows show:', opts: ['what eats what, pointing to the eater', 'what is eaten, pointing to the food', 'the size of each animal', 'where they live'], correct: 0, explain: 'They show the direction of energy flow, from food to the feeder.'},
    {q: 'Why are there fewer animals at the top of a food chain?', opts: ['They are bigger', 'Energy is lost at each level, so less is available', 'They are hunted', 'They breed slowly'], correct: 1, explain: 'Only about 10% of energy passes up each level.'},
    {q: 'Which process removes CO₂ from the atmosphere?', opts: ['Respiration', 'Combustion', 'Photosynthesis', 'Decomposition'], correct: 2, explain: 'Plants take in CO₂ to make glucose.'},
    {q: 'Fertiliser washed into a lake causes fish to die because:', opts: ['fertiliser is poisonous', 'algae grow, die, and decomposers use up the oxygen', 'the water gets warmer', 'plants eat the fish'], correct: 1, explain: 'Eutrophication: bacteria decomposing the dead algae respire and use up the dissolved oxygen.'},
    {q: 'Quadrats should be placed:', opts: ['where there are most organisms', 'at random', 'all in one corner', 'only in the shade'], correct: 1, explain: 'Random placement avoids bias.'}
  ],
  challenges: [
    {prompt: 'A pesticide is sprayed on a field at low concentration. Years later, high levels are found in birds of prey. Explain why.', marks: 3, answer: 'The pesticide is not broken down or excreted, so it is stored in the bodies of the organisms that take it in. Each herbivore eats many plants, and each predator eats many herbivores, so the pesticide builds up to higher concentrations at each level (bioaccumulation). Top predators eat the most contaminated food and get the highest doses, which can kill them or weaken their eggshells (as DDT did).'},
    {prompt: 'Explain how carbon in a dead leaf can end up in the body of a rabbit.', marks: 3, answer: 'Decomposers (bacteria and fungi) feed on the leaf and respire, releasing the carbon as carbon dioxide into the air. Grass absorbs the CO₂ in photosynthesis and makes glucose, then other carbon compounds. The rabbit eats the grass, digests it and uses the carbon compounds to build its own body.'}
  ],
  keywords: [['Producer', 'An organism that makes its own food (plant).'], ['Consumer', 'An organism that eats others.'], ['Decomposer', 'Breaks down dead material (bacteria, fungi).'], ['Biomass', 'The mass of living material.'], ['Eutrophication', 'Excess nutrients in water leading to oxygen loss.']],
  stretch: 'A level calculates the <strong>efficiency of energy transfer</strong> (energy available to the next level ÷ energy at this level × 100) and net primary productivity (gross productivity minus respiratory losses). It also studies the nitrogen cycle in detail: nitrogen-fixing bacteria in root nodules, nitrification and denitrification.',
  links: [['Save My Exams: ecosystems', 'https://www.savemyexams.com/']]
});

lesson({id: 'health', code: 'B11', subject: 'biology', title: 'Health, disease and the immune system', level: 'GCSE',
  search: 'GCSE biology communicable disease immune system vaccination antibiotics',
  intro: 'Microbes cause diseases, and your body has layers of defence against them. Vaccines and antibiotics are among the greatest achievements of science, and you need to explain how they work.',
  goals: ['Name the types of pathogen and how diseases spread', 'Describe the body’s defences and how white blood cells work', 'Explain vaccination', 'Explain how antibiotics work and why they do not affect viruses'],
  points: [
    {tag: 'rule', title: 'Pathogens', text: 'Microorganisms that cause disease: bacteria (e.g. salmonella, tuberculosis), viruses (flu, measles, HIV, COVID-19), fungi (athlete’s foot) and protists (malaria). Bacteria release toxins; viruses reproduce inside cells and burst them.'},
    {tag: 'rule', title: 'Spread', text: 'By air (droplets from coughs and sneezes), water, food, direct contact, body fluids, and vectors (mosquitoes carry malaria). Reduce spread with hygiene, isolating the sick, killing vectors, and vaccination.'},
    {tag: 'rule', title: 'First line of defence', text: 'Skin (a barrier), mucus and cilia in the airways (trap and sweep out microbes), stomach acid (kills microbes in food), tears (contain enzymes), blood clotting (seals wounds).'},
    {tag: 'rule', title: 'White blood cells', text: 'Phagocytes engulf and digest pathogens. Lymphocytes make <strong>antibodies</strong>, which fit the specific antigens on a pathogen and make them clump together, and <strong>antitoxins</strong>, which neutralise toxins. Memory cells remain, so a second infection is fought off fast.'},
    {tag: 'rule', title: 'Vaccination', text: 'A vaccine contains dead, weakened or harmless parts of a pathogen. Lymphocytes respond and make memory cells, without you getting ill. If the real pathogen arrives, antibodies are made quickly before you feel ill. If enough people are vaccinated, the disease cannot spread: <strong>herd immunity</strong>.'},
    {tag: 'rule', title: 'Antibiotics', text: 'Drugs such as penicillin (discovered by Alexander Fleming, 1928) that kill bacteria inside the body. They do <em>not</em> work on viruses, which live inside our own cells. Painkillers treat symptoms but do not kill pathogens.'},
    {tag: 'rule', title: 'Non-communicable disease', text: 'Not caused by pathogens and not spread: heart disease, many cancers, type 2 diabetes. Risk factors include smoking, poor diet, obesity, alcohol and lack of exercise.'},
    {tag: 'watch', title: 'Antibodies are not cells', text: 'Antibodies are proteins made by lymphocytes. Phagocytes do not make antibodies; they engulf microbes.'}
  ],
  worked: [
    {q: 'Explain why a person who has had chickenpox rarely catches it again.', steps: ['During the first infection, lymphocytes made antibodies specific to the chickenpox virus’s antigens.', 'Memory cells were also made, and stay in the blood for years.', 'On a second infection, memory cells make the right antibodies very quickly and in large numbers.', 'The virus is destroyed before symptoms appear: the person is immune.'], a: 'Memory cells give a fast secondary response: immunity.'},
    {q: 'A doctor refuses to give antibiotics for a cold. Explain why.', steps: ['Colds are caused by viruses.', 'Antibiotics kill bacteria but not viruses, which reproduce inside our cells.', 'Unnecessary antibiotics also encourage antibiotic-resistant bacteria to evolve.'], a: 'They would not work, and overuse spreads resistance.'}
  ],
  quiz: [
    {q: 'Malaria is caused by a:', opts: ['bacterium', 'virus', 'protist', 'fungus'], correct: 2, explain: 'A protist (Plasmodium), spread by mosquitoes.'},
    {q: 'Antibodies are made by:', opts: ['phagocytes', 'lymphocytes', 'red blood cells', 'platelets'], correct: 1, explain: 'Lymphocytes are a type of white blood cell.'},
    {q: 'Antibiotics cannot treat:', opts: ['tuberculosis', 'salmonella food poisoning', 'flu', 'bacterial infections'], correct: 2, explain: 'Flu is a viral infection.'},
    {q: 'A vaccine works by:', opts: ['killing all pathogens', 'stimulating memory cells without causing illness', 'replacing white blood cells', 'curing the disease after infection'], correct: 1, explain: 'It prepares the immune system in advance.'},
    {q: 'Which is a non-communicable disease?', opts: ['Measles', 'Type 2 diabetes', 'Tuberculosis', 'Athlete’s foot'], correct: 1, explain: 'It is not caused by a pathogen and cannot be caught.'}
  ],
  challenges: [
    {prompt: 'Explain why it is important for a high proportion of a population to be vaccinated against measles, even though some people cannot be vaccinated (for example, very young babies).', marks: 3, answer: 'If most people are immune, an infected person is unlikely to meet someone who can catch it, so the virus cannot spread through the population (herd immunity). This protects the people who cannot be vaccinated, such as young babies and those with weak immune systems. If vaccination rates fall, outbreaks can return.'},
    {prompt: 'Sketch and explain a graph of antibody level in the blood after a first and a second exposure to the same pathogen.', marks: 4, answer: 'After the first exposure, antibody level rises slowly over about 1–2 weeks to a modest peak, then falls (the person may feel ill during this delay). After the second exposure, the level rises much faster (within days), reaches a much higher peak and stays high longer, because memory cells recognise the antigen and quickly produce many antibodies. The pathogen is destroyed before symptoms develop.'}
  ],
  keywords: [['Pathogen', 'A microorganism that causes disease.'], ['Antigen', 'A molecule on a pathogen’s surface that triggers an immune response.'], ['Antibody', 'A protein that binds to a specific antigen.'], ['Vaccine', 'Dead or weakened pathogen used to give immunity.'], ['Herd immunity', 'Protection of the unvaccinated because most people are immune.']],
  stretch: 'At A level, the immune response is split into <strong>cell-mediated</strong> (T cells, which kill infected cells) and <strong>humoral</strong> (B cells, which become plasma cells making antibodies) responses. Antibodies are Y-shaped proteins with variable regions that fit one antigen. <strong>Monoclonal antibodies</strong>, all identical, are used in pregnancy tests and targeted cancer treatment.',
  links: [['Save My Exams: infection and response', 'https://www.savemyexams.com/']]
});
