const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server/server');
const {Todo} = require('./../server/models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
})

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

                Todo.find().then((todo) => {
                    expect(todo.length).toBe(1);
                    expect(todo[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            })
    })
})