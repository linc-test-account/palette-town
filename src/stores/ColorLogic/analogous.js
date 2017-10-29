const assembleColor = require('./assembleColor');


function analogous() {
  const HUES = 360;
  const STEP = 60;
  const pos1 = Math.floor(Math.random() * HUES);
  let pos2 = pos1 + STEP;
  let pos3 = pos2 + STEP;
  if (pos2 > HUES) {
    pos2 = pos2 - HUES;
  }
  if (pos3 > HUES) {
    pos3 = pos3 - HUES;
  }
  return assembleColor(pos1, pos2, pos3);
}

module.exports = analogous;
