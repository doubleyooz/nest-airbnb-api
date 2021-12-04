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
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/auth.dto';
  
  @Controller()
  export class AuthController {
    constructor(private _service: AuthService) { }
  
    @UseGuards(LocalAuthGuard)
    @Post("signin")    
    async signin(@Body() payload: SignInDto): Promise<SignInDto> {   
     
      return this._service.validateAccount(payload);
    }
  
  
}
  