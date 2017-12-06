import Color from "./Color";

describe("Color", () => {
  it("should create an object with color values", () => {
    const color = new Color("rgb", 50, 50, 50);
    expect(color).toEqual(expect.objectContaining({
      blue: 50,
      cmyk: { cyan: 0, key: 80, magenta: 0, yellow: 0 },
      cyan: 0,
      green: 50,
      hex: "323232",
      hsl: { hue: 0, lightness: 20, saturation: 0 },
      hue: 0,
      key: 80,
      lightness: 20,
      magenta: 0,
      red: 50,
      rgb: { blue: 50, green: 50, red: 50 },
      saturation: 0,
      yellow: 0
    }))
  });
});
