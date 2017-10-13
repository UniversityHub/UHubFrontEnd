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
      console.log(res);
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
    console.log(apiList);
    return axios.post('http://localhost:4200/UserInfos/save-api', {
      userID: user,
      userPassword: pass,
      apiLogin: apiList,
    })
    .then(res => {
      console.log(res);
      console.log('API successfully saved');
    })
    .catch(err => {
      console.log(err);
    })
  }

  updateSchools = (user, pass, courseList) => {
    console.log(courseList);
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
    .then(res => res.data)
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
