import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Header from "../Header/Header.js";
import "./App.css";
import Palette from "../Palette/Palette";
import FlipMove from "react-flip-move";
import ColorPicker from "../ColorPicker/ColorPicker";
import SubHeader from "../SubHeader/SubHeader";


@observer
class App extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };
  componentDidMount() {
    this.props.dataStore.concatColors();
  }

  render() {
    const { dataStore } = this.props;
    const item = dataStore.schemes[dataStore.targetItem];

    // console.log(dataStore.miniPalettes)
    return (
      <div className="App">

        <Header dataStore={dataStore} />

        {dataStore !== undefined ? <SubHeader dataStore={dataStore} /> : ""}

        {dataStore.schemes.length === 0 ? (
          "No data"
        ) : (
          <FlipMove
            className="flipmove-container"
            easing="ease-in-out"
            duration={dataStore.transitionTime}
            enterAnimation={"fade"}
            leaveAnimation={"fade"}
            maintainContainerHeight={true}
          >
            {dataStore.colorPickerVisible === true ? (
              <ColorPicker key={9} dataStore={dataStore} />
            ) : (
              <span key={1} />
            )}
            <Palette
              currentPalette={dataStore.currentPalette}
              dataStore={dataStore}
              key={item.count}
            />
          </FlipMove>
        )}
      </div>
    );
  }
}

export default App;
