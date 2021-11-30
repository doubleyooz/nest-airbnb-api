import { AddressEntity } from 'src/models/addresses/entities/address.entity';
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
  
  @Entity('host')
  export class HostEntity {
    @PrimaryGeneratedColumn()
    id: number; //put a uuid here

    @Column()
    placeType: number; 

    @Column()
    description: number; 

    @Column()
    privacy: number;
 
    @Column()
    guests: number;

    @Column()
    beds: number;

    @Column({ nullable: true })
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column()
    privateBathrroms: boolean;

    @Column()
    standoutAmenities: [string];
    
    @Column()
    guestFavorites: [string];
    
    @Column()
    safetyItems: [string];

    @Column()
    photos: [string]; //Min(5) 

    @Column()
    title: string;

    @Column()
    highlights: [string]; //Max(2) 

    @Column()
    descriptionText: string;

    @Column()
    price: number;

    @Column({ length: 3 })
    odds: [boolean];
            
    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: AddressEntity;


  }