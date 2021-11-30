import { Body, Controller, Post } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    create(@Body() user: User ): Promise<object> {
        return this.userService.createUser(user);
    }
}
