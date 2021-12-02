import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto, UpdateAccountDTO } from 'src/authentication/dto/account.dto';
import { Repository, getConnection } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { Account } from './interfaces/account.interface';


@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly _repository: Repository<AccountEntity>
    ) { }

    async createAccount(account: CreateAccountDto): Promise<CreateAccountDto> {
        return this._repository.save(account);
    }

    async findAllAccounts(): Promise<Account[]> {        
        return this._repository.find();
    }

    async findByEmail(email: string): Promise<Account|undefined> {          
        const result: Account = await this._repository.findOne({ email });
        if (!result) {
            throw new NotFoundException('User not found or already removed.');
        }
        return result;       
        
    }

    async findById(id: number): Promise<Account|undefined> {      
        const result: Account = await this._repository.findOne({ id });
        if (!result) {
            throw new NotFoundException('User not found or already removed.');
        }
        return result;
        
    }

    async updateById(_id: number, item: UpdateAccountDTO): Promise<Account> {
        // 1. Se for informado o email, verificar se outro usuário já o possui
      
        if (item.email) {
            const account = this._repository.findOne({
                where: { email: item.email }
                
            });
            if (account){
                throw new BadRequestException("Email already in use.");
            }

        }
        
        const result: any = await getConnection()
            .createQueryBuilder()
            .update(AccountEntity)
            .set(item)
            .where("id = :id", {id: _id})
            .execute();
               
      
       
       
        if (!result) {
          throw new NotFoundException('Account not found or already removed.');
        }
        return result;
      }
    
    
}
