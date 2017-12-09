import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import MiniPalette from "../MiniPalette/MiniPalette";
import FontAwesome from "react-fontawesome";
import Modal from "react-modal";
import HeaderButton from "../HeaderButton/HeaderButton";
import OutsideAlerter from "../ClickOutside/ClickOutside";
import EditDetails from "../ModalContent/EditDetails";
import SideNavCategory from "./SideNavCategory";
import styles from "./SideNav.css";
import classNames from "classnames";

function getHarmonies(harmonies, dataStore) {
  const harmonyList = harmonies.map(({ harmony }, index) => (
    <a
      className={classNames({
        [styles.listOptionSelected]:
          harmony === dataStore.selectedHarmony.harmony ? true : false
      })}
      key={`harmony-${index}`}
      onClick={() => {
        dataStore.changeHarmony(index);
      }}
    >
      {harmony}
      <MiniPalette
        swatchWidth={20}
        swatchHeight={15}
        harmony={dataStore.miniPalettes[index][harmony]}
      />
    </a>
  ));
  return harmonyList;
}

function getmodifiers(modifiers, dataStore) {
  const harmonyList = modifiers.map(({ modifier }, index) => (
    <a
      className={classNames({
        [styles.listOptionSelected]:
          modifier === dataStore.selectedModifier.modifier ? true : false
      })}
      key={`modifier-${index}`}
      onClick={() => {
        dataStore.changeModifier(index);
      }}
    >
      {modifier}
    </a>
  ));
  return harmonyList;
}

function getFavorites(favorites, favoritesShortList, dataStore, handleClick) {
  return favorites.map(({ name }, index) => (
    <div key={`favoriteItem-${index}`} className={styles.favoriteListContainer}>
      <div
        className={styles.favoriteItem}
        onClick={() => dataStore.goToPalette(index)}
      >
        <p>{name}</p>
        <MiniPalette
          swatchWidth={20}
          swatchHeight={15}
          harmony={favoritesShortList[index]}
        />
      </div>
      <button
        onClick={() => handleClick(index)}
        className={styles.favoriteListItemButton}
      >
        <FontAwesome
          className={styles.favoriteListItemIcon}
          name={"cog"}
          size="2x"
        />
      </button>
    </div>
  ));
}

@observer
class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      targetFavorite: undefined
    };
  }

  static propTypes = {
    dataStore: PropTypes.object,
    showSideNav: PropTypes.bool,
    toggleSideNav: PropTypes.func,
    toggleSideNavVisibility: PropTypes.func
  };

  handleClick = val => {
    const { toggleSideNavVisibility } = this.props;
    toggleSideNavVisibility();
    this.setState({
      isShowingModal: true,
      targetFavorite: val
    });
  };

  handleClose = () => {
    const { toggleSideNavVisibility } = this.props;
    this.setState({ isShowingModal: false });
    toggleSideNavVisibility();
  };

  render() {
    const { dataStore, toggleSideNav, showSideNav } = this.props;
    const { isShowingModal } = this.state;
    const style = {
      transform: showSideNav === false ? "translateX(-300px)" : "translateX(0)"
    };

    return (
      <div style={style} id="mySidenav" className={styles.sidenav}>
        <OutsideAlerter showSideNav={showSideNav} toggleSideNav={toggleSideNav}>
          <div>
            <div className={styles.sidenavHeader}>
              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => toggleSideNav(false)}
                fontAwesomeIcon={"bars"}
                buttonText={"Menu"}
              />
              <h1 className={styles.defaultBrandName}>Palette Town</h1>
              <h1 className={styles.mobileBrandName}>PT</h1>
            </div>

            <SideNavCategory
              categoryName="Harmonies"
              categoryItems={getHarmonies(dataStore.harmonies, dataStore)}
            />

            <SideNavCategory
              categoryName="Modifiers"
              categoryItems={getmodifiers(dataStore.modifiers, dataStore)}
            />

            <SideNavCategory
              categoryName="Favorites"
              categoryItems={getFavorites(
                dataStore.favorites,
                dataStore.favoritesShortList,
                dataStore,
                this.handleClick
              )}
            />
            <div className={styles.sidenavSpacer} />
            <Modal
              isOpen={isShowingModal}
              onRequestClose={this.handleClose}
              contentLabel="Color Info Modal"
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
              <EditDetails
                targetFavorite={this.state.targetFavorite}
                dataStore={dataStore}
                handleClose={this.handleClose}
              />
            </Modal>
          </div>
        </OutsideAlerter>
      </div>
    );
  }
}

export default SideNav;
