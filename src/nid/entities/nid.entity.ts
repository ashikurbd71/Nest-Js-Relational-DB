
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_nid')
export class NidEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true })
    nidNumber: string;

    @Column({ type: 'date' })
    issueDate: Date;
}
