import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import FontAwesome from "react-fontawesome";
import ClipboardButton from "react-clipboard.js";
import { SortableHandle } from "react-sortable-hoc";

const DragHandle = SortableHandle(({ style }) => (
  <FontAwesome style={style} name="arrows" size="2x" />
));

@observer
class AppButton extends Component {
  static propTypes = {
    dataStore: PropTypes.object,
    hex: PropTypes.string,
    index: PropTypes.number,
    textStyle: PropTypes.object,
  };
  render() {
    const { dataStore, hex, index, textStyle } = this.props;

    return (
      <div className="swatch-dialogs">
        <div className="swatch-functions">
          <button
            style={textStyle}
            className="swatch-buttons"
            onClick={() => dataStore.selectSwatch(index)}
          >
            <FontAwesome name="sliders" size="2x" />
          </button>
          <button style={textStyle} className="swatch-buttons">
            <DragHandle style={textStyle} />
          </button>
          <button
            style={textStyle}
            className="swatch-buttons"
            onClick={() => dataStore.deleteSwatch(index)}
          >
            <FontAwesome name="trash-o" size="2x" />
          </button>

          <ClipboardButton data-clipboard-text={hex} className="swatch-buttons">
            <FontAwesome style={textStyle} name="clipboard" size="2x" />
          </ClipboardButton>
        </div>
      </div>
    );
  }
}

export default AppButton;
