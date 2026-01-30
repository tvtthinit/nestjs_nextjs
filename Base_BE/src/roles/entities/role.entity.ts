import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AuditBaseEntity } from 'src/common/audit-base.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('roles')
export class Role extends AuditBaseEntity {
    @ApiProperty()
    @Column({ unique: true })
    name: string;

    @ApiProperty()
    @Column({ nullable: true })
    description: string;

    // 👇 One role can have many users
    @OneToMany(() => User, user => user.role)
    users: User[];

}