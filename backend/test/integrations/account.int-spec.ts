import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { bootstrapTest } from '../apps/account.app';
import { acc1, acc2, acc3_fake } from '../mocks/account.mock';

let app: INestApplication;

beforeAll(async () => {
    app = await bootstrapTest();
    await app.init();
});

afterAll(async () => {
    await app.close();
});

describe('POST /accounts', () => {
    it('should return the created account', async () => {
        // Run your end-to-end test
        const { body } = await request
            .default(app.getHttpServer())
            .post('/accounts')
            .send(acc1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);

        expect(body).toMatchObject({
            id: expect.any(Number),
            firstName: acc1.firstName,
            lastName: acc1.lastName,
            email: acc1.email,
            birthDate: acc1.birthDate.toISOString(),
            tokenVersion: 1,
        });
    });
});

describe('GET /accounts', () => {
    it('should return an array of accounts', async () => {
        // Run your end-to-end test
        const { body } = await request
            .default(app.getHttpServer())
            .get('/accounts')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).toMatchObject([
            {
                id: expect.any(Number),
                firstName: acc1.firstName,
                lastName: acc1.lastName,
                email: acc1.email,
                birthDate: acc1.birthDate.toISOString(),
                tokenVersion: 1,
            },
        ]);
    });
});
