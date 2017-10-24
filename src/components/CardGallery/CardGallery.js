import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import FlipMove from "react-flip-move";
import Card from "../Card/Card.js";
import "./CardGallery.css";

function generateCards(dataStore) {
  const schemes = dataStore.schemes;
  const targetIndex = dataStore.targetItem;
  const item = schemes[targetIndex];

  if (schemes.length > 0) {
    return (
      <Card
        dataStore={dataStore}
        key={item.count}
        scheme={item.scheme}
        colors={item.colors}
      />
    );
  }

  // const cards = schemes
  //   .filter((item, index, arr) => index >= arr.length - 3)
  //   .sort(function(a, b) {
  //     return b.count - a.count;
  //   })
  //   .map(({ scheme, count, colors }, index) =>
  //     <Card dataStore={dataStore} key={count} scheme={scheme} colors={colors} />
  //   );
}

@observer
class CardGallery extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  };
  render() {
    const { dataStore } = this.props;

    const customEnterAnimation = {
      from: {
        transform: `translate(${dataStore.currentAction === "forward"
          ? "250px"
          : "-250px"})`,
        opacity: "0"
      },
      to: {
        transform: "translate(0)",
        opacity: "1"
      }
    };

    const customLeaveAnimation = {
      from: {
        transform: "translate(0)",
        opacity: "1"
      },
      to: {
        transform: `translate(${dataStore.currentAction === "forward"
          ? "-250px"
          : "250px"})`,
        opacity: "0"
      }
    };

    return (
      <div className="card-gallery">
        <FlipMove
          className="card-container"
          duration={dataStore.transitionTime}
          easing="ease-in-out"
          enterAnimation={customEnterAnimation}
          leaveAnimation={customLeaveAnimation}
          maintainContainerHeight={true}
        >
          {generateCards(dataStore)}
        </FlipMove>
      </div>
    );
  }
}

export default CardGallery;
