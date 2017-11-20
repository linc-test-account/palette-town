import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import FontAwesome from "react-fontawesome";
import FlipMove from "react-flip-move";
import "./Palette.css";
import ColorPicker from "../ColorPicker/ColorPicker";

const DragHandle = SortableHandle(() => (
  <p className="palette-draghandle noselect">
    <FontAwesome name="arrows-h" size="2x" />
  </p>
));

const DefaultPaletteContent = ({
  dataStore,
  contrastYIQ,
  uniqueIndex,
  hex,
  colorName
}) => {
  const buttonTextColor = {
    color: `hsla(0, 0%, ${contrastYIQ}%, .5)`
  };
  return (
    <div className="default-palette-content-container">
      <div className="palette-swatch-information">
        <p className="palette-swatch-hex noselect">#{hex}</p>
        <p className="palette-swatch-name noselect">{colorName}</p>
        <DragHandle />
      </div>

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
};

DefaultPaletteContent.propTypes = {
  dataStore: PropTypes.object,
  contrastYIQ: PropTypes.number,
  hex: PropTypes.string,
  colorName: PropTypes.string,
  uniqueIndex: PropTypes.number
};

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
    sorting
  }) => {
    const style = {
      background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      color: `hsla(0, 0%, ${contrastYIQ}%, .4)`,
      flexGrow: selected === false ? 1 : 2,
      transition: sorting === false ? ".3s ease flex" : ""
    };

    return (
      <FlipMove
        style={style}
        className="palette-swatch"
        leaveAnimation={"elevator"}
        enterAnimation={"elevator"}
        appearAnimation={"elevator"}
        easing="cubic-bezier(.4,-0.32,.52,1.31)"
        duration={300}
      >
        {selected === true ? (
          <ColorPicker
            key={`swatch-${71218}`}
            hex={hex}
            colorName={colorName}
            colorSpace="HSL"
            dataStore={dataStore}
          />
        ) : (
          <DefaultPaletteContent
            key={`swatch-${888}`}
            dataStore={dataStore}
            contrastYIQ={contrastYIQ}
            hex={hex}
            colorName={colorName}
            uniqueIndex={uniqueIndex}
          />
        )}
      </FlipMove>
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
          sorting={sorting}
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
        useDragHandle={true}
        items={currentPalette}
        sorting={sorting}
        onSortStart={this.handleSortStart}
        onSortEnd={this.handleSortEnd}
        pressDelay={0}
      />
    );
  }
}

export default palette;
