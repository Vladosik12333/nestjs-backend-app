import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { User } from '../../modules/users/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email, password): Promise<User> {
    const validUser = await this.authService.validateUser(email, password);

    if (!validUser) throw new UnauthorizedException('EMAIL_OR_PASSWORD_WRONG');

    return validUser;
  }
}
