import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Autenticar no sistema' })
    async login(@Body() body) {
        const token = await this.authService.login(body.username, body.password);

        if (token) {
            return { token: token };
        } else {
            return { error: 'E-mail ou senha incorreta' };
        }
    }

    @UseGuards(JwtGuard)
    @Get('load-session')
    @ApiOperation({ summary: 'Consultar se há login no sistema' })
    test(@Req() req) {
        return req.user;
    }
}
