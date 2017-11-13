import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ReactSlider from "react-slider";
import { getContrastYIQ } from "../../stores/ColorLogic";
import "./ColorPicker.css";

function generateSpectrum(saturation, lightness) {
  const colors = [];
  for (let i = 0; i < 18; i++) {
    colors.push(`hsl(${20 * i}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

@observer
class HslPick extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };
  render() {
    const { dataStore } = this.props;

    const swatch = dataStore.currentPalatte.colors[dataStore.targetSwatch];

    const handleStyle = {
      background: `hsl(${swatch.hue}, ${swatch.saturation}%, ${swatch.lightness}%)`,
      color: `${getContrastYIQ(swatch.hex, 0.8, false)}`,
      borderColor: `${getContrastYIQ(swatch.hex, 0.8, false)}`
    };
    const backgroundHue = {
      background: `
        linear-gradient(to right, ${generateSpectrum(
          swatch.saturation,
          swatch.lightness
        )})
          `
    };
    const backgroundSaturation = {
      background: `
        linear-gradient(to right,
        hsl(${swatch.hue}, ${0}%, ${swatch.lightness}%),
        hsl(${swatch.hue}, ${100}%, ${swatch.lightness}%))`
    };
    const backgroundLightness = {
      background: `
        linear-gradient(to right,
        hsl(${swatch.hue}, ${swatch.saturation}%, ${0}%),
        hsl(${swatch.hue}, ${swatch.saturation}%, ${50}%),
        hsl(${swatch.hue}, ${swatch.saturation}%, ${109}%))`
    };

    return (
      <div className="sliders">
        <div className="slider-container">
          <h2 className="slider-heading">H</h2>
          <div className="bar-container" style={backgroundHue}>
            <ReactSlider
              className="bar"
              handleClassName="test-handle"
              barClassName="test-bar"
              min={0}
              max={360}
              defaultValue={swatch.hue}
              withBars={true}
              pearling={true}
              value={swatch.hue}
              onChange={value => dataStore.changeHue(value)}
            >
              <div className="my-handle" style={handleStyle}>
                {Math.round(swatch.hue)}
              </div>
            </ReactSlider>
          </div>
        </div>

        <div className="slider-container">
          <h2 className="slider-heading">S</h2>
          <div className="bar-container" style={backgroundSaturation}>
            <ReactSlider
              className="bar"
              handleClassName="test-handle"
              barClassName="test-bar"
              min={0}
              max={100}
              defaultValue={swatch.saturation}
              withBars={true}
              pearling={true}
              value={swatch.saturation}
              onChange={value => dataStore.changeSaturation(value)}
            >
              <div className="my-handle" style={handleStyle}>
                {Math.round(swatch.saturation)}
              </div>
            </ReactSlider>
          </div>
        </div>
        <div className="slider-container">
          <h2 className="slider-heading">L</h2>
          <div className="bar-container" style={backgroundLightness}>
            <ReactSlider
              className="bar"
              handleClassName="test-handle"
              barClassName="test-bar"
              min={0}
              max={100}
              defaultValue={swatch.lightness}
              withBars={true}
              pearling={true}
              value={swatch.lightness}
              onChange={value => dataStore.changeLightness(value)}
            >
              <div className="my-handle" style={handleStyle}>
                {Math.round(swatch.lightness)}
              </div>
            </ReactSlider>
          </div>
        </div>
      </div>
    );
  }
}

export default HslPick;
