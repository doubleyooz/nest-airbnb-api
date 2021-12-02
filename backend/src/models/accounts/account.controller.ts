import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Account } from './interfaces/account.interface';
import { AccountService } from './account.service';
import { CreateAccountDto } from 'src/authentication/dto/account.dto';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() account: CreateAccountDto) {
        return this.accountService.createAccount(account);
    }

    @Get()
    findAll() {
        return this.accountService.findAllAccounts();
    }

    @Get(":email")
    findOneByEmail(@Param('email') email : string) {
        console.log(email)
        return this.accountService.findByEmail(email);
    }

    @Get(":id")
    findOneById(@Param('id') id : number) {
        console.log(id)
        return this.accountService.findById(id);
    }
    
}
