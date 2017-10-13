import React, { Component } from 'react';
import axios from 'axios';
import UserInfoService from '../UserInfoService';

class ForgotPassword extends Component {

  state = {
    user: '',
    email: '',
    password: '',
    passwordRepeat: '',
  }

  constructor(props) {
    super(props);
    this.addUserService = new UserInfoService();
  }

  authenticateData = (user, email) => {
    return axios.post('http://localhost:4200/UserInfos/authenticate-email', {
      userID: user,
      userEmail: email
    })
    .then(res => {
      console.log('have we attempted to authenticate?')
      if(res.data.length) {
        alert('It worked?');
        this.addUserService.revisePassword(user, this.state.password);
        this.addUserService.sendEmail(email, this.state.password);
        this.props.history.push('/login');
      }else {
        alert('Wrong Email and/or User!');
      }
    })
    .catch(err => console.log(err));
  }

  handleEmailChange = (event) => {
    this.setState({ email : event.target.value })
  }

  handleUserChange = (event) => {
    this.setState({ user : event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password : event.target.value })
  }

  handlePasswordRepeatChange = (event) => {
    this.setState({ passwordRepeat : event.target.value })
  }

  handleSubmit = (event) => {
    const validated = this.validate();
    if(validated) {
      event.preventDefault();
      console.log('we not validated')
      return;
    }
    this.authenticateData(this.state.user, this.state.email);
  }

  validate = () => {
    const { password, passwordRepeat } = this.state;
    const specChar = /[!@#$%^&*]/g;
    const num = /[0-9]/g

    if(password.length < 6 || password.length > 32) {
      alert('New Password must be greater than 6 characters AND less than 32 characters!');
      return 1;
    } else if(password !== passwordRepeat) {
      alert('Your passwords MUST match!');
      return 1;
    } else if(!password.search(specChar) || !password.search(num)) {
      alert('Your password MUST contain at least ONE special character or ONE num!');
      return 1;
    }
    return 0;
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='container'>
          <h1 className='text-center'>Forgot Password</h1>
        </div>
        <form onSubmit={this.handleSubmit} className='col-md-10 col-md-offset-1'>
          <div className='form-group'>
            <label>
              Email:
            </label>
            <input id='email' type='email' value={this.state.email} className="form-control" placeholder="Email" onChange={this.handleEmailChange}/>
          </div>
          <div className='form-group'>
            <label>
              User
            </label>
            <input type='user' id='user' value={this.state.user} className="form-control" placeholder="Username" onChange={this.handleUserChange}/>
          </div>
          <div className='row containter-fluid'>
            <div className='form-group col-md-6'>
              <label>
                New Password
              </label>
              <input type='password' id='password' value={this.state.password} className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
            </div>
            <div className='form-group col-md-6'>
              <label>
                Confirm New Password
              </label>
              <input type='password' value={this.state.passwordRepeat} className="form-control" placeholder="Confirm Password" onChange={this.handlePasswordRepeatChange}/>
            </div>
          </div>
          <div className='container-fluid row'>
            {/* <Link to='/login'> */}
              <button className="btn btn-default col-md-12" >
                Submit
              </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    )
  }

}

export default ForgotPassword
