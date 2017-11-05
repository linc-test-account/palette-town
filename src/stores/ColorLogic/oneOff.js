const assembleColor = require('./assembleColor');

function oneOff(modifier) {
  const HUES = 360;
  const colors = [];
  const pos1 = Math.floor(Math.random() * HUES);
  colors.push(pos1)
  return assembleColor(colors, modifier);
}

module.exports = oneOff;
