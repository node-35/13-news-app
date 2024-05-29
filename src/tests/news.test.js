const app = require('../app');
const request = require('supertest');

let id;
let token;

beforeAll(async () => {
    const credentials = {
        email: "juan@gmail.com",
        password: "juan1234",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /news debe traer todas las noticias', async () => {
    const res = await request(app).get('/news');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /news debe crear una noticia', async () => {
    const newsBody = {
        headline: "test headline",
        lead: "test lead",
        author: "test author",
        imageDescription: "test image description",
        date: "2024-05-28",
        body: "test body",
    }
    const res = await request(app)
        .post('/news')
        .send(newsBody)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.headline).toBe(newsBody.headline);
    expect(res.body.id).toBeDefined();
});

test('DELETE /news/:id debe eliminar una noticia', async () => {
    const res = await request(app)
        .delete('/news/'+id)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
