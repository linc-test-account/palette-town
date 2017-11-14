export default hsl => {
  const hslStrings = hsl.map(
    ({ hue, saturation, lightness }) =>
      `hsl(${hue}, ${saturation}%, ${lightness}) \n` 
  );

  return hslStrings.join("");
};

