import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import FontAwesome from "react-fontawesome";
import { getContrastYIQ } from "../../stores/ColorLogic";
import ClipboardButton from "react-clipboard.js";
import "./Palette.css";

const SortableItem = SortableElement(
  ({
    dataStore,
    hue,
    saturation,
    lightness,
    hex,
    selected,
    colorName,
    uniqueIndex
  }) => {
    const buttonTextColor = {
      color: getContrastYIQ(hex, 0.3, false)
    };
    const style = {
      background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      boxShadow: `inset 0 0 0 3px ${selected === true
        ? getContrastYIQ(hex, 0.4, false)
        : `hsl(${hue}, ${saturation}%, ${lightness}%)`}`,
      color: getContrastYIQ(hex, 0.3, false)
    };
    return (
      <div className="palette-swatch" style={style}>
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
          <ClipboardButton
            style={buttonTextColor}
            className="palette-swatch-button"
            data-clipboard-text={hex}
          >
            <FontAwesome name="clipboard" size="2x" />
          </ClipboardButton>
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
      ({ hue, saturation, lightness, hex, selected, colorName }, index) => (
        <SortableItem
          dataStore={dataStore}
          hue={hue}
          saturation={saturation}
          lightness={lightness}
          hex={hex}
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
    dataStore: PropTypes.object,
    colors: PropTypes.object
  };

  render() {
    const { dataStore, colors } = this.props;
    return (
      <SortableList
        axis={"x"}
        lockAxis={"x"}
        dataStore={dataStore}
        items={colors}
        onSortEnd={dataStore.onSortEnd}
        pressDelay={150}
      />
    );
  }
}

export default palette;
