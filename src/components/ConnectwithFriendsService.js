import axios from 'axios';

class FriendService {
  initialize = (user) => {
    axios.post('http://localhost:4200/connect/initialize', {
      userID: user,
      friends: [],
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
  }

  //grab user ID from all user list
  getAllUsers = () => {
    return axios.post('http://localhost:4200/connect/all')
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err))
  }

  //Retrieve friends for a user
  getFriends = (user) => {
    return axios.post('http://localhost:4200/connect/friends', {
      userID: user,
    })
    .then(res => {
      return res.data[0].friends;
    })
    .catch(err => console.log(err))
  }

  addFriend = (user, friends, friend) => {
    axios.post('http://localhost:4200/connect/add-friend', {
      userID: user,
      friends: friends,
      friend: friend    
    })
    .then(res => {
      console.log('entry successfully added');
    })
    .catch(err => console.log(err))
  }
}

export default FriendService;
