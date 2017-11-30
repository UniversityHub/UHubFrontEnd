import React, { Component } from 'react';
import SelectBar from 'react-select';
import PiazzaService from '../PiazzaService';
import ReactTable from 'react-table';
import PostAnswer from './Piazza/PostAnswer';
const APIs = require('../data/APIs');


class Resource extends Component {

  // this.state object
  state = {
    user: '',
    pass: '',
    formUser: '', //User ID written in form
    formPass: '', //Password written in form
    apiList: [],
    data: [], //All data
    classes: [], //All classes (un-parsed)
    activeClasses: [], //Array of Active class objects
    classOptions: [], //Options for classes
    currentClass: '', //Current Class
    folderOptions: [], //Options for Folders
    currentFolder: '', //Current folder
    posts: [],
    postForm: false, //Boolean for Post Question/Note form render
    postTitle: '', //Title for Question or Note
    postContent: '', //Content for Question or Note
    postFolders: [],
    postType: '', //Question OR Note
    selectionFolders: [], //Options for Folder FOR SELECT BAR ONLY
  }

  // Constructor (initializes piazza service tool)
  constructor(props) {
    super(props);
    this.piazzaService = new PiazzaService();
  }

  // Logs in to Piazza and initializes needed states
  componentWillMount() {
    const data = this.piazzaService.getLogin(this.props.user, this.props.password);
    data.then(res => {
      const apiArr = res[0].apiLogin;
      this.checkApiList(apiArr);
      this.setState({apiList: apiArr});
      return;
    });
    // this.getLogin(this.props.user, this.props.password);
    console.log('apiList: ')
    console.log(this.state.apiList);
    // this.checkApiList();
    if(this.state.user.length && this.state.pass.length) {
      console.log('do you come in here?')
      this.initialize();
    }
  }

  // initialize all states
  initialize = () => {
    if(this.state.classes.length) {
      this.retrievePosts();
      return;
    }
    var data = this.piazzaService.login(this.state.user, this.state.pass);
    data.then(res => {
      const result = res;
      console.log("data object: ");
      console.log(result);
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
    console.log('courseList: ')
    console.log(courseList)
    const item = courseList[0];

    let folderList = [];
    item.folders.map((elem, key) => {
      let obj = {
        value: elem,
        label: elem
      };
      folderList.push(obj);
    })

    const folderSelect = [];
    folderList.map((elem, key) => {
      const obj = {
        value: elem,
        label: elem
      };
      folderSelect.push(obj);
    });

    this.setState({
      classOptions: nameList, //Options for classes
      currentClass: item.courseNumber, //Current Class
      folderOptions: folderList, //Options for Folders
      currentFolder: item.folders[0],
      selectionFolders: folderSelect
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

  checkApiList = (apiArr) => {
    const filteredList = apiArr.filter((elem, key) => {
      return elem.name === 'piazza';
    })

    if(filteredList.length === 1) {
      this.setState({
        user: filteredList[0].user,
        pass: filteredList[0].pass,
      }, this.initialize)
    }
    return;
  }

  // Hopefully displays posts
  retrievePosts = () => {
    const { user, pass, currentClass, currentFolder } = this.state;
    var data = this.piazzaService.getPosts(user, pass, currentClass, currentFolder);

    data.then(res => {
      //console.log('posts inside promise: ');
      //console.log(JSON.parse(res));
      const parsedPosts = JSON.parse(res);
      const userInfo = {
        user: user,
        password: pass,
      }
      parsedPosts.map((elem, key) => {
        Object.assign(elem, userInfo);
      })
      this.setState({posts: parsedPosts})
    });
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
    //console.log(data);
    data.then(res => {
      //console.log(res);
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
        this.piazzaService.saveApi(this.props.user, this.props.password, arr);
      }
    });
    event.preventDefault();
  }

  handlePost = (event) => {
    this.setState({postForm: !this.state.postForm});
  }

  handlePostTitle = (event) => {
    this.setState({postTitle: event.target.value});
  }
  handlePostContent = (event) => {
    this.setState({postContent: event.target.value});
  }

  handlePostFolders = (value) => {
		this.setState({ postFolders: value });
	}

  handlePostType = (event) => {
    this.setState({postType: event.value});
  }

  handlePostBack = () => {
    this.setState({
      postForm: !this.state.postForm,
      postTitle: '', //Title for Question or Note
      postContent: '', //Content for Question or Note
      postFolders: [],
      postType: '', //Question OR Note});
    })
  }

  handlePostSubmit = (event) => {
    if(!this.validate()) {
      return;
    }

    const { postTitle, postContent, postFolders, postType, user, pass, posts} = this.state;
    const folders = postFolders.filter((elem, key) => {
      return elem.value;
    })
    const classID = posts[0].classID;
    const postObj = {
      bypass_email: false,
      folders: folders,
      anonymous: 'full'
    };
    if(postType === 'Question') {
      this.piazzaService.postQuestion(postTitle, postContent, user, pass, classID, postObj);
    }else if(postType === 'Note') {
      this.piazzaService.postNote(postTitle, postContent, user, pass, classID, postObj);
    }
    alert('Successfully Posted')
    this.setState({postForm: !this.state.postForm});
  }

  validate = () => {
    let validated = false;
    if(!this.state.postTitle.length) {
      alert('Please write title');
    }else if(!this.state.postContent.length) {
      alert('Please write context');
    }else if(!this.state.postFolders.length) {
      alert('Please select at least ONE folder');
    }else if(!this.state.postType.length) {
      alert('Please choose a type');
    }else {
      validated = true;
    }
    return validated;
  }

  // render function
  render() {
    console.log(this.state);
    let postOptions = APIs['post'];
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
                  <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>
                    Submit
                  </button>
              </div>
            </form>
          </div>
        }
        {this.state.user &&
          <div>
            {this.state.postForm &&
              <div>
                <h1 className='text-center'>POST QUESTION/NOTE</h1>
                <div className="form-group">
                  <label className='center'>Title</label>
                  <input className="form-control" placeholder="Title..." onChange={this.handlePostTitle} value={this.state.postTitle}/>
                </div>
                <div className="form-group">
                  <label className='center'>Content</label>
                  <textarea className="form-control" rows="3" onChange={this.handlePostContent} value={this.state.postContent}></textarea>
                </div>
                <div className='col-md-4'>
                  <SelectBar simplevalue multi autofocus={true} searchable={false} value={this.state.postFolders} name="selected-state" placeholder='Tags' options={this.state.folderOptions} onChange={this.handlePostFolders}/>
                </div>
                <div className='col-md-4 col-md-offset-3'>
                  <SelectBar simplevalue autofocus={true} searchable={false} value={this.state.postType} options={postOptions} onChange={this.handlePostType}/>
                </div>
                <div className='container-fluid row'>
                    <button type="submit" className="btn btn-success btn-block col-md-5" onClick={this.handlePostSubmit}>
                      Submit Question
                    </button>
                    <button type="submit" className="btn btn-primary btn-block col-md-5" onClick={this.handlePostBack}>
                      Back
                    </button>
                </div>
              </div>
            }
            {!this.state.postForm &&
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
                  <div className='btn-group col-md-4'>
                    <button type="button" className="btn btn-primary" onClick={this.handlePost}>Post</button>
                  </div>
                </div>
                <div>
                  {this.state.posts &&
                    <ReactTable
                      data={this.state.posts}
                      filterable
                      defaultFilterMethod={(filter, row) =>
                                  String(row[filter.id]) === filter.value}
                      columns={[
                        {
                          Header: 'Title',
                          accessor: 'title',
                          filterMethod: (filter, row) =>
                            row[filter.id].startsWith(filter.value) &&
                            row[filter.id].endsWith(filter.value)
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
                      SubComponent={row => {
                        const postObj = row.original;
                        const mainContent = row.original.content;
                        const studentRes = !Object.is(postObj.studentResponse);
                        const instructorRes = !Object.is(postObj.instructorResponse);
                        console.log('post Obj = ');
                        console.log(postObj);

                        return (
                          <div>
                            <div className='panel panel-primary'>
                              <div className='panel-heading'>
                                <h3 className='panel-title'>{postObj.type}</h3>
                              </div>
                              <div className='panel-body' dangerouslySetInnerHTML={{__html: mainContent}}>
                              </div>
                              {postObj.type === 'question' && <PostAnswer postObj={postObj}/>}
                            </div>


                            {instructorRes &&
                              <div className='panel panel-success'>
                                <div className='panel-heading'>
                                  <h3 className='panel-title'>Instructors' Response</h3>
                                </div>
                                <div className='panel-body' dangerouslySetInnerHTML={{__html: postObj.instructorResponse.content}}>
                                </div>
                              </div>
                            }
                            {studentRes &&
                              <div className='panel panel-success'>
                                <div className='panel-heading'>
                                  <h3 className='panel-title'>Students' Response</h3>
                                </div>
                                <div className='panel-body' dangerouslySetInnerHTML={{__html: postObj.studentResponse.content}}>
                                </div>
                              </div>
                            }
                          </div>
                        )
                      }}
                      style={{height: "400px"}}
                      className="-striped -highlight"
                    />
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default Resource;
