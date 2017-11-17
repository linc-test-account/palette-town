import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ReactSlider from "react-slider";
import "./ColorPicker.css";

function generateHueSpectrumGradient(saturation, lightness) {
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

    const handleStyle = {
      background: `hsl(${dataStore.currentSwatch.hue}, ${dataStore.currentSwatch
        .saturation}%, ${dataStore.currentSwatch.lightness}%)`,
      color:  `hsla(0, 0%, ${dataStore.currentSwatch.contrastYIQ}%, .8)`,
    };
    const backgroundHue = {
      background: `
        linear-gradient(to right, ${generateHueSpectrumGradient(
          dataStore.currentSwatch.saturation,
          dataStore.currentSwatch.lightness
        )})
          `
    };
    const backgroundSaturation = {
      background: `
        linear-gradient(to right,
        hsl(${dataStore.currentSwatch.hue}, ${0}%, ${dataStore.currentSwatch
        .lightness}%),
        hsl(${dataStore.currentSwatch.hue}, ${100}%, ${dataStore.currentSwatch
        .lightness}%))`
    };
    const backgroundLightness = {
      background: `
        linear-gradient(to right,
        hsl(${dataStore.currentSwatch.hue}, ${dataStore.currentSwatch
        .saturation}%, ${0}%),
        hsl(${dataStore.currentSwatch.hue}, ${dataStore.currentSwatch
        .saturation}%, ${50}%),
        hsl(${dataStore.currentSwatch.hue}, ${dataStore.currentSwatch
        .saturation}%, ${109}%))`
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
              defaultValue={dataStore.currentSwatch.hue}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.hue}
              onChange={value => dataStore.changeColorVal(value, "hue")}
            >
              <div className="my-handle noselect" style={handleStyle}>
                {dataStore.currentSwatch.hue}
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
              defaultValue={dataStore.currentSwatch.saturation}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.saturation}
              onChange={value => dataStore.changeColorVal(value, "saturation")}
            >
              <div className="my-handle" style={handleStyle}>
                {dataStore.currentSwatch.saturation}
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
              defaultValue={dataStore.currentSwatch.lightness}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.lightness}
              onChange={value => dataStore.changeColorVal(value, "lightness")}
            >
              <div className="my-handle noselect" style={handleStyle}>
                {dataStore.currentSwatch.lightness}
              </div>
            </ReactSlider>
          </div>
        </div>
      </div>
    );
  }
}

export default HslPick;
