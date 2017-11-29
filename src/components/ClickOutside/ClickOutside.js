import React, { Component } from "react";
import PropTypes from "prop-types";

class OutsideAlerter extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    const { showSideNav, toggleSideNav } = this.props;
    if (showSideNav === true) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        // alert("You clicked outside of me!");
        toggleSideNav(false);
      }
    }
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    showSideNav: PropTypes.bool,
    toggleSideNav: PropTypes.func
  };

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}

export default OutsideAlerter;
