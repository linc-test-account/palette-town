function randomLightness() {
  const MIN = 50;
  const MAX = 75;
  return Math.floor(Math.random() * (MAX - MIN) + MIN);
}

module.exports = randomLightness;
