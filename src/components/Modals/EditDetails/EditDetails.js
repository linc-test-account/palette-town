import React from "react";
import PropTypes from "prop-types";
import AppButton from "../../AppButton/AppButton";
import styles from "./EditDetails.css";

const EditDetails = ({
  nameInput,
  inputOnChange,
  confirmAction,
  cancelAction,
  switchContentAction
}) => (
  <div className={styles.container}>
    <h1 className={styles.heading}>{nameInput}</h1>
    <input
      className={styles.input}
      placeholder="Rename palette..."
      type="text"
      maxLength="50"
      onChange={inputOnChange}
    />
    <div className={styles.buttonsContainer}>
      <AppButton
        buttonText="Save"
        buttonIcon="save"
        buttonType="confirm"
        buttonAction={confirmAction}
      />
      <AppButton
        buttonText="Done"
        buttonIcon="check"
        buttonType="default"
        buttonAction={cancelAction}
      />
      <AppButton
        buttonText="Delete"
        buttonIcon="delete"
        buttonType="danger"
        buttonAction={switchContentAction}
      />
    </div>
  </div>
);

EditDetails.propTypes = {
  nameInput: PropTypes.string,
  inputOnChange: PropTypes.func,
  confirmAction: PropTypes.func,
  cancelAction: PropTypes.func,
  switchContentAction: PropTypes.func
};

export default EditDetails;
