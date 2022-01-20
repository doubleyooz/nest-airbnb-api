import { Test, TestingModule } from '@nestjs/testing';
import { Account } from '../../src/models/accounts/interfaces/account.interface';
import { AccountController } from '../../src/models/accounts/account.controller';
import { AccountService } from '../../src/models/accounts/account.service';
import {
    CreateAccountDto,
    UpdateAccountDto,
} from '../../src/authentication/dto/account.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '../../src/models/accounts/account.entity';
import { acc1, acc2, acc3_fake } from '../mocks/account.mock';
import { getMessage } from '../../src/common/helpers/message.helper';

describe('AccountService', () => {
    let service: AccountService;

    const temp1 = { ...acc1 };
    const temp2 = { ...acc2 };
    delete temp1.password;
    delete temp2.password;

    const mockAccountRepository = {
        save: jest.fn().mockImplementation((dto) => dto),
        find: jest.fn().mockImplementation(() => {
            return [
                { id: 'a', ...temp1 },
                { id: 'b', ...temp2 },
            ];
        }),
        findOne: jest.fn().mockImplementation((str: object) => {
            const keys = Object.keys(str);
            const result =
                temp1[keys[0]] === str[keys[0]]
                    ? { id: 'a', ...temp1 }
                    : temp2[keys[0]] === str[keys[0]]
                    ? { id: 'b', ...temp2 }
                    : 'a' === str[keys[0]]
                    ? { id: 'a', ...temp1 }
                    : 'b' === str[keys[0]]
                    ? { id: 'b', ...temp2 }
                    : undefined;

            if (!result) {
                throw new NotFoundException(getMessage('account.notfound'));
            }
            return result;
        }),
        updateById: jest
            .fn()
            .mockImplementation((_id: string, item: UpdateAccountDto) => {
                temp1.email = 'Mama@gmail.com';

                const result =
                    'a' === _id
                        ? { id: 'a', ...temp1 }
                        : 'b' === _id
                        ? { id: 'b', ...temp2 }
                        : undefined;

                if (!result) {
                    throw new NotFoundException(getMessage('account.notfound'));
                }
            }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountController],
            providers: [
                AccountService,
                {
                    provide: getRepositoryToken(AccountEntity),
                    useValue: mockAccountRepository,
                },
            ],
        }).compile();

        service = module.get<AccountService>(AccountService);
    });

    it('should be defined', async () => {
        expect(service).toBeDefined();
    });

    it('should create an account', async () => {
        expect(await service.createAccount(temp1)).toEqual({
            firstName: acc1.firstName,
            lastName: acc1.lastName,
            email: acc1.email,
            birthDate: acc1.birthDate,
        });

        expect(mockAccountRepository.save).toBeCalledWith(temp1);
    });

    it('should list all accounts', async () => {
        expect(await service.findAllAccounts()).toEqual([
            {
                id: expect.any(String),
                firstName: acc1.firstName,
                lastName: acc1.lastName,
                email: acc1.email,
                birthDate: acc1.birthDate,
            },
            {
                id: expect.any(String),
                firstName: acc2.firstName,
                lastName: acc2.lastName,
                email: acc2.email,
                birthDate: acc2.birthDate,
            },
        ]);

        expect(mockAccountRepository.find).toBeCalledWith();
    });

    it('should find an account by its email', async () => {
        expect(await service.findByEmail(temp1.email)).toEqual({
            id: expect.any(String),
            firstName: temp1.firstName,
            lastName: temp1.lastName,
            email: temp1.email,
            birthDate: temp1.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({email: temp1.email});

        expect(await service.findByEmail(temp2.email)).toEqual({
            id: expect.any(String),
            firstName: temp2.firstName,
            lastName: temp2.lastName,
            email: temp2.email,
            birthDate: temp2.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({email: temp2.email});

        try {
            temp1.email = acc1.email;
            expect(await service.findByEmail(acc3_fake.email)).toThrow(
                NotFoundException,
            );
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe(getMessage('account.notfound'));
        }

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({email: acc3_fake.email});
    });

    it('should find an account by its id', async () => {
        expect(await service.findById('a')).toEqual({
            id: expect.any(String),
            firstName: temp1.firstName,
            lastName: temp1.lastName,
            email: temp1.email,
            birthDate: temp1.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 'a'});

        expect(await service.findById('b')).toEqual({
            id: expect.any(String),
            firstName: temp2.firstName,
            lastName: temp2.lastName,
            email: temp2.email,
            birthDate: temp2.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 'b'});

        try {
            expect(await service.findById('c')).toThrow(NotFoundException);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe(getMessage('account.notfound'));
        }

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 'c'});
    });

    it('should update an account by its id', async () => {
        expect(await service.findById('a')).toEqual({
            id: expect.any(String),
            firstName: temp1.firstName,
            lastName: temp1.lastName,
            email: temp1.email,
            birthDate: temp1.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 'a'});

        expect(await service.findById('b')).toEqual({
            id: expect.any(String),
            firstName: temp2.firstName,
            lastName: temp2.lastName,
            email: temp2.email,
            birthDate: temp2.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 'b'});

        try {
            expect(await service.findById('c')).toThrow(NotFoundException);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe(getMessage('account.notfound'));
        }

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 'c'});
    });
});
