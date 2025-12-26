import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly userService: UsersService,

    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;

    return user;
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }
}
