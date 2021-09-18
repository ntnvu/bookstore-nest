import { Module } from '@nestjs/common';
import { HeroiclabsService } from './heroiclabs.service';

@Module({
  providers: [HeroiclabsService],
  exports: [HeroiclabsService]
})
export class HeroiclabsModule {}
