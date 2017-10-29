import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { getContrastYIQ } from "../../../stores/ColorLogic";
import FontAwesome from "react-fontawesome";
import ClipboardButton from "react-clipboard.js";
import "./Swatch.css";

@observer
class Swatch extends Component {
  static propTypes = {
    dataStore: PropTypes.object,
    hue: PropTypes.number,
    saturation: PropTypes.number,
    lightness: PropTypes.number,
    count: PropTypes.string,
    hex: PropTypes.string,
    selected: PropTypes.bool,
    colorName: PropTypes.string,
    index: PropTypes.number.isRequired
  };

  render() {
    const {
      dataStore,
      hue,
      saturation,
      lightness,
      count,
      hex,
      selected,
      colorName,
      index
    } = this.props;

    const swatchStyle = {
      background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      borderWidth: `2px`,
      borderStyle: `${selected === true ? "solid" : "solid"}`,
      borderColor: `${selected === true
        ? getContrastYIQ(hex, 0.5, false)
        : `hsl(${hue}, ${saturation}%, ${lightness}%)`}`
      // width: dataStore.palatteFlexDirection === "column" ? "100%" : "auto",
      // height: dataStore.palatteFlexDirection === "column" ? "60px" : "180px"
    };

    const text = {
      color: getContrastYIQ(hex, 0.4, false)
    };

    return (
      <div className="swatch noselect" key={count} style={swatchStyle}>
        <p className="color-hex noselect" style={text}>
          {hex}
        </p>

        <div className="test-container">
          <p className="swatch-color-name" style={text}>
            {colorName}
          </p>
        </div>

        <div className="swatch-functions noselect">
          <button
            style={text}
            className="swatch-button"
            onClick={() => dataStore.selectSwatch(index)}
          >
            <FontAwesome name="sliders" size="2x" />
          </button>
          <button
            style={text}
            className="swatch-button"
            onClick={() => dataStore.deleteSwatch(index)}
          >
            <FontAwesome name="trash" size="2x" />
          </button>
          <ClipboardButton data-clipboard-text={hex} className="swatch-button">
            <FontAwesome style={text} name="clipboard" size="2x" />
          </ClipboardButton>
          <button style={text} className="swatch-button">
            <FontAwesome name="info" size="2x" />
          </button>
        </div>
      </div>
    );
  }
}

export default Swatch;
