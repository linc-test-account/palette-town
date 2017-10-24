import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './ImageWithOverlay.css';
import PropTypes from 'prop-types';

@observer
class ImageWithOverlay extends Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    overlayText: PropTypes.string,
    director: PropTypes.string
  }
  render() {
    const { imageUrl, overlayText, director } = this.props;
    const imageBackground = {
      background: imageUrl ? `url(${imageUrl})` : `hsl(157, 55%, 37%)`,
      backgroundSize: `cover`,
      backgroundRepeat: `no-repeat`
    };
    const svgStyle = {
      fontFamily: 'var(--app-font)',
      fontSize: '30px',
      stroke: `hsl(0, 0%, 0%)`,
      fill: `hsla(0, 0%, 100%, 0)`
    };
    return (
      <div style={imageBackground} className="image-container">
        <svg className="production-name-overlay" xmlns="http://www.w3.org/2000/svg" width="100%" height="15%">
          <text x="20" y="40" style={svgStyle}>
            {`${director}'s ${overlayText}`}
          </text>
        </svg>
      </div>
    );
  }
}

export default ImageWithOverlay;
