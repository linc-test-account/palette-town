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
          <h2 className="slider-heading">C</h2>
          <div className="bar-container" style={backgroundCyan}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={100}
              defaultValue={dataStore.currentSwatch.cyan}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.cyan}
              onChange={value => dataStore.changeColorVal(value, "cyan")}
            >
              <div className="my-handle noselect" style={cyanHandle}>
                {dataStore.currentSwatch.cyan}
              </div>
            </ReactSlider>
          </div>
        </div>

        <div className="slider-container">
          <h2 className="slider-heading">M</h2>
          <div className="bar-container" style={backgroundMagenta}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={100}
              defaultValue={dataStore.currentSwatch.magenta} 
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.magenta}
              onChange={value => dataStore.changeColorVal(value, "magenta")}
            >
              <div className="my-handle noselect" style={magentaHandle}>
                {dataStore.currentSwatch.magenta}
              </div>
            </ReactSlider>
          </div>
        </div>
        <div className="slider-container">
          <h2 className="slider-heading">Y</h2>
          <div className="bar-container" style={backgroundYellow}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={100}
              defaultValue={dataStore.currentSwatch.yellow}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.yellow}
              onChange={value => dataStore.changeColorVal(value, "yellow")}
            >
              <div className="my-handle noselect" style={yellowHandle}>
              {dataStore.currentSwatch.yellow}
              </div>
            </ReactSlider>
          </div>
        </div>
        <div className="slider-container">
          <h2 className="slider-heading">K</h2>
          <div className="bar-container" style={backgroundKey}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={100}
              defaultValue={dataStore.currentSwatch.key}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.key}
              onChange={value => dataStore.changeColorVal(value, "key")}
            >
              <div className="my-handle noselect" style={keyHandle}>
                {dataStore.currentSwatch.key}
              </div>
            </ReactSlider>
          </div>
        </div>
      </div>
    );
  }
}

export default CmykPick;
