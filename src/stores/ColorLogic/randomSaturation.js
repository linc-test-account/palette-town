function randomSaturation() {
  const MIN = 55;
  const MAX = 100;
  return Math.floor(Math.random() * (MAX - MIN) + MIN)
}

module.exports = randomSaturation;
