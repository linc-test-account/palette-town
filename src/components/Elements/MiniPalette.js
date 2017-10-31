import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MiniPalette.css";

const MiniSwatch = ({ hue, saturation, lightness }) => {
  const style = {
    background: `hsl(${hue}, ${saturation}%, ${lightness}%)`
  };
  return <div className="mini-swatch" style={style} />;
};

MiniSwatch.propTypes = {
  hue: PropTypes.number,
  saturation: PropTypes.number,
  lightness: PropTypes.number
};

class MiniPalette extends Component {
  static propTypes = {
    index: PropTypes.number,
    harmony: PropTypes.string,
    dataStore: PropTypes.object
  }
  render() {
    const { index, harmony, dataStore } = this.props;
    const miniPalette = dataStore.miniPalettes[index][
      harmony
    ].map(({ hue, saturation, lightness }, index) => (
      <MiniSwatch
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
