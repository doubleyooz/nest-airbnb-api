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
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly _service: AuthService) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) { }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this._service.googleLogin(req)
    }

    @Post()
    async signin(@Body() payload: SignInDto): Promise<SignInDto> {
        console.log('controller');
        return this._service.validateAccount(payload);
    }
}
