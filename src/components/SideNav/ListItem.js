import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import styles from "./ListItem.css";
import classNames from "classnames";

@observer
class ListItem extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    action: PropTypes.func,
    children: PropTypes.any,
    showControls: PropTypes.bool,
    controlAction: PropTypes.func
  };

  render() {
    const {
      selected,
      action,
      children,
      showControls,
      controlAction
    } = this.props;
    return (
      <div
        className={classNames({
          [styles.container]: true,
          [styles.selected]: selected
        })}
      >
        <div onClick={action} className={styles.content}>
          {children}
        </div>
        <div
          onClick={controlAction}
          className={classNames({
            [styles.controls]: true,
            [styles.controlsVisible]: showControls
          })}
        >
          <i
            className={classNames({
              ["fas fa-cog"]: true,
              [styles.icon]: true,
            })}
          />
        </div>
      </div>
    );
  }
}

export default ListItem;
