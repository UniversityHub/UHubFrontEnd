import React, { Component } from 'react';
import UpdatePassword from './UpdatePassword';

class SettingsPage extends Component {

  static contextTypes = {
    router: React.PropTypes.object, // replace with PropTypes.object if you use them
  }

  logout = () => {
    this.props.history.push({
      pathname: '/',
    });
  }

  render() {
    return (
      <div className="container">
        <div className='row container'>
          <div><h2>Settings</h2></div>
          <div className='col-md-offset-8'>
            <button className='btn btn-primary' onClick={this.context.router.history.goBack}>Back</button>
          </div>
        </div>
        <div className='row container'>
          <ul className="nav nav-tabs nav-stacked col-md-3">
            <li className="active"><a data-toggle="tab" href="#personalInfo">Personal Info</a></li>
            <li><a data-toggle="tab" href="#updatePassword">Update Password</a></li>
            <li><a data-toggle="tab" onClick={this.logout}>Logout</a></li>
          </ul>

          <div className="tab-content col-md-8">
            <div id="personalInfo" className="tab-pane fade in active">
              <h3>Menu 1</h3>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div id="updatePassword" className="tab-pane fade">
              <UpdatePassword user={this.props.location.state.user} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default SettingsPage;
