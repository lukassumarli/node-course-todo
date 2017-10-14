// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if (err) {
        return console.log('Unable to connect to database');
    }

    console.log('connected to MongoDB server');
 
    // db.collection('Todos').deleteMany({text: 'Lunch'}).then((res) => {
    //     console.log(res);
    // })

    // db.collection('Todos').deleteOne({text:'Lunch'}).then((res) => {
    //     console.log(res);c
    // })

    // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
    //     console.log(res);
    // })

    // db.collection('Users').deleteMany({name: 'Lukas'}).then(res => console.log(res));

    db.collection('Users').findOneAndDelete({
        _id: new ObjectId('59e0dc2b19e5a00be9540598')
    }).then(res => console.log(res));

    // db.close();
});