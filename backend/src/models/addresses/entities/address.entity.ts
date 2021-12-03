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
    @PrimaryGeneratedColumn('increment')
    id: number; //put a uuid here
    
    @Column()
    street: string;

    @Column({ nullable: true })
    references: string;
    
    @Column()
    city: string;
  
    @Column()
    state: string;
     
    @Column()
    zipCode: string;

    @Column()
    country: string;
 
  }