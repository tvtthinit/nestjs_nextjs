import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'admin', description: 'The name of the role' })
    name: string;

    @ApiProperty({ example: 'Administrator role with full access', description: 'Details about the role' })
    description: string;
}