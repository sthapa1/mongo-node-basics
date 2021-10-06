const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    description: String
});

module.exports = mongoose.model('Todo', todoSchema);