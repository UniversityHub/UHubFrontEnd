import React, { Component } from 'react';
import axios from 'axios';
import ToDoListService from '../ToDoListService';
import '../../assets/scss/_ToDoList.css'


class TodoList extends Component {
  state = {
    value: '',
    entries: [],
    objEntries: [],
    numOfEntries: 0,
  }

  constructor(props) {
    super(props);
    this.addTodoListService = new ToDoListService();
  }

  // componentWillMount = () => {
  //   axios.post('http://localhost:4200/todoList/get-user-list', {
  //     userID: this.props.user,
  //   })
  //   .then(res => {
  //     console.log('res: ' + JSON.stringify(res.data[0].items));
  //     var data = JSON.stringify(res.data[0].items);
  //     console.log(data);
  //     this.setState({entries: data});
  //     console.log('this.state.entries: ' + this.state.entries);
  //   })
  //   .catch(err => this.setState({entries: ['']}));
  // }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleAdd = () => {

    const arr = this.state.entries.slice();
    arr.push(this.state.value);
    this.setState({entries: arr}, function(){
      this.addTodoListService.addEntry(this.props.user, arr);
      //this.addTodoListService.saveTask(this.state.value);
    })
  }

  handleDel = (index) =>{
    console.log('index = ' + index);
    const arr = this.state.entries.slice();
    arr.splice(index, 1);
    this.setState({entries: arr}, function(){
      this.addTodoListService.deleteEntry(this.props.user, arr);
    })
  }

  displayListData = () => {
    return this.state.entries.map((elem,index) => {
      return (
        <div className='row' key={index}>
          <li key={index} className='container-fluid'>
            <div className='col-md-4'>{elem}</div>
            <span onClick={()=>this.handleDel(index)} className="btn btn-success col-md-offset-4">Done</span>
          </li>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='col-md-4'>
        <div id="myDIV" className="header">
          <h2>My To Do List</h2>
          <input type="text" value={this.state.value} id="myInput" placeholder="Task" onChange={this.handleChange}/>
          <span onClick={this.handleAdd} className="addBtn">Add</span>
          {/*<span onClick={this.handleAdd} className="delBtn">Done</span>*/}
        </div>
        <ul id="myUL">
          {this.displayListData()}
        </ul>
      </div>
    )
  }
}

export default TodoList;
