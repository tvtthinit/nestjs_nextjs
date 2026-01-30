import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AuditBaseEntity } from '../../common/audit-base.entity';
import { Role } from 'src/roles/entities/role.entity';
import { IsEmail } from 'class-validator';

@Entity('users')
export class User extends AuditBaseEntity {
    @ApiProperty()
    @Column({ unique: true })
    username: string;

    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' }) // 👈 validation
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @Column({ type: 'uuid', nullable: true })
    role_id: string;
    
    @ManyToOne(() => Role, role => role.users, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: Role;

}