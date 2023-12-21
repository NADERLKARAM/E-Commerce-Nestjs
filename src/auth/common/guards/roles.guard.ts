import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum'; // Import your roles enum or define roles here

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>("roles", context.getHandler());

    if (!requiredRoles) {
      return true; // If there are no roles specified, access is granted by default
    }

    // Convert enum values to an array of strings
    const userRoles: string[] = Object.values(Role);

    // Check if the user has at least one of the required roles
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}