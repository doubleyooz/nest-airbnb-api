import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { Account } from './interfaces/account.interface';


@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>
    ){}

    createAccount(account: Account): Promise<Account> {
        return this.accountRepository.save(account);
    }

    findAllAccounts(): Promise<Account[]>{
        return this.accountRepository.find();
    }

    findOneAccount(id: number): Promise<Account | undefined>{
        return this.accountRepository.findOne({ id });
    }
}
