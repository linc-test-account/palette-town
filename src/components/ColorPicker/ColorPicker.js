import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import HslPick from "./HslPick";
import RgbPick from "./RgbPick";
import CmykPick from "./CmykPick";
import styles from "./ColorPicker.css";
import ModalHeaderButton from "../ModalHeaderButton/ModalHeaderButton";

const colorSpaces = ["hsl", "rgb", "cmyk"];

function generateHeaderButtons(currentColorSpace, changeColorSpace) {
  return colorSpaces.map((colorSpace, index) => (
    <ModalHeaderButton
      key={`color-picker-header-button-${index}`}
      action={() => changeColorSpace(colorSpace)}
      active={currentColorSpace === colorSpace ? true : false}
    >
      {colorSpace}
    </ModalHeaderButton>
  ));
}

@observer
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSliders: true,
      colorSpace: "hsl"
    };
  }

  changeColorSpace = val => {
    this.setState({
      colorSpace: val
    });
  };

  static propTypes = {
    dataStore: PropTypes.object.isRequired,
    colorStore: PropTypes.object.isRequired,
    colorSpace: PropTypes.string.isRequired
  };

  render() {
    const { dataStore, colorStore } = this.props;
    const { showSliders, colorSpace } = this.state;
    return (
      <div className={styles.colorPickerContainer}>
        <div className={styles.colorPickerInner}>
          <div className={styles.colorPickerHeader}>
            {generateHeaderButtons(colorSpace, this.changeColorSpace)}
            <ModalHeaderButton
              action={() => dataStore.palette.deselectSwatch()}
            >
              Done
            </ModalHeaderButton>
          </div>

          {colorSpace === "hsl" &&
            showSliders === true && (
              <HslPick
                key={`color-picker-0`}
                dataStore={dataStore}
                colorStore={colorStore}
              />
            )}
          {colorSpace === "rgb" &&
            showSliders === true && (
              <RgbPick
                key={`color-picker-1`}
                dataStore={dataStore}
                colorStore={colorStore}
              />
            )}
          {colorSpace === "cmyk" &&
            showSliders === true && (
              <CmykPick
                key={`color-picker-2`}
                dataStore={dataStore}
                colorStore={colorStore}
              />
            )}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
