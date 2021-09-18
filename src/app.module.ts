
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HeroiclabsModule } from './heroiclabs/heroiclabs.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), UsersModule, HeroiclabsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }