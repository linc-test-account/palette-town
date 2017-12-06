import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import MiniPalette from "../MiniPalette/MiniPalette";
import FontAwesome from "react-fontawesome";
import Modal from "react-modal";
import HeaderButton from "../HeaderButton/HeaderButton";
import OutsideAlerter from "../ClickOutside/ClickOutside";
import PaletteDetails from "../ModalContent/PaletteDetails";
import SideNavCategory from "./SideNavCategory";
import "./SideNav.css";

function getHarmonies(harmonies, dataStore) {
  const harmonyList = harmonies.map(({ harmony }, index) => (
    <a
      className={`drop-down-list-option ${
        harmony === dataStore.selectedHarmony.harmony
          ? "list-option-selected"
          : ""
      }`}
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
      className={`drop-down-list-option ${
        modifier === dataStore.selectedModifier.modifier
          ? "list-option-selected"
          : ""
      }`}
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
    <div key={`favorite-item-${index}`} className="favorite-item-container">
      <div
        className="favorite-item"
        onClick={() => dataStore.goToPalette(index)}
      >
        <p className="favorite-name">{name}</p>
        <MiniPalette
          swatchWidth={20}
          swatchHeight={15}
          harmony={favoritesShortList[index]}
        />
      </div>
      <button
        onClick={() => handleClick(index)}
        className="favorite-list-item-button"
      >
        <FontAwesome
          className="favorite-list-item-icon"
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
      <div style={style} id="mySidenav" className="sidenav">
        <OutsideAlerter showSideNav={showSideNav} toggleSideNav={toggleSideNav}>
          <div>
            <div className="sidenav-header">
              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => toggleSideNav(false)}
                fontAwesomeIcon={"bars"}
                buttonText={"Menu"}
              />
              <h1 className="default-brand-name">Palette Town</h1>
              <h1 className="mobile-brand-name">PT</h1>
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
            <div className="sidenav-spacer" />
            <Modal
              isOpen={isShowingModal}
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
              <PaletteDetails
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
