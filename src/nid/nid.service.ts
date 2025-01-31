import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  async create(createNidDto: CreateNidDto): Promise<{ statusCode: HttpStatus; status: string; data?: NidEntity; error?: string }> {
    try {
      const newNid = this.nidRepository.create(createNidDto);
      const savedNid = await this.nidRepository.save(newNid);
      return { statusCode: HttpStatus.CREATED, status: 'success', data: savedNid };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: 'error', error: 'Failed to create NID: ' + error.message };
    }
  }

  // Get all NIDs
  async findAll(): Promise<{ statusCode: HttpStatus; status: string; data?: NidEntity[]; error?: string }> {
    try {
      const nids = await this.nidRepository.find();
      return { statusCode: HttpStatus.OK, status: 'success', data: nids };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: 'error', error: 'Failed to retrieve NIDs: ' + error.message };
    }
  }

  // Get a single NID by ID
  async findOne(id: number): Promise<{ statusCode: HttpStatus; status: string; data?: NidEntity; error?: string }> {
    try {
      const nid = await this.nidRepository.findOne({ where: { id } });
      if (!nid) {
        return { statusCode: HttpStatus.NOT_FOUND, status: 'error', error: `NID with ID ${id} not found` };
      }
      return { statusCode: HttpStatus.OK, status: 'success', data: nid };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: 'error', error: 'Failed to retrieve NID: ' + error.message };
    }
  }

  // Update a NID
  async update(id: number, updateNidDto: UpdateNidDto): Promise<{ statusCode: HttpStatus; status: string; data?: NidEntity; error?: string }> {
    try {
      const existingNid = await this.nidRepository.findOne({ where: { id } });
      if (!existingNid) {
        return { statusCode: HttpStatus.NOT_FOUND, status: 'error', error: `NID with ID ${id} not found` };
      }

      await this.nidRepository.update(id, updateNidDto);
      const updatedNid = await this.nidRepository.findOne({ where: { id } });
      return { statusCode: HttpStatus.OK, status: 'success', data: updatedNid ?? undefined };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: 'error', error: 'Failed to update NID: ' + error.message };
    }
  }

  // Delete a NID
  async remove(id: number): Promise<{ statusCode: HttpStatus; status: string; message?: string; error?: string }> {
    try {
      const nid = await this.nidRepository.findOne({ where: { id } });
      if (!nid) {
        return { statusCode: HttpStatus.NOT_FOUND, status: 'error', error: `NID with ID ${id} not found` };
      }

      await this.nidRepository.remove(nid);
      return { statusCode: HttpStatus.NO_CONTENT, status: 'success', message: 'NID deleted successfully' };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: 'error', error: 'Failed to delete NID: ' + error.message };
    }
  }
}
