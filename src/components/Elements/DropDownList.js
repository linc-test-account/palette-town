import React, { Component } from "react";
import { observer } from "mobx-react";
import "./DropDownList.css";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import MiniPalette from "./MiniPalette";

function getHarmonies(harmonies, dataStore, toggleShowing) {
  const harmonyList = harmonies.map(
    ({ harmony }, index) =>
      harmony === dataStore.selectedHarmony.harmony ? (
        <a className="drop-down-list-option" key={index} value={index} onClick={() => toggleShowing()}>
          {harmony}
          <FontAwesome className="option-checkmark" name={"check"} size="2x" />
          <MiniPalette index={index} harmony={harmony} dataStore={dataStore} />
        </a>
      ) : (
        <a className="drop-down-list-option" 
          key={index}
          value={index}
          onClick={() => {
            dataStore.changeHarmony(index);
            toggleShowing();
          }}
        >
          {harmony}
          <MiniPalette index={index} harmony={harmony} dataStore={dataStore} />
        </a>
      )
  );
  return harmonyList;
}

// window.onclick = function(event) {
//   if (!event.target.matches(".dropbtn")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };

@observer
class DropDownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false
    };
  }
  static propTypes = {
    dataStore: PropTypes.object
  };

  toggleShowing = () => {
    if (this.state.showing === true) {
      this.setState({
        showing: false
      });
    } else {
      this.setState({
        showing: true
      });
    }
  };

  render() {
    const { dataStore } = this.props;
    return (
      <div className="dropdown">
        <button onClick={this.toggleShowing} className="dropbtn">
          {dataStore.selectedHarmony.harmony} 
          <FontAwesome className="dropbtn-caret" name={"caret-down"} size="2x" />
        </button>
        <div
          id="myDropdown"
          className={`dropdown-content ${this.state.showing === true
            ? "show"
            : ""}`}
        >
          {getHarmonies(dataStore.allHarmonies, dataStore, this.toggleShowing)}
        </div>
      </div>
    );
  }
}

export default DropDownList;
