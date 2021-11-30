import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  //import { UserEntity } from '../../auth/models/user.entity';
  
  @Entity('address')
  export class AddressEntity {
    @PrimaryGeneratedColumn()
    id: number; //put a uuid here
    
    @Column({ nullable: false })
    street: string;

    @Column()
    references: string;
    
    @Column({ nullable: false })
    city: string;
  
    @Column({ nullable: false })
    state: string;
     
    @Column({ nullable: false })
    zipCode: string;

    @Column({ nullable: false })
    country: string;
 
  }