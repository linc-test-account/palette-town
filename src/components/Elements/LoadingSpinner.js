import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { observer } from 'mobx-react';

@observer
class LoadingSpinner extends Component {
  render() {
    return (
      <div className="">
        <FontAwesome className="" spin name="circle-o-notch" size="2x" />
      </div>
    );
  }
}

export default LoadingSpinner;
