import React, { Component } from "react";
import PropTypes from "prop-types";
import convert from "color-convert";
import styles from "./HexInput.css";
import { observer } from "mobx-react";

@observer
class HexInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }
  static propTypes = {
    textColor: PropTypes.object,
    colorStore: PropTypes.object,
    uniqueIndex: PropTypes.number,
    dataStore: PropTypes.object
  };

  componentDidMount() {
    const { colorStore } = this.props;
    this.setState({
      inputValue: "#" + colorStore.hex
    });
  }

  componentWillReceiveProps() {
    this.setState({
      inputValue: "#" + this.props.colorStore.hex
    });
  }

  handleChange = value => {
    const { uniqueIndex, dataStore } = this.props;
    const { inputValue } = this.state;
    const isValidHex = /^#[0-9A-F]{6}$/i.test(value);
    const maxHexLength = 7;

    if (value.length > maxHexLength) {
      return;
    }

    if (value.length === 0) {
      this.setState({
        inputValue: "#"
      });
      return
    }

    if (isValidHex === true && value !== inputValue) {
      const rgb = convert.hex.rgb(value);
      dataStore.palette.changeColorProperty(rgb[0], "red", uniqueIndex);
      dataStore.palette.changeColorProperty(rgb[1], "green", uniqueIndex);
      dataStore.palette.changeColorProperty(rgb[2], "blue", uniqueIndex);
    }

    this.setState({
      inputValue: value
    });
  };

  handleOnBlur = () => {
    const {inputValue} = this.state;
    if (inputValue.length === 0) {
      this.setState({
        inputValue: "#" + this.props.colorStore.hex
      })
    }
  }

  render() {
    const { inputValue } = this.state;
    const { textColor } = this.props;
    return (
      <input
        style={textColor}
        size="2"
        className={styles.paletteSwatchHexInput}
        type="text"
        value={inputValue}
        pattern="[a-fA-F\d]+"
        onChange={event => this.handleChange(event.target.value)}
        onBlur={this.handleOnBlur}
        title="Click to edit"
      />
    );
  }
}

export default HexInput;
