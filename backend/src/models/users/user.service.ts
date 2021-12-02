import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    createUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    findAllUsers(): Promise<User[]>{
        return this.userRepository.find();
    }

    findOneUser(email: string): Promise<User | undefined>{
        return this.userRepository.findOne({ email });
    }
}
