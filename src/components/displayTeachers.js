import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const User = props => (
    <tr>
      <td>{props.teacher.teacherName}</td>
      <td>{props.teacher.email}</td>
      <td>
        <Link class="pepe3" to={"/editTeacher/"+props.teacher._id}>edit</Link> | <a class="pepe3" href="#" onClick={() => { props.deleteUser(props.teacher._id) }}>delete</a>
      </td>
    </tr>
  )
  
  export default class TeacherList extends Component {
    constructor(props) {
      super(props);
  
      this.deleteTeacher = this.deleteTeacher.bind(this);
      this.teacherList = this.teacherList.bind(this);
  
      this.state = {teachers: []};
    }
  
    componentDidMount() {
      axios.get('http://localhost:5500/teachers/teachers')
        .then(response => {
          this.setState({ teachers: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deleteTeacher(id) {
      axios.delete('http://localhost:5500/teachers/deleteTeacher/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        teachers: this.state.teachers.filter(el => el._id !== id)
      })
    }
  
    teacherList() {
      return this.state.teachers.map(currentUser => {
        return <User teacher={currentUser} deleteUser={this.deleteTeacher} key={currentUser._id}/>;
      })
    }

    render() {
        return (
          <div className="alert alert-primary bground">
                <h3 class="text-center font-weight-bolder mzxo">All Users</h3>
                <table className="table table table-bordered table table-hover table table-dark">
                <thead className="thead-dark">
                    <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.teacherList() }
                </tbody>
                </table>
                <div class="k">
			            <Link to="/addStudent"><button className="button-quiz btn btn-light k">Add Students</button></Link>
			            <Link to="/addClass"><button className="button-quiz btn btn-light k" >Add Classes</button></Link>
                  <Link to="/displayClass"><button className="button-quiz btn btn-light k" >Display Classes</button></Link>
                  <Link to="/displayStudent"><button className="button-quiz btn btn-light k" >Display Students</button></Link>
		            </div>
            </div>
        )
    }
}
