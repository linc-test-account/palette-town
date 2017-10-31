const assembleColor = require('./assembleColor');

function oneOff() {
  const HUES = 360;
  const colors = [];
  const pos1 = Math.floor(Math.random() * HUES);
  colors.push(pos1)
  return assembleColor(colors);
}

module.exports = oneOff;
