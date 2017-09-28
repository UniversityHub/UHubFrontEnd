import React, { Component } from 'react';
import '../../assets/scss/_SignUp.scss';
import { Link } from 'react-router-dom';
import UserInfoService from '../UserInfoService';

class SignUp extends Component {

  state = {
    user: '',
    email: '',
    password: '',
    passwordRepeat: '',
    school: '',
    submitted: false,
  }

  constructor(props) {
    super(props);
    this.addUserService = new UserInfoService();
  }

  handleSubmit = () => {
    this.addUserService.sendData(this.state.user, this.state.password);
    console.log(this.state.user);
    console.log(this.state.password);
  }

  handleChange = (value, event) => {
    this.setState({
      [event.target.id]: value,
    });
    //console.log(event.target.id);
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
              <button type="submit" className="btn btn-default col-md-12" >
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
