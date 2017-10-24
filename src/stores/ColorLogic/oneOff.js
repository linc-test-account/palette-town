const assembleColor = require('./assembleColor');

function oneOff() {
  const pos1 = Math.floor(Math.random() * 360);
  return assembleColor(pos1);
}

module.exports = oneOff;
