import request from 'supertest';
import app from './../index';

describe(' check server run ', (): void => {
  it('Endpoint should return status 200  ', (): void => {
    request(app).get('/').expect(200);
  });
});
