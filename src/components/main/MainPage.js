import React, {Component} from 'react';
import MainNavBar from './MainNavBar';
import MainToolBar from './MainToolBar';
import TodoList from '../utilities/TodoList';
import Calendar from '../utilities/Calendar';
import '../../assets/scss/_MainPage.scss';

class MainPage extends Component {

  state = {
    todo: false,
    calendar: false
  }

  handleTodoClick = () => {
    this.setState({todo: !this.state.todo});
  }
  handleCalendarClick = () => {
    this.setState({calendar: !this.state.calendar});
  }

  render() {
    return (
      <div className='main-page'>
        <MainNavBar />
        <MainToolBar handleTodoClick={this.handleTodoClick} handleCalendarClick={this.handleCalendarClick}/>
        {this.state.todo && <TodoList user={this.props.location.state.user} />}
        {this.state.calendar && <Calendar user={this.props.location.state.user} />}
      </div>
    )
  }
}

export default MainPage;
