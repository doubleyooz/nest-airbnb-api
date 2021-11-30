import { Test, TestingModule } from '@nestjs/testing';
import { User } from './interfaces/user.interface';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const userExample: User = {
    id: 10, //put a uuid here
    firstName: "Jojo",
    gender: "Male",
    email: "Jojo@email.com",
    governmentID: "filepath",
    phoneNumber: "9856203541",
    emergencyContact: "2554dsa6232",
    nationality: "brazilian",
    birthDate: new Date("1999-06-26"),

  }

  const mockUsersService = {
    createUser: jest.fn(dto => {
      return {
        ...dto
      }
    })
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    console.log(controller.create(userExample))
    expect(controller.create(userExample)).toEqual({
      id: expect.any(Number),
      birthDate: expect.any(Date),
      email: expect.stringMatching(userExample.email),
      emergencyContact: expect.stringMatching(userExample.emergencyContact),
      firstName: expect.stringMatching(userExample.firstName),
      gender: expect.stringMatching(userExample.gender),
      governmentID: expect.stringMatching(userExample.governmentID),
      nationality: expect.stringMatching(userExample.nationality),
      phoneNumber: expect.stringMatching(userExample.phoneNumber),
    });
  })
});
