import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Slider from "rc-slider";
import styles from "./Slider.css";

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
    const { cyan, magenta, yellow, key } = this.state;

    const cyanHandle = {
      background: "#00ffff",
    };
    const magentaHandle = {
      background: "#fc00ff",
    };
    const yellowHandle = {
      background: "#fcff00",
    };
    const keyHandle = {
      background: "#000000",
    };

    const backgroundCyan = {
      background: `
        linear-gradient(to right,
          #FFFFFF,
          #00ffff)`
    };
    const backgroundMagenta = {
      background: `
          linear-gradient(to right,
          #FFFFFF,
          #fc00ff)`
    };
    const backgroundYellow = {
      background: `
          linear-gradient(to right,
          #FFFFFF,
          #fcff00)`
    };
    const backgroundKey = {
      background: `
          linear-gradient(to right,
          #000000,
          #000000)`
    };

    const trackStyle = {
      background: "none"
    };

    return (
      <div>
        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
            onChange={event => this.inputOnChange(event.target.value, "cyan")}
            min={0}
            max={100}
            type="number"
            value={cyan}
            onBlur={event => this.inputOnBlur(event.target.value, "cyan")}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={cyanHandle}
            trackStyle={trackStyle}
            railStyle={backgroundCyan}
            value={cyan || 0}
            onChange={value => this.inputOnChange(value, "cyan")}
          />
        </div>

        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
            onChange={event =>
              this.inputOnChange(event.target.value, "magenta")
            }
            min={0}
            max={100}
            type="number"
            value={magenta}
            onBlur={event => this.inputOnBlur(event.target.value, "magenta")}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={magentaHandle}
            trackStyle={trackStyle}
            railStyle={backgroundMagenta}
            value={magenta || 0}
            onChange={value => this.inputOnChange(value, "magenta")}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
            onChange={event => this.inputOnChange(event.target.value, "yellow")}
            min={0}
            max={100}
            type="number"
            value={yellow}
            onBlur={event => this.inputOnBlur(event.target.value, "yellow")}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={yellowHandle}
            trackStyle={trackStyle}
            railStyle={backgroundYellow}
            value={yellow || 0}
            onChange={value => this.inputOnChange(value, "yellow")}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
            onChange={event => this.inputOnChange(event.target.value, "key")}
            min={0}
            max={100}
            type="number"
            value={key}
            onBlur={event => this.inputOnBlur(event.target.value, "key")}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            handleStyle={keyHandle}
            trackStyle={trackStyle}
            railStyle={backgroundKey}
            value={key || 0}
            onChange={value => this.inputOnChange(value, "key")}
          />
        </div>
      </div>
    );
  }
}

export default CmykPick;
