import { AddressEntity } from '../../addresses/entities/address.entity';
import { HostEntity } from '../../hosts/entities/host.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { AccountEntity } from 'src/models/accounts/interfaces/account.entity';
  
  //import { UserEntity } from '../../auth/models/user.entity';
  
  @Entity('profile')
  export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number; //put a uuid here
  
    @Column()
    firstName: string;

    @Column()
    gender: string;
    
    @Index()
    @Column()
    email: string;

    @Column({ nullable: true })
    governmentID : string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    emergencyContact : string;

    @Column({ nullable: true })
    nationality : string;

    @CreateDateColumn()
    birthDate: Date;  
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;  
            
    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: AddressEntity;

    @OneToOne(() => AccountEntity)
    @JoinColumn()
    account: AccountEntity;
  }