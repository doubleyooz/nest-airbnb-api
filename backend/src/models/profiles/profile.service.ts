import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Profile } from './interfaces/profile.interface';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>
    ){}

    createUser(profile: Profile): Promise<Profile> {
        return this.profileRepository.save(profile);
    }

    findAllProfiles(): Promise<Profile[]>{
        return this.profileRepository.find();
    }

    findOneProfile(email: string): Promise<Profile | undefined>{
        return this.profileRepository.findOne({ email });
    }
}
