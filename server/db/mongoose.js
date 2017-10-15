const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// let db = {
//     localhost: 'mongodb://localhost:27017/TodoApp',
//     mlab: 'mongodb://jonstall:123456@ds119345.mlab.com:19345/node-todo-api'
// }

mongoose.connect( process.env.MONGODB_URI, {
    useMongoClient: true
});

module.exports = {mongoose};