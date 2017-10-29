import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import HeaderButton from "../Elements/HeaderButton";
import './SubHeader.css';

@observer
class SubHeader extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  }
  render() {
    const { dataStore } = this.props;
    console.log(dataStore.schemes);
    return (
      <div className="card-header">
        <div className="card-header-left">
          <p className="card-info-title">
            <b>Card:</b> <span className="card-info">{dataStore.targetItem + 1}</span>
          </p>
          <p className="card-info-title">
            {/* <b>Swatches:</b> <span className="card-info">{dataStore.schemes[dataStore.targetItem].colors.length}</span> */}
          </p>
          <p className="card-info-title">
            {/* <b>Palatte:</b> <span className="card-info">{dataStore.schemes[dataStore.targetItem].scheme}</span> */}
          </p>
        </div>
        <div className="card-header-right">
          <HeaderButton
            className="card-buttons"
            dataStore={dataStore}
            btnFunction={() => dataStore.addSwatch()}
            fontAwesomeIcon={'plus-square-o'}
            buttonText={'Add Swatch'}
          />
          <HeaderButton
            className="card-buttons"
            dataStore={dataStore}
            btnFunction={() => dataStore.reverseSwatches()}
            fontAwesomeIcon={'repeat'}
            buttonText={'Reverse'}
          />
          <HeaderButton
            className="card-buttons"
            dataStore={dataStore}
            btnFunction={() => dataStore.randomizeSwatches()}
            fontAwesomeIcon={'random'}
            buttonText={'Random'}
          />
          <HeaderButton
            className="card-buttons"
            dataStore={dataStore}
            btnFunction={() => dataStore.addToShortList()}
            fontAwesomeIcon={'floppy-o'}
            buttonText={'Save'}
          />
          <HeaderButton
            className="card-buttons"
            dataStore={dataStore}
            btnFunction={() => dataStore.changePalatteFlexDirection()}
            fontAwesomeIcon={'bars'}
            buttonText={'Toggle View'}
          />
        </div>
      </div>
    );
  }
}

export default SubHeader;
