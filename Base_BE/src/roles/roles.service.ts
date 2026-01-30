import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'src/common/utils/pagination';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) { }

  async create(currIdUserLogin: string, dto: CreateRoleDto): Promise<Role> {
    // Check if role already exists by email
    const existingRole = await this.roleRepo.findOne({ where: { name: dto.name } });

    if (existingRole) {
      throw new ConflictException(`Role with name ${dto.name} already exists`);
    }

    // Save new role
    const newRole = this.roleRepo.create(dto);
    newRole.created_by = currIdUserLogin;
    return await this.roleRepo.save(newRole);
  }

  async findAll(currIdUserLogin: string, paginationDto: PaginationDto) {
    const { page, limit, keyword, sortBy, direction } = paginationDto;

    const where: any = {};
    if (keyword) {
      where.name = ILike(`%${keyword}%`);
    }

    const order: any = {};
    if (sortBy) {
      order[sortBy] = direction || "ASC";
    } else {
      order["id"] = "ASC";
    }

    return paginate(this.roleRepo, { page, limit }, where, order, ["users"]);
  }

  async findOne(currIdUserLogin: string, id: string): Promise<Role> {
    console.log(`Role ${id} deleted by ${currIdUserLogin}`);

    const findRole = await this.roleRepo.findOne({ where: { id } });

    if (!findRole) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return findRole;
  }

  async update(currIdUserLogin: string, id: string, dto: UpdateRoleDto): Promise<Role> {
    const updateRole = await this.roleRepo.findOne({ where: { id } });
    if (!updateRole) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    // Merge changes into the existing role
    Object.assign(updateRole, dto);
    updateRole.updated_by = currIdUserLogin;

    // Save and return updated user
    return await this.roleRepo.save(updateRole);
  }

  async remove(currIdUserLogin: string, id: string): Promise<void> {
    const removeRole = await this.roleRepo.findOne({ where: { id } });
    if (!removeRole) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    await this.roleRepo.remove(removeRole); // permanently deletes
  }

}
