import React, { Component } from 'react';
import SelectBar from 'react-select';
import piazza from 'piazza-api';
import axios from 'axios';
import PiazzaService from '../PiazzaService';
import ReactTable from 'react-table';

const user = 'cconcep@purdue.edu';
const pass = 'republica1';

class Resource extends Component {

  // this.state object
  state = {
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
    if(this.state.classes.length) {
      this.retrievePosts();
      return;
    }
    var data = this.piazzaService.login(user, pass);
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

  componentDidMount() {
    this.retrievePosts();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const currFolder = this.state.currentFolder !== nextState.currentFolder;
  //   return currFolder;
  // }

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

  // Hopefully displays posts
  retrievePosts = () => {
    const { currentClass, currentFolder } = this.state;
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
    this.forceUpdate();
  }

  handleFolderChange = (event) => {
    const folderList = this.state.folderOptions;
    const folder = folderList.filter((elem) => {
      return elem.value === event.value;
    })
    this.setState({
      currentFolder: folder[0].value,
    }, this.retrievePosts());
    this.forceUpdate();
  }


  // render function
  render() {
    const { currentClass, currentFolder } = this.state;
    console.log(this.state);
    return (
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
              defaultPageSize={20}
              style={{height: "400px"}}
              className="-striped -highlight"
            />
          }
        </div>
      </div>
    )
  }
}

export default Resource;
