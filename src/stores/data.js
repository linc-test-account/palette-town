import { action, observable, computed, useStrict } from "mobx";
import { getPalette, oneOff } from "./ColorLogic";
import withCooldown from "./withCooldown";
import shuffle from "lodash/shuffle";
import reverse from "lodash/reverse";
import { arrayMove } from "react-sortable-hoc";
import shortid from "shortid";
import Color from "./Color.js";
useStrict(true);

const TRANSITION_TIME = 200;
const SWATCH_LIMIT = 7;
const MIN_WIDTH = 700;

class Data {
  @observable
  allHarmonies = [
    { harmony: "analogous", colors: 3 },
    { harmony: "pentagon", colors: 5 },
    { harmony: "random", colors: 5 },
    { harmony: "split", colors: 3 },
    { harmony: "square", colors: 4 },
    { harmony: "tetradic", colors: 4 },
    { harmony: "triadic", colors: 3 }
  ];
  @observable selectedHarmony = this.allHarmonies[1];
  @observable
  colorSpaces = [
    { colorSpace: "HSL" },
    { colorSpace: "RGB" },
    { colorSpace: "CMYK" }
  ];
  @observable selectedColorSpace = this.colorSpaces[0];
  @observable
  paletteModifiers = [
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
    for (let i = 0; i < this.allHarmonies.length; i++) {
      const paletteData = getPalette(
        this.allHarmonies[i].harmony,
        this.selectedPaletteModifier
      );
      const paletteName = this.allHarmonies[i].harmony;
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
      const palette = this.favorites[
        i
      ].colors.map(({ hue, saturation, lightness }) => ({
        hue: hue,
        saturation: saturation,
        lightness: lightness
      }));
      favoritesShortList.push(palette);
    }
    return favoritesShortList;
  }

  @computed
  get createClipBoardData() {
    if (this.currentPalette.length === 0) {
      return;
    } else {
      const hslStrings = this.currentPalette.colors.map(
        ({ hue, saturation, lightness }) =>
          `hsl(${hue}, ${saturation}%, ${lightness}) \n`
      );
      return "** HSL **" + "\n" + hslStrings.join("");
    }
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
    // HSL max values
    const hueMax = 360;
    const saturationMax = 100;
    const lightnessMax = 100;
    // RGB max values
    const rgbMax = 255;
    // CMYK max values
    const cmykMax = 100;

    // Validate HSL
    if (name === "hue" && value > hueMax) {
      this.changeColorProperty(hueMax, name);
      return;
    }
    if (
      (name === "saturaton" && value > saturationMax) ||
      (name === "lightness" && value > lightnessMax)
    ) {
      this.changeColorProperty(saturationMax, name);
      return;
    }
    // Validate RGB
    if (
      (name === "red" && value > rgbMax) ||
      (name === "green" && value > rgbMax) ||
      (name === "blue" && value > rgbMax)
    ) {
      this.changeColorProperty(rgbMax, name);
      return;
    }
    // Validate CMYK
    if (
      (name === "cyan" && value > cmykMax) ||
      (name === "magenta" && value > cmykMax) ||
      (name === "key" && value > cmykMax) ||
      (name === "yellow" && value > cmykMax)
    ) {
      this.changeColorProperty(cmykMax, name);
      return;
    }
    if (value === undefined) {
      return;
    }
    if (value < 0) {
      this.changeColorProperty(0, name);
      return;
    } else {
      this.changeColorProperty(value, name);
    }
  }

  @action
  changeColorProperty(value, name) {
    const capitalizedPropertyName =
      name.charAt(0).toUpperCase() + name.slice(1);
    const target = this.currentPalette.colors[this.targetSwatch];
    target["set" + capitalizedPropertyName](value);
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
    this.selectedHarmony = this.allHarmonies[index];
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
