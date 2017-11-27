import React, { Component } from "react";
import { observer } from "mobx-react";
import FontAwesome from "react-fontawesome";
import MiniPalette from "../MiniPalette/MiniPalette";
import ColorDialog from "../Elements/ColorDialog";
import PropTypes from "prop-types";

@observer
class ModalContent extends Component {
  static propTypes = {
    dataStore: PropTypes.object,
    handleClose: PropTypes.func
  };
  render() {
    const { dataStore, handleClose } = this.props;
    return (
      <div>
        <button className="modal-close-button" onClick={handleClose}>
        <FontAwesome
            // className="favorite-list-item-icon"
            name={"times"}
            size="2x"
          />
        </button>
        <div className="modal-palette-container">
          <MiniPalette
            swatchWidth={50}
            swatchHeight={20}
            swatchHover={true}
            harmony={dataStore.currentPalette.colors}
          />
        </div>
        <br />
        <div className="modal-box-container">
          <ColorDialog
            title="hsl"
            colors={dataStore.currentPalette.colors}
            colorSpace="hsl"
          />
          <ColorDialog
            title="rgb"
            colors={dataStore.currentPalette.colors}
            colorSpace="rgb"
          />
        </div>
        <div className="modal-box-container">
          <ColorDialog
            title="cmyk"
            colors={dataStore.currentPalette.colors}
            colorSpace="cmyk"
          />
          <ColorDialog
            title="hex"
            colors={dataStore.currentPalette.colors}
            colorSpace="hex"
          />
        </div>
        <div className="modal-box-container">
          <ColorDialog
            title="CSS vars"
            colors={dataStore.currentPalette.colors}
            colorSpace="hex"
            styleSheetType="css"
          />
          <ColorDialog
            title="LESS vars"
            colors={dataStore.currentPalette.colors}
            colorSpace="hex"
            styleSheetType="less"
          />
        </div>
      </div>
    );
  }
}

export default ModalContent;
