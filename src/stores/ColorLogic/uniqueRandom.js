const assembleColor = require("./assembleColor");

/** 
 * getRandomArr
 *
 * @param {number} length - Length of the array to be generated
 * @param {number} min - Inclusive lower limit on generated numbers 
 * @param {number} max - Exclusive upper limit on generated numbers
 * @param {number} delta - Enforced minimum delta between every value in array
 * 
 * @returns {object}  */

function getRandomArr(length, min, max, delta) {
  if (length === undefined || length <= 0) {
    throw new Error(
      `Invalid length: Expected minimum length of 1 but recieved ${length}`
    );
  }
  if (delta >= 0.2) {
    throw new Error(
      `Maximum delta exceeded. Expected delta of 0 to .1 but recieved ${delta}`
    );
  }

  const arr = [];

  // if arr is empty, push initial value to it
  if (arr.length === 0) {
    arr.push(Math.floor(Math.random() * (max - min) + min));
  }

  if (arr.length > 0 && arr.length < length) {
    let i = arr.length;
    while (i < length) {
      const newVal = Math.floor(Math.random() * (max - min) + min);
      const sufficientDeviance = arr.every(
        item => Math.abs(newVal - item) > max * delta
      );

      if (sufficientDeviance === true) {
        arr.push(newVal);
        i++;
      }
    }
  }

  // if array is equal to length, return it
  if (arr.length === length) {
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
