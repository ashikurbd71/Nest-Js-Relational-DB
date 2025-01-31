import { Test, TestingModule } from '@nestjs/testing';
import { NidService } from './nid.service';

describe('NidService', () => {
  let service: NidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NidService],
    }).compile();

    service = module.get<NidService>(NidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
