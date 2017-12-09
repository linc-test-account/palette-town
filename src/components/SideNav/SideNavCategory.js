import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import FontAwesome from "react-fontawesome";
import styles from "./SideNavCategory.css";

@observer
class SideNavCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true
    };
  }

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
    const { isExpanded } = this.state;
    const { categoryName, categoryItems } = this.props;
    const submenuStyleDefault = {
      maxHeight: "0"
    };
    const submenuOpen = {
      maxHeight: "1000px"
    };
    return (
      <div>
        <h2 className={styles.sidenavCategory} onClick={this.toggleIsExpanded}>
          {categoryName}
          <FontAwesome
            className={styles.sidenavCategoryCaret}
            name={isExpanded === true ? "caret-up" : "caret-down"}
            size="2x"
          />
        </h2>
        <div
          className={styles.sidenavCategoryContainer}
          style={isExpanded === true ? submenuOpen : submenuStyleDefault}
        >
          {categoryItems.length > 0 ? categoryItems : ""}
        </div>
      </div>
    );
  }
}

export default SideNavCategory;
