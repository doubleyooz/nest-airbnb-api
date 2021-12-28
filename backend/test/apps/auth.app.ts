import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '../../src/authentication/jwt.strategy';
import { AuthModule } from '../../src/authentication/auth.module';
import { AuthService } from '../../src/authentication/auth.service';

const ENV = process.env.NODE_ENV;
export async function bootstrapTest(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot({
                envFilePath: !ENV ? '.env' : `.env.${ENV}`,
            }),
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.register({
                secretOrPrivateKey: process.env.SECRETKEY || 'secretKey',
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            AuthModule,
        ],
        providers: [AuthService, JwtStrategy],
    }).compile();
    console.log('compiled');
    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    return app;
}
