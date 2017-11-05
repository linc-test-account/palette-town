const assembleColor = require("./assembleColor");

function tetradic(modifier) {
  const HUES = 360;
  const STEP_ONE = 30;
  const STEP_TWO = 160;

  const colors = [];

  const pos1 = Math.floor(Math.random() * HUES);

  let pos2 = pos1 + STEP_ONE;
  let pos3 = pos2 + STEP_TWO;
  let pos4 = pos3 + STEP_ONE;

  if (pos2 > HUES) {
    pos2 = pos2 - HUES;
  }

  if (pos3 > HUES) {
    pos3 = pos3 - HUES;
  }

  if (pos4 > HUES) {
    pos4 = pos4 - HUES;
  }

  colors.push(pos1, pos2, pos3, pos4);
  return assembleColor(colors, modifier);
}

module.exports = tetradic;
