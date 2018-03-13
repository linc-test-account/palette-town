import React from "react";
import PropTypes from "prop-types";
import styles from "./ModalHeaderButton.css";
import classNames from "classnames";

const ModalHeaderButton = ({ action, active, children }) => (
  <button
    onClick={action}
    className={classNames({
      [styles.buttonDefault]: true,
      [styles.active]: active
    })}
  >
    {children}
  </button>
);

ModalHeaderButton.propTypes = {
  action: PropTypes.func,
  active: PropTypes.bool,
  children: PropTypes.any
};

export default ModalHeaderButton;
