import React, {Component} from 'react';
import axios from 'axios';

class PortalOffice extends Component {

  state = {
    data: [],
  }

  componentWillMount () {
    axios.get('http://localhost:8000')
    .then(res => {
      console.log('there is a result son');
      console.log(res)
    })
    .catch(err => {
      console.log('there is an error son');
      console.log(err)
    })
  }

  render() {
    return(
      <div>
        <h1>THIS SHOULD BE THE PORTAL SHIT</h1>
      </div>
    )
  }

}

export default PortalOffice;
