import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '../role.decorator';
import { RoleGuard } from '../role.guard';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body) {
        const token = await this.authService.login(body.username, body.password);
        return { token: token };
    }

    @Role('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Get('test-auth')
    test(@Req() req) {
        console.log(req.user);

        return {
            name: "Daniel"
        }
    }
}
