import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import FlipMove from "react-flip-move";
import HeaderButton from "../Elements/HeaderButton";
import DropDownList from "../Elements/DropDownList";
import HslPick from "./HslPick";
import RgbPick from "./RgbPick";
import "./ColorPicker.css";

function generateColorSpaceOptions(dataStore, colorSpaces) {
  const options = [];
  for (let i = 0; i < colorSpaces.length; i++) {
    options.push(
      <a
        className="drop-down-list-option"
        key={i}
        value={i}
        onClick={() => dataStore.changeColorSpace(colorSpaces[i])}
      >
        {colorSpaces[i]}
      </a>
    );
  }
  return options;
}

@observer
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false
    };
  }

  static propTypes = {
    dataStore: PropTypes.object
  };

  componentDidMount = () => {
    window.onclick = event => {
      if (!event.target.matches(".dropbtn")) {
        this.setState({
          showing: false
        });
      }
    };
  };

  toggleShowing = () => {
    if (this.state.showing === true) {
      this.setState({
        showing: false
      });
    } else {
      this.setState({
        showing: true
      });
    }
  };

  render() {
    const { dataStore } = this.props;
    const { showing } = this.state;
    const listItems = generateColorSpaceOptions(
      dataStore,
      dataStore.colorSpaces
    );
    const colorSpace = dataStore.colorSpace;

    return (
      <div className="color-picker-container">
        <DropDownList
          toggleShowing={() => this.toggleShowing()}
          showing={showing}
          listItems={listItems}
          selectedValue={colorSpace}
        />

        <FlipMove
          className="sliders"
          easing="ease-in-out"
          duration={200}
          enterAnimation={"fade"}
          leaveAnimation={"fade"}
          maintainContainerHeight={true}
        >
          {colorSpace === "HSL" ? (
            <HslPick key={801} dataStore={dataStore} />
          ) : colorSpace === "RGB" ? (
            <RgbPick key={802} dataStore={dataStore} />
          ) : colorSpace === "HSV" ? (
            <HslPick key={803} dataStore={dataStore} />
          ) : (
            <span key={804} />
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
