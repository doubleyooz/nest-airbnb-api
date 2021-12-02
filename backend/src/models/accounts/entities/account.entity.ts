import * as bcrypt from 'bcrypt';
import { HostEntity } from '../../hosts/entities/host.entity';
import {
  BeforeInsert,
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
    
    @BeforeInsert()
    async hashPassword() {
       this.password = await bcrypt.hash(this.password, Number(process.env.HASH_SALT));
    }
    @Column({ select: false })
    password: string;

    @Index()
    @Column({ unique: true })
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