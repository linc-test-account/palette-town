import { action, observable, computed, useStrict, toJS } from "mobx";
import { getPalette, harmonies, modifiers } from "./ColorLogic";
import { localStorageRetreive, localStorageUpdate } from "./LocalStorage";
import withCooldown from "./withCooldown";
import Palette from "./Palette.js";
useStrict(true);

const TRANSITION_TIME = 200;
const MIN_WIDTH = 700;

class Data {
  harmonies = harmonies;
  @observable selectedHarmony = this.harmonies.random;
  @observable modifiers = modifiers;
  @observable selectedModifier = this.modifiers.none;
  @observable palette = [];
  @observable cooldownactive = false;
  @observable favorites = [];

  @computed
  get minWidth() {
    return `(min-width: ${MIN_WIDTH}px)`;
  }
  @computed
  get miniPalettes() {
    return Object.keys(harmonies).map(harmony => ({
      [harmony]: getPalette(
        this.harmonies[harmony].coordinates,
        this.selectedModifier
      )
    }));
  }

  @computed
  get favoritesShortList() {
    return this.favorites.map(({ colors }) =>
      colors.map(({ hue, saturation, lightness }) => ({
        hue: hue,
        saturation: saturation,
        lightness: lightness
      }))
    );
  }

  // GENERATE PALETTE
  @action
  @withCooldown(TRANSITION_TIME)
  generateNewPalatte() {
    if (this.cooldownactive === true) {
      return;
    } else {
      this.palette = new Palette(
        this.selectedHarmony.coordinates,
        this.selectedModifier
      );
    }
  }

  @action
  goToPalette(index) {
    if (this.favorites.length > 0) {
      this.palette = this.favorites[index];
    } else {
      return;
    }
  }

  updateLocalStorage() {
    const favoritesToJS = toJS(this.favorites).map(({ id, name, colors }) => ({
      id: id,
      name: name,
      colors: colors.map(({ colorSpace, properties }) => ({
        colorSpace: colorSpace,
        properties: properties
      }))
    }));
    localStorageUpdate(favoritesToJS);
  }

  @action
  retreiveFromLocalStorage() {
    const items = localStorageRetreive();
    if (items !== undefined) {
      items.map(item => this.favorites.push(new Palette(null, null, item)));
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
    }
    this.favorites.push(this.palette);
    this.palette.favorited = true;
    this.palette.name = "fav " + this.favorites.length;
    this.updateLocalStorage();
  }

  @action
  deleteFromFavorites(index) {
    if (this.favorites.length > 0) {
      this.favorites.splice(index, 1);
      this.palette.favorited = false;
      this.updateLocalStorage();
    } else {
      return;
    }
  }

  // CHANGE SELECTED COLOR PALATTE HARMONY (TRIADIC, ANALOGOUS, ETC.)
  @action
  changeHarmony(value) {
    this.selectedHarmony = value;
  }

  @action
  changeModifier(value) {
    this.selectedModifier = value;
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
