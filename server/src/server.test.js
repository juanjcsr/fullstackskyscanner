const request = require('supertest');

const { app, server } = require('./server');

describe('GET /', () => {
  afterEach(() => {
    server.close();
  });

  test('It should render hello', (done) => {
    request(app).get('/api/hello').then((response) => {
      // console.log(response);
      expect(response.text).toEqual('Hello World!');
      done();
    });
  });

  test('It should render empty for search_page', (done) => {
    const originalError = console.error;
    console.error = jest.fn();
    request(app).get('/api/search_page').then((response) => {
      // console.log(response);
      expect(response.body).toEqual({});
      expect(response.status).toEqual(500);
      console.error = originalError;
      done();
    });
  });

  test('It should render empty for search', (done) => {
    const originalError = console.error;
    console.error = jest.fn();
    request(app).get('/api/search').then((response) => {
      // console.log(response);
      expect(response.body).toEqual({});
      expect(response.status).toEqual(500);
      console.error = originalError;
      done();
    });
  });
});
