const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
    
   
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
      },
      question_text: {
        type: String,
        required: true
      },

    
},
{
    collection: 'questions'
});

module.exports = mongoose.model('QuestionSchema', questionSchema);
