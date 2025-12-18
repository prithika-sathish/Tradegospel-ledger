import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LedgerModule } from './ledger/ledger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ledger_app',
      password: 'apppass',
      database: 'ledger_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    LedgerModule,
  ],
})
export class AppModule {}
