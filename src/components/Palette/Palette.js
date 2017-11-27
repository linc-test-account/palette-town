import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import FlipMove from "react-flip-move";
import Swatch from "../Swatch/Swatch";
import "./Palette.css";

const SortableItem = SortableElement(
  ({
    dataStore,
    hue,
    saturation,
    lightness,
    hex,
    contrastYIQ,
    selected,
    colorName,
    uniqueIndex,
    sorting,
    minWidthReached
  }) => {
    return (
      <Swatch
        dataStore={dataStore}
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        hex={hex}
        contrastYIQ={contrastYIQ}
        selected={selected}
        colorName={colorName}
        uniqueIndex={uniqueIndex}
        sorting={sorting}
        minWidthReached={minWidthReached}
      />
    );
  }
);

const SortableList = SortableContainer(
  observer(({ dataStore, items, sorting, minWidthReached }) => {
    const sortableSwatches = items.map(
      (
        {
          hue,
          saturation,
          lightness,
          hex,
          contrastYIQ,
          selected,
          colorName,
          id
        },
        index
      ) => (
        <SortableItem
          dataStore={dataStore}
          hue={hue}
          saturation={saturation}
          lightness={lightness}
          hex={hex}
          contrastYIQ={contrastYIQ}
          selected={selected}
          colorName={colorName}
          key={`item-${id}`}
          index={index}
          uniqueIndex={index}
          sorting={sorting}
          minWidthReached={minWidthReached}
        />
      )
    );
    return (
      <FlipMove
        className="palette-swatch-container"
        disableAllAnimations={sorting}
        easing="cubic-bezier(.4,-0.32,.52,1.31)"
        duration={500}
        maintainContainerHeight={true}
        staggerDelayBy={40}
      >
        {sortableSwatches}
      </FlipMove>
    );
  })
);

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
    dataStore: PropTypes.object,
    currentPalette: PropTypes.object
  };

  handleSortStart = () => {
    this.setState({
      sorting: true
    });
  };

  handleSortEnd = object => {
    this.props.dataStore.onSortEnd(object.oldIndex, object.newIndex);
    this.setState({
      sorting: false
    });
  };

  render() {
    const { minWidthReached, dataStore, currentPalette } = this.props;
    const { sorting } = this.state;
    return (
      <SortableList
        axis={minWidthReached === true ? "y" : "x"}
        lockAxis={minWidthReached === true ? "y" : "x"}
        dataStore={dataStore}
        items={currentPalette}
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
