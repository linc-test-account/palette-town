import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import HeaderButton from "../Elements/HeaderButton";
import DropDownList from "../Elements/DropDownList";
import HslPick from "./HslPick";
import RgbPick from "./RgbPick";
import CmykPick from "./CmykPick";
import FlipMove from "react-flip-move";
import FontAwesome from "react-fontawesome";
import "./ColorPicker.css";

function getColorSpaceOptions(colorSpaces, dataStore, toggleColorSpaceOptions) {
  const colorSpaceOptions = colorSpaces.map(
    ({ colorSpace }, index) =>
      colorSpace === dataStore.selectedColorSpace.colorSpace ? (
        <a
          className="drop-down-list-option list-option-selected"
          key={index}
          value={index}
          onClick={() => toggleColorSpaceOptions()}
        >
          {colorSpace}
          <FontAwesome className="option-checkmark" name={"check"} size="2x" />
        </a>
      ) : (
        <a
          className="drop-down-list-option"
          key={index}
          value={index}
          onClick={() => {
            dataStore.changeColorSpace(index);
            toggleColorSpaceOptions();
          }}
        >
          {colorSpace}
        </a>
      )
  );
  return colorSpaceOptions;
}

@observer
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorSpaceOptions: false
    };
  }

  componentDidMount() {
    window.onclick = event => {
      if (!event.target.matches(".dropbtn")) {
        this.setState({
          showColorSpaceOptions: false
        });
      }
    };
  }

  toggleColorSpaceOptions = () => {
    if (this.state.showColorSpaceOptions === true) {
      this.setState({
        showColorSpaceOptions: false
      });
    } else {
      this.setState({
        showColorSpaceOptions: true
      });
    }
  };

  static propTypes = {
    dataStore: PropTypes.object
  };

  render() {
    const { dataStore } = this.props;
    const { showColorSpaceOptions } = this.state;
    const colorSpace = dataStore.selectedColorSpace.colorSpace;

    const colorSpaces = getColorSpaceOptions(
      dataStore.colorSpaces,
      dataStore,
      this.toggleColorSpaceOptions
    );

    return (
      <div className="color-picker-container">
        <DropDownList
          toggleShowing={() => this.toggleColorSpaceOptions()}
          showing={showColorSpaceOptions}
          listItems={colorSpaces}
          selectedValue={dataStore.selectedColorSpace.colorSpace}
        />

        <FlipMove
          className="color-picker-inner-container"
          appearAnimation={"fade"}
          easing="ease-in-out"
          duration={200}
          enterAnimation={false}
          leaveAnimation={"fade"}
          maintainContainerHeight={true}
        >
          {colorSpace === "HSL" ? (
            <HslPick key={`color-picker-0`} dataStore={dataStore} />
          ) : colorSpace === "RGB" ? (
            <RgbPick key={`color-picker-1`} dataStore={dataStore} />
          ) : colorSpace === "CMYK" ? (
            <CmykPick key={`color-picker-2`} dataStore={dataStore} />
          ) : (
            <span key={`color-picker-2`} />
          )}
        </FlipMove>

        <HeaderButton
          className="card-buttons"
          dataStore={dataStore}
          btnFunction={() => dataStore.closeColorPicker()}
          fontAwesomeIcon={"check"}
          buttonText={"Done"}
        />
      </div>
    );
  }
}

export default ColorPicker;
