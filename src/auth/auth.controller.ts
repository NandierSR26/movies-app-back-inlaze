import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login() {}

  @Post('/register')
  register() {}

  @Get('/check-token')
  checkToken() {}
}
