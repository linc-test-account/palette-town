import { action, observable, computed, useStrict } from "mobx";
import { getPalette, oneOff } from "./ColorLogic";
import { arrayMove } from "react-sortable-hoc";
import { shuffle, reverse } from "lodash";
import shortid from "shortid";
import pascalCase from "pascal-case";
import Color from "./Color.js";
useStrict(true);

const SWATCH_LIMIT = 7;

export default class Palette {
  id;
  modifier;
  @observable favorited = false;
  @observable colors = [];
  @observable name = "";

  constructor(harmony, modifier, localStorageValues) {
    this.id = shortid.generate();
    this.modifier = modifier;
    this.favorited = false;
    this.name = "";

    if (harmony === null && modifier === null && localStorageValues === null) {
      throw new Error(
        `Invalid arguments received. Palette must receive a harmony & modifier or localStorageValues`
      );
    }

    // If no predefined values from localStorageValues
    if (localStorageValues === undefined) {
      this.colors = getPalette(harmony, modifier).map(
        ({ hue, saturation, lightness }) =>
          new Color("hsl", hue, saturation, lightness)
      );
    }

    // If received predfined values from localStorageValues
    if (localStorageValues !== undefined) {
      this.id = localStorageValues.id;
      this.name = localStorageValues.name;
      this.colors = localStorageValues.colors.map(
        ({ colorSpace, properties }) => new Color(colorSpace, ...properties)
      );
    }
  }

  @computed
  get selectedSwatch() {
    let target;
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i].selected === true) {
        target = this.colors[i];
      }
    }
    return target;
  }

  @action
  changeName(name) {
    this.name = name;
  }

  @action
  changeColorProperty(value, name, index) {
    if (index === undefined) {
      this.selectedSwatch["set" + pascalCase(name)](value);
    } else {
      this.colors[index]["set" + pascalCase(name)](value);
    }
  }

  @action
  reversePalette() {
    const tempArray = this.colors.slice();
    const reversedArray = reverse(tempArray);
    this.colors = reversedArray;
  }

  @action
  randomizePalette() {
    const tempArray = this.colors.slice();
    const shuffledArray = shuffle(tempArray);
    this.colors = shuffledArray;
  }

  @action
  addSwatch() {
    const newSwatchVals = oneOff(this.modifier);
    const swatchCount = this.colors.length;
    if (swatchCount < SWATCH_LIMIT) {
      this.colors.push(
        new Color(
          "hsl",
          newSwatchVals[0].hue,
          newSwatchVals[0].saturation,
          newSwatchVals[0].lightness
        )
      );
    }
    if (swatchCount > SWATCH_LIMIT) {
      return;
    } else {
      return;
    }
  }

  @action
  deleteSwatch(index) {
    const newArray = this.colors.slice();
    newArray.splice(index, 1);
    this.colors = newArray;
  }

  @action
  selectSwatch(index) {
    // Reset all swatches to unselected
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i].selected === true) this.colors[i].selected = false;
    }
    // Select color based on index parameter
    this.colors[index].selected = true;
  }

  @action
  reselectSwatch() {
    for (let i = 0; i < this.palette.colors.length; i++) {
      if (this.palette.colors[i].selected === true) this.selectSwatch(i);
    }
  }

  @action
  deselectSwatch() {
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i].selected === true) this.colors[i].selected = false;
    }
  }

  @action
  onSortEnd = (oldIndex, newIndex) => {
    const targetArray = this.colors.slice();
    const newArr = arrayMove(targetArray, oldIndex, newIndex);
    this.colors = newArr;
  };
}
