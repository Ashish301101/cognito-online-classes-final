import React, { Component } from 'react';
import axios from 'axios';

export default class displayAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes:[],
      studentName:this.props.match.params.id,
    }
    this.listStudents = this.listStudents.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5500/classes/attendance/'+this.props.match.params.id)
      .then(response => {
        // {console.log(response.data)}
        this.setState({
          classes : response.data.classes
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
      // {console.log(this.state.classes)}
  }
    listStudents = () => {
    let returned = [];
    this.state.classes.forEach(myClass => {
      returned.push(<tr>
        <td>{myClass[2]}</td>
        <td>{myClass[0]}</td>
        <td>{myClass[1]}</td>
        <td>{myClass[3]?"Yes":"No"}</td>
        <td>{myClass[4]?"Yes":"No"}</td>
        <td>{myClass[5]?"Yes":"No"}</td>
        <td>{myClass[6]?"Yes":"No"}</td>
      </tr>)
    })
    return returned;
  }

  render() {
    return (
    
    <div className="container-fluid bground">
      <h3>Student : {this.state.studentName}</h3>
     <table>
       <tr>
         <th>Date</th>
         <th>Class</th>
         <th>Teacher</th>
         <th>Attended?</th>
         <th>Attentiveness?</th>
         <th>a</th>
         <th>b</th>
         {/* <th></th> */}
       </tr>
        {this.listStudents()}

     </table>

      </div>
    
    )
  }
}