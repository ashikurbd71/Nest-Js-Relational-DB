import { Test, TestingModule } from '@nestjs/testing';
import { NidController } from './nid.controller';
import { NidService } from './nid.service';

describe('NidController', () => {
  let controller: NidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NidController],
      providers: [NidService],
    }).compile();

    controller = module.get<NidController>(NidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
