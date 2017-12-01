import React, { Component } from 'react';
import axios from 'axios';
import StudyGroupsService from '../StudyGroupsService';

class StudyGroups extends Component {
  state = {
    friends: [],
    allUsers: [],
  }

  constructor(props) {
    super(props);
    this.addStudyGroupsService = new StudyGroupsService();
  }

  componentWillMount() {
    this.addStudyGroupsService.getFriends(this.props.user)
      .then(result => {
        this.setState({friends: result})
      })
      .catch(err => console.log(err))
    this.addStudyGroupsService.getAllUsers()
      .then(result => {

        let arr = result.filter((elem, index) => {
          return elem.userID !== this.props.user
        })
        let final = arr.map((elem, index) => {
          return elem.userID;
        })

        this.setState({allUsers: final});
      })
      .catch(err => console.log(err));
  }

  handleConnect = (index) => {

    const { allUsers, friends } = this.state;
    const friend = allUsers[index];
    let friendArr = friends.slice();
    friendArr.push(friend);

    this.addStudyGroupsService.addFriend(this.props.user, friendArr);
    this.setState({friends: friendArr});
  }

  handleRemove = (index) => {
    const arr = this.state.friends.slice();
    arr.splice(index, 1);
    this.setState({friends: arr});
    this.addStudyGroupsService.addFriend(this.props.user, arr);
  }

  displayFriends = () => {
    if(!this.state.friends.length) {
      return (
        <div>
          <li className="list-group-item disabled">NO FRIENDS
          </li>
        </div>
      )
    }
    return this.state.friends.map((elem, index) => {
      return (
         <li className="list-group-item" key={index}>{elem}
           <span className="badge" onClick={()=>this.handleRemove(index)}>Remove</span>
         </li>

      )
    });

  }

  displayAllUsers = () => {

    return this.state.allUsers.map((elem, index) => {
      const bool = this.state.friends.includes(elem);
      return (
        <li className="list-group-item" key={index}>
           {elem}
           {bool && <span className="badge">Added</span>}
           {!bool && <span className="badge" onClick={()=>this.handleConnect(index)}>Add to group</span>}
         </li>
      )
    });
  }

  render() {
    return (
      <div className='col-md-4'>
        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#users">All Users</a></li>
          <li><a data-toggle="tab" href="#groups">Study Group</a></li>
        </ul>

        <div className="tab-content">
          <div id="users" className="tab-pane fade in active">
            <ul className="list-group">
              {this.displayAllUsers()}
            </ul>
          </div>
          <div id="groups" className="tab-pane fade">
            <ul className="list-group">
              {this.displayFriends()}
            </ul>
          </div>
        </div>
      </div>

    )
  }


}

export default StudyGroups;
