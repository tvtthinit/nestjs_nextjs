import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 register User repository
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // 👈 export if other modules need UsersService
})
export class UsersModule { }