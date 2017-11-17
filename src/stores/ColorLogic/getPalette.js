const analogous = require("./analogous");
const random = require("./random");
const split = require("./split");
const square = require("./square");
const tetradic = require("./tetradic");
const triadic = require("./triadic");
const pentagon = require("./pentagon");

function getPalette(harmony) {
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
  
  module.exports = getPalette;
  