import React, { Component } from 'react';
import PiazzaService from '../../PiazzaService';

class PostAnswer extends Component {

  state = {
    answer: '',
  }

  constructor(props) {
    super(props);
    this.piazzaService = new PiazzaService();
  }

  handleChange = (event) => {
    this.setState({answer: event.target.value});
  }


  handleSubmit = (event) => {
    console.log('I am trying to submit');
    const { postObj } = this.props;
    const { answer } = this.state;
    event.preventDefault();
    this.piazzaService.postAnswer(postObj, answer);
  }

  render () {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Answer Question..." aria-describedby="basic-addon2" onChange={this.handleChange}/>
        <span className="input-group-addon" id="basic-addon2" onClick={this.handleSubmit}>Submit</span>
      </div>
    )
  }

}

export default PostAnswer;
