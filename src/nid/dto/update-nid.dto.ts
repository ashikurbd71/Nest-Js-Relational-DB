import { PartialType } from '@nestjs/mapped-types';
import { CreateNidDto } from './create-nid.dto';

export class UpdateNidDto extends PartialType(CreateNidDto) {}
