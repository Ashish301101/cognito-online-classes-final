import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import "./global.css"

export default class AddStudent extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            email:'',
            srn:''
        }
    }

    handleName = (e) => {
        this.setState({
            username:e.target.value
        })
    }

    handleSrn = (e) => {
        this.setState({
            srn:e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5500/students/addStudent`,{Studentname:this.state.username,email:this.state.email,srn:this.state.srn})
        .then(res => console.log(res))
        
        window.location = '/displayStudent';
    }
    render() {
        return (
            <div className="container-fluid bground">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6 col-md-3">
                <form onSubmit={this.handleSubmit}>
                <div className="form-containerr form-group mt-5 okay">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Student Name" id="xyz" name="studentname" value={this.state.username} onChange={this.handleName} required />
                <br></br>
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" id="email" name="email" value={this.state.email} onChange={this.handleEmail} required />
                <br></br>
                <label>SRN</label>
                <input type="text"  className="form-control" placeholder="SRN" id="srn" name="srn" value={this.state.srn} onChange={this.handleSrn} required />
                <br></br>
                <input type="submit" className="form-control btn-info" value="Submit"/>
                </div>
                </form>
            </div>
            </div>
                    <div class="ana"><Link to="/displayTeachers"><button className="button-quiz btn btn-light ">Back</button></Link></div>
            </div>
        )
    }
}
