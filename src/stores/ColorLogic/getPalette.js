const analogous = require("./analogous");
const random = require("./random");
const split = require("./split");
const square = require("./square");
const tetradic = require("./tetradic");
const triadic = require("./triadic");
const pentagon = require("./pentagon");

function getPalette(harmony, modifier) {
    let info;
    switch (harmony) {
      case "analogous":
        info = analogous(modifier);
        break;
      case "random":
        info = random(modifier);
        break;
      case "split":
        info = split(modifier);
        break;
      case "square":
        info = square(modifier);
        break;
      case "tetradic":
        info = tetradic(modifier);
        break;
      case "triadic":
        info = triadic(modifier);
        break;
      case "pentagon":
        info = pentagon(modifier);
        break;
      default:
    }
    return info;
  }
  
  module.exports = getPalette;
  