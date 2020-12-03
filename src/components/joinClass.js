import React, { Component } from 'react';
import axios from 'axios';
import "./global.css"
export default class joinClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classId:'',
      studentSrn:'',
      studentSrn2:'',
      students:{},
      classes:[],
      timetable:[],
      error:'',
      error2:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5500/students/students/').then(response => {
        this.setState({
            students: response.data.map(student => [student.studentName,student.srn])
        })
        // {console.log(this.state.students)}
      })
      .catch(function (error) {
        console.log(error);
      })

      
  }

  getName = (srn) => {
    //   {console.log("in fun",this.state.students)}
      let i;
      for(i in this.state.students){
        //   {console.log(this.state.students[student][1],srn)}
          if(this.state.students[i][1] === srn){
              return this.state.students[i][0]
          }
      }
      return "No such student!"
  } 

  handleSubmit1 = (e) => {
      e.preventDefault();
    //   {console.log("submitted",this.state.studentSrn)}
      let studentName = this.getName(this.state.studentSrn);


    if(studentName == "No such student!"){
        this.setState({
            error : studentName
        })
    }
    else{
        axios.post('http://localhost:5500/classes/timetable',{name:studentName}).then(response => {
        this.setState({
            timetable : response.data.map(ele => <tr><td>{ele.className}</td><td>{ele.teacherName}</td><td>{ele.startTime}</td><td>{ele.endTime}</td></tr>),
            error:'',
            error2:''
        })
      })
      .catch(function (error) {
        console.log(error);
      })
    }

  }

  handleSubmit2 = (e) => {
    e.preventDefault();
    let name = this.getName(this.state.studentSrn2);

    if(name == "No such student!"){
        this.setState({
            error2 : name
        })
    }
    else{
      console.log(name,this.state.classId);
      axios.post('http://localhost:5500/joinClass/'+this.state.classId,{name:name,Class:this.state.classId}).then(response => {
          console.log("Joining...");
        })
        .catch(function (error) {
          console.log(error);
        })
        window.open("http://localhost:5500/"+this.state.classId,'_blank');
        window.location = '/quiz';
    }
   
  }

  handleStudentSrn = (e) => {
      this.setState({
        studentSrn : e.target.value,
        timetable : []
      })
  }

  handleStudentSrn2 = (e) => {
    this.setState({
      studentSrn2 : e.target.value,
    })
  }

  handleClassId = (e) => {
    this.setState({
        classId : e.target.value
    })
    }

  render() {
    return (
      
  <div className="container-fluid bground">
    <div className="row justify-content-center">
    <div className="col-12 col-sm-6 col-md-3">
      <div class="split left jeez">
      <form onSubmit = {this.handleSubmit1}>
      <div className="form-group mt-5">
          <label class="dude">Enter the SRN to view your schedule</label>
          <input type="text" className="form-control cool" placeholder="SRN" id="xyz" name="SRN" value={this.state.studentSrn} onChange={this.handleStudentSrn} required />
          <br></br>
          <input type="submit" className="form-control btn-info cool" value="View schedule" />
      </div>
      
      </form>
      
      <div class="coolit" >
          {this.state.timetable.length==0?this.state.error:
          <table className="table table table-bordered table table-hover table table-dark">
              <thead className="thead-dark">
              <tr class="bg-primary">
                <th>Course</th>
                <th>Teacher Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                </tr></thead>
              {this.state.timetable}
          </table>}
          
      </div>
      </div>
      <div class="split right">
      <form onSubmit = {this.handleSubmit2}>
      <div className="form-group form-containerr whybro ">
          <label>Enter the SRN for attendance:</label>
          <input type="text" className="form-control my-2 my-md-0" placeholder="SRN" id="abc" name="SRN" value={this.state.studentSrn2} onChange={this.handleStudentSrn2} required />
          <br></br>
          <label>Enter the class ID to join the class:</label>
          <input type="text" className="form-control" placeholder="Class ID" id="abc" name="ClassId" value={this.state.classId} onChange={this.handleClassId} required />
          <br></br>
          <input type="submit" className="form-control btn btn-info" value="Join Class" />
      </div>
      </form></div>
      
      {this.state.timetable.length==0?this.state.error2:''}
    </div>
    </div>
  </div>
    )
  }
}