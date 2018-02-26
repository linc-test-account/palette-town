import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import FontAwesome from "react-fontawesome";
import styles from "./Footer.css";

@observer
class Footer extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };

  render() {
    const { dataStore } = this.props;
    const date = new Date();
    const now = date.getFullYear();
    return (
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <h2 className={styles.footerSubheading}>Harmony:</h2>
          <h2 className={styles.footerSubheadingValue}>
            {dataStore.selectedHarmony.name}
          </h2>
          <h2 className={styles.footerSubheading}>Modifier:</h2>
          <h2 className={styles.footerSubheadingValue}>
            {dataStore.selectedModifier.name}
          </h2>
          <h2 className={styles.footerSubheading}>Favorites:</h2>
          <h2 className={styles.footerSubheadingValue}>
            {dataStore.favorites.length}
          </h2>
        </div>
        <div className={styles.footerRight}>
          <h2 className={styles.footerAlpha}>[alpha]</h2>
          Copyright &copy; {now}
          <a className={styles.footerLink} href="https://github.com/plexey">
            Tom Trinca
          </a>
          -
          <a className={styles.footerLink} href="https://github.com/plexey/palette-town">
            <FontAwesome name="fab fa-github" />
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
