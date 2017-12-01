import axios from 'axios';

class ToDoItemService {
  initialize = (user) => {
    axios.post('http://localhost:4200/todoList/initialize', {
      userID: user,
      entries: [],
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
  }

  addEntry = (user, entries) => {
    console.log(user);
    console.log(entries);
    axios.post('http://localhost:4200/todoList/add-entry', {
      userID: user,
      items: entries,
    })
    .then(res => {
      console.log('entry successfully added');
    })
    .catch(err => console.log(err))
  }

  deleteEntry = (user, entries) => {
    console.log(user);
    console.log(entries);
    axios.post('http://localhost:4200/todoList/delete-entry', {
      userID: user,
      items: entries,
    })
    .then(res => {
      console.log('entry successfully deleted');
    })
    .catch(err => console.log(err))
  }

  //Retrieve events to update Calendar
  retrieveEntries = (user) => {
    return axios.post('http://localhost:4200/todoList/entries', {
      userID: user
    })
    .then(res => {
      console.log(res.data[0]);
      return res.data[0];
    })
    .catch(err => console.log(err))
  }

  /*saveTask = (entry) => {
    axios.post('http://localhost:4200/todoList/saveTask', {
      //userID: user,
      entries: entry
    })
    .then(res => {
      console.log(res);
      // this.setState({ todoList: res.data })
    })
    .catch(err => console.log(err))
  }*/

}

export default ToDoItemService;
