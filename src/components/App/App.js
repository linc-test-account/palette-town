import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Header from "../Header/Header.js";
import Palette from "../Palette/Palette";
import FlipMove from "react-flip-move";
import ColorPicker from "../ColorPicker/ColorPicker";
import SubHeader from "../SubHeader/SubHeader";
import "./App.css";

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minWidthReached: undefined
    };
  }

  static propTypes = {
    dataStore: PropTypes.object
  };

  componentDidMount() {
    const { dataStore } = this.props;
    dataStore.generateNewPalatte();
    const mediaQuery = window.matchMedia(dataStore.minWidth);
    this.handleScreenWidthChange(mediaQuery); // check initial width
    mediaQuery.addListener(this.handleScreenWidthChange); // listen for width change
  }

  handleScreenWidthChange = mediaQuery => {
    if (mediaQuery.matches) {
      this.setState({
        minWidthReached: false
      });
    } else {
      this.setState({
        minWidthReached: true
      });
    }
  };

  render() {
    const { dataStore } = this.props;
    const { minWidthReached } = this.state;
    return (
      <div className="App">
        <Header minWidthReached={minWidthReached} dataStore={dataStore} />

        {dataStore !== undefined ? <SubHeader dataStore={dataStore} /> : ""}

        {dataStore.currentPalatte.length === 0 ? (
          "No data"
        ) : (
          <FlipMove
            appearAnimation={"fade"}
            onStartAll={() => dataStore.toggleCoolDownActive(true)}
            onFinishAll={() => dataStore.toggleCoolDownActive(false)}
            className="flipmove-container"
            easing="ease-in-out"
            duration={200}
            enterAnimation={false}
            leaveAnimation={"fade"}
            maintainContainerHeight={true}
          >
            {dataStore.colorPickerVisible === true ? (
              <ColorPicker key={`color-picker-${0}`} dataStore={dataStore} />
            ) : (
              <span key={`color-picker-${1}`} />
            )}
            <Palette
              minWidthReached={minWidthReached}
              currentPalatte={dataStore.currentPalatte.colors}
              dataStore={dataStore}
              key={`palette-${dataStore.count}`}
            />
          </FlipMove>
        )}
      </div>
    );
  }
}

export default App;
