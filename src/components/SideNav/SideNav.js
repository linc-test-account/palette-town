import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import MiniPalette from "../MiniPalette/MiniPalette";
import FontAwesome from "react-fontawesome";
import HeaderButton from "../HeaderButton/HeaderButton";
import "./SideNav.css";

function getHarmonies(harmonies, dataStore) {
  const harmonyList = harmonies.map(
    ({ harmony }, index) =>
      harmony === dataStore.selectedHarmony.harmony ? (
        <a
          className="drop-down-list-option list-option-selected"
          key={`harmony-${index}`}
        >
          {harmony}
          <MiniPalette
            swatchWidth={20}
            swatchHeight={15}
            harmony={dataStore.miniPalettes[index][harmony]}
          />
        </a>
      ) : (
        <a
          className="drop-down-list-option"
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
      )
  );
  return harmonyList;
}

function getPaletteModifiers(modifiers, dataStore) {
  const harmonyList = modifiers.map(
    ({ modifier }, index) =>
      modifier === dataStore.selectedPaletteModifier.modifier ? (
        <a
          className="drop-down-list-option list-option-selected"
          key={`modifier-${index}`}
        >
          {modifier}
        </a>
      ) : (
        <a
          className="drop-down-list-option"
          key={`modifier-${index}`}
          onClick={() => {
            dataStore.changeModifier(index);
          }}
        >
          {modifier}
        </a>
      )
  );
  return harmonyList;
}

function getFavorites(favorites, dataStore) {
  const items = [];
  for (let i = 0; i < favorites.length; i++) {
    items.push(
      <div key={`favorite-item-${i}`} className="favorite-list-item-container">
        <a className="drop-down-list-option">
          <MiniPalette
            swatchWidth={20}
            swatchHeight={15}
            harmony={favorites[i]}
          />
        </a>
        <button
          onClick={() => dataStore.deleteFromFavorites(i)}
          className="favorite-list-item-button"
        >
          <FontAwesome
            className="favorite-list-item-icon"
            name={"trash"}
            size="2x"
          />
        </button>
        <button
          onClick={() => dataStore.goToPalette(i)}
          className="favorite-list-item-button"
        >
          <FontAwesome
            className="favorite-list-item-icon"
            name={"pencil"}
            size="2x"
          />
        </button>
      </div>
    );
  }
  return items;
}

@observer
class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHarmonies: true,
      showModifiers: true,
      showFavorites: true
    };
  }

  static propTypes = {
    dataStore: PropTypes.object,
    showSideNav: PropTypes.bool,
    toggleSideNav: PropTypes.func
  };

  toggleHarmonies = () => {
    const { showHarmonies } = this.state;
    if (showHarmonies === true) {
      this.setState({
        showHarmonies: false
      });
    } else {
      this.setState({
        showHarmonies: true
      });
    }
  };

  toggleModifiers = () => {
    const { showModifiers } = this.state;
    if (showModifiers === true) {
      this.setState({
        showModifiers: false
      });
    } else {
      this.setState({
        showModifiers: true
      });
    }
  };

  toggleFavorites = () => {
    const { showFavorites } = this.state;
    if (showFavorites === true) {
      this.setState({
        showFavorites: false
      });
    } else {
      this.setState({
        showFavorites: true
      });
    }
  };

  render() {
    const { dataStore, toggleSideNav, showSideNav } = this.props;
    const { showHarmonies, showModifiers, showFavorites } = this.state;
    const style = {
      transform: showSideNav === false ? "translateX(-300px)" : "translateX(0)"
    };

    const submenuStyleDefault = {
      maxHeight: "0"
    };
    const submenuOpen = {
      maxHeight: "1000px"
    };
    return (
      <div style={style} id="mySidenav" className="sidenav">
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

        <h2
          key={`sidenave-heading-${0}`}
          className="sidenav-category"
          onClick={this.toggleHarmonies}
        >
          Harmonies
          <FontAwesome
            className="sidenav-category-caret"
            name={showHarmonies === true ? "caret-up" : "caret-down"}
            size="2x"
          />
        </h2>
        <div
          className="sidenav-category-container"
          style={showHarmonies === true ? submenuOpen : submenuStyleDefault}
        >
          {getHarmonies(dataStore.colorHarmonies, dataStore)}
        </div>

        <h2
          key={`sidenave-heading-${1}`}
          className="sidenav-category"
          onClick={this.toggleModifiers}
        >
          Modifiers
          <FontAwesome
            className="sidenav-category-caret"
            name={showModifiers === true ? "caret-up" : "caret-down"}
            size="2x"
          />
        </h2>
        <div
          className="sidenav-category-container"
          style={showModifiers === true ? submenuOpen : submenuStyleDefault}
        >
          {getPaletteModifiers(dataStore.paletteModifiers, dataStore)}
        </div>
        <h2
          key={`sidenave-heading-${2}`}
          className="sidenav-category"
          onClick={this.toggleFavorites}
        >
          Favorites
          <FontAwesome
            className="sidenav-category-caret"
            name={showFavorites === true ? "caret-up" : "caret-down"}
            size="2x"
          />
        </h2>
        <div
          className="sidenav-category-container"
          style={showFavorites === true ? submenuOpen : submenuStyleDefault}
        >
          {dataStore.favorites.length > 0
            ? getFavorites(dataStore.favoritesShortList, dataStore)
            : <a className="drop-down-list-option">No Favorites</a>}
        </div>
      </div>
    );
  }
}

export default SideNav;
