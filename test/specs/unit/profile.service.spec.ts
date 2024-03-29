import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../../../src/models/profiles/profile.controller';
import { ProfileService } from '../../../src/models/profiles/profile.service';

describe('ProfileService', () => {
    let service: ProfileService;

    const mockUsersService = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProfileController],
            providers: [ProfileService],
        })
            .overrideProvider(ProfileService)
            .useValue(mockUsersService)
            .compile();

        service = module.get<ProfileService>(ProfileService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
