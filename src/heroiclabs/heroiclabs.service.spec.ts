import { Test, TestingModule } from '@nestjs/testing';
import { HeroiclabsService } from './heroiclabs.service';

describe('HeroiclabsService', () => {
  let service: HeroiclabsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroiclabsService],
    }).compile();

    service = module.get<HeroiclabsService>(HeroiclabsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
