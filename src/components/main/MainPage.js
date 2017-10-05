import React, {Component} from 'react';
import MainNavBar from './MainNavBar';
import MainToolBar from './MainToolBar';
import TodoList from '../utilities/TodoList';
import '../../assets/scss/_MainPage.scss';

class MainPage extends Component {

  state = {
    todo: false
  }

  handleClick = () => {
    this.setState({todo: !this.state.todo});
  }

  render() {
    return (
      <div className='main-page'>
        <MainNavBar />
        <MainToolBar handleClick={this.handleClick}/>
        {this.state.todo && <TodoList user={this.props.location.state.user} handleClick={this.handleClick}/>}
      </div>
    )
  }
}

export default MainPage;
