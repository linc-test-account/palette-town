import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import FlipMove from "react-flip-move";
import HeaderButton from "../Elements/HeaderButton";
import HslPick from "./HslPick";
import "./ColorPicker.css";

@observer
class ColorPicker extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };

  render() {
    const { dataStore } = this.props;

    return (
      <div className="color-picker-container">
        <FlipMove
          className="sliders"
          easing="ease-in-out"
          duration={200}
          enterAnimation={"fade"}
          leaveAnimation={"fade"}
          maintainContainerHeight={true}
        >
          <HslPick key={801} dataStore={dataStore} />
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
