import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super(); //config
    }

    async validate(payload: SignInDto): Promise<any> {
        const account = await this.authService.validateAccount(payload);

        if (!account) {
            throw new UnauthorizedException();
        }

        return account;
    }


}