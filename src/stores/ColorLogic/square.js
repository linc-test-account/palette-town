const assembleColor = require('./assembleColor');

function square() {
  const pos1 = Math.floor(Math.random() * 360);
  let pos2 = pos1 + 90;
  let pos3 = pos2 + 90;
  let pos4 = pos3 + 90;
  if (pos2 > 360) {
    pos2 = pos2 - 360;
  }
  if (pos3 > 360) {
    pos3 = pos3 - 360;
  }
  if (pos4 > 360) {
    pos4 = pos4 - 360;
  }
  return assembleColor(pos1, pos2, pos3, pos4);
}

module.exports = square;
