import React, { Component } from 'react';

export default class MyComponent extends Component {

  state = {
    user: '',
    password: ''
  }

  handleSubmit = () => {
    alert('you have submitted')
  }

  handleUserChange = (event) => {
    this.setState({ user : event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password : event.target.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Username:
            </label>
            <input type='email' value={this.state.user} className="form-control" placeholder="Username" onChange={this.handleUserChange}/>
          </div>
          <div className="form-group">
            <label>
              Password
            </label>
            <input type='password' value={this.state.password} className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
          </div>
          <div className='checkbox'>
            <label>
              <input type="checkbox" />
              Stay Logged In
            </label>
          </div>
          <button type="submit" className="btn btn-default" >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
