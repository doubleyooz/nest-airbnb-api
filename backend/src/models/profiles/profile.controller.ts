import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from './interfaces/profile.interface';
import { ProfileController } from './profile.service';

@Controller('user')
export class ProfileController {
    constructor(private profileController: ProfileController) {}

    @Post()
    create(@Body() user: User) {
        return this.profileController.createUser(user);
    }

    @Get()
    findAll() {
        return this.profileController.findAllUsers();
    }

    @Get("findOne")
    findOne(@Query("firstName") key) {
        return this.profileController.findOneUser(key);
    }
}
