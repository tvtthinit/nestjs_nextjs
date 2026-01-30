import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class AuditBaseEntity {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: '2026-01-27T21:09:00Z' })
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @Column({ type: 'uuid', nullable: true })
    created_by: string;

    @ApiProperty({ example: '2026-01-27T21:09:00Z' })
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;


    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @Column({ type: 'uuid', nullable: true })
    updated_by: string;

    @ApiProperty({ example: '2026-01-27T21:09:00Z' })
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @Column({ type: 'uuid', nullable: true })
    deleted_by: string;
}