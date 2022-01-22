import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
	imports: [
		JwtModule.register({
			secret: 'test2k21tallosNeMDb',
			signOptions: {
				expiresIn: '60s',
			}
		}),
		UsersModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategyService]
})
export class AuthModule {}
