import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";

import { SortableHandle } from "react-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <p className="palette-swatch-button noselect">
    <FontAwesome name="arrows-h" size="2x" />
  </p>
));

@observer
class Swatch extends Component {
  static propTypes = {
    dataStore: PropTypes.object,
    contrastYIQ: PropTypes.number,
    uniqueIndex: PropTypes.number,
    hex: PropTypes.string,
    colorName: PropTypes.string
  };
  render() {
    const { dataStore, contrastYIQ, uniqueIndex, hex, colorName } = this.props;
    const buttonTextColor = {
      color: `hsla(0, 0%, ${contrastYIQ}%, .5)`
    };
    return (
      <div className="default-palette-content-container">
        <div className="swatch-info-container">
          <p className="palette-swatch-hex noselect">#{hex}</p>
          <p className="palette-swatch-name noselect">{colorName}</p>
        </div>
        <div className="swatch-buttons-container">
          <button
            style={buttonTextColor}
            className="palette-swatch-button"
            onClick={() => dataStore.selectSwatch(uniqueIndex)}
          >
            <FontAwesome name="sliders" size="2x" />
          </button>
          <DragHandle />
          <button
            style={buttonTextColor}
            className="palette-swatch-button"
            onClick={() => dataStore.deleteSwatch(uniqueIndex)}
          >
            <FontAwesome name="trash" size="2x" />
          </button>
        </div>
      </div>
    );
  }
}

export default Swatch;
