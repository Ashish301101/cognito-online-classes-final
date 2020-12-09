import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import DateTimePicker from 'react-datetime-picker'
import "./global.css"

export default class AddClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            className:'',
            teacherName:'',
            endTime:new Date(),
            startTime:new Date(),
            error:'',
            teachers: []
        }
    }

    handleName = (e) => {
        this.setState({
            className:e.target.value
        })
    }

    handleStartTime = (date) => {
        if(date != null)
            this.setState({
                startTime:date
            })
    }

    handleEndTime = (date) => {
        if(date != null)
            this.setState({
                endTime:date
            })
    }

    handleteacherName = (e) => {
            this.setState({
                teacherName:e.target.value
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.endTime < this.state.startTime){
            {console.log("start:",this.state.startTime,"endTime",this.state.endTime)}
            this.setState({
                error: "endTime should be after startTime"
            })
        }
        else{
            this.setState({
                error: ""
            })
            // {console.log({teacherName:this.state.teacherName,className:this.state.className,endTime:this.state.endTime,startTime:this.state.startTime})}
            axios.post(`http://localhost:5500/classes/addClass`,{teacherName:this.state.teacherName,className:this.state.className,endTime:this.state.endTime,startTime:this.state.startTime})
            .then(res => {console.log(res)});
            window.location = '/displayClass';
        }
    }
    componentDidMount() {

        axios.get('http://localhost:5500/teachers/teachers')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                teachers: response.data.map(teacher => teacher.teacherName)
              })

              this.setState({
                  teacherName:this.state.teachers[0]
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }
    render() {
        return (
            <div className="container-fluid bground">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6 col-md-3">
                <form onSubmit={this.handleSubmit}>
                <div className="form-containerr form-group mt-5 coolit">
                <label class="piu">Class Name</label>
                <input type="text" placeholder="Class Name" className="form-control" id="xyz" name="Classname" value={this.state.className} onChange={this.handleName} required />
                <br></br>
                <label class="piuk">Name</label>
                {/* <input type="teacherName" placeholder="teacherName" id="teacherName" name="teacherName" value={this.state.teacherName} onChange={this.handleteacherName} required /> */}

                <select ref="teacherInput"
                    required
                    className="form-control"
                    value={this.state.teacherName}
                    onChange={this.handleteacherName}>
                    {
                        this.state.teachers.map(function(teacher) {
                        return <option 
                            key={teacher}
                            value={teacher}>{teacher}
                            </option>;
                        })
                    }
                </select>
                <br></br>
                <label class="piuj">start time</label>
                <DateTimePicker  id="startTime" value={this.state.startTime} onChange={this.handleStartTime} required />
                <br></br><br></br>
                <label class="piuj">end time</label>
                <DateTimePicker class="jaq" id="endTime" value={this.state.endTime} onChange={this.handleEndTime} required />
                <br></br>
                <br></br>
                <input type="submit" className="form-control btn-info" value="Submit"/>
                </div>
            
                </form>
                <div>
                <h2>{this.state.error}</h2>
                </div>
            </div>
            </div>
            <div class="aa">
                <Link to="/displayTeachers"><button className="button-quiz btn btn-light">Back</button></Link></div>
            </div>
        )
    }
}
