import React, { Component } from "react";
import { observer } from "mobx-react";
import HeaderButton from "../Elements/HeaderButton.js";
import KeyHandler, { KEYDOWN } from "react-key-handler";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import "./Header.css";

@observer
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offSet: 0
    };
  }

  static propTypes = {
    dataStore: PropTypes.object
  };

  componentDidMount = () => {
    window.onclick = event => {
      if (!event.target.matches(".dropbtn")) {
        this.setState({
          showHarmonies: false,
          showModifiers: false
        });
      }
    };

    if (this.headerContainer && this.headerElement) {
      this.setOffsetWidth(
        this.headerContainer.offsetWidth,
        this.headerElement.offsetWidth
      );
    }

    window.addEventListener("resize", () =>
      this.setOffsetWidth(
        this.headerContainer.offsetWidth,
        this.headerElement.offsetWidth
      )
    );
  };

  setOffsetWidth = (headerContainer, headerElement) => {
    if (headerContainer > headerElement) {
      this.setState({
        offSet: 0
      });
    }

    if (headerContainer === headerElement) {
      this.setState({
        offSet: 0
      });
    }

    if (headerContainer < headerElement) {
      this.setState({
        offSet: headerElement - headerContainer
      });
    }
  };

  toggleHarmoniesList = () => {
    if (this.state.showHarmonies === true) {
      this.setState({
        showHarmonies: false
      });
    } else {
      this.setState({
        showHarmonies: true
      });
    }
  };

  togglePaletteModifiersList = () => {
    if (this.state.showModifiers === true) {
      this.setState({
        showModifiers: false
      });
    } else {
      this.setState({
        showModifiers: true
      });
    }
  };

  render() {
    const { dataStore } = this.props;
    const { offSet } = this.state;
    return (
      <div
        ref={headerContainer => (this.headerContainer = headerContainer)}
        className="header-container"
      >
        <Draggable
          axis="x"
          handle=".header"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[1, 1]}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          bounds={{ top: 0, left: -offSet, right: 0, bottom: 0 }}
        >
          <div className="header">
            <div
              ref={headerElement => (this.headerElement = headerElement)}
              className="header-inner"
            >
              <KeyHandler
                keyEventName={KEYDOWN}
                keyValue="ArrowLeft"
                onKeyHandle={() => dataStore.getPrevious()}
              />
              <KeyHandler
                keyEventName={KEYDOWN}
                keyValue="ArrowRight"
                onKeyHandle={() => dataStore.getNext()}
              />
              <h1 className="brand-name">Palette Town</h1>

              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => dataStore.getPrevious()}
                fontAwesomeIcon={"arrow-left"}
                buttonText={"Previous"}
              />
              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => dataStore.getNext()}
                fontAwesomeIcon={"arrow-right"}
                buttonText={"Next"}
              />
              <HeaderButton
                className="card-buttons"
                dataStore={dataStore}
                btnFunction={() => dataStore.addSwatch()}
                fontAwesomeIcon={"plus"}
                buttonText={"Add Swatch"}
              />
              <HeaderButton
                className="card-buttons"
                dataStore={dataStore}
                btnFunction={() => dataStore.reverseSwatches()}
                fontAwesomeIcon={"exchange"}
                buttonText={"Reverse"}
              />
              <HeaderButton
                className="card-buttons"
                dataStore={dataStore}
                btnFunction={() => dataStore.randomizeSwatches()}
                fontAwesomeIcon={"random"}
                buttonText={"Shuffle"}
              />
              <HeaderButton
                className="card-buttons"
                dataStore={dataStore}
                btnFunction={() => dataStore.deletePalatte()}
                fontAwesomeIcon={"trash"}
                buttonText={"Delete"}
              />
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default Header;
