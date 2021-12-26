import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as Request from 'supertest';
import { AccountEntity } from '../src/models/accounts/account.entity';

import { Repository } from 'typeorm';
import { Account } from '../src/models/accounts/interfaces/account.interface';
import { bootstrapTest } from './app/account.e2e';


let app: INestApplication;

let repository: Repository<AccountEntity>;

beforeAll(async () => {    
    app = await bootstrapTest();
    await app.init();
    repository = app.get('AccountRepository');
});

afterAll(async () => {
    await repository.query(`DELETE FROM account;`);
    await app.close();
});

describe('GET /accounts', () => {
    it('should return an array of accounts', async () => {
        const account: Account = {
            firstName: 'Jojo',
            lastName: 'Souza',
            password: 'asdkaXs@3123',
            email: 'email@gmail.com',
            birthDate: new Date('2000-06-25'),
        };

        const account2: Account = {
            firstName: 'Kaka',
            lastName: 'Mantega',
            password: 'adasda@Sd3123',
            email: 'email2@email.com',
            birthDate: new Date('2001-02-13'),
        };

        // Pre-populate the DB with some dummy users
        await repository.save([account, account2]);

        // Run your end-to-end test
        const { body } = await Request
            .agent(app.getHttpServer())
            .get('/accounts')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).toEqual([
            {
                id: expect.any(Number),
                firstName: account.firstName,
                lastName: account.lastName,
                email: account.email,
                birthDate: account.birthDate,
            },
            {
                id: expect.any(Number),
                firstName: account2.firstName,
                lastName: account2.lastName,
                email: account2.email,
                birthDate: account2.birthDate,
            },
        ]);
    });
});
