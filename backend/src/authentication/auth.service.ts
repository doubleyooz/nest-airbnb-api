import * as bcrypt from 'bcrypt';
import { AccountService } from "src/models/accounts/account.service";
import { AccountEntity } from "src/models/accounts/entities/account.entity";
import { getRepository } from "typeorm";


export class AuthService {
    constructor(private accountService: AccountService){}

    async validateAccount(email: string, password: string): Promise<any>{
        
        const account = await getRepository(AccountEntity)
            .createQueryBuilder()
            .from(AccountEntity, "account")
            .where("user.id = :id", { id: 1 })
            .addSelect("account.password")
            .getOne();
    
        const hash = await bcrypt.hash(password, Number(process.env.HASH_SALT));      
        const isPasswordMatching = await bcrypt.compare(password, hash);

        if(account && isPasswordMatching) {
            const { password, ...result } = account;
            return result;
        }

        return null;
        
    }
}