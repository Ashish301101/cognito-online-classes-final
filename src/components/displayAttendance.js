import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    
    <div className="container-fluid bground ">
      <br></br><h3 class="mzx">Student : {this.state.studentName}</h3>
     <table  className="table table table-bordered table table-hover table table-dark">
       <tr>
         <th>Date</th>
         <th>Class</th>
         <th>Teacher</th>
         <th>Attended</th>
         <th>PopUp 1</th>
         <th>PopUp 2</th>
         <th>popUp 3</th>
         {/* <th></th> */}
       </tr>
        {this.listStudents()}

     </table>
     <div class="anana"><Link to="/displayStudent"><button className="button-quiz btn btn-light ">Back</button></Link></div>
      </div>
    
    )
  }
}