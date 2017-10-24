const randomSaturation = require('./randomSaturation');
const randomLightness = require('./randomLightness');    

function assembleColor(a, b, c, d, e) {
  const c1 = a ? {hue: a, saturation: randomSaturation(), lightness: randomLightness()} : null;
  const c2 = b ? {hue: b, saturation: randomSaturation(), lightness: randomLightness()} : null;
  const c3 = c ? {hue: c, saturation: randomSaturation(), lightness: randomLightness()} : null;
  const c4 = d ? {hue: d, saturation: randomSaturation(), lightness: randomLightness()} : null;
  const c5 = e ? {hue: e, saturation: randomSaturation(), lightness: randomLightness()} : null;

  return [c1, c2, c3, c4, c5];
}

module.exports = assembleColor;
