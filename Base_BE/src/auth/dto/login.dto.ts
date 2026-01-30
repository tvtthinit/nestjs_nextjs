import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'admin@gmail.com', description: 'The email of the user' })
    email: string;

    @ApiProperty({ example: 'admin123', description: 'The password of the user' })
    password: string;
}