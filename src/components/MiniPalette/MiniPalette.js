import React, { Component } from "react";
import PropTypes from "prop-types";
import convert from "color-convert";
import "./MiniPalette.css";

const MiniSwatch = ({ swatchWidth, swatchHeight, swatchHover, hue, saturation, lightness }) => {
  const style = {
    background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    width: swatchWidth + "px",
    height: swatchHeight + "px"
  };

  return swatchHover === true ? (
    <div className="mini-swatch-alt" style={style} title={`#${convert.hsl.hex(hue, saturation, lightness)}`}/>
  ) : (
    <div className="mini-swatch" style={style} />
  );
};

MiniSwatch.propTypes = {
  swatchWidth: PropTypes.number,
  swatchHeight: PropTypes.number,
  swatchHover: PropTypes.bool,
  hue: PropTypes.number,
  saturation: PropTypes.number,
  lightness: PropTypes.number
};

class MiniPalette extends Component {
  static propTypes = {
    swatchWidth: PropTypes.number,
    swatchHeight: PropTypes.number,
    harmony: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    swatchHover: PropTypes.bool
  };
  render() {
    const { swatchWidth, swatchHeight, harmony, swatchHover } = this.props;
    const miniPalette = harmony.map(({ hue, saturation, lightness }, index) => (
      <MiniSwatch
        swatchWidth={swatchWidth}
        swatchHeight={swatchHeight}
        swatchHover={swatchHover}
        key={index}
        hue={hue}
        saturation={saturation}
        lightness={lightness}
      />
    ));
    return <div className="mini-palette-container">{miniPalette}</div>;
  }
}

export default MiniPalette;
