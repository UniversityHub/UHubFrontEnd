import React, {Component} from 'react';
import MainNavBar from './MainNavBar';
import MainToolBar from './MainToolBar';
import '../../assets/scss/_MainPage.scss';

class MainPage extends Component {
  render() {
    return (
      <div className='main-page'>
        <MainNavBar />
        <MainToolBar />
      </div>
    )
  }
}

export default MainPage;
