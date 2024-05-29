const app = require('../app');
const request = require('supertest');

let token;
let id;

beforeAll(async () => {
    const credentials = {
        email: "juan@gmail.com",
        password: "juan1234",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /categories debe traer todas las categorias', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories debe crear una categoria', async () => {
    const newCategory = {
        name: "ciencia",
    }
    const res = await request(app)
        .post('/categories')
        .send(newCategory)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCategory.name);
    expect(res.body.id).toBeDefined();
});

test('DELETE /categories/:id debe eliminar una categoria', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
