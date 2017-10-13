// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

let obj = new ObjectId();
console.log(obj.getTimestamp());

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if (err) {
        return console.log('Unable to connect to database');
    }

    console.log('connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if(err) {
    //         return console.log('unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2))
    // })

    // db.collection('Users').insertOne({
    //     name: 'Lukas',
    //     age: 37,
    //     location: 'Cambodia'
    // }, (err, res) => {
    //     if(err) {
    //         return console.log('Unable to insert data', err);
    //     }
    //     console.log(res.ops[0]._id.getTimestamp())
    // })

    db.close();
});