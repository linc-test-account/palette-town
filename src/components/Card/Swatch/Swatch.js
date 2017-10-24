import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FontAwesome from 'react-fontawesome';
import './Swatch.css';
import ClipboardButton from 'react-clipboard.js';

function getContrastYIQ(hexcolor, opacity, reverse) {
  try {
    const myString = hexcolor.substring(1);
    const r = parseInt(myString.substr(0, 2), 16);
    const g = parseInt(myString.substr(2, 2), 16);
    const b = parseInt(myString.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    if (reverse === true) {
      return yiq >= 128 ? `hsla(0, 0%, 100%, ${opacity})` : `hsla(0, 0%, 0%,  ${opacity})`;
    }
    if (reverse === false) {
      return yiq >= 128 ? `hsla(0, 0%, 0%, ${opacity})` : `hsla(0, 0%, 100%,  ${opacity})`;
    }
  } catch (e) {
    console.log(e);
  }
}

@observer
class Swatch extends Component {
  static propTypes = {
    dataStore: PropTypes.object,
    hue: PropTypes.number,
    saturation: PropTypes.number,
    lightness: PropTypes.number,
    count: PropTypes.string,
    hex: PropTypes.string,
    selected: PropTypes.bool,
    colorName: PropTypes.string,
    index: PropTypes.number
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  render() {
    const {
      dataStore,
      hue,
      saturation,
      lightness,
      count,
      hex,
      selected,
      colorName,
      index
    } = this.props;
    const swatchColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const swatchStyle = {
      background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      borderWidth: `2px`,
      borderStyle: `${selected === true ? 'solid' : 'solid'}`,
      borderColor: `${selected === true ? getContrastYIQ(hex, 0.5, false) : swatchColor}`,
      width: dataStore.palatteFlexDirection === 'column' ? '100%' : 'auto',
      height: dataStore.palatteFlexDirection === 'column' ? '60px' : '180px'
    };
    const text = {
      color: getContrastYIQ(hex, 0.4, false)
    };
    const swatchFunctionsStyle = {
      flexDirection: dataStore.palatteFlexDirection === 'column' ? 'row' : 'column'
    };
    const swatchDefaultStyle = {
      flexDirection: dataStore.palatteFlexDirection === 'column' ? 'row' : 'column'
    };
    const swatchDialogStyle = {
      color: getContrastYIQ(hex, 0.71, false)
    };
    return (
      <div className="swatch" key={count} style={swatchStyle}>
        <div className="swatch-default" style={swatchDefaultStyle}>
          <p style={text} className="swatch-default-hex">
            {hex}
          </p>
          <p style={text} className="swatch-default-name">
            {colorName}
          </p>
        </div>

        <div className="swatch-dialogs">
          <button
            style={swatchDialogStyle}
            className="swatch-arrows"
            onClick={() => dataStore.swapSwatches(index, 'left')}>
            <FontAwesome name="arrow-left" size="2x" />
          </button>
          <div className="swatch-functions" style={swatchFunctionsStyle}>
            <button
              style={swatchDialogStyle}
              className="swatch-buttons"
              onClick={() => dataStore.deleteSwatch(index)}>
              <FontAwesome name="trash-o" size="2x" />
            </button>
            <button
              style={swatchDialogStyle}
              className="swatch-buttons"
              onClick={() => dataStore.selectSwatch(index)}>
              <FontAwesome name="sliders" size="2x" />
            </button>
            <ClipboardButton data-clipboard-text={hex} className="swatch-buttons">
              <FontAwesome style={swatchDialogStyle} name="clipboard" size="2x" />
            </ClipboardButton>
            <button style={swatchDialogStyle} className="swatch-buttons">
              <FontAwesome name="info" size="2x" />
            </button>
          </div>
          <button
            style={swatchDialogStyle}
            className="swatch-arrows"
            onClick={() => dataStore.swapSwatches(index, 'right')}>
            <FontAwesome name="arrow-right" size="2x" />
          </button>
        </div>
      </div>
    );
  }
}

export default Swatch;
