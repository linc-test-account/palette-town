// LS VERSIONS

// VERSION 100

/* 

[
  {
    colors: [
      { colorSpace: "hsl", properties: [135, 92, 55] },
      { colorSpace: "hsl", properties: [203, 0, 78] },
      { colorSpace: "hsl", properties: [12, 39, 45] },
      { colorSpace: "hsl", properties: [64, 13, 3] },
      { colorSpace: "hsl", properties: [99, 19, 100] }
    ],
    id: "dH5eDjk",
    name: "fav 1"
  },
  {
    colors: [
      { colorSpace: "hsl", properties: [135, 92, 55] },
      { colorSpace: "hsl", properties: [203, 0, 78] },
      { colorSpace: "hsl", properties: [12, 39, 45] },
      { colorSpace: "hsl", properties: [64, 13, 3] },
      { colorSpace: "hsl", properties: [99, 19, 100] }
    ],
    id: "jHj7ejd",
    name: "fav 2"
  }
];

*/

function localStorageRetreive() {
  try {
    const palettes = JSON.parse(localStorage.getItem("palettes"));
    if (palettes !== null) {
      if (palettes.version === 100) {
        return palettes.items;
      }
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = localStorageRetreive;
