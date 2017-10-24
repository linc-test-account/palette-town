import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Header from '../Header/Header.js';
import CardGallery from '../CardGallery/CardGallery.js';
import './App.css';

const factorial = (number) => {
  return number <= 0 ? 1 : (number * factorial(number - 1));
};
console.log(factorial(5));

@observer
class App extends Component {
  static propTypes = {
    dataStore: PropTypes.object
  }
  componentDidMount() {
    console.log(`values: ${this.props.dataStore.schemes}`);
    this.props.dataStore.concatColors();

    const tempArray = JSON.parse(JSON.stringify(this.props.dataStore.schemes));
    console.log(tempArray);
  }
  render() {
    const { dataStore } = this.props;
    return (
      <div className="App">
        <Header dataStore={dataStore} />
        {dataStore.schemes.length === 0 ? 'No data' : <CardGallery dataStore={dataStore} />}
      </div>
    );
  }
}

export default App;
