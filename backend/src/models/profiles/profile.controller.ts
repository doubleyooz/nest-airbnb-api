import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Profile } from './interfaces/profile.interface';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Post()
    create(@Body() profile: Profile) {
        return this.profileService.createProfile(profile);
    }

    @Get()
    findAll() {
        return this.profileService.findAllProfiles();
    }

    @Get('findOne')
    findOne(@Query('id') key) {
        return this.profileService.findOneProfile(key);
    }
}
