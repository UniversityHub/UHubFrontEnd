import axios from 'axios';

class StudyGroupsService {
  initialize = (user) => {
    axios.post('http://localhost:4200/groups/initialize', {
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
    return axios.post('http://localhost:4200/groups/all')
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err))
  }

  //Retrieve friends for a user
  getFriends = (user) => {
    return axios.post('http://localhost:4200/groups/friends', {
      userID: user,
    })
    .then(res => {
      return res.data[0].friends;
    })
    .catch(err => console.log(err))
  }

  addFriend = (user, friends) => {
    axios.post('http://localhost:4200/groups/add-friend-to-group', {
      userID: user,
      friends: friends,
    })
    .then(res => {
      console.log('entry successfully added');
    })
    .catch(err => console.log(err))
  }
}

export default StudyGroupsService;
