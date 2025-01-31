
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateNidDto {
    @IsNotEmpty()
    @IsString()
    nidNumber: string;

    @IsNotEmpty()
    @IsDate()
    issueDate: Date;
}
