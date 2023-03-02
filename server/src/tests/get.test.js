import request from 'supertest';
import app from '../../src/index.js';

describe('GET /', () => {
  let server;

  beforeAll(() => {
    server = app.listen();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return 200 OK', async () => {
    const res = await request(server).get('/');
    expect(res.status).toEqual(200);
  });

});

