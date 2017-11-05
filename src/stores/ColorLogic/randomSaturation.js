function randomSaturation() {
  const MIN = 0;
  const MAX = 100;
  return Math.floor(Math.random() * (MAX - MIN) + MIN)
}

module.exports = randomSaturation;
