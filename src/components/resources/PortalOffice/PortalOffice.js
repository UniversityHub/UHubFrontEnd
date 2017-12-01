import React, {Component} from 'react';
import axios from 'axios';
import ReactLoginMS from "react-ms-login";


class PortalOffice extends Component {

  state = {
    data: [],
  }

  // componentWillMount () {
  //   axios.fetch("https://cors-anywhere.herokuapp.com/http://localhost:4200/userinfos/test/start")
  //   .then(res => {
  //     console.log('there is a result son');
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log('there is an error son');
  //     console.log(err)
  //   })
  // }

  render() {
    return(
      <div>
        <h1>Portal to Office</h1>
        <ReactLoginMS
          clientId="144ef094-6c6c-44ea-aad0-320c524ef96b" // required: 'application id/client id' obtained from https://apps.dev.microsoft.com for your app
          redirectUri="http://localhost:4200/userinfos/test/office" // required: redirectUri registered in https://apps.dev.microsoft.com for your app
          scopes={["user.read"]} //optional: defaults to "user.read" full list is present https://developer.microsoft.com/en-us/graph/docs/concepts/permissions_reference
          responseType="token" //optional: valid values are "token" for `Implicite OAuth flow` and "code" for `Authorization Code flow` defaults to "token"
          // optional: space separated class names which are applied on the html Button element
          btnContent='yurrrr' // optional: can be string or a valid react component which can be rendered inside html Button element
          handleLogin={(data) => console.log(data)}// required: callback to receive token/code after successful login
      />
      </div>
    )
  }

}

export default PortalOffice;
