const assembleColor = require('./assembleColor');

function square() {
  const HUES = 360;
  const STEP = 90;
  const pos1 = Math.floor(Math.random() * HUES);
  let pos2 = pos1 + STEP;
  let pos3 = pos2 + STEP;
  let pos4 = pos3 + STEP;
  if (pos2 > HUES) {
    pos2 = pos2 - HUES;
  }
  if (pos3 > HUES) {
    pos3 = pos3 - HUES;
  }
  if (pos4 > HUES) {
    pos4 = pos4 - HUES;
  }
  return assembleColor(pos1, pos2, pos3, pos4);
}

module.exports = square;
