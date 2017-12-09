import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { getContrastYIQ } from "../../stores/ColorLogic";
import Slider from "rc-slider";
import styles from "./Slider.css";

@observer
class RgbPick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 0,
      green: 0,
      blue: 0
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
      red: colorStore.red,
      green: colorStore.green,
      blue: colorStore.blue
    });
  };

  render() {
    const { red, green, blue } = this.state;

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
        rgb(255, 0, 0))`
    };
    const backgroundGreen = {
      background: `
        linear-gradient(to right,
          rgb(0, 0, 0),
          rgb(0, 255, 0))`
    };
    const backgroundBlue = {
      background: `
        linear-gradient(to right,
          rgb(0, 0, 0),
          rgb(0, 0, 255))`
    };

    const trackStyle = {
      background: "none"
    };

    return (
      <div>
        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
            onChange={event => this.inputOnChange(event.target.value, "red")}
            min={0}
            max={255}
            type="number"
            value={red}
            onBlur={event => this.inputOnBlur(event.target.value, "red")}
          />
          <Slider
            min={0}
            max={255}
            step={1}
            handleStyle={redHandle}
            trackStyle={trackStyle}
            railStyle={backgroundRed}
            value={red || 0}
            onChange={value => this.inputOnChange(value, "red")}
          />
        </div>

        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
            onChange={event => this.inputOnChange(event.target.value, "green")}
            min={0}
            max={255}
            type="number"
            value={green}
            onBlur={event => this.inputOnBlur(event.target.value, "green")}
          />
          <Slider
            min={0}
            max={255}
            step={1}
            handleStyle={greenHandle}
            trackStyle={trackStyle}
            railStyle={backgroundGreen}
            value={green || 0}
            onChange={value => this.inputOnChange(value, "green")}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.sliderInput}
            onChange={event => this.inputOnChange(event.target.value, "blue")}
            min={0}
            max={255}
            type="number"
            value={blue}
            onBlur={event => this.inputOnBlur(event.target.value, "blue")}
          />
          <Slider
            min={0}
            max={255}
            step={1}
            handleStyle={blueHandle}
            trackStyle={trackStyle}
            railStyle={backgroundBlue}
            value={blue || 0}
            onChange={value => this.inputOnChange(value, "blue")}
          />
        </div>
      </div>
    );
  }
}

export default RgbPick;
