import React, { Component } from "react";
import { observer } from "mobx-react";
import EditDetails from "../EditDetails/EditDetails";
import DeletePalette from "../DeletePalette/DeletePalette";
import PropTypes from "prop-types";
// import styles from "./PaletteSettings.css";

@observer
class PaletteSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      content: "default"
    };
  }

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
    return (
      <div>
        {content === "default" && (
          <EditDetails
            nameInput={nameInput}
            inputOnChange={event => this.inputOnChange(event.target.value)}
            confirmAction={this.confirm}
            cancelAction={this.cancel}
            switchContentAction={() => this.switchContent("delete")}
          />
        )}

        {content === "delete" && (
          <DeletePalette
            paletteName={nameInput}
            deleteFunction={this.delete}
            cancelFunction={() => this.switchContent("default")}
          />
        )}
      </div>
    );
  }
}

PaletteSettings.propTypes = {
  targetFavorite: PropTypes.number,
  dataStore: PropTypes.object,
  handleClose: PropTypes.func
};

export default PaletteSettings;
