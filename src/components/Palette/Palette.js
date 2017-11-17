import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import FontAwesome from "react-fontawesome";
import TriangleDown from "../Elements/TriangleDown";
import FlipMove from "react-flip-move";

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
    uniqueIndex
  }) => {
    const buttonTextColor = {
      color: `hsla(0, 0%, ${contrastYIQ}%, .5)`
    };
    const style = {
      background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      boxShadow: `inset 0 0 0 2px ${selected === true
        ? `hsla(0, 0%, ${contrastYIQ}%, .5)`
        : `hsl(${hue}, ${saturation}%, ${lightness}%)`}`,
      color: `hsla(0, 0%, ${contrastYIQ}%, .4)`
    };

    return (
      <div className="palette-swatch" style={style}>
        <TriangleDown show={selected} />
        <p className="palette-swatch-hex noselect">#{hex}</p>
        <p className="palette-swatch-name noselect">{colorName}</p>

        <div className="palette-swatch-buttons-container">
          <button
            style={buttonTextColor}
            className="palette-swatch-button"
            onClick={() => dataStore.selectSwatch(uniqueIndex)}
          >
            <FontAwesome name="sliders" size="2x" />
          </button>

          <button
            style={buttonTextColor}
            className="palette-swatch-button"
            onClick={() => dataStore.deleteSwatch(uniqueIndex)}
          >
            <FontAwesome name="trash" size="2x" />
          </button>

          <button style={buttonTextColor} className="palette-swatch-button">
            <FontAwesome name="info" size="2x" />
          </button>
        </div>
      </div>
    );
  }
);

const SortableList = SortableContainer(
  observer(({ dataStore, items, sorting }) => {
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
        />
      )
    );
    return (
      <FlipMove
        className="palette-swatch-container"
        disableAllAnimations={sorting}
        leaveAnimation={true}
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
        pressDelay={150}
      />
    );
  }
}

export default palette;
