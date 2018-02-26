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
    const heartType = dataStore.palette.favorited === true ? "favorite" : "favorite_border"
    return (
      <div className={styles.container}>
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => toggleSideNav(true)}
          iconName={"menu"}
        />
        <h1 className={styles.defaultHeading}>Palette Town</h1>
        <h1 className={styles.mobileHeading}>PT</h1>
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.generateNewPalatte()}
          iconName={"palette"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.addSwatch()}
          iconName={"add"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.reversePalette()}
          iconName={"compare_arrows"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.palette.randomizePalette()}
          iconName={"shuffle"}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.pushToFavorites()}
          iconName={heartType}
          isActive={dataStore.palette.favorited}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={modalHandleClick}
          iconName={"file_download"}
        />
      </div>
    );
  }
}

export default Header;
