import React, { Component } from 'react';
import { observer } from 'mobx-react';
import HeaderButton from '../Elements/HeaderButton.js';
import KeyHandler, {KEYDOWN} from 'react-key-handler';
// import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import './Header.css';

function getHarmonies(harmonies) {
  const harmonyList = harmonies.map(({ harmony }, index) =>
    <option key={index} value={index}>
      {harmony}
    </option>
  );
  return harmonyList;
}

// function getSwatches(colors) {
//   const swatches = colors.map(({ color, count }, index) =>
//     <p key={count}>
//       {color}
//     </p>
//   );
//   console.log(swatches);
//   return swatches;
// }

// function getShortList(list) {
//   let items = list.map(({ colors, count, scheme }, index) =>
//     <option key={count} value={count}>
//       {scheme}
//       {getSwatches(colors)}
//     </option>
//   );
//   return items;
// }

@observer
class Header extends Component {
  static propTypes = {
    dataStore: PropTypes.object,
  }
  render() {
    const { dataStore } = this.props;
    return (
      <div className="header">
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowLeft" onKeyHandle={() => dataStore.getPrevious()} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowRight" onKeyHandle={() => dataStore.getNext()} />
        <h1 className="brand-name">Palette Town</h1>

        <select
          title="Select dice type to roll"
          className="header-select"
          value={dataStore.selectValue}
          onChange={event => dataStore.changeHarmony(event.target.value)}>
          {getHarmonies(dataStore.allHarmonies)}
        </select>

        {/* <select
          title="Select dice type to roll"
          className="header-select"
          onChange={event => dataStore.changeHarmony(event.target.value)}>
          {getShortList(dataStore.shortList)}
        </select> */}

        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.concatColors()}
          fontAwesomeIcon={'plus'}
          buttonText={'New'}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.getPrevious()}
          fontAwesomeIcon={'arrow-left'}
          buttonText={'Previous'}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.getNext()}
          fontAwesomeIcon={'arrow-right'}
          buttonText={'Next'}
        />
        <HeaderButton
          className="card-buttons"
          dataStore={dataStore}
          btnFunction={() => dataStore.deletePalatte()}
          fontAwesomeIcon={'trash-o'}
          buttonText={'Delete Palatte'}
        />
        <HeaderButton
          className="card-buttons"
          dataStore={dataStore}
          btnFunction={() => dataStore.deletePalatte()}
          fontAwesomeIcon={'download'}
          buttonText={'Download Palatte'}
        />
      </div>
    );
  }
}

export default Header;
