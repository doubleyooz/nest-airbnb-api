import { Test, TestingModule } from '@nestjs/testing';
import { Account } from './interfaces/account.interface';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import {
    CreateAccountDto,
    UpdateAccountDto,
} from '../../authentication/dto/account.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AccountController', () => {
    let controller: AccountController;

    const accountExample: Account = {
        firstName: 'Jojo',
        lastName: 'Souza',
        password: 'asdasdksda12',
        email: 'Jojo@email.com',
        birthDate: new Date('1999-06-26'),
    };

    const accountExample2: Account = {
        firstName: 'Lala',
        lastName: 'Monteiro',
        password: 'asdasdkssadasdda12',
        email: 'Lala321@fmail.com',
        birthDate: new Date('1980-03-15'),
    };

    const temp1 = { ...accountExample };
    const temp2 = { ...accountExample2 };
    delete temp1.password;
    delete temp2.password;

    const mockAccountService = {
        createAccount: jest.fn(async (dto) => {
            delete dto.password;
            return {
                id: 1,
                ...dto,
            };
        }),
        findAllAccounts: jest.fn(async () => {
            return [
                { id: 1, ...temp1 },
                { id: 2, ...temp2 },
            ];
        }),

        findById: jest.fn(async (_id: number) => {
            const temp = accountExample2;
            delete temp.password;
            if (_id && _id === 5) return [{ id: 5, ...temp }];
            else return undefined;
        }),
        findByEmail: jest.fn(async (_email: string) => {
            const temp = accountExample;
            delete temp.password;
            if (_email && _email === temp.email) return [{ id: 1, ...temp }];
            else return undefined;
        }),
        updateById: jest.fn(async (_id: number, item: UpdateAccountDto) => {
            if (item.email === accountExample.email) {
                throw new BadRequestException('Email already in use.');
            }

            if (!(_id === 5 || _id === 6)) {
                throw new NotFoundException(
                    'Account not found or already removed.',
                );
            }

            return [{ id: _id, ...temp1 }];
        }),

        deleteById: jest.fn(async (_id: number) => {
            const temp = {
                raw: [],
                affected: 0,
            };
            if (_id === 5 || _id === 6) temp.affected = 1;

            return temp;
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountController],
            providers: [AccountService],
        })
            .overrideProvider(AccountService)
            .useValue(mockAccountService)
            .compile();

        controller = module.get<AccountController>(AccountController);
    });

    it('should be defined', async () => {
        expect(controller).toBeDefined();
    });

    it('should create an account', async () => {
        expect(await controller.create(accountExample)).toEqual({
            id: expect.any(Number),
            firstName: accountExample.firstName,
            lastName: accountExample.lastName,
            email: accountExample.email,
            birthDate: accountExample.birthDate,
        });

        expect(mockAccountService.createAccount).toBeCalledWith(accountExample);
    });

    it('should list all accounts', async () => {
        expect(await controller.findAll()).toEqual([
            { id: 1, ...temp1 },
            { id: 2, ...temp2 },
        ]);

        expect(mockAccountService.findAllAccounts).toBeCalledWith();
    });

    it('should return an account', async () => {
        expect(await controller.findOne(5, null)).toEqual([
            {
                id: expect.any(Number),
                firstName: accountExample2.firstName,
                lastName: accountExample2.lastName,
                email: accountExample2.email,
                birthDate: accountExample2.birthDate,
            },
        ]);

        expect(mockAccountService.findById).toBeCalledWith(5);
    });

    it('should update an account', async () => {
        temp1.email = 'Mama@gmail.com';

        expect(await controller.updateById(5, temp1)).toEqual([
            {
                id: expect.any(Number),
                firstName: temp1.firstName,
                lastName: temp1.lastName,
                email: temp1.email,
                birthDate: temp1.birthDate,
            },
        ]);

        try {
            expect(await controller.updateById(10, temp1)).toThrow(
                NotFoundException,
            );
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('Account not found or already removed.');
        }
        try {
            temp1.email = accountExample.email;
            expect(await controller.updateById(5, temp1)).toThrow(
                BadRequestException,
            );
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('Email already in use.');
        }
        expect(mockAccountService.updateById).toBeCalledWith(5, temp1);
    });

    it('should delete an account', async () => {
        expect(await controller.delete(5)).toEqual({
            raw: [],
            affected: 1,
        });

        expect(await controller.delete(0)).toEqual({
            raw: [],
            affected: 0,
        });

        expect(mockAccountService.deleteById).toBeCalled();
    });
});
