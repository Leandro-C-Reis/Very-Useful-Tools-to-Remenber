import request from "supertest";
import app from '../../src/app';

describe('Tools', () => {
  it('should list all tools', async () => {
    const response : any = await request(app).get('/list');

    expect(response.status).toBe(200);
  });
});
