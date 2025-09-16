import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../enum/user_role.enum';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false, unique: true, })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({nullable: false})
  password: string;

  @Column({nullable: false, default: UserRole.USER})
  role: UserRole;

  @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" }) 
  lastLogin: Date;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}