import axios from 'axios';

class CalendarService {

  //Initialize Calendar object for New User
  initialize = (user) => {
    axios.post('http://localhost:4200/calendar/initialize', {
      userID: user,
      events: []
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
  }

  //Retrieve events to update Calendar
  retrieveEvents = (user) => {
    return axios.post('http://localhost:4200/calendar/events', {
      userID: user,
      events: []
    })
    .then(res => {
      //console.log(res.data[0].events);
      return res.data[0].events;
    })
    .catch(err => console.log(err))
  }

  //Updates database with new events
  updateEvents = (user, events) => {
    return axios.post('http://localhost:4200/calendar/events/update', {
      userID: user,
      events: events
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
  }

}

export default CalendarService;
