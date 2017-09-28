import React, {Component} from 'react';
import '../../assets/scss/_MainToolBar.css';

class MainToolBar extends Component {
  render() {
    return (
      <div className="col-md-2 list-group container sidebar">
        <button type="button" className="list-group-item row">
          <span className='glyphicon glyphicon-calendar'></span>
          Calendar
        </button>
        <button type="button" className="list-group-item">Dapibus ac facilisis in</button>
        <button type="button" className="list-group-item">Morbi leo risus</button>
        <button type="button" className="list-group-item">Porta ac consectetur ac</button>
        <button type="button" className="list-group-item">Vestibulum at eros</button>
      </div>
    )
  }
}

export default MainToolBar;
