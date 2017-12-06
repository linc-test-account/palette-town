import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import FlipMove from "react-flip-move";
import Swatch from "../Swatch/Swatch";
import FontAwesome from "react-fontawesome";
import "./Palette.css";

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

const unWrappedPallete = observer(({ dataStore, sorting, minWidthReached }) => {
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
      className="palette-swatch-container"
      disableAllAnimations={sorting}
      onStartAll={() => dataStore.toggleCoolDownActive(true)}
      onFinishAll={() => dataStore.toggleCoolDownActive(false)}
      // easing="cubic-bezier(.4,-0.32,.52,1.31)"
      easing="ease-in-out"
      duration={200}
      appearAnimation={"fade"}
      enterAnimation={"fade"}
      leaveAnimation={"fade"}
      maintainContainerHeight={true}
      staggerDelayBy={20}
    >
      {sortableSwatches.length === 0 ? (
        <div className="empty-palette-placeholder" key="item-zero">
          Press <FontAwesome className="empty-palette-placeholder-icon" name="plus" size="2x" /> to
          add swatches
        </div>
      ) : (
        sortableSwatches
      )}
    </FlipMove>
  );
});

unWrappedPallete.displayName = "unWrappedPalleteYOLO";

const SortableList = SortableContainer(unWrappedPallete);

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

  render() {
    const { minWidthReached, dataStore } = this.props;
    const { sorting } = this.state;
    return (
      <SortableList
        axis={minWidthReached === true ? "y" : "x"}
        lockAxis={minWidthReached === true ? "y" : "x"}
        dataStore={dataStore}
        sorting={sorting}
        onSortStart={this.handleSortStart}
        onSortEnd={this.handleSortEnd}
        pressDelay={0}
        minWidthReached={minWidthReached}
        useDragHandle={true}
      />
    );
  }
}

export default palette;
