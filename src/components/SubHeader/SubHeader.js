import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import HeaderButton from "../Elements/HeaderButton";
import "./SubHeader.css";

@observer
class SubHeader extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };

  render() {
    const { dataStore } = this.props;
    const test = toJS(dataStore.schemes[dataStore.targetItem])
    return (
      <div className="card-header">
        <div className="card-header-left">
          <p className="card-info-title">
            <b>Card:</b>{" "}
            <span className="card-info">{dataStore.targetItem + 1}</span>
          </p>
          <p className="card-info-title">
            <b>Card Scheme:</b>{" "}
            {test !== undefined ? (<span className="card-info">{test.scheme}</span>) : ''}
          </p>
          <p className="card-info-title">
            <b>Colors:</b>{" "}
          {test !== undefined ? (<span className="card-info">{test.colors.length}</span>) : ''}
          </p>
        </div>
        <div className="card-header-right">
          <HeaderButton
            className="card-buttons"
            dataStore={dataStore}
            btnFunction={() => dataStore.addSwatch()}
            fontAwesomeIcon={"plus-square-o"}
            buttonText={"Add Swatch"}
          />
          <HeaderButton
            className="card-buttons"
            dataStore={dataStore}
            btnFunction={() => dataStore.reverseSwatches()}
            fontAwesomeIcon={"repeat"}
            buttonText={"Reverse"}
          />
          <HeaderButton
            className="card-buttons"
            dataStore={dataStore}
            btnFunction={() => dataStore.randomizeSwatches()}
            fontAwesomeIcon={"random"}
            buttonText={"Random"}
          />
          <HeaderButton
            className="card-buttons"
            dataStore={dataStore}
            btnFunction={() => dataStore.changePalatteFlexDirection()}
            fontAwesomeIcon={"bars"}
            buttonText={"Toggle View"}
          />
        </div>
      </div>
    );
  }
}

export default SubHeader;
