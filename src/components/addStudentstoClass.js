import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class addStudentToClass extends Component {
  constructor(props) {
    super(props);

    this.handleStudentname = this.handleStudentname.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      className: '',
      teacherName: '',
      studentName: '',
      students: [],
      studentsAdded: [],
      added:1
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5500/classes/classes/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          className: response.data.className,
          teacherName : response.data.teacherName,
          studentsAdded : response.data.students.map(student => student[0])
        })   
        // {console.log(this.state.studentsAdded);}
      })
     
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5500/students/students')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            students: response.data.map(student => student.studentName + ' - ' + student.srn)
          })
        }
        // console.log(this.state.students)
        this.setState({
            studentName:this.state.students[0]
        })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  handleStudentname(e) {
    this.setState({
        studentName: e.target.value
    })
    // {console.log(this.state.studentName)}
  }

  handleSubmit(e) {
    e.preventDefault();

    // {console.log(this.state.studentName.split(' - ')[0])};
      // console.log()
    this.state.studentsAdded.push(this.state.studentName);
    this.state.studentsAdded = [...new Set(this.state.studentsAdded)];
    // {console.log(this.state.studentsAdded)}

      axios.post('http://localhost:5500/classes/addStudents/' + this.props.match.params.id, this.state.studentsAdded)
      .then(res => {console.log(res.data)});

    //just to make changes to the state, so that the content reloads 
    if(this.state.added === 1){
      this.setState({
        added:0
      })
    }
    else{
      this.setState({
        added:1
      })
    }
  }
  studentList = () => {
      let students = [];
      if(this.state.studentsAdded.length === 0){
          students.push(<h5 class="bobmarley">No students yet!</h5>)
      }
      else{
          {console.log("SUCCESS")}
            this.state.studentsAdded.map(student => {
              if(typeof(student) == 'string')
                students.push(<li class="list-group-item">{student} | <a class="pepe2" href="#" id={student} onClick={this.deleteStudent}>delete</a></li>);
              else{
                students.push(<li class="list-group-item">{student[0]} | <a class="pepe2" href="#" id={student} onClick={this.deleteStudent}>delete</a></li>);
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
    <div className="container-fluid bground">
      <div class="dfs"><br></br>
      <h3 class="afor">Add Student</h3>
      <h4 class="afor">Class Name : {this.state.className}</h4>
      <h4 class="afor">By : {this.state.teacherName}</h4></div>
      <form onSubmit={this.handleSubmit}>
      
        <div className="form-group"> 
        <label class="bfs cringe">Student Name </label>
            <select  ref="studentInput"
                required
                className="form-control koli"
                value={this.state.studentName}
                onChange={this.handleStudentname}>
                {
                    this.state.students.map(function(student) {
                    return <option 
                        key={student}
                        value={student}>{student}
                        </option>;
                    })
                }
            </select>
        </div>
        
        <div className="form-group">
            <input type="submit" value="Add Details" className="btn btn-primary mqw" />
        </div>
      </form>

      <div class="maams">
          <h4 class="mlo">Students added</h4>
          {this.studentList()}
      </div><br></br>
      <div class="noah">
      <Link to="/displayClass"><button className="button-quiz btn btn-light">Back</button></Link>
      </div>
    </div>
    )
  }
}