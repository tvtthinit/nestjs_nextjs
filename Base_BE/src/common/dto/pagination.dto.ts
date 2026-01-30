import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class PaginationDto {
    @ApiPropertyOptional({ description: 'Page number', example: 1 })
    @IsOptional()
    @IsNumberString()
    page?: number;

    @ApiPropertyOptional({ description: 'Items per page', example: 10 })
    @IsOptional()
    @IsNumberString()
    limit?: number;

    @ApiPropertyOptional({ description: 'Keyword search', example: '' })
    @IsOptional()
    @IsString()
    keyword?: string;

    @ApiPropertyOptional({ description: 'Sort field', example: 'id' })
    @IsOptional()
    @IsString()
    sortBy?: string;

    @ApiPropertyOptional({ description: 'Sort direction', example: 'ASC' })
    @IsOptional()
    @IsString()
    direction?: 'ASC' | 'DESC';
}