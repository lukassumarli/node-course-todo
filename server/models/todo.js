const mongoose = require('mongoose');
const {Schema} = mongoose;

let todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

let Todo = mongoose.model('Todo', todoSchema);

// let Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minLength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

module.exports = {Todo};