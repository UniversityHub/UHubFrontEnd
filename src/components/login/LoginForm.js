import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
import UserInfoService from '../UserInfoService';
import '../../assets/scss/_LoginForm.scss'

export default class MyComponent extends Component {

  state = {
    user: '',
    password: '',
    submitted: false
  }

  constructor(props) {
    super(props);
    this.addUserService = new UserInfoService();
  }

  authenticateData = (user, pass) => {
    return axios.post('http://localhost:4200/UserInfos/authenticate-password', {
      userID: user,
      userPassword: pass
    })
    .then(res => {
      if(res.data.length) {
        this.props.history.push({
          pathname: '/main',
          state: {user: this.state.user},
        });
      }else {
        alert('Wrong User and/or Password!');
      }
    })
    .catch(err => console.log(err));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.authenticateData(this.state.user, this.state.password);

  }

  handleUserChange = (event) => {
    this.setState({ user : event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password : event.target.value })
  }

  render() {
    var usrInput = classNames({
      'form-group': true,
      // 'has-success': this.state.user,
      // 'has-error': !this.state.user,
    });

    var passwordInput = classNames({
      'form-group': true,
      // 'has-success': this.state.password,
      // 'has-error': !this.state.password,
    });

    return (
      <div className='container'>
        <div>
          <h1 className='text-center'>UHUB</h1>
        </div>
        <form onSubmit={this.handleSubmit} className="col-md-6 col-md-offset-3">
          <div className={usrInput}>
            <div className='input-group'>
              <span className="input-group-addon"><span className="glyphicon glyphicon-user"/></span>
              <input type='' value={this.state.user} className="form-control" placeholder="Username" onChange={this.handleUserChange}/>
            </div>
          </div>
          <div className={passwordInput}>
            <div className='input-group'>
              <span className="input-group-addon"><span className="glyphicon glyphicon-lock"/></span>
              <input type='password' value={this.state.password} className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
            </div>
          </div>
          <div className='checkbox'>
            <label>
              <input type="checkbox" />
              Stay Logged In
            </label>
          </div>
          <div className='container-fluid row'>
            {/* <Link to='/main' className="container-fluid"> */}
              <button type="submit" className="btn btn-primary btn-block" >
                Submit
              </button>
            {/* </Link> */}
          </div>
          <div className='container-fluid row'>
            <Link to='/forgot-password' className=''>
              <button type="submit" className="btn btn-default col-md-5" >
                Forgot Pasword
              </button>
            </Link>
            <Link to='/signup' className="">
              <button type="link" className="btn btn-default col-md-5 col-md-offset-2" >
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
