import React, { Component } from 'react';
import UserInfoService from '../UserInfoService';

class UpdatePassword extends Component {

  state = {
    formOldPass: '',
    formNewPass: '',
    formConfirmPass: '',
    password: '',
  }

  constructor(props) {
    super(props);
    this.addUserService = new UserInfoService();
  }

  componentWillMount(){
    this.addUserService.getUser(this.props.user)
      .then(result => {
        this.setState({password: result.userPassword});
      })
      .catch(err => console.log(err));
  }

  validate = () => {
    const { formOldPass, formNewPass, formConfirmPass, password } = this.state;
    const { user } = this.props;
    const specChar = /[!@#$%^&*]/g;
    const num = /[0-9]/g
    // console.log(password);
    // console.log(formOldPass);
    // console.log(formNewPass);
    let validated = 1;

    if(formOldPass !== password) {
      alert('Incorrect Password');
    } else if(formNewPass.length < 6 || formNewPass.length > 32) {
      alert('Password must be greater than 6 characters AND less than 32 characters!');
    } else if(formNewPass !== formConfirmPass) {
      alert('Your passwords MUST match!');
    } else if(!formNewPass.search(specChar) || !formNewPass.search(num)) {
      alert('Your password MUST contain at least ONE special character or ONE num!');
    }else {
      validated = 0;
    }
    return validated;
  }

  handleOldPassword = (event) => {
    this.setState({formOldPass: event.target.value})
  }
  handleNewPassword = (event) => {
    this.setState({formNewPass: event.target.value})
  }
  handleConfirmPassword = (event) => {
    this.setState({formConfirmPass: event.target.value})
  }
  handleSubmit = (event) => {
    const validated = this.validate();
    event.preventDefault();
    if(validated) {
      //console.log('we not validated');
      return;
    }
    this.addUserService.revisePassword(this.props.user, this.state.formNewPass);
    alert('Password Successfully Changed!');
    this.setState({
      formOldPass: '',
      formNewPass: '',
      formConfirmPass: ''
    })
  }
  render() {
    console.log(this.state);
    return (
      <div className='container-fluid'>
        <div className='container'>
          <h3>Update Password</h3>
        </div>
        <form onSubmit={this.handleSubmit} className='col-md-10 col-md-offset-1'>
          <div className='form-group col-md-6'>
            <label>
              Old Password
            </label>
            <input type='password' value={this.state.formOldPass} className="form-control" placeholder="Old Password" onChange={this.handleOldPassword}/>
          </div>
          <div className='form-group col-md-6'>
            <label>
              New Password
            </label>
            <input type='password' value={this.state.formNewPass} className="form-control" placeholder="New Password" onChange={this.handleNewPassword}/>
          </div>
          <div className='form-group col-md-6'>
            <label>
              Confirm New Password
            </label>
            <input type='password' value={this.state.formConfirmPass} className="form-control" placeholder="Confirm New Password" onChange={this.handleConfirmPassword}/>
          </div>
          <div className='container-fluid row'>
              <button className="btn btn-default col-md-12" >
                Submit
              </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdatePassword;
