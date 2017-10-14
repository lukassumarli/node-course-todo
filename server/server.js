const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 4200;

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

app.listen(port, () => {
    console.log(`started up at port ${port}`)
});

module.exports = {app}
