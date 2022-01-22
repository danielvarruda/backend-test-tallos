import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor (private reflector: Reflector) {} 

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const role = this.reflector.get('role', context.getHandler());
		
		if (!role) return true;

		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const role_user = user.role;
		const role_user_array = role_user.split('');

		return role_user_array.includes(role);
	}
}
