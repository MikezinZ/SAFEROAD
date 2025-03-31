const request = require('supertest');
const app = require('../index');
const { User } = require('../models');

describe('Endpoints de Autenticacao', () => {
    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    describe('POST /api/auth/register', () => {
        it('deve criar um novo usuário', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    nome: 'testuser',
                    email: 'test@test.com',
                    senha: 'password123'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('id');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/auth/register')
                .send({
                    nome: 'testuser',
                    email: 'test@test.com',
                    senha: 'password123'
                });
        });

        it('deve fazer login no usuário existente', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    senha: 'password123'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });
});