import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import "./Footer.css";

@observer
class Footer extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };

  render() {
    const { dataStore } = this.props;
    return (
      <div className="footer">
        <h2 className="footer-subheading">Harmony:</h2>
        <h2 className="footer-subheading-value">{dataStore.selectedHarmony.harmony}</h2>
        <h2 className="footer-subheading">Modifier:</h2>
        <h2 className="footer-subheading-value">{dataStore.selectedPaletteModifier.modifier}</h2>
        <h2 className="footer-subheading">Favorites:</h2>
        <h2 className="footer-subheading-value">{dataStore.favorites.length}</h2>
      </div>
    );
  }
}

export default Footer;
