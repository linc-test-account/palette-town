import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import ColorPicker from "../Modals/ColorPicker/ColorPicker";
import styles from "./Swatch.css";
import HexInput from "./HexInput";
import classNames from "classnames";

@observer
class Swatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableAllAnimations: true
    };
  }

  componentDidMount() {
    // disables Swatch FlipMove animation
    // until after Palette FlipMove animation
    // completes. Prevents minor glitchyness
    // in transitions between Palettes
    setTimeout(() => {
      this.setState({
        disableAllAnimations: false
      });
    }, 350);
  }

  static propTypes = {
    dataStore: PropTypes.object.isRequired,
    colorStore: PropTypes.object.isRequired,
    uniqueIndex: PropTypes.number,
    sorting: PropTypes.bool,
    minWidthReached: PropTypes.bool
  };
  render() {
    const {
      dataStore,
      colorStore,
      uniqueIndex,
      sorting,
      minWidthReached
    } = this.props;
    const buttonTextColor = {
      color: `hsla(0, 0%, ${colorStore.contrastYIQ}%, .5)`
    };

    const flexGrowAmmount = minWidthReached === true ? 4 : 2;
    const style = {
      background: colorStore.toString('hsl'),
      color: `hsla(0, 0%, ${colorStore.contrastYIQ}%, .4)`,
      flexGrow: colorStore.selected === false ? 1 : flexGrowAmmount
    };

    return (
      <FlipMove
        disableAllAnimations={this.state.disableAllAnimations}
        style={style}
        className={classNames({
          [styles.container]: true,
          [styles.swatchFlexTransition]: sorting === false ? true : false,
          swatchDraggable: true
        })}
        leaveAnimation={"elevator"}
        duration={250}
      >
        {minWidthReached === true && colorStore.selected === true ? (
          <span key={`swatch-${0}`} />
        ) : (
          <div key={`swatch-${1}`} className={styles.content}>
            <HexInput
              textColor={buttonTextColor}
              uniqueIndex={uniqueIndex}
              dataStore={dataStore}
              colorStore={colorStore}
            />
            <p
              className={classNames({
                [styles.colorName]: true,
                [styles.noselect]: true
              })}
            >
              {colorStore.colorName}
            </p>
          </div>
        )}

        {colorStore.selected === true && (
          <ColorPicker
            key={`swatch-${2}`}
            colorSpace="HSL"
            colorStore={colorStore}
            dataStore={dataStore}
          />
        )}

        {colorStore.selected === false && (
          <div className={styles.buttonsContainer} key={`swatch-${3}`}>
            <div
              style={buttonTextColor}
              className={styles.swatchButton}
              onClick={() => dataStore.palette.selectSwatch(uniqueIndex)}
            >
              <i
                className={classNames({
                  ["material-icons"]: true,
                  [styles.swatchButtonIcon]: true
                })}
              >
                tune
              </i>
            </div>
            <div
              style={buttonTextColor}
              className={styles.swatchButton}
              onClick={() => dataStore.palette.deleteSwatch(uniqueIndex)}
            >
              <i
                className={classNames({
                  ["material-icons"]: true,
                  [styles.swatchButtonIcon]: true
                })}
              >
                delete
              </i>
            </div>
          </div>
        )}
      </FlipMove>
    );
  }
}

export default Swatch;
