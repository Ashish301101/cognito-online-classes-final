import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./global.css"
export default class EditTeacher extends Component {
  constructor(props) {
    super(props);

    this.handleTeachername = this.handleTeachername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5500/teachers/teachers/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.teacherName,
          email: response.data.email,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5500/teachers/teachers')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.teacherName)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  handleTeachername(e) {
    this.setState({
      username: e.target.value
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
      username: this.state.username,
      email: this.state.email
    }

    console.log(details);

    axios.post('http://localhost:5500/teachers/updateTeacher/' + this.props.match.params.id, details)
      .then(res => console.log(res.data));

    window.location = '/displayTeachers';
  }

  render() {
    return (
    <div> 
    <div className="container-fluid bground"><br></br>
    <h3 class="kk">Edit User Details</h3>
    <div className="row justify-content-center">
      <div className="col-12 col-sm-6 col-md-3">
     

    
      <form onSubmit={this.handleSubmit}>
       <div className="form-containerr form-group mt-5">
        {/* dropdown of names:(We have used input field instead)
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.handleTeachername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div> */}

        <div> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.handleTeachername}
              />
        </div>
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
          <input type="submit" value="Edit Details" className="btn btn-primary btn-block" />
        </div>
      </div>
      </form>
      </div>
      </div>
      <div class="ananan"><Link to="/displayTeachers"><button className="button-quiz btn btn-light ">Back</button></Link></div>
      </div>
    
    </div>
    )
  }
}