import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { getContrastYIQ } from "../../stores/ColorLogic";
import Slider from "rc-slider";
import "./ColorPicker.css";
import "./Slider.css";

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

    const trackStyle = {
      background: "none"
    };

    return (
      <div className="sliders">
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "red")
            }
            min={0}
            max={255}
            type="number"
            value={dataStore.currentSwatch.red}
          />
          <Slider
            min={0}
            max={255}
            step={1}
            handleStyle={redHandle}
            trackStyle={trackStyle}
            railStyle={backgroundRed}
            value={dataStore.currentSwatch.red}
            onChange={value => dataStore.validateInputs(value, "red")}
          />
        </div>

        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "green")
            }
            min={0}
            max={255}
            type="number"
            value={dataStore.currentSwatch.green}
          />
          <Slider
            min={0}
            max={255}
            step={1}
            handleStyle={greenHandle}
            trackStyle={trackStyle}
            railStyle={backgroundGreen}
            value={dataStore.currentSwatch.green}
            onChange={value => dataStore.validateInputs(value, "green")}
          />
        </div>
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              dataStore.validateInputs(event.target.value, "blue")
            }
            min={0}
            max={255}
            type="number"
            value={dataStore.currentSwatch.blue}
          />
          <Slider
            min={0}
            max={255}
            step={1}
            handleStyle={blueHandle}
            trackStyle={trackStyle}
            railStyle={backgroundBlue}
            value={dataStore.currentSwatch.blue}
            onChange={value => dataStore.validateInputs(value, "blue")}
          />
        </div>
      </div>
    );
  }
}

export default RgbPick;
