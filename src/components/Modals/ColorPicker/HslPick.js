import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Slider from "rc-slider";
import styles from "./Slider.css";

function generateSpectrum(saturation, lightness) {
  const colors = [];
  for (let i = 0; i < 18; i++) {
    colors.push(`hsl(${20 * i}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

function generateRailStyle(state, key) {
  if (key === "hue") {
    return {
      background: `linear-gradient(to right, ${generateSpectrum(
        state.saturation,
        state.lightness
      )})`
    };
  }
  if (key === "saturation") {
    return {
      background: `linear-gradient(to right, 
        hsl(0, 0%, ${state.lightness}%), 
        hsl(${state.hue}, 100%, ${state.lightness}%)`
    };
  }
  if (key === "lightness") {
    return {
      background: `
        linear-gradient(to right,
        hsl(${state.hue}, ${state.saturation}%, ${0}%),
        hsl(${state.hue}, ${state.saturation}%, ${50}%),
        hsl(${state.hue}, ${state.saturation}%, ${100}%))`
    };
  }
}

const sliderColors = {
  hue: "#FFFFFF",
  saturation: "#FFFFFF",
  lightness: "#FFFFFF"
};

const colorSpaceVals = {
  hue: 360,
  saturation: 100,
  lightness: 100
};

function generateInputs(state, inputOnChange, inputOnBlur) {
  return Object.entries(state).map(([key, value], index) => (
    <div key={`hsl-${index}`} className={styles.inputContainer}>
      <input
        className={styles.sliderInput}
        onChange={event => inputOnChange(event.target.value, key)}
        min={0}
        max={colorSpaceVals[key]}
        type="number"
        value={value}
        onBlur={event => inputOnBlur(event.target.value, key)}
      />
      <Slider
        min={0}
        max={colorSpaceVals[key]}
        step={1}
        handleStyle={{ background: sliderColors[key] }}
        trackStyle={{ background: "none" }}
        railStyle={generateRailStyle(state, key)}
        value={value || 0}
        onChange={value => inputOnChange(value, key)}
      />
    </div>
  ));
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
    return (
      <div>
        {generateInputs(this.state, this.inputOnChange, this.inputOnBlur)}
      </div>
    );
  }
}

export default HslPick;
