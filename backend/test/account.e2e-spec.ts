import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { AccountEntity } from '../src/models/accounts/account.entity';

import { bootstrapTest } from './app/account.e2e';
import { acc1, acc2, acc3_fake } from './mocks/account.mock';


let app: INestApplication;

let repository: Repository<AccountEntity>;

beforeAll(async () => {    
    app = await bootstrapTest();
    await app.init();
   
});

afterAll(async () => {
   
    await app.close();
});

describe('POST /accounts', () => {
    it('should return an array of accounts', async () => {     
        // Run your end-to-end test
        const { body } = await request.default(app.getHttpServer())           
            .post('/accounts')
            .send(acc1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        console.log(body)
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


describe('GET /accounts', () => {
    it('should return an array of accounts', async () => {
       
      
        // Run your end-to-end test
        const { body } = await request.default(app.getHttpServer())           
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
            },
            {
                id: expect.any(Number),
                firstName: acc2.firstName,
                lastName: acc2.lastName,
                email: acc2.email,
                birthDate: acc2.birthDate,
            },
        ]);
    });
});
