import axios from 'axios';
import React, { Component } from 'react'
import "./global.css"

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            loggedIn:''
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

    
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5500/teachers/signin`,{Teachername:this.state.username,password:this.state.password})
        .then(res => {
            console.log(res)
             if(res.data.st === 'successful'){
                 {console.log('SUCCESSFULL');}
                 window.location = '/displayTeachers';
             }
             else{
                this.setState({loggedIn:"Wrong Details! Try Again..."});
                {console.log(this.state.loggedIn)}
             }
        }).catch(err => this.setState({loggedIn:"Wrong Details! Try Again..."}));
        // window.location = '/displayTeachers';
    }
    // test =  ()=>{
    //     axios.post("http://localhost:5500/teachers/test","testing").then(()=>console.log("SENT"));
    // }
    render() {
        return (
        <div className="container-fluid bground">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-6 col-md-3">
            
                <form  onSubmit={this.handleSubmit}>
                    <div className="form-containerr form-group mt-5 whynot">
                    
                        <label>UserName</label>
                        <input type="text" className="form-control" placeholder="Username" id="xyz" name="username" value={this.state.username} onChange={this.handleName} required />
                        <br></br>
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" id="password" name="password" value={this.state.password} onChange={this.handlePass} required />
                        <br></br>
                        <input type="submit" className="form-control btn-info" value="Submit"/>
                        <br></br>
                        <div class="bottom text-center mb-5">
                        <p class="mario">Don't have an account?<br></br>< a class="pepe" href="http://localhost:3000/signup" >Register now</a></p>
                        </div>
                    </div>
                </form>
                
            </div>
            
        </div>
        <div>
                <h6 class="qqq">{this.state.loggedIn}</h6>
                </div>
    </div>
        )
    }
}
