import { Test, TestingModule } from '@nestjs/testing';
import { Account } from './interfaces/account.interface';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDTO } from '../../authentication/dto/account.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AccountController', () => {
    let controller: AccountController;

    const accountExample: Account = {

        firstName: "Jojo",
        lastName: "Souza",
        password: "asdasdksda12",
        email: "Jojo@email.com",
        birthDate: new Date("1999-06-26")
    }

    const accountExample2: Account = {
        firstName: "Lala",
        lastName: "Monteiro",
        password: "asdasdkssadasdda12",
        email: "Lala321@fmail.com",
        birthDate: new Date("1980-03-15")


    }

    const mockAccountService = {
        createAccount: jest.fn(async (dto) => {
            delete dto.password
            return {
                id: 1,
                ...dto
            }
        }),
        findAllAccounts: jest.fn(async () => {
            const temp = accountExample;
            delete temp.password;

            return [{ id: 1, ...temp }]
        }),

        findById: jest.fn(async (_id: number) => {
            const temp = accountExample2;
            delete temp.password;
            if (_id && _id === 5)
                return [{ id: 5, ...temp }]

            else return undefined;
        }),
        findByEmail: jest.fn(async (_email: string) => {
            const temp = accountExample;
            delete temp.password;
            if (_email && _email === temp.email)
                return [{ id: 1, ...temp }]

            else return undefined;
        }),
        updateById: jest.fn(async (_id: number, item: UpdateAccountDTO) => {

            if (item.email) {

                if (item.email === accountExample.email) {
                    throw new BadRequestException("Email already in use.");
                }
            }

            if (!(_id === 5 || _id === 6)) {
                throw new NotFoundException('Account not found or already removed.');
            }

            const temp = accountExample2;
            delete temp.password;
            return [{ id: _id, ...temp }];
        }),

        deleteById: jest.fn(async (_id: number) => {
            const temp = {
                "raw": [],
                "affected": 0
            }
            if (_id === 5 || _id === 6)
                temp.affected = 1

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
        const temp = { ...accountExample };
        expect(await controller.create(temp)).toEqual({
            id: expect.any(Number),
            firstName: accountExample.firstName,
            lastName: accountExample.lastName,
            email: accountExample.email,
            birthDate: accountExample.birthDate,
        });

        expect(mockAccountService.createAccount).toBeCalledWith(temp);
    })

    it('should list all accounts', async () => {
        expect(await controller.findAll()).toEqual([{
            id: expect.any(Number),
            firstName: accountExample.firstName,
            lastName: accountExample.lastName,
            email: accountExample.email,
            birthDate: accountExample.birthDate,
        }]);

        expect(mockAccountService.findAllAccounts).toBeCalledWith();
    })

    it('should return an account', async () => {
        expect(await controller.findOne(5, null)).toEqual([{
            id: expect.any(Number),
            firstName: accountExample2.firstName,
            lastName: accountExample2.lastName,
            email: accountExample2.email,
            birthDate: accountExample2.birthDate,
        }]);

        expect(mockAccountService.findById).toBeCalledWith(5);
    })

    it('should update an account', async () => {
        let temp = accountExample2;
        delete temp.password;
        expect(await controller.updateById(5, temp)).toEqual([{
            id: expect.any(Number),
            firstName: temp.firstName,
            lastName: temp.lastName,
            email: temp.email,
            birthDate: temp.birthDate,
        }]);

        try {
            expect(await controller.updateById(10, temp)).toThrow(NotFoundException);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('Account not found or already removed.');
        }
        try {
            temp.email = accountExample.email;
            expect(await controller.updateById(5, temp)).toThrow(BadRequestException);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe("Email already in use.");
        }
        expect(mockAccountService.updateById).toBeCalledWith(5, temp);
    })

    it('should delete an account', async () => {
        let temp = accountExample2;
        delete temp.password;
        expect(await controller.delete(5)).toEqual({
            "raw": [],
            "affected": 1

        });

        expect(await controller.delete(0)).toEqual({
            "raw": [],
            "affected": 0

        });

        expect(mockAccountService.deleteById).toBeCalled();
    })

});
