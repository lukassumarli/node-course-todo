require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save()
    .then((result) => { res.send(result) })
    .catch((err) => { res.status(400).send(err) });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((err) => {
        res.status(400).send(err)
    });
});

app.get('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    if (!ObjectID.isValid(todoId)) {
        return res.status(404).send();
    }
    Todo.findById(todoId).then((todo) => {
        if(!todo) {
            return res.status(404).send('Usernot found')
        }
        res.send({todo})
    }).catch((err) => {
        res.status(400).send()
    });
});

app.delete('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    if(!ObjectID.isValid(todoId)) {
        return res.status(404).send()
    }

    Todo.findByIdAndRemove(todoId).then((todo)=>{
        if(!todo) {
            return res.status(404).send()
        };
        res.send({todo})
    }).catch((err) => {
        return res.status(400).send();
    })
})

app.patch('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);
    
    if(!ObjectID.isValid(todoId)){
        return res.status(404).send()
    };

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(todoId, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        };

        res.send({todo})
    }).catch(err => res.status(400).send())

});

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password'])
    let user = new User(body)

    user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((err)=>{
            res.status(400).send(err)
        })
})

app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
});

// POST 'users/login (email, password) 
app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password'])

   User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);  
    })
   }).catch((err) => {
    res.status(400).send()
   });
})

app.listen(port, () => {
    console.log(`started up at port ${port}`)
});

module.exports = {app}
