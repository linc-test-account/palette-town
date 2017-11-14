import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import FontAwesome from "react-fontawesome";
import TriangleDown from "../Elements/TriangleDown";

import "./Palette.css";

const SortableItem = SortableElement(
  ({
    dataStore,
    hue,
    saturation,
    lightness,
    hex,
    contrastYIQ,
    selected,
    colorName,
    uniqueIndex
  }) => {
    const buttonTextColor = {
      color: `hsla(0, 0%, ${contrastYIQ}%, .5)`
    };
    const style = {
      background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      boxShadow: `inset 0 0 0 2px ${selected === true
        ? `hsla(0, 0%, ${contrastYIQ}%, .5)`
        : `hsl(${hue}, ${saturation}%, ${lightness}%)`}`,
      color: `hsla(0, 0%, ${contrastYIQ}%, .4)`
    };


    return (
      <div className="palette-swatch" style={style}>
        <TriangleDown show={selected} />
        <p className="palette-swatch-hex noselect">{hex}</p>
        <p className="palette-swatch-name noselect">{colorName}</p>

        <div className="palette-swatch-buttons-container">
          <button
            style={buttonTextColor}
            className="palette-swatch-button"
            onClick={() => dataStore.selectSwatch(uniqueIndex)}
          >
            <FontAwesome name="sliders" size="2x" />
          </button>

          <button
            style={buttonTextColor}
            className="palette-swatch-button"
            onClick={() => dataStore.deleteSwatch(uniqueIndex)}
          >
            <FontAwesome name="trash" size="2x" />
          </button>

          <button style={buttonTextColor} className="palette-swatch-button">
            <FontAwesome name="info" size="2x" />
          </button>
        </div>
      </div>
    );
  }
);

const SortableList = SortableContainer(
  observer(({ dataStore, items }) => {
    const sortableSwatches = items.map(
      (
        { hue, saturation, lightness, hex, contrastYIQ, selected, colorName },
        index
      ) => (
        <SortableItem
          dataStore={dataStore}
          hue={hue}
          saturation={saturation}
          lightness={lightness}
          hex={hex}
          contrastYIQ={contrastYIQ}
          selected={selected}
          colorName={colorName}
          key={`item-${index}`}
          index={index}
          uniqueIndex={index}
        />
      )
    );
    return <div className="palette-swatch-container">{sortableSwatches}</div>;
  })
);

@observer
class palette extends Component {
  static propTypes = {
    minWidthReached: PropTypes.bool,
    dataStore: PropTypes.object,
    currentPalatte: PropTypes.object
  };

  render() {
    const { minWidthReached, dataStore, currentPalatte } = this.props;
    return (
      <SortableList
        axis={minWidthReached === true ? "y" : "x"}
        lockAxis={minWidthReached === true ? "y" : "x"}
        dataStore={dataStore}
        items={currentPalatte}
        onSortEnd={dataStore.onSortEnd}
        pressDelay={150}
      />
    );
  }
}

export default palette;
