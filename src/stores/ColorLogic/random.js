const assembleColor = require("./assembleColor");

function random(modifier) {
  const HUES = 360;
  const DEFAULT_VAL = 5;
  const colors = [];

  for (let i = 0; i < DEFAULT_VAL; i++) {
    colors.push(Math.floor(Math.random() * HUES));
  }

  return assembleColor(colors, modifier);
}

module.exports = random;
