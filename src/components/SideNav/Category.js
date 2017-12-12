import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import FontAwesome from "react-fontawesome";
import styles from "./Category.css";

@observer
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true,
      contentMaxHeight: undefined
    };
  }

  componentDidMount() {
    this.updateContentMaxHeight();
  }

  componentDidUpdate() {
    this.updateContentMaxHeight();
  }

  updateContentMaxHeight = () => {
    const { categoryItems } = this.props;
    if (categoryItems.length > 0) {
      const newHeight =
        this.contentDiv.childNodes[0].offsetHeight * categoryItems.length;
      if (newHeight !== this.state.contentMaxHeight) {
        this.setState({
          contentMaxHeight: newHeight
        });
      }
    }
  };

  toggleIsExpanded = () => {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: isExpanded === true ? false : true
    });
  };

  static propTypes = {
    categoryName: PropTypes.string,
    categoryItems: PropTypes.array
  };

  render() {
    const { isExpanded, contentMaxHeight } = this.state;
    const { categoryName, categoryItems } = this.props;
    const contentStyle = {
      maxHeight: isExpanded === true ? contentMaxHeight + "px" : 0
    };
    return (
      <div className={styles.container}>
        <h2 className={styles.heading} onClick={this.toggleIsExpanded}>
          {categoryName}
          <FontAwesome
            className={styles.icon}
            name={isExpanded === true ? "caret-up" : "caret-down"}
            size="2x"
          />
        </h2>
        <div
          ref={contentDiv => (this.contentDiv = contentDiv)}
          className={styles.content}
          style={contentStyle}
        >
          {categoryItems.length > 0 && categoryItems}
        </div>
      </div>
    );
  }
}

export default Category;
