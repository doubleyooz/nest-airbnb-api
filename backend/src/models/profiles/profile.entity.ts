import { AddressEntity } from '../addresses/address.entity';
import { AccountEntity } from '../accounts/account.entity';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

//import { UserEntity } from '../../auth/models/user.entity';

@Entity('profile')
export class ProfileEntity {
    @PrimaryGeneratedColumn('increment')
    id: number; //put a uuid here

    @Column()
    gender: string;

    @Column({ nullable: true })
    governmentID: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    emergencyContact: string;

    @Column({ nullable: true })
    nationality: string;

    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: AddressEntity;

    @OneToOne(() => AccountEntity)
    @JoinColumn()
    account: AccountEntity;
}
