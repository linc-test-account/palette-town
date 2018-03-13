import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import FlipMove from "react-flip-move";
import Swatch from "../Swatch/Swatch";
import classNames from "classnames";
import styles from "./Palette.css";

const SortableItem = SortableElement(
  ({ dataStore, colorStore, uniqueIndex, sorting, minWidthReached }) => {
    return (
      <Swatch
        dataStore={dataStore}
        colorStore={colorStore}
        uniqueIndex={uniqueIndex}
        sorting={sorting}
        minWidthReached={minWidthReached}
      />
    );
  }
);

const unwrappedPalette = observer(({ dataStore, sorting, minWidthReached }) => {
  const sortableSwatches = dataStore.palette.colors.map((colorStore, index) => (
    <SortableItem
      dataStore={dataStore}
      colorStore={colorStore}
      key={`item-${colorStore.id}`}
      uniqueIndex={index}
      index={index}
      sorting={sorting}
      minWidthReached={minWidthReached}
    />
  ));
  return (
    <FlipMove
      className={styles.container}
      disableAllAnimations={sorting}
      onStartAll={() => dataStore.toggleCoolDownActive(true)}
      onFinishAll={() => dataStore.toggleCoolDownActive(false)}
      // easing="cubic-bezier(.4,-0.32,.52,1.31)"
      easing="ease-in-out"
      duration={250}
      appearAnimation={"fade"}
      enterAnimation={"fade"}
      leaveAnimation={"fade"}
      maintainContainerHeight={true}
      // staggerDelayBy={20}
    >
      {sortableSwatches.length === 0 ? (
        <div className={styles.placeholder}>
          Press{" "}
          <i
            className={classNames({
              ["fas fa-plus"]: true,
              [styles.placeholderIcon]: true
            })}
          />
          to add swatches
        </div>
      ) : (
        sortableSwatches
      )}
    </FlipMove>
  );
});

unwrappedPalette.displayName = "unwrappedPalette";

const SortableList = SortableContainer(unwrappedPalette);

// If state variable 'sorting' is true, user is moving individual
// swatch via the SortableList component in palette class render
// function. The 'sorting' state variable is passed onto FlipMove's
// disableAllAnimations prop to disable animation of list order
// change already handled by SortableList if it evaluates to
// true
@observer
class palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: false
    };
  }
  static propTypes = {
    minWidthReached: PropTypes.bool,
    dataStore: PropTypes.object.isRequired
  };

  handleSortStart = () => {
    this.setState({
      sorting: true
    });
  };

  handleSortEnd = object => {
    this.props.dataStore.palette.onSortEnd(object.oldIndex, object.newIndex);
    this.setState({
      sorting: false
    });
  };

  handleCancel = object => {
    const isSwatchContainer = object.target.className.includes(
      "swatchDraggable"
    );
    if (isSwatchContainer === true) {
      return false;
    }
    if (isSwatchContainer === false) {
      return true;
    }
  };

  incrementAllColors = () => {
    const { dataStore } = this.props;
    dataStore.palette.changeAllColorProperties(10);
  };

  decrementAllColors = () => {
    const { dataStore } = this.props;
    dataStore.palette.changeAllColorProperties(-10);
  };

  render() {
    const { minWidthReached, dataStore } = this.props;
    const { sorting } = this.state;
    return (
      <div>
        <div className={styles.overlay}>
          <button
            className={styles.overlayButtons}
            onClick={this.incrementAllColors}
          >
            <i
              className={classNames({
                ["material-icons"]: true,
                [styles.icon]: true
              })}
            >
              add
            </i>
          </button>
          <button
            className={styles.overlayButtons}
            onClick={this.decrementAllColors}
          >
            <i
              className={classNames({
                ["material-icons"]: true,
                [styles.icon]: true
              })}
            >
              remove
            </i>
          </button>
        </div>
        <SortableList
          axis={minWidthReached === true ? "y" : "x"}
          lockAxis={minWidthReached === true ? "y" : "x"}
          dataStore={dataStore}
          sorting={sorting}
          onSortStart={this.handleSortStart}
          onSortEnd={this.handleSortEnd}
          pressDelay={0}
          minWidthReached={minWidthReached}
          shouldCancelStart={this.handleCancel}
        />
      </div>
    );
  }
}

export default palette;
