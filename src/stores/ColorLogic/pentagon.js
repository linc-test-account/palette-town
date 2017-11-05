const assembleColor = require('./assembleColor');

function pentagon(modifier) {
  const HUES = 360;
  const STEP = 30;
  const colors = [];
  const pos1 = Math.floor(Math.random() * HUES);
  let pos2 = pos1 + STEP;
  let pos3 = pos2 + STEP;
  let pos4 = pos3 + STEP;
  let pos5 = pos4 + STEP;
  if (pos2 > HUES) {
    pos2 = pos2 - HUES;
  }
  if (pos3 > HUES) {
    pos3 = pos3 - HUES;
  }
  if (pos4 > HUES) {
    pos4 = pos4 - HUES;
  }
  if (pos5 > HUES) {
    pos5 = pos5 - HUES;
  }
  colors.push(pos1, pos2, pos3, pos4, pos5);

  return assembleColor(colors, modifier);
}

module.exports = pentagon;
