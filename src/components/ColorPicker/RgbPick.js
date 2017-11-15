import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ReactSlider from "react-slider";
import { getContrastYIQ } from "../../stores/ColorLogic";
import "./ColorPicker.css";

@observer
class RgbPick extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };

  render() {
    const { dataStore } = this.props;

    const redHandle = {
      background: "#FF0000",
      color: `hsla(0, 0%, ${getContrastYIQ("#FF0000")}%, .8)`
    };
    const greenHandle = {
      background: "#00FF00",
      color: `hsla(0, 0%, ${getContrastYIQ("#00FF00")}%, .8)`
    };
    const blueHandle = {
      background: "#0000FF",
      color: `hsla(0, 0%, ${getContrastYIQ("#0000FF")}%, .8)`
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

    return (
      <div className="sliders">
        <div className="slider-container">
          <h2 className="slider-heading">R</h2>
          <div className="bar-container" style={backgroundRed}>
            <ReactSlider
              className="bar"
              style={backgroundRed}
              barClassName="test-bar"
              min={0}
              max={255}
              defaultValue={dataStore.currentSwatch.red}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.red}
              onChange={value => dataStore.changeRed(value)}
            >
              <div className="my-handle noselect" style={redHandle}>
                {dataStore.currentSwatch.red}
              </div>
            </ReactSlider>
          </div>
        </div>

        <div className="slider-container">
          <h2 className="slider-heading">G</h2>
          <div className="bar-container" style={backgroundGreen}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={255}
              defaultValue={dataStore.currentSwatch.green}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.green}
              onChange={value => dataStore.changeGreen(value)}
            >
              <div className="my-handle noselect" style={greenHandle}>
                {dataStore.currentSwatch.green}
              </div>
            </ReactSlider>
          </div>
        </div>
        <div className="slider-container">
          <h2 className="slider-heading">B</h2>
          <div className="bar-container" style={backgroundBlue}>
            <ReactSlider
              className="bar"
              barClassName="test-bar"
              min={0}
              max={255}
              defaultValue={dataStore.currentSwatch.blue}
              withBars={true}
              pearling={true}
              value={dataStore.currentSwatch.blue}
              onChange={value => dataStore.changeBlue(value)}
            >
              <div className="my-handle noselect" style={blueHandle}>
                {dataStore.currentSwatch.blue}
              </div>
            </ReactSlider>
          </div>
        </div>
      </div>
    );
  }
}

export default RgbPick;
