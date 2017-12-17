const generateHarmony = require("./generateHarmony");
const uniqueRandom = require("./uniqueRandom");

function getPalette(harmony, modifier) {
  const satMax = modifier.saturationMax;
  const satMin = modifier.saturationMin;
  const litMax = modifier.lightnessMax;
  const litMin = modifier.lightnessMin;

  if (harmony.length === 0) {
    return uniqueRandom(modifier);
  } else {
    console.log(true)
    const hues = generateHarmony(harmony);
    return hues.map(hue => ({
      hue: hue,
      saturation: Math.floor(Math.random() * (satMax - satMin) + satMin),
      lightness: Math.floor(Math.random() * (litMax - litMin) + litMin)
    }));
  }
}

module.exports = getPalette;
