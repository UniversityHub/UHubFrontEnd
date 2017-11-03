import React, { Component } from 'react';
import axios from 'axios';
import ConnectwithFriendsService from '../ConnectwithFriendsService';

class ConnectwithFriends extends Component {
  state = {
    value: '',
    entries: [],
    objEntries: [],
    numOfEntries: 0,
  }

  constructor(props) {
    super(props);
    this.addConnectwithFriendsService = new ConnectwithFriendsService();
  }


  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleAdd = () => {
    const arr = this.state.entries.slice();
    arr.push(this.state.value);
    this.setState({entries: arr}, function(){
      this.addConnectwithFriendsService.addFriend(this.props.user, arr);
    })
  }
  handleGetUserID = () => {
    const arr = this.state.entries.slice();
    arr.push(this.state.value);
    this.setState({entries: arr}, function(){
      this.addConnectwithFriendsService.getUserID(this.props.user, arr);
    })
  }


  displayListData = () => {
    return this.state.entries.map((elem,index) => {
      return (
        <div className='row' key={index}>
          <li key={index} className='container-fluid'>
            <div className='col-md-4'>{elem}</div>
          </li>
        </div>
      )
    })
  }

  render() {
    console.log('I make it here');
    return (
      <div className='col-md-4'>
        <div id="myDIV" className="header">
          <h2>My Friends</h2>
            <table>
              <tr>
                <th>Username</th>
              </tr>
              <tr>
                <td>John</td>
              </tr>
              <tr>
                <td>Jane</td>
              </tr>
              <span onClick={this.handleGetUserID} className="addBtn">Add</span>
              </table>
        </div>
        <ul id="myUL">
          {this.displayListData()}
        </ul>
      </div>

    )
  }


}

export default ConnectwithFriends;
