const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentName: { type: String, required: true },
  srn: { type: String, required: true },
  email: { type: String, required: true },
});

const Students = mongoose.model('student', studentSchema);

module.exports = Students;