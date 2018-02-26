import React, { Component } from "react";
import { observer } from "mobx-react";
import MiniPalette from "../MiniPalette/MiniPalette";
import PropTypes from "prop-types";
import AppButton from "../AppButton/AppButton";
import styles from "./EditDetails.css";
import classNames from "classnames";

@observer
class EditDetails extends Component {
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
          <div className={styles.editDetailsContainer}>
            <h1 className={styles.editDetailsHeading}>Edit Palette</h1>
            <MiniPalette
              swatchWidth={50}
              swatchHeight={20}
              swatchHover={true}
              harmony={dataStore.favorites[targetFavorite].colors}
            />
            <h3 className={styles.editDetailsInputHeading}>Name</h3>
            <input
              className={styles.editDetailsInput}
              type="text"
              value={nameInput}
              onChange={event => this.inputOnChange(event.target.value)}
            />

            <div className={styles.editDetailsButtonContainer}>
              <AppButton
                buttonText="Save"
                buttonType="confirm"
                buttonAction={this.confirm}
              />
              <AppButton
                buttonText="Cancel"
                buttonType="default"
                buttonAction={this.cancel}
              />
              <AppButton
                buttonText="Delete"
                buttonType="danger"
                buttonAction={() => this.switchContent("delete")}
              />
            </div>
          </div>
        )}
        {content === "delete" && (
          <div className={styles.editDetailsContainer}>
            <h1
              className={classNames({
                [styles.editDetailsHeading]: true,
                [styles.editDetailsHeadingDelete]: true
              })}
            >
              Delete Favorite
            </h1>
            <MiniPalette
              swatchWidth={50}
              swatchHeight={20}
              swatchHover={true}
              harmony={dataStore.favorites[targetFavorite].colors}
            />
            <h3 className={styles.editDetailsInputHeading}>
              Delete{" "}
              <span className={styles.editDetailsTextSpan}>{nameInput}</span>{" "}
              from favorites?
            </h3>
            <div className={styles.editDetailsButtonContainer}>
              <AppButton
                buttonText="Cancel"
                buttonType="default"
                buttonAction={() => this.switchContent("default")}
              />
              <AppButton
                buttonText="Delete"
                buttonType="danger"
                buttonAction={this.delete}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditDetails;
