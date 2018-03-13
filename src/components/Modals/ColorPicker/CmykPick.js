import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Slider from "rc-slider";
import styles from "./Slider.css";

const sliderColors = {
  cyan: "#00FFFF",
  magenta: "#FF00FF",
  yellow: "#FFFF00",
  key: "#000000"
};

const colorSpaceVals = {
  cyan: 100,
  magenta: 100,
  yellow: 100,
  key: 100
};

function generateInputs(state, inputOnChange, inputOnBlur) {
  return Object.entries(state).map(([key, value], index) => (
    <div key={`cmyk-${index}`} className={styles.inputContainer}>
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
        railStyle={{
          background: `
        linear-gradient(to right,
          #FFFFFF,
          ${sliderColors[key]}`
        }}
        value={value || 0}
        onChange={value => inputOnChange(value, key)}
      />
    </div>
  ));
}

@observer
class CmykPick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cyan: 0,
      magenta: 0,
      yellow: 0,
      key: 0
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
      cyan: colorStore.cyan,
      magenta: colorStore.magenta,
      yellow: colorStore.yellow,
      key: colorStore.key
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

export default CmykPick;
