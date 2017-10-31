const randomSaturation = require("./randomSaturation");
const randomLightness = require("./randomLightness");

function assembleColor(colors) {
  const output = [];
  for (let i = 0; i < colors.length; i++) {
    output.push({
      hue: colors[i],
      saturation: randomSaturation(),
      lightness: randomLightness()
    });
  }
  return output;
}

module.exports = assembleColor;
