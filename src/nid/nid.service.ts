import { Injectable, NotFoundException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NidEntity } from './entities/nid.entity';
import { CreateNidDto } from './dto/create-nid.dto';
import { UpdateNidDto } from './dto/update-nid.dto';

@Injectable()
export class NidService {
  constructor(
    @InjectRepository(NidEntity)
    private readonly nidRepository: Repository<NidEntity>,
  ) { }

  // Create a new NID
  async create(createNidDto: CreateNidDto): Promise<NidEntity> {
    try {
      const newNid = this.nidRepository.create(createNidDto);
      return await this.nidRepository.save(newNid);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to create NID', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get all NIDs
  async findAll(): Promise<NidEntity[]> {
    try {
      return await this.nidRepository.find();
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to retrieve NIDs', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get a single NID by ID
  async findOne(id: number): Promise<NidEntity> {
    try {
      const nid = await this.nidRepository.findOne({ where: { id } });
      if (!nid) {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: `NID with ID ${id} not found` },
          HttpStatus.NOT_FOUND,
        );
      }
      return nid;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to retrieve NID', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update a NID
  async update(id: number, updateNidDto: UpdateNidDto): Promise<NidEntity> {
    try {
      const existingNid = await this.findOne(id);
      if (!existingNid) {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: `NID with ID ${id} not found` },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.nidRepository.update(id, updateNidDto);
      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to update NID', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete a NID
  async remove(id: number): Promise<void> {
    try {
      const nid = await this.findOne(id);
      if (!nid) {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: `NID with ID ${id} not found` },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.nidRepository.remove(nid);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to delete NID', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
