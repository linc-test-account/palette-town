import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import FlipMove from "react-flip-move";
import { SortableHandle } from "react-sortable-hoc";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./Swatch.css";

const DragHandle = SortableHandle(({ buttonTextColor, minWidthReached }) => {
  const dragIcon = minWidthReached === true ? "arrows-v" : "arrows-h";
  return (
    <div style={buttonTextColor} className="palette-swatch-button">
      <FontAwesome name={dragIcon} size="2x" />
    </div>
  );
});

@observer
class Swatch extends Component {
  static propTypes = {
    dataStore: PropTypes.object,
    hue: PropTypes.number,
    saturation: PropTypes.number,
    lightness: PropTypes.number,
    hex: PropTypes.string,
    contrastYIQ: PropTypes.number,
    selected: PropTypes.bool,
    colorName: PropTypes.string,
    uniqueIndex: PropTypes.number,
    sorting: PropTypes.bool,
    minWidthReached: PropTypes.bool
  };
  render() {
    const {
      dataStore,
      hue,
      saturation,
      lightness,
      hex,
      contrastYIQ,
      selected,
      colorName,
      uniqueIndex,
      sorting,
      minWidthReached
    } = this.props;
    const buttonTextColor = {
      color: `hsla(0, 0%, ${contrastYIQ}%, .5)`
    };

    const flexGrowAmmount = minWidthReached === true ? 4 : 2;
    const style = {
      background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      color: `hsla(0, 0%, ${contrastYIQ}%, .4)`,
      flexGrow: selected === false ? 1 : flexGrowAmmount,
      transition: sorting === false ? ".3s ease flex" : ""
    };
    return (
      <FlipMove
        style={style}
        className="palette-swatch"
        leaveAnimation={"elevator"}
        enterAnimation={"elevator"}
        appearAnimation={"fade"}
        duration={300}
        maintainContainerHeight={true}
      >
        {minWidthReached === true && selected === true ? (
          <span key={`swatch-${0}`} />
        ) : (
          <div key={`swatch-${1}`} className="swatch-info-container">
            <p className="palette-swatch-hex noselect">#{hex}</p>
            <p className="palette-swatch-name noselect">{colorName}</p>
          </div>
        )}
        {selected === true ? (
          <ColorPicker
            key={`swatch-${2}`}
            colorSpace="HSL"
            dataStore={dataStore}
          />
        ) : (
          <span key={`swatch-${3}`} />
        )}

        {selected === true ? (
          <span key={`swatch-${4}`} />
        ) : (
          <div className="swatch-buttons-container" key={`swatch-${5}`}>
            <DragHandle
              buttonTextColor={buttonTextColor}
              minWidthReached={minWidthReached}
            />
            <div
              style={buttonTextColor}
              className="palette-swatch-button"
              onClick={() => dataStore.selectSwatch(uniqueIndex)}
            >
              <FontAwesome name="sliders" size="2x" />
            </div>
            <div
              style={buttonTextColor}
              className="palette-swatch-button"
              onClick={() => dataStore.deleteSwatch(uniqueIndex)}
            >
              <FontAwesome name="trash" size="2x" />
            </div>
          </div>
        )}
      </FlipMove>
    );
  }
}

export default Swatch;
