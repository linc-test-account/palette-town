import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import MiniPalette from "../MiniPalette/MiniPalette";
import Modal from "react-modal";
import HeaderButton from "../HeaderButton/HeaderButton";
import OutsideAlerter from "../ClickOutside/ClickOutside";
import EditDetails from "../Modals/EditDetails/EditDetails";
import Category from "./Category";
import styles from "./SideNav.css";
import ListItem from "./ListItem";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";

function getHarmonies(harmonies, dataStore) {
  const keys = Object.keys(harmonies);
  return keys.map((harmony, index) => (
    <ListItem
      key={`harmony-${index}`}
      action={() => dataStore.changeHarmony(harmonies[harmony])}
      selected={
        harmonies[harmony].name === dataStore.selectedHarmony.name
          ? true
          : false
      }
      showControls={false}
    >
      {harmony}
      <MiniPalette
        swatchWidth={20}
        swatchHeight={13}
        harmony={dataStore.miniPalettes[index][harmony]}
      />
    </ListItem>
  ));
}

function getmodifiers(modifiers, dataStore) {
  const keys = Object.keys(modifiers);
  return keys.map((name, index) => (
    <ListItem
      key={`modifier-${index}`}
      action={() => dataStore.changeModifier(modifiers[name])}
      selected={name === dataStore.selectedModifier.name ? true : false}
      showControls={false}
    >
      {name}
    </ListItem>
  ));
}

function getFavorites(favorites, favoritesShortList, dataStore, handleClick) {
  return favorites.map(({ name }, index) => (
    <ListItem
      key={`favorite-${index}`}
      action={() => dataStore.goToPalette(index)}
      showControls={true}
      controlAction={() => handleClick(index)}
    >
      {name}
      <MiniPalette
        swatchWidth={20}
        swatchHeight={13}
        harmony={favoritesShortList[index]}
      />
    </ListItem>
  ));
}

@observer
class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      targetFavorite: undefined
    };
  }

  static propTypes = {
    dataStore: PropTypes.object,
    showSideNav: PropTypes.bool,
    toggleSideNav: PropTypes.func,
    toggleSideNavVisibility: PropTypes.func,
    minWidthReached: PropTypes.bool
  };

  handleClick = val => {
    const { toggleSideNavVisibility } = this.props;
    toggleSideNavVisibility();
    this.setState({
      isShowingModal: true,
      targetFavorite: val
    });
  };

  handleClose = () => {
    const { toggleSideNavVisibility } = this.props;
    this.setState({ isShowingModal: false });
    toggleSideNavVisibility();
  };

  render() {
    const { dataStore, toggleSideNav, showSideNav } = this.props;
    const { isShowingModal } = this.state;
    const style = {
      transform: showSideNav === false ? "translateX(-300px)" : "translateX(0)"
    };

    return (
      <div style={style} className={styles.container}>
        <OutsideAlerter showSideNav={showSideNav} toggleSideNav={toggleSideNav}>
          <div>
            <div className={styles.header}>
              <HeaderButton
                dataStore={dataStore}
                btnFunction={() => toggleSideNav(false)}
                iconName={"menu"}
                buttonText={"Menu"}
              />
              <h1 className={styles.defaultBrandName}>Palette Town</h1>
              <h1 className={styles.mobileBrandName}>PT</h1>
            </div>

            {dataStore.palette.length !== 0 ? (
              <Category
                categoryName="Harmonies"
                categoryItems={getHarmonies(dataStore.harmonies, dataStore)}
              />
            ) : (
              ""
            )}

            <Category
              categoryName="Modifiers"
              categoryItems={getmodifiers(dataStore.modifiers, dataStore)}
            />

            <Category
              categoryName="Favorites"
              categoryItems={getFavorites(
                dataStore.favorites,
                dataStore.favoritesShortList,
                dataStore,
                this.handleClick
              )}
            />
            <div className={styles.spacer} />
            <Modal
              isOpen={isShowingModal}
              onRequestClose={this.handleClose}
              contentLabel="Color Info Modal"
              ariaHideApp={false}
              className={{
                base: styles.colorModalDialog,
                afterOpen: styles.colorModalDialogAfterOpen,
                beforeClose: styles.colorModalDialogBeforeClose
              }}
              overlayClassName={{
                base: styles.modalOverlay,
                afterOpen: styles.modalOverlayAfterOpen,
                beforeClose: styles.modalOverlayBeforeClose
              }}
            >
            <ErrorBoundry>
              <EditDetails
                targetFavorite={this.state.targetFavorite}
                dataStore={dataStore}
                handleClose={this.handleClose}
              />
            </ErrorBoundry>
            </Modal>
          </div>
        </OutsideAlerter>
      </div>
    );
  }
}

export default SideNav;
