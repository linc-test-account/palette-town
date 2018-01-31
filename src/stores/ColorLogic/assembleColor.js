function assembleColor(hues, modifier) {
  if (modifier) {
    const SAT_MAX = modifier.saturationMax;
    const SAT_MIN = modifier.saturationMin;
    const LIT_MAX = modifier.lightnessMax;
    const LIT_MIN = modifier.lightnessMin;
    return hues.map(hue => ({
      hue: hue,
      saturation: Math.floor(Math.random() * (SAT_MAX - SAT_MIN) + SAT_MIN),
      lightness: Math.floor(Math.random() * (LIT_MAX - LIT_MIN) + LIT_MIN)
    }));
  }
}

module.exports = assembleColor;
