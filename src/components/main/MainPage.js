import React, {Component} from 'react';
import MainNavBar from './MainNavBar';
import MainToolBar from './MainToolBar';
import TodoList from '../utilities/TodoList';
import Calendar from '../utilities/Calendar';
import Resource from '../resources/Resource';
import PortalOffice from '../resources/PortalOffice/PortalOffice';
import SelectionMenu from './SelectionMenu';
import '../../assets/scss/_MainPage.scss';

class MainPage extends Component {

  state = {
    todo: false,
    calendar: false,
    piazza: false,
    portal: false,
    filter: true
  }

  handleTodoClick = () => {
    this.setState({todo: !this.state.todo});
  }
  handleCalendarClick = () => {
    this.setState({calendar: !this.state.calendar});
  }
  handleSelectionChange = (id) => {
    this.setState({filter: !this.state.filter})
    if(id === 'Piazza') {
      this.setState({piazza: !this.state.piazza});
    }else if (id === 'Portal') {
      this.setState({portal: !this.state.portal});
    }
  }

  render() {
    return (
      <div className='main-page'>
        <MainNavBar />
        <MainToolBar handleTodoClick={this.handleTodoClick} handleCalendarClick={this.handleCalendarClick}/>
        <div className='col-md-6'>
          {this.state.filter && <SelectionMenu handleChange={this.handleSelectionChange}/>}
          {this.state.piazza && <Resource api='piazza' user={this.props.location.state.user} password={this.props.location.state.password}/>}
          {this.state.portal && <PortalOffice />}
        </div>
        {this.state.todo && <TodoList user={this.props.location.state.user} />}
        {this.state.calendar && <Calendar user={this.props.location.state.user} />}
      </div>
    )
  }
}

export default MainPage;
