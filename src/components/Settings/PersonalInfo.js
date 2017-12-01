import React, { Component } from 'react';
import UserInfoService from '../UserInfoService';

class PersonalInfo extends Component {

  state = {
    userID: '',
    email: '',
    firstName: '',
    lastName: '',
  }

  constructor(props) {
    super(props);
    this.addUserService = new UserInfoService();
  }

  componentWillMount(){
    this.setState({userID: this.props.user});
    this.addUserService.getUser(this.props.user)
      .then(result => {
        this.setState({
          email: result.userEmail,
          firstName: result.firstName,
          lastName: result.lastName
        })
      })
  }

  render() {
    return (
      <div>
        <div className='row'>
          <h4>User ID: </h4>
          {this.state.userID}
        </div>
        <div className='row'>
          <h4>Email: </h4>
          {this.state.email}
        </div>
        <div className='row'>
          <h4>First Name: </h4>
          {this.state.firstName}
        </div>
        <div className='row'>
          <h4>Last Name: </h4>
          {this.state.lastName}
        </div>
      </div>
    )
  }

}

export default PersonalInfo;
