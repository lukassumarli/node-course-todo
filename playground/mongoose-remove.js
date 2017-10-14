const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((res)=> {
//     console.log(res);
// })


// Todo.findByIdAndRemove('59e22ea63228921a4602bb95').then((todo)=>{
//     console.log(todo)
// })

Todo.findOneAndRemove({_id:'59e22ea63228921a4602bb96'}).then((todo) => {
    console.log(todo);
})