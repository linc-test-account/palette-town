import React, { Component } from "react";
import { observer } from "mobx-react";
import MiniPalette from "../MiniPalette/MiniPalette";
import ColorDialog from "../ColorDialog/ColorDialog";
import PropTypes from "prop-types";
import AppButton from "../AppButton/AppButton";
import styles from "./ColorInfo.css";
import ModalHeaderButton from "../ModalHeaderButton/ModalHeaderButton";

const categories = ["hex", "rgb", "hsl", "cmyk"];

function generateCategoryButtons(currentCategory, changeCategory) {
  return categories.map((category, index) => (
    <ModalHeaderButton
      key={`modal-header-button-${index}`}
      action={() => changeCategory(category)}
      active={currentCategory === category ? true : false}
      text={category}
    >
      {category}
    </ModalHeaderButton>
  ));
}

function generateCategoryContent(currentCategory, colors) {
  return categories.map(
    (category, index) =>
      currentCategory === category && (
        <ColorDialog
          key={`color-dialog-${index}`}
          title={category}
          colors={colors}
          colorSpace={category}
        />
      )
  );
}

@observer
class ColorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "hex"
    };
  }
  static propTypes = {
    dataStore: PropTypes.object,
    handleClose: PropTypes.func
  };

  changeCategory = val => {
    this.setState({
      category: val
    });
  };

  render() {
    const { category } = this.state;
    const { dataStore, handleClose } = this.props;
    return (
      <div>
        <div className={styles.paletteColorDataHeader}>
          {generateCategoryButtons(category, this.changeCategory)}
        </div>
        <div className={styles.modalInner}>
          <div className={styles.modalPaletteContainer}>
            <MiniPalette
              swatchWidth={50}
              swatchHeight={20}
              swatchHover={true}
              harmony={dataStore.palette.colors}
            />
          </div>
          {generateCategoryContent(category, dataStore.palette.colors)}
          <AppButton
            buttonText="Done"
            buttonType="confirm"
            buttonAction={handleClose}
          />
        </div>
      </div>
    );
  }
}

export default ColorInfo;
