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
import { arrayMove } from "react-sortable-hoc";

useStrict(true);

const getNameOfColor = hex => namer(hex, { pick: ["ntc"] }).ntc[0].name;

const TRANSITION_TIME = 200;
const TRANSITION_INTERVAL = 150;
const SWATCH_LIMIT = 7;

class Color {
  constructor({ hue, saturation, lightness }) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }
  count = uuidv4();
  transitionTime = 200;
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
  @observable count = 0;
  @observable currentAction = "back";
  @observable schemes = [];
  @observable shortList = [];
  @observable targetItem = -1;
  @observable selectedHarmony = this.allHarmonies[1];

  @computed
  get transitionTime() {
    return TRANSITION_TIME;
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

  getPalette(harmony) {
    let info;
    switch (harmony) {
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
    return info;
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

      const info = this.getPalette(this.selectedHarmony.harmony);

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

      this.count++;
      this.targetItem++;

      // (FlipMove hacky workaround - prevent function completing until FlipMove transition completes
      setTimeout(() => {
        this.coolDown = false;
      }, TRANSITION_TIME + TRANSITION_INTERVAL);
    }
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
    }
  }

  @action
  changePalatteFlexDirection() {
    if (this.palatteFlexDirection === "row") {
      this.palatteFlexDirection = "column";
    } else {
      this.palatteFlexDirection = "row";
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

    // if color picker is visible, iterate through current colors,
    // find new position of the currently selected color, then
    // pass index position of color to selectSwatch class method
    if (this.colorPickerVisible === true) {
      for (let i = 0; i < this.schemes[this.targetItem].colors.length; i++) {
        if (this.schemes[this.targetItem].colors[i].selected === true)
          this.selectSwatch(i);
      }
    }
  };

  // RANDOMIZE PALATTE SWATCH ORDER
  @action
  randomizeSwatches() {
    const newArray = this.schemes[this.targetItem].colors.slice();
    const test = shuffle(newArray);
    this.schemes[this.targetItem].colors = test;

    if (this.colorPickerVisible === true) {
      for (let i = 0; i < this.schemes[this.targetItem].colors.length; i++) {
        if (this.schemes[this.targetItem].colors[i].selected === true)
          this.selectSwatch(i);
      }
    }
  }

  // REVERSE PALATTE SWATCH ORDER
  @action
  reverseSwatches() {
    const newArray = this.schemes[this.targetItem].colors.slice();
    const test = reverse(newArray);
    this.schemes[this.targetItem].colors = test;

    if (this.colorPickerVisible === true) {
      for (let i = 0; i < this.schemes[this.targetItem].colors.length; i++) {
        if (this.schemes[this.targetItem].colors[i].selected === true)
          this.selectSwatch(i);
      }
    }
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
        }, TRANSITION_TIME + TRANSITION_INTERVAL);
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
        return;
      } else {
        this.targetItem = this.targetItem - 1;
      }
      // prevent function completing until FlipMove transition completes
      setTimeout(() => {
        this.coolDown = false;
      }, TRANSITION_TIME + TRANSITION_INTERVAL);
    }
  }

  // CHANGE SELECTED COLOR PALATTE HARMONY (TRIADIC, ANALOGOUS, ETC.)
  @action
  changeHarmony(val) {
    this.selectedHarmony = this.allHarmonies[val];
  }
}

export default Data;
