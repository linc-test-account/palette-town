import React, { Component } from "react";
import DropDownList from "../Elements/DropDownList.js";
import MiniPalette from "../Elements/MiniPalette";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
// import { toJS } from "mobx";
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
          <MiniPalette index={index} harmony={harmony} dataStore={dataStore} />
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
          <MiniPalette index={index} harmony={harmony} dataStore={dataStore} />
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

@observer
class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHarmonies: false,
      showModifiers: false,
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
          showModifiers: false
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
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default SubHeader;
