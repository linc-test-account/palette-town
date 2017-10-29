import React, { Component } from 'react';
import { observer } from 'mobx-react';
import FontAwesome from 'react-fontawesome';
import './HeaderButton.css';
import PropTypes from 'prop-types';

@observer
class HeaderButton extends Component {
  static propTypes = {
    btnFunction: PropTypes.func,
    fontAwesomeIcon: PropTypes.string,
    buttonText: PropTypes.string,
    overlayValue: PropTypes.string
  }
  render() {
    const { btnFunction, fontAwesomeIcon, buttonText, overlayValue } = this.props;
    return (
      <button
        className="header-button"
        onClick={btnFunction}>
        <FontAwesome className="header-icons" name={fontAwesomeIcon} size="2x" />
        {overlayValue > 0 ? <p className="indicator-overlay">{overlayValue}</p> : ''}
        <p className="button-text">{buttonText}</p>
      </button>
    );
  }
}

export default HeaderButton;
