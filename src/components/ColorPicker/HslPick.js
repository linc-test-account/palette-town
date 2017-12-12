import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Slider from "rc-slider";
import styles from "./Slider.css";

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
    dataStore: PropTypes.object.isRequired,
    colorStore: PropTypes.object.isRequired
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
      dataStore.palette.changeColorProperty(0, name);
      this.updateState();
    } else {
      return;
    }
  };

  updateState = () => {
    const { colorStore } = this.props;
    this.setState({
      hue: colorStore.hue,
      saturation: colorStore.saturation,
      lightness: colorStore.lightness
    });
  };

  render() {
    const { colorStore } = this.props;
    const { hue, saturation, lightness } = this.state;

    const trackStyle = {
      background: "none"
    };

    const handleStyle = {
      background: `hsl(${colorStore.hue}, ${
        colorStore.saturation
      }%, ${colorStore.lightness}%)`,
      color: `hsla(0, 0%, ${colorStore.contrastYIQ}%, .8)`
    };
    const backgroundHue = {
      background: `
        linear-gradient(to right, ${generateHueSpectrumGradient(
          colorStore.saturation,
          colorStore.lightness
        )})
          `
    };
    const backgroundSaturation = {
      background: `
        linear-gradient(to right,
        hsl(${colorStore.hue}, ${0}%, ${
        colorStore.lightness
      }%),
        hsl(${colorStore.hue}, ${100}%, ${
        colorStore.lightness
      }%))`
    };
    const backgroundLightness = {
      background: `
        linear-gradient(to right,
        hsl(${colorStore.hue}, ${
        colorStore.saturation
      }%, ${0}%),
        hsl(${colorStore.hue}, ${
        colorStore.saturation
      }%, ${50}%),
        hsl(${colorStore.hue}, ${
        colorStore.saturation
      }%, ${100}%))`
    };

    return (
      <div>
        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
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

        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
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
        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
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
