import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes.react';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
