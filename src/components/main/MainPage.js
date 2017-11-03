import React, {Component} from 'react';
import MainNavBar from './MainNavBar';
import MainToolBar from './MainToolBar';
import TodoList from '../utilities/TodoList';
import Calendar from '../utilities/Calendar';
import ConnectwithFriends from '../utilities/ConnectwithFriends';
import Resource from '../resources/Resource';
import PortalOffice from '../resources/PortalOffice/PortalOffice';
import SelectionMenu from './SelectionMenu';
import UserInfoService from '../UserInfoService';
import '../../assets/scss/_MainPage.scss';

class MainPage extends Component {

  state = {
    todo: false,
    calendar: false,
    friends: false,
    piazza: false,
    portal: false,
    filter: true,
    password: ''
  }

  constructor(props) {
    super(props);
    this.addUserService = new UserInfoService();
  }

  componentWillMount(){
    this.addUserService.getPassword(this.props.location.state.user)
      .then(result => {
        this.setState({password: result.userPassword});
      })
      .catch(err => console.log(err));
  }

  handleTodoClick = () => {
    this.setState({todo: !this.state.todo});
  }
  handleCalendarClick = () => {
    this.setState({calendar: !this.state.calendar});
  }
  handleSettingClick = () => {
    this.props.history.push({
      pathname: '/settings',
      state: {
        user: this.props.location.state.user,
      },
    });
  }

  handleSelectionChange = (id) => {
    this.setState({filter: !this.state.filter})
    if(id === 'Piazza') {
      this.setState({piazza: !this.state.piazza});
    }else if (id === 'Portal') {
      this.setState({portal: !this.state.portal});
    }
  }
  handleFriendsClick = () => {
    this.setState({friends: !this.state.friends});
  }

  render() {
    return (
      <div className='main-page'>
        <MainNavBar />
        <MainToolBar handleTodoClick={this.handleTodoClick} handleFriendsClick={this.handleFriendsClick} handleSettingClick={this.handleSettingClick} handleCalendarClick={this.handleCalendarClick}/>
        <div className='col-md-6'>
          {this.state.filter && <SelectionMenu handleChange={this.handleSelectionChange}/>
          }
          {this.state.piazza && <Resource api='piazza' user={this.props.location.state.user} password={this.state.password}/>}
          {this.state.portal && <PortalOffice />}
        </div>
        {this.state.todo && <TodoList user={this.props.location.state.user} />}
        {this.state.friends && <ConnectwithFriends user={this.props.location.state.user} />}
        {this.state.calendar && <Calendar user={this.props.location.state.user} />}
      </div>
    )
  }
}

export default MainPage;
