import React from "react";
import PropTypes from "prop-types";

function getHsl(colors) {
  return colors.map(({ hue, saturation, lightness }, index) => (
    <p
      className="modal-color-val"
      key={index}
    >{`hsl(${hue}, ${saturation}%, ${lightness}%)`}</p>
  ));
}

function getRgb(colors) {
  return colors.map(({ red, green, blue }, index) => (
    <p
      className="modal-color-val"
      key={index}
    >{`rgb(${red}, ${green}, ${blue})`}</p>
  ));
}

function getCmyk(colors) {
  return colors.map(({ cyan, magenta, yellow, key }, index) => (
    <p
      className="modal-color-val"
      key={index}
    >{`cmyk(${cyan}%, ${magenta}%, ${yellow}%, ${key}%)`}</p>
  ));
}

function getHex(colors) {
  return colors.map(({ hex }, index) => (
    <p className="modal-color-val" key={index}>
      #{hex}
    </p>
  ));
}

const DialogBox = ({ colors, colorSpace }) => {
  return (
    <div className="modal-box">
      <h1 className="modal-box-heading">{colorSpace}</h1>

      <div className="modal-inner-box">
        {colorSpace === "hsl"
          ? getHsl(colors)
          : colorSpace === "rgb"
            ? getRgb(colors)
            : colorSpace === "cmyk"
              ? getCmyk(colors)
              : colorSpace === "hex" ? getHex(colors) : ""}
      </div>
    </div>
  );
};

DialogBox.propTypes = {
  colors: PropTypes.object.isRequired,
  colorSpace: PropTypes.string.isRequired
};

export default DialogBox;
