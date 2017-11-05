import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TriangleDown.css";

class TriangleDown extends Component {
  static propTypes = {
    show: PropTypes.bool,
  };
  render() {
    const { show } = this.props;
    return (
      <div className={`arrow-down ${show === true ? 'arrow-down-show' : ''}`}></div>
    );
  }
}

export default TriangleDown;
