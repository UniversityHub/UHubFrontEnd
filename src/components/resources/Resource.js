import React, { Component } from 'react';
import SelectBar from 'react-select';
//import piazza from 'piazza-api';
//import axios from 'axios';
import PiazzaService from '../PiazzaService';
import ReactTable from 'react-table';
class Resource extends Component {

  // this.state object
  state = {
    user: '',
    pass: '',
    formUser: '',
    formPass: '',
    apiList: [],
    data: [], //All data
    classes: [], //All classes (un-parsed)
    activeClasses: [], //Array of Active class objects
    classOptions: [], //Options for classes
    currentClass: '', //Current Class
    folderOptions: [], //Options for Folders
    currentFolder: '', //Current folder
    posts: [],
  }

  // Constructor (initializes piazza service tool)
  constructor(props) {
    super(props);
    this.piazzaService = new PiazzaService();
  }

  // Logs in to Piazza and initializes needed states
  componentWillMount() {
    this.getLogin(this.props.user, this.props.password);
    this.checkApiList();
    if(this.state.user && this.state.pass) {
      this.initialize();
    }
  }

  initialize = () => {
    if(this.state.classes.length) {
      this.retrievePosts();
      return;
    }
    var data = this.piazzaService.login(this.state.user, this.state.pass);
    data.then(res => {
      const result = res;
      if(Object.entries(result).length) {
        this.setState({data: result});
        let list = this.getClasses(result);
        let courseList = this.parseClassesInfo(list);
        this.initializeDisplay(courseList);
        this.retrievePosts();
      }
    });
  }

  // Parses into object with all of class info
  parseClasses = (param) => {
    var arrData = Object.entries(param);
    var newArr = [];

    arrData.map((elem, key) => {
      if(elem[0] === 'classes') newArr = elem[1];
    });
    return newArr;
  }

  // Initializes display
  initializeDisplay = (courseList) => {
    let nameList = [];
    courseList.map((elem, key) => {
      let obj = {
        value: elem.courseNumber,
        label: elem.courseNumber
      };
      nameList.push(obj);
    })
    const item = courseList[0];

    let folderList = [];
    item.folders.map((elem, key) => {
      let obj = {
        value: elem,
        label: elem
      };
      folderList.push(obj);
    })

    this.setState({
      classOptions: nameList, //Options for classes
      currentClass: item.courseNumber, //Current Class
      folderOptions: folderList, //Options for Folders
      currentFolder: item.folders[0],
    })
  }

  // Parses into object with specific class info (id, name, courseNum, and folders)
  parseClassesInfo = (param) => {
    let courseList = [];
    let activeCourses = param.filter((elem, key) => {
      return elem.status === 'active';
    })

    activeCourses.map((elem, key) => {
      let arr = Object.entries(elem);
      let id = arr[0][1];
      let name = arr[1][1];
      let courseNumber = arr[2][1];
      let folders = arr[11][1];
      let newObj = {
        id,
        name,
        courseNumber,
        folders,
      };
      courseList.push(newObj);
    })
    this.setState({activeClasses: courseList})
    return courseList;
  }

  // Sets classes state with class info
  getClasses = (param) => {
    if(!Object.entries(param).length) return;
    const newArr = this.parseClasses(param);

    this.setState({classes: newArr});
    return newArr;
  }

  getLogin = (user, pass) => {
    const data = this.piazzaService.getLogin(user, pass);
    data.then(res => {
      const apiArr = res[0].apiLogin;
      this.setState({apiList: apiArr});
      return;
    });
  }

  checkApiList = () => {
    const list = this.state.apiList.slice();
    const filteredList = list.filter((elem, key) => {
      return elem.name === 'piazza';
    })
    if(filteredList.length === 1) {
      this.setState({
        user: filteredList[0].user,
        pass: filteredList[0].pass,
      })
    }
    return;
  }

  // Hopefully displays posts
  retrievePosts = () => {
    const { user, pass, currentClass, currentFolder } = this.state;
    var data = this.piazzaService.getPosts(user, pass, currentClass, currentFolder);
    data.then(res => this.setState({posts: res}));
  }

  handleClassChange = (event) => {
    const activeList = this.state.activeClasses;
    const newList = activeList.filter((elem) => {
      return elem.courseNumber === event.value;
    })

    let folderList = [];
    newList[0].folders.map((elem, key) => {
      let obj = {
        value: elem,
        label: elem
      };
      folderList.push(obj);
    })

    this.setState({
      currentClass: newList[0].courseNumber, //Current Class
      folderOptions: folderList, //Options for Folders
      currentFolder: newList[0].folders[0],
    }, this.retrievePosts());
  }

  handleFolderChange = (event) => {
    const folderList = this.state.folderOptions;
    const folder = folderList.filter((elem) => {
      return elem.value === event.value;
    })
    this.setState({
      currentFolder: folder[0].value,
    }, this.retrievePosts());
  }

  handleUserChange = (event) => {
    this.setState({formUser: event.target.value});
  }
  handlePasswordChange = (event) => {
    this.setState({formPass: event.target.value});
  }
  handleSubmit = (event) => {
    const data = this.piazzaService.login(this.state.formUser, this.state.formPass);
    console.log(data);
    data.then(res => {
      console.log(res);
      if(typeof res === "string") {
        console.log(typeof res === "string")
        alert(res);
      }
      else {
        
        this.setState({
          user: this.state.formUser,
          pass: this.state.formPass
        })
        this.initialize();
        const api = {
          name: 'piazza',
          user: this.state.formUser,
          pass: this.state.formPass,
        };
        let arr = this.state.apiList.slice();
        arr.push(api);
        this.piazzaService.saveApi(this.state.formUser, this.state.formPass, arr);
      }
    });
    event.preventDefault();
  }

  // render function
  render() {
    console.log(this.state);
    return (
      <div>
        {!this.state.user &&
          <div>
            <div>
              <h1 className='text-center'>PIAZZA</h1>
            </div>
            <form className="col-md-6 col-md-offset-3">
              <div className='form-group'>
                <div className='input-group'>
                  <span className="input-group-addon"><span className="glyphicon glyphicon-user"/></span>
                  <input type='email' value={this.state.formUser} className="form-control" placeholder="Email" onChange={this.handleUserChange}/>
                </div>
              </div>
              <div className='form-group'>
                <div className='input-group'>
                  <span className="input-group-addon"><span className="glyphicon glyphicon-lock"/></span>
                  <input type='password' value={this.state.formPass} className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
                </div>
              </div>

              <div className='container-fluid row'>
                {/* <Link to='/main' className="container-fluid"> */}
                  <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>
                    Submit
                  </button>
                {/* </Link> */}
              </div>
            </form>
          </div>
        }
        {this.state.user &&
          <div>
            <div className='row'>
              <div className='col-md-4'>
                <label>Class: </label>
                <SelectBar simplevalue autofocus={true} searchable={false} value={this.state.currentClass} name="selected-state" options={this.state.classOptions} onChange={this.handleClassChange}/>
              </div>
              <div className='col-md-4'>
                <label>Folder: </label>
                <SelectBar simplevalue autofocus={true} searchable={false} value={this.state.currentFolder} name="selected-state" options={this.state.folderOptions} onChange={this.handleFolderChange}/>
              </div>
            </div>
            <div>
              {this.state.posts &&
                <ReactTable
                  data={this.state.posts}
                  columns={[
                    {
                      Header: 'Title',
                      accessor: 'title',
                    },
                    {
                      Header: 'Type',
                      accessor: 'type',
                    },
                    {
                      Header: 'Post ID',
                      accessor: 'id',
                    }
                  ]}
                  style={{height: "400px"}}
                  className="-striped -highlight"
                />
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Resource;
