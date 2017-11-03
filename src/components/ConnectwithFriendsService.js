import axios from 'axios';

class FriendService {
  initialize = (user) => {
    axios.post('http://localhost:4200/friendInfo/initialize', {
      userID: user,
      friends: [],
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
  }

  //grab user ID from all user list
  getUserID = (user) => {
    return axios.post('http://localhost:4200/friendInfo/')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  addFriend = (user, entries) => {
    console.log(user);
    axios.post('http://localhost:4200/friendInfo/add-friend', {
      userID: user,
      friends: entries,
    })
    .then(res => {
      console.log('entry successfully added');
    })
    .catch(err => console.log(err))
  }
}

export default FriendService;
