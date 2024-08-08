import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async login(LoginUserDto: LoginUserDto) {
    const { password, email } = LoginUserDto;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales incorrectas.');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = user;
    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const userGuestSessionId = await this.createGuessSession();
      const user = this.usersRepository.create({
        ...userData,
        guest_session_id: userGuestSessionId,
        password: bcrypt.hashSync(password, 10),
      });

      await this.usersRepository.save(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...rest } = user;

      return {
        user: rest,
      };
    } catch (error) {}
  }

  async findUserByID(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;
    return userData;
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private async createGuessSession() {
    let guest_session_id: string = '';

    const resp = await fetch(
      `${process.env.TMDB_API_BASE_URL}/authentication/guest_session/new?api_key=${process.env.TMDB_APY_KEY}`,
    );
    const data = await resp.json();
    guest_session_id = data.guest_session_id;

    fetch(
      `${process.env.TMDB_API_BASE_URL}/guest_session/${guest_session_id}/rated/movies?api_key=${process.env.TMDB_APY_KEY}`,
    );

    return guest_session_id;
  }
}
