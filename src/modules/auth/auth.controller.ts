import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthResponseDto } from './dto/auth.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthLoginRequestDto } from './dto/authLoginRequest.dto';
import { AuthMapper } from './auth.mapper';
import { AUTH_MAPPER } from '../../core/constants/providers';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(AUTH_MAPPER) private authMapper: AuthMapper,
  ) {}

  @ApiCreatedResponse({
    description: 'The user successfully logged in.',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The email or password is incorrect.',
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @ApiBody({ type: AuthLoginRequestDto })
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Request() req): Promise<AuthResponseDto> {
    const response = await this.authService.signin(req.user);

    const mappedResponse = this.authMapper.mapToAuthResponseDto(response);

    return mappedResponse;
  }

  @ApiCreatedResponse({
    description: 'The user successfully signed up.',
    type: AuthResponseDto,
  })
  @ApiConflictResponse({
    description: 'The user email already exists. Try another one.',
  })
  @ApiBadRequestResponse({
    description: 'Fields are not validated',
  })
  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<AuthResponseDto> {
    const response = await this.authService.createUser(user);

    const mappedResponse = this.authMapper.mapToAuthResponseDto(response);

    return mappedResponse;
  }
}
