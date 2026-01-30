import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService,
        private usersService: UsersService, // 👈 inject UsersService

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: configService.get<string>('JWT_SECRET') || 'fallbackSecret',
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any): Promise<User> {
        // 👇 fetch user from DB using username (or id)
        const user = await this.usersService.findOneByEmail(payload.email);

        if (!user) {
            // If user not found, block access
            throw new Error('Unauthorized');
        }

        // 👇 return full user entity (attached to req.user)
        return user;
    }

}