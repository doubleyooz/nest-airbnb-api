import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthController } from '../../src/authentication/auth.controller';
import {
    GoogleDto,
    PayloadDto,
    SignInDto,
} from '../../src/authentication/dto/auth.dto';
import { AuthService } from '../../src/authentication/auth.service';
import { acc1, acc2, acc3_fake } from '../mocks/account.mock';
import { getMessage } from '../../src/common/helpers/message.helper';

describe('AuthController', () => {
    let controller: AuthController;
    let jwtService: JwtService = new JwtService({
        privateKey: process.env.JWT_SIGNIN || 'secretKey',
        signOptions: {
            expiresIn: 3600,
        },
    });
    const mockAccountService = {
        googleLogin: jest.fn(async (payload: GoogleDto) => {
            if (!payload) {
                throw new UnauthorizedException();
            }

            if (payload.email === acc1.email) {
                return {
                    access_token: jwtService.sign({
                        id: 'a',
                        token_version: 0,
                    }),
                    refresh_token: jwtService.sign({
                        id: 'a',
                        token_version: 0,
                    }),
                };
            }

            return {
                message: getMessage('account.notfound'),
                data: payload,
            };
        }),

        validateAccount: jest.fn(async (payload: SignInDto) => {
            const isPasswordMatching = payload.password === acc1.password;

            if (acc1 && isPasswordMatching) {
                return {
                    access_token: jwtService.sign({
                        id: 'b',
                        token_version: 0,
                    }),
                    refresh_token: jwtService.sign({
                        id: 'b',
                        token_version: 0,
                    }),
                };
            }

            throw new UnauthorizedException();
        }),

        validateTokenVersion: jest.fn(async (payload: PayloadDto) => {
            if (!acc1) throw new UnauthorizedException();
            return acc1;
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

    describe('googleLogin()', () => {
        describe('when googleLogin is successful', () => {
            it('should return access and refresh token', async () => {
                const result = await controller.googleAuthRedirect(acc1);
                expect(result).toMatchObject({
                    access_token: expect.any(String),
                    refresh_token: expect.any(String),
                });
            });
        });

        describe('when googleLogin cant find a user', () => {
            it('should return the payload', async () => {
                const result = await controller.googleAuthRedirect(acc2);
                expect(result).toMatchObject({
                    message: getMessage('account.notfound'),
                    data: expect.any(Object),
                });
            });
        });
    });
});
