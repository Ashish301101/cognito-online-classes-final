const router = require('express').Router();
let Student = require('../models/student.model');

// display all students
router.route('/students').get((req, res) => {
  Student.find()
    .then(Students => res.json(Students))
    .catch(err => res.status(400).json('Error: ' + err));
});

//display specific student
router.route('/students/:id').get((req, res) => {
  // console.log("RECIECME");
  Student.findById(req.params.id)
      .then(Student => {res.json(Student);})
      .catch(err => {res.status(400).json('Error: ' + err);console.log(err);});
});

// add a new student
router.route('/addStudent').post((req, res) => {
  const Studentname = req.body.Studentname;
  const srn = req.body.srn;
  const email = req.body.email;

  const newStudent = new Student({
    studentName:Studentname,
    srn:srn,
    email:email
  });

  newStudent.save()
    .then(() => res.json('Student added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete a student
router.route('/deleteStudent/:id').delete((req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student details deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update a student
router.route('/updateStudent/:id').post((req, res) => {
  Student.findById(req.params.id)
    .then(students => {
      students.studentName = req.body.studentName;
      students.srn = req.body.srn;
      students.email = req.body.email;

      students.save()
        .then(() => res.json('Student details updated updated!'))
        .catch(err => {res.status(400).json('Error: ' + err); console.log(err)});
    })
    .catch(err => {res.status(400).json('Error: ' + err); console.log(err)});
});

module.exports = router;