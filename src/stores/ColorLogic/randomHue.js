function randomHue() {
  const HUES = 360;
  return Math.floor(Math.random() * HUES);
}

module.exports = randomHue;
