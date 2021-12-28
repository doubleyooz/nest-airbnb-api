import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../../src/models/profiles/profile.controller';
import { ProfileService } from '../../src/models/profiles/profile.service';
import { profile, profile_fake } from '../mocks/profile.mock';

describe('ProfileController', () => {
    let controller: ProfileController;

    const mockProfileService = {
        createUser: jest.fn((dto) => {
            return {
                ...dto,
            };
        }),
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
        expect(controller.create(profile)).toEqual({
            emergencyContact: expect.stringMatching(profile.emergencyContact),
            gender: expect.stringMatching(profile.gender),
            governmentID: expect.stringMatching(profile.governmentID),
            nationality: expect.stringMatching(profile.nationality),
            phoneNumber: expect.stringMatching(profile.phoneNumber),
        });
    });
});
