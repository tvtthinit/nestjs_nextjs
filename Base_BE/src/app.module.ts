import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { SeederService } from './seeder/seeder.service';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: String(config.get<string>('DB_PASS')),
        database: config.get<string>('DB_NAME'),
        entities: [User, Role],
        synchronize: true, // ⚠️ dev only
      }),
    }),
    AuthModule,
    RolesModule,
    UsersModule,
    SeederModule,
  ],
})
export class AppModule { }