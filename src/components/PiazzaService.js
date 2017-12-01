import axios from 'axios';
//import piazza from 'piazza-api';

class PiazzaService {
  login = (user, pass) => {
    var data = {};
    return axios.post('http://localhost:4200/piazza/get-piazza', {
      userID: user,
      userPassword: pass,
    })
    .then(res => {
      data = Promise.resolve((res));
      return data.then(res => res.data)
    })
    .catch(err => {
      console.log(err);
      return data;
    })
  }

  getLogin = (user, pass) => {
    return axios.post('http://localhost:4200/UserInfos/get-apis', {
      userID: user,
      userPassword: pass,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    })
  }

  saveApi = (user, pass, apiList) => {
    return axios.post('http://localhost:4200/UserInfos/save-api', {
      userID: user,
      userPassword: pass,
      apiLogin: apiList,
    })
    .then(res => {
      console.log('API successfully saved');
    })
    .catch(err => {
      console.log(err);
    })
  }

  postQuestion = (title, content, user, pass, classID, obj) => {
    console.log('IM A QUESTION');
    return axios.post('http://localhost:4200/piazza/posts/question', {
      title: title,
      content: content,
      username: user,
      password: pass,
      classID: classID,
      postObj: obj,
    })
    .then(res => console.log('successfully posted'))
    .catch(err => console.log(err))
  }

  postNote = (title, content, user, pass, classID, obj) => {
    console.log('IM A NOTE');
    return axios.post('http://localhost:4200/piazza/posts/note', {
      title: title,
      content: content,
      username: user,
      password: pass,
      classID: classID,
      postObj: obj,
    })
    .then(res => console.log('successfully posted'))
    .catch(err => console.log(err))
  }

  postAnswer = (postObj, answer) => {
    return axios.post('http://localhost:4200/piazza/posts/answer', {
      postObj: postObj,
      answer: answer,
    })
    .then(res => console.log('successfully posted'))
    .catch(err => console.log(err))
  }

  updateSchools = (user, pass, courseList) => {
    axios.post('http://localhost:4200/piazza/save-schools', {
      userID: user,
      userPassword: pass,
      courseList: courseList,
    })
    .then(res => {
      console.log('schools successfully updated');
    })
    .catch(err => console.log(err))
  }

  getPosts = (user, pass, currClass, currFolder) => {
    return axios.post('http://localhost:4200/piazza/posts', {
      userID: user,
      userPassword: pass,
      currClass: currClass,
      currFolder: currFolder
    })
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => console.log(err))
  }

  // updateDisplay = (user, pass, display) => {
  //   axios.post('http://localhost:4200/piazza/update-display', {
  //     userID: user,
  //     userPassword: pass,
  //     display: display,
  //   })
  //   .then(res => {
  //     console.log('schools successfully updated');
  //   })
  //   .catch(err => console.log(err))
  // }
  //
  // getDisplay = (user, pass, display) => {
  //   axios.post('http://localhost:4200/piazza/get-display', {
  //     userID: user,
  //     userPassword: pass
  //   })
  //   .then(res => {
  //     return res.data;
  //   })
  //   .catch(err => console.log(err))
  // }


}

export default PiazzaService;
