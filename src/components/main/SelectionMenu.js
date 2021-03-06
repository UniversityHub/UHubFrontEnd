import React, { Component } from 'react';
import SelectBar from 'react-select';
const APIs = require('../data/APIs');

class SelectionMenu extends Component {

  state = {
    api: 'None',
  }

  componentDidMount = () => {
    this.setState({api: this.props.value})
  }

  handleChange = (event) => {
    this.setState({api: event.value});
    this.props.handleChange(this.props.id, event.value);
  }

  render() {
    let options = APIs['api'];
    return (
      <div className='col-md-12'>
        <div className='col-md-6 col-md-offset-3'>
          <SelectBar simplevalue autofocus={true} searchable={false} value={this.state.api} name="selected-state" options={options} onChange={this.handleChange} clearable={false}/>
        </div>
      </div>
    )
  }
}

export default SelectionMenu;
