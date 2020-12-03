import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Student = props => (
    <tr>
      <td>{props.student.studentName}</td>
      <td>{props.student.srn}</td>
      <td>{props.student.email}</td>
      <td>
        <Link to={"/editStudent/"+props.student._id}>edit</Link> | <a href="#" onClick={() => { props.deleteStudent(props.student._id) }}>delete</a> | <Link to={"/displayAttendance/"+props.student.studentName}>attendance</Link>
      </td>
    </tr>
  )
  
  export default class StudentList extends Component {
    constructor(props) {
      super(props);
  
      this.deletestudent = this.deletestudent.bind(this);
      this.studentList = this.studentList.bind(this);
  
      this.state = {students: []};
    }
  
    componentDidMount() {
      axios.get('http://localhost:5500/students/students')
        .then(response => {
          this.setState({ students: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deletestudent(id) {
      axios.delete('http://localhost:5500/students/deletestudent/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        students: this.state.students.filter(el => el._id !== id)
      })
    }
  
    studentList() {
      return this.state.students.map(currentStudent => {
        return <Student student={currentStudent} deleteStudent={this.deletestudent} key={currentStudent._id}/>;
      })
    }

    render() {
        return (
            <div className="alert alert-primary">
                <h3 class="text-center font-weight-bolder">All Students</h3>
                <table className="table table table-bordered table table-hover table table-dark">
                <thead className="thead-dark">
                    <tr class="bg-primary">
                    <th>Student Name</th>
                    <th>SRN</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.studentList() }
                </tbody>
                </table>
            </div>
            
        )
    }
}
