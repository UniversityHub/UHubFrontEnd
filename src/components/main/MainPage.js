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
import './MainPage.css'
import '../../assets/scss/_MainPage.scss';

class MainPage extends Component {

  state = {
    todo: false,
    calendar: false,
    friends: false,
    filter: true,
    password: '',
    selectOne: '',
    selectTwo: '',
    selectThree: '',
    selectFour: '',
    select: ['None', 'None', 'None', 'None'],
  }

  constructor(props) {
    super(props);
    this.addUserService = new UserInfoService();
  }

  componentWillMount(){
    this.addUserService.getUser(this.props.location.state.user)
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

  searchPorts = (id, type) => {
    if(type === 'None') return -1;
    const index = this.state.select.indexOf(type);
    if(index === id) return -1;
    return index;
  }

  handleSelectionChange = (id, type) => {
    const validate = this.searchPorts(id, type);


    let selectArr = this.state.select.slice();
    if(validate > 3) {
      if(type === 'None') {
        selectArr[id] = '';
      }else {
        selectArr[id] = type;
      }
    }else {
      selectArr[validate] = selectArr[id];
      selectArr[id] = type;
    }
    this.setState({select: selectArr});
    return;
  }

  renderResource = (id) => {
    const type = this.state.select[id];

    switch (type) {
      case 'None':
        return;
        break;
      case 'Piazza':
        return <Resource api='piazza' user={this.props.location.state.user} password={this.state.password}/>
        break;
      case 'Portal':
        return <PortalOffice />
        break;
      case 'Transportation':
        return (
          <div className='h_iframe'>
            <iframe src="http://citybus.doublemap.com/map/" width="640" height="480" />
          </div>
        )
        break;
      case 'Blackboard':
      return (
        <div className='h_iframe'>
          <iframe src="https://mycourses.purdue.edu/" width="640" height="480" />
        </div>
      )
      break;
    }
  }

  handleFriendsClick = () => {
    this.setState({friends: !this.state.friends});
  }

  // selectionMenu = () => {
  //   return (
  //     <div className='row'>
  //       <div className='col-md-6'>
  //         <SelectionMenu handleChange={this.handleSelectionChange}/>
  //       </div>
  //       <div className='col-md-6'>
  //         <SelectionMenu handleChange={this.handleSelectionChange}/>
  //       </div>
  //     </div>
  //   )
  // }

  render() {
    console.log(this.state)
    const { todo, friends, calendar, select } = this.state;
    return (
      <div className='main-page'>
        <MainNavBar
          handleTodoClick={this.handleTodoClick} handleFriendsClick={this.handleFriendsClick} handleSettingClick={this.handleSettingClick} handleCalendarClick={this.handleCalendarClick}/>
        <div>
          <div className='row'>
            <div className='col-md-6 subdivision'>
              <div>
                <SelectionMenu handleChange={this.handleSelectionChange} value={select[0]} id={0} />
              </div>
              <div className='container-fluid resource-div'>
                {this.renderResource(0)}
              </div>
            </div>
            <div className='col-md-6 subdivision'>
              <div>
                <SelectionMenu handleChange={this.handleSelectionChange} value={select[1]} id={1}/>
              </div>
              <div className='container-fluid resource-div'>
                {this.renderResource(1)}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 subdivision'>
              <div>
                <SelectionMenu handleChange={this.handleSelectionChange} value={select[2]} id={2}/>
              </div>
              <div className='container-fluid resource-div'>
                {this.renderResource(2)}
              </div>
            </div>
            <div className='col-md-6 subdivision'>
              <div>
                <SelectionMenu handleChange={this.handleSelectionChange} value={select[3]} id={3}/>
              </div>
              <div className='container-fluid resource-div'>
                {this.renderResource(3)}
              </div>
            </div>
          </div>
          {todo && <TodoList user={this.props.location.state.user} />}
          {friends && <ConnectwithFriends user={this.props.location.state.user} />}
          {calendar && <Calendar user={this.props.location.state.user} />}
        </div>
      </div>
    )
  }
}

export default MainPage;
