import request from 'supertest';
import app from '../../src/index.js';
import db from '../../src/config/mongodb.config';

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

});

