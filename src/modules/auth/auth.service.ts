import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { UserResponseDto } from './dto/userResponse.dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const foundUser = await this.usersService.findOneUserByEmail(email);

    console.log(foundUser);

    if (!foundUser) return null;

    const match = await this.comparePassword(password, foundUser.password);

    if (!match) return null;

    return foundUser;
  }

  async signin(user: User): Promise<UserResponseDto> {
    const token = await this.issueToken(user.id);

    return { name: user.name, email: user.email, token };
  }

  async createUser(user: UserDto): Promise<UserResponseDto> {
    const matchUser = await this.usersService.findOneUserByEmail(user.email);

    if (matchUser) throw new ConflictException('EMAIL_ALREADY_EXISTS');

    const newUser = await this.usersService.createUser(user);

    const token = await this.issueToken(newUser.id);

    return { name: newUser.name, email: newUser.email, token };
  }

  private async comparePassword(
    passedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const isMatched = await bcrypt.compare(passedPassword, storedPassword);

    return isMatched;
  }

  private async issueToken(id: number) {
    const token = await this.jwtService.signAsync({ id });

    return token;
  }
}
