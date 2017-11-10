import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Heading.css";

class Heading extends Component {
    static propTypes = {
        minWidthReached: PropTypes.bool
      };
  render() {
    const { minWidthReached } = this.props;
    return (
      <div className="heading-container">

      {minWidthReached === true ? <h1 className="brand-name">PT</h1> : <h1 className="brand-name">Palette Town</h1>}
        
      </div>
    );
  }
}

export default Heading;
