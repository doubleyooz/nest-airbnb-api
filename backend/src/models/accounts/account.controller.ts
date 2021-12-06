import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Account } from './interfaces/account.interface';
import { AccountService } from './account.service';
import {
    CreateAccountDto,
    UpdateAccountDTO,
} from '../../authentication/dto/account.dto';

import { ValidatePayloadExistsPipe } from 'src/common/pipes/payload.exists.pipe';

@Controller('accounts')
export class AccountController {
    constructor(private _service: AccountService) {}

    @Post()
    @UsePipes(ValidationPipe) //used to transform the birthdate string into a date object
    async create(@Body() account: CreateAccountDto): Promise<Account> {
        return this._service.createAccount(account);
    }

    @Get('find')
    async findOne(
        @Query('id') _id: number,
        @Query('email') _email: string,
    ): Promise<Account | undefined> {
        if (_email) return this._service.findByEmail(_email);
        else if (_id) return this._service.findById(_id);
    }

    @Get()
    async findAll(): Promise<Account[]> {
        return this._service.findAllAccounts();
    }

    @Put(':id')
    @UsePipes(ValidationPipe) //used to transform the birthdate string into a date object
    async updateById(
        @Param('id') id: number,
        @Body(new ValidatePayloadExistsPipe()) dto: UpdateAccountDTO,
    ): Promise<object> {
        return this._service.updateById(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<object> {
        return this._service.deleteById(id);
    }
}
