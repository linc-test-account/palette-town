import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Header from "../Header/Header.js";
import SideNav from "../SideNav/SideNav";
import Palette from "../Palette/Palette";
import FlipMove from "react-flip-move";
import Footer from "../Footer/Footer";
import Modal from "react-modal";
import ModalContent from "../ModalContent/ModalContent";
import "./App.css";

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minWidthReached: undefined,
      isShowingModal: false,
      showSideNav: false
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

    // listen for space bar press
    document.addEventListener("keydown", event => {
      const { dataStore } = this.props;
      if (event.keyCode === 32) {
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

  toggleSideNav = val => {
    if (val === false) {
      this.setState({
        showSideNav: false
      });
    }
    if (val === true) {
      this.setState({
        showSideNav: true
      });
    }
  };

  handleClick = () => {
    this.setState({ isShowingModal: true });
  };
  handleClose = () => this.setState({ isShowingModal: false });

  render() {
    const { dataStore } = this.props;
    const { showSideNav, minWidthReached } = this.state;
    return (
      <div className="App">
        <Header
          toggleSideNav={this.toggleSideNav}
          modalHandleClick={this.handleClick}
          dataStore={dataStore}
        />

        <SideNav
          dataStore={dataStore}
          showSideNav={showSideNav}
          toggleSideNav={this.toggleSideNav}
        />

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
            <Palette
              minWidthReached={minWidthReached}
              currentPalette={dataStore.currentPalette.colors}
              dataStore={dataStore}
              key={`palette-${dataStore.count}`}
            />
          </FlipMove>
        )}

        <Footer dataStore={dataStore} />

        <Modal
          isOpen={this.state.isShowingModal}
          onRequestClose={this.handleClose}
          contentLabel="Color Info Modal"
          className={{
            base: "colorModalDialog",
            afterOpen: "colorModalDialog_after-open",
            beforeClose: "colorModalDialog_before-close"
          }}
          overlayClassName={{
            base: "modalOverlay",
            afterOpen: "modalOverlay_after-open",
            beforeClose: "modalOverlay_before-close"
          }}
        >
          <ModalContent dataStore={dataStore} handleClose={this.handleClose} />
        </Modal>
      </div>
    );
  }
}

export default App;
