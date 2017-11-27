import { action, observable, computed, useStrict } from "mobx";
import {
  getPalette,
  oneOff,
  colorHarmonies,
  paletteModifiers
} from "./ColorLogic";
import withCooldown from "./withCooldown";
import shuffle from "lodash/shuffle";
import reverse from "lodash/reverse";
import { arrayMove } from "react-sortable-hoc";
import shortid from "shortid";
import pascalCase from "pascal-case";
import Color from "./Color.js";
useStrict(true);

const TRANSITION_TIME = 200;
const SWATCH_LIMIT = 7;
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
  @observable colorPickerVisible = false;
  @observable targetSwatch;
  @observable count = -1;
  @observable currentPalette = [];
  @observable cooldownactive = false;
  @observable favorites = [];
  @observable clipboardData;

  @computed
  get minWidth() {
    return `(min-width: ${MIN_WIDTH}px)`;
  }

  @computed
  get transitionTime() {
    return TRANSITION_TIME;
  }

  @computed
  get currentSwatch() {
    if (this.targetSwatch === undefined) {
      return;
    } else {
      return this.currentPalette.colors[this.targetSwatch];
    }
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

  @action
  goToPalette(index) {
    if (this.favorites.length > 0) {
      this.currentPalette = this.favorites[index];
      this.count++;
    } else {
      return;
    }
  }

  @action
  toggleCoolDownActive(val) {
    this.cooldownactive = val;
  }

  // GENERATE PALETTE
  @action
  generateNewPalatte() {
    // close color picker if open
    if (this.colorPickerVisible === true) {
      this.closeColorPicker();
    }

    const palette = getPalette(
      this.selectedHarmony.harmony,
      this.selectedPaletteModifier
    );
    const colorArray = [];
    for (let i = 0; i < this.selectedHarmony.colors; i++) {
      colorArray.push(
        new Color(
          "hsl",
          palette[i].hue,
          palette[i].saturation,
          palette[i].lightness
        )
      );
    }

    this.currentPalette = {
      scheme: this.selectedHarmony.harmony,
      id: shortid.generate(),
      favorited: false,
      colors: colorArray
    };

    this.count++;
  }

  // ADD NEW SWATCH TO CURRENT COLOR PALATTE
  @action
  addSwatch() {
    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
    }
    const newSwatchValues = oneOff(this.selectedPaletteModifier);
    const count = this.currentPalette.colors.length;
    if (count < SWATCH_LIMIT) {
      const newSwatch = new Color(
        "hsl",
        newSwatchValues[0].hue,
        newSwatchValues[0].saturation,
        newSwatchValues[0].lightness
      );
      this.currentPalette.colors.push(newSwatch);
      this.currentPalette.scheme = "custom";
    }
    if (count > SWATCH_LIMIT) {
      return;
    } else {
      return;
    }
  }

  @action
  closeColorPicker() {
    for (let i = 0; i < this.currentPalette.colors.length; i++) {
      if (this.currentPalette.colors[i].selected === true)
        this.currentPalette.colors[i].selected = false;
    }
    this.colorPickerVisible = false;
  }

  @action
  selectSwatch(index) {
    // Reset all swatches to unselected
    for (let i = 0; i < this.currentPalette.colors.length; i++) {
      if (this.currentPalette.colors[i].selected === true)
        this.currentPalette.colors[i].selected = false;
    }

    // Select color based on index parameter
    this.currentPalette.colors[index].selected = true;
    this.targetSwatch = index;
    this.colorPickerVisible = true;
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
      return false
    }
    if (name in hsl && value > hsl[name]) {
      this.changeColorProperty(hsl[name], name);
      return true
    }
    if (name in rgb && value > rgb[name]) {
      this.changeColorProperty(rgb[name], name);
      return true
    }
    if (name in cmyk && value > cmyk[name]) {
      this.changeColorProperty(cmyk[name], name);
      return true
    } 
    if (value >= 0) {
      this.changeColorProperty(value, name);
      return true
    }
    else {
      return true
    }
  }

  @action
  changeColorProperty(value, name) {
    const target = this.currentPalette.colors[this.targetSwatch];
    target["set" + pascalCase(name)](value);
  }

  // DELETE SWATCH FROM CURRENT COLOR PALATTE
  @action
  deleteSwatch(index) {
    const newArray = this.currentPalette.colors.slice();
    newArray.splice(index, 1);
    this.currentPalette.colors = newArray;
    this.currentPalette.scheme = "custom";
    this.closeColorPicker();
  }

  // Method called by react-sortable-hoc after dropping
  // a dragged element into new position. Method recieves the
  // oldIndex of the dragged element and the newIndex of the element
  // once dropped into its new place
  @action
  onSortEnd = (oldIndex, newIndex) => {
    const targetArray = this.currentPalette.colors.slice();
    const newArr = arrayMove(targetArray, oldIndex, newIndex);
    this.currentPalette.colors = newArr;

    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
    } else {
      return;
    }
  };

  // RANDOMIZE PALATTE SWATCH ORDER
  @action
  randomizeSwatches() {
    const tempArray = this.currentPalette.colors.slice();
    const shuffledArray = shuffle(tempArray);
    this.currentPalette.colors = shuffledArray;

    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
    } else {
      return;
    }
  }

  // REVERSE PALATTE SWATCH ORDER
  @action
  reverseSwatches() {
    const tempArray = this.currentPalette.colors.slice();
    const reversedArray = reverse(tempArray);
    this.currentPalette.colors = reversedArray;

    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
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

  reselectSwatch() {
    for (let i = 0; i < this.currentPalette.colors.length; i++) {
      if (this.currentPalette.colors[i].selected === true) this.selectSwatch(i);
    }
  }

  @action
  pushToFavorites() {
    if (this.favorites.length > 0) {
      for (let i = 0; i < this.favorites.length; i++) {
        if (this.favorites[i].id === this.currentPalette.id) {
          this.deleteFromFavorites(i);
          return;
        }
      }
      this.favorites.push(this.currentPalette);
      this.currentPalette.favorited = true;
    }
    if (this.favorites.length === 0) {
      this.favorites.push(this.currentPalette);
      this.currentPalette.favorited = true;
    } else {
      return;
    }
  }

  @action
  deleteFromFavorites(index) {
    if (this.favorites.length > 0) {
      this.favorites.splice(index, 1);
      this.currentPalette.favorited = false;
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
}

export default Data;
