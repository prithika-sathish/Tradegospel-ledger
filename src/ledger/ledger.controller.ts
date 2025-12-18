import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { RoleGuard } from '../auth/role.guard';

@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post()
  @UseGuards(new RoleGuard('admin'))
  create(@Body() body: { amount: number; description: string }) {
    return this.ledgerService.create({
      amount: body.amount,
      description: body.description,
      created_by: 'admin',
    });
  }

  @Get()
  findAll() {
    return this.ledgerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ledgerService.findOne(Number(id));
  }
}
