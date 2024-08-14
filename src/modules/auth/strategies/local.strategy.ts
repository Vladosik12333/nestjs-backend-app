import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../users/users.entity';
import { UserLoginRequestDto } from '../dto/userLoginRequest.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(user: UserLoginRequestDto): Promise<User> {
    const validUser = await this.authService.validateUser(
      user.email,
      user.password,
    );

    if (!validUser) throw new UnauthorizedException('EMAIL_OR_PASSWORD_WRONG');

    return validUser;
  }
}
