import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserLoginRequestDto } from './dto/userLoginRequest.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'The user successfully logged in.',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The email or password is incorrect.',
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @ApiBody({ type: UserLoginRequestDto })
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Request() req): Promise<UserResponseDto> {
    const response = await this.authService.signin(req.user);

    return response;
  }

  @ApiCreatedResponse({
    description: 'The user successfully signed up.',
    type: UserResponseDto,
  })
  @ApiConflictResponse({
    description: 'The user email already exists. Try another one.',
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @Post('signup')
  async signup(@Body() user: UserDto): Promise<UserResponseDto> {
    const response = await this.authService.createUser(user);

    return response;
  }
}
