import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { Role } from '../../role/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: string; roles: Role[] }) {
    const user = await this.userService.findById(+payload.id);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (!this.isAdmin(user)) {
      throw new UnauthorizedException('Unauthorized');
    }

    return {
      id: user.id,
    };
  }

  private isAdmin(user: UserEntity): boolean {
    return user.role?.includes(Role.admin);
  }
}
