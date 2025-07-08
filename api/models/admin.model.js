const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
admin_name: {
    type: String
},


email: {
    type: String
},
phone: {
    type: String
},
admin_dob: {
    type: String
},

admin_address: {
    type: String
},

password: {
    type: String
},
confirm_password: {
    type: String
},


  admin_images: [{ type: String }] 
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
