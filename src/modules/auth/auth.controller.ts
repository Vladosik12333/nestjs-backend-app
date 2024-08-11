import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';
import { UserResponseDto } from './dto/userResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Request() req): Promise<UserResponseDto> {
    const response = await this.authService.signin(req.user);

    return response;
  }

  @Post('signup')
  async signup(@Body() user: UserDto): Promise<UserResponseDto> {
    const response = await this.authService.createUser(user);

    return response;
  }
}
