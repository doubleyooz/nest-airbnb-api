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



@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @BeforeInsert()
  async hashPassword() {
    console.log(`rounds=${process.env.HASH_SALT}; hashing password...`)
    this.password = await bcrypt.hash(this.password, Number(process.env.HASH_SALT));
    console.log("password hashed...")
  }
  @Column({ select: false })
  password: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  async dateToString() {
    if (typeof this.birthDate === "string")
      this.birthDate = new Date(this.birthDate)
  }
  @CreateDateColumn()
  birthDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profileID: ProfileEntity;

  @OneToOne(() => HostEntity)
  @JoinColumn()
  hostID: HostEntity;

  @Column({default: 1 })
  tokenVersion: number;
}
