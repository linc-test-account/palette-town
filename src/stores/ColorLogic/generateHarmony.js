/**
 * generateHarmony
 *
 * Takes array of numbers corresponding to coordinates on
 * a color wheel and maps them to a new array keyed off
 * an initial randomly generated value named initialValue
 *
 * @param {array}   harmony           Array of numbers.
 *
 * @returns {array} New array.
 */

function generateHarmony(harmony) {
  const HUES = 360;
  const initialValue = Math.floor(Math.random() * HUES);
  return harmony.map(value => {
    return initialValue + value > HUES
      ? initialValue + value - HUES
      : initialValue + value;
  });
}

module.exports = generateHarmony;
