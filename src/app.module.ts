import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './core/entites/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH,
      synchronize: true,
      entities: [User, Customer],
    }),
    AuthModule, 
    UsersModule, CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
