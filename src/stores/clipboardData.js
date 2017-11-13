export default hsl => {
  const hslStrings = hsl.map(
    ({ hue, saturation, lightness }) =>
      `hsl(${hue}, ${saturation}%, ${lightness})`
  );

  // const rgbStrings = rgb.map(({red, green, blue}, index) => (
  //   `rgb(${red}, ${green}, ${blue})`
  // ))

  return hslStrings;
};

