import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountService } from "src/models/accounts/account.service";
import { AccountEntity } from "src/models/accounts/entities/account.entity";
import { getRepository } from "typeorm";
import { PayloadDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private accountService: AccountService, private jwtService: JwtService) { }

    async validateAccount(payload: SignInDto): Promise<any> {

        const account = await getRepository(AccountEntity)
            .createQueryBuilder()
            .from(AccountEntity, "account")
            .where("user.id = :id", { id: 1 })
            .addSelect("account.password")
            .getOne();

        const hash = await bcrypt.hash(payload.password, Number(process.env.HASH_SALT));
        const isPasswordMatching = await bcrypt.compare(payload.password, hash);

        if (account && isPasswordMatching) {

            const access_token = {
                access_token: this.jwtService.sign({ id: account.id, token_version: account.tokenVersion })
            }

            const refresh_token = {
                refresh_token: this.jwtService.sign({ id: account.id, token_version: account.tokenVersion })
            }

            return {
                access_token,
                refresh_token

            }
        }

        return null;

    }

    async validateTokenVersion(payload: PayloadDto){
        const account = await getRepository(AccountEntity)
            .createQueryBuilder()
            .from(AccountEntity, "account")
            .where("account.id = :id", { id: payload.id })
            .andWhere("account.tokenVersion = :tokenVersion", { tokenVersion: payload.tokenVersion })
            .getOne();

        return account !== undefined;
        
    }
}