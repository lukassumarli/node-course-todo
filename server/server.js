const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(4200, () => {
    console.log('Started on port 4200')
});

module.exports = {app}
