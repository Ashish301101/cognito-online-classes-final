const router = require('express').Router();
const Classes = require('../models/class.model');
const Students = require('../models/student.model');

//to display all classes
router.route('/classes').get((req, res) => {
  Classes.find()
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json('Error: ' + err));
});

//display specific class
router.route('/classes/:id').get((req, res) => {
  // console.log("RECIECME");
  Classes.findById(req.params.id)
      .then(Class => {res.json(Class);})
      .catch(err => {res.status(400).json('Error: ' + err);});
});

// to add a new class
router.route('/addClass').post((req, res) => {
  // console.log(req.body);
  const teacherName = req.body.teacherName;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const className = req.body.className;
  const students = [];

  const newClass = new Classes({
    className:className,
    teacherName:teacherName,
    students:students,
    startTime:startTime,
    endTime:endTime
  });

  newClass.save()
  .then(() => res.json('Class added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// to find specific class
router.route('/:id').get((req, res) => {
  Classes.findById(req.params.id)
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json('Error: ' + err));
});

//to add a particular student to a particualar class
router.route('/addStudents/:classid').post((req, res) => {
  // let student = req.body.studentName.split(' - ')[0];
  Classes.findById(req.params.classid)
    .then(classes => {

      // console.log(req.body)
      classes.students = req.body.map(student => [student.split(' - ')[0],0,0,0,0]);

      classes.save()
        .then(() => {res.json('Class updated!');})
        .catch(err => {res.status(400).json('Error: ' + err);console.log(err)});
    })
    .catch(err => {res.status(400).json('Error: ' + err);});
});

// delete a particular class
router.route('/deleteClass/:id').delete((req, res) => {
  Classes.findByIdAndDelete(req.params.id)
    .then(() => res.json('Class deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update class features
router.route('/updateClass/:id').post((req, res) => {
  Classes.findById(req.params.id)
    .then(classes => {
      classes.teacherName = req.body.teacherName;
      classes.startTime = req.body.startTime;
      classes.endTime = req.body.endTime;
      classes.className = req.body.className;
      classes.students = [];

      classes.update()
        .then(() => res.json('Class updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// get the classes for a given student
router.route('/timetable').post((req,res) => {
  let myClasses = [];
  let students = [];
  let name = req.body.name;
  // console.log("RECIEVED",name);
  Classes.find()
  .then(classes => {
    // console.log(classes[0].students)
    students = classes[0].students.map(student => student[0]);
    // console.log(students)
    if(students.includes(name)){
      myClasses.push(classes[0])
    }
    // console.log("classes:",myClasses)
    res.json(myClasses);
  })
  .catch(err => {res.status(400).json('Error: ' + err);console.log(err)});
  
});

router.route('/attendance/:id').get((req,res) => {
  let name = req.params.id;
  let toSend = [];
  let students = [];
  Classes.find()
  .then(classes => {
    classes.map(Class => {
      students = Class.students;
      students.map(student => {
        if(student[0] === name){
          toSend.push([Class.className,Class.teacherName,Class.startTime,student[1],student[2],student[3],student[4]])
        }
      })
    })
    res.json({classes:toSend});
    // console.log({classes:toSend});
  })
  .catch(err => {res.status(400).json('Error: ' + err);console.log(err)});
});


module.exports = router;