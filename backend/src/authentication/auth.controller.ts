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
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly _service: AuthService) {}

    @Post()
    async signin(@Body() payload: SignInDto): Promise<SignInDto> {
        console.log('controller');
        return this._service.validateAccount(payload);
    }
}
