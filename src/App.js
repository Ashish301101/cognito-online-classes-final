import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nav from "./components/Nav";
import HomePage from "./components/homepage";
import Login from "./components/login";
import SignUp from "./components/signup";
import displayTeachers from "./components/displayTeachers";
import { BrowserRouter as Router, Route} from "react-router-dom";
import EditTeacher from "./components/editTeacher";
import AddStudent from "./components/addStudent";
import EditStudent from "./components/editStudent";
import displayStudent from "./components/displayStudent";
import AddClass from "./components/addClass";
import EditClass from "./components/editClass";
import displayClass from "./components/displayClass";
import addStudentstoClass from "./components/addStudentstoClass";
import displayStudentsofClass from "./components/displayStudentsofClass";
import joinClass from "./components/joinClass";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import quiz from "./components/quiz";
import displayAttendance from "./components/displayAttendance";

function App() {
  return (
    <Router>
      <div>
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={Login} />
      <Route path='/signup' exact component={SignUp} />
      <Route path='/displayTeachers' exact component={displayTeachers} />
      <Route path="/editTeacher/:id" exact component={EditTeacher} />
      <Route path="/addStudent" exact component={AddStudent} />
      <Route path="/displayStudent" exact component={displayStudent} />
      <Route path="/editStudent/:id" exact component={EditStudent} />
      <Route path="/addClass" exact component={AddClass} />
      <Route path="/displayClass" exact component={displayClass} />
      <Route path="/updateClass/:id" exact component={EditClass} />
      <Route path="/updateClass/addStudent/:id" exact component={addStudentstoClass} />
      <Route path='/displayStudentsofClass/:id' exact component={displayStudentsofClass} />
      <Route path="/joinClass" exact component={joinClass} />
      <Route path='/quiz' exact component={quiz}/>
      <Route path="/displayAttendance/:id" exact component={displayAttendance} />
    </div>
    </Router>
    
  );
}

export default App;
