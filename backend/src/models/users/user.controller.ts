import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    create(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Get()
    findAll() {
        return this.userService.findAllUsers();
    }

    @Get("findOne")
    findOne(@Query("firstName") key) {
        return this.userService.findOneUser(key);
    }
}
