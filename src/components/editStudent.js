import React, { Component } from 'react';
import axios from 'axios';

export default class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.handleStudentname = this.handleStudentname.bind(this);
    this.handleSRN = this.handleSRN.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      Studentname: '',
      email: '',
      srn:'',
      Students: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5500/students/students/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          Studentname: response.data.studentName,
          email: response.data.email,
          srn:response.data.srn
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5500/students/students')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            Students: response.data.map(Student => Student.studentName)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  handleStudentname(e) {
    this.setState({
      Studentname: e.target.value
    })
  }

  handleSRN(e) {
    this.setState({
      srn: e.target.value
    })
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const details = {
      studentName: this.state.Studentname,
      email: this.state.email,
      srn: this.state.srn
    }

    console.log(details);

    axios.post('http://localhost:5500/students/updateStudent/' + this.props.match.params.id, details)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    
    <div className="container-fluid bground">
      <div className="row justify-content-center">
      <div className="col-12 col-sm-6 col-md-3">
      <h3>Edit Student Details</h3>
      <form onSubmit={this.handleSubmit}>

        {/* dropdown of names:(We have used input field instead)
        :<div className="form-group"> 
          <label>Studentname: </label>
          <select ref="StudentInput"
              required
              className="form-control"
              value={this.state.Studentname}
              onChange={this.handleStudentname}>
              {
                this.state.Students.map(function(Student) {
                  return <option 
                    key={Student}
                    value={Student}>{Student}
                    </option>;
                })
              }
          </select>
        </div> */}

        <div className="form-containerr form-group mt-5"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Studentname}
              onChange={this.handleStudentname}
              />
        <br></br>
        <div> 
          <label>email: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.handleEmail}
              />
        </div>
        <br></br>
        <div> 
          <label>SRN: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.srn}
              onChange={this.handleSRN}
              />
        </div>
        <br></br>
        <div>
          <input type="submit" value="Edit Details" className="form-control btn btn-primary" />
        </div>
      </div>
      </form>
      </div>
      </div>
      </div>
    
    )
  }
}