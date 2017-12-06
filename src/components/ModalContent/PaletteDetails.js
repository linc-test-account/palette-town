import React, { Component } from "react";
import { observer } from "mobx-react";
import MiniPalette from "../MiniPalette/MiniPalette";
import PropTypes from "prop-types";
import "./PaletteDetails.css";

@observer
class PaletteDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      content: "default"
    };
  }
  static propTypes = {
    targetFavorite: PropTypes.number,
    dataStore: PropTypes.object,
    handleClose: PropTypes.func
  };

  componentDidMount() {
    const { dataStore, targetFavorite } = this.props;
    this.setState({
      nameInput: dataStore.favorites[targetFavorite].name
    });
  }

  inputOnChange = val => {
    // If input value exceeds length of 50
    if (val.length > 50) {
      return;
    }
    this.setState({
      nameInput: val
    });
  };

  confirm = () => {
    const { nameInput } = this.state;
    const { dataStore, targetFavorite, handleClose } = this.props;
    dataStore.favorites[targetFavorite].changeName(nameInput);
    dataStore.updateLocalStorage();
    handleClose();
  };

  cancel = () => {
    const { handleClose } = this.props;
    handleClose();
  };

  delete = () => {
    const { dataStore, targetFavorite, handleClose } = this.props;
    dataStore.deleteFromFavorites(targetFavorite);
    handleClose();
  };

  switchContent = val => {
    this.setState({
      content: val
    });
  };

  render() {
    const { nameInput, content } = this.state;
    const { targetFavorite, dataStore } = this.props;
    return (
      <div>
        {content === "default" && (
          <div className="edit-details-container">
            <h1 className="edit-details-heading">Edit Palette</h1>
            <MiniPalette
              swatchWidth={50}
              swatchHeight={30}
              swatchHover={true}
              harmony={dataStore.favorites[targetFavorite].colors}
            />
            <h3 className="edit-details-input-heading">Name</h3>
            <input
              className="edit-details-input"
              type="text"
              value={nameInput}
              onChange={event => this.inputOnChange(event.target.value)}
            />

            <div className="edit-details-input-container">
              <button
                className="edit-details-button confirm"
                onClick={this.confirm}
              >
                Save
              </button>
              <button
                className="edit-details-button cancel"
                onClick={this.cancel}
              >
                Cancel
              </button>
              <button
                className="edit-details-button delete"
                onClick={() => this.switchContent("delete")}
              >
                Delete
              </button>
            </div>
          </div>
        )}
        {content === "delete" && (
          <div className="edit-details-container">
            <h1 className="edit-details-heading edit-details-heading-delete">
              Delete <span className="edit-details-text-span">{nameInput}</span>
            </h1>
            <MiniPalette
              swatchWidth={50}
              swatchHeight={30}
              swatchHover={true}
              harmony={dataStore.favorites[targetFavorite].colors}
            />
            <h3 className="edit-details-input-heading">
              Are you sure you want to delete{" "}
              <span className="edit-details-text-span">{nameInput}</span>?
            </h3>
            <div className="edit-details-input-container">
              <button
                className="edit-details-button cancel"
                onClick={() => this.switchContent("default")}
              >
                Cancel
              </button>
              <button
                className="edit-details-button delete"
                onClick={this.delete}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PaletteDetails;
