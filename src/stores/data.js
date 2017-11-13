import { action, observable, computed, useStrict } from "mobx";
import {
  analogous,
  pentagon,
  random,
  rgbToHsl,
  split,
  square,
  tetradic,
  triadic,
  oneOff,
  hexToHsl,
  hslToHex,
  hslToRgb
} from "./ColorLogic";
import withCooldown from "./withCooldown";
import clipboardData from "./clipboardData";
import shuffle from "lodash/shuffle";
import reverse from "lodash/reverse";
import namer from "color-namer";
import { arrayMove } from "react-sortable-hoc";
import shortid from "shortid";

useStrict(true);

const getNameOfColor = hex => namer(hex, { pick: ["ntc"] }).ntc[0].name;

const TRANSITION_TIME = 200;
const SWATCH_LIMIT = 7;
const MIN_WIDTH = 700;

class Color {
  constructor({ hue, saturation, lightness }) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }
  @observable selected = false;
  @observable hexval;
  @observable hue = 0;
  @observable saturation = 0;
  @observable lightness = 0;
  @computed
  get hex() {
    return hslToHex(this.hue, this.saturation, this.lightness);
  }
  @computed
  get colorName() {
    return getNameOfColor(this.hex);
  }
  @computed
  get rgb() {
    return hslToRgb(
      this.hue / 360,
      this.saturation / 100,
      this.lightness / 100
    );
  }
}

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
  @observable colorSpaces = [{ colorSpace: "HSL" }, { colorSpace: "RGB" }];
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
  @observable currentPalatte = [];
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
  get miniPalettes() {
    const miniPalettes = [];
    for (let i = 0; i < this.allHarmonies.length; i++) {
      const paletteData = this.getPalette(this.allHarmonies[i].harmony);
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

  @action
  createClipBoardData() {
    const data = clipboardData(this.currentPalatte.colors);
    console.log(data);
    // TODO
    // logic to copy contents of data to clipboard
  }

  @action
  goToPalette(index) {
    if (this.favorites.length > 0) {
      this.currentPalatte = this.favorites[index];
      this.count++;
    } else {
      return;
    }
  }

  @action
  toggleCoolDownActive(val) {
    this.cooldownactive = val;
  }

  getPalette(harmony) {
    let info;
    switch (harmony) {
      case "analogous":
        info = analogous(this.selectedPaletteModifier);
        break;
      case "random":
        info = random(this.selectedPaletteModifier);
        break;
      case "split":
        info = split(this.selectedPaletteModifier);
        break;
      case "square":
        info = square(this.selectedPaletteModifier);
        break;
      case "tetradic":
        info = tetradic(this.selectedPaletteModifier);
        break;
      case "triadic":
        info = triadic(this.selectedPaletteModifier);
        break;
      case "pentagon":
        info = pentagon(this.selectedPaletteModifier);
        break;
      default:
    }
    return info;
  }

  // GENERATE SWATCHES
  @action
  generateNewPalatte() {
    // close color picker if open
    if (this.colorPickerVisible === true) {
      this.closeColorPicker();
    }

    const palette = this.getPalette(this.selectedHarmony.harmony);
    const colorArray = [];
    for (let i = 0; i < this.selectedHarmony.colors; i++) {
      colorArray.push(
        new Color({
          hue: palette[i].hue,
          saturation: palette[i].saturation,
          lightness: palette[i].lightness
        })
      );
    }

    this.currentPalatte = {
      scheme: this.selectedHarmony.harmony,
      id: shortid.generate(),
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
    const newSwatchValues = oneOff();
    const count = this.currentPalatte.colors.length;
    if (count < SWATCH_LIMIT) {
      const newSwatch = new Color({
        hue: newSwatchValues[0].hue,
        saturation: newSwatchValues[0].saturation,
        lightness: newSwatchValues[0].lightness
      });
      this.currentPalatte.colors.push(newSwatch);
      this.currentPalatte.scheme = "custom";
    }
    if (count > SWATCH_LIMIT) {
      return;
    } else {
      return;
    }
  }

  @action
  closeColorPicker() {
    for (let i = 0; i < this.currentPalatte.colors.length; i++) {
      if (this.currentPalatte.colors[i].selected === true)
        this.currentPalatte.colors[i].selected = false;
    }
    this.colorPickerVisible = false;
  }

  @action
  selectSwatch(index) {
    // Reset all swatches to unselected
    for (let i = 0; i < this.currentPalatte.colors.length; i++) {
      if (this.currentPalatte.colors[i].selected === true)
        this.currentPalatte.colors[i].selected = false;
    }

    // Select color based on index parameter
    this.currentPalatte.colors[index].selected = true;
    this.targetSwatch = index;
    this.colorPickerVisible = true;
  }

  @action
  changeHex(val) {
    const hsl = hexToHsl(val);
    if (hsl === undefined) {
      return;
    } else {
      this.changeHue(Math.round(hsl.h * 360));
      this.changeSaturation(Math.round(hsl.s * 100));
      this.changeLightness(Math.round(hsl.l * 100));
    }
  }

  // MODIFY SWATCH HSL VALUES
  @action
  changeHue(val) {
    if (val === undefined) {
      return;
    } else {
      const target = this.currentPalatte.colors[this.targetSwatch];
      target.hue = val;
    }
  }
  @action
  changeSaturation(val) {
    if (val === undefined) {
      return;
    } else {
      const target = this.currentPalatte.colors[this.targetSwatch];
      target.saturation = val;
    }
  }
  @action
  changeLightness(val) {
    if (val === undefined) {
      return;
    } else {
      const target = this.currentPalatte.colors[this.targetSwatch];
      target.lightness = val;
    }
  }

  //  MODIFY SWATCH RGB VALUES
  @action
  changeRgb(r, g, b) {
    const hsl = rgbToHsl(r, g, b);
    this.changeHue(hsl[0] * 360);
    this.changeSaturation(hsl[1] * 100);
    this.changeLightness(hsl[2] * 100);
  }

  // DELETE SWATCH FROM CURRENT COLOR PALATTE
  @action
  deleteSwatch(index) {
    const newArray = this.currentPalatte.colors.slice();
    newArray.splice(index, 1);
    this.currentPalatte.colors = newArray;
    this.currentPalatte.scheme = "custom";
    this.closeColorPicker();
  }

  // Method called by react-sortable-hoc after dropping
  // a dragged element into new position. Method recieves the
  // oldIndex of the dragged element and the newIndex of the element
  // once dropped into its new place
  @action
  onSortEnd = ({ oldIndex, newIndex }) => {
    const targetArray = this.currentPalatte.colors.slice();
    const newArr = arrayMove(targetArray, oldIndex, newIndex);
    this.currentPalatte.colors = newArr;

    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
    } else {
      return;
    }
  };

  // RANDOMIZE PALATTE SWATCH ORDER
  @action
  randomizeSwatches() {
    const tempArray = this.currentPalatte.colors.slice();
    const shuffledArray = shuffle(tempArray);
    this.currentPalatte.colors = shuffledArray;

    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
    } else {
      return;
    }
  }

  // REVERSE PALATTE SWATCH ORDER
  @action
  reverseSwatches() {
    const tempArray = this.currentPalatte.colors.slice();
    const reversedArray = reverse(tempArray);
    this.currentPalatte.colors = reversedArray;

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
    for (let i = 0; i < this.currentPalatte.colors.length; i++) {
      if (this.currentPalatte.colors[i].selected === true) this.selectSwatch(i);
    }
  }

  @action
  pushToFavorites() {
    if (this.favorites.length > 0) {
      for (let i = 0; i < this.favorites.length; i++) {
        if (this.favorites[i].id === this.currentPalatte.id) {
          return;
        }
      }
      this.favorites.push(this.currentPalatte);
    }
    if (this.favorites.length === 0) {
      this.favorites.push(this.currentPalatte);
    } else {
      return;
    }
  }

  @action
  deleteFromFavorites(index) {
    if (this.favorites.length > 0) {
      this.favorites.splice(index, 1);
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
