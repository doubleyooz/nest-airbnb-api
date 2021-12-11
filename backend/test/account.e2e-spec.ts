import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AccountModule } from '../src/models/accounts/account.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../src/models/accounts/entities/account.entity';
import { ConfigModule } from '@nestjs/config';

describe('AccountController (e2e)', () => {
    let app: INestApplication;

    const mockAccountRepository = {};

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: process.env.POSTGRE_HOST,
                    port: parseInt(<string>process.env.POSTGRE_PORT),
                    username: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASSWORD,
                    database: process.env.POSTGRES_DATABASE,
                    autoLoadEntities: true,
                    synchronize: true, //do not use it in production
                    retryDelay: 2000,
                    retryAttempts: 2,
                }),
                AccountModule],
        }).overrideProvider(getRepositoryToken(AccountEntity)).useValue(mockAccountRepository).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
