import React from "react";
import PropTypes from "prop-types";
import styles from "./ColorDialog.css";

function formatColorName(string) {
  return string.toLowerCase().replace(/\s+/g, "-");
}

function styleSheetVariableName(type, name) {
  if (type === "css") {
    return `--${formatColorName(name)}: `;
  }
  if (type === "less") {
    return `@${formatColorName(name)}: `;
  } else {
    return;
  }
}

function getHsl(colors, styleSheetType) {
  return colors.map(({ colorName, hue, saturation, lightness }, index) => (
    <p className={styles.text} key={index}>
      {styleSheetType !== undefined
        ? styleSheetVariableName(styleSheetType, colorName)
        : ""}
      {`hsl(${hue}, ${saturation}%, ${lightness}%)`}
      {styleSheetType !== undefined ? ";" : ""}
    </p>
  ));
}

function getRgb(colors, styleSheetType) {
  return colors.map(({ colorName, red, green, blue }, index) => (
    <p className={styles.text} key={index}>
      {styleSheetType !== undefined
        ? styleSheetVariableName(styleSheetType, colorName)
        : ""}
      {`rgb(${red}, ${green}, ${blue})`}
      {styleSheetType !== undefined ? ";" : ""}
    </p>
  ));
}

function getCmyk(colors, styleSheetType) {
  return colors.map(({ colorName, cyan, magenta, yellow, key }, index) => (
    <p className={styles.text} key={index}>
      {styleSheetType !== undefined
        ? styleSheetVariableName(styleSheetType, colorName)
        : ""}
      {`cmyk(${cyan}%, ${magenta}%, ${yellow}%, ${key}%)`}
      {styleSheetType !== undefined ? ";" : ""}
    </p>
  ));
}

function getHex(colors, styleSheetType) {
  return colors.map(({ colorName, hex }, index) => (
    <p className={styles.text} key={index}>
      {styleSheetType !== undefined
        ? styleSheetVariableName(styleSheetType, colorName)
        : ""}
      #{hex}
      {styleSheetType !== undefined ? ";" : ""}
    </p>
  ));
}

const DialogBox = ({ colors, colorSpace, styleSheetType }) => {
  return (
    <div className={styles.container}>
      {colorSpace === "hsl"
        ? getHsl(colors, styleSheetType)
        : colorSpace === "rgb"
          ? getRgb(colors, styleSheetType)
          : colorSpace === "cmyk"
            ? getCmyk(colors, styleSheetType)
            : colorSpace === "hex" ? getHex(colors, styleSheetType) : ""}
    </div>
  );
};

DialogBox.propTypes = {
  colors: PropTypes.object,
  colorSpace: PropTypes.string,
  styleSheetType: PropTypes.string
};

export default DialogBox;
