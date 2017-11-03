import React, { Component } from 'react';

class MainNavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default main-nav-bar col-md-12">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="">UHub</a>
            </div>
            {/* <ul className="nav navbar-nav">
              <li className="active"><a href="">Home</a></li>
            </ul> */}
            <div className='navbar-right row' style={{height: '100%'}}>
              <div className='col-md-6'>
                <h5>Hello!</h5>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default MainNavBar;
