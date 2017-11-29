import { action, observable, computed, useStrict } from "mobx";
import { getPalette, colorHarmonies, paletteModifiers } from "./ColorLogic";
import withCooldown from "./withCooldown";
import Palette from "./Palette.js";
useStrict(true);

const TRANSITION_TIME = 300;
const MIN_WIDTH = 700;

class Data {
  @observable colorHarmonies = colorHarmonies;
  @observable selectedHarmony = this.colorHarmonies[1];
  @observable
  colorSpaces = [
    { colorSpace: "HSL" },
    { colorSpace: "RGB" },
    { colorSpace: "CMYK" }
  ];
  @observable selectedColorSpace = this.colorSpaces[0];
  @observable paletteModifiers = paletteModifiers;
  @observable selectedPaletteModifier = this.paletteModifiers[0];
  @observable palette = [];
  @observable cooldownactive = false;
  @observable favorites = [];

  @computed
  get minWidth() {
    return `(min-width: ${MIN_WIDTH}px)`;
  }

  @computed
  get transitionTime() {
    return TRANSITION_TIME;
  }

  @computed
  get miniPalettes() {
    const miniPalettes = [];
    for (let i = 0; i < this.colorHarmonies.length; i++) {
      const paletteData = getPalette(
        this.colorHarmonies[i].harmony,
        this.selectedPaletteModifier
      );
      const paletteName = this.colorHarmonies[i].harmony;
      miniPalettes.push({
        [paletteName]: paletteData
      });
    }
    return miniPalettes;
  }

  @computed
  get favoritesShortList() {
    const favoritesShortList = [];
    for (let i = 0; i < this.favorites.length; i++) {
      const palette = this.favorites[i].colors.map(
        ({ hue, saturation, lightness }) => ({
          hue: hue,
          saturation: saturation,
          lightness: lightness
        })
      );
      favoritesShortList.push(palette);
    }
    return favoritesShortList;
  }

  // GENERATE PALETTE
  @action
  generateNewPalatte() {
    this.palette = new Palette(
      this.selectedHarmony.harmony,
      this.selectedPaletteModifier
    );
  }

  @action
  goToPalette(index) {
    if (this.favorites.length > 0) {
      this.palette = this.favorites[index];
    } else {
      return;
    }
  }

  // RETRIEVE NEXT COLOR PALATTE
  @action
  @withCooldown(TRANSITION_TIME)
  getNext() {
    if (this.cooldownactive === true) {
      return;
    }
    if (this.cooldownactive === false) {
      this.generateNewPalatte();
    }
  }

  @action
  pushToFavorites() {
    if (this.favorites.length > 0) {
      for (let i = 0; i < this.favorites.length; i++) {
        if (this.favorites[i].id === this.palette.id) {
          this.deleteFromFavorites(i);
          return;
        }
      }
      this.favorites.push(this.palette);
      this.palette.favorited = true;
    }
    if (this.favorites.length === 0) {
      this.favorites.push(this.palette);
      this.palette.favorited = true;
    } else {
      return;
    }
  }

  @action
  deleteFromFavorites(index) {
    if (this.favorites.length > 0) {
      this.favorites.splice(index, 1);
      this.palette.favorited = false;
    } else {
      return;
    }
  }

  // CHANGE SELECTED COLOR PALATTE HARMONY (TRIADIC, ANALOGOUS, ETC.)
  @action
  changeHarmony(index) {
    this.selectedHarmony = this.colorHarmonies[index];
  }

  @action
  changeColorSpace(index) {
    this.selectedColorSpace = this.colorSpaces[index];
  }

  @action
  changeModifier(index) {
    this.selectedPaletteModifier = this.paletteModifiers[index];
  }

  @action
  toggleCoolDownActive(val) {
    this.cooldownactive = val;
  }

  validateInputs(value, name) {
    const hsl = { hue: 360, saturation: 100, lightness: 100 };
    const rgb = { red: 255, green: 255, blue: 255 };
    const cmyk = { cyan: 100, magenta: 100, yellow: 100, key: 100 };
    value = parseInt(value);

    if (isNaN(value) === true) {
      return false;
    }
    if (/[^\d\.]/.test(value)) {
      console.log(true)
      return false;
    }
    if (value < 0) {
      return false;
    }
    if (name in hsl && value > hsl[name]) {
      this.palette.changeColorProperty(hsl[name], name);
      return true;
    }
    if (name in rgb && value > rgb[name]) {
      this.palette.changeColorProperty(rgb[name], name);
      return true;
    }
    if (name in cmyk && value > cmyk[name]) {
      this.palette.changeColorProperty(cmyk[name], name);
      return true;
    }
    if (value >= 0) {
      this.palette.changeColorProperty(value, name);
      return true;
    } else {
      return true;
    }
  }
}

export default Data;
