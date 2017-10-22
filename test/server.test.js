const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server/server');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {todos, populateTodo, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodo);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((todo) => {
                    expect(todo.length).toBe(1);
                    expect(todo[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err)
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((err) => {
                    done(err)
                });
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    });
});

describe('GET /todos/:id', ()=>{
    it('should get the todo with :id id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object id', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('POST /todos/:id delete item', () => {
    it('should delete one item by id', (done)=>{
        let todoId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${todoId}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(todoId)
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.findById(todoId).then((todo)=>{
                    expect(todo).toBeNull();
                    done();
                }).catch(err => done(err));
            });
    });

    it('shoud return 404 if todo not found', (done)=>{
        let todoId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${todoId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object id', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done)=>{
        let todoId = todos[1]._id.toHexString();
        let text = 'new text';
        request(app)
            .patch(`/todos/${todoId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeDefined();
            })
            .end(done)
    });

    it('should clear completedAt when todo is not completed', (done)=>{
        let todoId = todos[2]._id.toHexString();
        let text = 'new text 2';

        request(app)
            .patch(`/todos/${todoId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString())
                expect(res.body.email).toBe(users[0].email)
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({})
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        let email = 'example@email.com';
        let password = 'Pass123';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeDefined();
                expect(res.body._id).toBeDefined();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done();
                }

                User.findOne({email}).then((user) => {
                    expect(user).toBeDefined();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch(err => {
                    done(err);
                });
            });
    })

    it('should validation error', (done) => {
        request(app)
            .post('/users')
            .send({
                email: 'blalba',
                password: '1'
            })
            .expect(400)
            .end(done);
    })

    it('should not create user if email in use', (done) => {
        request(app)
            .post('/users')
            .send({
                email:users[0].email,
                password: 'pass1234'
            })
            .expect(400)
            .end(done)
    })
})

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeDefined();
            })
            .end((err, res) => {
                if(err) {
                    return done(err)
                }
                
                // User.findById(users[1]._id).then((user) => {
                //     expect(user.tokens[0]).toHaveProperty({
                //         access: 'auth',
                //         token: res.headers['x-auth']
                //     });
                User.findById(users[1]._id).then((user) => {
                    expect(user.toObject().tokens[0]).toMatchObject({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done()
                }).catch(err => {
                    done(err);
                });
            });
    });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: '123abc#$'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeUndefined()
            })
            .end((err, res) => {
                if(err){
                    return done(err)
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((err) => {
                    done(err);
                })

            })
    });
});