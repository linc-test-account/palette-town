import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ReactSlider from "react-slider";
import { getContrastYIQ, hslToRgb } from "../../stores/ColorLogic";
import "./ColorPicker.css";

@observer
class RgbPick extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };
  render() {
    const { dataStore } = this.props;

    const swatch =
      dataStore.schemes[dataStore.targetItem].colors[dataStore.targetSwatch];

    const handleStyle = {
      background: `hsl(${swatch.hue}, ${swatch.saturation}%, ${swatch.lightness}%)`,
      color: `${getContrastYIQ(swatch.hex, 0.8, false)}`,
      borderColor: `${getContrastYIQ(swatch.hex, 0.8, false)}`
    };
    const backgroundRed = {
      background: `
        linear-gradient(to right,
          rgb(0, 0, 0),
          rgb(255, 0, 0)`
    };
    const backgroundGreen = {
      background: `
        linear-gradient(to right,
          rgb(0, 0, 0),
          rgb(0, 255, 0)`
    };
    const backgroundBlue = {
      background: `
        linear-gradient(to right,
          rgb(0, 0, 0),
          rgb(0, 0, 255)`
    };

    console.log(swatch.hue, swatch.saturation, swatch.lightness);

    const rgbValues = hslToRgb(
      swatch.hue,
      swatch.saturation / 100,
      swatch.lightness / 100
    );
    const red = rgbValues[0];
    const green = rgbValues[1];
    const blue = rgbValues[2];

    return (
      <div className="sliders">
        <div className="slider-container">
          <h2 className="slider-heading">R</h2>
          <div className="bar-container" style={backgroundRed}>
            <ReactSlider
              className="bar"
              style={backgroundRed}
              handleClassName="test-handle"
              barClassName="test-bar"
              min={0}
              max={255}
              defaultValue={red}
              withBars={true}
              pearling={true}
              value={red}
              onChange={value => dataStore.changeRed({ value })}
            >
              <div className="my-handle" style={handleStyle}>
                {red}
              </div>
            </ReactSlider>
          </div>
        </div>

        <div className="slider-container">
          <h2 className="slider-heading">G</h2>
          <div className="bar-container" style={backgroundGreen}>
            <ReactSlider
              className="bar"
              handleClassName="test-handle"
              barClassName="test-bar"
              min={0}
              max={255}
              defaultValue={green}
              withBars={true}
              pearling={true}
              value={green}
              onChange={value => dataStore.changeGreen({ value })}
            >
              <div className="my-handle" style={handleStyle}>
                {green}
              </div>
            </ReactSlider>
          </div>
        </div>
        <div className="slider-container">
          <h2 className="slider-heading">B</h2>
          <div className="bar-container" style={backgroundBlue}>
            <ReactSlider
              className="bar"
              handleClassName="test-handle"
              barClassName="test-bar"
              min={0}
              max={255}
              defaultValue={blue}
              withBars={true}
              pearling={true}
              value={blue}
              onChange={value => dataStore.changeBlue({ value })}
            >
              <div className="my-handle" style={handleStyle}>
                {blue}
              </div>
            </ReactSlider>
          </div>
        </div>
      </div>
    );
  }
}

export default RgbPick;
