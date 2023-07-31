import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginByUserName } from './dtos/auth-login.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { UserRole } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('login')
  async login(@Body() body: LoginByUserName) {
    const loginData = {
      username: body.username.trim().toLocaleLowerCase(),
      password: body.password,
    };
    let userFound = await this.userService.findOne({
      where: {
        username: loginData.username,
      },
    });

    if (!userFound || !userFound.id || userFound.deleted) {
      userFound = await this.userService.findOne({
        where: {
          email: loginData.username,
        },
      });
    }
    if (!userFound || !userFound.id || userFound.deleted) {
      throw new HttpException('Account not exists!', HttpStatus.NOT_FOUND);
    }

    if (
      !(await this.authService.comparePassword(
        loginData.password,
        userFound.password,
      ))
    ) {
      throw new HttpException('Wrong password!', HttpStatus.BAD_REQUEST);
    }

    const payload: IJwtPayload = {
      sub: userFound.id,
      role: UserRole.USER,
    };

    const access_token = await this.authService.generateAccessToken(payload);

    return {
      access_token,
      user: userFound,
    };
  }
}
