import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
// import FontAwesome from "react-fontawesome";
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
        <div className="footer-left">
          <h2 className="footer-subheading">Harmony:</h2>
          <h2 className="footer-subheading-value">
            {dataStore.selectedHarmony.harmony}
          </h2>
          <h2 className="footer-subheading">Modifier:</h2>
          <h2 className="footer-subheading-value">
            {dataStore.selectedModifier.modifier}
          </h2>
          <h2 className="footer-subheading">Favorites:</h2>
          <h2 className="footer-subheading-value">
            {dataStore.favorites.length}
          </h2>
        </div>
        <div className="footer-right">
          <h2 className="footer-alpha">[alpha]</h2>
          Copyright &copy; 2017{" "}
          <a className="footer-link" href="https://github.com/plexey">
            Thomas Trinca
          </a>
          {/* <FontAwesome className="footer-code-icon" name="code" size="2x" /> */}
        </div>
      </div>
    );
  }
}

export default Footer;
