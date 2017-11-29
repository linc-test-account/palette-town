import React, { Component } from "react";
import { observer } from "mobx-react";
import HeaderButton from "../HeaderButton/HeaderButton";
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
    toggleSideNav: PropTypes.func,
    minWidthReached: PropTypes.bool,
    modalHandleClick: PropTypes.func,
    dataStore: PropTypes.object
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
    const { toggleSideNav, modalHandleClick, dataStore } = this.props;
    const heartType =
      dataStore.palette.favorited === true ? "heart" : "heart-o";
    return (
      <div className="header">
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => toggleSideNav(true)}
          fontAwesomeIcon={"bars"}
          buttonText={"Menu"}
        />
        <h1 className="default-brand-name">Palette Town</h1>
        <h1 className="mobile-brand-name">PT</h1>
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.getNext()}
          fontAwesomeIcon={"arrow-right"}
          buttonText={"Next"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.addSwatch()}
          fontAwesomeIcon={"plus"}
          buttonText={"Add Swatch"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.reversePalette()}
          fontAwesomeIcon={"exchange"}
          buttonText={"Reverse"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.randomizePalette()}
          fontAwesomeIcon={"random"}
          buttonText={"Shuffle"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.pushToFavorites()}
          fontAwesomeIcon={heartType}
          buttonText={"Favorite"}
          isActive={dataStore.palette.favorited}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={modalHandleClick}
          fontAwesomeIcon={"download"}
          buttonText={"Favorite"}
        />
      </div>
    );
  }
}

export default Header;
