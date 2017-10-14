const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



// let id = '59e1e8efe7406a0e1f488e4f11';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// // Todo.find({
// //     _id: id
// // }).then((todos) => {
// //     console.log('todos', todos)
// // })

// // Todo.findOne({
// //     _id : id
// // }).then((todo) => {
// //     console.log('todo', todo)
// // })

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('id not found')
//     }
//     console.log('todo by id', todo)
// }).catch((err) => {
//     console.log(err)
// })

let userId = '59e1b80c1c647f09b257398a';

User.findById(userId).then((user) => {
    if(!user) {
        return console.log('user not found')
    }
    console.log('user', user);
}).catch((err) => {
    console.log('err');
})