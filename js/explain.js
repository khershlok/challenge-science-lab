/* Plain-English explanations of every practical, plus labels drawn on the apparatus.
   what  = what the experiment is and why we do it
   setup = where everything goes, in order
   going = what is happening (the science) while it runs, and how to read the result
   labels(s) = [text, pointX, pointY, labelX, labelY] callouts drawn over the animation */
'use strict';
const EXPLAIN = {};
const XP = (id, o) => { EXPLAIN[id] = o; };

/* ---------------- physics ---------------- */
XP('hanging-masses', {
  what: 'A 20 cm steel bar hangs level from two newton-meters, one at each end. You hang a 100 g mass on the bar and slide it from one end to the other, 1 cm at a time, reading both meters each time. The question is: how does the weight get shared between the two supports? This is the exact practical in the specimen Specialism paper.',
  setup: ['Clamp a horizontal rod high on a stand.', 'Hang newton-meter 1 and newton-meter 2 from the rod, 20 cm apart.', 'Hook the steel bar onto the bottom of both meters, so it hangs level. With nothing on it, each meter shows half the bar’s weight (0.3 N).', 'Hang the 100 g mass (weight 1 N) on the bar at 0 cm, right under meter 1.', 'Read both meters, then move the mass 1 cm towards meter 2 and read again. Repeat to 20 cm, then do it all again for repeats.'],
  going: 'The two meters always add up to the total weight (with a 100 g mass: 1 N for the mass + 0.6 N for the bar = 1.6 N), because the bar is not moving up or down. But the share changes: the meter the mass is closer to takes more of the weight. This is the principle of moments: taking moments about meter 1, meter 2’s reading × 20 cm = 1 N × distance of the mass + 0.6 N × 10 cm. So meter 2 goes up by 0.05 N for every 1 cm, and meter 1 goes down by the same amount. On a graph, both lines are straight, one rising and one falling, and they cross in the middle (10 cm), where the weight is shared equally.',
  labels: s => {
    const yl = 258 + s.Lr * 3, yr = 258 + s.Rr * 3, mx = 200 + s.x * 14, my = yl + (yr - yl) * s.x / 20;
    return [['Newton-meter 1', 200, 150, 120, 150], ['Newton-meter 2', 480, 150, 560, 150], ['Clamp stand holds\nboth meters', 605, 90, 660, 230],
      ['Steel bar, 20 cm long\n(weight 0.6 N)', 340, (yl + yr) / 2, 330, 225], [`${s.m} g mass (${s.m / 100} N):\ndrag it along the bar`, mx, my + 30, mx, 395]];
  }
});
XP('hookes-law', {
  what: 'You hang a spring from a clamp and add masses to it one at a time, measuring how far it stretches each time. You are testing Hooke’s law: does the extension go up in equal steps when the force goes up in equal steps?',
  setup: ['Clamp the spring at the top of a stand. Clamp a metre rule vertically right next to it.', 'Fix a pointer (a splint or pin) to the bottom of the spring so it touches the ruler.', 'Read the pointer with nothing hanging: this is the original reading (9.0 cm here).', 'Hang a 100 g mass hanger (1 N). Read the pointer at eye level. Extension = new reading − original reading.', 'Add 100 g at a time and repeat. Then remove the masses to check the spring goes back to its original length.'],
  going: 'Each 100 g pulls down with 1 N. For the first 5 N, every extra newton stretches the spring by the same 2.5 cm: the extension is directly proportional to the force, so the graph of extension against force is a straight line through the origin. Past 5 N the spring has gone beyond its limit of proportionality: the coils start to open out, it stretches more for each newton and the line curves. Go too far and it will not return to its original length (permanently stretched).',
  labels: s => {
    const bot = 50 + 8 + s.len * 7;
    return [['Spring hangs from\nthe clamp', 330, 70, 230, 40], ['Pointer: read the ruler\nhere, at eye level', 392, bot, 560, 215], ['Metre rule, clamped\nupright beside the spring', 404, 330, 560, 290], s.F ? [`Masses: ${s.F * 100} g = ${s.F} N`, 330, bot + 20, 210, Math.min(400, bot + 40)] : null];
  }
});
XP('moments', {
  what: 'A metre rule balances on a pivot at its middle (the 50 cm mark). A weight hangs on the left, and you move a second weight on the right until the rule balances. You are testing the principle of moments: when it balances, does force × distance on one side equal force × distance on the other?',
  setup: ['Balance the metre rule on the pivot at the 50 cm mark.', 'Hang a fixed weight a measured distance to the left of the pivot.', 'Hang the second weight on the right and slide it (drag it) until the rule is level.', 'Measure both distances from the pivot, not from the end of the ruler.'],
  going: 'Each weight tries to turn the ruler: the left one anticlockwise, the right one clockwise. The turning effect (moment) = weight × distance from the pivot. The ruler balances when the two moments are equal. So a heavier weight must sit closer to the pivot, and a lighter one further away. If you double the weight on the right, you need half the distance.',
  labels: s => {
    const PV = {x: 360, y: 290}, x1 = PV.x - Math.cos(s.a) * s.d1 * 6, y1 = PV.y - Math.sin(s.a) * s.d1 * 6, x2 = PV.x + Math.cos(s.a) * s.d2 * 6, y2 = PV.y + Math.sin(s.a) * s.d2 * 6;
    return [['Pivot at the 50 cm mark', 360, 330, 470, 380], ['Metre rule', 160, PV.y - 6, 160, 240], ['Fixed weight (left)', x1, y1 + 40, x1, 400], ['Weight you move:\ndrag it to balance', x2, y2 + 40, Math.min(640, x2 + 30), 140]];
  }
});
XP('density', {
  what: 'Density tells you how much mass is packed into each cm³. You measure an object’s mass on a balance and its volume, then calculate density = mass ÷ volume. Regular blocks are measured with a ruler; irregular objects (a stone) have their volume measured by the water they push out of a eureka can.',
  setup: ['Zero the balance, then weigh the object.', 'Regular shape: measure length, width and height with a ruler and multiply them.', 'Irregular shape: fill the eureka can with water until it drips from the spout, and wait for it to stop.', 'Put an empty measuring cylinder under the spout. Lower the object in gently on a thread.', 'The water that comes out of the spout has the same volume as the object. Read it at eye level.'],
  going: 'When the object goes into the full can, it takes up space, so exactly its own volume of water is pushed out of the spout. Mass ÷ volume gives the density. Comparing densities identifies materials (aluminium 2.7 g/cm³, steel 7.9 g/cm³) and predicts floating: anything less dense than water (1.0 g/cm³) floats.',
  labels: () => [['Balance: zero it,\nthen weigh', 125, 345, 125, 280], ['Eureka can, filled\nto the spout', 330, 260, 240, 160], ['Spout: displaced\nwater runs out', 440, 240, 560, 150], ['Measuring cylinder\ncollects the water', 488, 330, 610, 300]]
});
XP('light', {
  what: 'A ray box sends a thin beam of light at a glass block, a mirror or a prism. You change the angle the ray hits at and measure what happens to it. The experiment shows reflection (the ray bounces off), refraction (the ray bends as it enters glass) and dispersion (white light splits into colours).',
  setup: ['Put the glass block (or mirror) on a sheet of paper and draw round it.', 'Draw the normal: a line at 90° to the surface, where the ray will hit.', 'Shine the ray box along a marked angle to the normal.', 'Mark the ray coming out with two crosses, remove the block and join the points up.', 'Measure the angles from the normal with a protractor.'],
  going: 'Light travels more slowly in glass than in air. When a ray goes into the glass at an angle, one side of the beam slows first, so it swings round towards the normal (smaller angle). Coming out, it speeds up and bends away from the normal, ending up parallel to the ray that went in. A mirror reflects it so the angle of reflection equals the angle of incidence. A prism bends each colour by a slightly different amount, so white light fans out into a spectrum: red least, violet most.',
  labels: s => {
    if (s.mode === 'prism') return [['White light from\nthe ray box', 160, 200, 90, 120], ['Glass prism', 380, 250, 380, 380], ['Spectrum: red bent least,\nviolet most', 600, 230, 620, 130]];
    const i = s.i * Math.PI / 180, sx = 330 - 190 * Math.sin(i), sy = 170 - 190 * Math.cos(i);
    const out = [['Ray box', sx, sy, sx - 30, sy + 40], ['Normal: at 90°\nto the surface', 330, 70, 440, 70], ['Incident ray', (sx + 330) / 2, (sy + 170) / 2, (sx + 330) / 2 - 70, (sy + 170) / 2]];
    if (s.mode === 'block') { const r = Math.asin(Math.sin(i) / 1.5); out.push(['Glass block', 470, 300, 600, 250], ['Refracted ray: bends\ntowards the normal', 330 + 85 * Math.tan(r), 255, 230, 300]); }
    else out.push(['Plane mirror', 500, 174, 600, 240], ['Reflected ray', 330 + 95 * Math.sin(i), 170 - 95 * Math.cos(i), 520, 90]);
    return out;
  }
});
XP('circuits', {
  what: 'You build circuits with cells, bulbs, a switch and ammeters, first with the bulbs in one loop (series) and then on separate branches (parallel). You measure the current and see how the brightness changes as you add more bulbs.',
  setup: ['Connect the cells (the battery) so that + joins to − between them.', 'Put the switch in the loop so you can turn the current on and off.', 'Series: connect the bulbs one after another in a single loop.', 'Parallel: give each bulb its own branch between the same two points.', 'Ammeters always go in series (in the loop, so the current flows through them).'],
  going: 'The cells push charge round the circuit; the blue dots show the charge moving. In series there is one path, so the same current flows through every bulb and both ammeters read the same. Adding bulbs adds resistance, so the current falls and every bulb gets dimmer. In parallel, each bulb gets the full voltage of the cells, so each stays bright, and the total current from the cells is the sum of the branch currents. That is why houses are wired in parallel.',
  labels: s => {
    const bx = s.type === 'series' ? 220 + 300 / (s.n + 1) + 30 : 360;
    return [['Cells (battery):\npush the current', 370, 378, 190, 400], ['Switch', 625, 245, 680, 300], ['Ammeter A1, in series:\nmeasures the current', 120, 255, 120, 330], ['Bulb', bx, 100, bx + 70, 60]];
  }
});
XP('electromagnet', {
  what: 'You wrap insulated wire round an iron nail and pass a current through it. This makes an electromagnet. You count how many paperclips it can pick up, changing the number of turns of wire, the current and the material of the core.',
  setup: ['Wind the insulated copper wire tightly round the nail, all in the same direction. Count the turns.', 'Connect the two ends of the wire to the power supply (with an ammeter, to set the current).', 'Switch on and dip the end of the nail into the pile of paperclips.', 'Lift it and count the clips held. Switch off and see if any stay on.'],
  going: 'A current in a wire makes a magnetic field around it. Coiling the wire adds up all the fields into one strong field, like a bar magnet, with a north and a south pole. The iron core concentrates the field and makes it much stronger. More turns or more current gives a stronger magnet, so more clips are held. Soft iron loses its magnetism when the current stops (useful: you can drop the load), but steel keeps some, so a few clips stay on.',
  labels: s => {
    const y = 150 - s.lift * 30;
    return [['Coil of insulated copper wire\n(more turns = stronger)', 330, y - 13, 300, 50], ['Iron nail = the core', 480, y, 600, 170], ['Power supply + ammeter:\nsets the current', 185, 300, 420, 320], ['Paperclips to pick up', 600, 385, 620, 300]];
  }
});
XP('sound', {
  what: 'A loudspeaker makes a sound and you change its frequency (pitch) and amplitude (loudness). The animation shows the air particles and an oscilloscope trace, and the real tone plays through your speakers so you can find the limits of your own hearing.',
  setup: ['A signal generator makes an electrical signal of a chosen frequency.', 'The loudspeaker turns it into sound: its cone vibrates back and forth.', 'A microphone picks up the sound and shows it on an oscilloscope screen.'],
  going: 'The cone pushes the air particles together (compressions) and then pulls back, leaving them spread out (rarefactions). These travel through the air as a longitudinal wave; each particle only vibrates back and forth. A higher frequency means more vibrations each second: a higher pitch and more waves squeezed onto the oscilloscope screen. A bigger amplitude means bigger vibrations: a louder sound and a taller trace. Humans hear roughly 20 Hz to 20 000 Hz; the top limit drops as you get older.',
  labels: () => [['Loudspeaker:\nthe cone vibrates', 62, 140, 52, 230], ['Oscilloscope: shows\nthe sound as a wave', 690, 330, 650, 410]]
});

/* ---------------- chemistry ---------------- */
XP('chromatography', {
  what: 'Inks and dyes are often mixtures of several colours. Chromatography separates them. You put spots of an unknown ink (X) and four known dyes (A–D) on a strip of paper and stand it in a solvent. As the solvent soaks up the paper, each dye travels a different distance, so you can see what X is made of. This was in the specimen Core paper.',
  setup: ['Draw a baseline in pencil about 1.5 cm from the bottom of the paper (pencil does not dissolve).', 'Put a small spot of each ink on the line, spaced out, and label them underneath in pencil.', 'Pour solvent into the beaker so it is below the baseline (or the spots would wash off into it).', 'Hang the paper so its bottom dips into the solvent. Leave it until the solvent is near the top.', 'Take it out, mark the solvent front in pencil straight away, and let it dry.'],
  going: 'The solvent creeps up the paper and carries the dyes with it. A dye that dissolves well in the solvent and does not stick much to the paper travels far; one that sticks to the paper travels a short way. So a mixture splits into separate spots. X has three: one matches A, one matches C, and one stays on the baseline (insoluble in this solvent). Rf = distance moved by the spot ÷ distance moved by the solvent; the same dye always has the same Rf in the same solvent.',
  labels: s => {
    const f = Math.min(9.2, 9.6 * (1 - Math.exp(-s.time / 22))), fy = 355 - f * 30;
    return [s.out ? null : ['Paper hangs from\na rod', 360, 54, 655, 60], ['Pencil baseline\nwith ink spots', 555, 355, 655, 320], s.out ? null : ['Solvent: below\nthe baseline', 560, 400, 655, 400], s.time > 0 && !s.out ? ['Solvent front\n(rising)', 555, fy, 655, Math.max(110, fy)] : null];
  }
});
XP('catalysts', {
  what: 'Hydrogen peroxide slowly breaks down into water and oxygen: 2H₂O₂ → 2H₂O + O₂. A catalyst speeds this up without being used up. You add 0.5 g of different powders to the same amount of hydrogen peroxide and collect the oxygen gas, measuring its volume every 20 seconds. The catalyst that makes oxygen fastest is the best. This was in the specimen Core paper.',
  setup: ['Pour 25 cm³ of hydrogen peroxide into the conical flask.', 'Weigh 0.5 g of the catalyst powder in a weighing boat (shown on the bench beside the flask).', 'Set up the gas collector: a measuring cylinder full of water, upside down in a trough of water, or a gas syringe.', 'Tip the catalyst into the flask, so it sits at the bottom in the peroxide, and immediately push in the bung, which has the delivery tube in it. Start the stopwatch.', 'The delivery tube runs from the bung to the collector, so all the gas goes there. Read the volume every 20 s.'],
  going: 'The catalyst is the dark powder at the bottom of the flask. Its surface gives the peroxide molecules an easier way to break apart (a lower activation energy), so bubbles of oxygen form on it. The gas travels along the delivery tube. In the upturned cylinder it rises to the top and pushes the water down, so the scale (0 at the top) shows the volume of oxygen. In a syringe, it pushes the plunger out. The reaction is fastest at the start, when there is most peroxide, then slows and stops when the peroxide is used up. Every catalyst gives the same final volume (same amount of peroxide); only the speed differs, so compare the gradients at the start.',
  labels: s => {
    const added = s.run || s.time;
    const out = [['Conical flask with 25 cm³\nhydrogen peroxide', 110, 380, 70, 300], ['Bung: pushed in as soon as\nthe catalyst is added', 150, 245, 110, 210], ['Delivery tube carries\nthe oxygen', 275, 200, 275, 176],
      s.cat === 'none' ? ['No catalyst: the control', 150, 395, 300, 345] : added ? ['Catalyst powder (0.5 g)\nat the bottom of the flask', 150, 398, 300, 345] : ['Catalyst, weighed out:\ntip it into the flask', 273, 390, 300, 345]];
    if (s.app === 'cyl') out.push(['Measuring cylinder, full of\nwater, upside down', 480, 260, 625, 250], ['Oxygen collects here and\npushes the water down', 460, 150, 625, 130]);
    else out.push(['Gas syringe: oxygen pushes\nthe plunger out', 430, 214, 430, 280]);
    return out;
  }
});
XP('diffusion', {
  what: 'Two experiments that show particles moving by themselves. In the first, a purple crystal is dropped into still water and you time how long the colour takes to spread to the sides of the beaker, at different temperatures. In the second (a teacher demonstration), ammonia and hydrogen chloride gases travel towards each other along a tube.',
  setup: ['Fill a beaker with water at a measured temperature and let it go completely still.', 'Use tweezers to drop one small crystal of potassium manganate(VII) into the middle.', 'Do not stir. Time how long until the purple reaches the sides.', 'Gas tube: cotton wool soaked in ammonia goes in one end, cotton wool soaked in hydrochloric acid in the other, and both ends are sealed.'],
  going: 'The crystal dissolves and its particles move about randomly, bumping into water particles. Overall they spread from where there are many (around the crystal) to where there are few: diffusion. Nobody stirs it; the particles do it themselves. In hotter water they move faster, so the colour spreads sooner. In the tube, the two gases meet and react to make a white ring of solid ammonium chloride. The ring forms nearer the acid end, because ammonia particles are lighter, so they move faster and get further.',
  labels: s => s.mode === 'kmno4' ? [['Crystal of potassium\nmanganate(VII)', 360, 392, 610, 380], ['Purple colour spreading\n(no stirring)', 330, 330, 120, 300], ['Thermometer', 474, 200, 610, 200], ['Beaker of still water', 230, 180, 110, 160]] : [['Sealed glass tube', 360, 200, 360, 120]]
});
XP('rock-salt', {
  what: 'Rock salt is salt mixed with sand and grit, as it comes out of the ground. You separate the pure salt in five steps, then work out what percentage of the rock salt was actually salt. It shows three separation techniques: dissolving, filtering and crystallising.',
  setup: ['Grind the rock salt in a mortar with a pestle so the salt is exposed.', 'Put it in a beaker of warm water and stir with a glass rod.', 'Pour it through filter paper folded in a funnel, over a conical flask.', 'Heat the liquid that came through (the filtrate) in an evaporating basin on a tripod and gauze.', 'Dry the crystals and weigh them.'],
  going: 'Salt dissolves in water, but sand does not. That difference is the whole trick. Filtering lets the salt solution through the tiny holes in the paper but traps the sand (the residue). Heating the filtrate drives off water until the solution is saturated; as it cools, salt crystals form. Percentage of salt = mass of pure salt ÷ mass of rock salt × 100.',
  labels: s => [
    [['Pestle', 380, 200, 480, 160], ['Mortar with rock salt', 380, 330, 500, 330]],
    [['Glass rod: stir', 360, 190, 480, 200], ['Beaker of warm water', 300, 330, 190, 300]],
    [['Filter funnel lined with\nfilter paper', 300, 165, 170, 140], ['Conical flask', 300, 370, 200, 390]],
    [['Evaporating basin', 405, 285, 520, 260], ['Tripod and gauze', 335, 330, 210, 300], ['Bunsen burner', 360, 375, 230, 395]],
    [['Pure salt crystals\non a balance', 360, 300, 530, 300]]][s.step] || []
});
XP('distillation', {
  what: 'Distillation gets a pure liquid out of a mixture by boiling it and cooling the vapour. You can distil salty water to get pure water, or separate ethanol from water because ethanol boils at a lower temperature (78 °C) than water (100 °C). The thermometer tells you which liquid is coming over.',
  setup: ['Put the mixture in the round-bottomed flask, with a few anti-bumping granules.', 'Fit a thermometer in the top with its bulb level with the side arm, where the vapour leaves.', 'Connect the side arm to the condenser, which slopes down to a beaker.', 'Run cold water into the condenser jacket at the bottom and out at the top.', 'Heat gently (a heating mantle for ethanol, which is flammable) and collect the drips: the distillate.'],
  going: 'The mixture boils and the vapour rises into the side arm. Inside the condenser, the cold water around the tube cools the vapour so it condenses back into a liquid, which drips into the beaker. Dissolved salt cannot evaporate, so it stays in the flask and the distillate is pure water. With ethanol and water, the temperature stops at about 78 °C while the ethanol distils, then rises towards 100 °C when it has all gone and water starts coming over.',
  labels: () => [['Thermometer bulb level with the\nside arm: vapour temperature', 150, 172, 210, 28], ['Flask: the mixture\nboils here', 110, 300, 50, 230], ['Condenser: cold water\nturns vapour back to liquid', 340, 220, 330, 330], ['Distillate: the pure\nliquid collected', 485, 385, 625, 360]]
});
XP('neutralisation', {
  what: 'You add hydrochloric acid a little at a time to sodium hydroxide (an alkali) with universal indicator in it, and watch the pH fall. When exactly enough acid has been added, the solution is neutral (pH 7). This is how you find the volume of acid that neutralises the alkali (a titration).',
  setup: ['Use a pipette to put 25 cm³ of sodium hydroxide into a conical flask and add a few drops of universal indicator.', 'Fill the burette with hydrochloric acid and read the starting volume at eye level.', 'Stand the flask on a white tile under the burette.', 'Open the tap to add acid, swirling the flask. Near the end, add it drop by drop.', 'Stop when the colour turns green (pH 7) and read the burette.'],
  going: 'The acid’s hydrogen ions (H⁺) react with the alkali’s hydroxide ions (OH⁻) to make water: H⁺ + OH⁻ → H₂O. At first there is lots of OH⁻, so the pH is high (purple). As acid is added, the OH⁻ gets used up and the pH falls slowly through blue. Near 25 cm³ almost no OH⁻ is left, so one drop makes a big change: green (neutral), then yellow and red as extra acid makes it acidic. The product is sodium chloride (a salt) and water.',
  labels: () => [['Burette: hydrochloric acid,\nread at eye level', 340, 120, 150, 100], ['Tap: controls the flow', 340, 309, 190, 290], ['Conical flask: sodium hydroxide\n+ universal indicator', 340, 390, 160, 360], ['Clamp stand', 232, 200, 150, 200]]
});
XP('solubility', {
  what: 'You find the temperature at which a known mass of potassium nitrate just stays dissolved in 10 g of water. Doing this for several masses gives a solubility curve: how much solid can dissolve in 100 g of water at each temperature.',
  setup: ['Weigh the potassium nitrate into a boiling tube and add 10 cm³ (10 g) of water.', 'Heat the tube in a hot water bath, stirring with the thermometer, until all the solid dissolves.', 'Take it out and let it cool, stirring and watching closely.', 'Note the temperature when crystals first appear.', 'Add a little more water or solid and repeat for a new point.'],
  going: 'Most solids dissolve better in hotter water. When the hot solution cools, it reaches a temperature at which it holds the most solute it can: it is saturated. Any cooler and the extra solid comes out as crystals. So the temperature where crystals first appear is the point on the solubility curve for that concentration. Multiply by 10 to scale from 10 g of water to 100 g.',
  labels: s => [['Boiling tube: potassium\nnitrate + 10 g water', 270, 340, 110, 300], ['Thermometer: stir\nand read it', 287, 200, 120, 190], s.phase === 'heating' ? ['Hot water bath', 200, 390, 100, 410] : null, ['Your point on the\nsolubility curve', 440 + s.T / 100 * 260, 390 - s.m * 10 / 250 * 200, 600, 200]]
});
XP('heating-mass', {
  what: 'Two reactions where the mass changes when you heat something. Magnesium burns in air and gets heavier. Copper carbonate breaks down and gets lighter. Both show that mass is never lost or made: you just have to keep track of the gases.',
  setup: ['Magnesium: coil the ribbon into a crucible, weigh it with its lid, and put it on a pipeclay triangle on a tripod.', 'Heat strongly, lifting the lid a little now and then with tongs to let air in, until the magnesium stops glowing. Cool and reweigh.', 'Copper carbonate: weigh some green powder in a boiling tube, clamp it, and connect a delivery tube into limewater.', 'Heat it and watch the colour and the limewater. Cool and reweigh.'],
  going: 'Magnesium + oxygen → magnesium oxide. The oxygen comes from the air, so the product weighs more (0.24 g of magnesium becomes 0.40 g of oxide). Lifting the lid lets oxygen in; keeping it mostly on stops the white oxide smoke escaping. Copper carbonate → copper oxide + carbon dioxide. The carbon dioxide gas escapes, so the solid weighs less, and it turns the limewater milky. The green carbonate turns into black copper oxide.',
  labels: s => s.k === 'mg' ? [['Crucible with\nmagnesium ribbon', 260, 270, 110, 240], ['Lid: lift it a little\nto let air in', 260, 205, 410, 210], ['Pipeclay triangle\non a tripod', 238, 290, 110, 320], ['Bunsen burner', 260, 365, 120, 390]]
    : [['Copper carbonate\n(green) in a boiling tube', 330, 215, 380, 300], ['Delivery tube', 360, 160, 360, 136], ['Limewater: turns milky\nwith carbon dioxide', 520, 330, 640, 280], ['Bunsen burner', 230, 380, 110, 380]]
});

/* ---------------- biology ---------------- */
XP('photosynthesis', {
  what: 'A piece of pondweed in water gives off bubbles of oxygen when it photosynthesises. You put a lamp at different distances and count the bubbles per minute. Closer means brighter light, so you can see how light intensity affects the rate of photosynthesis.',
  setup: ['Put a piece of pondweed, cut end up, in a boiling tube of water with a little sodium hydrogencarbonate (it supplies carbon dioxide).', 'Stand a beaker of water (a heat shield) between the lamp and the tube, so the lamp does not warm the pondweed.', 'Put the lamp 10 cm away, measured with a ruler from the lamp to the pondweed.', 'Wait 5 minutes for the plant to adjust, then count bubbles for 1 minute.', 'Move the lamp further away and repeat.'],
  going: 'The pondweed uses light energy to make glucose from carbon dioxide and water, and the oxygen it releases forms the bubbles. The more light, the faster the bubbles, until something else (carbon dioxide or temperature) limits the rate. Light intensity falls quickly with distance (it is proportional to 1/d²), so doubling the distance gives a quarter of the light. The heat shield keeps temperature a control variable.',
  labels: s => {
    const lx = 520 - s.d * 9;
    return [['Lamp: move it to change\nthe light intensity', lx - 40, 240, Math.max(90, lx - 60), 150], ['Heat shield (water):\nkeeps temperature the same', lx + 35, 240, Math.max(120, lx + 20), 90], ['Pondweed in sodium\nhydrogencarbonate solution', 528, 320, 640, 300], ['Oxygen bubbles:\ncount them', 520, 170, 640, 170]];
  }
});
XP('yeast', {
  what: 'Yeast is a living fungus. Given sugar, it respires and gives off carbon dioxide. You keep a tube of yeast and sugar in a water bath at different temperatures and count the bubbles of gas per minute, to see how temperature affects the rate of respiration.',
  setup: ['Mix yeast with sugar solution in a boiling tube.', 'Stand the tube in a water bath at the chosen temperature, with a thermometer.', 'Fit a bung with a delivery tube, and put the end of the tube into a test tube of limewater.', 'Let it settle for a few minutes, then count the bubbles coming out in 1 minute.', 'Repeat at other temperatures. A tube with boiled (dead) yeast is the control.'],
  going: 'Without enough oxygen, yeast respires anaerobically: glucose → ethanol + carbon dioxide. The carbon dioxide bubbles through the limewater and turns it milky. Respiration is controlled by enzymes, so warming speeds it up, up to about 35–40 °C. Above that, the enzymes start to lose their shape (denature) and the bubbling slows, stopping completely by about 60 °C when the yeast dies.',
  labels: () => [['Yeast + sugar solution\nin a boiling tube', 200, 300, 70, 170], ['Water bath sets\nthe temperature', 140, 390, 60, 260], ['Delivery tube carries\nthe carbon dioxide', 335, 100, 335, 66], ['Limewater: turns\nmilky with CO₂', 478, 350, 610, 260]]
});
XP('food-tests', {
  what: 'Chemical tests show which nutrients a food contains. You add a test chemical (a reagent) to a food sample and look for a colour change: iodine for starch, Benedict’s for sugar, biuret for protein, and ethanol for fat. A tube of water with the same reagent is the control, to compare colours.',
  setup: ['Crush the food with a little water (or ethanol for the fat test) to get a sample.', 'Put a sample in a test tube and a sample of plain water in a second tube (the control).', 'Add the reagent to both tubes with a dropper.', 'For sugar, stand both tubes in a hot water bath (about 80 °C) for a few minutes.', 'Compare the colours.'],
  going: 'Each reagent reacts with one kind of molecule. Iodine turns from orange-brown to blue-black with starch. Benedict’s solution, when heated, goes from blue through green and yellow to brick red with sugar: the more sugar, the further along. Biuret turns from blue to purple with protein. Fat dissolved in ethanol forms a cloudy white emulsion when water is added. If the food tube matches the control, that nutrient is absent.',
  labels: s => [['Food sample +\nreagent', 350, 330, 530, 250], ['Control: water +\nreagent, to compare', 160, 300, 60, 130], s.go && s.p < .4 ? ['Dropper adds\nthe reagent', 350, 70, 230, 60] : null, s.test === 'g' ? ['Hot water bath\n(about 80 °C)', 270, 380, 130, 410] : null]
});
XP('microscope', {
  what: 'You look at cells through a light microscope: onion skin, cheek cells and pondweed leaf cells. You choose an objective lens, focus the image and see how many cells fit across the view at each magnification.',
  setup: ['Make a slide: a thin layer of cells in a drop of stain (iodine for onion, methylene blue for cheek cells), with a coverslip lowered at an angle so there are no air bubbles.', 'Clip the slide onto the stage with the lowest power (×4) objective in place.', 'Looking from the side, use the coarse focus to bring the lens close to the slide.', 'Look through the eyepiece and focus by moving the lens away, then use the fine focus.', 'Switch to a higher power and refocus with the fine focus only.'],
  going: 'Total magnification = eyepiece (×10) × objective. A higher magnification makes the cells look bigger, but you see less of the slide (the field of view gets smaller) and the image is dimmer and harder to focus. The stain makes the nucleus show up. Plant cells have a cell wall and, in leaves, green chloroplasts; onion cells have no chloroplasts because they grow underground; cheek (animal) cells have no wall.',
  labels: s => {
    const OBJ = {4: 4000, 10: 1600, 40: 400}, SM = {onion: [220, 60], leaf: [90, 45]}, um = OBJ[s.obj] / 380, out = [['What you see down the eyepiece:\nthe field of view', 260, 32, 260, 14]];
    if (SM[s.smp] && s.obj >= 10) { const w = SM[s.smp][0] / um, hh = SM[s.smp][1] / um; out.push(['Cell wall', 260 - w / 2, 220 - hh / 3, 120, 120], ['Nucleus', 260 + w / 5, 220, 400, 120]); if (s.smp === 'leaf') out.push(['Chloroplasts', 260 - w / 2 + 12 / um, 220 - hh / 4, 140, 330]); }
    if (s.smp === 'cheek' && s.obj >= 10) out.push(['Cell membrane (no wall)', 200, 300, 150, 380]);
    return out;
  }
});
XP('variation', {
  what: 'You measure one feature in 30 people. Hand span varies continuously (it can be any value), so it is shown as a histogram. Eye colour falls into separate groups (discontinuous), so it is shown as a bar chart. The experiment shows the two kinds of variation.',
  setup: ['Each person spreads one hand flat on a ruler.', 'Measure from the tip of the thumb to the tip of the little finger, to the nearest 0.1 cm.', 'Record everyone’s result, then group them into classes (e.g. 17.0–17.9 cm) and tally the frequency.', 'For eye colour, look closely and put each person into one category.'],
  going: 'Hand span depends on many genes and on the environment (such as diet), so the values spread out smoothly, with most people near the middle and fewer at the extremes: a bell-shaped (normal) distribution. Eye colour is mostly genetic and falls into distinct categories, with no in-betweens, so you count how many are in each group.',
  labels: s => [['Each figure is one\nperson in the class', 40, 70, 130, 28], s.mode === 'span' && s.i < 30 ? ['Ruler: thumb tip to\nlittle-finger tip', 400, 365, 600, 335] : null]
});
XP('spinners', {
  what: 'A paper spinner is a model of a sycamore seed. You drop it from 2.0 m and time how long it takes to land, changing the length of its wings. Longer flights mean the wind can carry a real seed further from the parent tree.',
  setup: ['Cut out a paper spinner, fold the wings out and add a paper clip at the bottom for weight.', 'Hold it at the 2.0 m mark of two metre rules clamped upright.', 'Let it go and start the stopwatch at the same moment.', 'Stop the stopwatch when it lands. Repeat three times and take the mean.', 'Shorten or lengthen the wings and repeat.'],
  going: 'As it falls, air pushes up on the wings and makes the spinner rotate. Spinning wings create air resistance, which acts upwards against its weight, so it soon falls at a steady (terminal) speed. Longer wings give more air resistance, so the terminal speed is lower and the fall takes longer. For a seed, more time in the air means more chance to be blown away, reducing competition with the parent.',
  labels: s => [['Paper spinner (a model\nsycamore seed)', 330, 40 + s.y * 360, 450, Math.min(400, 60 + s.y * 360)], ['Metre rules: start\nfrom the 2.0 m mark', 130, 300, 240, 400], ['Stopwatch: start on release,\nstop when it lands', 610, 100, 610, 145]]
});
XP('breathing', {
  what: 'Two activities about your lungs. The bell-jar model shows how pulling the diaphragm down makes the lungs fill with air. The vital-capacity experiment measures the biggest volume of air a person can breathe out in one go.',
  setup: ['Bell jar: a glass jar (the rib cage) with a rubber sheet across the bottom (the diaphragm). A tube through the bung (the trachea) splits into two branches (the bronchi), each with a balloon (a lung).', 'Pull the rubber sheet down and let it go.', 'Vital capacity: fill a large bottle with water, turn it upside down in a trough of water and feed a tube into it.', 'Take the deepest breath you can and breathe out fully through the tube.', 'Read the volume of air collected at the top of the bottle.'],
  going: 'Pulling the diaphragm down makes the space inside the jar bigger, so the pressure inside falls below the air pressure outside. Air is pushed in through the tube and the balloons inflate: breathing in. Letting go reverses it. In real lungs the intercostal muscles also lift the ribs, which the model cannot show. In the vital-capacity test, the air you breathe out pushes water out of the bottle; adults and trained swimmers usually manage more than children, and smokers less.',
  labels: s => s.mode === 'jar' ? [['Y-shaped tube = bronchi', 300, 165, 150, 150]] : [['Upturned bottle, full of\nwater, with a scale', 440, 120, 610, 200], ['Breathe out through\nthis tube', 250, 390, 130, 300], ['Trough of water', 270, 380, 130, 410]]
});
