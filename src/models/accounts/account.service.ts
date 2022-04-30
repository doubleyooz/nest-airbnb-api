import {
    BadRequestException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CreateAccountDto,
    UpdateAccountDto,
} from '../../authentication/dto/account.dto';
import {
    Repository,
    getConnection,
    DeleteResult,
    DeepPartial,
    InsertResult,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { Account } from './interfaces/account.interface';
import { getMessage } from '../../common/helpers/message.helper';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly _repository: Repository<AccountEntity>,
    ) {}

    async createAccount(attributes: Account): Promise<Account> {
        const entity = Object.assign(new AccountEntity(), attributes);
        const result: Account = await this._repository.save(entity);

        return result;
    }

    async findAllAccounts(): Promise<Account[]> {
        return this._repository.find();
    }

    async findByEmail(email: string): Promise<Account | undefined> {
        const result: Account = await this._repository.findOne({ email });
        if (!result) {
            throw new NotFoundException(getMessage("account.notfound"));
        }
        return result;
    }

    async findById(id: string): Promise<Account | undefined> {
        const result: Account = await this._repository.findOne({ id });
        if (!result) {
            throw new NotFoundException(getMessage("account.notfound"));
        }
        return result;
    }

    async updateById(_id: string, item: UpdateAccountDto): Promise<Account> {
        // 1. Se for informado o email, verificar se outro usuário já o possui

        if (item.email) {
            const account = this._repository.findOne({
                where: { email: item.email },
            });
            if (account) {
                throw new BadRequestException(getMessage("account.invalid.email.duplicate"));
            }
        }

        const result: any = await getConnection()
            .createQueryBuilder()
            .update(AccountEntity)
            .set(item)
            .where('id = :id', { id: _id })
            .execute();

        if (!result) {
            throw new NotFoundException(
                getMessage("account.notfound")
            );
        }
        return result;
    }

    async deleteById(_id: string): Promise<DeleteResult> {
        return this._repository.delete({ id: _id });
    }
}
