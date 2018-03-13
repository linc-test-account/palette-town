import React from "react";
import PropTypes from "prop-types";
import styles from "./AppButton.css";
import classNames from "classnames";

const AppButton = ({ buttonText, buttonIcon, buttonType, buttonAction }) => (
  <button
    onClick={buttonAction}
    className={classNames({
      [styles.button]: true,
      [styles.confirm]: buttonType === "confirm",
      [styles.danger]: buttonType === "danger"
    })}
  >
    <i className={classNames({
      ["material-icons"]: true,
      [styles.icon]: true
    })}>{buttonIcon}</i>
    {buttonText}
  </button>
);

AppButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string,
  buttonType: PropTypes.string.isRequired,
  buttonAction: PropTypes.func
};

export default AppButton;
