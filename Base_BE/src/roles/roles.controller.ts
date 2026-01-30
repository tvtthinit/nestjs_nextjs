import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('roles')

export class RolesController {
  constructor(private readonly RolesService: RolesService) { }

  @Post()
  async create(@Req() req, @Body() CreateRoleDto: CreateRoleDto) {
    return await this.RolesService.create(req.user.id, CreateRoleDto);
  }

  @Get()
  @ApiOperation({ summary: "Get paginated list of roles" })
  async findAll(@Req() req, @Query() paginationDto: PaginationDto) {
    return this.RolesService.findAll(req.user.id, paginationDto);
  }


  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string): Promise<Role> {
    return await this.RolesService.findOne(req.user.id, id);
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<Role> {
    return this.RolesService.update(req.user.id, id, dto);
  }


  @Delete(':id')
  async remove(@Req() req, id: string): Promise<void> {
    return await this.RolesService.remove(req.user.id, id);
  }
}
