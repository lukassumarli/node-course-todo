const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://jonstall:jon123$%^@ds119345.mlab.com:19345/node-todo-api'
}

mongoose.connect( db.localhost || db.mlab, {
    useMongoClient: true
});

module.exports = {mongoose};