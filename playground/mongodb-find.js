// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if (err) {
        return console.log('Unable to connect to database');
    }

    console.log('connected to MongoDB server');

    // db.collection('Todos').find({

    //     _id:new ObjectId('59e0e1472d216b38fc151b42')
    // }).toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }).catch(err => {
    //     if(err) {
    //         console.log('unable to fetch todos', err);
    //     }
    // })

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}` )
    // })

    db.collection('Users').find({name:'Lukas'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2))
    })

    // db.close();
});