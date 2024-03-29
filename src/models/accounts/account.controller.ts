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
import { PayloadGuard } from '../../common/guards/payload.exists.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get('find')
    async findOne(
        @Query('id') _id: string,
        @Query('email') _email: string,
    ): Promise<Account | undefined> {
        if (_email) return this._service.findByEmail(_email);
        else if (_id) return this._service.findById(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Account[]> {
        return this._service.findAllAccounts();
    }

    @UseGuards(JwtAuthGuard)   
    @UseGuards(new PayloadGuard())
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            skipMissingProperties: true
        }),
    )
    @Put(':id')
    async updateById(
        @Param('id') id: string,
        @Body() dto: UpdateAccountDto,
    ): Promise<object> {
        return this._service.updateById(id, dto);
    }
    
    @UseGuards(JwtAuthGuard)   
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<object> {
        return this._service.deleteById(id);
    }
}
