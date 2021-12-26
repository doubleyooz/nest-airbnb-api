import { AddressEntity } from '../../models/addresses/address.entity';
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
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('int')
    placeType: number;

    @Column('int')
    description: number;

    @Column('int')
    privacy: number;

    @Column('int')
    guests: number;

    @Column('int')
    beds: number;

    @Column('int', { nullable: true })
    bedrooms: number;

    @Column('int')
    bathrooms: number;

    @Column()
    privateBathrroms: boolean;

    @Column({ array: true })
    standoutAmenities: string;

    @Column({ array: true })
    guestFavorites: string;

    @Column({ array: true })
    safetyItems: string;

    @Column({ array: true })
    photos: string; //Min(5)

    @Column()
    title: string;

    @Column({ array: true })
    highlights: string; //Max(2)

    @Column()
    descriptionText: string;

    @Column()
    price: number;

    @Column({ array: true })
    odds: boolean;

    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: AddressEntity;
}
