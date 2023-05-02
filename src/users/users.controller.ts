import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('api/users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('api/user/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('api/user/:id/avatar')
  findAvatar(@Param('id') id: string) {
    return this.usersService.findAvatar(id);
  }

  @Delete('/api/user/:id/avatar')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
