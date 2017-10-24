const assembleColor = require('./assembleColor');

function triadic() {
  const pos1 = Math.floor(Math.random() * 360);
  let pos2 = pos1 + 120;
  let pos3 = pos2 + 120;
  if (pos2 > 360) {
    pos2 = pos2 - 360;
  }
  if (pos3 > 360) {
    pos3 = pos3 - 360;
  }
  return assembleColor(pos1, pos2, pos3);
}

module.exports = triadic;
