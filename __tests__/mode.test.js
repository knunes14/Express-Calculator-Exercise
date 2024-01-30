const request = require('supertest');
const app = require('../app.js');

describe('Mode Route', () => {
  it('should calculate the mode correctly', async () => {
    const response = await request(app).get('/mode?nums=1,2,3,2,3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mode', value: [2,3] });
  });

  it('should handle invalid input', async () => {
    const response = await request(app).get('/mode?nums=1,2,foo');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});