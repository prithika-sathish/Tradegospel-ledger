import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ledger_entries')
export class LedgerEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric')
  amount: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  created_by: string;
}
