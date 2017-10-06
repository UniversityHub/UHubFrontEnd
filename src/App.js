import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import './assets/scss/_App.css';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
