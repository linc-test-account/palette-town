import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./AppButton.css";
import classNames from "classnames";

class AppButton extends Component {
  static propTypes = {
    buttonText: PropTypes.string.isRequired,
    buttonType: PropTypes.string.isRequired,
    buttonAction: PropTypes.func
  };

  render() {
    const { buttonText, buttonType, buttonAction } = this.props;
    return (
      <button
        onClick={buttonAction}
        className={classNames({
          [styles.button]: true,
          [styles.confirm]: buttonType === "confirm",
          [styles.danger]: buttonType === "danger"
        })}
      >
        {buttonText}
      </button>
    );
  }
}

export default AppButton;
