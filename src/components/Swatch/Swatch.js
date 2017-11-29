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
      <FontAwesome className="swatch-button-icon" name={dragIcon} size="2x" />
    </div>
  );
});

@observer
class Swatch extends Component {
  static propTypes = {
    dataStore: PropTypes.object.isRequired,
    colorStore: PropTypes.object.isRequired,
    uniqueIndex: PropTypes.number,
    sorting: PropTypes.bool,
    minWidthReached: PropTypes.bool
  };
  render() {
    const {
      dataStore,
      colorStore,
      uniqueIndex,
      sorting,
      minWidthReached
    } = this.props;
    const buttonTextColor = {
      color: `hsla(0, 0%, ${colorStore.contrastYIQ}%, .5)`
    };

    const flexGrowAmmount = minWidthReached === true ? 4 : 2;
    const style = {
      background: `hsl(${colorStore.hue}, ${colorStore.saturation}%, ${
        colorStore.lightness
      }%)`,
      color: `hsla(0, 0%, ${colorStore.contrastYIQ}%, .4)`,
      flexGrow: colorStore.selected === false ? 1 : flexGrowAmmount,
      transition: sorting === false ? ".3s ease flex" : ""
    };

    return (
      <FlipMove
        style={style}
        className="palette-swatch"
        appearAnimation={"fade"}
        leaveAnimation={"fade"}
        enterAnimation={"fade"}
        duration={200}
      >
        {minWidthReached === true && colorStore.selected === true ? (
          <span key={`swatch-${0}`} />
        ) : (
          <div key={`swatch-${1}`} className="swatch-info-container">
            <p className="palette-swatch-hex noselect">#{colorStore.hex}</p>
            <p className="palette-swatch-name noselect">
              {colorStore.colorName}
            </p>
          </div>
        )}

        {colorStore.selected === true ? (
          <ColorPicker
            key={`swatch-${2}`}
            colorSpace="HSL"
            colorStore={colorStore}
            dataStore={dataStore}
          />
        ) : (
          <span key={`swatch-${3}`} />
        )}

        {colorStore.selected === true ? (
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
              onClick={() => dataStore.palette.selectSwatch(uniqueIndex)}
            >
              <FontAwesome
                className="swatch-button-icon"
                name="sliders"
                size="2x"
              />
            </div>
            <div
              style={buttonTextColor}
              className="palette-swatch-button"
              onClick={() => dataStore.palette.deleteSwatch(uniqueIndex)}
            >
              <FontAwesome
                className="swatch-button-icon"
                name="trash"
                size="2x"
              />
            </div>
          </div>
        )}
      </FlipMove>
    );
  }
}

export default Swatch;
