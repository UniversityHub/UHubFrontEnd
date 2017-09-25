import React, { Component } from 'react';
import classNames from 'classnames';

export default class MyComponent extends Component {

  state = {
    user: '',
    password: '',
    submitted: false
  }

  componentWillMount () {
    if(localStorage.getItem('loginSubmit')) {
      let newState = localStorage.getItem('loginSubmit');
      this.setState(JSON.parse(newState));
    }
  }

  store = () => {
    let newState = this.state;
    localStorage.setItem('loginSubmit', JSON.stringify(newState));
  }

  handleSubmit = () => {
    this.setState({ submitted : !this.state.submitted }, ()=>this.store())
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
      'has-success': this.state.submitted && this.state.user,
      'has-error': this.state.submitted && !this.state.user,
    });

    var passwordInput = classNames({
      'form-group': true,
      'has-success': this.state.submitted && this.state.password,
      'has-error': this.state.submitted && !this.state.password,
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className={usrInput}>
            <label>
              Username:
            </label>
            <input value={this.state.user} className="form-control" placeholder="Username" onChange={this.handleUserChange}/>
          </div>
          <div className={passwordInput}>
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
