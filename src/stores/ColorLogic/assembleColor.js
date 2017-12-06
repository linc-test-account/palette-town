const randomSaturation = require("./randomSaturation");
const randomLightness = require("./randomLightness");

function assembleColor(colors, modifier) {
  if (modifier) {
    const SAT_MAX = modifier.saturationMax;
    const SAT_MIN = modifier.saturationMin;
    const LIT_MAX = modifier.lightnessMax;
    const LIT_MIN = modifier.lightnessMin;
    return colors.map(item => ({
      hue: item,
      saturation: Math.floor(Math.random() * (SAT_MAX - SAT_MIN) + SAT_MIN),
      lightness: Math.floor(Math.random() * (LIT_MAX - LIT_MIN) + LIT_MIN)
    }));
  } else {
    return colors.map(item => ({
      hue: item,
      saturation: randomSaturation(),
      lightness: randomLightness()
    }));
  }
}

module.exports = assembleColor;
