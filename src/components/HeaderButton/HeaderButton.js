import React, { Component } from "react";
import { observer } from "mobx-react";
import FontAwesome from "react-fontawesome";
import styles from "./HeaderButton.css";
import PropTypes from "prop-types";

@observer
class HeaderButton extends Component {
  static propTypes = {
    btnFunction: PropTypes.func,
    fontAwesomeIcon: PropTypes.string,
    overlayValue: PropTypes.number,
    isActive: PropTypes.bool
  };
  render() {
    const { btnFunction, fontAwesomeIcon, overlayValue, isActive } = this.props;
    const style = {
      color: isActive ? "hsl(310, 100%, 50%)" : ""
    };
    return (
      <button className={styles.headerButton} onClick={btnFunction}>
        <FontAwesome
          style={style}
          className={styles["headerIcon"]}
          name={fontAwesomeIcon}
          size="2x"
        />
        {overlayValue > 0 ? (
          <p className={styles.indicatorOverlay}>{overlayValue}</p>
        ) : (
          ""
        )}
      </button>
    );
  }
}

export default HeaderButton;
