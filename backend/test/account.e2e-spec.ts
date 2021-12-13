import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { AccountModule } from '../src/models/accounts/account.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../src/models/accounts/entities/account.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from '../src/database/database.config';
import { AppModule } from 'src/app.module';
import { Repository } from 'typeorm';
import { Account } from 'src/models/accounts/interfaces/account.interface';
import { config } from 'dotenv';
config();

let app: INestApplication;

let repository: Repository<AccountEntity>;

beforeAll(async () => {
    console.log(DatabaseConfig);
    const module = await Test.createTestingModule({
        imports: [
            AccountModule,          
            // Use the e2e_test database to run the tests
            TypeOrmModule.forRoot(DatabaseConfig),
        ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    repository = module.get('AccountRepository');
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
        const { body } = await supertest
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
