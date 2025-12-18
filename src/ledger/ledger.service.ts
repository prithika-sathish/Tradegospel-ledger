import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LedgerEntry } from './ledger.entity';

@Injectable()
export class LedgerService {
  constructor(
    @InjectRepository(LedgerEntry)
    private readonly repo: Repository<LedgerEntry>,
  ) {}

  create(entry: Partial<LedgerEntry>) {
    return this.repo.save(entry);
  }

  findAll() {
    return this.repo.find({ order: { created_at: 'DESC' } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
