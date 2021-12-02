import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from 'src/authentication/dto/account.dto';

import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { Account } from './interfaces/account.interface';


@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>
    ) { }

    createAccount(account: CreateAccountDto): Promise<CreateAccountDto> {
        return this.accountRepository.save(account);
    }

    findAllAccounts(): Promise<Account[]> {
        console.log("Find all")
        return this.accountRepository.find();
    }

    findByEmail(email: string): Promise<Account | undefined> {
        console.log(`email: ${email}`)
        return this.accountRepository.findOne({
            where:
                { email }
        });
    }

    findById(id: number): Promise<Account | undefined> {
        console.log(`id: ${id}`)
        return this.accountRepository.findOne({
            where:
                { id }
        });
    }
}
