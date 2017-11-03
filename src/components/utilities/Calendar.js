import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CalendarService from '../CalendarService';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css';

BigCalendar.momentLocalizer(moment);
//let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Calendar extends Component {

  state = {
      dates: [], //MOMENT DATES
      stringDates: [], //DATES IN STRING FORM
      addEvent: false, //BOOLEAN TO TRIGGER ADD EVENT FORM
      addEventAllDay: false, //BOOLEAN TO TRIGGER ALL DAY
      addEventTitle: '', //STRING FOR ADDEVENT TITLE
      addEventStart: moment(), //MOMENT START DATE
      addEventEnd: moment(), //MOMENT END DATE
  };

  constructor(props) {
    super(props);
    this.CalendarService = new CalendarService();
  }

  componentWillMount () {
    this.CalendarService.retrieveEvents(this.props.user)
      .then(result => {
        //console.log(result);
        if(!result.length) {
          return;
        }else {
          let datesArr = [];
          let stringArr = [];
          result.map((elem, key) => {
            const dateObj = {
              title: elem.title,
              allDay: elem.allDay,
              start: moment(elem.start).toDate(),
              end: moment(elem.end).toDate()
            };
            const stringObj = {
              title: elem.title,
              allDay: elem.allDay,
              start:elem.start,
              end: elem.end
            };
            datesArr.push(dateObj);
            stringArr.push(stringObj);
            this.setState({
              dates: datesArr,
              stringDates: stringArr
            });
          })
        }
      })
  }

  handleChangeStart = (addEventStart) => this.handleChange({ addEventStart })

  handleChangeEnd = (addEventEnd) => this.handleChange({ addEventEnd })


  handleChange = ({ addEventStart, addEventEnd }) => {
    addEventStart = addEventStart || this.state.addEventStart;
    addEventEnd = addEventEnd || this.state.addEventEnd;

    if (addEventStart.isAfter(addEventEnd)) {
      var temp = addEventStart;
      addEventStart = addEventEnd;
      addEventEnd = temp;
    }

    this.setState({ addEventStart, addEventEnd });
  }

  handleAddEvent = () => {
    this.setState({addEvent: !this.state.addEvent});
  }
  handleAddEventTitle = (event) => {
    this.setState({addEventTitle: event.target.value});
  }
  handleAddEventAllDay = () => {
    this.setState({addEventAllDay: !this.state.addEventAllDay});
  }
  handleSubmitEvent = () => {
    const { addEvent, addEventTitle, addEventStart, addEventEnd } = this.state;

    if(!addEventTitle.length) {
      alert('Please insert title');
      return
    }

    const datesObj = {
      title: addEventTitle,
      allDay: this.state.addEventAllDay,
      start: addEventStart.toDate(),
      end: addEventEnd.toDate()
    };
    const stringObj = {
      title: addEventTitle,
      allDay: this.state.addEventAllDay,
      start: addEventStart._d,
      end: addEventEnd._d
    };

    let datesArr = this.state.dates.slice();
    let stringDatesArr = this.state.stringDates.slice();

    datesArr.push(datesObj);
    stringDatesArr.push(stringObj);

    this.CalendarService.updateEvents(this.props.user, stringDatesArr);

    this.setState({
      dates: datesArr,
      stringDates: stringDatesArr,
      addEvent: !this.state.addEvent
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className='col-md-4'>
        {this.state.addEvent &&
          <div>
            <h1 className='text-center'>Add Event</h1>
            <div className="form-group">
              <label className='center'>Title</label>
              <input className="form-control" placeholder="Title..." onChange={this.handleAddEventTitle} value={this.state.addEventTitle}/>
            </div>
            <div className="col-md-offset-2 col-md-10">
              <div className="checkbox">
                <label>
                  <input type="checkbox" onChange={this.handleAddEventAllDay}/> Remember me
                </label>
              </div>
            </div>
            <div className='row col-lg-12'>
                <label >Start Date: </label>
                <DatePicker
                  selected={this.state.addEventStart}
                  selectsStart
                  startDate={this.state.addEventStart}
                  endDate={this.state.addEventEnd}
                  onChange={this.handleChangeStart}
                  showTimeSelect={this.state.addEventAllDay ? false : true}
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="LLL"
                />
                <label>End Date: </label>
                <DatePicker
                  selected={this.state.addEventEnd}
                  selectsEnd
                  startDate={this.state.addEventStart}
                  endDate={this.state.addEventEnd}
                  onChange={this.handleChangeEnd}
                  showTimeSelect={this.state.addEventAllDay ? false : true}
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="LLL"
                />
            </div>
            <div className='container-fluid row'>
                <button type="submit" className="btn btn-success btn-block" onClick={this.handleSubmitEvent}>
                  Submit Event
                </button>
            </div>
          </div>
        }
        {!this.state.addEvent &&
          <div>
            <button type="button" className="btn btn-primary" onClick={this.handleAddEvent}>Add Event</button>
            <div style={{padding: '10px'}} className='col-md-12 calendar'>
              <BigCalendar
                events={this.state.dates}
                startAccessor={'start'}
                endAccessor={'end'}
                allDayAccessor={'allDay'}
                titleAccessor={'title'}/>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Calendar;
