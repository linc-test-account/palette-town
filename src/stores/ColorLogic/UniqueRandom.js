const assembleColor = require("./assembleColor");

function getRandomArr(size, min, max, deviation) {
  const arr = [];

  // if arr is empty, push initial value to it
  if (arr.length === 0) {
    arr.push(Math.floor(Math.random() * (max - min) + min));
  }

  let i = arr.length;

  if (arr.length > 0 && arr.length < size) {
    while (i < size) {
      const newVal = Math.floor(Math.random() * (max - min) + min);
      const sufficientDeviance = arr.every(
        item => Math.abs(newVal - item) > max * deviation
      );

      if (sufficientDeviance === true) {
        arr.push(newVal);
        i++;
      }
    }
  }

  // if array is equal to size, return it
  if (arr.length === size) {
    return arr;
  }
}

function uniqueRandom(modifier) {
  if (modifier.name !== "none") {
    const info = getRandomArr(5, 0, 360, 0.1);
    return assembleColor(info, modifier);
  } else {
    const info = {
      hue: getRandomArr(5, 0, 360, 0.1),
      saturation: getRandomArr(5, 0, 100, 0),
      lightness: getRandomArr(5, 0, 100, 0.1)
    };

    return info.hue.map((hue, i) => ({
      hue: hue,
      saturation: info.saturation[i],
      lightness: info.lightness[i]
    }));
  }
}

module.exports = uniqueRandom;
