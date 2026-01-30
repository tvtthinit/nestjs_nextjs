import { ApiProperty } from "@nestjs/swagger";

export class AuditBaseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    created_by: string;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    updated_by: string;

    @ApiProperty()
    deleted_at: Date;

    @ApiProperty()
    deleted_by: string;
}