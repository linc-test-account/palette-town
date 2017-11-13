import React, { Component } from "react";
import { observer } from "mobx-react";
import HeaderButton from "../Elements/HeaderButton.js";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import Heading from "../Elements/Heading";
import "./Header.css";

@observer
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHarmonies: false,
      showModifiers: false,
      offSet: 0
    };
  }

  static propTypes = {
    dataStore: PropTypes.object,
    minWidthReached: PropTypes.bool
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
    const { dataStore, minWidthReached } = this.props;
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
              <Heading minWidthReached={minWidthReached} />
              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => dataStore.getNext()}
                fontAwesomeIcon={"arrow-right"}
                buttonText={"Next"}
              />
              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => dataStore.addSwatch()}
                fontAwesomeIcon={"plus"}
                buttonText={"Add Swatch"}
              />
              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => dataStore.reverseSwatches()}
                fontAwesomeIcon={"exchange"}
                buttonText={"Reverse"}
              />
              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => dataStore.randomizeSwatches()}
                fontAwesomeIcon={"random"}
                buttonText={"Shuffle"}
              />
              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => dataStore.pushToFavorites()}
                fontAwesomeIcon={"heart"}
                buttonText={"Favorite"}
                overlayValue={dataStore.favoritesShortList.length}
              />
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default Header;
