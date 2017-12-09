import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import styles from "./ModalHeaderButton.css";
import classNames from "classnames";

@observer
class ModalHeaderButton extends Component {
  static propTypes = {
    action: PropTypes.func,
    active: PropTypes.bool,
    children: PropTypes.any
  };
  render() {
    const { action, active, children } = this.props;
    return (
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
  }
}

export default ModalHeaderButton;
