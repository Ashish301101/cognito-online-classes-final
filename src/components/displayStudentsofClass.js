import React, { Component } from 'react';
import axios from 'axios';
import "./global.css"
export default class displayStudentsofClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className:'',
      teacherName:'',
      studentsAdded: [],
      added:1
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5500/classes/classes/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          teacherName : response.data.teacherName,
          className : response.data.className,
          studentsAdded : response.data.students.map(student => student[0])
        })   
        // {console.log(this.state.studentsAdded);}
      })
     
      .catch(function (error) {
        console.log(error);
      })
  }

  studentList = () => {
      let students = [];
      if(this.state.studentsAdded.length === 0){
          students.push(<h5>No students yet!</h5>)
      }
      else{
          {console.log("SUCCESS")}
            this.state.studentsAdded.map(student => {
              if(typeof(student) == 'string')
                students.push(<li class="list-group-item ki">{student} | <a class="pepe" href="#" id={student} onClick={this.deleteStudent}>delete</a></li>);
              else{
                students.push(<li class="list-group-item ki">{student[0]} | <a class="pepe" href="#" id={student} onClick={this.deleteStudent}>delete</a></li>);
              }
            });
      }
      
      return students;
  }

  deleteStudent = (ele) => {
    // {console.log(ele.target.id)}
    this.state.studentsAdded.pop(ele.target.id);
    // {console.log(this.state.studentsAdded)}
    axios.post('http://localhost:5500/classes/addStudents/' + this.props.match.params.id, this.state.studentsAdded)
      .then(res => {console.log(res.data)});
  }

  render() {
    return (
    <div class="container-fluid bground lm">
      <div class="afor">
      <h3 class="afor">Add Student</h3>
      <h4 class="afor">Class Name : {this.state.className}</h4>
      <h4 class="afor">By : {this.state.teacherName}</h4>
      </div>
    
      <div class="bfor">
        
          <h4 class="cfor">Students added</h4>
          <ul class="list-group">
          {this.studentList()}</ul>
      </div>
    </div>
    )
  }
}