/* 
* Harmonies *

This document contains the harmonies object. Harmonies are color combinations 
considered to be harmonious. The harmonies object below  is used in 
this application to generate such combinations. 

A given harmony object has three attributes: name, hues and coordinates. 
The important attribute here is coordinates: an array of whole numbers. 
These numbers are used to generate a color combination. Each number is 
a theoretical point somewhere around a color HSL wheel of 0 - 360 possible
positions with each position corresponding to a specific hue.

For example, the "pentagon" harmony consists of five coordinates evenly 
distributed around the color wheel at intervals of 72, creating a color 
combination of 5 different hues.
*/

const harmonies = {
  analagous: { name: "analagous", hues: 3, coordinates: [0, 60, 120] },
  pentagon: { name: "pentagon", hues: 5, coordinates: [0, 72, 144, 216, 288] },
  random: { name: "random", hues: 5, coordinates: [] },
  split: { name: "split", hues: 3, coordinates: [0, 150, 300] },
  square: { name: "square", hues: 5, coordinates: [90, 180, 270, 360] },
  tetradic: { name: "tetradic", hues: 4, coordinates: [0, 50, 180, 230] },
  triadic: { name: "triadic", hues: 3, coordinates: [0, 120, 240] }
};

module.exports = harmonies;
