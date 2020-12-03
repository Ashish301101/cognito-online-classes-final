import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Class = props => (
    <tr>
      <td>{props.Class.className}</td>
      <td>{props.Class.teacherName}</td>
      <td>{props.Class.startTime.toString().split('T')[0]} {','} {props.Class.startTime.toString().split('T')[1].split('Z')[0]}</td>
      <td>{props.Class.endTime.toString().split('T')[0]} {','} {props.Class.endTime.toString().split('T')[1].split('Z')[0]}</td>
      <td>
        <Link class="pepe1" to={"/updateClass/"+props.Class._id}>edit</Link> | <a class = "pepe1" href="#" onClick={() => { props.deleteClass(props.Class._id) }}>delete</a> | <Link class="pepe1" to={"/updateClass/addStudent/"+props.Class._id}>add a student</Link> | <Link class="pepe1" to={"/displayStudentsofClass/"+props.Class._id}>display students</Link>
      </td>
    </tr>
  )
  
  export default class ClassList extends Component {
    constructor(props) {
      super(props);
  
      this.deleteClass = this.deleteClass.bind(this);
      this.ClassList = this.ClassList.bind(this);
  
      this.state = {Classs: []};
    }
  
    componentDidMount() {
      axios.get('http://localhost:5500/classes/classes')
        .then(response => {
          this.setState({ Classs: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deleteClass(id) {
      axios.delete('http://localhost:5500/classes/deleteClass/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        Classs: this.state.Classs.filter(el => el._id !== id)
      })
    }
  
    ClassList() {
      return this.state.Classs.map(currentClass => {
        return <Class Class={currentClass} deleteClass={this.deleteClass} key={currentClass._id}/>;
      })
    }

    render() {
        return (
          <div className="container-fluid bground">
            <div class="a"><br></br>
                <h3 class="text-center font-weight-bolder ok">All Classes</h3>
                <table className="table table table-bordered table table-hover table table-dark">
                <thead className="thead-dark">
                    <tr class="bg-primary">
                    <th>Class Name</th>
                    <th>Teacher Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.ClassList() }
                </tbody>
                </table>
            </div></div>
        )
    }
}
