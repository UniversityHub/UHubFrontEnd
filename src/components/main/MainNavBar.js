import React, { Component } from 'react';
import '../../assets/scss/_MainToolBar.css';
import calendar_icon from '../../assets/svg/SideBarIcons_White/calendar_icon.svg';
import friends_icon from '../../assets/svg/SideBarIcons_White/friends_icon.svg';
import messaging_icon from '../../assets/svg/SideBarIcons_White/messaging_icon.svg';
import profile_icon from '../../assets/svg/SideBarIcons_White/profile_icon.svg';
import home_icon from '../../assets/svg/SideBarIcons_White/home_icon.svg';

class MainNavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default main-nav-bar col-md-12">
          <div className="container-fluid row">
            <div className="navbar-header">
              <a className="navbar-brand" href="">UHub</a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <button type="button" onClick={this.props.handleSettingClick} className="list-group-item row sidebar-item">
                  <img alt='' src={home_icon} className='sidebar-item-icon'/>
                </button>
              </li>
              <li>
                <button type="button" onClick={this.props.handleCalendarClick} className="list-group-item row sidebar-item">
                  <img alt='' src={calendar_icon} className='sidebar-item-icon'/>
                </button>
              </li>
              <li>
                <button type="button" onClick={this.props.handleTodoClick} className="list-group-item row sidebar-item">
                  <img alt='' src={profile_icon} className='sidebar-item-icon'/>
                </button>
              </li>
              <li>
                <button type="button" className="list-group-item row sidebar-item">
                  <img alt='' src={messaging_icon} className='sidebar-item-icon'/>
                </button>
              </li>
              <li>
                <button type="button" onClick={this.props.handleFriendsClick} className="list-group-item row sidebar-item">
                  <img alt='' src={friends_icon} className='sidebar-item-icon'/>
                </button>
              </li>
            </ul>
            {/* <button type="button" onClick={this.props.handleSettingClick} className="list-group-item row sidebar-item">
              <img alt='' src={home_icon} className='sidebar-item-icon'/>
            </button>
            <button type="button" onClick={this.props.handleSettingClick} className="list-group-item row sidebar-item">
              <img alt='' src={home_icon} className='sidebar-item-icon'/>
            </button>
            <button type="button" onClick={this.props.handleTodoClick} className="list-group-item row sidebar-item">
              <img alt='' src={profile_icon} className='sidebar-item-icon'/>
            </button>
            <button type="button" className="list-group-item row sidebar-item">
              <img alt='' src={messaging_icon} className='sidebar-item-icon'/>
            </button>
            <button type="button" onClick={this.props.handleFriendsClick} className="list-group-item row sidebar-item">
              <img alt='' src={friends_icon} className='sidebar-item-icon'/>
            </button> */}
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
