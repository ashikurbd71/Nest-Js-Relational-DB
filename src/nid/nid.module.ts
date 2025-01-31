import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NidService } from './nid.service';
import { NidController } from './nid.controller';
import { NidEntity } from './entities/nid.entity';


@Module({
  imports: [TypeOrmModule.forFeature([NidEntity])], // Register the entity
  controllers: [NidController],
  providers: [NidService],
  exports: [TypeOrmModule], // Export if needed in other modules
})
export class NidModule { }
