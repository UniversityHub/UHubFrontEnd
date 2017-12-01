import React, { Component } from 'react';
import axios from 'axios';
import ConnectwithFriendsService from '../ConnectwithFriendsService';

class ConnectwithFriends extends Component {
  state = {
    friends: [],
    allUsers: [],
  }

  constructor(props) {
    super(props);
    this.addConnectwithFriendsService = new ConnectwithFriendsService();
  }

  componentWillMount() {
    this.addConnectwithFriendsService.getFriends(this.props.user)
      .then(result => {
        this.setState({friends: result})
      })
      .catch(err => console.log(err))
    this.addConnectwithFriendsService.getAllUsers()
      .then(result => {
        console.log(result);
        let arr = result.filter((elem, index) => {
          return elem.userID !== this.props.user
        })
        let final = arr.map((elem, index) => {
          return elem.userID;
        })
        console.log(final);
        this.setState({allUsers: final});
      })
      .catch(err => console.log(err));
  }

  handleConnect = (index) => {
    console.log("Trying to connect");
    const { allUsers, friends } = this.state;
    const friend = allUsers[index];
    let friendArr = friends.slice();
    friendArr.push(friend);

    this.addConnectwithFriendsService.addFriend(this.props.user, friendArr, friend);
    this.setState({friends: friendArr});
  }

  displayFriends = () => {
    if(!this.state.friends.length) {
      return (
        <div>
          <li className="list-group-item disabled">
            NO FRIENDS
          </li>
        </div>
      )
    }
    return this.state.friends.map((elem, index) => {
      return (
         <li className="list-group-item" key={index}>
           {elem}
           <span className="badge">Connected</span>
         </li>
      )
    });

  }

  displayAllUsers = () => {
    console.log(this.state.allUsers)
    return this.state.allUsers.map((elem, index) => {
      const bool = this.state.friends.includes(elem);
      return (
        <li className="list-group-item" key={index}>
           {elem}
           {bool && <span className="badge">Connected</span>}
           {!bool && <span className="badge" onClick={()=>this.handleConnect(index)}>Connect</span>}
         </li>
      )
    });
  }

  render() {
    return (
      <div className='col-md-4'>

        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#allUsers">All Users</a></li>
          <li><a data-toggle="tab" href="#friends">Friends</a></li>
        </ul>

        <div className="tab-content">
          <div id="allUsers" className="tab-pane fade in active">
            <ul className="list-group">
              {this.displayAllUsers()}
            </ul>
          </div>
          <div id="friends" className="tab-pane fade">
            <ul className="list-group">
              {this.displayFriends()}
            </ul>
          </div>
        </div>
      </div>

    )
  }


}

export default ConnectwithFriends;
