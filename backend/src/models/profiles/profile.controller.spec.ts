import { Test, TestingModule } from '@nestjs/testing';
import { Profile } from './interfaces/profile.interface';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let controller: ProfileController;

  const profileExample: Profile = {
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

  const mockProfileService = {
    createUser: jest.fn(dto => {
      return {
        ...dto
      }
    })
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    })
      .overrideProvider(ProfileService)
      .useValue(mockProfileService)
      .compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a profile', () => {
    expect(controller.create(profileExample)).toEqual({
      id: expect.any(Number),
      birthDate: expect.any(Date),
      email: expect.stringMatching(profileExample.email),
      emergencyContact: expect.stringMatching(profileExample.emergencyContact),
      firstName: expect.stringMatching(profileExample.firstName),
      gender: expect.stringMatching(profileExample.gender),
      governmentID: expect.stringMatching(profileExample.governmentID),
      nationality: expect.stringMatching(profileExample.nationality),
      phoneNumber: expect.stringMatching(profileExample.phoneNumber),
    });
  })
});
