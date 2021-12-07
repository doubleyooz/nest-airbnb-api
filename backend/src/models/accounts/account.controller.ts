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
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Account } from './interfaces/account.interface';
import { AccountService } from './account.service';
import {
    CreateAccountDto,
    UpdateAccountDto,
} from '../../authentication/dto/account.dto';
import { PayloadGuard } from 'src/common/guards/payload.exists.guard';

@Controller('accounts')
export class AccountController {
    constructor(private _service: AccountService) {}

    @Post()
    @UseGuards(new PayloadGuard())
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
        }),
    )
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
    @UseGuards(new PayloadGuard())
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            skipMissingProperties: true
        }),
    )
    async updateById(
        @Param('id') id: number,
        @Body() dto: UpdateAccountDto,
    ): Promise<object> {
        return this._service.updateById(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<object> {
        return this._service.deleteById(id);
    }
}
