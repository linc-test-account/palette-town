import React, { Component } from "react";
import DropDownList from "../Elements/DropDownList.js";
import MiniPalette from "../Elements/MiniPalette";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Draggable from "react-draggable";
import FontAwesome from "react-fontawesome";
import "./SubHeader.css";

function getHarmonies(harmonies, dataStore, toggleHarmoniesList) {
  const harmonyList = harmonies.map(
    ({ harmony }, index) =>
      harmony === dataStore.selectedHarmony.harmony ? (
        <a
          className="drop-down-list-option list-option-selected"
          key={index}
          value={index}
          onClick={() => toggleHarmoniesList()}
        >
          {harmony}
          <FontAwesome className="option-checkmark" name={"check"} size="2x" />
          <MiniPalette harmony={dataStore.miniPalettes[index][harmony]} />
        </a>
      ) : (
        <a
          className="drop-down-list-option"
          key={index}
          value={index}
          onClick={() => {
            dataStore.changeHarmony(index);
            toggleHarmoniesList();
          }}
        >
          {harmony}
          <MiniPalette harmony={dataStore.miniPalettes[index][harmony]} />
        </a>
      )
  );
  return harmonyList;
}

function getPaletteModifiers(modifiers, dataStore, togglePaletteModifiersList) {
  const harmonyList = modifiers.map(
    ({ modifier }, index) =>
      modifier === dataStore.selectedPaletteModifier.modifier ? (
        <a
          className="drop-down-list-option list-option-selected"
          key={index}
          value={index}
          onClick={() => togglePaletteModifiersList()}
        >
          {modifier}
          <FontAwesome className="option-checkmark" name={"check"} size="2x" />
        </a>
      ) : (
        <a
          className="drop-down-list-option"
          key={index}
          value={index}
          onClick={() => {
            dataStore.changeModifier(index);
            togglePaletteModifiersList();
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
      <div className="favorite-list-item-container" key={i}>
        <a
          className="drop-down-list-option"
        >
          <MiniPalette swatchHover={true} harmony={favorites[i]} />
        </a>
        <button onClick={() => dataStore.deleteFromFavorites(i)} className="favorite-list-item-button">
          <FontAwesome name={"trash"} size="2x" />
        </button>
        <button onClick={() => dataStore.goToPalette(i)} className="favorite-list-item-button">
          <FontAwesome name={"pencil"} size="2x" />
        </button>
      </div>
    );
  }
  return items;
}

@observer
class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHarmonies: false,
      showModifiers: false,
      showFavorites: false,
      offSet: 0
    };
  }

  static propTypes = {
    dataStore: PropTypes.object
  };

  componentDidMount() {
    window.onclick = event => {
      if (!event.target.matches(".dropbtn")) {
        this.setState({
          showHarmonies: false,
          showModifiers: false,
          showFavorites: false
        });
      }
    };

    if (this.subheaderContainer && this.subheaderElement) {
      this.setOffsetWidth(
        this.subheaderContainer.offsetWidth,
        this.subheaderElement.offsetWidth
      );
    }

    window.addEventListener("resize", () =>
      this.setOffsetWidth(
        this.subheaderContainer.offsetWidth,
        this.subheaderElement.offsetWidth
      )
    );
  }

  setOffsetWidth = (subheaderContainer, subheaderElement) => {
    if (subheaderContainer > subheaderElement) {
      this.setState({
        offSet: 0
      });
    }

    if (subheaderContainer === subheaderElement) {
      this.setState({
        offSet: 0
      });
    }

    if (subheaderContainer < subheaderElement) {
      this.setState({
        offSet: subheaderElement - subheaderContainer
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

  toggleFavoritesList = () => {
    if (this.state.showFavorites === true) {
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
    const { dataStore } = this.props;
    const { offSet } = this.state;
    const harmonies = getHarmonies(
      dataStore.allHarmonies,
      dataStore,
      this.toggleHarmoniesList
    );
    const paletteModifiers = getPaletteModifiers(
      dataStore.paletteModifiers,
      dataStore,
      this.togglePaletteModifiersList
    );

    const favorites = getFavorites(dataStore.favoritesShortList, dataStore);
    return (
      <div
        ref={subheaderContainer =>
          (this.subheaderContainer = subheaderContainer)}
        className="subheader-outer"
      >
        <Draggable
          axis="x"
          handle=".suheader"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[1, 1]}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          bounds={{ top: 0, left: -offSet, right: 0, bottom: 0 }}
        >
          <div className="suheader">
            <div
              ref={subheaderElement =>
                (this.subheaderElement = subheaderElement)}
              className="subheader-inner"
            >
              <div className="suheader-right" />
              <h3 className="subheader-drop-down-list-label">Scheme</h3>

              <DropDownList
                toggleShowing={() => this.toggleHarmoniesList()}
                showing={this.state.showHarmonies}
                listItems={harmonies}
                selectedValue={dataStore.selectedHarmony.harmony}
              />

              <h3 className="subheader-drop-down-list-label">Modifier</h3>

              <DropDownList
                toggleShowing={() => this.togglePaletteModifiersList()}
                showing={this.state.showModifiers}
                listItems={paletteModifiers}
                selectedValue={dataStore.selectedPaletteModifier.modifier}
              />

              <h3 className="subheader-drop-down-list-label">Favorites</h3>

              <DropDownList
                toggleShowing={() => this.toggleFavoritesList()}
                showing={this.state.showFavorites}
                listItems={favorites}
                selectedValue={"Favorites"}
              />
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default SubHeader;
