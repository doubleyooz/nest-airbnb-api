import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Account } from './interfaces/account.interface';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post()
    create(@Body() account: Account) {
        return this.accountService.createAccount(account);
    }

    @Get()
    findAll() {
        return this.accountService.findAllAccounts();
    }

    @Get("findOne")
    findOne(@Query("id") key) {
        return this.accountService.findOneAccount(key);
    }
}
