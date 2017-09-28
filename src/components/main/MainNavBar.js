import React, { Component } from 'react';

class MainNavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default col-md-12">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">UHub</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#">Page 1</a></li>
              <li><a href="#">Page 2</a></li>
            </ul>
            <form className='navbar-form navbar-left'>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search" />
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <div className='navbar-right row' style={{height: '100%'}}>
              <div className='col-md-6'>
                <h5>Hello, Christian!</h5>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="glyphicon glyphicon-cog"></span>
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default MainNavBar;
