import { AddressEntity } from 'src/models/addresses/entities/address.entity';
import { HostEntity } from 'src/models/hosts/entities/host.entity';
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
  
  @Entity('user')
  export class UserEntity {
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
  
    @CreateDateColumn()
    createdAt: Date;  
            
    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: AddressEntity;

    @OneToOne(() => HostEntity)
    @JoinColumn()
    host: HostEntity; 
  }