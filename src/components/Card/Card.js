import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FlipMove from 'react-flip-move';
import CardHeader from './CardHeader/CardHeader.js';
import Swatch from './Swatch/Swatch.js';
import ColorPicker from '../ColorPicker/ColorPicker.js';
import './Card.css';

function generatePalette(dataStore, colors) {
  const test = colors.map(
    ({ hue, saturation, lightness, count, hex, selected, colorName }, index) =>
      <Swatch
        key={count}
        dataStore={dataStore}
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        count={count}
        hex={hex}
        selected={selected}
        colorName={colorName}
        index={index}
      />
  );
  return test;
}

@observer
class Card extends Component {
  static propTypes = {
    dataStore: PropTypes.object,
    colors: PropTypes.object
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  render() {
    const { dataStore, colors } = this.props;
    return (
      <div className="card-container">
      <div className="card">
        <FlipMove
          className="card-flipmove"
          duration={400}
          staggerDelayBy={20}
          staggerDurationBy={50}
          enterAnimation={'accordionVertical'}
          leaveAnimation={'accordionVertical'}
          maintainContainerHeight={true}>
          <CardHeader dataStore={dataStore} />
          {dataStore.colorPickerVisible === true
            ? <div key={0}>
                <ColorPicker dataStore={dataStore} />
              </div>
            : <span key={1} />}
          <div key={2}>
            <FlipMove
              className="palette"
              duration={400}
              staggerDelayBy={20}
              staggerDurationBy={50}
              enterAnimation={true}
              leaveAnimation={true}
              maintainContainerHeight={true}>
              {generatePalette(dataStore, colors)}
            </FlipMove>
          </div>
        </FlipMove>
      </div>
      </div>
    );
  }
}

export default Card;
