import { SetMetadata } from '@nestjs/common';
import { Role } from '../guards/role.enum';


export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);