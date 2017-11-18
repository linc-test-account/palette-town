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
      offSet: 0
    };
  }

  static propTypes = {
    minWidthReached: PropTypes.bool,
    modalHandleClick: PropTypes.func,
    dataStore: PropTypes.object
  };

  componentDidMount = () => {
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

  render() {
    const { minWidthReached, modalHandleClick, dataStore } = this.props;
    const { offSet } = this.state;
    const heartType =
      dataStore.currentPalette.favorited === true ? "heart" : "heart-o";
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
                fontAwesomeIcon={heartType}
                buttonText={"Favorite"}
                isActive={dataStore.currentPalette.favorited}
              />
              <HeaderButton
                dataStore={dataStore}
                btnFunction={modalHandleClick}
                fontAwesomeIcon={"download"}
                buttonText={"Favorite"}
              />
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default Header;
