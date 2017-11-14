function getContrastYIQ(hexcolor) {
  try {
    const myString = hexcolor.substring(1);
    const r = parseInt(myString.substr(0, 2), 16);
    const g = parseInt(myString.substr(2, 2), 16);
    const b = parseInt(myString.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? 0 : 100;
  } catch (e) {
    console.log(e);
  }
}

module.exports = getContrastYIQ;
