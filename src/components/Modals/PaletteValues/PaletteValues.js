import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import AppButton from "../../AppButton/AppButton";
import styles from "./PaletteValues.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ModalHeaderButton from "../ModalHeaderButton/ModalHeaderButton";

function getExportString(colors, colorSpace, format) {
  return colors.map(color =>
    color.formatColor(
      {
        name: color.formatColorName(color.colorName),
        value: color.toString(colorSpace)
      },
      format
    )
  );
}

const colorSpaces = ["hex", "rgb", "hsl", "cmyk"];
const formats = ["css", "less", "json", "raw"];

function generateButtons(items, currentItem, changeItem) {
  return items.map((item, index) => (
    <ModalHeaderButton
      key={`${item}-${index}`}
      action={() => changeItem(item)}
      active={currentItem === item ? true : false}
      text={item}
    >
      {item}
    </ModalHeaderButton>
  ));
}

@observer
class PaletteValues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      colorSpace: "hex",
      format: "css"
    };
  }
  static propTypes = {
    dataStore: PropTypes.object,
    handleClose: PropTypes.func
  };

  changeColorSpace = val => {
    this.setState({
      colorSpace: val
    });
    // reset copied status to false
    this.toggleCopied(false);
  };

  changeFormat = val => {
    this.setState({
      format: val
    });
    // reset copied status to false
    this.toggleCopied(false);
  };

  toggleCopied = val => {
    this.setState({
      copied: val
    });
  };

  render() {
    const { copied, colorSpace, format } = this.state;
    const { dataStore, handleClose } = this.props;
    const paletteStrings = getExportString(
      dataStore.palette.colors,
      colorSpace,
      format
    );
    const modalContent = paletteStrings.map((item, index) => {
      const style = {
        background: `#${dataStore.palette.colors[index].hex}`,
        color: `hsl(0, 0%, ${dataStore.palette.colors[index].contrastYIQ}%)`
      };
      return (
        <p style={style} className={styles.modalContentText} key={index}>
          {item}
        </p>
      );
    });
    return (
      <div>
        <div className={styles.modalHeader}>
          {generateButtons(colorSpaces, colorSpace, this.changeColorSpace)}
        </div>
        <div className={styles.modalHeader}>
          {generateButtons(formats, format, this.changeFormat)}
        </div>
        <div className={styles.modalInner}>
          <div className={styles.modalContent}>{modalContent}</div>

          <div className={styles.buttonsContainer}>
            <AppButton
              buttonText="Done"
              buttonIcon="check"
              buttonType="confirm"
              buttonAction={handleClose}
            />

            <CopyToClipboard
              text={paletteStrings.join("\n")}
              onCopy={() => this.toggleCopied(true)}
            >
              <span>
                <AppButton
                  buttonText="Copy"
                  buttonIcon="content_copy"
                  buttonType="confirm"
                />
              </span>
            </CopyToClipboard>
          </div>
          {copied === true ? (
            <p className={styles.notification}>Copied to clipboard!</p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default PaletteValues;
