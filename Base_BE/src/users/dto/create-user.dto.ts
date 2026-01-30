import { ApiProperty } from '@nestjs/swagger';
import { AuditBaseDto } from 'src/common/dto/audit-base.dto';

export class CreateUserDto {
    @ApiProperty({ example: 'admin', description: 'Unique username for the user' })
    username: string;

    @ApiProperty({ example: 'admin@gmail.com', description: 'Unique email for the user' })
    email: string;

    @ApiProperty({ example: 'admin123', description: 'Password (hash in real apps!)' })
    password: string;

    @ApiProperty({ example: 'admin', description: 'Role assigned to the user' })
    role_id: string;
}