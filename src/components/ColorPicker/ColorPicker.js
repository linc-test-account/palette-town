import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import HslPick from "./HslPick";
import RgbPick from "./RgbPick";
import CmykPick from "./CmykPick";
import "./ColorPicker.css";
import FontAwesome from "react-fontawesome";

@observer
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSliders: true,
      colorSpace: "hsl"
    };
  }

  // Hack to fix handle positions
  // on react sliders. Causes unmount and 
  // remount of HslPick componet which 
  //  redraws the handles and their effective 
  // range correctly 
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showSliders: false
      });
    }, 301);
    setTimeout(() => {
      this.setState({
        showSliders: true
      });
    }, 302);
  }

  changeColorSpace = val => {
    this.setState({
      colorSpace: val
    });
  };

  static propTypes = {
    dataStore: PropTypes.object,
    colorSpace: PropTypes.string,
    hex: PropTypes.string,
    colorName: PropTypes.string
  };

  render() {
    const { hex, colorName, dataStore } = this.props;
    const { showSliders, colorSpace } = this.state;
    return (
      <div className="color-picker-container">
        <p className="palette-swatch-hex noselect">#{hex}</p>
        <p className="palette-swatch-name noselect">{colorName}</p>
        <br />
        <div className="color-picker-inner">
          <div className="color-picker-header">
            <button
              className="color-picker-category"
              onClick={() => this.changeColorSpace("hsl")}
            >
              HSL
            </button>
            <button
              className="color-picker-category"
              onClick={() => this.changeColorSpace("rgb")}
            >
              RGB
            </button>
            <button
              className="color-picker-category"
              onClick={() => this.changeColorSpace("cmyk")}
            >
              CMYK
            </button>
            <button
              className="color-picker-category"
              onClick={() => dataStore.closeColorPicker()}
            >
              DONE
              <FontAwesome
                className="color-picker-category-check"
                name={"check"}
                size="2x"
              />
            </button>
          </div>

          {colorSpace === "hsl" && showSliders === true ? (
            <HslPick key={`color-picker-0`} dataStore={dataStore} />
          ) : (
            ""
          )}
          {colorSpace === "rgb" && showSliders === true ? (
            <RgbPick key={`color-picker-1`} dataStore={dataStore} />
          ) : (
            ""
          )}
          {colorSpace === "cmyk" && showSliders === true ? (
            <CmykPick key={`color-picker-2`} dataStore={dataStore} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
