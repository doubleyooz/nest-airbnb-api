import {
    BadRequestException,
  Body,
  Controller,
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
} from 'src/authentication/dto/account.dto';
import { AccountEntity } from './entities/account.entity';
import { throws } from 'assert';

@Controller('accounts')
export class AccountController {
  constructor(private _service: AccountService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() account: CreateAccountDto): Promise<CreateAccountDto> {
    return this._service.createAccount(account);
  }

 
  @Get("find")
  async findOneById(
    @Query('id') _id: number,
    @Query('email') _email: string  
  ): Promise<Account | undefined> {

    if(_email)
        return this._service.findByEmail(_email);

    else if(_id)
        return this._service.findById(_id);

  }

  @Get()
  async findAll(): Promise<Account[]> {   
    return this._service.findAllAccounts();
  }

  

  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() dto: UpdateAccountDTO,
  ): Promise<object> {
    return this._service.updateById(id, dto);
  }
}
