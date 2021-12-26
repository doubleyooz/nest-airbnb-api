import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { AccountEntity } from '../../src/models/accounts/account.entity';

import { bootstrapTest } from '../apps/account.e2e';
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
            .expect(200);

        console.log(body);
        expect(body).toEqual([
            {
                id: expect.any(Number),
                firstName: acc1.firstName,
                lastName: acc1.lastName,
                email: acc1.email,
                birthDate: acc1.birthDate,
            },
        ]);
    });

    describe('when ther account already exists', () => {
        it('should return BadRequestException', async () => {
            const response = await request
                .default(app.getHttpServer())
                .post('/users')
                .send(acc1)
                .expect(400);

            expect(response.body).toEqual(
                'An user with this email or phone already exists.',
            );
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

        expect(body).toEqual([
            {
                id: expect.any(Number),
                firstName: acc1.firstName,
                lastName: acc1.lastName,
                email: acc1.email,
                birthDate: acc1.birthDate,
            }
        ]);
    });
});