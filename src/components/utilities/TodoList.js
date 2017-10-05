import React, { Component } from 'react';
import axios from 'axios';
import ToDoListService from '../ToDoListService';
import '../../assets/scss/_ToDoList.css'


class TodoList extends Component {
  state = {
    value: '',
    entries: [],
    numOfEntries: 0,
  }

  constructor(props) {
    super(props);
    this.addTodoListService = new ToDoListService();
  }

  componentWillMount = () => {
    axios.post('http://localhost:4200/todoList/get-user-list', {
      userID: this.props.user,
    })
    .then(res => {
      console.log('res: ' + JSON.stringify(res.data[0].items));
      var data = JSON.stringify(res.data[0].items);
      console.log(data);
      this.setState({entries: data});
      console.log('this.state.entries: ' + this.state.entries);
    })
    .catch(err => this.setState({entries: ['']}));
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleAdd = () => {
    const arr = this.state.entries.slice();
    arr.push(this.state.value);
    this.setState({entries: arr}, function(){
      this.addTodoListService.addEntry(this.props.user, this.state.entries);
    })
  }

  displayListData = () => {
    return this.state.entries.map((elem,index) => {
      return <li key={index}>{elem}</li>
    })
  }

  render() {
    return (
      <div className='col-md-4'>
        <div id="myDIV" className="header">
          <h2>My To Do List</h2>
          <input type="text" value={this.state.value} id="myInput" placeholder="Title..." onChange={this.handleChange}/>
          <span onClick={this.handleAdd} className="addBtn">Add</span>
        </div>
        <ul id="myUL">
          {this.displayListData()}
        </ul>
      </div>
    )
  }
}

export default TodoList;
