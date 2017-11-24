const paletteModifiers = [
    {
      modifier: "none",
      saturationMin: 0,
      saturationMax: 100,
      lightnessMin: 0,
      lightnessMax: 100
    },
    {
      modifier: "balanced",
      saturationMin: 20,
      saturationMax: 100,
      lightnessMin: 50,
      lightnessMax: 90
    },
    {
      modifier: "pastel",
      saturationMin: 50,
      saturationMax: 100,
      lightnessMin: 60,
      lightnessMax: 90
    },
    {
      modifier: "somber",
      saturationMin: 0,
      saturationMax: 40,
      lightnessMin: 10,
      lightnessMax: 40
    },
    {
      modifier: "saturated",
      saturationMin: 100,
      saturationMax: 100,
      lightnessMin: 50,
      lightnessMax: 50
    },
    {
      modifier: "desaturated",
      saturationMin: 30,
      saturationMax: 0,
      lightnessMin: 0,
      lightnessMax: 100
    },
    {
      modifier: "greyscale",
      saturationMin: 0,
      saturationMax: 0,
      lightnessMin: 20,
      lightnessMax: 90
    }
  ];

  module.exports = paletteModifiers;