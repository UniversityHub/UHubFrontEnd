import React, { Component } from 'react';
import axios from 'axios';
import ConnectwithFriendsService from '../ConnectwithFriendsService';
import UserInfoService from '../UserInfoService';
import PiazzaService from '../PiazzaService';

import Modal from 'react-responsive-modal';

class ConnectwithFriends extends Component {
  state = {
    friends: [],
    allUsers: [],
    friendModal: [false, '']
  }

  constructor(props) {
    super(props);
    this.addConnectwithFriendsService = new ConnectwithFriendsService();
    this.UserInfoService = new UserInfoService();
    this.PiazzaService = new PiazzaService();
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
        //console.log(final);
        this.setState({allUsers: final});
      })
      .catch(err => console.log(err));
  }

  handleCloseModal = () => {
    const arr = [false, ''];
    this.setState({friendModal: arr});
  }

  //CONNECT TO USER
  handleConnect = (index) => {
    console.log("Trying to connect");
    const { allUsers, friends } = this.state;
    const friend = allUsers[index];
    let friendArr = friends.slice();
    friendArr.push(friend);

    this.addConnectwithFriendsService.addFriend(this.props.user, friendArr, friend);
    this.setState({friends: friendArr});
  }

  //CHECK FRIEND INFO
  handleInfo = (index) => {
    const modalArr = this.state.friendModal.slice();
    modalArr[0] = true;
    modalArr[1] = this.state.friends[index];
    this.setState({friendModal: modalArr})
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
         <li className="list-group-item" key={index} onClick={()=>this.handleInfo(index)}>
           {elem}
           <span className="badge">Connected</span>
         </li>
      )
    });

  }

  displayAllUsers = () => {
    //console.log(this.state.allUsers)
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

  friendInfo = (friend) => {
    return this.UserInfoService.getUser(friend)
    .then(user => {
      console.log('friend Info:');
      console.log(user);
      const apiList = user.apiLogin;
      const apiObj = apiList.find(elem => {
        return elem.name === 'piazza';
      })
      console.log('friend api object: ')
      console.log(apiObj);
      //console.log(typeof apiObj === 'object');
      if(typeof apiObj !== 'object') {
        return (<h3>No Similar Classes</h3>)
      }
    })

  }

  render() {
    console.log(this.state);
    const { friends, allUsers, friendModal } = this.state;
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

        <Modal open={friendModal[0]} onClose={this.handleCloseModal} little>
          <h1>{friendModal[1]}</h1>
          <hr />
          {friendModal[0] && this.friendInfo(friendModal[1])}
        </Modal>
      </div>

    )
  }


}

export default ConnectwithFriends;
