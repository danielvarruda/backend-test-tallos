import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService, 
        private jwtService: JwtService
    ) {}

    async login (username: string, password: string) {
        const user = await this.validateCredentials(username, password);
        
        if (user) {
            const payload = {
                id: user._id,
                username: user.username,
                role: user.role
            }
            
            return this.jwtService.sign(payload);
        } else {
            return null;
        }
    }

    async validateCredentials(username: string, password: string) {
        try {
            const user = await this.usersService.findUsername(username);

            const passValid = bcrypt.compareSync(password, user.password);
            if (!passValid) return null;

            return user;
        } catch (error) {
            return null;
        } 
    }
}
