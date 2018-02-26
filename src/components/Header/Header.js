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
    const heartType = dataStore.palette.favorited === true ? "fas fa-heart" : "far fa-heart"
    return (
      <div className={styles.container}>
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => toggleSideNav(true)}
          fontAwesomeIcon={"fas fa-bars"}
        />
        <h1 className={styles.defaultHeading}>Palette Town</h1>
        <h1 className={styles.mobileHeading}>PT</h1>
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.generateNewPalatte()}
          fontAwesomeIcon={"fas fa-arrow-right"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.addSwatch()}
          fontAwesomeIcon={"fas fa-plus"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.reversePalette()}
          fontAwesomeIcon={"fas fa-exchange-alt"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.randomizePalette()}
          fontAwesomeIcon={"fas fa-random"}
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
          fontAwesomeIcon={"fas fa-download"}
        />
      </div>
    );
  }
}

export default Header;
