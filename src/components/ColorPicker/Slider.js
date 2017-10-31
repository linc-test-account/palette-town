import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import PropTypes from 'prop-types';
import './Slider.css';

@observer
class Slider extends Component {
  static propTypes = {
    action: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    hslArray: PropTypes.array,
    value: PropTypes.number
  }
  render() {
    const { action, min, max, hslArray, value } = this.props;
    const backgroundGradient = {
      background: `linear-gradient(to right, hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%), yellow)`
    }
    return (
      <div style={backgroundGradient}>
        <ReactSlider
          style
          handleClassName="test-handle"
          barClassName="test-bar"
          min={min}
          max={max}
          defaultValue={value}
          withBars={true}
          pearling={true}
          value={value}
          onChange={action}>
          <div className="my-handle">
            {value}
          </div>
        </ReactSlider>
      </div>
    );
  }
}

export default Slider;
