import React, { Component } from "react";
import PropTypes from "prop-types";
import hslToHex from "../../stores/ColorLogic/hslToHex";
import "./MiniPalette.css";

const MiniSwatch = ({ swatchHover, hue, saturation, lightness }) => {
  const style = {
    background: `hsl(${hue}, ${saturation}%, ${lightness}%)`
  };

  return swatchHover === true ? (
    <div className="mini-swatch-alt" style={style} title={hslToHex(hue, saturation, lightness)}/>
  ) : (
    <div className="mini-swatch" style={style} />
  );
};

MiniSwatch.propTypes = {
  swatchHover: PropTypes.bool,
  hue: PropTypes.number,
  saturation: PropTypes.number,
  lightness: PropTypes.number
};

class MiniPalette extends Component {
  static propTypes = {
    harmony: PropTypes.array,
    swatchHover: PropTypes.bool
  };
  render() {
    const { harmony, swatchHover } = this.props;
    const miniPalette = harmony.map(({ hue, saturation, lightness }, index) => (
      <MiniSwatch
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
