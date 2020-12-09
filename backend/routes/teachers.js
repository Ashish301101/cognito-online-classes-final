const router = require('express').Router();
const Teachers = require('../models/teacher.model');

// display all teachers
router.route('/teachers').get((req, res) => {
    // console.log("RECIECME");
    Teachers.find()
        .then(Teachers => {res.json(Teachers);})
        .catch(err => {res.status(400).json('Error: ' + err);console.log(err);});
});

//display specific teacher
router.route('/teachers/:id').get((req, res) => {
    // console.log("RECIECME");
    Teachers.findById(req.params.id)
        .then(Teachers => {res.json(Teachers);})
        .catch(err => {res.status(400).json('Error: ' + err);console.log(err);});
});

// add a new teacher or signup
router.route('/signup').post((req, res) => {
    const Teachername = req.body.Teachername.toString();
    const email = req.body.email;
    const pass = req.body.password;

    const newTeacher = new Teachers({
        teacherName:Teachername,
        email:email,
        password:pass
    });
    // console.log("RECIEVED");
    // console.log(Teachername,email,pass);
    newTeacher.save()
    .then(() => {
        res.json('Teacher added!')
        // console.log("ADDED");
    })
    .catch(err => {
        res.status(400).json('Error: ' + err);
        console.log(err);
    });
});

// signin
router.route('/signin').post((req, res) => {
    // console.log("RECIEVED");
    const Teachername = req.body.Teachername;
    const pass = req.body.password;
    // console.log(Teachername,pass);
    let found = 1;
    Teachers.find({teacherName:Teachername}).then(teacher =>
        {
            // console.log(teacher,pass)
            if(teacher[0].password == pass){
                // console.log("Successfull");
                found = 0;
                res.json({st:"successful"});
            }
            else{
                res.json({st:"unsuccessful"});
            }
        }).catch(err => res.json("Not found!"));

});


// delete a student
router.route('/deleteTeacher/:id').delete((req, res) => {
Teachers.findByIdAndDelete(req.params.id)
    .then(() => res.json('Teacher details deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update a student
router.route('/updateTeacher/:id').post((req, res) => { 
    Teachers.findById(req.params.id)
    .then(function (teachers) {
            teachers.teacherName = req.body.username;
            teachers.email = req.body.email;

            teachers.save()
                .then(() => res.json('Teacher details updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;