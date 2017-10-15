const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const {Todo} = require('../../server/models/todo');
const {User} = require('../../server/models/user');

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333
    },
    {
        _id: new ObjectID(),
        text: 'Third test todo'
    }
];

let userIdOne = new ObjectID();
let userIdTwo = new ObjectID();

const users = [
    {
        _id: userIdOne,
        email: 'lukas.sumarli@gmail.com',
        password: 'userOnePass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({_id: userIdOne, access: 'auth'}, 'abc123').toString()
            }

        ]
    },
    {
        _id: userIdTwo,
        email: 'jonstall2015@gmail.com',
        password: 'userTwoPass'
    }
];


const populateTodo = (done) => {
    Todo.remove({}).then(() =>{
        return Todo.insertMany(todos);
    }).then(() => done());
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
    
        return Promise.all([userOne, userTwo]);
    }).then(() => done());

}

module.exports ={ todos, users, populateUsers, populateTodo };