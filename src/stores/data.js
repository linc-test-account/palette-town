import { action, observable, computed, useStrict } from "mobx";
import {
  analogous,
  pentagon,
  random,
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
import shuffle from "lodash/shuffle";
import reverse from "lodash/reverse";
import namer from "color-namer";
import { arrayMove } from "react-sortable-hoc";
import shortid from "shortid";

useStrict(true);

const getNameOfColor = hex => namer(hex, { pick: ["ntc"] }).ntc[0].name;

const TRANSITION_TIME = 220;
const SWATCH_LIMIT = 7;
const MIN_WIDTH = 700;

class Color {
  constructor({ hue, saturation, lightness, red, green, blue }) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
  @observable selected = false;
  @observable hue = 0;
  @observable hexval;
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
    return hslToRgb(this.hue, this.saturation, this.lightness);
  }
  // HSL
  changeHue(val) {
    this.hue = val;
  }
  changeSaturation(val) {
    this.saturation = val;
  }
  changeLightness(val) {
    this.lightness = val;
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
  @observable coolDown = false;
  @observable count = -1;
  @observable schemes = [];
  @observable targetItem = -1;
  @observable cooldownactive = false;
  @observable indexesOfFavorites = [];
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
  get targetItemFavoriteStatus() {
    if (this.schemes.length > 0) {
      return this.schemes[this.targetItem].favorite;
    } else {
      return;
    }
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

  @computed
  get favoritesIndexes() {
    const indexesArr = [];
    if (this.schemes.length > 0) {
      for (let i = 0; i < this.schemes.length; i++) {
        if (this.schemes[i].favorite === true) {
          indexesArr.push(i);
        }
      }
      return indexesArr;
    }
  }

  @action
  uptateIndexesOfFavorites(indexesArr) {
    this.indexesOfFavorites = indexesArr;
  }

  @action
  goToPalette(index) {
    this.schemes = this.favorites[index];
    // increment this.count - this.count is used as unique key on Palatte
    // component in App.js. This new unique key will indicate to 
    // the containing FlipMove component that it should animate 
    // the change from the previous palatte to the next.
    this.count++; 
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
  concatColors() {
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

    this.schemes = {
      scheme: this.selectedHarmony.harmony,
      id: shortid.generate(),
      colors: colorArray
    };

    this.count++;
    this.targetItem++;
  }

  // ADD NEW SWATCH TO CURRENT COLOR PALATTE
  @action
  addSwatch() {
    if (this.colorPickerVisible === true) {
      // close color picker if open
      this.closeColorPicker();
    }
    const info = oneOff();
    const count = this.schemes.colors.length;
    if (count < SWATCH_LIMIT) {
      const newSwatch = new Color({
        hue: info[0].hue,
        saturation: info[0].saturation,
        lightness: info[0].lightness
      });
      this.schemes.colors.push(newSwatch);
      this.schemes.scheme = "custom";
    }
    if (count > SWATCH_LIMIT) {
      return;
    } else {
      return;
    }
  }

  @action
  closeColorPicker() {
    for (let i = 0; i < this.schemes.colors.length; i++) {
      if (this.schemes.colors[i].selected === true)
        this.schemes.colors[i].selected = false;
    }
    this.colorPickerVisible = false;
  }

  @action
  selectSwatch(index) {
    // Reset all swatches to unselected
    for (let i = 0; i < this.schemes.colors.length; i++) {
      if (this.schemes.colors[i].selected === true)
        this.schemes.colors[i].selected = false;
    }

    // Select color based on index parameter
    this.schemes.colors[index].selected = true;
    this.targetSwatch = index;
    this.colorPickerVisible = true;
  }

  // CHANGE SELECTED COLOR SPACE

  @action
  changeColorSpace(val) {
    this.colorSpace = val;
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
      const target = this.schemes.colors[this.targetSwatch];
      target.hue = val;
    }
  }
  @action
  changeSaturation(val) {
    if (val === undefined) {
      return;
    } else {
      const target = this.schemes.colors[this.targetSwatch];
      target.saturation = val;
    }
  }
  @action
  changeLightness(val) {
    if (val === undefined) {
      return;
    } else {
      const target = this.schemes.colors[this.targetSwatch];
      target.lightness = val;
    }
  }

  // DELETE SWATCH FROM CURRENT COLOR PALATTE
  @action
  deleteSwatch(index) {
    const newArray = this.schemes.colors.slice();
    newArray.splice(index, 1);
    this.schemes.colors = newArray;
    this.schemes.scheme = "custom";
    this.closeColorPicker();
  }

  @action
  deletePalette() {
    if (this.colorPickerVisible === true) {
      this.closeColorPicker();
    }
    if (this.schemes.length > 0) {
      const newArray = this.schemes;
      newArray.splice(this.targetItem, 1);
      this.schemes = newArray;
      this.targetItem = this.targetItem - 1;
    }
    if (this.schemes.length === 0) {
      return;
    }
  }

  // Method called by react-sortable-hoc after dropping
  // a dragged element into new position. Method recieves the
  // oldIndex of the dragged element and the newIndex of the element
  @action
  onSortEnd = ({ oldIndex, newIndex }) => {
    const targetArray = this.schemes.colors.slice();
    const newArr = arrayMove(targetArray, oldIndex, newIndex);
    this.schemes.colors = newArr;

    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
    } else {
      return;
    }
  };

  // RANDOMIZE PALATTE SWATCH ORDER
  @action
  randomizeSwatches() {
    const tempArray = this.schemes.colors.slice();
    const shuffledArray = shuffle(tempArray);
    this.schemes.colors = shuffledArray;

    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
    } else {
      return;
    }
  }

  // REVERSE PALATTE SWATCH ORDER
  @action
  reverseSwatches() {
    const tempArray = this.schemes.colors.slice();
    const reversedArray = reverse(tempArray);
    this.schemes.colors = reversedArray;

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
      // close color picker if open
      if (this.colorPickerVisible === true) {
        this.closeColorPicker();
      }

      this.concatColors();
    }
  }

  reselectSwatch() {
    for (let i = 0; i < this.schemes.colors.length; i++) {
      if (this.schemes.colors[i].selected === true) this.selectSwatch(i);
    }
  }

  // RETRIEVE PREVIOUS COLOR PALATTE
  @action
  @withCooldown(TRANSITION_TIME)
  getPrevious() {
    if (this.cooldownactive === true) {
      return;
    }
    if (this.cooldownactive === false) {
      // close color picker if open
      if (this.colorPickerVisible === true) {
        this.closeColorPicker();
      }

      if (this.targetItem === 0) {
        return;
      }

      if (this.targetItem > 0) {
        this.targetItem--;
      } else {
        return;
      }
    }
  }

  @action
  pushToFavorites() {
    if (this.favorites.length > 0) {
      for (let i = 0; i < this.favorites.length; i++) {
        if (this.favorites[i].id === this.schemes.id) {
          return;
        }
      }
      this.favorites.push(this.schemes);
    }
    if (this.favorites.length === 0) {
      this.favorites.push(this.schemes);
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
  changeHarmony(val) {
    this.selectedHarmony = this.allHarmonies[val];
  }

  @action
  changeModifier(val) {
    this.selectedPaletteModifier = this.paletteModifiers[val];
  }
}

export default Data;
