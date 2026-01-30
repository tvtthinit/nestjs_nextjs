import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'src/common/utils/pagination';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async create(currIdUserLogin: string, dto: CreateUserDto): Promise<User> {
    // Check if user already exists by email
    const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });

    if (existingUser) {
      throw new ConflictException(`User with email ${dto.email} already exists`);
    }
    // Check if user already exists by username
    const existingUserName = await this.userRepo.findOne({ where: { username: dto.username } });

    if (existingUserName) {
      throw new ConflictException(`User with username ${dto.username} already exists`);
    }
    //  handle password
    dto.password = await bcrypt.hash(dto.password, 10);

    // Save new user
    const newUser = this.userRepo.create(dto);
    newUser.created_by = currIdUserLogin;
    return await this.userRepo.save(newUser);
  }

  async findAll(currIdUserLogin: string, paginationDto: PaginationDto) {
    const { page, limit, keyword, sortBy, direction } = paginationDto;

    const where: any = {};
    if (keyword) {
      // Example: search by name or email
      where.name = keyword;
      // or use ILike for partial match if using Postgres
      // where.name = ILike(`%${keyword}%`);
    }

    const order: any = {};
    if (sortBy) {
      order[sortBy] = direction || "ASC";
    } else {
      order["id"] = "ASC";
    }

    return paginate(this.userRepo, { page, limit }, where, order, ["role"]);
  }

  async findOne(currIdUserLogin: string, id: string): Promise<User> {
    console.log(`User ${id} deleted by ${currIdUserLogin}`);
    
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }


  async update(currIdUserLogin: string, id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }


    // Merge changes into the existing user
    Object.assign(user, dto);
    user.updated_by = currIdUserLogin;
    user.password = await bcrypt.hash(dto.password, 10);

    // Save and return updated user
    return await this.userRepo.save(user);
  }


  async remove(currIdUserLogin: string, id: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // Optionally log audit info somewhere else before deletion
    console.log(`User ${id} deleted by ${currIdUserLogin}`);
    await this.userRepo.remove(user); // permanently deletes
  }

}
