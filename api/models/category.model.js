const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    
  parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        default: null 
      },

  course_name: {
    type: String,
    required: true
  },
 
},
{
    collection: 'categories'
});

module.exports = mongoose.model('CategorySchema', categorySchema);
