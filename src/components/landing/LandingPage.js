import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/scss/_LandingPage.scss';

class LandingPage extends Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">UHUB</a>
            </div>
            <ul className="nav navbar-nav">

            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to='/signup'><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
              <li><Link to='/login'><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default LandingPage;
