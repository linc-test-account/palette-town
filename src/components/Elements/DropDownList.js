import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "./DropDownList.css";


@observer
class DropDownList extends Component {
  static propTypes = {
    showing: PropTypes.bool,
    toggleShowing: PropTypes.func,
    listItems: PropTypes.array,
    selectedValue: PropTypes.string
  };

  render() {
    const { toggleShowing, showing, listItems, selectedValue } = this.props;
    return (
      <div className="dropdown">
        <button
          onClick={toggleShowing}
          className="dropbtn"
          data-tip
          data-for="happyFace"
        >
          {selectedValue}
          <FontAwesome
            className="dropbtn-caret"
            name={"caret-down"}
            size="2x"
          />
        </button>

        <div
          id="myDropdown"
          className={`dropdown-content ${showing === true ? "show" : ""}`}
        >
          {listItems}
        </div>
      </div>
    );
  }
}

export default DropDownList;
