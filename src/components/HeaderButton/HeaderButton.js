import React, { Component } from "react";
import { observer } from "mobx-react";
import styles from "./HeaderButton.css";
import PropTypes from "prop-types";
import classNames from "classnames";

@observer
class HeaderButton extends Component {
  static propTypes = {
    btnFunction: PropTypes.func,
    iconName: PropTypes.string,
    overlayValue: PropTypes.number,
    isActive: PropTypes.bool
  };
  render() {
    const { btnFunction, iconName, overlayValue, isActive } = this.props;
    return (
      <button className={styles.button} onClick={btnFunction}>
        <i
          className={classNames({
            ["material-icons"]: true,
            [styles.icon]: true,
            [styles.active]: isActive
          })}
        >
          {iconName}
        </i>
        {overlayValue > 0 ? (
          <p className={styles.overlay}>{overlayValue}</p>
        ) : (
          ""
        )}
      </button>
    );
  }
}

export default HeaderButton;
