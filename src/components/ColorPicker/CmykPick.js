import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ReactSlider from "react-slider";
import { getContrastYIQ } from "../../stores/ColorLogic";
import "./ColorPicker.css";

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

    return (
      <div className="sliders">
        <div className="slider-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "cyan")}
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.cyan}
          />
          <div className="bar-container" style={backgroundCyan}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={100}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.cyan}
              onChange={value => dataStore.validateInputs(value, "cyan")}
            >
              <div className="my-handle noselect" style={cyanHandle}>
                C
              </div>
            </ReactSlider>
          </div>
        </div>

        <div className="slider-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "magenta")}
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.magenta}
          />
          <div className="bar-container" style={backgroundMagenta}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={100}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.magenta}
              onChange={value =>
                dataStore.validateInputs(value, "magenta")}
            >
              <div className="my-handle noselect" style={magentaHandle}>
                M
              </div>
            </ReactSlider>
          </div>
        </div>
        <div className="slider-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "yellow")}
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.yellow}
          />
          <div className="bar-container" style={backgroundYellow}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={100}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.yellow}
              onChange={value => dataStore.validateInputs(value, "yellow")}
            >
              <div className="my-handle noselect" style={yellowHandle}>
                Y
              </div>
            </ReactSlider>
          </div>
        </div>
        <div className="slider-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "key")}
            min={0}
            max={100}
            type="number"
            value={dataStore.currentSwatch.key}
          />
          <div className="bar-container" style={backgroundKey}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={100}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.key}
              onChange={value => dataStore.validateInputs(value, "key")}
            >
              <div className="my-handle noselect" style={keyHandle}>
                K
              </div>
            </ReactSlider>
          </div>
        </div>
      </div>
    );
  }
}

export default CmykPick;
