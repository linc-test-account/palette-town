import { action, observable, computed, useStrict } from "mobx";
import {
  analogous,
  pentagon,
  split,
  square,
  tetradic,
  triadic,
  oneOff,
  hslToHex
} from "./ColorLogic";
import shuffle from "lodash/shuffle";
import reverse from "lodash/reverse";
import uuidv4 from "uuid/v4";
import namer from "color-namer";

useStrict(true);

const getNameOfColor = hex => namer(hex, { pick: ["ntc"] }).ntc[0].name;

class Color {
  constructor({ hue, saturation, lightness }) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
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
    { harmony: "split", colors: 3 },
    { harmony: "square", colors: 4 },
    { harmony: "tetradic", colors: 4 },
    { harmony: "triadic", colors: 3 }
  ];
  @observable colorPickerVisible = false;
  @observable palatteFlexDirection = "row";
  @observable targetSwatch;
  @observable coolDown = false;
  @observable transitionTime = 300;
  @observable count = 0;
  @observable currentAction = "back";
  @observable schemes = [];
  @observable shortList = [];
  @observable targetItem = -1;
  @observable selectedHarmony = this.allHarmonies[1];

  @computed
  get transitionInterval() {
    return this.transitionTime + 70;
  }

  @computed
  get selectValue() {
    const test = this.allHarmonies.indexOf(this.selectedHarmony);
    return test;
  }
  @computed
  get currentSwatch() {
    if (this.schemes.length > 0) {
      const rand = this.schemes[this.targetItem].colors;
      return rand;
    }
  }

  // GENERATE SWATCHES
  @action
  concatColors() {
    this.currentAction = "forward";
    if (this.colorPickerVisible === true) {
      // close color picker if open
      this.closeColorPicker();
    }
    if (this.coolDown === false) {
      this.coolDown = true;

      let info;
      switch (this.selectedHarmony.harmony) {
        case "analogous":
          info = analogous();
          break;
        case "split":
          info = split();
          break;
        case "square":
          info = square();
          break;
        case "tetradic":
          info = tetradic();
          break;
        case "triadic":
          info = triadic();
          break;
        case "pentagon":
          info = pentagon();
          break;
        default:
          console.log("No harmony provided");
      }

      const colorArray = [];
      for (let i = 0; i < this.selectedHarmony.colors; i++) {
        colorArray.push(
          new Color({
            hue: info[i].hue,
            saturation: info[i].saturation,
            lightness: info[i].lightness
          })
        );
      }

      this.schemes = this.schemes.concat({
        scheme: this.selectedHarmony.harmony,
        count: uuidv4(),
        colors: colorArray
      });

      this.count = this.count + 1;
      this.targetItem = this.targetItem + 1;

      // (FlipMove hacky workaround - prevent function completing until FlipMove transition completes
      setTimeout(() => {
        this.coolDown = false;
      }, this.transitionInterval);
    }
  }

  // ADD NEW SWATCH TO CURRENT COLOR PALATTE
  @action
  addSwatch() {
    const info = oneOff();
    const count = this.schemes[this.targetItem].colors.length;
    if (count < 9) {
      const newSwatch = new Color({
        hue: info[0].hue,
        saturation: info[0].saturation,
        lightness: info[0].lightness
      });
      this.schemes[this.targetItem].colors.push(newSwatch);
      this.schemes[this.targetItem].scheme = "custom";
    }
    if (count > 9) {
      return;
    }
  }

  @action
  changePalatteFlexDirection() {
    this.palatteFlexDirection === "row"
      ? (this.palatteFlexDirection = "column")
      : (this.palatteFlexDirection = "row");
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
    console.log("CS");
    // Reset all swatches to unselected
    for (let i = 0; i < this.schemes[this.targetItem].colors.length; i++) {
      if (this.schemes[this.targetItem].colors[i].selected === true)
        this.schemes[this.targetItem].colors[i].selected = false;
    }

    // select clicked swatch
    this.schemes[this.targetItem].colors[index].selected = true;
    this.targetSwatch = index;
    this.colorPickerVisible = true;
  }

  // MODIFY SWATCH HSL VALUES
  @action
  changeHue(val) {
    const target = this.schemes[this.targetItem].colors[this.targetSwatch];
    target.hue = val.value;
  }
  @action
  changeSaturation(val) {
    const target = this.schemes[this.targetItem].colors[this.targetSwatch];
    target.saturation = val.value;
  }
  @action
  changeLightness(val) {
    const target = this.schemes[this.targetItem].colors[this.targetSwatch];
    target.lightness = val.value;
  }

  // SWAP SWATCHES (MANUAL SWATCH RE-ORDERING)
  @action
  swapSwatches(index, direction) {
    const targetArray = this.schemes[this.targetItem].colors.slice();
    const swatchA = index;
    const swatchB = direction === "left" ? index - 1 : index + 1;
    if (swatchB > targetArray.length - 1) {
      return;
    }
    if (swatchB < 0) {
      return;
    }
    if (swatchB > -1 && swatchB < targetArray.length) {
      const swapArrayElements = function(a, x, y) {
        if (a.length === 1) return a;
        a.splice(y, 1, a.splice(x, 1, a[y])[0]);
        return a;
      };
      const output = swapArrayElements(targetArray, swatchA, swatchB);
      this.schemes[this.targetItem].colors = output;
    }
    // increment/decrement targetSwatch if target index changes
    this.targetSwatch =
      direction === "left" ? this.targetSwatch - 1 : this.targetSwatch + 1;
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

  // RANDOMIZE PALATTE SWATCH ORDER
  @action
  randomizeSwatches() {
    // close color picker if open
    this.closeColorPicker();
    const newArray = this.schemes[this.targetItem].colors.slice();
    const test = shuffle(newArray);
    this.schemes[this.targetItem].colors = test;
  }

  // REVERSE PALATTE SWATCH ORDER
  @action
  reverseSwatches() {
    // close color picker if open
    this.closeColorPicker();
    const newArray = this.schemes[this.targetItem].colors.slice();
    const test = reverse(newArray);
    this.schemes[this.targetItem].colors = test;
  }

  // RETRIEVE NEXT COLOR PALATTE
  @action
  getNext() {
    // close color picker if open
    if (this.colorPickerVisible === true) {
      this.closeColorPicker();
    }

    if (this.schemes.length === 0) {
      this.concatColors();
      this.currentAction = "forward";
    }

    this.currentAction = "forward";
    if (this.targetItem === this.count - 1) {
      this.concatColors();
    } else {
      if (this.coolDown === false) {
        this.coolDown = true;
        this.targetItem = this.targetItem + 1;
        setTimeout(() => {
          this.coolDown = false;
        }, this.transitionInterval);
      }
    }
  }

  // RETRIEVE PREVIOUS COLOR PALATTE
  @action
  getPrevious() {
    // close color picker if open
    if (this.colorPickerVisible === true) {
      this.closeColorPicker();
    }

    this.currentAction = "backward";
    if (this.coolDown === false) {
      this.coolDown = true;
      if (this.targetItem === 0) {
        console.log("Message: Reached start of array!");
      } else {
        this.targetItem = this.targetItem - 1;
      }
      // prevent function completing until FlipMove transition completes
      setTimeout(() => {
        this.coolDown = false;
      }, this.transitionInterval);
    }
  }

  // ADD CURRENT COLOR PALATTE TO SHORTLIST ARRAY FOR LATER USE
  @action
  addToShortList() {
    let test = false;
    if (this.schemes.length > 0) {
      if (this.shortList.length < 1) {
        console.log("length < 1");
        test = true;
      }
      if (this.shortList.length > 0) {
        console.log("length > 0");
        if (
          this.schemes[this.schemes.length - 1].count ===
          this.shortList[this.shortList.length - 1].count
        ) {
          console.log("Error: already saved!");
        }
        if (
          this.schemes[this.schemes.length - 1].count !==
          this.shortList[this.shortList.length - 1].count
        ) {
          test = true;
        }
      }
    }
    if (test === true) {
      console.log("item saved");
      this.shortList = this.shortList.concat(
        this.schemes[this.schemes.length - 1]
      );
    }
  }

  // CHANGE SELECTED COLOR PALATTE HARMONY (TRIADIC, ANALOGOUS, ETC.)
  @action
  changeHarmony(val) {
    this.selectedHarmony = this.allHarmonies[val];
  }
}

export default Data;
