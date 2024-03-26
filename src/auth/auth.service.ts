import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../user/entity/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    const isCreateUsers = this.configService.get('CREATE_USERS') === 'true';
    if (!isCreateUsers) {
      throw new ForbiddenException('Запрещено создавать новых пользователей');
    }

    try {
      const userData = await this.usersService.create(dto);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async authorize(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        ignoreExpiration: false,
      });
      if (decoded && decoded.id) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTimestamp) {
          throw new UnauthorizedException('Token expired');
        }
        return true;
      }
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
    throw new UnauthorizedException('Unauthorized');
  }
}
