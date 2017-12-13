import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Header from "../Header/Header.js";
import SideNav from "../SideNav/SideNav";
import Loader from "../Loader/Loader";
import Palette from "../Palette/Palette";
import Footer from "../Footer/Footer";
import Modal from "react-modal";
import ColorInfo from "../ModalContent/ColorInfo";
import styles from "./App.css";

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minWidthReached: undefined,
      isShowingModal: false,
      showSideNav: false,
      sideNavModalVisible: false
    };
  }

  static propTypes = {
    dataStore: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dataStore } = this.props;
    dataStore.generateNewPalatte();
    dataStore.retreiveFromLocalStorage();
    const mediaQuery = window.matchMedia(dataStore.minWidth);
    this.handleScreenWidthChange(mediaQuery); // check initial width
    mediaQuery.addListener(this.handleScreenWidthChange); // listen for width change

    document.addEventListener("keydown", event => {
      // If side nav open and esc key pressed, close side nav
      const escKey = 27;
      const spaceBarKey = 32;
      if (this.state.showSideNav === true && event.keyCode === escKey) {
        this.toggleSideNav(false);
      }
      // if space bar pressed, get new palette
      if (event.keyCode === spaceBarKey) {
        if (this.state.sideNavModalVisible === true) {
          return;
        }
        if (this.state.showSideNav === true) {
          return;
        } else {
          dataStore.getNext();
        }
      }
    });
  }

  handleKeyPress = () => {
    const { dataStore } = this.props;
    if (this.state.sideNavModalVisible === true) {
      return;
    }
    if (this.state.showSideNav === true) {
      return;
    } else {
      dataStore.getNext();
    }
  };

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
    if (this.state.sideNavModalVisible === true) {
      return;
    } else {
      this.setState({
        showSideNav: val
      });
    }
  };

  handleClick = () => {
    this.setState({ isShowingModal: true });
  };

  handleClose = () => this.setState({ isShowingModal: false });

  toggleSideNavVisibility = () => {
    const { sideNavModalVisible } = this.state;
    this.setState({
      sideNavModalVisible: sideNavModalVisible === true ? false : true
    });
  };

  render() {
    const { dataStore } = this.props;
    const { showSideNav, minWidthReached } = this.state;
    return (
      <div className={styles.container}>
        <Header
          toggleSideNav={this.toggleSideNav}
          modalHandleClick={this.handleClick}
          dataStore={dataStore}
        />

        <SideNav
          dataStore={dataStore}
          showSideNav={showSideNav}
          toggleSideNav={this.toggleSideNav}
          toggleSideNavVisibility={this.toggleSideNavVisibility}
          minWidthReached={minWidthReached}
        />

        {dataStore.palette.length === 0 ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <Palette minWidthReached={minWidthReached} dataStore={dataStore} />
        )}

        <Footer dataStore={dataStore} />

        <Modal
          isOpen={this.state.isShowingModal}
          onRequestClose={this.handleClose}
          contentLabel="Color Info Modal"
          ariaHideApp={false}
          className={{
            base: styles.colorModalDialog,
            afterOpen: styles.colorModalDialogAfterOpen,
            beforeClose: styles.colorModalDialogBeforeClose
          }}
          overlayClassName={{
            base: styles.modalOverlay,
            afterOpen: styles.modalOverlayAfterOpen,
            beforeClose: styles.modalOverlayBeforeClose
          }}
        >
          <ColorInfo
            dataStore={dataStore}
            handleClose={this.handleClose}
            minWidthReached={minWidthReached}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
