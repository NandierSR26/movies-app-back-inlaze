import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { Users } from './entities/user.entity';
import { LoginResponse } from './interfaces/login-response';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Patch('/restore-password/:id')
  restorePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.resetPassword(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('/check-token')
  checkToken(@Request() req: Request): LoginResponse {
    const user = req['user'] as Users;

    return {
      user,
      token: this.authService.getJwtToken({ id: user.id }),
    };
  }
}
