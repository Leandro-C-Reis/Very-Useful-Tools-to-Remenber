import request from "supertest";
import app from '../../src/app';
import mongoose from 'mongoose';

beforeAll(done => {
  done();
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done();
})


describe('Tools', () => {
  let lastIdOfDatabase : number;

  it('should list all tools', async () => {
    const response : any = await request(app).get('/list');

    expect(response.status).toBe(200);
  });

  it('should list tools for tag', async () => {
    const response : any = await request(app).get('/tools?tag=node');
    
    expect(response.status).toBe(200);
  });

  it('should list tools for title', async () => {
    const response : any = await request(app).get('/tools?q=Notion');

    expect(response.status).toBe(200);
  });

  it('should create a tool', async () => {
    const response : any = await request(app).post('/tools').send({
      title: "TEST",
      link: "TEST",
      description: "TEST",
      tags: [
        "TEST",
        "TEST",
        "TEST"
      ]
    });

    lastIdOfDatabase = response.body.id;
    expect(response.status).toBe(201);
  });

  it('should delete a tool', async () => {
    if (lastIdOfDatabase != undefined){
      const response : any = await request(app).delete(`/tools/${lastIdOfDatabase}`);

      expect(response.status).toBe(204);
    }
  });

  it('should list with invalid parameters', async () => {
    const response : any = await request(app).get('/tools');

    expect(response.status).toBe(400);
  });
  
  it('should list with not existent tag or title', async () => {
    const response : any = await request(app).get("/tools?q=TEST");

    expect(response.status).toBe(404);
  });

  it('should not create a tool with incomplete data', async () => {
    const response : any = await request(app).post("/tools").send({
      title: "GitHub"
    });;

    expect(response.status).toBe(406);
  })

  it('should not delete a tool with incorrect ID', async () => {
    const response: any = await request(app).delete('/tools/0');

    expect(response.status).toBe(404);
  });

});
