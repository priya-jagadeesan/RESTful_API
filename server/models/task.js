// require mongoose
var mongoose = require('mongoose');
// create the schema
var TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 1},
    description: { type: String, default : "" },
    completed: { type: Boolean, default : false},
    created_at: { type: Date, default : Date.now() },
    updated_at: { type: Date, default : Date.now() }
  });

mongoose.model('Task', TaskSchema);
