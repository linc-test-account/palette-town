const assembleColor = require('./assembleColor');

function oneOff() {
  const HUES = 360;
  const pos1 = Math.floor(Math.random() * HUES);
  return assembleColor(pos1);
}

module.exports = oneOff;
