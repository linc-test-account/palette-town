import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Slider from "rc-slider";
import "./ColorPicker.css";
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
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      saturation: 0,
      lightness: 0
    };
  }

  static propTypes = {
    dataStore: PropTypes.object
  };

  componentDidMount() {
    this.updateState();
  }

  inputOnChange = (value, name) => {
    const { dataStore } = this.props;
    const shouldUpdate = dataStore.validateInputs(value, name);
    this.setState({
      [name]: value
    });
    if (shouldUpdate === true) {
      this.updateState();
    } else {
      return;
    }
  };

  inputOnBlur = (value, name) => {
    const { dataStore } = this.props;
    // Reset empty input field to 0 value
    if (value.length === 0) {
      dataStore.changeColorProperty(0, name);
      this.updateState();
    } else {
      return;
    }
  };

  updateState = () => {
    const { dataStore } = this.props;
    this.setState({
      hue: dataStore.currentSwatch.hue,
      saturation: dataStore.currentSwatch.saturation,
      lightness: dataStore.currentSwatch.lightness
    });
  };

  render() {
    const { dataStore } = this.props;
    const { hue, saturation, lightness } = this.state;

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
            onChange={event => this.inputOnChange(event.target.value, "hue")}
            min={0}
            max={360}
            type="number"
            value={hue}
            onBlur={event => this.inputOnBlur(event.target.value, "hue")}
          />

          <Slider
            min={0}
            max={360}
            step={1}
            handleStyle={handleStyle}
            trackStyle={trackStyle}
            railStyle={backgroundHue}
            value={hue || 0}
            onChange={value => this.inputOnChange(value, "hue")}
          />
        </div>

        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              this.inputOnChange(event.target.value, "saturation")
            }
            min={0}
            max={100}
            type="number"
            value={saturation}
            onBlur={event => this.inputOnBlur(event.target.value, "saturation")}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={handleStyle}
            trackStyle={trackStyle}
            railStyle={backgroundSaturation}
            value={saturation || 0}
            onChange={value => this.inputOnChange(value, "saturation")}
          />
        </div>
        <div className="input-container">
          <input
            className="slider-input"
            onChange={event =>
              this.inputOnChange(event.target.value, "lightness")
            }
            min={0}
            max={100}
            type="number"
            value={lightness}
            onBlur={event => this.inputOnBlur(event.target.value, "lightness")}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={handleStyle}
            trackStyle={trackStyle}
            railStyle={backgroundLightness}
            value={lightness || 0}
            onChange={value => this.inputOnChange(value, "lightness")}
          />
        </div>
      </div>
    );
  }
}

export default HslPick;
