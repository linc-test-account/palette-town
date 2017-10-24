import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import './ColorPicker.css';

function generateSpectrum(saturation, lightness) {
  const colors = [];
  for (let i = 0; i < 18; i++) {
    colors.push(`hsl(${20 * i}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

function getContrastYIQ(hexcolor, opacity, reverse) {
  try {
    const myString = hexcolor.substring(1);
    const r = parseInt(myString.substr(0, 2), 16);
    const g = parseInt(myString.substr(2, 2), 16);
    const b = parseInt(myString.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    if (reverse === true) {
      return yiq >= 128 ? `hsla(0, 0%, 100%, ${opacity})` : `hsla(0, 0%, 0%,  ${opacity})`;
    }
    if (reverse === false) {
      return yiq >= 128 ? `hsla(0, 0%, 0%, ${opacity})` : `hsla(0, 0%, 100%,  ${opacity})`;
    }
  } catch (e) {
    console.log(e);
  }
}

@observer
class ColorPicker extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  }
  render() {
    const { dataStore } = this.props;
    const swatch = dataStore.schemes[dataStore.targetItem].colors[dataStore.targetSwatch];
    const handleStyle = {
      background: `hsl(${swatch.hue}, ${swatch.saturation}%, ${swatch.lightness}%)`,
      color: `${getContrastYIQ(swatch.hex, .8, false)}`,
      borderColor: `${getContrastYIQ(swatch.hex, .8, false)}`
    }
    const backgroundHue = {
      background: `
        linear-gradient(to right, ${generateSpectrum(swatch.saturation, swatch.lightness)})
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
      <div className="color-picker-container">
        <div className="sliders">
          <div className="slider-container">
            <h2 className="slider-heading">Hue</h2>
            <div className="bar-container" style={backgroundHue}>
              <ReactSlider
                className="bar"
                style={backgroundHue}
                handleClassName="test-handle"
                barClassName="test-bar"
                min={0}
                max={360}
                defaultValue={swatch.hue}
                withBars={true}
                pearling={true}
                value={swatch.hue}
                onChange={value => dataStore.changeHue({ value })}>
                <div className="my-handle" style={handleStyle}>
                  {swatch.hue}
                </div>
              </ReactSlider>
            </div>
          </div>

          <div className="slider-container">
            <h2 className="slider-heading">Saturation</h2>
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
                onChange={value => dataStore.changeSaturation({ value })}>
                <div className="my-handle" style={handleStyle}>
                  {swatch.saturation}
                </div>
              </ReactSlider>
            </div>
          </div>
          <div className="slider-container">
            <h2 className="slider-heading">Lightness</h2>
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
                onChange={value => dataStore.changeLightness({ value })}>
                <div className="my-handle" style={handleStyle}>
                  {swatch.lightness}
                </div>
              </ReactSlider>
            </div>
          </div>
          <button className="color-picker-buttons" onClick={() => dataStore.closeColorPicker()}>Done</button>
        </div>
      </div>
    );
  }
}

export default ColorPicker;
