const randomSaturation = require("./randomSaturation");
const randomLightness = require("./randomLightness");

function assembleColor(colors, modifier) {
  const output = [];
  if (modifier) {
    const SAT_MAX = modifier.saturationMax;
    const SAT_MIN = modifier.saturationMin;
    const LIT_MAX = modifier.lightnessMax;
    const LIT_MIN = modifier.lightnessMin;
    const output = [];
    for (let i = 0; i < colors.length; i++) {
      output.push({
        hue: colors[i],
        saturation: Math.floor(Math.random() * (SAT_MAX - SAT_MIN) + SAT_MIN),
        lightness: Math.floor(Math.random() * (LIT_MAX - LIT_MIN) + LIT_MIN)
      });
    }
    return output
  }
  else {
    for (let i = 0; i < colors.length; i++) {
      output.push({
        hue: colors[i],
        saturation: randomSaturation(),
        lightness: randomLightness()
      });
    }
    return output;
  }
}

module.exports = assembleColor;
