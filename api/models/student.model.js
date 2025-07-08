const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
student_name: {
    type: String
},


email: {
    type: String
},
phone: {
    type: String
},
student_dob: {
    type: String
},

student_address: {
    type: String
},

password: {
    type: String
},
confirm_password: {
    type: String
},


  student_images: [{ type: String }] 
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
