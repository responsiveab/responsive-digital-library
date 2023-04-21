import request from 'supertest';
import app from '../../src/index.js';
import db from '../../src/config/mongodb.config';
import axios from 'axios';
import bookRouter from '../../src/routes/book.routes.js';

describe('GET /', () => {
  let server;

  beforeAll(() => {
    server = app.listen();
  });

  afterAll((done) => {
    server.close(done);
    db.close(done);
    done();
  });

  it('should return 200 OK', async () => {
    const res = await request(server).get('/');
    expect(res.status).toEqual(200);
  });

  it('EB1: Add a book in the database', async() => {
    /*const res = await request(server).post('/api/books/9780307275264');

    expect(res.status).toEqual(200);*/
    const newBook = {
      _id: 12345,
      title: 'Test Book',
      body: 'This is a test book',
      author: 'John Doe',
      category: 'Test Category',
      language: 'English',
      publisher: 'Test Publisher',
      date: '2023-04-14',
      img: 'testimage.jpg'
    };

    const response = await request(server)
      .post('/api/books/' + newBook._id)
      .send(newBook);

    console.log(response.body);
    expect(response.status).toEqual(201);

  });


});

