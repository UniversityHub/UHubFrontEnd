import axios from 'axios';

class UserItemService {
  sendData = (email, user, pass) => {
    axios.post('http://localhost:4200/UserInfos/add/post', {
      userID: user,
      userEmail: email,
      userPassword: pass,
    })
    .then(res => {
      console.log(res);
      this.setState({ userInfos: res.data })
    })
    .catch(err => console.log(err))
  }

  sendEmail = (email, pass) => {
    const str = '<b>your new password is ' + pass + '</b>';
    axios.post('http://localhost:4200/UserInfos/send-email', {
      to: email,
      subject: 'Password Change Confirmation',
      body: str,
    })
    .then(res => {
      console.log('email successfully sent');
    })
    .catch(err => {
      console.log(err);
      console.log('email did not send');
    })
  }

  revisePassword = (user, pass) => {
    axios.post('http://localhost:4200/UserInfos/revise-password', {
      userID: user,
      userPassword: pass,
    })
    .then(res => {
      console.log('password successfully changed');
    })
    .catch(err => console.log(err))
  }


  // authenticateData = (email, user, pass) => {
  //   var item = false
  //   return axios.post('http://localhost:4200/UserInfos/sendLogin', {
  //     userID: user,
  //     userEmail: email,
  //     userPassword: pass
  //   })
  //   .then(res => {
  //     console.log('length in promise: ' + res.data.length);
  //     //return res.data.length.json();
  //     return res.json();
  //   })
  //   .catch(err => console.log(err));
  // }

  // updateData = (data, id) => {
  //   axios.post('http://localhost:4200/UserInfos/update/'+id, {
  //     item: data
  //   })
  //   .then(res => this.setState({ userInfos: res.data }))
  //   .catch(err => console.log(err))
  // }
  //
  // deleteData = (id) => {
  //   axios.get('http://localhost:4200/UserInfos/delete/'+id)
  //   .then()
  //   .catch(err => console.log(err))
  // }
}

export default UserItemService;
