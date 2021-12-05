import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountService } from "src/models/accounts/account.service";
import { AccountEntity } from "src/models/accounts/entities/account.entity";
import { Account } from 'src/models/accounts/interfaces/account.interface';
import { getRepository } from "typeorm";
import { PayloadDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private accountService: AccountService, private jwtService: JwtService) { }

    async validateAccount(payload: SignInDto): Promise<any> {
        console.log("service")
        const account : AccountEntity  = await getRepository(AccountEntity)
            .createQueryBuilder("account")           
            .where("account.id = :id", { id: 1 })
            .select("account.id", "id")
            .addSelect("account.tokenVersion", "tokenVersion")
            .addSelect("password")
            .getRawOne() ;

        console.log(account)        
        const isPasswordMatching = await bcrypt.compare(payload.password, account.password);
        
        

        console.log(isPasswordMatching)
        if (account && isPasswordMatching) {
          
            return {
                access_token: this.jwtService.sign({ id: account.id, token_version: account.tokenVersion }),
                refresh_token: this.jwtService.sign({ id: account.id, token_version: account.tokenVersion })

            }
        }

        throw new UnauthorizedException();

    }

    async validateTokenVersion(payload: PayloadDto){
        const account = await getRepository(AccountEntity)
            .createQueryBuilder()
            .from(AccountEntity, "account")
            .where("account.id = :id", { id: payload.id })
            .andWhere("account.tokenVersion = :tokenVersion", { tokenVersion: payload.tokenVersion })
            .getOne();

        console.log(account);
        console.log(account !== undefined);
        return account !== undefined;
        
    }
}