import { observable, computed, extendObservable } from "mobx";
import { getContrastYIQ } from "./ColorLogic";
import pascalCase from "pascal-case";
import convert from "color-convert";
import namer from "color-namer";
import shortid from "shortid";

const colorSpaces = {
  rgb: ["red", "green", "blue"],
  hsl: ["hue", "saturation", "lightness"],
  cmyk: ["cyan", "magenta", "yellow", "key"],
  hex: ["hex"]
};

export default class Color {
  @observable properties = [];
  @observable selected = false;
  @observable colorSpace = "rgb";
  @observable id = shortid.generate();

  constructor(initialColorSpace, ...properties) {
    this.properties = properties;
    this.colorSpace = initialColorSpace;

    if (!Object.keys(colorSpaces).includes(initialColorSpace)) {
      throw new Error(`Invalid colorSpace of ${initialColorSpace} used`);
    }
    if (properties.length === 0) {
      throw new Error(`Missing initial color`);
    }

    Object.keys(colorSpaces).forEach(colorSpace => {
      colorSpaces[colorSpace].forEach((name, index) => {
        extendObservable(this, {
          [name]: computed(() => {
            if (this.colorSpace === colorSpace) {
              return this.properties[index];
            }
            const result = convert[this.colorSpace][colorSpace](
              ...this.properties
            );
            if (Array.isArray(result)) {
              return result[index];
            }
            return result;
          })
        });
        this[`set${pascalCase(name)}`] = value => {
          if (this.colorSpace === colorSpace) {
            this.properties[index] = value;
            return;
          }
          const result = convert[this.colorSpace][colorSpace](
            ...this.properties
          );
          this.properties = result;
          this.properties[index] = value;
          this.colorSpace = colorSpace;
        };
      });
      if (this[colorSpace] === undefined) {
        extendObservable(this, {
          [colorSpace]: computed(() => {
            const result = {};
            colorSpaces[colorSpace].forEach(key => {
              result[key] = this[key];
            });
            return result;
          })
        });
      }
    });
  }
  @computed
  get colorName() {
    return namer(this.hex, { pick: ["ntc"] }).ntc[0].name;
  }
  @computed
  get contrastYIQ() {
    return getContrastYIQ(`#${this.hex}`);
  }
}
