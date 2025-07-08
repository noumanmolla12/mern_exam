const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let topicSchema = new Schema({
    
   
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
      topic_name: {
        type: String,
        required: true
      },

    
},
{
    collection: 'topics'
});

module.exports = mongoose.model('TopicSchema', topicSchema);
