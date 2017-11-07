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
import uuidv4 from "uuid/v4";
import namer from "color-namer";
import { arrayMove } from "react-sortable-hoc";

useStrict(true);

const getNameOfColor = hex => namer(hex, { pick: ["ntc"] }).ntc[0].name;

const TRANSITION_TIME = 200;
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
  count = uuidv4();
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

  // RGB
  changeRed(val) {
    this.red = val;
  }
  changeGreen(val) {
    this.green = val;
  }
  changeBlue(val) {
    this.blue = val;
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
  @observable colorSpaces = ["HSL", "RGB", "HSV"];
  @observable colorSpace = "HSL";
  @observable colorPickerVisible = false;
  @observable targetSwatch;
  @observable coolDown = false;
  @observable count = 0;
  @observable schemes = [];
  @observable targetItem = -1;
  @observable cooldownactive = false;

  @computed
  get minWidth() {
    return `(min-width: ${MIN_WIDTH}px)`;
  }

  @computed
  get transitionTime() {
    return TRANSITION_TIME;
  }

  @computed
  get currentPalette() {
    if (this.schemes.length > 0) {
      return this.schemes[this.targetItem].colors;
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

    this.schemes = this.schemes.concat({
      scheme: this.selectedHarmony.harmony,
      count: uuidv4(),
      colors: colorArray
    });

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
    const count = this.schemes[this.targetItem].colors.length;
    if (count < SWATCH_LIMIT) {
      const newSwatch = new Color({
        hue: info[0].hue,
        saturation: info[0].saturation,
        lightness: info[0].lightness
      });
      this.schemes[this.targetItem].colors.push(newSwatch);
      this.schemes[this.targetItem].scheme = "custom";
    }
    if (count > SWATCH_LIMIT) {
      return;
    } else {
      return;
    }
  }

  @action
  closeColorPicker() {
    for (let i = 0; i < this.schemes[this.targetItem].colors.length; i++) {
      if (this.schemes[this.targetItem].colors[i].selected === true)
        this.schemes[this.targetItem].colors[i].selected = false;
    }
    this.colorPickerVisible = false;
  }

  @action
  selectSwatch(index) {
    // Reset all swatches to unselected
    for (let i = 0; i < this.schemes[this.targetItem].colors.length; i++) {
      if (this.schemes[this.targetItem].colors[i].selected === true)
        this.schemes[this.targetItem].colors[i].selected = false;
    }

    // Select color based on index parameter
    this.schemes[this.targetItem].colors[index].selected = true;
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
      const target = this.schemes[this.targetItem].colors[this.targetSwatch];
      target.hue = val;
    }
  }
  @action
  changeSaturation(val) {
    if (val === undefined) {
      return;
    } else {
      const target = this.schemes[this.targetItem].colors[this.targetSwatch];
      target.saturation = val;
    }
  }
  @action
  changeLightness(val) {
    if (val === undefined) {
      return;
    } else {
      const target = this.schemes[this.targetItem].colors[this.targetSwatch];
      target.lightness = val;
    }
  }

  // MODIFY SWATCH RGB VALUES
  @action
  changeRed(val) {
    const target = this.schemes[this.targetItem].colors[this.targetSwatch];
    target.red = val.value;
  }
  @action
  changeGreen(val) {
    const target = this.schemes[this.targetItem].colors[this.targetSwatch];
    target.green = val.value;
  }
  @action
  changeBlue(val) {
    const target = this.schemes[this.targetItem].colors[this.targetSwatch];
    target.blue = val.value;
  }

  // DELETE SWATCH FROM CURRENT COLOR PALATTE
  @action
  deleteSwatch(index) {
    const newArray = this.schemes[this.targetItem].colors.slice();
    newArray.splice(index, 1);
    this.schemes[this.targetItem].colors = newArray;
    this.schemes[this.targetItem].scheme = "custom";
    this.closeColorPicker();
  }

  @action
  deletePalatte() {
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
    const targetArray = this.schemes[this.targetItem].colors.slice();
    const newArr = arrayMove(targetArray, oldIndex, newIndex);
    this.schemes[this.targetItem].colors = newArr;

    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
    } else {
      return;
    }
  };

  // RANDOMIZE PALATTE SWATCH ORDER
  @action
  randomizeSwatches() {
    const tempArray = this.schemes[this.targetItem].colors.slice();
    const shuffledArray = shuffle(tempArray);
    this.schemes[this.targetItem].colors = shuffledArray;

    if (this.colorPickerVisible === true) {
      this.reselectSwatch();
    } else {
      return;
    }
  }

  // REVERSE PALATTE SWATCH ORDER
  @action
  reverseSwatches() {
    const tempArray = this.schemes[this.targetItem].colors.slice();
    const reversedArray = reverse(tempArray);
    this.schemes[this.targetItem].colors = reversedArray;

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

      if (this.targetItem === 0) {
        this.concatColors();
      }

      if (this.targetItem < this.count - 1) {
        this.targetItem++;
      }

      if (this.targetItem === this.count - 1) {
        this.concatColors();
      } else {
        return;
      }
    }
  }

  reselectSwatch() {
    for (let i = 0; i < this.schemes[this.targetItem].colors.length; i++) {
      if (this.schemes[this.targetItem].colors[i].selected === true)
        this.selectSwatch(i);
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
