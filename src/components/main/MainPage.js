import React, {Component} from 'react';
import MainNavBar from './MainNavBar';
import MainToolBar from './MainToolBar';

class MainPage extends Component {
  render() {
    return (
      <div className=''>
        <MainNavBar />
        <MainToolBar />
      </div>
    )
  }
}

export default MainPage;
