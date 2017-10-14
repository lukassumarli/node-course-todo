const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

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

app.listen(4200, () => {
    console.log('Started on port 4200')
});

module.exports = {app}
