import { UpdateUserDto } from './Dtos/update.user.dto';
import { UpdatePasswordDto } from './Dtos/updatePassword.dto';
import { CreateUserDto } from './Dtos/create.user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
// import { AuthGuard } from 'src/auth/common/guards/auth.guard';
// import { RolesGuard } from 'src/auth/common/guards/roles.guard';
// import { Role } from '../auth/common/guards/role.enum';
// import { Roles } from 'src/auth/common/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('getAllUsers')
  // @UseGuards(AuthGuard)
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin)
  async findUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  async findUser(@Param('id') id: number): Promise<User> {
    return this.userService.findUser({ where: { id } });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.userService.removeUser(id);
    return "deleted user"
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Put(':id/password')
  async updateUserPassword(
    @Param('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updateUserPassword(id, updatePasswordDto);
  }
}
