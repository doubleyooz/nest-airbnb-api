import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Profile } from './interfaces/profile.interface';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() profile: Profile) {
        return this.profileService.createProfile(profile);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.profileService.findAllProfiles();
    }

    @UseGuards(JwtAuthGuard)
    @Get('findOne')
    findOne(@Query('id') key: string) {
        return this.profileService.findOneProfile(key);
    }
}
