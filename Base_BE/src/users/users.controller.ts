import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Req() req, @Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(req.user.id, createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get paginated list of users" })
  async findAll(@Req() req, @Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(req.user.id, paginationDto);
  }


  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(req.user.id, id);
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,              
    @Body() updateUserDto: UpdateUserDto, 
  ): Promise<User> {
    return this.usersService.update(req.user.id, id, updateUserDto);
  }


  @Delete(':id')
  async remove(@Req() req, id: string): Promise<void> {
    return await this.usersService.remove(req.user.id, id);
  }
}
