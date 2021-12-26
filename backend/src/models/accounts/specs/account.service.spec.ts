import { Test, TestingModule } from '@nestjs/testing';
import { Account } from '../interfaces/account.interface';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import {
    CreateAccountDto,
    UpdateAccountDto,
} from '../../../authentication/dto/account.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '../account.entity';

describe('AccountService', () => {
    let service: AccountService;

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

    const mockAccountRepository = {
        save: jest.fn().mockImplementation((dto) => dto),
        find: jest.fn().mockImplementation(() => {
            return [
                { id: 1, ...temp1 },
                { id: 2, ...temp2 },
            ];
        }),
        findOne: jest.fn().mockImplementation((str: object) => {
            const keys = Object.keys(str);
            const result =
                temp1[keys[0]] === str[keys[0]]
                    ? { id: 1, ...temp1 }
                    : temp2[keys[0]] === str[keys[0]]
                    ? { id: 2, ...temp2 }
                    : 1 === str[keys[0]]
                    ? { id: 1, ...temp1 }
                    : 2 === str[keys[0]]
                    ? { id: 2, ...temp2 }
                    : undefined;

            if (!result) {
                throw new NotFoundException(
                    'User not found or already removed.',
                );
            }
            return result;
        }),
        updateById: jest
            .fn()
            .mockImplementation((_id: number, item: UpdateAccountDto) => {
                temp1.email = 'Mama@gmail.com';

                const result =
                    1 === _id
                        ? { id: 1, ...temp1 }
                        : 2 === _id
                        ? { id: 2, ...temp2 }
                        : undefined;

                if (!result) {
                    throw new NotFoundException(
                        'Account not found or already removed.',
                    );
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
            firstName: accountExample.firstName,
            lastName: accountExample.lastName,
            email: accountExample.email,
            birthDate: accountExample.birthDate,
        });

        expect(mockAccountRepository.save).toBeCalledWith(temp1);
    });

    it('should list all accounts', async () => {
        expect(await service.findAllAccounts()).toEqual([
            {
                id: expect.any(Number),
                firstName: accountExample.firstName,
                lastName: accountExample.lastName,
                email: accountExample.email,
                birthDate: accountExample.birthDate,
            },
            {
                id: expect.any(Number),
                firstName: accountExample2.firstName,
                lastName: accountExample2.lastName,
                email: accountExample2.email,
                birthDate: accountExample2.birthDate,
            },
        ]);

        expect(mockAccountRepository.find).toBeCalledWith();
    });

    it('should find an account by its email', async () => {
        expect(await service.findByEmail(temp1.email)).toEqual({
            id: expect.any(Number),
            firstName: temp1.firstName,
            lastName: temp1.lastName,
            email: temp1.email,
            birthDate: temp1.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({email: temp1.email});

        expect(await service.findByEmail(temp2.email)).toEqual({
            id: expect.any(Number),
            firstName: temp2.firstName,
            lastName: temp2.lastName,
            email: temp2.email,
            birthDate: temp2.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({email: temp2.email});

        try {
            temp1.email = accountExample.email;
            expect(await service.findByEmail('randon@email.com')).toThrow(
                NotFoundException,
            );
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('User not found or already removed.');
        }

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({email: 'randon@email.com'});
    });

    it('should find an account by its id', async () => {
        expect(await service.findById(1)).toEqual({
            id: expect.any(Number),
            firstName: temp1.firstName,
            lastName: temp1.lastName,
            email: temp1.email,
            birthDate: temp1.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 1});

        expect(await service.findById(2)).toEqual({
            id: expect.any(Number),
            firstName: temp2.firstName,
            lastName: temp2.lastName,
            email: temp2.email,
            birthDate: temp2.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 2});

        try {
            expect(await service.findById(3)).toThrow(NotFoundException);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('User not found or already removed.');
        }

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 3});
    });

    it('should update an account by its id', async () => {
        expect(await service.findById(1)).toEqual({
            id: expect.any(Number),
            firstName: temp1.firstName,
            lastName: temp1.lastName,
            email: temp1.email,
            birthDate: temp1.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 1});

        expect(await service.findById(2)).toEqual({
            id: expect.any(Number),
            firstName: temp2.firstName,
            lastName: temp2.lastName,
            email: temp2.email,
            birthDate: temp2.birthDate,
        });

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 2});

        try {
            expect(await service.findById(3)).toThrow(NotFoundException);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('User not found or already removed.');
        }

        // prettier-ignore
        expect(mockAccountRepository.findOne).toBeCalledWith({id: 3});
    });
});
