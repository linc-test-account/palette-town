import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import FontAwesome from 'react-fontawesome';
import './AppButton.css';

function getStyle(buttonType) {
  let style;
  if (buttonType === 'confirm') {
    style = 'app-button-confirm';
  }
  if (buttonType === 'cancel') {
    style = 'app-button-cancel';
  }
  if (buttonType === 'disabled') {
    style = 'app-button-disabled';
  }
  return style;
}

@observer
class AppButton extends Component {
  static propTypes = {
    btnFunction: PropTypes.func,
    fontAwesomeIcon: PropTypes.string,
    buttonText: PropTypes.string,
    buttonType: PropTypes.string,
  }
  render() {
    const { btnFunction, fontAwesomeIcon, buttonText, buttonType } = this.props;
    return (
      <div>
        <button className={`app-button ${getStyle(buttonType)}`} onClick={btnFunction}>
          <FontAwesome className="app-button-icon" name={fontAwesomeIcon} size="2x" />
          <p className="">
            {buttonText}
          </p>
        </button>
      </div>
    );
  }
}

export default AppButton;
