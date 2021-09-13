import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CatEntity])]
})
export class CatsModule {}
