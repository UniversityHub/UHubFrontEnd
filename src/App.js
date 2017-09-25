import React, { Component } from 'react';
//import { Router, Route } from 'react-router';
import { BrowserRouter, Route, hashHistory } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import LoginForm from './components/login/LoginForm';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
        {/* <LoginForm /> */}
      </div>
    );
  }
}

export default App;
