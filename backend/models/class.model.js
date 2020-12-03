const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({
  className : { type: String, required: true },
  teacherName : { type: String, required: true },
  students: { type: Array, required:true },
  startTime : { type: Date, required: true},
  endTime: { type: Date, required: true }
});

const Classes = mongoose.model('class', classSchema);

module.exports = Classes;