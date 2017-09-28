import React from 'react';
import ReactDOM from 'react-dom';
import './assets/bootstrap/css/bootstrap.css';
import './assets/bootstrap/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
