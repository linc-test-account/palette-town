import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { getContrastYIQ } from "../../stores/ColorLogic";
import Slider from "rc-slider";
import "./ColorPicker.css";
import "./Slider.css";

@observer
class CmykPick extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };

  render() {
    const { dataStore } = this.props;

    const cyanHandle = {
      background: "#00ffff",
      color: `hsla(0, 0%, ${getContrastYIQ("#00ffff")}%, .8)`
    };
    const magentaHandle = {
      background: "#fc00ff",
      color: `hsla(0, 0%, ${getContrastYIQ("#fc00ff")}%, .8)`
    };
    const yellowHandle = {
      background: "#fcff00",
      color: `hsla(0, 0%, ${getContrastYIQ("#fcff00")}%, .8)`
    };
    const keyHandle = {
      background: "#000000",
      color: `hsla(0, 0%, ${getContrastYIQ("#000000")}%, .8)`
    };

    const backgroundCyan = {
      background: `
        linear-gradient(to right,
          #FFFFFF,
          #00ffff`
    };
    const backgroundMagenta = {
      background: `
          linear-gradient(to right,
          #FFFFFF,
          #fc00ff`
    };
    const backgroundYellow = {
      background: `
          linear-gradient(to right,
          #FFFFFF,
          #fcff00`
    };
    const backgroundKey = {
      background: `
          linear-gradient(to right,
          #000000,
          #000000`
    };

    const trackStyle = {
      background: "none"
    };

    return (
      <div className="sliders">
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "cyan")
            }
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.cyan}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={cyanHandle}
            trackStyle={trackStyle}
            railStyle={backgroundCyan}
            value={dataStore.currentSwatch.cyan}
            onChange={value => dataStore.validateInputs(value, "cyan")}
          />
        </div>

        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "magenta")
            }
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.magenta}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={magentaHandle}
            trackStyle={trackStyle}
            railStyle={backgroundMagenta}
            value={dataStore.currentSwatch.magenta}
            onChange={value => dataStore.validateInputs(value, "magenta")}
          />
        </div>
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "yellow")
            }
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.yellow}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={yellowHandle}
            trackStyle={trackStyle}
            railStyle={backgroundYellow}
            value={dataStore.currentSwatch.yellow}
            onChange={value => dataStore.validateInputs(value, "yellow")}
          />
        </div>
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "key")
            }
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.key}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={keyHandle}
            trackStyle={trackStyle}
            railStyle={backgroundKey}
            value={dataStore.currentSwatch.key}
            onChange={value => dataStore.validateInputs(value, "key")}
          />
        </div>
      </div>
    );
  }
}

export default CmykPick;
