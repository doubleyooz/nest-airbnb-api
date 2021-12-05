import { Test, TestingModule } from '@nestjs/testing';
import { Account } from './interfaces/account.interface';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
    let controller: AccountController;

    const accountExample: Account = {

        firstName: "Jojo",
        lastName: "Souza",
        password: "asdasdksda12",
        email: "Jojo@email.com",
        birthDate: new Date("1999-06-26")


    }

    const mockAccountService = {
        createUser: jest.fn(dto => {
            delete dto.password
            return {
                ...dto
            }
        })
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

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create an account', () => {
        expect(controller.create(accountExample)).toEqual({
            id: expect.any(Number),
            firstName: accountExample.firstName,
            lastName: accountExample.lastName,
            email: accountExample.email,
            birthDate: accountExample.birthDate,
        });
    })
});
