import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    create(@Body() user: User): Observable<User>{
        return this.userService.createUser(user);
    }
}
