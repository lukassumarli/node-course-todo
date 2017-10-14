// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if (err) {
        return console.log('Unable to connect to database');
    }

    console.log('connected to MongoDB server');
 
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId('59e0e1472d216b38fc151b42')
    // },{
    //    $set:{
    //        completed: false
    //    } 
    // }, {
    //     returnOriginal: false
    // }).then(res => {
    //     console.log(res)
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId('59e0d5b6f474ce0b3dad372d')
    },{
        $set:{
            name: 'Lukas'
        },
        $inc:{
            age: 1
        }
    },{
        returnOginal: false
    }).then(res => console.log(res));

    // db.close();
});