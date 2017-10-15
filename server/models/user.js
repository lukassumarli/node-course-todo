const mongoose = require('mongoose');
const {Schema} = mongoose;

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
})

// let User = mongoose.model('User', {
//     email: {
//         type: String,
//         required: true,
//         minLength: 1,
//         trim: true
//     }
// })

let User = mongoose.model('User', userSchema);

module.exports = {User};
