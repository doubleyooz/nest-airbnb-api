import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { AccountController } from '../../src/models/accounts/account.controller';
import { AccountService } from '../../src/models/accounts/account.service';
import {
    CreateAccountDto,
    UpdateAccountDto,
} from '../../src/authentication/dto/account.dto';

import { acc1, acc2, acc3_fake } from '../mocks/account.mock';
import { getMessage } from 'common/helpers/message.helper';

describe('AccountController', () => {
    let controller: AccountController;

    const temp1 = { ...acc1 };
    const temp2 = { ...acc2 };
    delete temp1.password;
    delete temp2.password;

    const mockAccountService = {
        createAccount: jest.fn(async (dto) => {
            delete dto.password;
            return {
                id: 'a',
                ...dto,
            };
        }),
        findAllAccounts: jest.fn(async () => {
            return [
                { id: 'a', ...temp1 },
                { id: 'b', ...temp2 },
            ];
        }),

        findById: jest.fn(async (_id: string) => {
            const temp = acc2;
            delete temp.password;
            if (_id && _id === 'e') return [{ id: 'e', ...temp }];
            else return undefined;
        }),
        findByEmail: jest.fn(async (_email: string) => {
            const temp = acc1;
            delete temp.password;
            if (_email && _email === temp.email) return [{ id: 'a', ...temp }];
            else return undefined;
        }),
        updateById: jest.fn(async (_id: string, item: UpdateAccountDto) => {
            if (item.email === acc1.email) {
                throw new BadRequestException(
                    getMessage('account.invalid.email.duplicate'),
                );
            }

            if (!(_id === 'e' || _id === 'f')) {
                throw new NotFoundException(getMessage('account.notfound'));
            }

            return [{ id: _id, ...temp1 }];
        }),

        deleteById: jest.fn(async (_id: string) => {
            const temp = {
                raw: [],
                affected: 0,
            };
            if (_id === 'e' || _id === 'f') temp.affected = 1;

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
        expect(await controller.create(acc1)).toEqual({
            id: expect.any(String),
            firstName: acc1.firstName,
            lastName: acc1.lastName,
            email: acc1.email,
            birthDate: acc1.birthDate,
        });

        expect(mockAccountService.createAccount).toBeCalledWith(acc1);
    });

    it('should list all accounts', async () => {
        expect(await controller.findAll()).toEqual([
            { id: 1, ...temp1 },
            { id: 2, ...temp2 },
        ]);

        expect(mockAccountService.findAllAccounts).toBeCalledWith();
    });

    it('should return an account', async () => {
        expect(await controller.findOne('e', null)).toEqual([
            {
                id: expect.any(String),
                firstName: acc2.firstName,
                lastName: acc2.lastName,
                email: acc2.email,
                birthDate: acc2.birthDate,
            },
        ]);

        expect(mockAccountService.findById).toBeCalledWith('e');
    });

    it('should update an account', async () => {
        temp1.email = 'Mama@gmail.com';

        expect(await controller.updateById('e', temp1)).toEqual([
            {
                id: expect.any(String),
                firstName: temp1.firstName,
                lastName: temp1.lastName,
                email: temp1.email,
                birthDate: temp1.birthDate,
            },
        ]);

        try {
            expect(await controller.updateById('j', temp1)).toThrow(
                NotFoundException,
            );
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe(getMessage('account.notfound'));
        }
        try {
            temp1.email = acc1.email;
            expect(await controller.updateById('e', temp1)).toThrow(
                BadRequestException,
            );
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe(
                getMessage('account.invalid.email.duplicate'),
            );
        }
        expect(mockAccountService.updateById).toBeCalledWith('e', temp1);
    });

    it('should delete an account', async () => {
        expect(await controller.delete('e')).toEqual({
            raw: [],
            affected: 1,
        });

        expect(await controller.delete('x')).toEqual({
            raw: [],
            affected: 0,
        });

        expect(mockAccountService.deleteById).toBeCalled();
    });
});
