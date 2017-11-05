const assembleColor = require('./assembleColor');


function triadic(modifier) {
  const HUES = 360;
  const STEP = 120;
  const colors = [];
  const pos1 = Math.floor(Math.random() * HUES);
  let pos2 = pos1 + STEP;
  let pos3 = pos2 + STEP;
  if (pos2 > HUES) {
    pos2 = pos2 - HUES;
  }
  if (pos3 > HUES) {
    pos3 = pos3 - HUES;
  }
  colors.push(pos1, pos2, pos3);
  return assembleColor(colors, modifier);
}

module.exports = triadic;
