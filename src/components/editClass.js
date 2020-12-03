import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker'
import "./global.css"
export default class EditClass extends Component {
  constructor(props) {
    super(props);

    this.handleTeachername = this.handleTeachername.bind(this);
    this.handleClassname = this.handleClassname.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      teacherName: '',
      className: '',
      teachers: [],
      endTime:new Date(),
      startTime:new Date()
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5500/classes/classes/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          teacherName: response.data.teacherName,
          className: response.data.className,
          startTime: new Date(response.data.startTime),
          endTime: new Date(response.data.endTime)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5500/teachers/teachers')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            teachers: response.data.map(teacher => teacher.teacherName)
          })
        }
        // console.log(this.state.teachers)
        this.setState({
            teacherName:this.state.teachers[0]
        })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  handleTeachername(e) {
    this.setState({
      teacherName: e.target.value
    })
  }

  handleClassname(e) {
    this.setState({
      className: e.target.value
    })
  }

  handleStartTime(date) {
    if(date != null)
        this.setState({
        startTime: date
        })
  }

  handleEndTime(date) {
    if(date != null)
        this.setState({
            endTime: date
        })
  }

  handleSubmit(e) {
    e.preventDefault();

    const details = {
      className: this.state.className,
      teacherName: this.state.teacherName,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    }

    {console.log(details);}

    axios.post('http://localhost:5500/classes/updateClass/' + this.props.match.params.id, details)
      .then(res => console.log(res.data));

    window.location = '/displayClass';
  }

  render() {
    return (
    <div class="jlo">
      <div className="container-fluid bground">
            <div className="row justify-content-around">
            <div className="col-12 col-sm-6 col-md-3"></div>
      <h3 class="koma">Edit Class Details</h3>
      <form onSubmit={this.handleSubmit}>
        <div className="form-containerr form-group mt-5 sure">
        
        
       
        {/* dropdown of names:(We have used input field instead)
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.handleTeachername}>
              {
                this.state.classes.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div> */}

        <div className="form-group"> 
          <label>Class Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.className}
              onChange={this.handleClassname}
              />
        </div>

        {/* <div className="form-group"> 
          <label>Teacher Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.handleEmail}
              />
        </div> */}

        <div className="form-group"> 
        <label>Teacher Name: </label>
            <select ref="teacherInput"
                required
                className="form-control"
                value={this.state.teacherName}
                onChange={this.handleTeachername}>
                {
                    this.state.teachers.map(function(teacher) {
                    return <option 
                        key={teacher}
                        value={teacher}>{teacher}
                        </option>;
                    })
                }
            </select>
        </div>

        <div className="form-group"> 
            <label>Start time</label><br></br>
            <DateTimePicker id="startTime" value={this.state.startTime} onChange={this.handleStartTime} required />
        </div>

        <div className="form-group"> 
            <label >End time</label><br></br>
            <DateTimePicker class="lll" id="endTime" value={this.state.endTime} onChange={this.handleEndTime} required />
        </div>
        
        <div className="form-group">
            <input type="submit" value="Edit Details" className="form-control btn-info" />
        </div>
        </div>
      </form>
    </div>
    </div>
    </div>
    
    )
  }
}