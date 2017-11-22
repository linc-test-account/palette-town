import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Slider from "rc-slider";
import "./ColorPicker.css";
// import "rc-slider/assets/index.css";
import "./Slider.css";

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

    const trackStyle = {
      background: "none"
    };

    const handleStyle = {
      background: `hsl(${dataStore.currentSwatch.hue}, ${
        dataStore.currentSwatch.saturation
      }%, ${dataStore.currentSwatch.lightness}%)`,
      color: `hsla(0, 0%, ${dataStore.currentSwatch.contrastYIQ}%, .8)`
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
        hsl(${dataStore.currentSwatch.hue}, ${0}%, ${
        dataStore.currentSwatch.lightness
      }%),
        hsl(${dataStore.currentSwatch.hue}, ${100}%, ${
        dataStore.currentSwatch.lightness
      }%))`
    };
    const backgroundLightness = {
      background: `
        linear-gradient(to right,
        hsl(${dataStore.currentSwatch.hue}, ${
        dataStore.currentSwatch.saturation
      }%, ${0}%),
        hsl(${dataStore.currentSwatch.hue}, ${
        dataStore.currentSwatch.saturation
      }%, ${50}%),
        hsl(${dataStore.currentSwatch.hue}, ${
        dataStore.currentSwatch.saturation
      }%, ${109}%))`
    };

    return (
      <div className="picker-container">
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "hue")
            }
            min={0}
            max={360}
            type="number"
            value={dataStore.currentSwatch.hue}
          />

          <Slider
            min={0}
            max={360}
            step={1}
            handleStyle={handleStyle}
            trackStyle={trackStyle}
            railStyle={backgroundHue}
            value={dataStore.currentSwatch.hue}
            onChange={value => dataStore.validateInputs(value, "hue")}
          />
        </div>

        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "saturation")
            }
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.saturation}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={handleStyle}
            trackStyle={trackStyle}
            railStyle={backgroundSaturation}
            value={dataStore.currentSwatch.saturation}
            onChange={value => dataStore.validateInputs(value, "saturation")}
          />
        </div>
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "lightness")
            }
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.lightness}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={handleStyle}
            trackStyle={trackStyle}
            railStyle={backgroundLightness}
            value={dataStore.currentSwatch.lightness}
            onChange={value => dataStore.validateInputs(value, "lightness")}
          />
        </div>
      </div>
    );
  }
}

export default HslPick;
