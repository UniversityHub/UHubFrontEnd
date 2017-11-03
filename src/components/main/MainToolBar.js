import React, {Component} from 'react';
import '../../assets/scss/_MainToolBar.css';
import calendar_icon from '../../assets/svg/SideBarIcons_White/calendar_icon.svg';
import friends_icon from '../../assets/svg/SideBarIcons_White/friends_icon.svg';
import messaging_icon from '../../assets/svg/SideBarIcons_White/messaging_icon.svg';
import profile_icon from '../../assets/svg/SideBarIcons_White/profile_icon.svg';
import home_icon from '../../assets/svg/SideBarIcons_White/home_icon.svg';

class MainToolBar extends Component {
  render() {
    return (
      <div className="col-md-1 sidebar">
        <button type="button" className="list-group-item row sidebar-item">
          <img alt='' src={home_icon} className='sidebar-item-icon'/>
        </button>
        <button type="button" onClick={this.props.handleCalendarClick} className="list-group-item row sidebar-item">
          <img alt='' src={calendar_icon} className='sidebar-item-icon'/>
        </button>
        <button type="button" onClick={this.props.handleTodoClick} className="list-group-item row sidebar-item">
          <img alt='' src={profile_icon} className='sidebar-item-icon'/>
        </button>
        <button type="button" className="list-group-item row sidebar-item">
          <img alt='' src={messaging_icon} className='sidebar-item-icon'/>
        </button>
        <button type="button" onClick={this.props.handleFriendsClick} className="list-group-item row sidebar-item">
          <img alt='' src={friends_icon} className='sidebar-item-icon'/>
        </button>
      </div>
    )
  }
}

export default MainToolBar;
