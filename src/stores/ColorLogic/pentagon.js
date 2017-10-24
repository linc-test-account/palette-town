const assembleColor = require('./assembleColor');

function pentagon() {
  const pos1 = Math.floor(Math.random() * 360);
  let pos2 = pos1 + 30;
  let pos3 = pos2 + 30;
  let pos4 = pos3 + 30;
  let pos5 = pos4 + 30;
  if (pos2 > 360) {
    pos2 = pos2 - 360;
  }
  if (pos3 > 360) {
    pos3 = pos3 - 360;
  }
  if (pos4 > 360) {
    pos4 = pos4 - 360;
  }
  if (pos5 > 360) {
    pos5 = pos5 - 360;
  }
  return assembleColor(pos1, pos2, pos3, pos4, pos5);
}

module.exports = pentagon;
