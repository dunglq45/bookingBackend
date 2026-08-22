import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'; 
import { UsersService } from './users.service';       // Vì nằm cùng thư mục users nên dùng ./
import { CreateUserDto } from './create-user.dto';     // Vì nằm cùng thư mục users nên dùng ./
import { AuthGuard } from '../auth/auth.guard'; 

@Controller('users') // Tiền tố: http://localhost:3000/users
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Chốt chặn bảo vệ API bằng Token
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.usersService.getAllUsers();
  }
}
