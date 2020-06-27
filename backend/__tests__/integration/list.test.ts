import request from "supertest";
import app from '../../src/app';

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
});
