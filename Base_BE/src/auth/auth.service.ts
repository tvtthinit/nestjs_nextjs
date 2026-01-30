import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }
    async validateUser(username: string, pass: string): Promise<User | null> {
        const user = await this.usersService.findOneByEmail(username);
        if (!user) return null;

        const isMatch = await bcrypt.compare(pass, user.password);
        return isMatch ? user : null;
    }

    async login(loginDto: { email: string; password: string }) {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            return { message: 'Invalid credentials' }; // 👈 handle invalid case
        }

        const payload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}