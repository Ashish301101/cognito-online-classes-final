import React, { Component } from 'react'
import axios from "axios";
import "./global.css"
export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            email:'',
            password:''
        }
    }

    handleName = (e) => {
        this.setState({
            username:e.target.value
        })
    }

    handlePass = (e) => {
        this.setState({
            password:e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log({Teachername:this.state.username,password:this.state.password});
        axios.post(`http://localhost:5500/teachers/signup`,{Teachername:this.state.username,email:this.state.email,password:this.state.password})
        .then(res => console.log(res));
        // window.location = '/teachers';
    }
    render() {
        return (
        <div className="container-fluid bground">
            <div className="row justify-content-around">
            <div className="col-12 col-sm-6 col-md-3">
                <form  onSubmit={this.handleSubmit}>
                <div className="form-containerr form-group mt-5 whynot">
                <label>UserName</label>
                <input type="text" className="form-control" placeholder="Username" id="xyz" name="username" value={this.state.username} onChange={this.handleName} required />
                <br></br>
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" id="email" name="email" value={this.state.email} onChange={this.handleEmail} required />
                <br></br>
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" id="password" name="password" value={this.state.password} onChange={this.handlePass} required />
                <br></br>
                <input type="submit" className="form-control align-content-center btn-info" value="Submit"/>
                <br></br>
                
                <div class="bottom text-center mb-5">
                        <p >Already have an account?<br></br>< a class="pepe" href="http://localhost:3000/login"  >Login</a></p>
                </div>
                </div>
                
                </form>
                
            </div>
            </div>
        </div>
        )
    }
}
