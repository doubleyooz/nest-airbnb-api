import { AddressEntity } from '../../addresses/entities/address.entity';
import { AccountEntity } from '../../accounts/entities/account.entity';
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

  
  //import { UserEntity } from '../../auth/models/user.entity';
  
  @Entity('profile')
  export class ProfileEntity {
    @PrimaryGeneratedColumn('increment')
    id: number; //put a uuid here  
  
    @Column()
    gender: string;    
 
    @Column({ nullable: true })
    governmentID : string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    emergencyContact : string;

    @Column({ nullable: true })
    nationality : string;
            
    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: AddressEntity;

    @OneToOne(() => AccountEntity)
    @JoinColumn()
    account: AccountEntity;
  }