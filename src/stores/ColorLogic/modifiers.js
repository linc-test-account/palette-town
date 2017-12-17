const modifiers = {
  none: {
    name: "none",
    saturationMin: 0,
    saturationMax: 100,
    lightnessMin: 0,
    lightnessMax: 100
  },
  balanced: {
    name: "balanced",
    saturationMin: 30,
    saturationMax: 80,
    lightnessMin: 50,
    lightnessMax: 90
  },
  pastel: {
    name: "pastel",
    saturationMin: 50,
    saturationMax: 100,
    lightnessMin: 60,
    lightnessMax: 90
  },
  somber: {
    name: "somber",
    saturationMin: 0,
    saturationMax: 40,
    lightnessMin: 20,
    lightnessMax: 40
  },
  saturated: {
    name: "saturated",
    saturationMin: 100,
    saturationMax: 100,
    lightnessMin: 50,
    lightnessMax: 50
  },
  desaturated: {
    name: "desaturated",
    saturationMin: 30,
    saturationMax: 0,
    lightnessMin: 0,
    lightnessMax: 100
  },
  greyscale: {
    name: "greyscale",
    saturationMin: 0,
    saturationMax: 0,
    lightnessMin: 20,
    lightnessMax: 90
  }
};

module.exports = modifiers;
