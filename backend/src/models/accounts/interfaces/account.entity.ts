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
import { ProfileEntity } from 'src/models/profiles/entities/profile.entity';
  
  //import { UserEntity } from '../../auth/models/user.entity';
  
  @Entity('account')
  export class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number; //put a uuid here
  
    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    password: string;

    @Index()
    @Column()
    email: string;
   
    @CreateDateColumn()
    birthDate: Date;  
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;  
            
    @OneToOne(() => ProfileEntity)
    @JoinColumn()
    profile: ProfileEntity;

    @OneToOne(() => HostEntity)
    @JoinColumn()
    host: HostEntity; 
  }