import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroiclabsModule } from 'src/heroiclabs/heroiclabs.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HeroiclabsModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
