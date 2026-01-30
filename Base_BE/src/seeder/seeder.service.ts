import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Role) private roleRepo: Repository<Role>,
    ) { }

    async run() {
        await this.seedRoles();
        await this.seedAdminUser();
    }

    private async seedRoles() {
        const count = await this.roleRepo.count();
        if (count === 0) {
            await this.roleRepo.save([{ name: 'admin' }, { name: 'user' }]);
            console.log('✅ Roles seeded');
        }
    }

    private async seedAdminUser() {

        const role = await this.roleRepo.findOne({ where: { name: 'admin' } });
        if (!role) {
            throw new Error('Admin role not found, seed roles first!');
        }
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await this.userRepo.save({
            username: 'admin',
            email: "admin@gmail.com",
            password: hashedPassword,
            role_id: role.id,
        });
        console.log('✅ Users seeded');
    }
}