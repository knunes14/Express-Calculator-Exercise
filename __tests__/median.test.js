const request = require('supertest');
const app = require('../app.js');

describe('Median Route', () => {
  it('should calculate the median correctly', async () => {
    const response = await request(app).get('/median?nums=1,2,3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'median', value: 2 });
  });

  it('should handle invalid input', async () => {
    const response = await request(app).get('/median?nums=1,2,foo');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});