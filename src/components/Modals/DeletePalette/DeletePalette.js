import React from "react";
import PropTypes from "prop-types";
import AppButton from "../../AppButton/AppButton";
import styles from "./DeletePalette.css";

const DeletePalette = ({ paletteName, deleteFunction, cancelFunction }) => (
  <div className={styles.container}>
    <h1 className={styles.heading}>Delete {`'${paletteName}'`}?</h1>
    <div className={styles.buttonsContainer}>
      <AppButton
        buttonText="Delete"
        buttonIcon="delete"
        buttonAction={deleteFunction}
        buttonType="danger"
      />
      <AppButton
        buttonText="Cancel"
        buttonIcon="close"
        buttonAction={cancelFunction}
        buttonType="default"
      />
    </div>
  </div>
);

DeletePalette.propTypes = {
  paletteName: PropTypes.string.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  cancelFunction: PropTypes.func.isRequired
};

export default DeletePalette;
