import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getRepository } from 'typeorm';

import { AccountService } from '../models/accounts/account.service';
import { AccountEntity } from '../models/accounts/account.entity';
import { GoogleDto, PayloadDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) {}

    async validateAccount(payload: SignInDto): Promise<any> {
        const account: AccountEntity = await getRepository(AccountEntity)
            .createQueryBuilder('account')
            .where('account.email = :email', { email: payload.email })
            .select('account.id', 'id')
            .addSelect('account.tokenVersion', 'tokenVersion')
            .addSelect('password')
            .getRawOne();

        console.log(account);
        const isPasswordMatching = await bcrypt.compare(
            payload.password,
            account.password,
        );

        console.log(isPasswordMatching);
        if (account && isPasswordMatching) {
            return {
                access_token: this.jwtService.sign({
                    id: account.id,
                    token_version: account.tokenVersion,
                }),
                refresh_token: this.jwtService.sign({
                    id: account.id,
                    token_version: account.tokenVersion,
                }),
            };
        }

        throw new UnauthorizedException();
    }

    async validateToken(payload: PayloadDto) {
        const account = await getRepository(AccountEntity)
            .createQueryBuilder()
            .from(AccountEntity, 'account')
            .where('account.id = :id', { id: payload.id })
            .andWhere('account.tokenVersion = :tokenVersion', {
                tokenVersion: payload.tokenVersion,
            })
            .getOne();

        console.log(account);
        console.log(account !== undefined);
        return account !== undefined;
    }

    async googleLogin(req: { user: GoogleDto }) {
        if (!req.user) {
            throw new UnauthorizedException();
        }

        const account: AccountEntity = await getRepository(AccountEntity)
            .createQueryBuilder('account')
            .where('account.email = :email', { email: req.user.email })
            .select('account.id', 'id')
            .addSelect('account.tokenVersion', 'tokenVersion')
            .getRawOne();

        console.log(account);

        if (account) {
            return {
                access_token: this.jwtService.sign({
                    id: account.id,
                    token_version: account.tokenVersion,
                }),
                refresh_token: this.jwtService.sign({
                    id: account.id,
                    token_version: account.tokenVersion,
                }),
            };
        }

        console.log('Account not registered');
        return req.user;
    }
}
