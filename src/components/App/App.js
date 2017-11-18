import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Header from "../Header/Header.js";
import Palette from "../Palette/Palette";
import FlipMove from "react-flip-move";
import ColorPicker from "../ColorPicker/ColorPicker";
import SubHeader from "../SubHeader/SubHeader";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { NotificationContainer } from "react-notifications";
import MiniPalette from "../Elements/MiniPalette";
import "../../../node_modules/react-notifications/dist/react-notifications.css";
import "./App.css";
import ColorDialog from "../Elements/ColorDialog";

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minWidthReached: undefined,
      isShowingModal: false
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

    // left arrow key press event listiner
    document.addEventListener("keydown", event => {
      const { dataStore } = this.props;
      if (event.keyCode === 39) {
        dataStore.getNext();
      } else {
        return;
      }
    });
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

  handleClick = () => {
    this.setState({ isShowingModal: true });
  };
  handleClose = () => this.setState({ isShowingModal: false });

  render() {
    const { dataStore } = this.props;
    const { minWidthReached } = this.state;
    return (
      <div className="App">
        <Header
          minWidthReached={minWidthReached}
          modalHandleClick={this.handleClick}
          dataStore={dataStore}
        />

        <SubHeader dataStore={dataStore} />

        {dataStore.currentPalette.length === 0 ? (
          "No data"
        ) : (
          <FlipMove
            appearAnimation={"fade"}
            onStartAll={() => dataStore.toggleCoolDownActive(true)}
            onFinishAll={() => dataStore.toggleCoolDownActive(false)}
            className="flipmove-container"
            easing="ease-in-out"
            duration={200}
            enterAnimation={"fade"}
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
              currentPalette={dataStore.currentPalette.colors}
              dataStore={dataStore}
              key={`palette-${dataStore.count}`}
            />
          </FlipMove>
        )}

        {this.state.isShowingModal && (
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <div className="modal-palette-container">
                <MiniPalette
                  swatchHover={true}
                  harmony={dataStore.currentPalette.colors}
                />
              </div>
              <div className="modal-box-container">
                <ColorDialog
                  colors={dataStore.currentPalette.colors}
                  colorSpace="hsl"
                />
                <ColorDialog
                  colors={dataStore.currentPalette.colors}
                  colorSpace="rgb"
                />
              </div>
              <div className="modal-box-container">
                <ColorDialog
                  colors={dataStore.currentPalette.colors}
                  colorSpace="cmyk"
                />
                <ColorDialog
                  colors={dataStore.currentPalette.colors}
                  colorSpace="hex"
                />
              </div>
            </ModalDialog>
          </ModalContainer>
        )}
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
