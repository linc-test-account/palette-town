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
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "red")}
            min={0}
            max={255}
            type="number"
            value={dataStore.currentSwatch.red}
          />
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
              onChange={value => dataStore.validateInputs(value, "red")}
            >
              <div className="my-handle noselect" style={redHandle}>
                R
              </div>
            </ReactSlider>
          </div>
        </div>

        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "green")}
            min={0}
            max={255}
            type="number"
            value={dataStore.currentSwatch.green}
          />
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
              onChange={value => dataStore.validateInputs(value, "green")}
            >
              <div className="my-handle noselect" style={greenHandle}>
                G
              </div>
            </ReactSlider>
          </div>
        </div>
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "blue")}
            min={0}
            max={255}
            type="number"
            value={dataStore.currentSwatch.blue}
          />
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
              onChange={value => dataStore.validateInputs(value, "blue")}
            >
              <div className="my-handle noselect" style={blueHandle}>
                B
              </div>
            </ReactSlider>
          </div>
        </div>
      </div>
    );
  }
}

export default RgbPick;
