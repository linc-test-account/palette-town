import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Loader.css";
import classNames from "classnames";

class Loader extends Component {
  static propTypes = {
    swatchWidth: PropTypes.number,
    swatchHeight: PropTypes.number,
    harmony: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    swatchHover: PropTypes.bool
  };
  
  render() {
    return (
      <div className={styles.container}>
        <div
          className={classNames({
            [styles.square]: true,
            [styles.one]: true
          })}
        />
        <div
          className={classNames({
            [styles.square]: true,
            [styles.two]: true
          })}
        />
        <div
          className={classNames({
            [styles.square]: true,
            [styles.three]: true
          })}
        />
        <div
          className={classNames({
            [styles.square]: true,
            [styles.four]: true
          })}
        />
        <div
          className={classNames({
            [styles.square]: true,
            [styles.five]: true
          })}
        />
      </div>
    );
  }
}

export default Loader;
