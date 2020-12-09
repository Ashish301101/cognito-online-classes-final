const express = require('express');
const cors = require('cors');
const app = express();
const spawn = require("child_process").spawn;
app.use(cors());
const port = process.env.PORT || 5500;

const mongoose = require('mongoose');
const server = require('http').Server(app)
const io = require('socket.io')(server)

srv = server.listen(port);

app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
  debug: true
}))
const Classes = require('./models/class.model');

require('dotenv').config();
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const classesRouter = require('./routes/classes');
const studentsRouter = require('./routes/student');
const teachersRouter = require('./routes/teachers');

app.use('/classes', classesRouter);
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);

let student;
app.post('/joinClass/:id',(req,res) => {
  student = req.body.name;
  // console.log("in /joinClass",student); 
  res.redirect(`/${req.params.id}`)
  // res.render('room',{roomId:''});
});

app.get('/:room',(req,res)=>{
  Classes.findById(req.params.room)
      .then(Class => {
        // res.json(Class);
        let className = Class.className;
        let teacherName = Class.teacherName;
        let roomId = req.params.room;
        let duration = new Date(Class.endTime) - new Date(Class.startTime);
        // console.log(',',duration);
        if(Class.students.length > 0){
          Class.students.forEach(Student => {
            // console.log(Student[0],student)
            if(Student[0] === student){
              Student[1] = 1;
            }
          });
          Class.markModified('students');
          Class.save()
          .then(() => {})
          .catch(err => console.log(''));
          // console.log(Class.students);
          res.render('room',{studentName:student,className:className,teacherName:teacherName,roomId:roomId,duration:duration}); 
        }
        else{
          res.send("No student has been been added to this class!");
        }
      })
      .catch(err => { res.send("No such class!!! Check your class ID...")});
})

app.get('/attentiveness/:class/:id',(req,res)=>{
  // console.log('in '+req.params.room);
  // console.log("clicked")
  let student = req.params.id;
  Classes.findById(req.params.class)
      .then(Class => {
        // console.log(Class)
        Class.students.forEach(student => {
          for(let i=2;i<=4;i++){
            if(student[i]==0){
              student[i] = 1;
              break;
            }
          }
        })
        Class.markModified('students');
          Class.save()
          .then(() => console.log('Attendance added!'))
          .catch(err => console.log(''));
          // console.log(Class);
      });
      // Classes.find().then(Class => console.log(Class));
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId);
    // messages
    socket.on('message', (message) => {
      //send message to the same room
      const process = spawn('python',["./api.py", 
                              message] ); 
    
      process.stdout.on('data', function(data) { 
          console.log(data.toString())
          if(data.toString()[0] == 's'){
            io.to(roomId).emit('createMessage', 'message deleted')
          }
          else{
            io.to(roomId).emit('createMessage', message)
          }
      } ) 
      
      console.log("From server.js ",message);
      
  })

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

