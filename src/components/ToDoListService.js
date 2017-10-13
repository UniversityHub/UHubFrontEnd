import axios from 'axios';

class ToDoItemService {
  initialize = (user) => {
    axios.post('http://localhost:4200/todoList/initialize', {
      userID: user,
      entries: [],
    })
    .then(res => {
      console.log(res);
      this.setState({ todoList: res.data })
    })
    .catch(err => console.log(err))
  }

  addEntry = (user, entries) => {
    axios.post('http://localhost:4200/todoList/add-entry', {
      userID: user,
      items: entries,
    })
    .then(res => {
      console.log('entry successfully added');
    })
    .catch(err => console.log(err))
  }
}

export default ToDoItemService;
