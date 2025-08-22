// Arquivo de configuração para testes unitários das rotas usando Jest e Supertest
// Crie este arquivo em backend/tests/tasks.test.js

const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Rotas de Tarefas', () => {
  it('GET /api/tasks deve retornar 401 sem token', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(401);
  });

  // Adicione mais testes para POST, PUT, DELETE, etc.
});
  
  afterAll(async () => {
    await mongoose.disconnect();
  });
