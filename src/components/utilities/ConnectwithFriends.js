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
    friendModal: [false, ''],
    friendClasses: [],
    userClasses: [],
    commonClasses: [],
  }

  constructor(props) {
    super(props);
    this.addConnectwithFriendsService = new ConnectwithFriendsService();
    this.UserInfoService = new UserInfoService();
    this.PiazzaService = new PiazzaService();
  }

  componentWillMount() {
    if(this.state.friendModal[0]) {
      console.log('mama i made it');
      this.friendInfo(this.state.friendModal[1]);
      this.compareClasses();
    }
    this.addConnectwithFriendsService.getFriends(this.props.user)
      .then(result => {
        this.setState({friends: result})
      })
      .catch(err => console.log(err))
    this.addConnectwithFriendsService.getAllUsers()
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
    this.UserInfoService.getUser(this.props.user)
    .then(user => {
      const apiList = user.apiLogin;
      const apiObj = apiList.find(elem => {
        return elem.name === 'piazza';
      })
      if(typeof apiObj !== 'object') {
        return;
      }else {
        this.PiazzaService.login(apiObj.user, apiObj.pass)
        .then(piazzaFriend => {
          const classes = piazzaFriend.classes;
          const activeClasses = classes.filter(elem => {
            return elem.status === 'active';
          })
          const classNames = activeClasses.map(elem => {
            return elem.name;
          })
          this.setState({userClasses: classNames});
        })
      }
    })
  }

  handleCloseModal = () => {
    const arr = [false, ''];
    this.setState({
      friendModal: arr,
      commonClasses: [],
      friendClasses: []
    });
  }

  //CONNECT TO USER
  handleConnect = (index) => {
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
    this.friendInfo(modalArr[1]);
    //this.compareClasses();
    this.setState({friendModal: modalArr})
  }



  friendInfo = (friend) => {
    this.UserInfoService.getUser(friend)
    .then(user => {
      const apiList = user.apiLogin;
      const apiObj = apiList.find(elem => {
        return elem.name === 'piazza';
      })
      if(typeof apiObj !== 'object') {
        return;
      }else {
        this.PiazzaService.login(apiObj.user, apiObj.pass)
        .then(piazzaFriend => {
          const classes = piazzaFriend.classes;
          const activeClasses = classes.filter(elem => {
            return elem.status === 'active';
          })
          const classNames = activeClasses.map(elem => {
            return elem.name;
          })
          this.setState({friendClasses: classNames});
          this.compareClasses(classNames)
        })
      }
    })
    //this.compareClasses();
  }

  compareClasses = (friendClasses) => {
    const { userClasses/*, friendClasses*/} = this.state;
    //console.log(userClasses);
    //console.log(friendClasses);
    let newArr = userClasses.filter(elem => {
      return friendClasses.indexOf(elem) >= 0;
    })
    newArr.concat(friendClasses.filter(elem => {
      return newArr.indexOf(elem) >=0;
    }))
    //console.log(newArr);
    this.setState({commonClasses: newArr})
  }

  displayCommonClasses = () => {
    if(!this.state.commonClasses.length) {
      return (
        <div>
          <li className="list-group-item disabled">
            NO CLASSES
          </li>
        </div>
      )
    }
    return this.state.friendClasses.map((elem, index) => {
      let bool = false;
      if(this.state.userClasses.includes(elem)) bool = true;
      return (
        <li className='list-group-item' key={index}>
          {elem}
          {bool && <span className="badge">In Common</span>}
        </li>
      )
    })
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

  render() {
    console.log(this.state);
    const { friends, allUsers, friendModal, commonClasses } = this.state;
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
          {/* {friendModal[0] && this.compareClasses()} */}
          {friendModal[0] &&
            <div>
              <h2>Classes: </h2>
              <ul className='list-group container-fluid'>
                {this.displayCommonClasses()}
              </ul>
            </div>
          }
        </Modal>
      </div>

    )
  }


}

export default ConnectwithFriends;
