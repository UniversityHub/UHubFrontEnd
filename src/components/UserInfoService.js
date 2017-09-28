import axios from 'axios';

class ItemService {
  sendData = (data, num) => {
    axios.post('http://localhost:4200/UserInfos/add/post', {
      userID: data,
      userPassword: num,
    })
    .then(res => this.setState({ userInfos: res.data }))
    .catch(err => console.log(err))
  }

  // updateData = (data, id) => {
  //   axios.post('http://localhost:4200/UserInfos/update/'+id, {
  //     item: data
  //   })
  //   .then(res => this.setState({ UserInfos: res.data }))
  //   .catch(err => console.log(err))
  // }
  //
  // deleteData = (id) => {
  //   axios.get('http://localhost:4200/UserInfos/delete/'+id)
  //   .then()
  //   .catch(err => console.log(err))
  // }
}

export default ItemService;
