function generateHarmony(harmony) {
  const HUES = 360;
  const initialValue = Math.floor(Math.random() * HUES);

  return harmony.map(value => {
    return initialValue + value > 360
      ? initialValue + value - 360
      : initialValue + value;
  });
}

module.exports = generateHarmony;
