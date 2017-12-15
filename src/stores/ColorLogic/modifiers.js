const modifiers = [
    {
      name: "none",
      saturationMin: 0,
      saturationMax: 100,
      lightnessMin: 0,
      lightnessMax: 100
    },
    {
      name: "balanced",
      saturationMin: 30,
      saturationMax: 80,
      lightnessMin: 50,
      lightnessMax: 90
    },
    {
      name: "pastel",
      saturationMin: 50,
      saturationMax: 100,
      lightnessMin: 60,
      lightnessMax: 90
    },
    {
      name: "somber",
      saturationMin: 0,
      saturationMax: 40,
      lightnessMin: 20,
      lightnessMax: 40
    },
    {
      name: "saturated",
      saturationMin: 100,
      saturationMax: 100,
      lightnessMin: 50,
      lightnessMax: 50
    },
    {
      name: "desaturated",
      saturationMin: 30,
      saturationMax: 0,
      lightnessMin: 0,
      lightnessMax: 100
    },
    {
      name: "greyscale",
      saturationMin: 0,
      saturationMax: 0,
      lightnessMin: 20,
      lightnessMax: 90
    }
  ];

  module.exports = modifiers;