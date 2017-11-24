import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import Data from './stores/Data.js';

const dataStore = new Data();

ReactDOM.render(<App dataStore={dataStore}/>, document.getElementById('root'));
registerServiceWorker();
