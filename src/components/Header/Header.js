import React, { Component } from "react";
import { observer } from "mobx-react";
import HeaderButton from "../HeaderButton/HeaderButton";
import PropTypes from "prop-types";
import styles from "./Header.css";

@observer
class Header extends Component {
  static propTypes = {
    toggleSideNav: PropTypes.func,
    modalHandleClick: PropTypes.func,
    dataStore: PropTypes.object
  };

  render() {
    const { toggleSideNav, modalHandleClick, dataStore } = this.props;
    const heartType =
      dataStore.palette.favorited === true ? "heart" : "heart-o";
    return (
      <div className={styles.container}>
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => toggleSideNav(true)}
          fontAwesomeIcon={"bars"}
        />
        <h1 className={styles.defaultHeading}>Palette Town</h1>
        <h1 className={styles.mobileHeading}>PT</h1>
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.generateNewPalatte()}
          fontAwesomeIcon={"arrow-right"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.addSwatch()}
          fontAwesomeIcon={"plus"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.reversePalette()}
          fontAwesomeIcon={"exchange"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.randomizePalette()}
          fontAwesomeIcon={"random"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.pushToFavorites()}
          fontAwesomeIcon={heartType}
          isActive={dataStore.palette.favorited}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={modalHandleClick}
          fontAwesomeIcon={"download"}
        />
      </div>
    );
  }
}

export default Header;
