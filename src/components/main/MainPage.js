import React, {Component} from 'react';
import MainNavBar from './MainNavBar';
import MainToolBar from './MainToolBar';
import TodoList from '../utilities/TodoList';
import Calendar from '../utilities/Calendar';
import ConnectwithFriends from '../utilities/ConnectwithFriends';
import Resource from '../resources/Resource';
import SelectionMenu from './SelectionMenu';
import '../../assets/scss/_MainPage.scss';

class MainPage extends Component {

  state = {
    todo: false,
    calendar: false,
    friends: false,
    piazza: false
  }

  handleTodoClick = () => {
    this.setState({todo: !this.state.todo});
  }
  handleCalendarClick = () => {
    this.setState({calendar: !this.state.calendar});
  }
  handleSelectionChange = (id) => {
    this.setState({piazza: !this.state.piazza});
  }
  handleFriendsClick = () => {
    this.setState({friends: !this.state.friends});
  }

  render() {
    return (
      <div className='main-page'>
        <MainNavBar />
        <MainToolBar handleFriendsClick={this.handleFriendsClick} handleTodoClick={this.handleTodoClick} handleCalendarClick={this.handleCalendarClick}/>
        <div className='col-md-6'>
          {!this.state.piazza && <SelectionMenu handleChange={this.handleSelectionChange}/>}
          {this.state.piazza && <Resource api='piazza' user={this.props.location.state.user} password={this.props.location.state.password}/>}
        </div>
        {this.state.todo && <TodoList user={this.props.location.state.user} />}
        {this.state.friends && <ConnectwithFriends user={this.props.location.state.user} />}
        {this.state.calendar && <Calendar user={this.props.location.state.user} />}
      </div>
    )
  }
}

export default MainPage;
