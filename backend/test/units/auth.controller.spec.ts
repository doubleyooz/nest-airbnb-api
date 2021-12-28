import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthController } from '../../src/authentication/auth.controller';
import { PayloadDto, SignInDto } from '../../src/authentication/dto/auth.dto';
import { AuthService } from '../../src/authentication/auth.service';
import { acc1, acc2, acc3_fake } from '../mocks/account.mock';

describe('AuthController', () => {
    let controller: AuthController;
    let jwtService: JwtService = new JwtService({
        privateKey: process.env.JWT_SIGNIN || 'secretKey',
        signOptions: {
            expiresIn: 3600,
        },
    });
    const mockAccountService = {
        validateAccount: jest.fn(async (payload: SignInDto) => {
            const isPasswordMatching = payload.password === acc1.password;

            if (acc1 && isPasswordMatching) {
                return {
                    access_token: jwtService.sign({
                        id: 2,
                        token_version: 0,
                    }),
                    refresh_token: jwtService.sign({
                        id: 2,
                        token_version: 0,
                    }),
                };
            }

            throw new UnauthorizedException();
        }),

        validateTokenVersion: jest.fn(async (payload: PayloadDto) => {
            return acc1 !== undefined;
            throw new UnauthorizedException();
        }),
    };

    beforeAll(() => {
        controller = new AuthController(
            mockAccountService as unknown as AuthService,
        );
    });

    it('should be defined', async () => {
        expect(controller).toBeDefined();
    });

    describe('validateAccount()', () => {
        describe('when validateAccount is successful', () => {
            it('should return the created user', async () => {
                const result = await controller.signin(acc1);
                expect(result).toMatchObject({
                    access_token: expect.any(String),
                    refresh_token: expect.any(String),
                });
            });
        });

        describe('when an error occurs', () => {
            it('should throw the error', async () => {
                try {
                    await controller.signin(acc2);
                } catch (error) {
                    expect(error).toBeInstanceOf(UnauthorizedException);
                    expect(error).toHaveProperty('message', 'Unauthorized');
                }
            });
        });
    });
});
