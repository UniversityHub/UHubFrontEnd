import React, { Component } from 'react';
import '../../assets/scss/_SignUp.scss';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import UserInfoService from '../UserInfoService';
import ToDoListService from '../ToDoListService';
import CalendarService from '../CalendarService';
//import classNames from 'classnames';

class SignUp extends Component {

  state = {
    user: '',
    email: '',
    password: '',
    passwordRepeat: '',
    submitted: false,
  }

  constructor(props) {
    super(props);
    this.addUserService = new UserInfoService();
    this.addTodoListService = new ToDoListService();
    this.CalendarService = new CalendarService();
  }

  checkUser = (user) => {
    return axios.post('http://localhost:4200/UserInfos/check-user', {
      userID: user,
    })
    .then(res => {
      console.log('within user check');
      if(res.data.length) {
        alert('Username already taken!');
      }else {
        this.checkEmail(this.state.email);
      }
    })
    .catch(err => console.log(err));
  }

  checkEmail = (email) => {
    const obj = {
      UHub: {
        user: this.state.user,
        pass: this.state.password,
      }
    }
    const arr = [];
    arr.push(obj);
    return axios.post('http://localhost:4200/UserInfos/check-email', {
      userEmail: email
    })
    .then(res => {
      if(res.data.length) {
        alert('Email already taken!');
      }else {
        this.addUserService.sendData(this.state.email, this.state.user, this.state.password);
        console.log('user data sent');
        this.CalendarService.initialize(this.state.user);
        this.addTodoListService.initialize(this.state.user);
        console.log('todo list data sent');
        this.props.history.push('/login');
      }
    })
    .catch(err => console.log(err));
  }

  validate = () => {
    const { user, password, passwordRepeat } = this.state;
    const specChar = /[!@#$%^&*]/g;
    const num = /[0-9]/g

    if(user.length < 6 || user.length > 32) {
      alert('Username must be greater than 6 characters AND less than 32 characters!');
      return 1;
    } else if(password.length < 6 || password.length > 32) {
      alert('Password must be greater than 6 characters AND less than 32 characters!');
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

  handleSubmit = (event) => {
    event.preventDefault();
    const validated = this.validate();
    if(validated) {
      event.preventDefault();
      console.log('we not validated')
      return;
    }

    this.checkUser(this.state.user);
  }

  // handleChange = (value, event) => {
  //   this.setState({
  //     [event.target.id]: value,
  //   });
  // }

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

  render() {

    return (
      <div className='container-fluid'>
        <div className='container'>
          <h1 className='text-center'>Sign Up!</h1>
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
                Password
              </label>
              <input type='password' id='password' value={this.state.password} className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
            </div>
            <div className='form-group col-md-6'>
              <label>
                Confirm Password
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

export default SignUp;
