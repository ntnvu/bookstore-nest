
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    // {
    //   type: 'mysql',
    //   host: '178.128.110.145',
    //   port: 3306,
    //   username: 'wordpressuser',
    //   password: '!123456@',
    //   database: 'wordpress',
    //   entities: [User],
    //   synchronize: false,
    //   logging: true,
    //   autoLoadEntities: true
    // }
  ), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }