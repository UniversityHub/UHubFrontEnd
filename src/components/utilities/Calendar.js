import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment);
//let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Calendar extends Component {
  render() {
    return (
      <div style={{padding: '20px'}} className='col-md-4 calendar'>
        <BigCalendar
          events={[ { 'title': "My title", 'start': new Date(2015, 3, 13, 7, 0, 0), 'end': new Date(2015, 3, 13, 10, 30, 0) } ]}
          startAccessor={'start'}
          endAccessor={'end'}
          titleAccessor={'title'}/>
      </div>
    )
  }
}

export default Calendar;
