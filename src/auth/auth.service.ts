import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';
import { MailAuthService } from 'src/mail/mail-auth.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly mailAuthService: MailAuthService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user || !this.bcryptAdapter.compareSync(password, user.password)) {
      throw new BadRequestException({
        message: 'Email / Password do not match',
        key: 'auth.credentials',
      });
    }

    if (!user.isAccountVerified) {
      throw new BadRequestException({
        message: 'User is not verified',
        key: 'auth.notVerified',
      });
    }

    const token = this.getJwtToken(String(user.id));

    return {
      token,
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);

    await this.mailAuthService.sendUserConfirmation(user);

    return user;
  }

  private getJwtToken(id: string) {
    return this.jwtService.sign({ id });
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid Token',
        key: 'auth.invalid',
      });
    }

    delete user.password;

    return user;
  }
}
