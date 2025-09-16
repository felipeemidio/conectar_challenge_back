import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false, unique: true})
  cnpj: string;

  @Column({nullable: false})
  fantasyName: string;

  @Column({nullable: false, default: true})
  isActive: boolean;

  @Column({nullable: false, default: false})
  isPublic: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
